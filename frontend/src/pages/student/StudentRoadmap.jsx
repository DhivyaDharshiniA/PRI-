 import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Map,
  CheckCircle2,
  Trophy,
  Code2,
  ClipboardList,
  RefreshCw,
  AlertCircle,
  Menu,
} from "lucide-react";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";
import StudentSidebar from "../student/StudentSidebar"; // adjust path if your sidebar lives elsewhere

const API_BASE_URL = "http://localhost:8080";

const StudentRoadmap = () => {
  const navigate = useNavigate();

  const [aptitudeResults, setAptitudeResults] = useState([]);
  const [codingResults, setCodingResults] = useState([]);

  const [loadingAptitude, setLoadingAptitude] = useState(true);
  const [loadingCoding, setLoadingCoding] = useState(true);

  const [aptitudeError, setAptitudeError] = useState("");
  const [codingError, setCodingError] = useState("");

  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("token");

  const axiosConfig = useMemo(
    () => ({
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    }),
    [token]
  );

  /*
   * ------------------------------------------------------------------------
   * Helper functions
   * ------------------------------------------------------------------------
   */

  const getValue = (obj, keys, defaultValue = null) => {
    for (const key of keys) {
      if (
        obj &&
        obj[key] !== undefined &&
        obj[key] !== null
      ) {
        return obj[key];
      }
    }

    return defaultValue;
  };

  const getTestId = (item) => {
    return getValue(item, [
      "testId",
      "aptitudeTestId",
      "codingTestId",
      "id",
    ]);
  };

  const getTestName = (item, fallback) => {
    return (
      getValue(item, [
        "testName",
        "title",
        "name",
        "testTitle",
      ]) || fallback
    );
  };

  const getScore = (item) => {
    const value = getValue(item, [
      "score",
      "marks",
      "totalScore",
      "obtainedMarks",
      "percentage",
      "scorePercentage",
    ]);

    if (value === null || value === undefined) {
      return null;
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return null;
    }

    return numericValue;
  };

  const getMaximumScore = (item) => {
    const value = getValue(item, [
      "maxScore",
      "maximumScore",
      "totalMarks",
      "maxMarks",
      "totalQuestions",
    ]);

    if (value === null || value === undefined) {
      return null;
    }

    const numericValue = Number(value);

    return Number.isNaN(numericValue)
      ? null
      : numericValue;
  };

  const getPercentage = (item) => {
    const directPercentage = getValue(item, [
      "percentage",
      "scorePercentage",
      "percentageScore",
    ]);

    if (
      directPercentage !== null &&
      directPercentage !== undefined
    ) {
      const value = Number(directPercentage);

      if (!Number.isNaN(value)) {
        return Math.round(value);
      }
    }

    const score = getScore(item);
    const maximum = getMaximumScore(item);

    if (
      score !== null &&
      maximum !== null &&
      maximum > 0
    ) {
      return Math.round((score / maximum) * 100);
    }

    /*
     * Some coding APIs already return score out of 100.
     */
    if (score !== null && score <= 100) {
      return Math.round(score);
    }

    return null;
  };

  const getDate = (item) => {
    const date = getValue(item, [
      "completedAt",
      "submittedAt",
      "attemptedAt",
      "completedDate",
      "date",
      "createdAt",
    ]);

    if (!date) {
      return "Date unavailable";
    }

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return String(date);
    }
  };

  /*
   * ------------------------------------------------------------------------
   * Extract arrays from different backend response formats
   * ------------------------------------------------------------------------
   */

  const extractArray = (responseData) => {
    if (Array.isArray(responseData)) {
      return responseData;
    }

    if (!responseData) {
      return [];
    }

    if (Array.isArray(responseData.content)) {
      return responseData.content;
    }

    if (Array.isArray(responseData.data)) {
      return responseData.data;
    }

    if (Array.isArray(responseData.results)) {
      return responseData.results;
    }

    if (Array.isArray(responseData.tests)) {
      return responseData.tests;
    }

    if (Array.isArray(responseData.assignments)) {
      return responseData.assignments;
    }

    return [];
  };

  /*
   * ------------------------------------------------------------------------
   * APTITUDE
   *
   * IMPORTANT:
   * Keep this URL aligned with the student aptitude endpoint already used
   * by your AptitudeTestList / AptitudeTestResult.
   * ------------------------------------------------------------------------
   */

  const fetchAptitudeResults = async () => {
    setLoadingAptitude(true);
    setAptitudeError("");

    try {
      /*
       * First try the common student assignment/result endpoint.
       *
       * If your AptitudeTestList already uses another endpoint,
       * replace ONLY this URL with that existing endpoint.
       */
      const response = await axios.get(
        `${API_BASE_URL}/api/student/aptitude-tests`,
        axiosConfig
      );

      const data = extractArray(response.data);

      /*
       * Only show tests which have actually been attended/completed.
       */
      const completed = data.filter((item) => {
        const status = String(
          getValue(item, [
            "status",
            "attemptStatus",
            "assignmentStatus",
          ]) || ""
        ).toUpperCase();

        const completedFlag = getValue(item, [
          "completed",
          "isCompleted",
          "attempted",
          "isAttempted",
        ]);

        const score = getScore(item);

        return (
          status === "COMPLETED" ||
          status === "SUBMITTED" ||
          status === "ATTENDED" ||
          status === "FINISHED" ||
          completedFlag === true ||
          score !== null
        );
      });

      setAptitudeResults(completed);
    } catch (error) {
      console.error(
        "Failed to load aptitude roadmap results:",
        error
      );

      /*
       * Don't break the entire roadmap when one module is unavailable.
       */
      setAptitudeResults([]);

      setAptitudeError(
        error.response?.status === 401
          ? "Please login again."
          : "Aptitude results could not be loaded."
      );
    } finally {
      setLoadingAptitude(false);
    }
  };

  /*
   * ------------------------------------------------------------------------
   * CODING
   *
   * DO NOT CALL:
   *
   * /api/placement/coding-tests/{testId}/results
   *
   * That endpoint belongs to the Placement Cell.
   *
   * The student roadmap must use the student coding endpoint.
   * ------------------------------------------------------------------------
   */

  const fetchCodingResults = async () => {
    setLoadingCoding(true);
    setCodingError("");

    try {
      /*
       * This should be the same student-facing endpoint that your
       * CodingTestList.jsx uses.
       *
       * We intentionally do NOT use the PlacementCodingTestController.
       */
      const response = await axios.get(
        `${API_BASE_URL}/api/student/coding-tests`,
        axiosConfig
      );

      const data = extractArray(response.data);

      const completed = data.filter((item) => {
        const status = String(
          getValue(item, [
            "status",
            "attemptStatus",
            "assignmentStatus",
            "submissionStatus",
          ]) || ""
        ).toUpperCase();

        const completedFlag = getValue(item, [
          "completed",
          "isCompleted",
          "attempted",
          "isAttempted",
          "submitted",
          "isSubmitted",
        ]);

        const score = getScore(item);

        return (
          status === "COMPLETED" ||
          status === "SUBMITTED" ||
          status === "ATTENDED" ||
          status === "FINISHED" ||
          completedFlag === true ||
          score !== null
        );
      });

      setCodingResults(completed);
    } catch (error) {
      console.error(
        "Failed to load coding roadmap results:",
        error
      );

      setCodingResults([]);

      if (error.response?.status === 401) {
        setCodingError("Please login again.");
      } else {
        setCodingError(
          "Coding results could not be loaded."
        );
      }
    } finally {
      setLoadingCoding(false);
    }
  };

  /*
   * ------------------------------------------------------------------------
   * LOAD
   * ------------------------------------------------------------------------
   */

  useEffect(() => {
    fetchAptitudeResults();
    fetchCodingResults();
  }, []);

  /*
   * ------------------------------------------------------------------------
   * COMBINED ATTENDED TESTS
   * ------------------------------------------------------------------------
   */

  const attendedTests = useMemo(() => {
    const aptitude = aptitudeResults.map(
      (item, index) => ({
        id:
          getTestId(item) ||
          `aptitude-${index}`,

        name: getTestName(
          item,
          "Aptitude Assessment"
        ),

        type: "Aptitude",

        icon: ClipboardList,

        score: getScore(item),

        percentage: getPercentage(item),

        date: getDate(item),
      })
    );

    const coding = codingResults.map(
      (item, index) => ({
        id:
          getTestId(item) ||
          `coding-${index}`,

        name: getTestName(
          item,
          "Coding Assessment"
        ),

        type: "Coding",

        icon: Code2,

        score: getScore(item),

        percentage: getPercentage(item),

        date: getDate(item),
      })
    );

    return [...aptitude, ...coding].sort(
      (a, b) => {
        if (
          a.date === "Date unavailable" ||
          b.date === "Date unavailable"
        ) {
          return 0;
        }

        return (
          new Date(b.date) -
          new Date(a.date)
        );
      }
    );
  }, [
    aptitudeResults,
    codingResults,
  ]);

  /*
   * ------------------------------------------------------------------------
   * SUMMARY
   * ------------------------------------------------------------------------
   */

  const totalTests = attendedTests.length;

  const aptitudeCount = attendedTests.filter(
    (test) => test.type === "Aptitude"
  ).length;

  const codingCount = attendedTests.filter(
    (test) => test.type === "Coding"
  ).length;

  const scoredTests = attendedTests.filter(
    (test) =>
      test.percentage !== null &&
      test.percentage !== undefined
  );

  const averageScore =
    scoredTests.length > 0
      ? Math.round(
          scoredTests.reduce(
            (sum, test) =>
              sum + Number(test.percentage),
            0
          ) / scoredTests.length
        )
      : 0;

  /*
   * ------------------------------------------------------------------------
   * ROADMAP STATUS
   * ------------------------------------------------------------------------
   */

  const roadmapSteps = [
    {
      number: 1,
      title: "Aptitude Foundation",
      description:
        aptitudeCount > 0
          ? `${aptitudeCount} aptitude test${
              aptitudeCount > 1 ? "s" : ""
            } completed`
          : "Complete your first aptitude test",
      status:
        aptitudeCount > 0
          ? "completed"
          : "current",
    },

    {
      number: 2,
      title: "Coding Practice",
      description:
        codingCount > 0
          ? `${codingCount} coding test${
              codingCount > 1 ? "s" : ""
            } completed`
          : "Complete your first coding test",
      status:
        codingCount > 0
          ? "completed"
          : aptitudeCount > 0
          ? "current"
          : "upcoming",
    },

    {
      number: 3,
      title: "Improve Your Score",
      description:
        averageScore > 0
          ? `Current average: ${averageScore}%`
          : "Your score will appear here",
      status:
        averageScore >= 70
          ? "completed"
          : totalTests > 0
          ? "current"
          : "upcoming",
    },

    {
      number: 4,
      title: "Placement Ready",
      description:
        averageScore >= 80
          ? "You are placement ready"
          : "Reach 80% average score",
      status:
        averageScore >= 80
          ? "completed"
          : "upcoming",
    },
  ];

  /*
   * ------------------------------------------------------------------------
   * SCORE COLOR
   * ------------------------------------------------------------------------
   */

  const getScoreClass = (percentage) => {
    if (percentage === null) {
      return "score-neutral";
    }

    if (percentage >= 80) {
      return "score-excellent";
    }

    if (percentage >= 60) {
      return "score-good";
    }

    return "score-low";
  };

  /*
   * ------------------------------------------------------------------------
   * UI
   * ------------------------------------------------------------------------
   */

  return (
    <div className="roadmap-shell">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

        * { box-sizing: border-box; }

        .roadmap-shell {
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

        .roadmap-main {
          flex: 1;
          min-width: 0;
          padding: 32px 40px 60px;
        }

        @media (min-width: 1024px) {
          .roadmap-main {
            margin-left: 270px;
          }
        }

        /* ============ Topbar ============ */

        .roadmap-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 26px;
        }

        .roadmap-topbar-left {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .roadmap-menu-btn {
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
          flex-shrink: 0;
          margin-top: 2px;
        }

        @media (min-width: 1024px) {
          .roadmap-menu-btn {
            display: none;
          }
        }

        .roadmap-heading-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
          padding: 8px 13px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: #fff;
          color: var(--muted);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .back-button:hover {
          color: var(--ink);
          border-color: #c7d7fe;
        }

        .roadmap-heading {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .roadmap-heading-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(29,78,216,0.1);
          color: var(--blue);
          flex-shrink: 0;
        }

        .roadmap-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 4px;
        }

        .roadmap-title-main {
          margin: 0;
          font-family: 'Source Serif 4', serif;
          font-size: 25px;
          font-weight: 600;
          letter-spacing: -0.2px;
          color: var(--ink);
        }

        .refresh-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 15px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: #fff;
          color: var(--ink);
          cursor: pointer;
          font-size: 12.5px;
          font-weight: 600;
          flex-shrink: 0;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .refresh-button:hover {
          background: #f8fafc;
          border-color: #c7d7fe;
        }

        /* ============ Summary ============ */

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .summary-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 18px;
        }

        .summary-label {
          color: var(--muted);
          font-size: 11.5px;
          margin-bottom: 8px;
        }

        .summary-value {
          font-family: 'Source Serif 4', serif;
          color: var(--ink);
          font-size: 24px;
          font-weight: 600;
        }

        .summary-description {
          margin-top: 4px;
          color: #98a2b3;
          font-size: 10.5px;
        }

        /* ============ Cards ============ */

        .roadmap-card-main,
        .tests-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .section-title {
          margin: 0;
          font-family: 'Source Serif 4', serif;
          color: var(--ink);
          font-size: 16px;
          font-weight: 600;
        }

        .section-description {
          margin: 5px 0 20px;
          color: var(--muted);
          font-size: 12px;
        }

        /* ============ Roadmap track ============ */

        .roadmap-track {
          display: flex;
          align-items: flex-start;
          width: 100%;
        }

        .roadmap-step {
          flex: 1;
          text-align: center;
          min-width: 120px;
        }

        .roadmap-step-number {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 9px;
          border-radius: 50%;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 600;
        }

        .roadmap-step-number.completed {
          background: #047857;
          color: #fff;
        }

        .roadmap-step-number.current {
          background: var(--blue);
          color: #fff;
          box-shadow: 0 0 0 5px var(--blue-soft);
        }

        .roadmap-step-number.upcoming {
          background: #f2f4f7;
          color: #98a2b3;
        }

        .roadmap-step-title {
          color: var(--ink);
          font-size: 12px;
          font-weight: 600;
        }

        .roadmap-step-description {
          margin-top: 4px;
          color: var(--muted);
          font-size: 10.5px;
          line-height: 1.4;
        }

        .roadmap-connector {
          flex: 1;
          height: 2px;
          margin-top: 17px;
          background: var(--border);
        }

        .roadmap-connector.completed {
          background: #047857;
        }

        /* ============ Tests table ============ */

        .tests-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .tests-count {
          padding: 5px 10px;
          border-radius: 999px;
          background: rgba(29,78,216,0.1);
          color: var(--blue);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 600;
        }

        .tests-table-wrapper {
          overflow-x: auto;
        }

        .tests-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 760px;
        }

        .tests-table th {
          padding: 12px 10px;
          border-bottom: 1px solid var(--border);
          text-align: left;
          color: var(--muted);
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .3px;
        }

        .tests-table td {
          padding: 14px 10px;
          border-bottom: 1px solid #f0f2f5;
          font-size: 12.5px;
          color: #475467;
        }

        .tests-table tr:hover {
          background: #f8faff;
        }

        .test-name {
          color: var(--ink);
          font-weight: 600;
        }

        .test-type {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 600;
        }

        .test-type.aptitude {
          background: rgba(5,150,105,0.1);
          color: #047857;
        }

        .test-type.coding {
          background: rgba(29,78,216,0.1);
          color: var(--blue);
        }

        .score-badge {
          display: inline-flex;
          padding: 5px 10px;
          border-radius: 7px;
          font-size: 11.5px;
          font-weight: 600;
        }

        .score-excellent {
          background: rgba(5,150,105,0.1);
          color: #047857;
        }

        .score-good {
          background: rgba(29,78,216,0.1);
          color: var(--blue);
        }

        .score-low {
          background: rgba(220,38,38,0.1);
          color: #b91c1c;
        }

        .score-neutral {
          background: #f2f4f7;
          color: var(--muted);
        }

        .progress-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .progress-track {
          width: 70px;
          height: 6px;
          overflow: hidden;
          border-radius: 99px;
          background: #e5e7eb;
        }

        .progress-fill {
          height: 100%;
          border-radius: 99px;
          background: var(--blue);
        }

        .empty-state {
          padding: 50px 20px;
          text-align: center;
          color: var(--muted);
        }

        .empty-icon {
          width: 44px;
          height: 44px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #f2f4f7;
          color: var(--blue);
        }

        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 14px;
          margin-bottom: 15px;
          border-radius: 8px;
          background: #fff7ed;
          color: #c2410c;
          font-size: 12px;
        }

        @keyframes roadmap-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .roadmap-track {
            overflow-x: auto;
            padding-bottom: 10px;
          }

          .roadmap-step {
            min-width: 170px;
          }

          .roadmap-connector {
            min-width: 40px;
          }
        }

        @media (max-width: 550px) {
          .roadmap-main {
            padding: 22px 18px 40px;
          }

          .roadmap-topbar {
            align-items: flex-start;
          }

          .roadmap-title-main {
            font-size: 20px;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <StudentSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="roadmap-main">

        {/* ================================================================
            HEADER
        ================================================================ */}

        <div className="roadmap-topbar">

          <div className="roadmap-topbar-left">
            <button className="roadmap-menu-btn" onClick={() => setMobileOpen(true)}>
              <Menu size={18} />
            </button>

            <div className="roadmap-heading-col">

              <button
                type="button"
                className="back-button"
                onClick={() =>
                  navigate("/student-dashboard")
                }
              >
                <IoChevronBack size={14} />
                Back to Dashboard
              </button>

              <div className="roadmap-heading">
                <div className="roadmap-heading-icon">
                  <Map size={20} />
                </div>

                <div>
                  <p className="roadmap-eyebrow">Placement Readiness</p>
                  <h1 className="roadmap-title-main">
                    Placement Roadmap
                  </h1>
                </div>
              </div>

            </div>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={() => {
              fetchAptitudeResults();
              fetchCodingResults();
            }}
          >
            <RefreshCw size={14} />
            Refresh
          </button>

        </div>

        {/* ================================================================
            SUMMARY
        ================================================================ */}

        <div className="summary-grid">

          <div className="summary-card">
            <div className="summary-label">
              Tests attended
            </div>

            <div className="summary-value">
              {totalTests}
            </div>

            <div className="summary-description">
              Aptitude + Coding
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-label">
              Aptitude completed
            </div>

            <div className="summary-value">
              {aptitudeCount}
            </div>

            <div className="summary-description">
              Completed assessments
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-label">
              Coding completed
            </div>

            <div className="summary-value">
              {codingCount}
            </div>

            <div className="summary-description">
              Completed coding tests
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-label">
              Average score
            </div>

            <div className="summary-value">
              {averageScore}%
            </div>

            <div className="summary-description">
              Based on completed tests
            </div>
          </div>

        </div>

        {/* ================================================================
            ERROR INFORMATION
        ================================================================ */}

        {aptitudeError && (
          <div className="error-box">
            <AlertCircle size={15} />
            {aptitudeError}
          </div>
        )}

        {codingError && (
          <div className="error-box">
            <AlertCircle size={15} />
            {codingError}
          </div>
        )}

        {/* ================================================================
            ROADMAP
        ================================================================ */}

        <section className="roadmap-card-main">

          <h2 className="section-title">
            Your progress
          </h2>

          <p className="section-description">
            Your roadmap automatically updates based on
            the assessments you have completed.
          </p>

          <div className="roadmap-track">

            {roadmapSteps.map(
              (step, index) => (
                <React.Fragment key={step.number}>

                  <div className="roadmap-step">

                    <div
                      className={`roadmap-step-number ${step.status}`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        step.number
                      )}
                    </div>

                    <div className="roadmap-step-title">
                      {step.title}
                    </div>

                    <div className="roadmap-step-description">
                      {step.description}
                    </div>

                  </div>

                  {index <
                    roadmapSteps.length - 1 && (
                    <div
                      className={`roadmap-connector ${
                        step.status ===
                        "completed"
                          ? "completed"
                          : ""
                      }`}
                    />
                  )}

                </React.Fragment>
              )
            )}

          </div>

        </section>

        {/* ================================================================
            ATTENDED TESTS
        ================================================================ */}

        <section className="tests-card">

          <div className="tests-header">

            <div>

              <h2 className="section-title">
                Tests attended & scores
              </h2>

              <p className="section-description">
                Only tests that you have actually
                attempted or completed are shown here.
              </p>

            </div>

            <span className="tests-count">
              {totalTests} Tests
            </span>

          </div>

          {(loadingAptitude ||
            loadingCoding) &&
          totalTests === 0 ? (
            <div className="empty-state">

              <RefreshCw
                size={25}
                style={{
                  margin: "0 auto 10px",
                  animation:
                    "roadmap-spin 1s linear infinite",
                }}
              />

              Loading your completed tests...

            </div>
          ) : attendedTests.length === 0 ? (
            <div className="empty-state">

              <div className="empty-icon">
                <Trophy size={20} />
              </div>

              <strong>
                No completed tests yet
              </strong>

              <p
                style={{
                  marginTop: 6,
                  fontSize: 11.5,
                }}
              >
                Complete an aptitude or coding test
                and your score will appear here.

              </p>

            </div>
          ) : (
            <div className="tests-table-wrapper">

              <table className="tests-table">

                <thead>

                  <tr>
                    <th>Test</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Progress</th>
                  </tr>

                </thead>

                <tbody>

                  {attendedTests.map(
                    (test) => {

                      const percentage =
                        test.percentage;

                      const Icon =
                        test.icon;

                      return (
                        <tr key={test.id}>

                          <td>
                            <div
                              style={{
                                display: "flex",
                                alignItems:
                                  "center",
                                gap: 9,
                              }}
                            >

                              <div
                                style={{
                                  width: 32,
                                  height: 32,
                                  minWidth: 32,
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  justifyContent:
                                    "center",
                                  borderRadius: 8,
                                  background:
                                    test.type ===
                                    "Coding"
                                      ? "rgba(29,78,216,0.1)"
                                      : "rgba(5,150,105,0.1)",
                                  color:
                                    test.type ===
                                    "Coding"
                                      ? "#1d4ed8"
                                      : "#047857",
                                }}
                              >
                                <Icon size={15} />
                              </div>

                              <span className="test-name">
                                {test.name}
                              </span>

                            </div>
                          </td>

                          <td>

                            <span
                              className={`test-type ${
                                test.type ===
                                "Coding"
                                  ? "coding"
                                  : "aptitude"
                              }`}
                            >
                              {test.type ===
                              "Coding" ? (
                                <Code2 size={11} />
                              ) : (
                                <ClipboardList
                                  size={11}
                                />
                              )}

                              {test.type}

                            </span>

                          </td>

                          <td>
                            {test.date}
                          </td>

                          <td>

                            <span
                              className={`score-badge ${getScoreClass(
                                percentage
                              )}`}
                            >
                              {percentage !==
                              null
                                ? `${percentage}%`
                                : "Score unavailable"}
                            </span>

                          </td>

                          <td>

                            {percentage !==
                            null ? (
                              <div className="progress-wrapper">

                                <div className="progress-track">

                                  <div
                                    className="progress-fill"
                                    style={{
                                      width: `${Math.min(
                                        100,
                                        Math.max(
                                          0,
                                          percentage
                                        )
                                      )}%`,
                                    }}
                                  />

                                </div>

                                <span
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 600,
                                  }}
                                >
                                  {percentage}%
                                </span>

                              </div>
                            ) : (
                              "-"
                            )}

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </main>

    </div>
  );
};

export default StudentRoadmap;