// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { StudentAptitudeApi } from "../../api/aptitudeApi";
// import { IoChevronBack } from "react-icons/io5";
// import "../../styles/aptitude.css";
//
// const STATUS_LABEL = {
//   ASSIGNED: {
//     text: "Not Started",
//     cls: "apt-pill-blue",
//   },
//   IN_PROGRESS: {
//     text: "In Progress",
//     cls: "apt-pill-orange",
//   },
//   SUBMITTED: {
//     text: "Completed",
//     cls: "apt-pill-green",
//   },
//   AUTO_SUBMITTED: {
//     text: "Auto Submitted",
//     cls: "apt-pill-red",
//   },
// };
//
// export default function AptitudeTestList() {
//   const navigate = useNavigate();
//
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   const [searchTerm, setSearchTerm] = useState("");
//
//   useEffect(() => {
//     StudentAptitudeApi.listAssignments()
//       .then(({ data }) => {
//         setAssignments(data);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);
//
//   const summary = useMemo(() => {
//     return {
//       total: assignments.length,
//
//       pending: assignments.filter(
//         (a) => a.status === "ASSIGNED"
//       ).length,
//
//       completed: assignments.filter(
//         (a) => a.status === "SUBMITTED"
//       ).length,
//
//       autoSubmitted: assignments.filter(
//         (a) => a.status === "AUTO_SUBMITTED"
//       ).length,
//     };
//   }, [assignments]);
//
//   const filteredAssignments = useMemo(() => {
//     return assignments.filter((a) =>
//       a.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [assignments, searchTerm]);
//
//   const handleAction = (assignment) => {
//     if (assignment.status === "ASSIGNED") {
//       navigate(
//         `/student/aptitude-tests/${assignment.testId}/take`
//       );
//       return;
//     }
//
//     if (
//       assignment.status === "SUBMITTED" ||
//       assignment.status === "AUTO_SUBMITTED"
//     ) {
//       navigate(
//         `/student/aptitude-tests/${assignment.testId}/result`
//       );
//     }
//   };
//
//   return (
//     <div className="apt-dashboard">
//
//       {/* ===========================
//             Header
//       ============================ */}
//
//       <header className="apt-dashboard-header">
//
//         <div>
//
// {/*           <button */}
// {/*             className="apt-back-btn" */}
// {/*             onClick={() => navigate("/student-dashboard")} */}
// {/*           > */}
// {/*             ← Back to Dashboard */}
// {/*           </button> */}
//
// {/*           <div className="apt-breadcrumb"> */}
// {/*             Dashboard */}
// {/*             <span>/</span> */}
// {/*             Aptitude Tests */}
// {/*           </div> */}
//
// {/*           <h1>Your Aptitude Tests</h1> */}
//           <div className="apt-header">
//             <button
//               className="apt-back-btn"
//               onClick={() => navigate("/student-dashboard")}
//             >
//               <span className="back-icon">
//                 <IoChevronBack />
//               </span>
//               Dashboard
//             </button>
//
//             <div className="apt-title-section">
//               <h1>Cognitive Assessments</h1>
//             </div>
//           </div>
//
//         </div>
//
//       </header>
//
//       {/* ===========================
//           Summary Cards
//       ============================ */}
//
//       <section className="summary-grid">
//
//         <div className="summary-card">
//
//           <div className="summary-icon blue">
//             📝
//           </div>
//
//           <div>
//
//             <h2>{summary.total}</h2>
//
//             <p>Total Tests</p>
//
//           </div>
//
//         </div>
//
//         <div className="summary-card">
//
//           <div className="summary-icon yellow">
//             ⏳
//           </div>
//
//           <div>
//
//             <h2>{summary.pending}</h2>
//
//             <p>Pending</p>
//
//           </div>
//
//         </div>
//
//         <div className="summary-card">
//
//           <div className="summary-icon green">
//             ✅
//           </div>
//
//           <div>
//
//             <h2>{summary.completed}</h2>
//
//             <p>Completed</p>
//
//           </div>
//
//         </div>
//
//         <div className="summary-card">
//
//           <div className="summary-icon red">
//             ⚠
//           </div>
//
//           <div>
//
//             <h2>{summary.autoSubmitted}</h2>
//
//             <p>Auto Submitted</p>
//
//           </div>
//
//         </div>
//
//       </section>
//
//       {/* ===========================
//           Search Box
//       ============================ */}
//
//       <div className="apt-search-box">
//
//         <input
//           type="text"
//           placeholder="Search assessments..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//
//       </div>
//
//       {/* ===========================
//           List Container
//       ============================ */}
//
//       <section className="apt-list-wrapper">
//                 {loading && (
//                   <div className="apt-loading">
//                     <div className="loader"></div>
//                     <p>Loading your assessments...</p>
//                   </div>
//                 )}
//
//                 {!loading && filteredAssignments.length === 0 && (
//                   <div className="empty-state">
//
//                     <div className="empty-icon">
//                       📄
//                     </div>
//
//                     <h2>No Tests Found</h2>
//
//                     <p>
//                       {searchTerm
//                         ? "No assessment matches your search."
//                         : "No aptitude tests have been assigned yet."}
//                     </p>
//
//                   </div>
//                 )}
//
//                 {!loading &&
//                   filteredAssignments.map((assignment) => {
//
//                     const status =
//                       STATUS_LABEL[assignment.status] ||
//                       STATUS_LABEL.ASSIGNED;
//
//                     const clickable =
//                       assignment.status === "ASSIGNED" ||
//                       assignment.status === "SUBMITTED" ||
//                       assignment.status === "AUTO_SUBMITTED";
//
//                     return (
//
//                       <div
//                         className="assessment-card"
//                         key={assignment.assignmentId}
//                       >
//
//                         {/* Left Side */}
//
//                         <div className="assessment-left">
//
//                           <div className="assessment-title">
//
//                             <h3>{assignment.title}</h3>
//
//                             <span className={`apt-pill ${status.cls}`}>
//                               {status.text}
//                             </span>
//
//                           </div>
//
//                           <div className="assessment-meta">
//
//                             <div className="meta-item">
//                               📝
//                               <span>
//                                 {assignment.totalQuestions} Questions
//                               </span>
//                             </div>
//
//                             <div className="meta-item">
//                               ⏱
//                               <span>
//                                 {assignment.durationMinutes} Minutes
//                               </span>
//                             </div>
//
//                             {assignment.score != null && (
//
//                               <div className="meta-item">
//                                 🏆
//                                 <span>
//                                   {assignment.score}/
//                                   {assignment.totalQuestions}
//                                 </span>
//                               </div>
//
//                             )}
//
//                           </div>
//
//                           <p className="assessment-desc">
//
//                             Complete this assessment within the allotted
//                             duration. The test runs in full screen and
//                             will be automatically submitted if any
//                             violation is detected.
//
//                           </p>
//
//                         </div>
//
//                         {/* Right Side */}
//
//                         <div className="assessment-right">
//
//                           {assignment.status === "ASSIGNED" && (
//
//                             <div className="status-message">
//
//                               <h4>Ready to Begin</h4>
//
//                               <p>
//                                 Start whenever you're ready.
//                               </p>
//
//                             </div>
//
//                           )}
//
//                           {assignment.status === "SUBMITTED" && (
//
//                             <div className="status-message success">
//
//                               <h4>Assessment Completed</h4>
//
//                               <p>
//                                 Your submission has been evaluated.
//                               </p>
//
//                             </div>
//
//                           )}
//
//                           {assignment.status === "AUTO_SUBMITTED" && (
//
//                             <div className="status-message danger">
//
//                               <h4>Auto Submitted</h4>
//
//                               <p>
//                                 Test ended due to a rule violation.
//                               </p>
//
//                             </div>
//
//                           )}
//
//                           {clickable && (
//
//                             <button
//                               className="apt-btn apt-btn-primary"
//                               onClick={() => handleAction(assignment)}
//                             >
//                               {assignment.status === "ASSIGNED"
//                                 ? "Start Test"
//                                 : "View Result"}
//                             </button>
//
//                           )}
//
//                         </div>
//
//                       </div>
//
//                     );
//
//                   })}
//
//               </section>
//
//               {/* Footer */}
//
//               <footer className="apt-footer">
//
//                 <p>
//                   © 2026 Student Assessment Portal
//                 </p>
//
//               </footer>
//
//             </div>
//           );
//         }


import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  ClipboardList,
  Clock3,
  Search,
  ArrowRight,
  PlayCircle,
  Eye,
  RefreshCw,
} from "lucide-react";

import { StudentAptitudeApi } from "../../api/aptitudeApi";
import StudentSidebar from "../student/StudentSidebar";

const STATUS_CONFIG = {
  ASSIGNED: {
    text: "Not Started",
    tone: "blue",
  },

  IN_PROGRESS: {
    text: "In Progress",
    tone: "amber",
  },

  SUBMITTED: {
    text: "Completed",
    tone: "green",
  },

  AUTO_SUBMITTED: {
    text: "Auto Submitted",
    tone: "red",
  },
};

export default function AptitudeTestList() {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSidebar, setMobileSidebar] =
    useState(false);

  const loadAssignments = async () => {
    try {
      setLoading(true);

      const { data } =
        await StudentAptitudeApi.listAssignments();

      setAssignments(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(error);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const filteredAssignments = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    if (!query) return assignments;

    return assignments.filter((item) =>
      (item.title || "")
        .toLowerCase()
        .includes(query)
    );
  }, [assignments, searchTerm]);

  const handleAction = (assignment) => {
    if (assignment.status === "ASSIGNED") {
      navigate(
        `/student/aptitude-tests/${assignment.testId}/take`
      );
    } else if (
      assignment.status === "SUBMITTED" ||
      assignment.status === "AUTO_SUBMITTED"
    ) {
      navigate(
        `/student/aptitude-tests/${assignment.testId}/result`
      );
    }
  };

  const total = assignments.length;

  const pending = assignments.filter(
    (a) => a.status === "ASSIGNED"
  ).length;

  const completed = assignments.filter(
    (a) => a.status === "SUBMITTED"
  ).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

        .apt-list-page {
          --navy: #0e1a2b;
          --navy-raised: #16273d;
          --blue: #1d4ed8;
          --blue-soft: rgba(29, 78, 216, 0.07);
          --ink: #101828;
          --muted: #667085;
          --border: #e4e7ec;
          --bg: #ffffff;
          --green: #067647;
          --green-bg: #ecfdf3;
          --green-border: #abefc6;
          --amber: #b54708;
          --amber-bg: #fffaeb;
          --amber-border: #fedf89;
          --red: #b42318;
          --red-bg: #fef3f2;
          --red-border: #fecdca;

          min-height: 100vh;
          background: #fafbfc;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
        }

        .apt-list-shell {
          min-height: 100vh;
        }

        @media (min-width: 1024px) {
          .apt-list-shell {
            margin-left: 270px;
          }
        }

        .apt-list-header {
          position: sticky;
          top: 0;
          z-index: 30;
          border-bottom: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(6px);
        }

        .apt-list-header-row {
          display: flex;
          height: 76px;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
        }

        .apt-list-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .apt-list-menu-btn {
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #fff;
          padding: 9px;
          color: var(--muted);
          cursor: pointer;
        }

        @media (min-width: 1024px) {
          .apt-list-menu-btn {
            display: none;
          }
        }

        .apt-list-eyebrow {
          margin: 0;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: var(--blue);
        }

        .apt-list-h1 {
          margin: 3px 0 0;
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 21px;
          letter-spacing: -0.2px;
        }

        .apt-list-refresh {
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #fff;
          padding: 9px;
          color: var(--muted);
          cursor: pointer;
        }

        .apt-list-refresh:hover {
          background: var(--blue-soft);
          color: var(--blue);
        }

        .apt-list-spin {
          animation: apt-spin 0.9s linear infinite;
        }

        @keyframes apt-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .apt-list-main {
          padding: 24px;
        }

        .apt-list-hero {
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          background: var(--navy);
          padding: 34px 32px;
          color: #eef1f6;
        }

        .apt-list-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(600px 320px at 100% 0%, rgba(29, 78, 216, 0.3), transparent 60%);
          pointer-events: none;
        }

        .apt-list-hero-inner {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .apt-list-hero-inner {
            flex-direction: row;
            align-items: center;
          }
        }

        .apt-list-hero-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .apt-list-hero-mark {
          display: flex;
          height: 46px;
          width: 46px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: var(--navy-raised);
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .apt-list-hero-eyebrow {
          margin: 0;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #7d95c4;
        }

        .apt-list-hero-title {
          margin: 3px 0 0;
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 24px;
        }

        .apt-list-hero-copy {
          margin: 14px 0 0;
          max-width: 520px;
          font-size: 13.5px;
          line-height: 1.7;
          color: #aab6cc;
        }

        .apt-list-stats {
          display: flex;
          gap: 10px;
        }

        .apt-list-stat {
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 18px;
          text-align: center;
        }

        .apt-list-stat-value {
          margin: 0;
          font-family: 'Source Serif 4', serif;
          font-size: 20px;
          font-weight: 600;
        }

        .apt-list-stat-label {
          margin: 2px 0 0;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #8a96ab;
        }

        .apt-list-search-card {
          margin-top: 20px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: #fff;
          padding: 14px;
        }

        .apt-list-search-wrap {
          position: relative;
        }

        .apt-list-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #98a2b3;
        }

        .apt-list-search-input {
          width: 100%;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #fafbfc;
          padding: 11px 14px 11px 40px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          color: var(--ink);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .apt-list-search-input::placeholder {
          color: #98a2b3;
        }

        .apt-list-search-input:focus {
          border-color: var(--blue);
          background: #fff;
          box-shadow: 0 0 0 3px var(--blue-soft);
        }

        .apt-list-results {
          margin-top: 20px;
        }

        .apt-list-empty {
          border-radius: 12px;
          border: 1px solid var(--border);
          background: #fff;
          padding: 56px 24px;
          text-align: center;
        }

        .apt-list-empty.dashed {
          border-style: dashed;
        }

        .apt-list-spinner {
          margin: 0 auto;
          height: 34px;
          width: 34px;
          border-radius: 999px;
          border: 3px solid var(--border);
          border-top-color: var(--blue);
          animation: apt-spin 0.8s linear infinite;
        }

        .apt-list-empty-note {
          margin: 14px 0 0;
          font-size: 13px;
          color: var(--muted);
        }

        .apt-list-empty-title {
          margin: 14px 0 0;
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 16px;
        }

        .apt-list-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .apt-list-card {
          border-radius: 12px;
          border: 1px solid var(--border);
          background: #fff;
          padding: 20px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .apt-list-card:hover {
          border-color: #b9c6e0;
          box-shadow: 0 4px 16px rgba(16, 24, 40, 0.05);
        }

        .apt-list-card-inner {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        @media (min-width: 1024px) {
          .apt-list-card-inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .apt-list-card-title-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .apt-list-card-title {
          margin: 0;
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 16.5px;
        }

        .apt-list-badge {
          border-radius: 999px;
          border: 1px solid;
          padding: 3px 11px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .apt-list-badge.blue {
          color: var(--blue);
          background: var(--blue-soft);
          border-color: #bfd1f7;
        }

        .apt-list-badge.amber {
          color: var(--amber);
          background: var(--amber-bg);
          border-color: var(--amber-border);
        }

        .apt-list-badge.green {
          color: var(--green);
          background: var(--green-bg);
          border-color: var(--green-border);
        }

        .apt-list-badge.red {
          color: var(--red);
          background: var(--red-bg);
          border-color: var(--red-border);
        }

        .apt-list-meta-row {
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          font-size: 12.5px;
          color: var(--muted);
        }

        .apt-list-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .apt-list-action-btn {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 8px;
          border: none;
          background: var(--blue);
          padding: 12px 20px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .apt-list-action-btn:hover {
          background: #1740b8;
        }
      `}</style>

      <div className="apt-list-page">
        <StudentSidebar
          mobileOpen={mobileSidebar}
          onClose={() => setMobileSidebar(false)}
        />

        <div className="apt-list-shell">
          <header className="apt-list-header">
            <div className="apt-list-header-row">
              <div className="apt-list-header-left">
                <button
                  onClick={() =>
                    setMobileSidebar(true)
                  }
                  className="apt-list-menu-btn"
                >
                  <Menu size={19} />
                </button>

                <div>
                  <p className="apt-list-eyebrow">
                    Assessments
                  </p>
                  <h1 className="apt-list-h1">
                    Aptitude Tests
                  </h1>
                </div>
              </div>

              <button
                onClick={loadAssignments}
                disabled={loading}
                className="apt-list-refresh"
              >
                <RefreshCw
                  size={17}
                  className={
                    loading ? "apt-list-spin" : ""
                  }
                />
              </button>
            </div>
          </header>

          <main className="apt-list-main">
            <div className="apt-list-hero">
              <div className="apt-list-hero-inner">
                <div>
                  <div className="apt-list-hero-top">
                    <div className="apt-list-hero-mark">
                      <ClipboardList size={22} />
                    </div>

                    <div>
                      <p className="apt-list-hero-eyebrow">
                        Placement Preparation
                      </p>
                      <h2 className="apt-list-hero-title">
                        Your Aptitude Assessments
                      </h2>
                    </div>
                  </div>

                  <p className="apt-list-hero-copy">
                    Complete your assigned
                    assessments and monitor your
                    performance.
                  </p>
                </div>

                <div className="apt-list-stats">
                  <MiniStat
                    value={total}
                    label="Total"
                  />
                  <MiniStat
                    value={pending}
                    label="Pending"
                  />
                  <MiniStat
                    value={completed}
                    label="Done"
                  />
                </div>
              </div>
            </div>

            <div className="apt-list-search-card">
              <div className="apt-list-search-wrap">
                <Search
                  size={17}
                  className="apt-list-search-icon"
                />

                <input
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder="Search aptitude tests..."
                  className="apt-list-search-input"
                />
              </div>
            </div>

            <div className="apt-list-results">
              {loading ? (
                <div className="apt-list-empty">
                  <div className="apt-list-spinner" />
                  <p className="apt-list-empty-note">
                    Loading aptitude tests...
                  </p>
                </div>
              ) : filteredAssignments.length ===
                0 ? (
                <div className="apt-list-empty dashed">
                  <ClipboardList
                    size={34}
                    color="#c8cfda"
                  />
                  <h3 className="apt-list-empty-title">
                    No aptitude tests found
                  </h3>
                  <p className="apt-list-empty-note">
                    No tests match your current
                    search.
                  </p>
                </div>
              ) : (
                <div className="apt-list-cards">
                  {filteredAssignments.map(
                    (assignment) => {
                      const status =
                        STATUS_CONFIG[
                          assignment.status
                        ] ||
                        STATUS_CONFIG.ASSIGNED;

                      const canOpen =
                        assignment.status ===
                          "ASSIGNED" ||
                        assignment.status ===
                          "SUBMITTED" ||
                        assignment.status ===
                          "AUTO_SUBMITTED";

                      return (
                        <div
                          key={
                            assignment.assignmentId
                          }
                          className="apt-list-card"
                        >
                          <div className="apt-list-card-inner">
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <div className="apt-list-card-title-row">
                                <h3 className="apt-list-card-title">
                                  {assignment.title}
                                </h3>

                                <span
                                  className={`apt-list-badge ${status.tone}`}
                                >
                                  {status.text}
                                </span>
                              </div>

                              <div className="apt-list-meta-row">
                                <span className="apt-list-meta-item">
                                  <ClipboardList
                                    size={14}
                                    color="#1d4ed8"
                                  />
                                  {
                                    assignment.totalQuestions
                                  }{" "}
                                  Questions
                                </span>

                                <span className="apt-list-meta-item">
                                  <Clock3
                                    size={14}
                                    color="#1d4ed8"
                                  />
                                  {
                                    assignment.durationMinutes
                                  }{" "}
                                  Minutes
                                </span>
                              </div>
                            </div>

                            {canOpen && (
                              <button
                                onClick={() =>
                                  handleAction(
                                    assignment
                                  )
                                }
                                className="apt-list-action-btn"
                              >
                                {assignment.status ===
                                "ASSIGNED" ? (
                                  <>
                                    <PlayCircle
                                      size={17}
                                    />
                                    Start Test
                                  </>
                                ) : (
                                  <>
                                    <Eye
                                      size={17}
                                    />
                                    View Result
                                  </>
                                )}

                                <ArrowRight
                                  size={15}
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="apt-list-stat">
      <p className="apt-list-stat-value">{value}</p>
      <p className="apt-list-stat-label">{label}</p>
    </div>
  );
}