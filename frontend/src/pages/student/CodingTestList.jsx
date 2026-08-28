// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { StudentCodingApi } from "../../api/codingApi";
// import {
//   IoChevronBack,
//   IoCodeSlashOutline,
//   IoTimeOutline,
//   IoTrophyOutline,
//   IoDocumentTextOutline,
//   IoHourglassOutline,
//   IoCheckmarkCircleOutline,
//   IoWarningOutline,
// } from "react-icons/io5";
// import "../../styles/aptitude.css";
// import "../../styles/coding.css";
//
// const STATUS_LABEL = {
//   ASSIGNED: { text: "Not Started", cls: "apt-pill-blue" },
//   IN_PROGRESS: { text: "In Progress", cls: "apt-pill-orange" },
//   SUBMITTED: { text: "Completed", cls: "apt-pill-green" },
//   AUTO_SUBMITTED: { text: "Auto Submitted", cls: "apt-pill-red" },
// };
//
// export default function CodingTestList() {
//   const navigate = useNavigate();
//
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//
//   useEffect(() => {
//     StudentCodingApi.listAssignments()
//       .then(({ data }) => setAssignments(data))
//       .finally(() => setLoading(false));
//   }, []);
//
//   const summary = useMemo(
//     () => ({
//       total: assignments.length,
//       pending: assignments.filter((a) => a.status === "ASSIGNED").length,
//       completed: assignments.filter((a) => a.status === "SUBMITTED").length,
//       autoSubmitted: assignments.filter((a) => a.status === "AUTO_SUBMITTED").length,
//     }),
//     [assignments]
//   );
//
//   const filteredAssignments = useMemo(
//     () => assignments.filter((a) => a.title.toLowerCase().includes(searchTerm.toLowerCase())),
//     [assignments, searchTerm]
//   );
//
//   const handleAction = (a) => {
//     if (a.status === "ASSIGNED") {
//       navigate(`/student/coding-tests/${a.testId}/take`);
//       return;
//     }
//     if (a.status === "AUTO_SUBMITTED" && a.resumeDecision === "APPROVED") {
//       navigate(`/student/coding-tests/${a.testId}/take`);
//       return;
//     }
//     if (a.status === "SUBMITTED" || a.status === "AUTO_SUBMITTED") {
//       navigate(`/student/coding-tests/${a.testId}/result`);
//     }
//   };
//
//   return (
//     <div className="apt-dashboard">
//       {/* ===========================
//             Header
//       ============================ */}
//
//       <header className="apt-dashboard-header">
//         <div className="apt-header">
//           <button className="apt-back-btn" onClick={() => navigate("/student-dashboard")}>
//             <span className="back-icon">
//               <IoChevronBack />
//             </span>
//             Dashboard
//           </button>
//
//           <div className="apt-title-section">
//             <h1>Coding Assessments</h1>
//
//           </div>
//         </div>
//       </header>
//
//       {/* ===========================
//           Summary Cards
//       ============================ */}
//
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
//           <div className="summary-icon yellow">
//             <IoHourglassOutline />
//           </div>
//           <div>
//             <h2>{summary.pending}</h2>
//             <p>Pending</p>
//           </div>
//         </div>
//
//         <div className="summary-card">
//           <div className="summary-icon green">
//             <IoCheckmarkCircleOutline />
//           </div>
//           <div>
//             <h2>{summary.completed}</h2>
//             <p>Completed</p>
//           </div>
//         </div>
//
//         <div className="summary-card">
//           <div className="summary-icon red">
//             <IoWarningOutline />
//           </div>
//           <div>
//             <h2>{summary.autoSubmitted}</h2>
//             <p>Auto Submitted</p>
//           </div>
//         </div>
//       </section>
//
//       {/* ===========================
//           Search Box
//       ============================ */}
//
//       <div className="apt-search-box">
//         <input
//           type="text"
//           placeholder="Search assessments..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//
//       {/* ===========================
//           List Container
//       ============================ */}
//
//       <section className="apt-list-wrapper">
//         {loading && (
//           <div className="apt-loading">
//             <div className="loader"></div>
//             <p>Loading your assessments...</p>
//           </div>
//         )}
//
//         {!loading && filteredAssignments.length === 0 && (
//           <div className="empty-state">
//             <div className="empty-icon">📄</div>
//             <h2>No Tests Found</h2>
//             <p>
//               {searchTerm
//                 ? "No assessment matches your search."
//                 : "No coding tests have been assigned yet."}
//             </p>
//           </div>
//         )}
//
//         {!loading &&
//           filteredAssignments.map((a) => {
//             const status = STATUS_LABEL[a.status] || STATUS_LABEL.ASSIGNED;
//             const canResume = a.status === "AUTO_SUBMITTED" && a.resumeDecision === "APPROVED";
//             const pendingReview = a.status === "AUTO_SUBMITTED" && a.resumeDecision === "PENDING";
//             const rejected = a.status === "AUTO_SUBMITTED" && a.resumeDecision === "REJECTED";
//             const clickable =
//               a.status === "ASSIGNED" || a.status === "SUBMITTED" || a.status === "AUTO_SUBMITTED";
//
//             return (
//               <div className="assessment-card" key={a.assignmentId}>
//                 {/* Left Side */}
//                 <div className="assessment-left">
//                   <div className="assessment-title">
//                     <h3>{a.title}</h3>
//                     <span className={`apt-pill ${status.cls}`}>{status.text}</span>
//                   </div>
//
//                   <div className="assessment-meta">
//                     <div className="meta-item">
//                       <IoCodeSlashOutline />
//                       <span>
//                         {a.totalQuestions} Question{a.totalQuestions === 1 ? "" : "s"}
//                       </span>
//                     </div>
//
//                     <div className="meta-item">
//                       <IoTimeOutline />
//                       <span>{a.durationMinutes} Minutes</span>
//                     </div>
//
//                     {a.score != null && (
//                       <div className="meta-item">
//                         <IoTrophyOutline />
//                         <span>
//                           {a.score}/{a.totalMarks}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//
//                   <p className="assessment-desc">
//                     Write, run, and submit code directly in the browser across Python, Java, C,
//                     C++, or JavaScript. The test runs in full screen and will be automatically
//                     submitted if any violation is detected.
//                   </p>
//                 </div>
//
//                 {/* Right Side */}
//                 <div className="assessment-right">
//                   {a.status === "ASSIGNED" && (
//                     <div className="status-message">
//                       <h4>Ready to Begin</h4>
//                       <p>Start whenever you're ready.</p>
//                     </div>
//                   )}
//
//                   {a.status === "SUBMITTED" && (
//                     <div className="status-message success">
//                       <h4>Assessment Completed</h4>
//                       <p>
//                         {a.resultsPublished
//                           ? "Your submission has been evaluated."
//                           : "Marks not yet published by the Placement Cell."}
//                       </p>
//                     </div>
//                   )}
//
//                   {pendingReview && (
//                     <div className="status-message warning">
//                       <h4>Under Review</h4>
//                       <p>A violation auto-submitted this test. Awaiting Placement Cell review.</p>
//                     </div>
//                   )}
//
//                   {rejected && (
//                     <div className="status-message danger">
//                       <h4>Resume Denied</h4>
//                       <p>The Placement Cell reviewed the violation and denied a resume.</p>
//                     </div>
//                   )}
//
//                   {canResume && (
//                     <div className="status-message info">
//                       <h4>Resume Approved</h4>
//                       <p>The Placement Cell approved your request — you can continue.</p>
//                     </div>
//                   )}
//
//                   {clickable && (
//                     <button className="apt-btn apt-btn-primary" onClick={() => handleAction(a)}>
//                       {a.status === "ASSIGNED"
//                         ? "Start Test"
//                         : canResume
//                         ? "Resume Test"
//                         : "View Result"}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//       </section>
//
//       {/* Footer */}
//       <footer className="apt-footer">
//         <p>© 2026 Student Assessment Portal</p>
//       </footer>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentCodingApi } from "../../api/codingApi";
import StudentSidebar from "../student/StudentSidebar"; // adjust path if your sidebar lives elsewhere
import { Menu } from "lucide-react";
import {
  IoChevronBack,
  IoCodeSlashOutline,
  IoTimeOutline,
  IoTrophyOutline,
  IoDocumentTextOutline,
  IoHourglassOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";

const STATUS_LABEL = {
  ASSIGNED: { text: "Not Started", cls: "coding-pill-blue" },
  IN_PROGRESS: { text: "In Progress", cls: "coding-pill-orange" },
  SUBMITTED: { text: "Completed", cls: "coding-pill-green" },
  AUTO_SUBMITTED: { text: "Auto Submitted", cls: "coding-pill-red" },
};

export default function CodingTestList() {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    StudentCodingApi.listAssignments()
      .then(({ data }) => setAssignments(data))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(
    () => ({
      total: assignments.length,
      pending: assignments.filter((a) => a.status === "ASSIGNED").length,
      completed: assignments.filter((a) => a.status === "SUBMITTED").length,
      autoSubmitted: assignments.filter((a) => a.status === "AUTO_SUBMITTED").length,
    }),
    [assignments]
  );

  const filteredAssignments = useMemo(
    () => assignments.filter((a) => a.title.toLowerCase().includes(searchTerm.toLowerCase())),
    [assignments, searchTerm]
  );

  const handleAction = (a) => {
    if (a.status === "ASSIGNED") {
      navigate(`/student/coding-tests/${a.testId}/take`);
      return;
    }
    if (a.status === "AUTO_SUBMITTED" && a.resumeDecision === "APPROVED") {
      navigate(`/student/coding-tests/${a.testId}/take`);
      return;
    }
    if (a.status === "SUBMITTED" || a.status === "AUTO_SUBMITTED") {
      navigate(`/student/coding-tests/${a.testId}/result`);
    }
  };

  return (
    <div className="coding-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

        * { box-sizing: border-box; }

        .coding-shell {
          --navy: #0e1a2b;
          --navy-raised: #16273d;
          --blue: #1d4ed8;
          --blue-soft: rgba(29, 78, 216, 0.07);
          --ink: #101828;
          --muted: #667085;
          --border: #e4e7ec;
          --bg: #f7f8fa;

          display: flex;
          min-height: 100vh;
          width: 100%;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          background: var(--bg);
        }

        .coding-main {
          flex: 1;
          min-width: 0;
          padding: 32px 40px 60px;
        }

        @media (min-width: 1024px) {
          .coding-main {
            margin-left: 270px;
          }
        }

        /* ============ Topbar ============ */

        .coding-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .coding-topbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .coding-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #fff;
          color: var(--ink);
          cursor: pointer;
        }

        @media (min-width: 1024px) {
          .coding-menu-btn {
            display: none;
          }
        }

        .coding-back-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: var(--muted);
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
        }

        .coding-back-btn:hover {
          color: var(--ink);
        }

        .coding-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 6px;
        }

        .coding-title {
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 26px;
          margin: 0;
          letter-spacing: -0.2px;
        }

        /* ============ Summary cards ============ */

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        @media (max-width: 900px) {
          .summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .summary-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .summary-card h2 {
          font-family: 'Source Serif 4', serif;
          font-size: 22px;
          font-weight: 600;
          margin: 0;
          color: var(--ink);
        }

        .summary-card p {
          margin: 2px 0 0;
          font-size: 12.5px;
          color: var(--muted);
        }

        .summary-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .summary-icon.blue { background: rgba(29,78,216,0.1); color: var(--blue); }
        .summary-icon.yellow { background: rgba(217,119,6,0.1); color: #b45309; }
        .summary-icon.green { background: rgba(5,150,105,0.1); color: #047857; }
        .summary-icon.red { background: rgba(220,38,38,0.1); color: #b91c1c; }

        /* ============ Search ============ */

        .coding-search-box {
          margin-bottom: 20px;
        }

        .coding-search-box input {
          width: 100%;
          max-width: 360px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 10px 14px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .coding-search-box input::placeholder {
          color: #98a2b3;
        }

        .coding-search-box input:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px var(--blue-soft);
        }

        /* ============ List ============ */

        .coding-list-wrapper {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .coding-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 60px 0;
          color: var(--muted);
          font-size: 14px;
        }

        .loader {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 3px solid var(--border);
          border-top-color: var(--blue);
          animation: coding-spin 0.8s linear infinite;
        }

        @keyframes coding-spin {
          to { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 70px 20px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
        }

        .empty-state .empty-icon {
          font-size: 34px;
          margin-bottom: 10px;
        }

        .empty-state h2 {
          font-family: 'Source Serif 4', serif;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 6px;
        }

        .empty-state p {
          font-size: 13.5px;
          color: var(--muted);
          margin: 0;
        }

        .assessment-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 22px 24px;
          display: flex;
          justify-content: space-between;
          gap: 24px;
          transition: box-shadow 0.15s ease, border-color 0.15s ease;
        }

        .assessment-card:hover {
          border-color: #d0d5dd;
          box-shadow: 0 2px 10px rgba(16, 24, 40, 0.05);
        }

        @media (max-width: 720px) {
          .assessment-card {
            flex-direction: column;
          }
        }

        .assessment-left {
          flex: 1;
          min-width: 0;
        }

        .assessment-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .assessment-title h3 {
          font-family: 'Source Serif 4', serif;
          font-size: 17px;
          font-weight: 600;
          margin: 0;
          color: var(--ink);
        }

        .coding-pill {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .coding-pill-blue { background: rgba(29,78,216,0.1); color: var(--blue); }
        .coding-pill-orange { background: rgba(217,119,6,0.1); color: #b45309; }
        .coding-pill-green { background: rgba(5,150,105,0.1); color: #047857; }
        .coding-pill-red { background: rgba(220,38,38,0.1); color: #b91c1c; }

        .assessment-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-bottom: 12px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--muted);
        }

        .meta-item svg {
          color: var(--blue);
          font-size: 15px;
        }

        .assessment-desc {
          font-size: 13px;
          line-height: 1.6;
          color: var(--muted);
          margin: 0;
          max-width: 560px;
        }

        .assessment-right {
          flex-shrink: 0;
          width: 220px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 12px;
          text-align: right;
        }

        @media (max-width: 720px) {
          .assessment-right {
            width: 100%;
            align-items: flex-start;
            text-align: left;
            border-top: 1px solid var(--border);
            padding-top: 14px;
          }
        }

        .status-message h4 {
          font-size: 13.5px;
          font-weight: 600;
          margin: 0 0 3px;
          color: var(--ink);
        }

        .status-message p {
          font-size: 12px;
          color: var(--muted);
          margin: 0;
        }

        .status-message.success h4 { color: #047857; }
        .status-message.warning h4 { color: #b45309; }
        .status-message.danger h4 { color: #b91c1c; }
        .status-message.info h4 { color: var(--blue); }

        .coding-btn {
          border: none;
          border-radius: 6px;
          padding: 10px 18px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.05s ease;
        }

        .coding-btn-primary {
          background: var(--blue);
          color: #fff;
        }

        .coding-btn-primary:hover {
          background: #1740b8;
        }

        .coding-btn-primary:active {
          transform: translateY(1px);
        }

        .coding-footer {
          text-align: center;
          font-size: 12.5px;
          color: var(--muted);
          margin-top: 40px;
        }
      `}</style>

      <StudentSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="coding-main">
        <div className="coding-topbar">
          <div className="coding-topbar-left">
            <button className="coding-menu-btn" onClick={() => setMobileOpen(true)}>
              <Menu size={18} />
            </button>

            <div>
              <p className="coding-eyebrow">Placement Readiness</p>
              <h1 className="coding-title">Coding Assessments</h1>
            </div>
          </div>

          <button className="coding-back-btn" onClick={() => navigate("/student-dashboard")}>
            <IoChevronBack /> Dashboard
          </button>
        </div>

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
            <div className="summary-icon yellow">
              <IoHourglassOutline />
            </div>
            <div>
              <h2>{summary.pending}</h2>
              <p>Pending</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon green">
              <IoCheckmarkCircleOutline />
            </div>
            <div>
              <h2>{summary.completed}</h2>
              <p>Completed</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon red">
              <IoWarningOutline />
            </div>
            <div>
              <h2>{summary.autoSubmitted}</h2>
              <p>Auto Submitted</p>
            </div>
          </div>
        </section>

        <div className="coding-search-box">
          <input
            type="text"
            placeholder="Search assessments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <section className="coding-list-wrapper">
          {loading && (
            <div className="coding-loading">
              <div className="loader"></div>
              <p>Loading your assessments...</p>
            </div>
          )}

          {!loading && filteredAssignments.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h2>No Tests Found</h2>
              <p>
                {searchTerm
                  ? "No assessment matches your search."
                  : "No coding tests have been assigned yet."}
              </p>
            </div>
          )}

          {!loading &&
            filteredAssignments.map((a) => {
              const status = STATUS_LABEL[a.status] || STATUS_LABEL.ASSIGNED;
              const canResume = a.status === "AUTO_SUBMITTED" && a.resumeDecision === "APPROVED";
              const pendingReview = a.status === "AUTO_SUBMITTED" && a.resumeDecision === "PENDING";
              const rejected = a.status === "AUTO_SUBMITTED" && a.resumeDecision === "REJECTED";
              const clickable =
                a.status === "ASSIGNED" || a.status === "SUBMITTED" || a.status === "AUTO_SUBMITTED";

              return (
                <div className="assessment-card" key={a.assignmentId}>
                  <div className="assessment-left">
                    <div className="assessment-title">
                      <h3>{a.title}</h3>
                      <span className={`coding-pill ${status.cls}`}>{status.text}</span>
                    </div>

                    <div className="assessment-meta">
                      <div className="meta-item">
                        <IoCodeSlashOutline />
                        <span>
                          {a.totalQuestions} Question{a.totalQuestions === 1 ? "" : "s"}
                        </span>
                      </div>

                      <div className="meta-item">
                        <IoTimeOutline />
                        <span>{a.durationMinutes} Minutes</span>
                      </div>

                      {a.score != null && (
                        <div className="meta-item">
                          <IoTrophyOutline />
                          <span>
                            {a.score}/{a.totalMarks}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="assessment-desc">
                      Write, run, and submit code directly in the browser across Python, Java, C,
                      C++, or JavaScript. The test runs in full screen and will be automatically
                      submitted if any violation is detected.
                    </p>
                  </div>

                  <div className="assessment-right">
                    {a.status === "ASSIGNED" && (
                      <div className="status-message">
                        <h4>Ready to Begin</h4>
                        <p>Start whenever you're ready.</p>
                      </div>
                    )}

                    {a.status === "SUBMITTED" && (
                      <div className="status-message success">
                        <h4>Assessment Completed</h4>
                        <p>
                          {a.resultsPublished
                            ? "Your submission has been evaluated."
                            : "Marks not yet published by the Placement Cell."}
                        </p>
                      </div>
                    )}

                    {pendingReview && (
                      <div className="status-message warning">
                        <h4>Under Review</h4>
                        <p>A violation auto-submitted this test. Awaiting Placement Cell review.</p>
                      </div>
                    )}

                    {rejected && (
                      <div className="status-message danger">
                        <h4>Resume Denied</h4>
                        <p>The Placement Cell reviewed the violation and denied a resume.</p>
                      </div>
                    )}

                    {canResume && (
                      <div className="status-message info">
                        <h4>Resume Approved</h4>
                        <p>The Placement Cell approved your request — you can continue.</p>
                      </div>
                    )}

                    {clickable && (
                      <button className="coding-btn coding-btn-primary" onClick={() => handleAction(a)}>
                        {a.status === "ASSIGNED"
                          ? "Start Test"
                          : canResume
                          ? "Resume Test"
                          : "View Result"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </section>

        <footer className="coding-footer">
          <p>© 2026 Student Assessment Portal</p>
        </footer>
      </main>
    </div>
  );
}