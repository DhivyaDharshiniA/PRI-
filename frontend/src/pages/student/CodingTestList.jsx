import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentCodingApi } from "../../api/codingApi";
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
import "../../styles/aptitude.css";
import "../../styles/coding.css";

const STATUS_LABEL = {
  ASSIGNED: { text: "Not Started", cls: "apt-pill-blue" },
  IN_PROGRESS: { text: "In Progress", cls: "apt-pill-orange" },
  SUBMITTED: { text: "Completed", cls: "apt-pill-green" },
  AUTO_SUBMITTED: { text: "Auto Submitted", cls: "apt-pill-red" },
};

export default function CodingTestList() {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="apt-dashboard">
      {/* ===========================
            Header
      ============================ */}

      <header className="apt-dashboard-header">
        <div className="apt-header">
          <button className="apt-back-btn" onClick={() => navigate("/student-dashboard")}>
            <span className="back-icon">
              <IoChevronBack />
            </span>
            Dashboard
          </button>

          <div className="apt-title-section">
            <h1>Coding Assessments</h1>

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
                {/* Left Side */}
                <div className="assessment-left">
                  <div className="assessment-title">
                    <h3>{a.title}</h3>
                    <span className={`apt-pill ${status.cls}`}>{status.text}</span>
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

                {/* Right Side */}
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
                    <button className="apt-btn apt-btn-primary" onClick={() => handleAction(a)}>
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

      {/* Footer */}
      <footer className="apt-footer">
        <p>© 2026 Student Assessment Portal</p>
      </footer>
    </div>
  );
}