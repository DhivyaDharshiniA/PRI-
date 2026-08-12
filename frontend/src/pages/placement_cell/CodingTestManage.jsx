// import { useEffect, useState } from "react";
// import { PlacementCodingApi } from "../../api/codingApi";
// import "../../styles/aptitude.css";
// import "../../styles/coding.css";
//
// function ViolationsTab() {
//   const [violations, setViolations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [zoomed, setZoomed] = useState(null);
//   const [busyId, setBusyId] = useState(null);
//
//   const load = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const { data } = await PlacementCodingApi.listPendingViolations();
//       setViolations(data);
//     } catch (e) {
//       setError(e?.response?.data?.message || "Could not load violations.");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   useEffect(() => {
//     load();
//   }, []);
//
//   const decide = async (assignmentId, approve) => {
//     setBusyId(assignmentId);
//     try {
//       await PlacementCodingApi.decideResume(assignmentId, approve);
//       setViolations((prev) => prev.filter((v) => v.assignmentId !== assignmentId));
//     } catch (e) {
//       setError(e?.response?.data?.message || "Could not record your decision.");
//     } finally {
//       setBusyId(null);
//     }
//   };
//
//   if (loading) return <p style={{ color: "#64748b" }}>Loading pending violations…</p>;
//
//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//         <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
//           {violations.length} pending resume request{violations.length === 1 ? "" : "s"}. Only you can
//           approve or deny a resume — students cannot restart their own session.
//         </p>
//         <button className="apt-btn apt-btn-outline" style={{ padding: "6px 12px", fontSize: 12 }} onClick={load}>
//           ↻ Refresh
//         </button>
//       </div>
//
//       {error && <p style={{ color: "#dc2626" }}>{error}</p>}
//
//       {violations.length === 0 && !error && (
//         <p style={{ color: "#94a3b8" }}>No pending violations right now. 🎉</p>
//       )}
//
//       {violations.map((v) => (
//         <div key={v.assignmentId} className="cd-violation-card">
//           <div className="cd-violation-head">
//             <div>
//               <strong>{v.studentUsername}</strong>
//               <div style={{ fontSize: 12, color: "#64748b" }}>{v.testTitle}</div>
//             </div>
//             <span className="cd-violation-tag">{v.violationType?.replaceAll("_", " ")}</span>
//           </div>
//
//           <div style={{ fontSize: 12, color: "#64748b" }}>
//             Occurred: {v.violationOccurredAt ? new Date(v.violationOccurredAt).toLocaleString() : "—"}
//             {" · "}
//             Time remaining when it fired:{" "}
//             {v.remainingSecondsAtViolation != null
//               ? `${Math.floor(v.remainingSecondsAtViolation / 60)}m ${v.remainingSecondsAtViolation % 60}s`
//               : "—"}
//             {v.resumeCount > 0 && ` · Previously resumed ${v.resumeCount} time(s)`}
//           </div>
//
//           {v.screenshotBase64 ? (
//             <img
//               src={v.screenshotBase64}
//               alt="Screenshot at the moment of violation"
//               className="cd-screenshot"
//               onClick={() => setZoomed(v.screenshotBase64)}
//             />
//           ) : (
//             <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>No screenshot was captured.</p>
//           )}
//
//           <div className="cd-decision-row">
//             <button
//               className="apt-btn apt-btn-primary"
//               style={{ background: "#16a34a" }}
//               disabled={busyId === v.assignmentId}
//               onClick={() => decide(v.assignmentId, true)}
//             >
//               ✓ Approve resume
//             </button>
//             <button
//               className="apt-btn apt-btn-outline"
//               style={{ borderColor: "#dc2626", color: "#dc2626" }}
//               disabled={busyId === v.assignmentId}
//               onClick={() => decide(v.assignmentId, false)}
//             >
//               ✕ Deny (keep auto-submitted)
//             </button>
//           </div>
//         </div>
//       ))}
//
//       {zoomed && (
//         <div
//           onClick={() => setZoomed(null)}
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(15,23,42,0.85)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 50,
//             cursor: "zoom-out",
//             padding: 30,
//           }}
//         >
//           <img src={zoomed} alt="Screenshot, enlarged" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 10 }} />
//         </div>
//       )}
//     </div>
//   );
// }
//
// function ResultsTab() {
//   const [testId, setTestId] = useState("");
//   const [results, setResults] = useState(null);
//   const [published, setPublished] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//
//   const load = async () => {
//     if (!testId) return;
//     setLoading(true);
//     setError("");
//     try {
//       const { data } = await PlacementCodingApi.listResults(testId);
//       setResults(data);
//       setPublished(data.length > 0 ? null : null);
//     } catch (e) {
//       setError(e?.response?.data?.message || "Could not load results. Check the test ID.");
//       setResults(null);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const togglePublish = async (publish) => {
//     try {
//       await (publish ? PlacementCodingApi.publishResults(testId) : PlacementCodingApi.unpublishResults(testId));
//       setPublished(publish);
//     } catch (e) {
//       setError(e?.response?.data?.message || "Could not update publish state.");
//     }
//   };
//
//   return (
//     <div>
//       <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
//         <input
//           value={testId}
//           onChange={(e) => setTestId(e.target.value)}
//           placeholder="Enter the coding test ID (shown after publishing)"
//           style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1.5px solid #e6efff", fontSize: 13 }}
//         />
//         <button className="apt-btn apt-btn-primary" onClick={load} disabled={loading || !testId}>
//           {loading ? "Loading…" : "Load results"}
//         </button>
//       </div>
//
//       {error && <p style={{ color: "#dc2626" }}>{error}</p>}
//
//       {results && (
//         <>
//           <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
//             <button className="apt-btn apt-btn-primary" style={{ background: "#16a34a" }} onClick={() => togglePublish(true)}>
//               Publish marks to students
//             </button>
//             <button className="apt-btn apt-btn-outline" onClick={() => togglePublish(false)}>
//               Hide marks from students
//             </button>
//             {published !== null && (
//               <span className={`cd-decision-badge ${published ? "approved" : "rejected"}`}>
//                 {published ? "Published" : "Hidden"}
//               </span>
//             )}
//           </div>
//
//           <table className="cd-results-table">
//             <thead>
//               <tr>
//                 <th>Student</th>
//                 <th>Status</th>
//                 <th>Score</th>
//                 <th>Submitted at</th>
//                 <th>Violation</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map((r) => (
//                 <tr key={r.assignmentId}>
//                   <td>{r.studentUsername}</td>
//                   <td>
//                     <span className={`cd-status-pill ${r.status}`}>{r.status?.replaceAll("_", " ")}</span>
//                   </td>
//                   <td>
//                     {r.score != null ? `${r.score} / ${r.totalMarks}` : "—"}
//                   </td>
//                   <td>{r.submittedAt ? new Date(r.submittedAt).toLocaleString() : "—"}</td>
//                   <td>{r.violationType ? r.violationType.replaceAll("_", " ") : "—"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// }
//
// export default function CodingTestManage() {
//   const [tab, setTab] = useState("violations");
//
//   return (
//     <div className="apt-page">
//       <div className="apt-container" style={{ maxWidth: 920 }}>
//         <div className="apt-card">
//           <h1 className="apt-title">Coding Test — Proctoring &amp; Results</h1>
//           <p className="apt-subtitle">
//             Review auto-submitted violations (with screenshots) and decide who may resume, then
//             publish marks once you're ready for students to see them.
//           </p>
//
//           <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
//             <button
//               className={`apt-btn ${tab === "violations" ? "apt-btn-primary" : "apt-btn-outline"}`}
//               onClick={() => setTab("violations")}
//             >
//               Pending Violations
//             </button>
//             <button
//               className={`apt-btn ${tab === "results" ? "apt-btn-primary" : "apt-btn-outline"}`}
//               onClick={() => setTab("results")}
//             >
//               Results &amp; Publish
//             </button>
//           </div>
//
//           {tab === "violations" ? <ViolationsTab /> : <ResultsTab />}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlacementCodingApi } from "../../api/codingApi";
import {
  IoChevronBack,
  IoDocumentTextOutline,
  IoCheckmarkCircleOutline,
  IoEyeOutline,
  IoWarningOutline,
  IoCodeSlashOutline,
  IoTimeOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import "../../styles/aptitude.css";
import "../../styles/coding.css";

// ============================================================
// Shared: question + student-results drill-in for a single test
// ============================================================

function TestDetails({ testId }) {
  const [questions, setQuestions] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentFilter, setStudentFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([
      PlacementCodingApi.listQuestions(testId),
      PlacementCodingApi.listResults(testId),
    ])
      .then(([q, r]) => {
        setQuestions(q.data);
        setResults(r.data);
      })
      .catch((e) => setError(e?.response?.data?.message || "Could not load test details."))
      .finally(() => setLoading(false));
  }, [testId]);

  const filteredResults = useMemo(() => {
    if (!results) return [];
    if (studentFilter === "all") return results;
    return results.filter((r) => r.status === studentFilter);
  }, [results, studentFilter]);

  if (loading) {
    return (
      <div className="apt-loading" style={{ padding: "24px 0" }}>
        <div className="loader"></div>
        <p>Loading details...</p>
      </div>
    );
  }
  if (error) return <p style={{ color: "#dc2626" }}>{error}</p>;

  return (
    <div
      style={{
        gridColumn: "1 / -1",
        flexBasis: "100%",
        width: "100%",
        marginTop: 18,
        paddingTop: 18,
        borderTop: "1px solid #e6efff",
      }}
    >
      {/* Compact question chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        {questions.map((q) => (
          <span
            key={q.id}
            title={q.description || q.title}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 999,
              background: "#f4f8ff",
              border: "1px solid #e6efff",
              fontSize: 12.5,
              color: "#0f172a",
              whiteSpace: "nowrap",
            }}
          >
            <strong style={{ fontWeight: 600 }}>{q.title}</strong>
            <span style={{ color: "#94a3b8" }}>
              · {q.difficulty} · {q.points} pts
            </span>
          </span>
        ))}
      </div>

      {/* Results header + filter */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 10 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#0f172a" }}>
          Student Results ({filteredResults.length}/{results.length})
        </p>
        <select
          value={studentFilter}
          onChange={(e) => setStudentFilter(e.target.value)}
          style={{
            background: "#fff",
            color: "#0f172a",
            border: "1.5px solid #e6efff",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 13,
          }}
        >
          <option value="all">All statuses</option>
          <option value="ASSIGNED">Not started</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="SUBMITTED">Completed</option>
          <option value="AUTO_SUBMITTED">Auto-submitted</option>
        </select>
      </div>

      {/* Scrollable results table */}
      <div
        style={{
          maxHeight: 320,
          overflowY: "auto",
          border: "1px solid #e6efff",
          borderRadius: 12,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, fontWeight: 500 }}>
          <thead>
            <tr>
              {["Student", "Status", "Score", "Submitted at", "Violation"].map((h) => (
                <th
                  key={h}
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    textAlign: "left",
                    padding: "10px 14px",
                    background: "#f8fafc",
                    borderBottom: "1px solid #e6efff",
                    color: "#334155",
                    fontWeight: 700,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((r, i) => (
              <tr key={r.assignmentId} style={{ background: i % 2 === 1 ? "#fbfdff" : "#fff" }}>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", color: "#0f172a", fontWeight: 600 }}>
                  {r.studentUsername}
                </td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9" }}>
                  <span className={`cd-status-pill ${r.status}`}>{r.status?.replaceAll("_", " ")}</span>
                </td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", color: "#0f172a", fontWeight: 600 }}>
                  {r.score != null ? `${r.score} / ${r.totalMarks}` : "—"}
                </td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", color: "#64748b" }}>
                  {r.submittedAt ? new Date(r.submittedAt).toLocaleString() : "—"}
                </td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", color: "#64748b" }}>
                  {r.violationType ? r.violationType.replaceAll("_", " ") : "—"}
                </td>
              </tr>
            ))}
            {filteredResults.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "18px 14px", color: "#94a3b8", textAlign: "center" }}>
                  No students match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// Page
// ============================================================

export default function CodingTestManage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("tests");

  // -- tests tab state --
  const [tests, setTests] = useState([]);
  const [testsLoading, setTestsLoading] = useState(true);
  const [testsError, setTestsError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedTestId, setExpandedTestId] = useState(null);
  const [publishBusyId, setPublishBusyId] = useState(null);

  // -- violations tab state --
  const [violations, setViolations] = useState([]);
  const [violationsLoading, setViolationsLoading] = useState(true);
  const [violationsError, setViolationsError] = useState("");
  const [decisionBusyId, setDecisionBusyId] = useState(null);
  const [zoomed, setZoomed] = useState(null);

  const loadTests = async () => {
    setTestsLoading(true);
    setTestsError("");
    try {
      const { data } = await PlacementCodingApi.listAllTests();
      setTests(data);
    } catch (e) {
      setTestsError(e?.response?.data?.message || "Could not load tests.");
    } finally {
      setTestsLoading(false);
    }
  };

  const loadViolations = async () => {
    setViolationsLoading(true);
    setViolationsError("");
    try {
      const { data } = await PlacementCodingApi.listPendingViolations();
      setViolations(data);
    } catch (e) {
      setViolationsError(e?.response?.data?.message || "Could not load violations.");
    } finally {
      setViolationsLoading(false);
    }
  };

  useEffect(() => {
    loadTests();
    loadViolations();
  }, []);

  const summary = useMemo(
    () => ({
      total: tests.length,
      published: tests.filter((t) => t.resultsPublished).length,
      hidden: tests.filter((t) => !t.resultsPublished).length,
      pendingViolations: violations.length,
    }),
    [tests, violations]
  );

  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter === "published" && !t.resultsPublished) return false;
      if (statusFilter === "unpublished" && t.resultsPublished) return false;
      if (statusFilter === "pending" && t.pendingViolationCount === 0) return false;
      return true;
    });
  }, [tests, search, statusFilter]);

  const togglePublish = async (test) => {
    setPublishBusyId(test.testId);
    try {
      if (test.resultsPublished) {
        await PlacementCodingApi.unpublishResults(test.testId);
      } else {
        await PlacementCodingApi.publishResults(test.testId);
      }
      setTests((prev) =>
        prev.map((t) => (t.testId === test.testId ? { ...t, resultsPublished: !t.resultsPublished } : t))
      );
    } catch (e) {
      setTestsError(e?.response?.data?.message || "Could not update publish state.");
    } finally {
      setPublishBusyId(null);
    }
  };

  const decide = async (assignmentId, approve) => {
    setDecisionBusyId(assignmentId);
    try {
      await PlacementCodingApi.decideResume(assignmentId, approve);
      setViolations((prev) => prev.filter((v) => v.assignmentId !== assignmentId));
    } catch (e) {
      setViolationsError(e?.response?.data?.message || "Could not record your decision.");
    } finally {
      setDecisionBusyId(null);
    }
  };

  return (
    <div className="apt-dashboard">
      {/* ===========================
            Header
      ============================ */}
      <header className="apt-dashboard-header">
        <div className="apt-header">
          <button className="apt-back-btn" onClick={() => navigate("/placement-dashboard")}>
            <span className="back-icon">
              <IoChevronBack />
            </span>
            Dashboard
          </button>

          <div className="apt-title-section">
            <h1>Proctoring &amp; Results</h1>
          </div>
        </div>
      </header>

      {/* ===========================
          Summary Cards
      ============================ */}
      <section className="summary-grid">
        <div className="summary-card">
          <div className="summary-icon blue">
            <IoDocumentTextOutline />
          </div>
          <div>
            <h2>{summary.total}</h2>
            <p>Total Tests</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            <IoCheckmarkCircleOutline />
          </div>
          <div>
            <h2>{summary.published}</h2>
            <p>Marks Published</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon yellow">
            <IoEyeOutline />
          </div>
          <div>
            <h2>{summary.hidden}</h2>
            <p>Marks Hidden</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon red">
            <IoWarningOutline />
          </div>
          <div>
            <h2>{summary.pendingViolations}</h2>
            <p>Pending Violations</p>
          </div>
        </div>
      </section>

      {/* ===========================
          Tabs + Search
      ============================ */}
      <div className="apt-search-box" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className={`apt-btn ${tab === "tests" ? "apt-btn-primary" : "apt-btn-outline"}`}
            onClick={() => setTab("tests")}
          >
            All Tests
          </button>
          <button
            className={`apt-btn ${tab === "violations" ? "apt-btn-primary" : "apt-btn-outline"}`}
            onClick={() => setTab("violations")}
            style={{ position: "relative" }}
          >
            Pending Violations
            {summary.pendingViolations > 0 && <span className="cd-tab-badge">{summary.pendingViolations}</span>}
          </button>
        </div>

        {tab === "tests" && (
          <>
            <input
              type="text"
              placeholder="Search tests by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 200 }}
            />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All tests</option>
              <option value="published">Marks published</option>
              <option value="unpublished">Marks hidden</option>
              <option value="pending">Has pending violations</option>
            </select>
          </>
        )}

        <button
          className="apt-btn apt-btn-outline"
          onClick={() => (tab === "tests" ? loadTests() : loadViolations())}
        >
          ↻ Refresh
        </button>
      </div>

      {/* ===========================
          List Container
      ============================ */}
      <section className="apt-list-wrapper">
        {tab === "tests" ? (
          <>
            {testsLoading && (
              <div className="apt-loading">
                <div className="loader"></div>
                <p>Loading tests...</p>
              </div>
            )}

            {testsError && <p style={{ color: "#dc2626" }}>{testsError}</p>}

            {!testsLoading && filteredTests.length === 0 && !testsError && (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <h2>No Tests Found</h2>
                <p>{search || statusFilter !== "all" ? "No test matches your search." : "No coding tests have been created yet."}</p>
              </div>
            )}

            {!testsLoading &&
              filteredTests.map((t) => {
                const expanded = expandedTestId === t.testId;
                return (
                  <div
                    className="assessment-card"
                    key={t.testId}
                    style={{ flexWrap: "wrap", alignItems: "flex-start" }}
                  >
                    <div className="assessment-left">
                      <div className="assessment-title">
                        <h3>{t.title}</h3>
                        <span className={`apt-pill ${t.resultsPublished ? "apt-pill-green" : "apt-pill-blue"}`}>
                          {t.resultsPublished ? "Marks Published" : "Marks Hidden"}
                        </span>
                      </div>

                      <div className="assessment-meta">
                        <div className="meta-item">
                          <IoCodeSlashOutline />
                          <span>
                            {t.totalQuestions} Question{t.totalQuestions === 1 ? "" : "s"}
                          </span>
                        </div>
                        <div className="meta-item">
                          <IoTimeOutline />
                          <span>{t.durationMinutes} Minutes</span>
                        </div>
                        <div className="meta-item">
                          <IoPeopleOutline />
                          <span>{t.totalStudents} Assigned</span>
                        </div>
                        <div className="meta-item">
                          <IoCheckmarkCircleOutline />
                          <span>{t.submittedCount} Submitted</span>
                        </div>
                      </div>

                      <p className="assessment-desc">
                        Test ID {t.testId} ·{" "}
                        {t.publishedAt
                          ? `Published ${new Date(t.publishedAt).toLocaleDateString()}`
                          : "Not yet published"}
                        . {t.inProgressCount} student{t.inProgressCount === 1 ? "" : "s"} currently in progress.
                      </p>
                    </div>

                    <div className="assessment-right">
                      {t.pendingViolationCount > 0 ? (
                        <div className="status-message warning">
                          <h4>Needs Attention</h4>
                          <p>
                            {t.pendingViolationCount} pending violation{t.pendingViolationCount === 1 ? "" : "s"} to
                            review.
                          </p>
                        </div>
                      ) : t.resultsPublished ? (
                        <div className="status-message success">
                          <h4>Marks Published</h4>
                          <p>Students can see their results.</p>
                        </div>
                      ) : (
                        <div className="status-message info">
                          <h4>Marks Hidden</h4>
                          <p>Publish when you're ready to reveal scores.</p>
                        </div>
                      )}

                      <button
                        className="apt-btn apt-btn-primary"
                        style={{ background: t.resultsPublished ? "#dc2626" : "#16a34a" }}
                        disabled={publishBusyId === t.testId}
                        onClick={() => togglePublish(t)}
                      >
                        {t.resultsPublished ? "Hide Marks" : "Publish Marks"}
                      </button>
                      <button
                        className="apt-btn apt-btn-outline"
                        onClick={() => setExpandedTestId(expanded ? null : t.testId)}
                      >
                        {expanded ? "Hide Details ▲" : "View Details ▼"}
                      </button>
                    </div>

                    {expanded && <TestDetails testId={t.testId} />}
                  </div>
                );
              })}
          </>
        ) : (
          <>
            {violationsLoading && (
              <div className="apt-loading">
                <div className="loader"></div>
                <p>Loading pending violations...</p>
              </div>
            )}

            {violationsError && <p style={{ color: "#dc2626" }}>{violationsError}</p>}

            {!violationsLoading && violations.length === 0 && !violationsError && (
              <div className="empty-state">
                <div className="empty-icon">🎉</div>
                <h2>All Clear</h2>
                <p>No pending violations right now.</p>
              </div>
            )}

            {!violationsLoading &&
              violations.map((v) => (
                <div className="assessment-card" key={v.assignmentId}>
                  <div className="assessment-left">
                    <div className="assessment-title">
                      <h3>{v.studentUsername}</h3>
                      <span className="apt-pill apt-pill-red">{v.violationType?.replaceAll("_", " ")}</span>
                    </div>

                    <div className="assessment-meta">
                      <div className="meta-item">
                        <IoDocumentTextOutline />
                        <span>{v.testTitle}</span>
                      </div>
                      <div className="meta-item">
                        <IoTimeOutline />
                        <span>{v.violationOccurredAt ? new Date(v.violationOccurredAt).toLocaleString() : "—"}</span>
                      </div>
                      {v.remainingSecondsAtViolation != null && (
                        <div className="meta-item">
                          <IoWarningOutline />
                          <span>
                            {Math.floor(v.remainingSecondsAtViolation / 60)}m {v.remainingSecondsAtViolation % 60}s
                            left when it fired
                          </span>
                        </div>
                      )}
                    </div>

                    {v.resumeCount > 0 && (
                      <p className="assessment-desc">Previously resumed {v.resumeCount} time(s).</p>
                    )}

                    {v.screenshotBase64 ? (
                      <img
                        src={v.screenshotBase64}
                        alt="Screenshot at the moment of violation"
                        className="cd-screenshot"
                        onClick={() => setZoomed(v.screenshotBase64)}
                      />
                    ) : (
                      <p className="assessment-desc">No screenshot was captured.</p>
                    )}
                  </div>

                  <div className="assessment-right">
                    <div className="status-message warning">
                      <h4>Awaiting Decision</h4>
                      <p>Only you can approve or deny — the student cannot restart their own session.</p>
                    </div>
                    <button
                      className="apt-btn apt-btn-primary"
                      style={{ background: "#16a34a" }}
                      disabled={decisionBusyId === v.assignmentId}
                      onClick={() => decide(v.assignmentId, true)}
                    >
                      ✓ Approve Resume
                    </button>
                    <button
                      className="apt-btn apt-btn-outline"
                      style={{ borderColor: "#dc2626", color: "#dc2626" }}
                      disabled={decisionBusyId === v.assignmentId}
                      onClick={() => decide(v.assignmentId, false)}
                    >
                      ✕ Deny
                    </button>
                  </div>
                </div>
              ))}
          </>
        )}
      </section>

      {zoomed && (
        <div
          onClick={() => setZoomed(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            cursor: "zoom-out",
            padding: 30,
          }}
        >
          <img src={zoomed} alt="Screenshot, enlarged" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 10 }} />
        </div>
      )}

      {/* Footer */}
      <footer className="apt-footer">
        <p>© 2026 Placement Cell Portal</p>
      </footer>
    </div>
  );
}