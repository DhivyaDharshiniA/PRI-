// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { StudentAptitudeApi } from "../../api/aptitudeApi";
// import "../../styles/aptitude.css";
//
// const VIOLATION_MESSAGE = {
//   TAB_SWITCH: "Your test was auto-submitted because you switched tabs.",
//   WINDOW_BLUR: "Your test was auto-submitted because the window lost focus.",
//   FULLSCREEN_EXIT: "Your test was auto-submitted because you exited full screen.",
//   TIME_EXPIRED: "Time ran out, so your test was submitted automatically.",
//   RESUME_ATTEMPT: "Your test was auto-submitted because it cannot be resumed once started.",
// };
//
// export default function AptitudeTestResult() {
//   const { testId } = useParams();
//   const { state } = useLocation();
//   const navigate = useNavigate();
//
//   const [result, setResult] = useState(state?.result || null);
//   const [loading, setLoading] = useState(!state?.result);
//
//   useEffect(() => {
//     if (result) return;
//     StudentAptitudeApi.getResult(testId)
//       .then(({ data }) => setResult(data))
//       .finally(() => setLoading(false));
//   }, [testId, result]);
//
//   if (loading) {
//     return (
//       <div className="apt-page">
//         <div className="apt-container">
//           <p>Loading result…</p>
//         </div>
//       </div>
//     );
//   }
//
//   if (!result) {
//     return (
//       <div className="apt-page">
//         <div className="apt-container">
//           <div className="apt-card">
//             <h1 className="apt-title">Result not available</h1>
//             <button
//               className="apt-btn apt-btn-outline"
//               onClick={() => navigate("/student/aptitude-tests")}
//             >
//               Back to my tests
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//
//   const pct = result.percentage ?? 0;
//
//   return (
//     <div className="apt-page">
//       <div className="apt-container">
//         <div className="apt-card" style={{ textAlign: "center" }}>
//           {result.violationType && (
//             <div
//               className="apt-pill apt-pill-red"
//               style={{ marginBottom: 18 }}
//             >
//               ⚠ {VIOLATION_MESSAGE[result.violationType] || "Auto-submitted"}
//             </div>
//           )}
//
//           <h1 className="apt-title">{result.title}</h1>
//           <p className="apt-subtitle">Here's how you did</p>
//
//           <div className="apt-result-ring" style={{ "--pct": pct }}>
//             <div className="apt-result-ring-inner">
//               <div style={{ fontSize: 26, fontWeight: 800, color: "#14428f" }}>
//                 {pct}%
//               </div>
//             </div>
//           </div>
//
//           <div className="apt-result-score">
//             {result.score} / {result.totalMarks}
//           </div>
//           <p style={{ color: "#64748b" }}>Correct answers</p>
//
//           <button
//             className="apt-btn apt-btn-primary"
//             style={{ marginTop: 20 }}
//             onClick={() => navigate("/student/aptitude-tests")}
//           >
//             Back to My Tests
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Home,
  Menu,
  Trophy,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";

import { StudentAptitudeApi } from "../../api/aptitudeApi";
import StudentSidebar from "../student/StudentSidebar";

const VIOLATION_MESSAGE = {
  TAB_SWITCH:
    "Your test was auto-submitted because you switched tabs.",

  WINDOW_BLUR:
    "Your test was auto-submitted because the window lost focus.",

  FULLSCREEN_EXIT:
    "Your test was auto-submitted because you exited full screen.",

  TIME_EXPIRED:
    "Time ran out, so your test was submitted automatically.",

  RESUME_ATTEMPT:
    "Your test was auto-submitted because it cannot be resumed once started.",
};

const themeStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

  .apt-result-page {
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
    --red: #b42318;
    --red-bg: #fef3f2;
    --red-border: #fecdca;

    min-height: 100vh;
    background: #fafbfc;
    font-family: 'Inter', sans-serif;
    color: var(--ink);
  }

  .apt-result-center {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }

  .apt-result-spinner {
    margin: 0 auto;
    height: 36px;
    width: 36px;
    border-radius: 999px;
    border: 3px solid var(--border);
    border-top-color: var(--blue);
    animation: apt-result-spin 0.8s linear infinite;
  }

  @keyframes apt-result-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .apt-result-loading-text {
    margin-top: 14px;
    font-size: 13.5px;
    color: var(--muted);
    text-align: center;
  }

  .apt-result-notfound-card {
    border-radius: 14px;
    background: #fff;
    border: 1px solid var(--border);
    padding: 40px;
    text-align: center;
    box-shadow: 0 12px 40px rgba(16, 24, 40, 0.06);
  }

  .apt-result-notfound-title {
    margin: 0;
    font-family: 'Source Serif 4', serif;
    font-weight: 600;
    font-size: 21px;
  }

  .apt-result-back-btn {
    margin-top: 22px;
    border-radius: 8px;
    border: none;
    background: var(--blue);
    padding: 12px 20px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }

  .apt-result-back-btn:hover {
    background: #1740b8;
  }

  .apt-result-shell {
    min-height: 100vh;
  }

  @media (min-width: 1024px) {
    .apt-result-shell {
      margin-left: 270px;
    }
  }

  .apt-result-header {
    position: sticky;
    top: 0;
    z-index: 30;
    border-bottom: 1px solid var(--border);
    background: #fff;
  }

  .apt-result-header-row {
    display: flex;
    height: 76px;
    align-items: center;
    gap: 12px;
    padding: 0 24px;
  }

  .apt-result-menu-btn {
    border-radius: 8px;
    border: 1px solid var(--border);
    background: #fff;
    padding: 9px;
    color: var(--muted);
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    .apt-result-menu-btn {
      display: none;
    }
  }

  .apt-result-eyebrow {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10.5px;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: var(--blue);
  }

  .apt-result-h1 {
    margin: 3px 0 0;
    font-family: 'Source Serif 4', serif;
    font-weight: 600;
    font-size: 21px;
  }

  .apt-result-main {
    padding: 24px;
  }

  .apt-result-wrap {
    margin: 0 auto;
    max-width: 720px;
  }

  .apt-result-card {
    overflow: hidden;
    border-radius: 16px;
    border: 1px solid var(--border);
    background: #fff;
    box-shadow: 0 16px 44px rgba(16, 24, 40, 0.06);
  }

  .apt-result-card-top {
    position: relative;
    overflow: hidden;
    background: var(--navy);
    padding: 44px 24px;
    text-align: center;
    color: #eef1f6;
  }

  .apt-result-card-top::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(560px 300px at 50% 0%, rgba(29, 78, 216, 0.32), transparent 65%);
    pointer-events: none;
  }

  .apt-result-trophy {
    position: relative;
    margin: 0 auto;
    display: flex;
    height: 62px;
    width: 62px;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background: var(--navy-raised);
    border: 1px solid rgba(255, 255, 255, 0.14);
  }

  .apt-result-status-label {
    position: relative;
    margin: 18px 0 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10.5px;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: #7d95c4;
  }

  .apt-result-test-title {
    position: relative;
    margin: 8px 0 0;
    font-family: 'Source Serif 4', serif;
    font-weight: 600;
    font-size: 26px;
  }

  .apt-result-test-sub {
    position: relative;
    margin: 8px 0 0;
    font-size: 13px;
    color: #aab6cc;
  }

  .apt-result-body {
    padding: 36px 32px;
  }

  .apt-result-violation {
    margin-bottom: 28px;
    display: flex;
    gap: 12px;
    border-radius: 12px;
    border: 1px solid var(--red-border);
    background: var(--red-bg);
    padding: 16px;
  }

  .apt-result-violation-title {
    margin: 0;
    font-size: 13px;
    font-weight: 700;
    color: #7a271a;
  }

  .apt-result-violation-text {
    margin: 4px 0 0;
    font-size: 12px;
    line-height: 1.6;
    color: var(--red);
  }

  .apt-result-score-block {
    text-align: center;
  }

  .apt-result-ring {
    position: relative;
    margin: 0 auto;
    display: flex;
    height: 176px;
    width: 176px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: conic-gradient(var(--blue) calc(var(--pct) * 1%), var(--border) 0);
    padding: 10px;
  }

  .apt-result-ring-inner {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: #fff;
  }

  .apt-result-pct {
    font-family: 'Source Serif 4', serif;
    font-size: 34px;
    font-weight: 600;
    color: var(--navy);
  }

  .apt-result-pct-label {
    margin-top: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: var(--muted);
  }

  .apt-result-marks {
    margin: 22px 0 0;
    font-family: 'Source Serif 4', serif;
    font-size: 26px;
    font-weight: 600;
    color: var(--ink);
  }

  .apt-result-marks-slash {
    margin: 0 6px;
    color: #d0d5dd;
  }

  .apt-result-marks-label {
    margin: 4px 0 0;
    font-size: 12.5px;
    color: var(--muted);
  }

  .apt-result-message {
    margin-top: 32px;
    border-radius: 12px;
    background: #fafbfc;
    border: 1px solid var(--border);
    padding: 24px;
    text-align: center;
  }

  .apt-result-message-title {
    margin: 12px 0 0;
    font-family: 'Source Serif 4', serif;
    font-size: 17px;
    font-weight: 600;
  }

  .apt-result-message-copy {
    margin: 8px auto 0;
    max-width: 420px;
    font-size: 13px;
    line-height: 1.7;
    color: var(--muted);
  }

  .apt-result-actions {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;
  }

  @media (min-width: 640px) {
    .apt-result-actions {
      flex-direction: row;
    }
  }

  .apt-result-primary-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    border: none;
    background: var(--blue);
    padding: 13px 22px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }

  .apt-result-primary-btn:hover {
    background: #1740b8;
  }

  .apt-result-secondary-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: #fff;
    padding: 13px 22px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--muted);
    cursor: pointer;
  }

  .apt-result-secondary-btn:hover {
    background: #f7f8fa;
  }

  .apt-result-below-link {
    margin: 22px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: none;
    border: none;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
    cursor: pointer;
  }

  .apt-result-below-link:hover {
    color: var(--blue);
  }
`;

export default function AptitudeTestResult() {
  const { testId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState(
    state?.result || null
  );

  const [loading, setLoading] = useState(
    !state?.result
  );

  const [mobileSidebar, setMobileSidebar] =
    useState(false);

  useEffect(() => {
    if (result) return;

    StudentAptitudeApi.getResult(testId)
      .then(({ data }) => setResult(data))
      .finally(() => setLoading(false));
  }, [testId, result]);

  if (loading) {
    return (
      <div className="apt-result-page">
        <style>{themeStyles}</style>

        <div className="apt-result-center">
          <div style={{ textAlign: "center" }}>
            <div className="apt-result-spinner" />
            <p className="apt-result-loading-text">
              Loading result...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="apt-result-page">
        <style>{themeStyles}</style>

        <div className="apt-result-center">
          <div className="apt-result-notfound-card">
            <h1 className="apt-result-notfound-title">
              Result not available
            </h1>

            <button
              onClick={() =>
                navigate(
                  "/student/aptitude-tests"
                )
              }
              className="apt-result-back-btn"
            >
              Back to My Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pct = Number(
    result.percentage ?? 0
  );

  const score = result.score ?? 0;
  const totalMarks = result.totalMarks ?? 0;

  return (
    <div className="apt-result-page">
      <style>{themeStyles}</style>

      <StudentSidebar
        mobileOpen={mobileSidebar}
        onClose={() => setMobileSidebar(false)}
      />

      <div className="apt-result-shell">
        <header className="apt-result-header">
          <div className="apt-result-header-row">
            <button
              onClick={() =>
                setMobileSidebar(true)
              }
              className="apt-result-menu-btn"
            >
              <Menu size={19} />
            </button>

            <div>
              <p className="apt-result-eyebrow">
                Assessment
              </p>
              <h1 className="apt-result-h1">
                Test Result
              </h1>
            </div>
          </div>
        </header>

        <main className="apt-result-main">
          <div className="apt-result-wrap">
            <div className="apt-result-card">
              <div className="apt-result-card-top">
                <div className="apt-result-trophy">
                  <Trophy size={28} />
                </div>

                <p className="apt-result-status-label">
                  Completed
                </p>

                <h2 className="apt-result-test-title">
                  {result.title}
                </h2>

                <p className="apt-result-test-sub">
                  Here&rsquo;s how you performed
                </p>
              </div>

              <div className="apt-result-body">
                {result.violationType && (
                  <div className="apt-result-violation">
                    <AlertTriangle
                      color="#b42318"
                      size={19}
                    />

                    <div>
                      <p className="apt-result-violation-title">
                        Auto Submitted
                      </p>

                      <p className="apt-result-violation-text">
                        {VIOLATION_MESSAGE[
                          result.violationType
                        ] ||
                          "Your test was auto-submitted."}
                      </p>
                    </div>
                  </div>
                )}

                <div className="apt-result-score-block">
                  <div
                    className="apt-result-ring"
                    style={{ "--pct": pct }}
                  >
                    <div className="apt-result-ring-inner">
                      <span className="apt-result-pct">
                        {pct}%
                      </span>
                      <span className="apt-result-pct-label">
                        Score
                      </span>
                    </div>
                  </div>

                  <p className="apt-result-marks">
                    {score}
                    <span className="apt-result-marks-slash">
                      /
                    </span>
                    {totalMarks}
                  </p>

                  <p className="apt-result-marks-label">
                    Marks obtained
                  </p>
                </div>

                <div className="apt-result-message">
                  <CheckCircle2
                    size={26}
                    color="#067647"
                  />

                  <h3 className="apt-result-message-title">
                    {pct >= 80
                      ? "Excellent Performance!"
                      : pct >= 60
                      ? "Good Performance!"
                      : pct >= 40
                      ? "Keep Improving!"
                      : "More Practice Needed"}
                  </h3>

                  <p className="apt-result-message-copy">
                    Continue practicing and use
                    your results to identify areas
                    for improvement.
                  </p>
                </div>

                <div className="apt-result-actions">
                  <button
                    onClick={() =>
                      navigate(
                        "/student/aptitude-tests"
                      )
                    }
                    className="apt-result-primary-btn"
                  >
                    <ClipboardList size={18} />
                    Back to My Tests
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        "/student-dashboard"
                      )
                    }
                    className="apt-result-secondary-btn"
                  >
                    <Home size={18} />
                    Dashboard
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                navigate(
                  "/student/aptitude-tests"
                )
              }
              className="apt-result-below-link"
            >
              <ArrowLeft size={15} />
              Back to assessments
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}