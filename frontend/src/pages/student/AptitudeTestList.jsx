// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { StudentAptitudeApi } from "../../api/aptitudeApi";
// import "../../styles/aptitude.css";
//
// const STATUS_LABEL = {
//   ASSIGNED: { text: "Not started", cls: "apt-pill-blue" },
//   IN_PROGRESS: { text: "In progress", cls: "apt-pill-blue" },
//   SUBMITTED: { text: "Completed", cls: "apt-pill-green" },
//   AUTO_SUBMITTED: { text: "Auto-submitted", cls: "apt-pill-red" },
// };
//
// export default function AptitudeTestList() {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     StudentAptitudeApi.listAssignments()
//       .then(({ data }) => setAssignments(data))
//       .finally(() => setLoading(false));
//   }, []);
//
//   const handleAction = (assignment) => {
//     if (assignment.status === "ASSIGNED") {
//       navigate(`/student/aptitude-tests/${assignment.testId}/take`);
//     } else if (
//       assignment.status === "SUBMITTED" ||
//       assignment.status === "AUTO_SUBMITTED"
//     ) {
//       navigate(`/student/aptitude-tests/${assignment.testId}/result`);
//     }
//     // IN_PROGRESS is intentionally not clickable here -- resuming isn't
//     // allowed; that state only exists transiently while a session is live.
//   };
//
//   return (
//     <div className="apt-page">
//       <div className="apt-container">
//         <div className="apt-card">
//           <h1 className="apt-title">Your Aptitude Tests</h1>
//           <p className="apt-subtitle">
//             Once started, each test runs full-screen with a fixed timer and
//             cannot be paused, resumed, or retaken.
//           </p>
//
//           {loading && <p>Loading…</p>}
//           {!loading && assignments.length === 0 && (
//             <p style={{ color: "#64748b" }}>No tests assigned yet.</p>
//           )}
//
//           {assignments.map((a) => {
//             const status = STATUS_LABEL[a.status] || STATUS_LABEL.ASSIGNED;
//             const clickable = a.status === "ASSIGNED" || a.status === "SUBMITTED" || a.status === "AUTO_SUBMITTED";
//             return (
//               <div className="apt-list-item" key={a.assignmentId}>
//                 <div>
//                   <h4>{a.title}</h4>
//                   <p>
//                     {a.totalQuestions} questions · {a.durationMinutes} minutes
//                     {a.score != null &&
//                       ` · Score: ${a.score}/${a.totalQuestions}`}
//                   </p>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                   <span className={`apt-pill ${status.cls}`}>{status.text}</span>
//                   {clickable && (
//                     <button
//                       className="apt-btn apt-btn-primary"
//                       onClick={() => handleAction(a)}
//                     >
//                       {a.status === "ASSIGNED" ? "Start Test" : "View Result"}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentAptitudeApi } from "../../api/aptitudeApi";
import { IoChevronBack } from "react-icons/io5";
import "../../styles/aptitude.css";

const STATUS_LABEL = {
  ASSIGNED: {
    text: "Not Started",
    cls: "apt-pill-blue",
  },
  IN_PROGRESS: {
    text: "In Progress",
    cls: "apt-pill-orange",
  },
  SUBMITTED: {
    text: "Completed",
    cls: "apt-pill-green",
  },
  AUTO_SUBMITTED: {
    text: "Auto Submitted",
    cls: "apt-pill-red",
  },
};

export default function AptitudeTestList() {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    StudentAptitudeApi.listAssignments()
      .then(({ data }) => {
        setAssignments(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const summary = useMemo(() => {
    return {
      total: assignments.length,

      pending: assignments.filter(
        (a) => a.status === "ASSIGNED"
      ).length,

      completed: assignments.filter(
        (a) => a.status === "SUBMITTED"
      ).length,

      autoSubmitted: assignments.filter(
        (a) => a.status === "AUTO_SUBMITTED"
      ).length,
    };
  }, [assignments]);

  const filteredAssignments = useMemo(() => {
    return assignments.filter((a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [assignments, searchTerm]);

  const handleAction = (assignment) => {
    if (assignment.status === "ASSIGNED") {
      navigate(
        `/student/aptitude-tests/${assignment.testId}/take`
      );
      return;
    }

    if (
      assignment.status === "SUBMITTED" ||
      assignment.status === "AUTO_SUBMITTED"
    ) {
      navigate(
        `/student/aptitude-tests/${assignment.testId}/result`
      );
    }
  };

  return (
    <div className="apt-dashboard">

      {/* ===========================
            Header
      ============================ */}

      <header className="apt-dashboard-header">

        <div>

{/*           <button */}
{/*             className="apt-back-btn" */}
{/*             onClick={() => navigate("/student-dashboard")} */}
{/*           > */}
{/*             ← Back to Dashboard */}
{/*           </button> */}

{/*           <div className="apt-breadcrumb"> */}
{/*             Dashboard */}
{/*             <span>/</span> */}
{/*             Aptitude Tests */}
{/*           </div> */}

{/*           <h1>Your Aptitude Tests</h1> */}
          <div className="apt-header">
            <button
              className="apt-back-btn"
              onClick={() => navigate("/student-dashboard")}
            >
              <span className="back-icon">
                <IoChevronBack />
              </span>
              Dashboard
            </button>

            <div className="apt-title-section">
              <h1>Cognitive Assessments</h1>
            </div>
          </div>

        </div>

      </header>

      {/* ===========================
          Summary Cards
      ============================ */}

      <section className="summary-grid">

        <div className="summary-card">

          <div className="summary-icon blue">
            📝
          </div>

          <div>

            <h2>{summary.total}</h2>

            <p>Total Tests</p>

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon yellow">
            ⏳
          </div>

          <div>

            <h2>{summary.pending}</h2>

            <p>Pending</p>

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon green">
            ✅
          </div>

          <div>

            <h2>{summary.completed}</h2>

            <p>Completed</p>

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon red">
            ⚠
          </div>

          <div>

            <h2>{summary.autoSubmitted}</h2>

            <p>Auto Submitted</p>

          </div>

        </div>

      </section>

      {/* ===========================
          Search Box
      ============================ */}

      <div className="apt-search-box">

        <input
          type="text"
          placeholder="Search assessments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

      {/* ===========================
          List Container
      ============================ */}

      <section className="apt-list-wrapper">
                {loading && (
                  <div className="apt-loading">
                    <div className="loader"></div>
                    <p>Loading your assessments...</p>
                  </div>
                )}

                {!loading && filteredAssignments.length === 0 && (
                  <div className="empty-state">

                    <div className="empty-icon">
                      📄
                    </div>

                    <h2>No Tests Found</h2>

                    <p>
                      {searchTerm
                        ? "No assessment matches your search."
                        : "No aptitude tests have been assigned yet."}
                    </p>

                  </div>
                )}

                {!loading &&
                  filteredAssignments.map((assignment) => {

                    const status =
                      STATUS_LABEL[assignment.status] ||
                      STATUS_LABEL.ASSIGNED;

                    const clickable =
                      assignment.status === "ASSIGNED" ||
                      assignment.status === "SUBMITTED" ||
                      assignment.status === "AUTO_SUBMITTED";

                    return (

                      <div
                        className="assessment-card"
                        key={assignment.assignmentId}
                      >

                        {/* Left Side */}

                        <div className="assessment-left">

                          <div className="assessment-title">

                            <h3>{assignment.title}</h3>

                            <span className={`apt-pill ${status.cls}`}>
                              {status.text}
                            </span>

                          </div>

                          <div className="assessment-meta">

                            <div className="meta-item">
                              📝
                              <span>
                                {assignment.totalQuestions} Questions
                              </span>
                            </div>

                            <div className="meta-item">
                              ⏱
                              <span>
                                {assignment.durationMinutes} Minutes
                              </span>
                            </div>

                            {assignment.score != null && (

                              <div className="meta-item">
                                🏆
                                <span>
                                  {assignment.score}/
                                  {assignment.totalQuestions}
                                </span>
                              </div>

                            )}

                          </div>

                          <p className="assessment-desc">

                            Complete this assessment within the allotted
                            duration. The test runs in full screen and
                            will be automatically submitted if any
                            violation is detected.

                          </p>

                        </div>

                        {/* Right Side */}

                        <div className="assessment-right">

                          {assignment.status === "ASSIGNED" && (

                            <div className="status-message">

                              <h4>Ready to Begin</h4>

                              <p>
                                Start whenever you're ready.
                              </p>

                            </div>

                          )}

                          {assignment.status === "SUBMITTED" && (

                            <div className="status-message success">

                              <h4>Assessment Completed</h4>

                              <p>
                                Your submission has been evaluated.
                              </p>

                            </div>

                          )}

                          {assignment.status === "AUTO_SUBMITTED" && (

                            <div className="status-message danger">

                              <h4>Auto Submitted</h4>

                              <p>
                                Test ended due to a rule violation.
                              </p>

                            </div>

                          )}

                          {clickable && (

                            <button
                              className="apt-btn apt-btn-primary"
                              onClick={() => handleAction(assignment)}
                            >
                              {assignment.status === "ASSIGNED"
                                ? "Start Test"
                                : "View Result"}
                            </button>

                          )}

                        </div>

                      </div>

                    );

                  })}

              </section>

              {/* Footer */}

              <footer className="apt-footer">

                <p>
                  © 2026 Student Assessment Portal
                </p>

              </footer>

            </div>
          );
        }