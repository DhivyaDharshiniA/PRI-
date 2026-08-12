import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentAptitudeApi } from "../../api/aptitudeApi";
import { useExamSecurity } from "../../hooks/useExamSecurity";
import { useCountdown } from "../../hooks/useCountdown";
import "../../styles/aptitude.css";

export default function AptitudeTestRunner() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [phase, setPhase] = useState("intro"); // intro | running | finishing | error
  const [session, setSession] = useState(null); // StartTestResponse
  const [answers, setAnswers] = useState({}); // questionId -> selectedOption
  const [currentIdx, setCurrentIdx] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const answersRef = useRef(answers);
  answersRef.current = answers;

  const saveTimerRef = useRef(null);

  // ---------- finish/submit ----------

  const finalize = useCallback(
    async (submitFn) => {
      setPhase("finishing");
      try {
        const { data } = await submitFn();
        navigate(`/student/aptitude-tests/${testId}/result`, {
          replace: true,
          state: { result: data },
        });
      } catch (e) {
        // Even if the network call fails, don't leave the student stuck in
        // fullscreen lockdown -- send them to the result page, which will
        // re-fetch the authoritative result from the server.
        navigate(`/student/aptitude-tests/${testId}/result`, { replace: true });
      }
    },
    [navigate, testId]
  );

  const buildAnswersPayload = () =>
    Object.entries(answersRef.current).map(([questionId, selectedOption]) => ({
      questionId: Number(questionId),
      selectedOption,
    }));

  const handleNormalSubmit = useCallback(() => {
    finalize(() => StudentAptitudeApi.submit(testId, buildAnswersPayload()));
  }, [finalize, testId]);

  const handleViolation = useCallback(
    (type) => {
      finalize(() =>
        StudentAptitudeApi.reportViolation(testId, type, {
          answers: buildAnswersPayload(),
        })
      );
    },
    [finalize, testId]
  );

  const handleTimeExpired = useCallback(() => {
    finalize(() => StudentAptitudeApi.submit(testId, buildAnswersPayload()));
  }, [finalize, testId]);

  // ---------- security lockdown ----------

  const { enterFullscreen } = useExamSecurity({
    active: phase === "running",
    onViolation: handleViolation,
  });

  const { label: timeLabel, isLow } = useCountdown(
    session?.deadline,
    handleTimeExpired
  );

  // ---------- start ----------

  const handleStart = async () => {
    try {
      await enterFullscreen();
      const { data } = await StudentAptitudeApi.start(testId);
      setSession(data);
      setPhase("running");
    } catch (e) {
      setErrorMsg(
        e?.response?.data?.message ||
          "Could not start the test. It may already have been submitted."
      );
      setPhase("error");
    }
  };

  // ---------- answer selection (with debounced autosave) ----------

  const selectOption = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      StudentAptitudeApi.saveAnswer(testId, questionId, option).catch(() => {});
    }, 350);
  };

  useEffect(() => () => clearTimeout(saveTimerRef.current), []);

  // ---------- render: intro / lock screen ----------

  if (phase === "intro") {
    return (
      <div className="apt-page">
        <div className="apt-container">
          <div className="apt-card apt-lock-screen">
            <div className="apt-lock-icon">🔒</div>
            <h1 className="apt-title">Ready to begin?</h1>
            <p className="apt-subtitle">This test runs in full-screen, timed mode.</p>
            <ul className="apt-rules">
              <li>The test will open in full screen and must stay that way.</li>
              <li>You have 45 minutes once you start — the clock cannot be paused.</li>
              <li>Switching tabs, minimizing, or exiting full screen auto-submits the test immediately.</li>
              <li>You get exactly one attempt — the test cannot be resumed or retaken.</li>
              <li>Your score is shown as soon as you submit.</li>
            </ul>
            <button className="apt-btn apt-btn-primary" onClick={handleStart}>
              Enter Full Screen &amp; Start Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="apt-page">
        <div className="apt-container">
          <div className="apt-card apt-lock-screen">
            <h1 className="apt-title">Unable to start</h1>
            <p style={{ color: "#dc2626" }}>{errorMsg}</p>
            <button
              className="apt-btn apt-btn-outline"
              onClick={() => navigate("/student/aptitude-tests")}
            >
              Back to my tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "finishing" || !session) {
    return (
      <div className="apt-exam-shell">
        <div style={{ margin: "auto", textAlign: "center" }}>
          <h2>Submitting your test…</h2>
          <p style={{ color: "#64748b" }}>Please don't close this window.</p>
        </div>
      </div>
    );
  }

  // ---------- render: running exam ----------

  const question = session.questions[currentIdx];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="apt-exam-shell">
      <div className="apt-exam-header">
        <div>
          <h3>{session.title}</h3>
          <div className="apt-exam-sub">
            {answeredCount}/{session.questions.length} answered
          </div>
        </div>
        <div className={`apt-timer ${isLow ? "low" : ""}`}>⏱ {timeLabel}</div>
      </div>

      <div className="apt-exam-body">
        <div className="apt-question-panel">
          <div className="apt-question-index">
            Question {currentIdx + 1} of {session.questions.length}
          </div>
          <div className="apt-question-text">{question.questionText}</div>

          {question.options.map((opt) => (
            <label
              key={opt}
              className={`apt-option ${answers[question.id] === opt ? "selected" : ""}`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                checked={answers[question.id] === opt}
                onChange={() => selectOption(question.id, opt)}
              />
              {opt}
            </label>
          ))}

          <div className="apt-nav-row">
            <button
              className="apt-btn apt-btn-outline"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            >
              ← Previous
            </button>
            {currentIdx < session.questions.length - 1 ? (
              <button
                className="apt-btn apt-btn-primary"
                onClick={() =>
                  setCurrentIdx((i) => Math.min(session.questions.length - 1, i + 1))
                }
              >
                Next →
              </button>
            ) : (
              <button className="apt-btn apt-btn-primary" onClick={handleNormalSubmit}>
                Submit Test ✓
              </button>
            )}
          </div>
        </div>

        <div className="apt-palette-panel">
          <strong style={{ fontSize: 14 }}>Question Palette</strong>
          <div className="apt-palette-grid">
            {session.questions.map((q, i) => (
              <div
                key={q.id}
                className={`apt-palette-cell ${answers[q.id] ? "answered" : ""} ${
                  i === currentIdx ? "current" : ""
                }`}
                onClick={() => setCurrentIdx(i)}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="apt-submit-bar">
            <button
              className="apt-btn apt-btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={handleNormalSubmit}
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
