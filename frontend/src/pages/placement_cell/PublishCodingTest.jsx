import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlacementCodingApi } from "../../api/codingApi";
import "../../styles/aptitude.css";
import "../../styles/coding.css";

function emptyTestCase(hidden) {
  return { input: "", expectedOutput: "", hidden };
}

function emptyQuestion() {
  return {
    title: "",
    description: "",
    difficulty: "MEDIUM",
    points: 100,
    constraintsText: "",
    testCases: [emptyTestCase(false), emptyTestCase(true)],
  };
}

export default function PublishCodingTest() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const updateQuestion = (qIdx, patch) => {
    setQuestions((prev) => prev.map((q, i) => (i === qIdx ? { ...q, ...patch } : q)));
  };

  const updateTestCase = (qIdx, tcIdx, patch) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i !== qIdx
          ? q
          : {
              ...q,
              testCases: q.testCases.map((tc, j) => (j === tcIdx ? { ...tc, ...patch } : tc)),
            }
      )
    );
  };

  const addQuestion = () => setQuestions((prev) => [...prev, emptyQuestion()]);
  const removeQuestion = (qIdx) =>
    setQuestions((prev) => prev.filter((_, i) => i !== qIdx));

  const addTestCase = (qIdx, hidden) =>
    setQuestions((prev) =>
      prev.map((q, i) => (i !== qIdx ? q : { ...q, testCases: [...q.testCases, emptyTestCase(hidden)] }))
    );
  const removeTestCase = (qIdx, tcIdx) =>
    setQuestions((prev) =>
      prev.map((q, i) =>
        i !== qIdx ? q : { ...q, testCases: q.testCases.filter((_, j) => j !== tcIdx) }
      )
    );

  const handlePublish = async () => {
    setError("");
    setResult(null);
    setPublishing(true);
    try {
      const { data } = await PlacementCodingApi.publishTest({
        title: title || undefined,
        durationMinutes: Number(durationMinutes) || 60,
        questions: questions.map((q) => ({
          ...q,
          points: Number(q.points) || 100,
        })),
      });
      setResult(data);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          "Could not publish the coding test. Please check every question has a title and at least one visible sample test case."
      );
    } finally {
      setPublishing(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1.5px solid #e6efff",
    fontSize: 13,
    fontFamily: "inherit",
  };

  return (
    <div className="apt-page">
      <div className="apt-container" style={{ maxWidth: 920 }}>
        <div className="apt-card">
          <h1 className="apt-title">Coding Assessment</h1>
          <p className="apt-subtitle">
            Build a multi-language coding test. Students code in an in-browser IDE (Python,
            Java, C, C++, JavaScript), run against sample cases, and submit for automatic
            scoring against hidden test cases. Marks stay hidden from students until you
            publish results.
          </p>

          <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
            <div style={{ flex: 2 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Test title</label>
              <input
                style={inputStyle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Round 1 - Coding Assessment"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Duration (minutes)</label>
              <input
                type="number"
                min={5}
                style={inputStyle}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
              />
            </div>
          </div>

          {questions.map((q, qIdx) => (
            <div
              key={qIdx}
              className="apt-card"
              style={{ background: "#f9fbff", marginBottom: 18, padding: 20 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>Question {qIdx + 1}</strong>
                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(qIdx)}
                    className="apt-btn apt-btn-outline"
                    style={{ padding: "4px 10px", fontSize: 12 }}
                  >
                    Remove
                  </button>
                )}
              </div>

              <label style={{ fontSize: 12, fontWeight: 600, marginTop: 12, display: "block" }}>Title</label>
              <input
                style={inputStyle}
                value={q.title}
                onChange={(e) => updateQuestion(qIdx, { title: e.target.value })}
                placeholder="e.g. Two Sum"
              />

              <label style={{ fontSize: 12, fontWeight: 600, marginTop: 12, display: "block" }}>
                Description (problem statement, input/output format)
              </label>
              <textarea
                style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
                value={q.description}
                onChange={(e) => updateQuestion(qIdx, { description: e.target.value })}
                placeholder="The student's program should read input from stdin and print the result to stdout..."
              />

              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, fontWeight: 600 }}>Difficulty</label>
                  <select
                    style={inputStyle}
                    value={q.difficulty}
                    onChange={(e) => updateQuestion(qIdx, { difficulty: e.target.value })}
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, fontWeight: 600 }}>Points</label>
                  <input
                    type="number"
                    style={inputStyle}
                    value={q.points}
                    onChange={(e) => updateQuestion(qIdx, { points: e.target.value })}
                  />
                </div>
              </div>

              <label style={{ fontSize: 12, fontWeight: 600, marginTop: 12, display: "block" }}>
                Constraints (optional)
              </label>
              <textarea
                style={{ ...inputStyle, minHeight: 50, resize: "vertical" }}
                value={q.constraintsText}
                onChange={(e) => updateQuestion(qIdx, { constraintsText: e.target.value })}
                placeholder="1 <= n <= 10^5"
              />

              <div style={{ marginTop: 16 }}>
                <strong style={{ fontSize: 13 }}>Test cases</strong>
                <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0 10px" }}>
                  Visible cases are shown to students as samples. Hidden cases are used only for
                  scoring and are never shown to students, before or after submit.
                </p>
                {q.testCases.map((tc, tcIdx) => (
                  <div
                    key={tcIdx}
                    style={{
                      border: "1px solid #e6efff",
                      borderRadius: 10,
                      padding: 12,
                      marginBottom: 10,
                      background: "#fff",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <input
                          type="checkbox"
                          checked={tc.hidden}
                          onChange={(e) => updateTestCase(qIdx, tcIdx, { hidden: e.target.checked })}
                        />
                        Hidden test case
                      </label>
                      {q.testCases.length > 1 && (
                        <button
                          onClick={() => removeTestCase(qIdx, tcIdx)}
                          className="apt-btn apt-btn-outline"
                          style={{ padding: "2px 8px", fontSize: 11 }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: 11, color: "#64748b" }}>Input (stdin)</label>
                        <textarea
                          style={{ ...inputStyle, minHeight: 60, fontFamily: "monospace" }}
                          value={tc.input}
                          onChange={(e) => updateTestCase(qIdx, tcIdx, { input: e.target.value })}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: 11, color: "#64748b" }}>Expected output (stdout)</label>
                        <textarea
                          style={{ ...inputStyle, minHeight: 60, fontFamily: "monospace" }}
                          value={tc.expectedOutput}
                          onChange={(e) => updateTestCase(qIdx, tcIdx, { expectedOutput: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="apt-btn apt-btn-outline"
                    style={{ fontSize: 12, padding: "6px 12px" }}
                    onClick={() => addTestCase(qIdx, false)}
                  >
                    + Visible case
                  </button>
                  <button
                    className="apt-btn apt-btn-outline"
                    style={{ fontSize: 12, padding: "6px 12px" }}
                    onClick={() => addTestCase(qIdx, true)}
                  >
                    + Hidden case
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button className="apt-btn apt-btn-outline" onClick={addQuestion} style={{ marginBottom: 20 }}>
            + Add another question
          </button>

          <div>
            <button className="apt-btn apt-btn-primary" onClick={handlePublish} disabled={publishing}>
              {publishing ? "Publishing…" : "🚀 Publish Coding Test to All Students"}
            </button>
          </div>

          {error && <p style={{ color: "#dc2626", marginTop: 16, fontSize: 14 }}>{error}</p>}

          {result && (
            <div className="apt-card" style={{ marginTop: 22, background: "#f4f8ff" }}>
              <span className="apt-pill apt-pill-green">✓ Published</span>
              <h3 style={{ margin: "12px 0 4px" }}>{result.title}</h3>
              <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>
                {result.totalQuestions} question{result.totalQuestions === 1 ? "" : "s"} ·{" "}
                {result.durationMinutes} minutes · sent to {result.studentsAssigned} student
                {result.studentsAssigned === 1 ? "" : "s"}
              </p>
              <button
                className="apt-btn apt-btn-outline"
                style={{ marginTop: 14 }}
                onClick={() => navigate("/placement/coding-tests/manage")}
              >
                Go to violation review &amp; results →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
