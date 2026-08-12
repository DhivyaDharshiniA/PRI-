import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Map,
  CheckCircle2,
  Clock3,
  Trophy,
  Code2,
  ClipboardList,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const StudentRoadmap = () => {
  const navigate = useNavigate();

  const [aptitudeResults, setAptitudeResults] = useState([]);
  const [codingResults, setCodingResults] = useState([]);

  const [loadingAptitude, setLoadingAptitude] = useState(true);
  const [loadingCoding, setLoadingCoding] = useState(true);

  const [aptitudeError, setAptitudeError] = useState("");
  const [codingError, setCodingError] = useState("");

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
    <div className="roadmap-page">

      <style>{`

        .roadmap-page {
          min-height: 100vh;
          background: #f8fafc;
          color: #101828;
          font-family: Inter, Arial, sans-serif;
          padding: 30px 40px 50px;
        }

        .roadmap-container-main {
          max-width: 1250px;
          margin: 0 auto;
        }

        .roadmap-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 25px;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border: 1px solid #e4e7ec;
          border-radius: 8px;
          background: white;
          color: #344054;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .back-button:hover {
          background: #f8fafc;
          border-color: #c7d7fe;
        }

        .roadmap-heading {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .roadmap-heading-icon {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: #eef4ff;
          color: #1d4ed8;
        }

        .roadmap-title-main {
          margin: 0;
          color: #0e1a2b;
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: 600;
        }

        .roadmap-subtitle-main {
          margin: 5px 0 0;
          color: #667085;
          font-size: 13px;
        }

        .refresh-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 13px;
          border: 1px solid #e4e7ec;
          border-radius: 8px;
          background: white;
          color: #344054;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 20px;
        }

        .summary-card {
          background: white;
          border: 1px solid #e4e7ec;
          border-radius: 13px;
          padding: 18px;
        }

        .summary-label {
          color: #667085;
          font-size: 11px;
          margin-bottom: 8px;
        }

        .summary-value {
          color: #0e1a2b;
          font-size: 26px;
          font-weight: 700;
        }

        .summary-description {
          margin-top: 4px;
          color: #98a2b3;
          font-size: 10px;
        }

        .roadmap-card-main {
          background: white;
          border: 1px solid #e4e7ec;
          border-radius: 15px;
          padding: 23px;
          margin-bottom: 20px;
        }

        .section-title {
          margin: 0;
          color: #0e1a2b;
          font-size: 15px;
          font-weight: 700;
        }

        .section-description {
          margin: 5px 0 20px;
          color: #667085;
          font-size: 11px;
        }

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
          font-size: 11px;
          font-weight: 700;
        }

        .roadmap-step-number.completed {
          background: #16a34a;
          color: white;
        }

        .roadmap-step-number.current {
          background: #1d4ed8;
          color: white;
          box-shadow: 0 0 0 5px #e8eeff;
        }

        .roadmap-step-number.upcoming {
          background: #f2f4f7;
          color: #98a2b3;
        }

        .roadmap-step-title {
          color: #101828;
          font-size: 11px;
          font-weight: 700;
        }

        .roadmap-step-description {
          margin-top: 4px;
          color: #667085;
          font-size: 9px;
          line-height: 1.4;
        }

        .roadmap-connector {
          flex: 1;
          height: 2px;
          margin-top: 17px;
          background: #e4e7ec;
        }

        .roadmap-connector.completed {
          background: #16a34a;
        }

        .tests-card {
          background: white;
          border: 1px solid #e4e7ec;
          border-radius: 15px;
          padding: 23px;
        }

        .tests-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .tests-count {
          padding: 5px 9px;
          border-radius: 999px;
          background: #eef4ff;
          color: #1d4ed8;
          font-size: 10px;
          font-weight: 700;
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
          border-bottom: 1px solid #e4e7ec;
          text-align: left;
          color: #667085;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .3px;
        }

        .tests-table td {
          padding: 14px 10px;
          border-bottom: 1px solid #f0f2f5;
          font-size: 12px;
          color: #475467;
        }

        .tests-table tr:hover {
          background: #f8faff;
        }

        .test-name {
          color: #0e1a2b;
          font-weight: 700;
        }

        .test-type {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 8px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
        }

        .test-type.aptitude {
          background: #ecfdf3;
          color: #047857;
        }

        .test-type.coding {
          background: #eef4ff;
          color: #1d4ed8;
        }

        .score-badge {
          display: inline-flex;
          padding: 5px 9px;
          border-radius: 7px;
          font-size: 11px;
          font-weight: 700;
        }

        .score-excellent {
          background: #ecfdf3;
          color: #15803d;
        }

        .score-good {
          background: #eef4ff;
          color: #1d4ed8;
        }

        .score-low {
          background: #fff1f2;
          color: #dc2626;
        }

        .score-neutral {
          background: #f2f4f7;
          color: #667085;
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
          background: #1d4ed8;
        }

        .empty-state {
          padding: 45px 20px;
          text-align: center;
          color: #667085;
        }

        .empty-icon {
          width: 45px;
          height: 45px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #f2f4f7;
        }

        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 13px;
          margin-bottom: 15px;
          border-radius: 8px;
          background: #fff7ed;
          color: #c2410c;
          font-size: 11px;
        }

        @media (max-width: 900px) {
          .roadmap-page {
            padding: 22px;
          }

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
          .roadmap-page {
            padding: 16px;
          }

          .roadmap-top {
            align-items: flex-start;
          }

          .roadmap-title-main {
            font-size: 22px;
          }

          .refresh-button {
            font-size: 0;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

      <div className="roadmap-container-main">

        {/* ================================================================
            HEADER
        ================================================================ */}

        <div className="roadmap-top">

          <div>

            <button
              type="button"
              className="back-button"
              onClick={() =>
                navigate("/student-dashboard")
              }
            >
              <ArrowLeft size={15} />
              Back to Dashboard
            </button>

            <div
              className="roadmap-heading"
              style={{ marginTop: 18 }}
            >
              <div className="roadmap-heading-icon">
                <Map size={22} />
              </div>

              <div>
                <h1 className="roadmap-title-main">
                  Placement Roadmap
                </h1>

                <p className="roadmap-subtitle-main">
                  Track your attended assessments and
                  scores.
                </p>
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
                    "spin 1s linear infinite",
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
                  fontSize: 11,
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
                                      ? "#eef4ff"
                                      : "#ecfdf3",
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
                                    fontWeight: 700,
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

      </div>

    </div>
  );
};

export default StudentRoadmap;