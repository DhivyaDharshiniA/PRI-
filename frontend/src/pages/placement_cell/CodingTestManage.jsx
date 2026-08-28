// // import { useEffect, useState } from "react";
// // import { PlacementCodingApi } from "../../api/codingApi";
// // import "../../styles/aptitude.css";
// // import "../../styles/coding.css";
// //
// // function ViolationsTab() {
// //   const [violations, setViolations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [zoomed, setZoomed] = useState(null);
// //   const [busyId, setBusyId] = useState(null);
// //
// //   const load = async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const { data } = await PlacementCodingApi.listPendingViolations();
// //       setViolations(data);
// //     } catch (e) {
// //       setError(e?.response?.data?.message || "Could not load violations.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //
// //   useEffect(() => {
// //     load();
// //   }, []);
// //
// //   const decide = async (assignmentId, approve) => {
// //     setBusyId(assignmentId);
// //     try {
// //       await PlacementCodingApi.decideResume(assignmentId, approve);
// //       setViolations((prev) => prev.filter((v) => v.assignmentId !== assignmentId));
// //     } catch (e) {
// //       setError(e?.response?.data?.message || "Could not record your decision.");
// //     } finally {
// //       setBusyId(null);
// //     }
// //   };
// //
// //   if (loading) return <p style={{ color: "#64748b" }}>Loading pending violations…</p>;
// //
// //   return (
// //     <div>
// //       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// //         <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
// //           {violations.length} pending resume request{violations.length === 1 ? "" : "s"}. Only you can
// //           approve or deny a resume — students cannot restart their own session.
// //         </p>
// //         <button className="apt-btn apt-btn-outline" style={{ padding: "6px 12px", fontSize: 12 }} onClick={load}>
// //           ↻ Refresh
// //         </button>
// //       </div>
// //
// //       {error && <p style={{ color: "#dc2626" }}>{error}</p>}
// //
// //       {violations.length === 0 && !error && (
// //         <p style={{ color: "#94a3b8" }}>No pending violations right now. 🎉</p>
// //       )}
// //
// //       {violations.map((v) => (
// //         <div key={v.assignmentId} className="cd-violation-card">
// //           <div className="cd-violation-head">
// //             <div>
// //               <strong>{v.studentUsername}</strong>
// //               <div style={{ fontSize: 12, color: "#64748b" }}>{v.testTitle}</div>
// //             </div>
// //             <span className="cd-violation-tag">{v.violationType?.replaceAll("_", " ")}</span>
// //           </div>
// //
// //           <div style={{ fontSize: 12, color: "#64748b" }}>
// //             Occurred: {v.violationOccurredAt ? new Date(v.violationOccurredAt).toLocaleString() : "—"}
// //             {" · "}
// //             Time remaining when it fired:{" "}
// //             {v.remainingSecondsAtViolation != null
// //               ? `${Math.floor(v.remainingSecondsAtViolation / 60)}m ${v.remainingSecondsAtViolation % 60}s`
// //               : "—"}
// //             {v.resumeCount > 0 && ` · Previously resumed ${v.resumeCount} time(s)`}
// //           </div>
// //
// //           {v.screenshotBase64 ? (
// //             <img
// //               src={v.screenshotBase64}
// //               alt="Screenshot at the moment of violation"
// //               className="cd-screenshot"
// //               onClick={() => setZoomed(v.screenshotBase64)}
// //             />
// //           ) : (
// //             <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>No screenshot was captured.</p>
// //           )}
// //
// //           <div className="cd-decision-row">
// //             <button
// //               className="apt-btn apt-btn-primary"
// //               style={{ background: "#16a34a" }}
// //               disabled={busyId === v.assignmentId}
// //               onClick={() => decide(v.assignmentId, true)}
// //             >
// //               ✓ Approve resume
// //             </button>
// //             <button
// //               className="apt-btn apt-btn-outline"
// //               style={{ borderColor: "#dc2626", color: "#dc2626" }}
// //               disabled={busyId === v.assignmentId}
// //               onClick={() => decide(v.assignmentId, false)}
// //             >
// //               ✕ Deny (keep auto-submitted)
// //             </button>
// //           </div>
// //         </div>
// //       ))}
// //
// //       {zoomed && (
// //         <div
// //           onClick={() => setZoomed(null)}
// //           style={{
// //             position: "fixed",
// //             inset: 0,
// //             background: "rgba(15,23,42,0.85)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             zIndex: 50,
// //             cursor: "zoom-out",
// //             padding: 30,
// //           }}
// //         >
// //           <img src={zoomed} alt="Screenshot, enlarged" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 10 }} />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// //
// // function ResultsTab() {
// //   const [testId, setTestId] = useState("");
// //   const [results, setResults] = useState(null);
// //   const [published, setPublished] = useState(null);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //
// //   const load = async () => {
// //     if (!testId) return;
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const { data } = await PlacementCodingApi.listResults(testId);
// //       setResults(data);
// //       setPublished(data.length > 0 ? null : null);
// //     } catch (e) {
// //       setError(e?.response?.data?.message || "Could not load results. Check the test ID.");
// //       setResults(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //
// //   const togglePublish = async (publish) => {
// //     try {
// //       await (publish ? PlacementCodingApi.publishResults(testId) : PlacementCodingApi.unpublishResults(testId));
// //       setPublished(publish);
// //     } catch (e) {
// //       setError(e?.response?.data?.message || "Could not update publish state.");
// //     }
// //   };
// //
// //   return (
// //     <div>
// //       <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
// //         <input
// //           value={testId}
// //           onChange={(e) => setTestId(e.target.value)}
// //           placeholder="Enter the coding test ID (shown after publishing)"
// //           style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1.5px solid #e6efff", fontSize: 13 }}
// //         />
// //         <button className="apt-btn apt-btn-primary" onClick={load} disabled={loading || !testId}>
// //           {loading ? "Loading…" : "Load results"}
// //         </button>
// //       </div>
// //
// //       {error && <p style={{ color: "#dc2626" }}>{error}</p>}
// //
// //       {results && (
// //         <>
// //           <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
// //             <button className="apt-btn apt-btn-primary" style={{ background: "#16a34a" }} onClick={() => togglePublish(true)}>
// //               Publish marks to students
// //             </button>
// //             <button className="apt-btn apt-btn-outline" onClick={() => togglePublish(false)}>
// //               Hide marks from students
// //             </button>
// //             {published !== null && (
// //               <span className={`cd-decision-badge ${published ? "approved" : "rejected"}`}>
// //                 {published ? "Published" : "Hidden"}
// //               </span>
// //             )}
// //           </div>
// //
// //           <table className="cd-results-table">
// //             <thead>
// //               <tr>
// //                 <th>Student</th>
// //                 <th>Status</th>
// //                 <th>Score</th>
// //                 <th>Submitted at</th>
// //                 <th>Violation</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {results.map((r) => (
// //                 <tr key={r.assignmentId}>
// //                   <td>{r.studentUsername}</td>
// //                   <td>
// //                     <span className={`cd-status-pill ${r.status}`}>{r.status?.replaceAll("_", " ")}</span>
// //                   </td>
// //                   <td>
// //                     {r.score != null ? `${r.score} / ${r.totalMarks}` : "—"}
// //                   </td>
// //                   <td>{r.submittedAt ? new Date(r.submittedAt).toLocaleString() : "—"}</td>
// //                   <td>{r.violationType ? r.violationType.replaceAll("_", " ") : "—"}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </>
// //       )}
// //     </div>
// //   );
// // }
// //
// // export default function CodingTestManage() {
// //   const [tab, setTab] = useState("violations");
// //
// //   return (
// //     <div className="apt-page">
// //       <div className="apt-container" style={{ maxWidth: 920 }}>
// //         <div className="apt-card">
// //           <h1 className="apt-title">Coding Test — Proctoring &amp; Results</h1>
// //           <p className="apt-subtitle">
// //             Review auto-submitted violations (with screenshots) and decide who may resume, then
// //             publish marks once you're ready for students to see them.
// //           </p>
// //
// //           <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
// //             <button
// //               className={`apt-btn ${tab === "violations" ? "apt-btn-primary" : "apt-btn-outline"}`}
// //               onClick={() => setTab("violations")}
// //             >
// //               Pending Violations
// //             </button>
// //             <button
// //               className={`apt-btn ${tab === "results" ? "apt-btn-primary" : "apt-btn-outline"}`}
// //               onClick={() => setTab("results")}
// //             >
// //               Results &amp; Publish
// //             </button>
// //           </div>
// //
// //           {tab === "violations" ? <ViolationsTab /> : <ResultsTab />}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { PlacementCodingApi } from "../../api/codingApi";
// import {
//   IoChevronBack,
//   IoDocumentTextOutline,
//   IoCheckmarkCircleOutline,
//   IoEyeOutline,
//   IoWarningOutline,
//   IoCodeSlashOutline,
//   IoTimeOutline,
//   IoPeopleOutline,
// } from "react-icons/io5";
// import "../../styles/aptitude.css";
// import "../../styles/coding.css";
//
// // ============================================================
// // Shared: question + student-results drill-in for a single test
// // ============================================================
//
// function TestDetails({ testId }) {
//   const [questions, setQuestions] = useState(null);
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [studentFilter, setStudentFilter] = useState("all");
//
//   useEffect(() => {
//     setLoading(true);
//     setError("");
//     Promise.all([
//       PlacementCodingApi.listQuestions(testId),
//       PlacementCodingApi.listResults(testId),
//     ])
//       .then(([q, r]) => {
//         setQuestions(q.data);
//         setResults(r.data);
//       })
//       .catch((e) => setError(e?.response?.data?.message || "Could not load test details."))
//       .finally(() => setLoading(false));
//   }, [testId]);
//
//   const filteredResults = useMemo(() => {
//     if (!results) return [];
//     if (studentFilter === "all") return results;
//     return results.filter((r) => r.status === studentFilter);
//   }, [results, studentFilter]);
//
//   if (loading) {
//     return (
//       <div className="apt-loading" style={{ padding: "24px 0" }}>
//         <div className="loader"></div>
//         <p>Loading details...</p>
//       </div>
//     );
//   }
//   if (error) return <p style={{ color: "#dc2626" }}>{error}</p>;
//
//   return (
//     <div
//       style={{
//         gridColumn: "1 / -1",
//         flexBasis: "100%",
//         width: "100%",
//         marginTop: 18,
//         paddingTop: 18,
//         borderTop: "1px solid #e6efff",
//       }}
//     >
//       {/* Compact question chips */}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
//         {questions.map((q) => (
//           <span
//             key={q.id}
//             title={q.description || q.title}
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 6,
//               padding: "6px 12px",
//               borderRadius: 999,
//               background: "#f4f8ff",
//               border: "1px solid #e6efff",
//               fontSize: 12.5,
//               color: "#0f172a",
//               whiteSpace: "nowrap",
//             }}
//           >
//             <strong style={{ fontWeight: 600 }}>{q.title}</strong>
//             <span style={{ color: "#94a3b8" }}>
//               · {q.difficulty} · {q.points} pts
//             </span>
//           </span>
//         ))}
//       </div>
//
//       {/* Results header + filter */}
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 10 }}>
//         <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#0f172a" }}>
//           Student Results ({filteredResults.length}/{results.length})
//         </p>
//         <select
//           value={studentFilter}
//           onChange={(e) => setStudentFilter(e.target.value)}
//           style={{
//             background: "#fff",
//             color: "#0f172a",
//             border: "1.5px solid #e6efff",
//             borderRadius: 8,
//             padding: "6px 10px",
//             fontSize: 13,
//           }}
//         >
//           <option value="all">All statuses</option>
//           <option value="ASSIGNED">Not started</option>
//           <option value="IN_PROGRESS">In progress</option>
//           <option value="SUBMITTED">Completed</option>
//           <option value="AUTO_SUBMITTED">Auto-submitted</option>
//         </select>
//       </div>
//
//       {/* Scrollable results table */}
//       <div
//         style={{
//           maxHeight: 320,
//           overflowY: "auto",
//           border: "1px solid #e6efff",
//           borderRadius: 12,
//         }}
//       >
//         <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, fontWeight: 500 }}>
//           <thead>
//             <tr>
//               {["Student", "Status", "Score", "Submitted at", "Violation"].map((h) => (
//                 <th
//                   key={h}
//                   style={{
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 1,
//                     textAlign: "left",
//                     padding: "10px 14px",
//                     background: "#f8fafc",
//                     borderBottom: "1px solid #e6efff",
//                     color: "#334155",
//                     fontWeight: 700,
//                   }}
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredResults.map((r, i) => (
//               <tr key={r.assignmentId} style={{ background: i % 2 === 1 ? "#fbfdff" : "#fff" }}>
//                 <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", color: "#0f172a", fontWeight: 600 }}>
//                   {r.studentUsername}
//                 </td>
//                 <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9" }}>
//                   <span className={`cd-status-pill ${r.status}`}>{r.status?.replaceAll("_", " ")}</span>
//                 </td>
//                 <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", color: "#0f172a", fontWeight: 600 }}>
//                   {r.score != null ? `${r.score} / ${r.totalMarks}` : "—"}
//                 </td>
//                 <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", color: "#64748b" }}>
//                   {r.submittedAt ? new Date(r.submittedAt).toLocaleString() : "—"}
//                 </td>
//                 <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", color: "#64748b" }}>
//                   {r.violationType ? r.violationType.replaceAll("_", " ") : "—"}
//                 </td>
//               </tr>
//             ))}
//             {filteredResults.length === 0 && (
//               <tr>
//                 <td colSpan={5} style={{ padding: "18px 14px", color: "#94a3b8", textAlign: "center" }}>
//                   No students match this filter.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
//
// // ============================================================
// // Page
// // ============================================================
//
// export default function CodingTestManage() {
//   const navigate = useNavigate();
//
//   const [tab, setTab] = useState("tests");
//
//   // -- tests tab state --
//   const [tests, setTests] = useState([]);
//   const [testsLoading, setTestsLoading] = useState(true);
//   const [testsError, setTestsError] = useState("");
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [expandedTestId, setExpandedTestId] = useState(null);
//   const [publishBusyId, setPublishBusyId] = useState(null);
//
//   // -- violations tab state --
//   const [violations, setViolations] = useState([]);
//   const [violationsLoading, setViolationsLoading] = useState(true);
//   const [violationsError, setViolationsError] = useState("");
//   const [decisionBusyId, setDecisionBusyId] = useState(null);
//   const [zoomed, setZoomed] = useState(null);
//
//   const loadTests = async () => {
//     setTestsLoading(true);
//     setTestsError("");
//     try {
//       const { data } = await PlacementCodingApi.listAllTests();
//       setTests(data);
//     } catch (e) {
//       setTestsError(e?.response?.data?.message || "Could not load tests.");
//     } finally {
//       setTestsLoading(false);
//     }
//   };
//
//   const loadViolations = async () => {
//     setViolationsLoading(true);
//     setViolationsError("");
//     try {
//       const { data } = await PlacementCodingApi.listPendingViolations();
//       setViolations(data);
//     } catch (e) {
//       setViolationsError(e?.response?.data?.message || "Could not load violations.");
//     } finally {
//       setViolationsLoading(false);
//     }
//   };
//
//   useEffect(() => {
//     loadTests();
//     loadViolations();
//   }, []);
//
//   const summary = useMemo(
//     () => ({
//       total: tests.length,
//       published: tests.filter((t) => t.resultsPublished).length,
//       hidden: tests.filter((t) => !t.resultsPublished).length,
//       pendingViolations: violations.length,
//     }),
//     [tests, violations]
//   );
//
//   const filteredTests = useMemo(() => {
//     return tests.filter((t) => {
//       if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
//       if (statusFilter === "published" && !t.resultsPublished) return false;
//       if (statusFilter === "unpublished" && t.resultsPublished) return false;
//       if (statusFilter === "pending" && t.pendingViolationCount === 0) return false;
//       return true;
//     });
//   }, [tests, search, statusFilter]);
//
//   const togglePublish = async (test) => {
//     setPublishBusyId(test.testId);
//     try {
//       if (test.resultsPublished) {
//         await PlacementCodingApi.unpublishResults(test.testId);
//       } else {
//         await PlacementCodingApi.publishResults(test.testId);
//       }
//       setTests((prev) =>
//         prev.map((t) => (t.testId === test.testId ? { ...t, resultsPublished: !t.resultsPublished } : t))
//       );
//     } catch (e) {
//       setTestsError(e?.response?.data?.message || "Could not update publish state.");
//     } finally {
//       setPublishBusyId(null);
//     }
//   };
//
//   const decide = async (assignmentId, approve) => {
//     setDecisionBusyId(assignmentId);
//     try {
//       await PlacementCodingApi.decideResume(assignmentId, approve);
//       setViolations((prev) => prev.filter((v) => v.assignmentId !== assignmentId));
//     } catch (e) {
//       setViolationsError(e?.response?.data?.message || "Could not record your decision.");
//     } finally {
//       setDecisionBusyId(null);
//     }
//   };
//
//   return (
//     <div className="apt-dashboard">
//       {/* ===========================
//             Header
//       ============================ */}
//       <header className="apt-dashboard-header">
//         <div className="apt-header">
//           <button className="apt-back-btn" onClick={() => navigate("/placement-dashboard")}>
//             <span className="back-icon">
//               <IoChevronBack />
//             </span>
//             Dashboard
//           </button>
//
//           <div className="apt-title-section">
//             <h1>Proctoring &amp; Results</h1>
//           </div>
//         </div>
//       </header>
//
//       {/* ===========================
//           Summary Cards
//       ============================ */}
//       <section className="summary-grid">
//         <div className="summary-card">
//           <div className="summary-icon blue">
//             <IoDocumentTextOutline />
//           </div>
//           <div>
//             <h2>{summary.total}</h2>
//             <p>Total Tests</p>
//           </div>
//         </div>
//
//         <div className="summary-card">
//           <div className="summary-icon green">
//             <IoCheckmarkCircleOutline />
//           </div>
//           <div>
//             <h2>{summary.published}</h2>
//             <p>Marks Published</p>
//           </div>
//         </div>
//
//         <div className="summary-card">
//           <div className="summary-icon yellow">
//             <IoEyeOutline />
//           </div>
//           <div>
//             <h2>{summary.hidden}</h2>
//             <p>Marks Hidden</p>
//           </div>
//         </div>
//
//         <div className="summary-card">
//           <div className="summary-icon red">
//             <IoWarningOutline />
//           </div>
//           <div>
//             <h2>{summary.pendingViolations}</h2>
//             <p>Pending Violations</p>
//           </div>
//         </div>
//       </section>
//
//       {/* ===========================
//           Tabs + Search
//       ============================ */}
//       <div className="apt-search-box" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//         <div style={{ display: "flex", gap: 8 }}>
//           <button
//             className={`apt-btn ${tab === "tests" ? "apt-btn-primary" : "apt-btn-outline"}`}
//             onClick={() => setTab("tests")}
//           >
//             All Tests
//           </button>
//           <button
//             className={`apt-btn ${tab === "violations" ? "apt-btn-primary" : "apt-btn-outline"}`}
//             onClick={() => setTab("violations")}
//             style={{ position: "relative" }}
//           >
//             Pending Violations
//             {summary.pendingViolations > 0 && <span className="cd-tab-badge">{summary.pendingViolations}</span>}
//           </button>
//         </div>
//
//         {tab === "tests" && (
//           <>
//             <input
//               type="text"
//               placeholder="Search tests by title..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               style={{ flex: 1, minWidth: 200 }}
//             />
//             <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//               <option value="all">All tests</option>
//               <option value="published">Marks published</option>
//               <option value="unpublished">Marks hidden</option>
//               <option value="pending">Has pending violations</option>
//             </select>
//           </>
//         )}
//
//         <button
//           className="apt-btn apt-btn-outline"
//           onClick={() => (tab === "tests" ? loadTests() : loadViolations())}
//         >
//           ↻ Refresh
//         </button>
//       </div>
//
//       {/* ===========================
//           List Container
//       ============================ */}
//       <section className="apt-list-wrapper">
//         {tab === "tests" ? (
//           <>
//             {testsLoading && (
//               <div className="apt-loading">
//                 <div className="loader"></div>
//                 <p>Loading tests...</p>
//               </div>
//             )}
//
//             {testsError && <p style={{ color: "#dc2626" }}>{testsError}</p>}
//
//             {!testsLoading && filteredTests.length === 0 && !testsError && (
//               <div className="empty-state">
//                 <div className="empty-icon">📄</div>
//                 <h2>No Tests Found</h2>
//                 <p>{search || statusFilter !== "all" ? "No test matches your search." : "No coding tests have been created yet."}</p>
//               </div>
//             )}
//
//             {!testsLoading &&
//               filteredTests.map((t) => {
//                 const expanded = expandedTestId === t.testId;
//                 return (
//                   <div
//                     className="assessment-card"
//                     key={t.testId}
//                     style={{ flexWrap: "wrap", alignItems: "flex-start" }}
//                   >
//                     <div className="assessment-left">
//                       <div className="assessment-title">
//                         <h3>{t.title}</h3>
//                         <span className={`apt-pill ${t.resultsPublished ? "apt-pill-green" : "apt-pill-blue"}`}>
//                           {t.resultsPublished ? "Marks Published" : "Marks Hidden"}
//                         </span>
//                       </div>
//
//                       <div className="assessment-meta">
//                         <div className="meta-item">
//                           <IoCodeSlashOutline />
//                           <span>
//                             {t.totalQuestions} Question{t.totalQuestions === 1 ? "" : "s"}
//                           </span>
//                         </div>
//                         <div className="meta-item">
//                           <IoTimeOutline />
//                           <span>{t.durationMinutes} Minutes</span>
//                         </div>
//                         <div className="meta-item">
//                           <IoPeopleOutline />
//                           <span>{t.totalStudents} Assigned</span>
//                         </div>
//                         <div className="meta-item">
//                           <IoCheckmarkCircleOutline />
//                           <span>{t.submittedCount} Submitted</span>
//                         </div>
//                       </div>
//
//                       <p className="assessment-desc">
//                         Test ID {t.testId} ·{" "}
//                         {t.publishedAt
//                           ? `Published ${new Date(t.publishedAt).toLocaleDateString()}`
//                           : "Not yet published"}
//                         . {t.inProgressCount} student{t.inProgressCount === 1 ? "" : "s"} currently in progress.
//                       </p>
//                     </div>
//
//                     <div className="assessment-right">
//                       {t.pendingViolationCount > 0 ? (
//                         <div className="status-message warning">
//                           <h4>Needs Attention</h4>
//                           <p>
//                             {t.pendingViolationCount} pending violation{t.pendingViolationCount === 1 ? "" : "s"} to
//                             review.
//                           </p>
//                         </div>
//                       ) : t.resultsPublished ? (
//                         <div className="status-message success">
//                           <h4>Marks Published</h4>
//                           <p>Students can see their results.</p>
//                         </div>
//                       ) : (
//                         <div className="status-message info">
//                           <h4>Marks Hidden</h4>
//                           <p>Publish when you're ready to reveal scores.</p>
//                         </div>
//                       )}
//
//                       <button
//                         className="apt-btn apt-btn-primary"
//                         style={{ background: t.resultsPublished ? "#dc2626" : "#16a34a" }}
//                         disabled={publishBusyId === t.testId}
//                         onClick={() => togglePublish(t)}
//                       >
//                         {t.resultsPublished ? "Hide Marks" : "Publish Marks"}
//                       </button>
//                       <button
//                         className="apt-btn apt-btn-outline"
//                         onClick={() => setExpandedTestId(expanded ? null : t.testId)}
//                       >
//                         {expanded ? "Hide Details ▲" : "View Details ▼"}
//                       </button>
//                     </div>
//
//                     {expanded && <TestDetails testId={t.testId} />}
//                   </div>
//                 );
//               })}
//           </>
//         ) : (
//           <>
//             {violationsLoading && (
//               <div className="apt-loading">
//                 <div className="loader"></div>
//                 <p>Loading pending violations...</p>
//               </div>
//             )}
//
//             {violationsError && <p style={{ color: "#dc2626" }}>{violationsError}</p>}
//
//             {!violationsLoading && violations.length === 0 && !violationsError && (
//               <div className="empty-state">
//                 <div className="empty-icon">🎉</div>
//                 <h2>All Clear</h2>
//                 <p>No pending violations right now.</p>
//               </div>
//             )}
//
//             {!violationsLoading &&
//               violations.map((v) => (
//                 <div className="assessment-card" key={v.assignmentId}>
//                   <div className="assessment-left">
//                     <div className="assessment-title">
//                       <h3>{v.studentUsername}</h3>
//                       <span className="apt-pill apt-pill-red">{v.violationType?.replaceAll("_", " ")}</span>
//                     </div>
//
//                     <div className="assessment-meta">
//                       <div className="meta-item">
//                         <IoDocumentTextOutline />
//                         <span>{v.testTitle}</span>
//                       </div>
//                       <div className="meta-item">
//                         <IoTimeOutline />
//                         <span>{v.violationOccurredAt ? new Date(v.violationOccurredAt).toLocaleString() : "—"}</span>
//                       </div>
//                       {v.remainingSecondsAtViolation != null && (
//                         <div className="meta-item">
//                           <IoWarningOutline />
//                           <span>
//                             {Math.floor(v.remainingSecondsAtViolation / 60)}m {v.remainingSecondsAtViolation % 60}s
//                             left when it fired
//                           </span>
//                         </div>
//                       )}
//                     </div>
//
//                     {v.resumeCount > 0 && (
//                       <p className="assessment-desc">Previously resumed {v.resumeCount} time(s).</p>
//                     )}
//
//                     {v.screenshotBase64 ? (
//                       <img
//                         src={v.screenshotBase64}
//                         alt="Screenshot at the moment of violation"
//                         className="cd-screenshot"
//                         onClick={() => setZoomed(v.screenshotBase64)}
//                       />
//                     ) : (
//                       <p className="assessment-desc">No screenshot was captured.</p>
//                     )}
//                   </div>
//
//                   <div className="assessment-right">
//                     <div className="status-message warning">
//                       <h4>Awaiting Decision</h4>
//                       <p>Only you can approve or deny — the student cannot restart their own session.</p>
//                     </div>
//                     <button
//                       className="apt-btn apt-btn-primary"
//                       style={{ background: "#16a34a" }}
//                       disabled={decisionBusyId === v.assignmentId}
//                       onClick={() => decide(v.assignmentId, true)}
//                     >
//                       ✓ Approve Resume
//                     </button>
//                     <button
//                       className="apt-btn apt-btn-outline"
//                       style={{ borderColor: "#dc2626", color: "#dc2626" }}
//                       disabled={decisionBusyId === v.assignmentId}
//                       onClick={() => decide(v.assignmentId, false)}
//                     >
//                       ✕ Deny
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </>
//         )}
//       </section>
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
//
//       {/* Footer */}
//       <footer className="apt-footer">
//         <p>© 2026 Placement Cell Portal</p>
//       </footer>
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlacementCodingApi } from "../../api/codingApi";
import PlacementSidebar from "../placement_cell/PlacementSidebar";

import {
  IoDocumentTextOutline,
  IoCheckmarkCircleOutline,
  IoEyeOutline,
  IoWarningOutline,
  IoCodeSlashOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoRefreshOutline,
  IoSearchOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoCloseOutline,
  IoShieldCheckmarkOutline,
  IoAlertCircleOutline,
  IoStatsChartOutline,
  IoPlayCircleOutline,
  IoInformationCircleOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";

import "../../styles/aptitude.css";
import "../../styles/coding.css";

/* ============================================================
   HELPERS
============================================================ */

const formatStatus = (status) => {
  if (!status) return "—";

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (date) => {
  if (!date) return "—";

  try {
    return new Date(date).toLocaleString();
  } catch {
    return "—";
  }
};

/* ============================================================
   LOADING COMPONENT
============================================================ */

function LoadingState({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-10 h-10 border-4 border-[#E8EEFF] border-t-[#3D6EFF] rounded-full animate-spin" />

      <p className="mt-4 text-sm text-[#64748B]">
        {text}
      </p>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div
        className="
          w-16
          h-16
          rounded-2xl
          bg-[#F1F5FF]
          flex
          items-center
          justify-center
          text-[#3D6EFF]
          mb-4
        "
      >
        {icon}
      </div>

      <h3 className="font-display text-lg font-semibold text-[#0B1D42]">
        {title}
      </h3>

      <p className="text-sm text-[#64748B] mt-2 max-w-md">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   TEST DETAILS
============================================================ */

function TestDetails({ testId }) {
  const [questions, setQuestions] = useState(null);
  const [results, setResults] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [studentFilter, setStudentFilter] =
    useState("all");

  useEffect(() => {
    let mounted = true;

    const loadDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const [questionsResponse, resultsResponse] =
          await Promise.all([
            PlacementCodingApi.listQuestions(testId),
            PlacementCodingApi.listResults(testId),
          ]);

        if (!mounted) return;

        setQuestions(
          Array.isArray(questionsResponse.data)
            ? questionsResponse.data
            : []
        );

        setResults(
          Array.isArray(resultsResponse.data)
            ? resultsResponse.data
            : []
        );
      } catch (e) {
        if (!mounted) return;

        setError(
          e?.response?.data?.message ||
            "Could not load test details."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      mounted = false;
    };
  }, [testId]);

  const filteredResults = useMemo(() => {
    if (!results) return [];

    if (studentFilter === "all") {
      return results;
    }

    return results.filter(
      (result) =>
        result.status === studentFilter
    );
  }, [results, studentFilter]);

  if (loading) {
    return (
      <div className="w-full mt-6 pt-6 border-t border-[#E6EFFF]">
        <LoadingState text="Loading test details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-6 pt-6 border-t border-[#E6EFFF]">
        <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-100 px-4 py-4 text-red-600">
          <IoAlertCircleOutline size={20} />

          <p className="text-sm">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 pt-6 border-t border-[#E6EFFF]">

      {/* ======================================================
          QUESTIONS
      ====================================================== */}

      <div className="mb-7">

        <div className="flex items-center gap-2 mb-3">
          <IoCodeSlashOutline
            className="text-[#3D6EFF]"
            size={18}
          />

          <h3 className="font-display font-semibold text-sm text-[#0B1D42]">
            Assessment questions
          </h3>
        </div>

        {questions.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">
            No questions available.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {questions.map((question, index) => (
              <div
                key={question.id || index}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-lg
                  bg-[#F8FAFF]
                  border
                  border-[#E6EFFF]
                "
              >
                <span className="
                  w-5
                  h-5
                  rounded-md
                  bg-[#E8EEFF]
                  text-[#3D6EFF]
                  flex
                  items-center
                  justify-center
                  text-[10px]
                  font-bold
                ">
                  {index + 1}
                </span>

                <span className="text-xs font-semibold text-[#0F172A]">
                  {question.title}
                </span>

                <span className="text-[11px] text-[#94A3B8]">
                  {question.difficulty}
                </span>

                <span className="text-[11px] text-[#64748B]">
                  {question.points} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ======================================================
          RESULTS HEADER
      ====================================================== */}

      <div className="
        flex
        items-center
        justify-between
        gap-4
        flex-wrap
        mb-4
      ">

        <div>
          <div className="flex items-center gap-2">
            <IoPeopleOutline
              className="text-[#3D6EFF]"
              size={18}
            />

            <h3 className="font-display font-semibold text-sm text-[#0B1D42]">
              Student results
            </h3>
          </div>

          <p className="text-xs text-[#64748B] mt-1">
            Showing {filteredResults.length} of{" "}
            {results.length} students
          </p>
        </div>

        <select
          value={studentFilter}
          onChange={(e) =>
            setStudentFilter(e.target.value)
          }
          className="
            bg-white
            border
            border-[#DCE3F5]
            rounded-lg
            px-3
            py-2
            text-xs
            text-[#334155]
            outline-none
            focus:border-[#3D6EFF]
          "
        >
          <option value="all">
            All statuses
          </option>

          <option value="ASSIGNED">
            Not started
          </option>

          <option value="IN_PROGRESS">
            In progress
          </option>

          <option value="SUBMITTED">
            Completed
          </option>

          <option value="AUTO_SUBMITTED">
            Auto-submitted
          </option>
        </select>
      </div>

      {/* ======================================================
          RESULTS TABLE
      ====================================================== */}

      <div className="
        overflow-hidden
        border
        border-[#E6EFFF]
        rounded-xl
        bg-white
      ">
        <div className="overflow-x-auto max-h-[360px] overflow-y-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E6EFFF]">

                <th className="
                  sticky
                  top-0
                  z-10
                  bg-[#F8FAFC]
                  text-left
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-[#475569]
                ">
                  Student
                </th>

                <th className="
                  sticky
                  top-0
                  z-10
                  bg-[#F8FAFC]
                  text-left
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-[#475569]
                ">
                  Status
                </th>

                <th className="
                  sticky
                  top-0
                  z-10
                  bg-[#F8FAFC]
                  text-left
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-[#475569]
                ">
                  Score
                </th>

                <th className="
                  sticky
                  top-0
                  z-10
                  bg-[#F8FAFC]
                  text-left
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-[#475569]
                ">
                  Submitted
                </th>

                <th className="
                  sticky
                  top-0
                  z-10
                  bg-[#F8FAFC]
                  text-left
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-[#475569]
                ">
                  Violation
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredResults.map(
                (result, index) => (
                  <tr
                    key={
                      result.assignmentId ||
                      index
                    }
                    className="
                      border-b
                      border-[#F1F5F9]
                      hover:bg-[#F8FAFF]
                      transition-colors
                    "
                  >

                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#0F172A]">
                        {result.studentUsername ||
                          "Unknown student"}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`
                          inline-flex
                          items-center
                          px-2.5
                          py-1
                          rounded-full
                          text-[10px]
                          font-semibold
                          ${
                            result.status ===
                            "SUBMITTED"
                              ? "bg-green-50 text-green-700"
                              : result.status ===
                                "IN_PROGRESS"
                              ? "bg-blue-50 text-blue-700"
                              : result.status ===
                                "AUTO_SUBMITTED"
                              ? "bg-orange-50 text-orange-700"
                              : "bg-slate-100 text-slate-600"
                          }
                        `}
                      >
                        {formatStatus(
                          result.status
                        )}
                      </span>
                    </td>

                    <td className="
                      px-4
                      py-3
                      font-semibold
                      text-[#0F172A]
                    ">
                      {result.score != null
                        ? `${result.score} / ${result.totalMarks}`
                        : "—"}
                    </td>

                    <td className="
                      px-4
                      py-3
                      text-xs
                      text-[#64748B]
                    ">
                      {formatDate(
                        result.submittedAt
                      )}
                    </td>

                    <td className="
                      px-4
                      py-3
                      text-xs
                      text-[#64748B]
                    ">
                      {result.violationType
                        ? formatStatus(
                            result.violationType
                          )
                        : "—"}
                    </td>

                  </tr>
                )
              )}

              {filteredResults.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="
                      px-4
                      py-10
                      text-center
                      text-sm
                      text-[#94A3B8]
                    "
                  >
                    No students match this filter.
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({
  icon,
  value,
  label,
  description,
  type = "blue",
}) {
  const styles = {
    blue: {
      bg: "bg-[#EEF3FF]",
      icon: "text-[#3D6EFF]",
      value: "text-[#1D4ED8]",
    },
    green: {
      bg: "bg-[#ECFDF5]",
      icon: "text-[#16A34A]",
      value: "text-[#15803D]",
    },
    yellow: {
      bg: "bg-[#FFFBEB]",
      icon: "text-[#D97706]",
      value: "text-[#B45309]",
    },
    red: {
      bg: "bg-[#FEF2F2]",
      icon: "text-[#DC2626]",
      value: "text-[#DC2626]",
    },
  };

  const current = styles[type];

  return (
    <div
      className="
        bg-white
        border
        border-[#DCE3F5]
        rounded-2xl
        p-5
        hover:shadow-md
        hover:-translate-y-0.5
        transition-all
      "
    >
      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="
            text-xs
            font-medium
            text-[#64748B]
          ">
            {label}
          </p>

          <p
            className={`
              font-display
              text-3xl
              font-semibold
              mt-2
              ${current.value}
            `}
          >
            {value}
          </p>

          <p className="
            text-[11px]
            text-[#94A3B8]
            mt-1
          ">
            {description}
          </p>

        </div>

        <div
          className={`
            w-11
            h-11
            rounded-xl
            ${current.bg}
            ${current.icon}
            flex
            items-center
            justify-center
            shrink-0
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function CodingTestManage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useState("tests");

  /* Tests */
  const [tests, setTests] = useState([]);
  const [testsLoading, setTestsLoading] =
    useState(true);
  const [testsError, setTestsError] =
    useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [expandedTestId, setExpandedTestId] =
    useState(null);

  const [publishBusyId, setPublishBusyId] =
    useState(null);

  /* Violations */
  const [violations, setViolations] =
    useState([]);

  const [violationsLoading, setViolationsLoading] =
    useState(true);

  const [violationsError, setViolationsError] =
    useState("");

  const [decisionBusyId, setDecisionBusyId] =
    useState(null);

  const [zoomed, setZoomed] =
    useState(null);

  /* ==========================================================
     ACTIVE SIDEBAR ITEM
  ========================================================== */

  const activeKey = useMemo(() => {
    if (
      location.pathname.startsWith(
        "/placement/coding-tests/manage"
      )
    ) {
      return "violations";
    }

    return "violations";
  }, [location.pathname]);

  /* ==========================================================
     LOAD TESTS
  ========================================================== */

  const loadTests = async () => {
    setTestsLoading(true);
    setTestsError("");

    try {
      const { data } =
        await PlacementCodingApi.listAllTests();

      setTests(
        Array.isArray(data) ? data : []
      );
    } catch (e) {
      setTestsError(
        e?.response?.data?.message ||
          "Could not load coding tests."
      );
    } finally {
      setTestsLoading(false);
    }
  };

  /* ==========================================================
     LOAD VIOLATIONS
  ========================================================== */

  const loadViolations = async () => {
    setViolationsLoading(true);
    setViolationsError("");

    try {
      const { data } =
        await PlacementCodingApi.listPendingViolations();

      setViolations(
        Array.isArray(data) ? data : []
      );
    } catch (e) {
      setViolationsError(
        e?.response?.data?.message ||
          "Could not load pending violations."
      );
    } finally {
      setViolationsLoading(false);
    }
  };

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    loadTests();
    loadViolations();
  }, []);

  /* ==========================================================
     SUMMARY
  ========================================================== */

  const summary = useMemo(
    () => ({
      total: tests.length,

      published: tests.filter(
        (test) =>
          test.resultsPublished
      ).length,

      hidden: tests.filter(
        (test) =>
          !test.resultsPublished
      ).length,

      pendingViolations:
        violations.length,
    }),
    [tests, violations]
  );

  /* ==========================================================
     FILTER TESTS
  ========================================================== */

  const filteredTests = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return tests.filter((test) => {

      if (
        query &&
        !String(test.title || "")
          .toLowerCase()
          .includes(query)
      ) {
        return false;
      }

      if (
        statusFilter === "published" &&
        !test.resultsPublished
      ) {
        return false;
      }

      if (
        statusFilter === "unpublished" &&
        test.resultsPublished
      ) {
        return false;
      }

      if (
        statusFilter === "pending" &&
        Number(
          test.pendingViolationCount || 0
        ) === 0
      ) {
        return false;
      }

      return true;
    });
  }, [
    tests,
    search,
    statusFilter,
  ]);

  /* ==========================================================
     PUBLISH / HIDE MARKS
  ========================================================== */

  const togglePublish = async (test) => {
    setPublishBusyId(test.testId);
    setTestsError("");

    try {
      if (test.resultsPublished) {
        await PlacementCodingApi.unpublishResults(
          test.testId
        );
      } else {
        await PlacementCodingApi.publishResults(
          test.testId
        );
      }

      setTests((previous) =>
        previous.map((item) =>
          item.testId === test.testId
            ? {
                ...item,
                resultsPublished:
                  !item.resultsPublished,
              }
            : item
        )
      );
    } catch (e) {
      setTestsError(
        e?.response?.data?.message ||
          "Could not update publish state."
      );
    } finally {
      setPublishBusyId(null);
    }
  };

  /* ==========================================================
     VIOLATION DECISION
  ========================================================== */

  const decide = async (
    assignmentId,
    approve
  ) => {
    setDecisionBusyId(assignmentId);
    setViolationsError("");

    try {
      await PlacementCodingApi.decideResume(
        assignmentId,
        approve
      );

      setViolations((previous) =>
        previous.filter(
          (violation) =>
            violation.assignmentId !==
            assignmentId
        )
      );
    } catch (e) {
      setViolationsError(
        e?.response?.data?.message ||
          "Could not record your decision."
      );
    } finally {
      setDecisionBusyId(null);
    }
  };

  /* ==========================================================
     REFRESH
  ========================================================== */

  const handleRefresh = () => {
    if (tab === "tests") {
      loadTests();
    } else {
      loadViolations();
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#F4F6FB]
        text-[#111827]
      "
    >

      {/* ======================================================
          COMMON SIDEBAR
      ====================================================== */}

      <PlacementSidebar
        activeKey={activeKey}
        onNavigate={navigate}
      />

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="
          md:ml-64
          min-h-screen
        "
      >

        {/* ====================================================
            PAGE HEADER
        ==================================================== */}

        <header className="
          bg-white
          border-b
          border-[#E6EFFF]
          px-6
          md:px-10
          py-7
        ">
          <div className="
            max-w-[1500px]
            mx-auto
          ">

            <div className="
              flex
              items-start
              justify-between
              gap-6
              flex-wrap
            ">

              <div>

                <div className="
                  flex
                  items-center
                  gap-2
                  mb-2
                ">
                  <div className="
                    w-8
                    h-8
                    rounded-lg
                    bg-[#EEF3FF]
                    text-[#3D6EFF]
                    flex
                    items-center
                    justify-center
                  ">
                    <IoShieldCheckmarkOutline
                      size={18}
                    />
                  </div>

                  <span className="
                    text-xs
                    font-semibold
                    text-[#3D6EFF]
                    uppercase
                    tracking-wide
                  ">
                    Placement Cell
                  </span>
                </div>

                <h1 className="
                  font-display
                  text-2xl
                  md:text-3xl
                  font-semibold
                  tracking-tight
                  text-[#0B1D42]
                ">
                  Proctoring &amp; Results
                </h1>

                <p className="
                  text-sm
                  text-[#64748B]
                  mt-1.5
                  max-w-2xl
                ">
                  Manage coding assessments,
                  review student performance,
                  and handle proctoring violations.
                </p>

              </div>

              <button
                type="button"
                onClick={handleRefresh}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-lg
                  bg-white
                  border
                  border-[#DCE3F5]
                  text-sm
                  font-medium
                  text-[#334155]
                  hover:border-[#3D6EFF]
                  hover:text-[#3D6EFF]
                  transition-colors
                "
              >
                <IoRefreshOutline
                  size={17}
                />

                Refresh
              </button>

            </div>

          </div>
        </header>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="
          px-6
          md:px-10
          py-8
        ">

          <div className="
            max-w-[1500px]
            mx-auto
          ">

            {/* ==================================================
                SUMMARY
            ================================================== */}

            <section className="
              grid
              sm:grid-cols-2
              xl:grid-cols-4
              gap-4
              mb-7
            ">

              <SummaryCard
                icon={
                  <IoDocumentTextOutline
                    size={21}
                  />
                }
                value={summary.total}
                label="Total tests"
                description="Coding assessments created"
                type="blue"
              />

              <SummaryCard
                icon={
                  <IoCheckmarkCircleOutline
                    size={21}
                  />
                }
                value={summary.published}
                label="Marks published"
                description="Students can view results"
                type="green"
              />

              <SummaryCard
                icon={
                  <IoEyeOutline
                    size={21}
                  />
                }
                value={summary.hidden}
                label="Marks hidden"
                description="Results waiting to be published"
                type="yellow"
              />

              <SummaryCard
                icon={
                  <IoWarningOutline
                    size={21}
                  />
                }
                value={
                  summary.pendingViolations
                }
                label="Pending violations"
                description="Require placement-cell review"
                type="red"
              />

            </section>

            {/* ==================================================
                TABS / TOOLBAR
            ================================================== */}

            <section className="
              bg-white
              border
              border-[#DCE3F5]
              rounded-2xl
              p-4
              mb-6
            ">

              <div className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                justify-between
                gap-4
              ">

                {/* Tabs */}

                <div className="
                  flex
                  items-center
                  gap-1
                  bg-[#F4F6FB]
                  rounded-xl
                  p-1
                  w-fit
                ">

                  <button
                    type="button"
                    onClick={() =>
                      setTab("tests")
                    }
                    className={`
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-lg
                      text-sm
                      font-medium
                      transition-all
                      ${
                        tab === "tests"
                          ? "bg-white text-[#0B1D42] shadow-sm"
                          : "text-[#64748B] hover:text-[#0B1D42]"
                      }
                    `}
                  >
                    <IoStatsChartOutline
                      size={16}
                    />

                    All Tests

                    <span className="
                      px-1.5
                      py-0.5
                      rounded-md
                      bg-[#EEF3FF]
                      text-[#3D6EFF]
                      text-[10px]
                      font-bold
                    ">
                      {summary.total}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setTab("violations")
                    }
                    className={`
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-lg
                      text-sm
                      font-medium
                      transition-all
                      ${
                        tab === "violations"
                          ? "bg-white text-[#0B1D42] shadow-sm"
                          : "text-[#64748B] hover:text-[#0B1D42]"
                      }
                    `}
                  >
                    <IoWarningOutline
                      size={16}
                    />

                    Violations

                    {summary.pendingViolations >
                      0 && (
                      <span className="
                        min-w-5
                        h-5
                        px-1
                        rounded-full
                        bg-red-500
                        text-white
                        flex
                        items-center
                        justify-center
                        text-[10px]
                        font-bold
                      ">
                        {
                          summary.pendingViolations
                        }
                      </span>
                    )}
                  </button>

                </div>

                {/* Search / Filter */}

                {tab === "tests" && (
                  <div className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-2
                    w-full
                    lg:w-auto
                  ">

                    <div className="
                      relative
                      w-full
                      sm:w-64
                    ">
                      <IoSearchOutline
                        size={16}
                        className="
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-[#94A3B8]
                        "
                      />

                      <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                          setSearch(
                            e.target.value
                          )
                        }
                        placeholder="Search tests..."
                        className="
                          w-full
                          bg-white
                          border
                          border-[#DCE3F5]
                          rounded-lg
                          pl-9
                          pr-3
                          py-2.5
                          text-sm
                          outline-none
                          focus:border-[#3D6EFF]
                          transition-colors
                        "
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(
                          e.target.value
                        )
                      }
                      className="
                        bg-white
                        border
                        border-[#DCE3F5]
                        rounded-lg
                        px-3
                        py-2.5
                        text-sm
                        text-[#334155]
                        outline-none
                        focus:border-[#3D6EFF]
                      "
                    >
                      <option value="all">
                        All tests
                      </option>

                      <option value="published">
                        Marks published
                      </option>

                      <option value="unpublished">
                        Marks hidden
                      </option>

                      <option value="pending">
                        Pending violations
                      </option>
                    </select>

                  </div>
                )}

              </div>

            </section>

            {/* ==================================================
                ERROR
            ================================================== */}

            {(tab === "tests"
              ? testsError
              : violationsError) && (
              <div className="
                mb-6
                flex
                items-center
                gap-3
                rounded-xl
                bg-red-50
                border
                border-red-100
                px-4
                py-3
                text-red-600
              ">
                <IoAlertCircleOutline
                  size={19}
                />

                <p className="text-sm flex-1">
                  {tab === "tests"
                    ? testsError
                    : violationsError}
                </p>

                <button
                  type="button"
                  onClick={handleRefresh}
                  className="
                    text-xs
                    font-semibold
                    underline
                  "
                >
                  Retry
                </button>
              </div>
            )}

            {/* ==================================================
                TESTS TAB
            ================================================== */}

            {tab === "tests" && (
              <section className="
                bg-white
                border
                border-[#DCE3F5]
                rounded-2xl
                overflow-hidden
              ">

                {/* Section Header */}

                <div className="
                  px-6
                  py-5
                  border-b
                  border-[#E6EFFF]
                  flex
                  items-center
                  justify-between
                  gap-4
                ">

                  <div>
                    <h2 className="
                      font-display
                      text-base
                      font-semibold
                      text-[#0B1D42]
                    ">
                      Coding assessments
                    </h2>

                    <p className="
                      text-xs
                      text-[#64748B]
                      mt-1
                    ">
                      Review published tests,
                      submissions and results.
                    </p>
                  </div>

                  <div className="
                    hidden
                    sm:flex
                    items-center
                    gap-2
                    text-xs
                    text-[#64748B]
                  ">
                    <IoDocumentTextOutline
                      size={15}
                    />

                    {filteredTests.length}{" "}
                    result
                    {filteredTests.length ===
                    1
                      ? ""
                      : "s"}
                  </div>

                </div>

                {/* Loading */}

                {testsLoading && (
                  <LoadingState text="Loading coding tests..." />
                )}

                {/* Empty */}

                {!testsLoading &&
                  filteredTests.length ===
                    0 &&
                  !testsError && (
                    <EmptyState
                      icon={
                        <IoDocumentTextOutline
                          size={30}
                        />
                      }
                      title="No coding tests found"
                      description={
                        search ||
                        statusFilter !== "all"
                          ? "No assessments match your current search or filter."
                          : "No coding assessments have been created yet."
                      }
                    />
                  )}

                {/* Test List */}

                {!testsLoading &&
                  filteredTests.length >
                    0 && (
                    <div className="divide-y divide-[#EEF2F7]">

                      {filteredTests.map(
                        (test) => {
                          const expanded =
                            expandedTestId ===
                            test.testId;

                          const pending =
                            Number(
                              test.pendingViolationCount ||
                                0
                            );

                          return (
                            <div
                              key={test.testId}
                              className="
                                p-6
                                hover:bg-[#FCFDFF]
                                transition-colors
                              "
                            >

                              <div className="
                                flex
                                flex-col
                                xl:flex-row
                                xl:items-center
                                justify-between
                                gap-6
                              ">

                                {/* LEFT */}

                                <div className="
                                  min-w-0
                                  flex-1
                                ">

                                  <div className="
                                    flex
                                    items-center
                                    gap-2
                                    flex-wrap
                                  ">

                                    <h3 className="
                                      font-display
                                      text-base
                                      font-semibold
                                      text-[#0B1D42]
                                    ">
                                      {test.title ||
                                        "Untitled Test"}
                                    </h3>

                                    <span
                                      className={`
                                        inline-flex
                                        items-center
                                        px-2.5
                                        py-1
                                        rounded-full
                                        text-[10px]
                                        font-semibold
                                        ${
                                          test.resultsPublished
                                            ? "bg-green-50 text-green-700"
                                            : "bg-blue-50 text-blue-700"
                                        }
                                      `}
                                    >
                                      {test.resultsPublished
                                        ? "Marks Published"
                                        : "Marks Hidden"}
                                    </span>

                                    {pending >
                                      0 && (
                                      <span className="
                                        inline-flex
                                        items-center
                                        gap-1
                                        px-2.5
                                        py-1
                                        rounded-full
                                        bg-red-50
                                        text-red-600
                                        text-[10px]
                                        font-semibold
                                      ">
                                        <IoWarningOutline
                                          size={11}
                                        />

                                        {pending}{" "}
                                        pending
                                      </span>
                                    )}

                                  </div>

                                  {/* META */}

                                  <div className="
                                    flex
                                    flex-wrap
                                    gap-x-5
                                    gap-y-2
                                    mt-4
                                  ">

                                    <div className="
                                      flex
                                      items-center
                                      gap-1.5
                                      text-xs
                                      text-[#64748B]
                                    ">
                                      <IoCodeSlashOutline
                                        size={15}
                                        className="text-[#3D6EFF]"
                                      />

                                      {test.totalQuestions ||
                                        0}{" "}
                                      question
                                      {test.totalQuestions ===
                                      1
                                        ? ""
                                        : "s"}
                                    </div>

                                    <div className="
                                      flex
                                      items-center
                                      gap-1.5
                                      text-xs
                                      text-[#64748B]
                                    ">
                                      <IoTimeOutline
                                        size={15}
                                        className="text-[#3D6EFF]"
                                      />

                                      {test.durationMinutes ||
                                        0}{" "}
                                      minutes
                                    </div>

                                    <div className="
                                      flex
                                      items-center
                                      gap-1.5
                                      text-xs
                                      text-[#64748B]
                                    ">
                                      <IoPeopleOutline
                                        size={15}
                                        className="text-[#3D6EFF]"
                                      />

                                      {test.totalStudents ||
                                        0}{" "}
                                      assigned
                                    </div>

                                    <div className="
                                      flex
                                      items-center
                                      gap-1.5
                                      text-xs
                                      text-[#64748B]
                                    ">
                                      <IoCheckmarkCircleOutline
                                        size={15}
                                        className="text-green-500"
                                      />

                                      {test.submittedCount ||
                                        0}{" "}
                                      submitted
                                    </div>

                                  </div>

                                  <p className="
                                    text-xs
                                    text-[#94A3B8]
                                    mt-3
                                  ">
                                    Test ID #
                                    {test.testId}

                                    {" · "}

                                    {test.publishedAt
                                      ? `Published ${new Date(
                                          test.publishedAt
                                        ).toLocaleDateString()}`
                                      : "Not yet published"}

                                    {" · "}

                                    {test.inProgressCount ||
                                      0}{" "}
                                    currently
                                    in progress
                                  </p>

                                </div>

                                {/* RIGHT */}

                                <div className="
                                  flex
                                  flex-col
                                  sm:flex-row
                                  xl:flex-col
                                  gap-2
                                  xl:w-48
                                ">

                                  {pending >
                                  0 ? (
                                    <div className="
                                      rounded-lg
                                      bg-red-50
                                      border
                                      border-red-100
                                      px-3
                                      py-2.5
                                    ">
                                      <p className="
                                        text-xs
                                        font-semibold
                                        text-red-700
                                      ">
                                        Attention required
                                      </p>

                                      <p className="
                                        text-[10px]
                                        text-red-500
                                        mt-0.5
                                      ">
                                        {pending}{" "}
                                        violation
                                        {pending ===
                                        1
                                          ? ""
                                          : "s"}{" "}
                                        pending
                                      </p>
                                    </div>
                                  ) : (
                                    <div
                                      className={`
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        border
                                        ${
                                          test.resultsPublished
                                            ? "bg-green-50 border-green-100"
                                            : "bg-blue-50 border-blue-100"
                                        }
                                      `}
                                    >
                                      <p
                                        className={`
                                          text-xs
                                          font-semibold
                                          ${
                                            test.resultsPublished
                                              ? "text-green-700"
                                              : "text-blue-700"
                                          }
                                        `}
                                      >
                                        {test.resultsPublished
                                          ? "Results live"
                                          : "Results hidden"}
                                      </p>

                                      <p
                                        className={`
                                          text-[10px]
                                          mt-0.5
                                          ${
                                            test.resultsPublished
                                              ? "text-green-600"
                                              : "text-blue-600"
                                          }
                                        `}
                                      >
                                        {test.resultsPublished
                                          ? "Students can view marks"
                                          : "Ready for publication"}
                                      </p>
                                    </div>
                                  )}

                                  <div className="
                                    flex
                                    gap-2
                                  ">

                                    <button
                                      type="button"
                                      disabled={
                                        publishBusyId ===
                                        test.testId
                                      }
                                      onClick={() =>
                                        togglePublish(
                                          test
                                        )
                                      }
                                      className={`
                                        flex-1
                                        px-3
                                        py-2
                                        rounded-lg
                                        text-xs
                                        font-semibold
                                        text-white
                                        transition-colors
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                        ${
                                          test.resultsPublished
                                            ? "bg-red-500 hover:bg-red-600"
                                            : "bg-green-600 hover:bg-green-700"
                                        }
                                      `}
                                    >
                                      {publishBusyId ===
                                      test.testId
                                        ? "Updating..."
                                        : test.resultsPublished
                                        ? "Hide Marks"
                                        : "Publish Marks"}
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        setExpandedTestId(
                                          expanded
                                            ? null
                                            : test.testId
                                        )
                                      }
                                      className="
                                        w-10
                                        rounded-lg
                                        border
                                        border-[#DCE3F5]
                                        flex
                                        items-center
                                        justify-center
                                        text-[#475569]
                                        hover:border-[#3D6EFF]
                                        hover:text-[#3D6EFF]
                                        transition-colors
                                      "
                                      aria-label={
                                        expanded
                                          ? "Hide details"
                                          : "View details"
                                      }
                                    >
                                      {expanded ? (
                                        <IoChevronUpOutline
                                          size={16}
                                        />
                                      ) : (
                                        <IoChevronDownOutline
                                          size={16}
                                        />
                                      )}
                                    </button>

                                  </div>

                                </div>

                              </div>

                              {/* DETAILS */}

                              {expanded && (
                                <TestDetails
                                  testId={
                                    test.testId
                                  }
                                />
                              )}

                            </div>
                          );
                        }
                      )}

                    </div>
                  )}

              </section>
            )}

            {/* ==================================================
                VIOLATIONS TAB
            ================================================== */}

            {tab === "violations" && (
              <section className="
                bg-white
                border
                border-[#DCE3F5]
                rounded-2xl
                overflow-hidden
              ">

                <div className="
                  px-6
                  py-5
                  border-b
                  border-[#E6EFFF]
                ">

                  <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  ">

                    <div>
                      <h2 className="
                        font-display
                        text-base
                        font-semibold
                        text-[#0B1D42]
                      ">
                        Pending proctoring violations
                      </h2>

                      <p className="
                        text-xs
                        text-[#64748B]
                        mt-1
                      ">
                        Review violations before
                        allowing students to resume.
                      </p>
                    </div>

                    {summary.pendingViolations >
                      0 && (
                      <div className="
                        hidden
                        sm:flex
                        items-center
                        gap-2
                        text-xs
                        font-semibold
                        text-red-600
                        bg-red-50
                        px-3
                        py-2
                        rounded-lg
                      ">
                        <IoWarningOutline
                          size={15}
                        />

                        {
                          summary.pendingViolations
                        }{" "}
                        pending
                      </div>
                    )}

                  </div>

                </div>

                {violationsLoading && (
                  <LoadingState text="Loading pending violations..." />
                )}

                {!violationsLoading &&
                  violations.length ===
                    0 &&
                  !violationsError && (
                    <EmptyState
                      icon={
                        <IoCheckmarkCircleOutline
                          size={32}
                        />
                      }
                      title="Everything is clear"
                      description="There are no pending proctoring violations waiting for your decision."
                    />
                  )}

                {!violationsLoading &&
                  violations.length >
                    0 && (
                    <div className="divide-y divide-[#EEF2F7]">

                      {violations.map(
                        (violation) => (
                          <div
                            key={
                              violation.assignmentId
                            }
                            className="
                              p-6
                              hover:bg-[#FCFDFF]
                              transition-colors
                            "
                          >

                            <div className="
                              flex
                              flex-col
                              xl:flex-row
                              gap-7
                            ">

                              {/* VIOLATION INFO */}

                              <div className="
                                flex-1
                                min-w-0
                              ">

                                <div className="
                                  flex
                                  items-center
                                  gap-2
                                  flex-wrap
                                ">

                                  <div className="
                                    w-9
                                    h-9
                                    rounded-lg
                                    bg-red-50
                                    text-red-500
                                    flex
                                    items-center
                                    justify-center
                                  ">
                                    <IoWarningOutline
                                      size={18}
                                    />
                                  </div>

                                  <div>
                                    <h3 className="
                                      font-display
                                      text-base
                                      font-semibold
                                      text-[#0B1D42]
                                    ">
                                      {violation.studentUsername ||
                                        "Unknown student"}
                                    </h3>

                                    <p className="
                                      text-xs
                                      text-[#64748B]
                                      mt-0.5
                                    ">
                                      {violation.testTitle ||
                                        "Coding assessment"}
                                    </p>
                                  </div>

                                  <span className="
                                    px-2.5
                                    py-1
                                    rounded-full
                                    bg-red-50
                                    text-red-600
                                    text-[10px]
                                    font-semibold
                                  ">
                                    {formatStatus(
                                      violation.violationType
                                    )}
                                  </span>

                                </div>

                                {/* META */}

                                <div className="
                                  grid
                                  sm:grid-cols-2
                                  lg:grid-cols-3
                                  gap-3
                                  mt-5
                                ">

                                  <div className="
                                    rounded-lg
                                    bg-[#F8FAFC]
                                    border
                                    border-[#EEF2F7]
                                    p-3
                                  ">
                                    <p className="
                                      text-[10px]
                                      uppercase
                                      tracking-wide
                                      text-[#94A3B8]
                                      font-semibold
                                    ">
                                      Violation time
                                    </p>

                                    <p className="
                                      text-xs
                                      font-medium
                                      text-[#334155]
                                      mt-1
                                    ">
                                      {formatDate(
                                        violation.violationOccurredAt
                                      )}
                                    </p>
                                  </div>

                                  <div className="
                                    rounded-lg
                                    bg-[#F8FAFC]
                                    border
                                    border-[#EEF2F7]
                                    p-3
                                  ">
                                    <p className="
                                      text-[10px]
                                      uppercase
                                      tracking-wide
                                      text-[#94A3B8]
                                      font-semibold
                                    ">
                                      Time remaining
                                    </p>

                                    <p className="
                                      text-xs
                                      font-medium
                                      text-[#334155]
                                      mt-1
                                    ">
                                      {violation.remainingSecondsAtViolation !=
                                      null
                                        ? `${Math.floor(
                                            violation.remainingSecondsAtViolation /
                                              60
                                          )}m ${
                                            violation.remainingSecondsAtViolation %
                                            60
                                          }s`
                                        : "—"}
                                    </p>
                                  </div>

                                  <div className="
                                    rounded-lg
                                    bg-[#F8FAFC]
                                    border
                                    border-[#EEF2F7]
                                    p-3
                                  ">
                                    <p className="
                                      text-[10px]
                                      uppercase
                                      tracking-wide
                                      text-[#94A3B8]
                                      font-semibold
                                    ">
                                      Previous resumes
                                    </p>

                                    <p className="
                                      text-xs
                                      font-medium
                                      text-[#334155]
                                      mt-1
                                    ">
                                      {violation.resumeCount ||
                                        0}{" "}
                                      time
                                      {violation.resumeCount ===
                                      1
                                        ? ""
                                        : "s"}
                                    </p>
                                  </div>

                                </div>

                                {/* SCREENSHOT */}

                                <div className="mt-5">

                                  <div className="
                                    flex
                                    items-center
                                    gap-2
                                    mb-2
                                  ">
                                    <IoEyeOutline
                                      size={16}
                                      className="text-[#3D6EFF]"
                                    />

                                    <span className="
                                      text-xs
                                      font-semibold
                                      text-[#334155]
                                    ">
                                      Evidence screenshot
                                    </span>
                                  </div>

                                  {violation.screenshotBase64 ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setZoomed(
                                          violation.screenshotBase64
                                        )
                                      }
                                      className="
                                        relative
                                        group
                                        block
                                        max-w-xl
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        border-[#DCE3F5]
                                        bg-[#F8FAFC]
                                      "
                                    >
                                      <img
                                        src={
                                          violation.screenshotBase64
                                        }
                                        alt="Screenshot captured at violation"
                                        className="
                                          block
                                          w-full
                                          max-h-72
                                          object-contain
                                          transition-transform
                                          duration-300
                                          group-hover:scale-[1.02]
                                        "
                                      />

                                      <div className="
                                        absolute
                                        inset-0
                                        bg-black/0
                                        group-hover:bg-black/20
                                        flex
                                        items-center
                                        justify-center
                                        transition-colors
                                      ">
                                        <span className="
                                          opacity-0
                                          group-hover:opacity-100
                                          bg-white
                                          text-[#0F172A]
                                          px-3
                                          py-2
                                          rounded-lg
                                          text-xs
                                          font-semibold
                                          shadow-lg
                                          transition-opacity
                                        ">
                                          Click to enlarge
                                        </span>
                                      </div>
                                    </button>
                                  ) : (
                                    <div className="
                                      max-w-xl
                                      rounded-xl
                                      border
                                      border-dashed
                                      border-[#DCE3F5]
                                      bg-[#F8FAFC]
                                      px-5
                                      py-7
                                      text-center
                                    ">
                                      <IoInformationCircleOutline
                                        size={24}
                                        className="
                                          mx-auto
                                          text-[#94A3B8]
                                        "
                                      />

                                      <p className="
                                        text-xs
                                        text-[#64748B]
                                        mt-2
                                      ">
                                        No screenshot was
                                        captured for this
                                        violation.
                                      </p>
                                    </div>
                                  )}

                                </div>

                              </div>

                              {/* DECISION PANEL */}

                              <div className="
                                xl:w-72
                                shrink-0
                              ">

                                <div className="
                                  rounded-xl
                                  bg-[#FFF8E7]
                                  border
                                  border-[#FDE68A]
                                  p-4
                                  mb-4
                                ">

                                  <div className="
                                    flex
                                    items-center
                                    gap-2
                                    text-[#B45309]
                                    mb-2
                                  ">
                                    <IoAlertCircleOutline
                                      size={17}
                                    />

                                    <span className="
                                      text-xs
                                      font-bold
                                    ">
                                      Awaiting decision
                                    </span>
                                  </div>

                                  <p className="
                                    text-xs
                                    leading-relaxed
                                    text-[#92400E]
                                  ">
                                    Review the evidence
                                    and decide whether
                                    this student can
                                    resume the assessment.
                                  </p>

                                </div>

                                <div className="
                                  flex
                                  flex-col
                                  gap-2
                                ">

                                  <button
                                    type="button"
                                    disabled={
                                      decisionBusyId ===
                                      violation.assignmentId
                                    }
                                    onClick={() =>
                                      decide(
                                        violation.assignmentId,
                                        true
                                      )
                                    }
                                    className="
                                      w-full
                                      flex
                                      items-center
                                      justify-center
                                      gap-2
                                      px-4
                                      py-3
                                      rounded-lg
                                      bg-green-600
                                      hover:bg-green-700
                                      text-white
                                      text-sm
                                      font-semibold
                                      transition-colors
                                      disabled:opacity-50
                                      disabled:cursor-not-allowed
                                    "
                                  >
                                    <IoCheckmarkOutline
                                      size={18}
                                    />

                                    {decisionBusyId ===
                                    violation.assignmentId
                                      ? "Processing..."
                                      : "Approve Resume"}
                                  </button>

                                  <button
                                    type="button"
                                    disabled={
                                      decisionBusyId ===
                                      violation.assignmentId
                                    }
                                    onClick={() =>
                                      decide(
                                        violation.assignmentId,
                                        false
                                      )
                                    }
                                    className="
                                      w-full
                                      flex
                                      items-center
                                      justify-center
                                      gap-2
                                      px-4
                                      py-3
                                      rounded-lg
                                      border
                                      border-red-200
                                      bg-white
                                      text-red-600
                                      hover:bg-red-50
                                      text-sm
                                      font-semibold
                                      transition-colors
                                      disabled:opacity-50
                                      disabled:cursor-not-allowed
                                    "
                                  >
                                    <IoCloseOutline
                                      size={18}
                                    />

                                    Deny Resume
                                  </button>

                                </div>

                                <p className="
                                  text-[10px]
                                  leading-relaxed
                                  text-[#94A3B8]
                                  mt-3
                                  text-center
                                ">
                                  The student cannot restart
                                  the session without a
                                  placement-cell decision.
                                </p>

                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

              </section>
            )}

          </div>

        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <footer className="
          border-t
          border-[#E6EFFF]
          px-6
          md:px-10
          py-5
        ">
          <div className="
            max-w-[1500px]
            mx-auto
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-2
          ">

            <p className="
              text-xs
              text-[#94A3B8]
            ">
              © 2026 Placement Cell Portal
            </p>

            <p className="
              text-xs
              text-[#CBD5E1]
            ">
              Coding Assessment Management
            </p>

          </div>
        </footer>

      </main>

      {/* ======================================================
          SCREENSHOT LIGHTBOX
      ====================================================== */}

      {zoomed && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-[#0B1D42]/90
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-5
          "
          onClick={() => setZoomed(null)}
        >

          <button
            type="button"
            onClick={() => setZoomed(null)}
            className="
              absolute
              top-5
              right-5
              w-10
              h-10
              rounded-full
              bg-white/10
              hover:bg-white/20
              text-white
              flex
              items-center
              justify-center
              transition-colors
            "
            aria-label="Close screenshot"
          >
            <IoCloseOutline
              size={24}
            />
          </button>

          <div
            className="
              max-w-[95vw]
              max-h-[90vh]
              overflow-auto
              rounded-xl
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <img
              src={zoomed}
              alt="Enlarged violation screenshot"
              className="
                block
                max-w-full
                max-h-[90vh]
                object-contain
                rounded-xl
                bg-white
              "
            />
          </div>

        </div>
      )}

    </div>
  );
}
