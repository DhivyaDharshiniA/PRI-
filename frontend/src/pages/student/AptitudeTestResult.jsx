import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StudentAptitudeApi } from "../../api/aptitudeApi";
import "../../styles/aptitude.css";

const VIOLATION_MESSAGE = {
  TAB_SWITCH: "Your test was auto-submitted because you switched tabs.",
  WINDOW_BLUR: "Your test was auto-submitted because the window lost focus.",
  FULLSCREEN_EXIT: "Your test was auto-submitted because you exited full screen.",
  TIME_EXPIRED: "Time ran out, so your test was submitted automatically.",
  RESUME_ATTEMPT: "Your test was auto-submitted because it cannot be resumed once started.",
};

export default function AptitudeTestResult() {
  const { testId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState(state?.result || null);
  const [loading, setLoading] = useState(!state?.result);

  useEffect(() => {
    if (result) return;
    StudentAptitudeApi.getResult(testId)
      .then(({ data }) => setResult(data))
      .finally(() => setLoading(false));
  }, [testId, result]);

  if (loading) {
    return (
      <div className="apt-page">
        <div className="apt-container">
          <p>Loading result…</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="apt-page">
        <div className="apt-container">
          <div className="apt-card">
            <h1 className="apt-title">Result not available</h1>
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

  const pct = result.percentage ?? 0;

  return (
    <div className="apt-page">
      <div className="apt-container">
        <div className="apt-card" style={{ textAlign: "center" }}>
          {result.violationType && (
            <div
              className="apt-pill apt-pill-red"
              style={{ marginBottom: 18 }}
            >
              ⚠ {VIOLATION_MESSAGE[result.violationType] || "Auto-submitted"}
            </div>
          )}

          <h1 className="apt-title">{result.title}</h1>
          <p className="apt-subtitle">Here's how you did</p>

          <div className="apt-result-ring" style={{ "--pct": pct }}>
            <div className="apt-result-ring-inner">
              <div style={{ fontSize: 26, fontWeight: 800, color: "#14428f" }}>
                {pct}%
              </div>
            </div>
          </div>

          <div className="apt-result-score">
            {result.score} / {result.totalMarks}
          </div>
          <p style={{ color: "#64748b" }}>Correct answers</p>

          <button
            className="apt-btn apt-btn-primary"
            style={{ marginTop: 20 }}
            onClick={() => navigate("/student/aptitude-tests")}
          >
            Back to My Tests
          </button>
        </div>
      </div>
    </div>
  );
}
