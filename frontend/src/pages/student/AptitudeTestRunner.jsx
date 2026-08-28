// import { useCallback, useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { StudentAptitudeApi } from "../../api/aptitudeApi";
// import { useExamSecurity } from "../../hooks/useExamSecurity";
// import { useCountdown } from "../../hooks/useCountdown";
// import "../../styles/aptitude.css";
//
// export default function AptitudeTestRunner() {
//   const { testId } = useParams();
//   const navigate = useNavigate();
//
//   const [phase, setPhase] = useState("intro"); // intro | running | finishing | error
//   const [session, setSession] = useState(null); // StartTestResponse
//   const [answers, setAnswers] = useState({}); // questionId -> selectedOption
//   const [currentIdx, setCurrentIdx] = useState(0);
//   const [errorMsg, setErrorMsg] = useState("");
//
//   const answersRef = useRef(answers);
//   answersRef.current = answers;
//
//   const saveTimerRef = useRef(null);
//
//   // ---------- finish/submit ----------
//
//   const finalize = useCallback(
//     async (submitFn) => {
//       setPhase("finishing");
//       try {
//         const { data } = await submitFn();
//         navigate(`/student/aptitude-tests/${testId}/result`, {
//           replace: true,
//           state: { result: data },
//         });
//       } catch (e) {
//         // Even if the network call fails, don't leave the student stuck in
//         // fullscreen lockdown -- send them to the result page, which will
//         // re-fetch the authoritative result from the server.
//         navigate(`/student/aptitude-tests/${testId}/result`, { replace: true });
//       }
//     },
//     [navigate, testId]
//   );
//
//   const buildAnswersPayload = () =>
//     Object.entries(answersRef.current).map(([questionId, selectedOption]) => ({
//       questionId: Number(questionId),
//       selectedOption,
//     }));
//
//   const handleNormalSubmit = useCallback(() => {
//     finalize(() => StudentAptitudeApi.submit(testId, buildAnswersPayload()));
//   }, [finalize, testId]);
//
//   const handleViolation = useCallback(
//     (type) => {
//       finalize(() =>
//         StudentAptitudeApi.reportViolation(testId, type, {
//           answers: buildAnswersPayload(),
//         })
//       );
//     },
//     [finalize, testId]
//   );
//
//   const handleTimeExpired = useCallback(() => {
//     finalize(() => StudentAptitudeApi.submit(testId, buildAnswersPayload()));
//   }, [finalize, testId]);
//
//   // ---------- security lockdown ----------
//
//   const { enterFullscreen } = useExamSecurity({
//     active: phase === "running",
//     onViolation: handleViolation,
//   });
//
//   const { label: timeLabel, isLow } = useCountdown(
//     session?.deadline,
//     handleTimeExpired
//   );
//
//   // ---------- start ----------
//
//   const handleStart = async () => {
//     try {
//       await enterFullscreen();
//       const { data } = await StudentAptitudeApi.start(testId);
//       setSession(data);
//       setPhase("running");
//     } catch (e) {
//       setErrorMsg(
//         e?.response?.data?.message ||
//           "Could not start the test. It may already have been submitted."
//       );
//       setPhase("error");
//     }
//   };
//
//   // ---------- answer selection (with debounced autosave) ----------
//
//   const selectOption = (questionId, option) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: option }));
//     clearTimeout(saveTimerRef.current);
//     saveTimerRef.current = setTimeout(() => {
//       StudentAptitudeApi.saveAnswer(testId, questionId, option).catch(() => {});
//     }, 350);
//   };
//
//   useEffect(() => () => clearTimeout(saveTimerRef.current), []);
//
//   // ---------- render: intro / lock screen ----------
//
//   if (phase === "intro") {
//     return (
//       <div className="apt-page">
//         <div className="apt-container">
//           <div className="apt-card apt-lock-screen">
//             <div className="apt-lock-icon">🔒</div>
//             <h1 className="apt-title">Ready to begin?</h1>
//             <p className="apt-subtitle">This test runs in full-screen, timed mode.</p>
//             <ul className="apt-rules">
//               <li>The test will open in full screen and must stay that way.</li>
//               <li>You have 45 minutes once you start — the clock cannot be paused.</li>
//               <li>Switching tabs, minimizing, or exiting full screen auto-submits the test immediately.</li>
//               <li>You get exactly one attempt — the test cannot be resumed or retaken.</li>
//               <li>Your score is shown as soon as you submit.</li>
//             </ul>
//             <button className="apt-btn apt-btn-primary" onClick={handleStart}>
//               Enter Full Screen &amp; Start Test
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//
//   if (phase === "error") {
//     return (
//       <div className="apt-page">
//         <div className="apt-container">
//           <div className="apt-card apt-lock-screen">
//             <h1 className="apt-title">Unable to start</h1>
//             <p style={{ color: "#dc2626" }}>{errorMsg}</p>
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
//   if (phase === "finishing" || !session) {
//     return (
//       <div className="apt-exam-shell">
//         <div style={{ margin: "auto", textAlign: "center" }}>
//           <h2>Submitting your test…</h2>
//           <p style={{ color: "#64748b" }}>Please don't close this window.</p>
//         </div>
//       </div>
//     );
//   }
//
//   // ---------- render: running exam ----------
//
//   const question = session.questions[currentIdx];
//   const answeredCount = Object.keys(answers).length;
//
//   return (
//     <div className="apt-exam-shell">
//       <div className="apt-exam-header">
//         <div>
//           <h3>{session.title}</h3>
//           <div className="apt-exam-sub">
//             {answeredCount}/{session.questions.length} answered
//           </div>
//         </div>
//         <div className={`apt-timer ${isLow ? "low" : ""}`}>⏱ {timeLabel}</div>
//       </div>
//
//       <div className="apt-exam-body">
//         <div className="apt-question-panel">
//           <div className="apt-question-index">
//             Question {currentIdx + 1} of {session.questions.length}
//           </div>
//           <div className="apt-question-text">{question.questionText}</div>
//
//           {question.options.map((opt) => (
//             <label
//               key={opt}
//               className={`apt-option ${answers[question.id] === opt ? "selected" : ""}`}
//             >
//               <input
//                 type="radio"
//                 name={`q-${question.id}`}
//                 checked={answers[question.id] === opt}
//                 onChange={() => selectOption(question.id, opt)}
//               />
//               {opt}
//             </label>
//           ))}
//
//           <div className="apt-nav-row">
//             <button
//               className="apt-btn apt-btn-outline"
//               disabled={currentIdx === 0}
//               onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
//             >
//               ← Previous
//             </button>
//             {currentIdx < session.questions.length - 1 ? (
//               <button
//                 className="apt-btn apt-btn-primary"
//                 onClick={() =>
//                   setCurrentIdx((i) => Math.min(session.questions.length - 1, i + 1))
//                 }
//               >
//                 Next →
//               </button>
//             ) : (
//               <button className="apt-btn apt-btn-primary" onClick={handleNormalSubmit}>
//                 Submit Test ✓
//               </button>
//             )}
//           </div>
//         </div>
//
//         <div className="apt-palette-panel">
//           <strong style={{ fontSize: 14 }}>Question Palette</strong>
//           <div className="apt-palette-grid">
//             {session.questions.map((q, i) => (
//               <div
//                 key={q.id}
//                 className={`apt-palette-cell ${answers[q.id] ? "answered" : ""} ${
//                   i === currentIdx ? "current" : ""
//                 }`}
//                 onClick={() => setCurrentIdx(i)}
//               >
//                 {i + 1}
//               </div>
//             ))}
//           </div>
//           <div className="apt-submit-bar">
//             <button
//               className="apt-btn apt-btn-primary"
//               style={{ width: "100%", justifyContent: "center" }}
//               onClick={handleNormalSubmit}
//             >
//               Submit Test
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentAptitudeApi } from "../../api/aptitudeApi";
import { useExamSecurity } from "../../hooks/useExamSecurity";
import { useCountdown } from "../../hooks/useCountdown";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const themeStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

  .apt-runner {
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

    font-family: 'Inter', sans-serif;
    color: var(--ink);
  }

  /* ---------- intro ---------- */

  .apt-runner-intro {
    min-height: 100vh;
    background: var(--navy);
    padding: 32px 16px;
  }

  .apt-runner-intro-center {
    margin: 0 auto;
    display: flex;
    min-height: 90vh;
    max-width: 620px;
    align-items: center;
  }

  .apt-runner-intro-card {
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
  }

  .apt-runner-intro-top {
    position: relative;
    overflow: hidden;
    background: var(--navy);
    padding: 44px 32px;
    text-align: center;
    color: #eef1f6;
  }

  .apt-runner-intro-top::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(600px 320px at 50% 0%, rgba(29, 78, 216, 0.32), transparent 65%);
    pointer-events: none;
  }

  .apt-runner-intro-mark {
    position: relative;
    margin: 0 auto;
    display: flex;
    height: 74px;
    width: 74px;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background: var(--navy-raised);
    border: 1px solid rgba(255, 255, 255, 0.14);
  }

  .apt-runner-intro-eyebrow {
    position: relative;
    margin: 18px 0 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10.5px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #7d95c4;
  }

  .apt-runner-intro-title {
    position: relative;
    margin: 8px 0 0;
    font-family: 'Source Serif 4', serif;
    font-weight: 600;
    font-size: 28px;
  }

  .apt-runner-intro-sub {
    position: relative;
    margin: 10px 0 0;
    font-size: 13.5px;
    color: #aab6cc;
  }

  .apt-runner-intro-body {
    padding: 32px;
  }

  .apt-runner-rules {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .apt-runner-rule {
    border-radius: 10px;
    border: 1px solid var(--border);
    background: #fafbfc;
    padding: 14px 16px;
  }

  .apt-runner-rule-title {
    margin: 0;
    font-size: 13.5px;
    font-weight: 700;
    color: var(--ink);
  }

  .apt-runner-rule-text {
    margin: 3px 0 0;
    font-size: 12px;
    line-height: 1.6;
    color: var(--muted);
  }

  .apt-runner-start-btn {
    margin-top: 24px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 9px;
    border: none;
    background: var(--blue);
    padding: 15px 20px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
  }

  .apt-runner-start-btn:hover {
    background: #1740b8;
  }

  .apt-runner-cancel-btn {
    margin-top: 8px;
    width: 100%;
    border: none;
    background: none;
    border-radius: 9px;
    padding: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
    cursor: pointer;
  }

  .apt-runner-cancel-btn:hover {
    background: #fafbfc;
  }

  /* ---------- error ---------- */

  .apt-runner-error-page {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background: #fafbfc;
    padding: 0 20px;
  }

  .apt-runner-error-card {
    width: 100%;
    max-width: 460px;
    border-radius: 16px;
    border: 1px solid var(--border);
    background: #fff;
    padding: 40px;
    text-align: center;
    box-shadow: 0 16px 44px rgba(16, 24, 40, 0.06);
  }

  .apt-runner-error-mark {
    margin: 0 auto;
    display: flex;
    height: 60px;
    width: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background: var(--red-bg);
    color: var(--red);
  }

  .apt-runner-error-title {
    margin: 18px 0 0;
    font-family: 'Source Serif 4', serif;
    font-weight: 600;
    font-size: 21px;
  }

  .apt-runner-error-text {
    margin: 10px 0 0;
    font-size: 13px;
    line-height: 1.7;
    color: var(--muted);
  }

  .apt-runner-error-btn {
    margin-top: 22px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: #fff;
    padding: 12px 20px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink);
    cursor: pointer;
  }

  .apt-runner-error-btn:hover {
    background: #fafbfc;
  }

  /* ---------- finishing ---------- */

  .apt-runner-finishing {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background: var(--navy);
    color: #fff;
  }

  .apt-runner-finishing-spinner {
    margin: 0 auto;
    height: 44px;
    width: 44px;
    border-radius: 999px;
    border: 3px solid rgba(255, 255, 255, 0.16);
    border-top-color: var(--blue);
    animation: apt-runner-spin 0.85s linear infinite;
  }

  @keyframes apt-runner-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .apt-runner-finishing-title {
    margin: 18px 0 0;
    font-family: 'Source Serif 4', serif;
    font-size: 19px;
    font-weight: 600;
    text-align: center;
  }

  .apt-runner-finishing-sub {
    margin: 8px 0 0;
    font-size: 12.5px;
    color: #aab6cc;
    text-align: center;
  }

  /* ---------- running ---------- */

  .apt-runner-running {
    min-height: 100vh;
    background: #f4f5f7;
  }

  .apt-runner-header {
    position: sticky;
    top: 0;
    z-index: 30;
    border-bottom: 1px solid var(--border);
    background: #fff;
  }

  .apt-runner-header-inner {
    margin: 0 auto;
    max-width: 1400px;
    padding: 14px 20px;
  }

  .apt-runner-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .apt-runner-title {
    margin: 0;
    max-width: 65vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: 'Source Serif 4', serif;
    font-weight: 600;
    font-size: 16px;
  }

  .apt-runner-progress-text {
    margin: 3px 0 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--muted);
  }

  .apt-runner-timer {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 9px;
    border: 1px solid;
    padding: 9px 16px;
  }

  .apt-runner-timer.ok {
    border-color: #bfd1f7;
    background: var(--blue-soft);
    color: var(--blue);
  }

  .apt-runner-timer.low {
    border-color: var(--red-border);
    background: var(--red-bg);
    color: var(--red);
  }

  .apt-runner-timer-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 14px;
    font-weight: 700;
  }

  .apt-runner-main {
    margin: 0 auto;
    max-width: 1400px;
    padding: 20px;
  }

  .apt-runner-grid {
    display: grid;
    gap: 18px;
  }

  @media (min-width: 1024px) {
    .apt-runner-grid {
      grid-template-columns: 1fr 320px;
    }
  }

  .apt-runner-q-card {
    border-radius: 14px;
    border: 1px solid var(--border);
    background: #fff;
  }

  .apt-runner-q-body {
    padding: 28px;
  }

  .apt-runner-q-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .apt-runner-q-tag {
    border-radius: 999px;
    background: var(--blue-soft);
    padding: 5px 12px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.4px;
    color: var(--blue);
  }

  .apt-runner-q-counter {
    font-size: 11.5px;
    font-weight: 500;
    color: var(--muted);
  }

  .apt-runner-q-text {
    margin: 26px 0 0;
    font-family: 'Source Serif 4', serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.5;
    color: var(--ink);
  }

  .apt-runner-options {
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  .apt-runner-option {
    display: flex;
    cursor: pointer;
    align-items: center;
    gap: 14px;
    border-radius: 12px;
    border: 1.5px solid var(--border);
    padding: 14px 16px;
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .apt-runner-option:hover {
    border-color: #9fb4e8;
    background: #f7f9fd;
  }

  .apt-runner-option.selected {
    border-color: var(--blue);
    background: var(--blue-soft);
  }

  .apt-runner-option-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .apt-runner-option-letter {
    display: flex;
    height: 36px;
    width: 36px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    background: #f1f2f5;
    color: var(--muted);
  }

  .apt-runner-option.selected .apt-runner-option-letter {
    background: var(--blue);
    color: #fff;
  }

  .apt-runner-option-text {
    flex: 1;
    font-size: 13.5px;
    font-weight: 500;
    color: var(--ink);
  }

  .apt-runner-nav-row {
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    border-top: 1px solid var(--border);
    background: #fafbfc;
    padding: 16px 20px;
  }

  @media (min-width: 640px) {
    .apt-runner-nav-row {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .apt-runner-nav-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: #fff;
    padding: 12px 20px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink);
    cursor: pointer;
  }

  .apt-runner-nav-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .apt-runner-nav-btn.primary {
    border: none;
    background: var(--blue);
    color: #fff;
  }

  .apt-runner-nav-btn.primary:hover {
    background: #1740b8;
  }

  .apt-runner-nav-btn.submit {
    border: none;
    background: var(--green);
    color: #fff;
  }

  .apt-runner-nav-btn.submit:hover {
    background: #05602f;
  }

  .apt-runner-aside {
    height: fit-content;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: #fff;
    padding: 20px;
  }

  @media (min-width: 1024px) {
    .apt-runner-aside {
      position: sticky;
      top: 96px;
    }
  }

  .apt-runner-aside-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .apt-runner-aside-title {
    margin: 0;
    font-family: 'Source Serif 4', serif;
    font-weight: 600;
    font-size: 15.5px;
  }

  .apt-runner-aside-count {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11.5px;
    font-weight: 600;
    color: var(--blue);
  }

  .apt-runner-palette {
    margin-top: 18px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
  }

  .apt-runner-palette-btn {
    height: 40px;
    border-radius: 8px;
    border: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    background: #f1f2f5;
    color: var(--muted);
  }

  .apt-runner-palette-btn.answered {
    background: var(--green-bg);
    color: var(--green);
  }

  .apt-runner-palette-btn.current {
    background: var(--blue);
    color: #fff;
    box-shadow: 0 0 0 3px var(--blue-soft);
  }

  .apt-runner-legend {
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    gap: 9px;
    border-top: 1px solid var(--border);
    padding-top: 18px;
    font-size: 12px;
    color: var(--muted);
  }

  .apt-runner-legend-row {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .apt-runner-legend-dot {
    height: 10px;
    width: 10px;
    border-radius: 999px;
  }

  .apt-runner-submit-full {
    margin-top: 22px;
    width: 100%;
    border-radius: 8px;
    border: none;
    background: var(--blue);
    padding: 13px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
  }

  .apt-runner-submit-full:hover {
    background: #1740b8;
  }

  /* ---------- submit modal ---------- */

  .apt-runner-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(14, 26, 43, 0.6);
    padding: 16px;
    backdrop-filter: blur(3px);
  }

  .apt-runner-modal {
    width: 100%;
    max-width: 420px;
    border-radius: 16px;
    background: #fff;
    padding: 30px;
  }

  .apt-runner-modal-mark {
    margin: 0 auto;
    display: flex;
    height: 54px;
    width: 54px;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background: var(--blue-soft);
    color: var(--blue);
  }

  .apt-runner-modal-title {
    margin: 18px 0 0;
    text-align: center;
    font-family: 'Source Serif 4', serif;
    font-weight: 600;
    font-size: 20px;
  }

  .apt-runner-modal-copy {
    margin: 10px 0 0;
    text-align: center;
    font-size: 13px;
    color: var(--muted);
  }

  .apt-runner-modal-warning {
    margin-top: 18px;
    display: flex;
    gap: 8px;
    border-radius: 10px;
    background: var(--amber-bg);
    border: 1px solid var(--amber-border);
    padding: 12px;
    font-size: 12px;
    color: var(--amber);
  }

  .apt-runner-modal-actions {
    margin-top: 26px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .apt-runner-modal-cancel {
    border-radius: 8px;
    border: 1px solid var(--border);
    background: #fff;
    padding: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink);
    cursor: pointer;
  }

  .apt-runner-modal-cancel:hover {
    background: #fafbfc;
  }

  .apt-runner-modal-confirm {
    border-radius: 8px;
    border: none;
    background: var(--blue);
    padding: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
  }

  .apt-runner-modal-confirm:hover {
    background: #1740b8;
  }
`;

export default function AptitudeTestRunner() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [phase, setPhase] = useState("intro");
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSubmit, setShowSubmit] =
    useState(false);

  const answersRef = useRef(answers);
  answersRef.current = answers;

  const saveTimerRef = useRef(null);

  /* ================= SUBMIT ================= */

  const finalize = useCallback(
    async (submitFn) => {
      setPhase("finishing");

      try {
        const { data } = await submitFn();

        navigate(
          `/student/aptitude-tests/${testId}/result`,
          {
            replace: true,
            state: { result: data },
          }
        );
      } catch (e) {
        navigate(
          `/student/aptitude-tests/${testId}/result`,
          {
            replace: true,
          }
        );
      }
    },
    [navigate, testId]
  );

  const buildAnswersPayload = () =>
    Object.entries(answersRef.current).map(
      ([questionId, selectedOption]) => ({
        questionId: Number(questionId),
        selectedOption,
      })
    );

  const handleNormalSubmit = useCallback(() => {
    setShowSubmit(false);

    finalize(() =>
      StudentAptitudeApi.submit(
        testId,
        buildAnswersPayload()
      )
    );
  }, [finalize, testId]);

  const handleViolation = useCallback(
    (type) => {
      finalize(() =>
        StudentAptitudeApi.reportViolation(
          testId,
          type,
          {
            answers: buildAnswersPayload(),
          }
        )
      );
    },
    [finalize, testId]
  );

  const handleTimeExpired = useCallback(() => {
    finalize(() =>
      StudentAptitudeApi.submit(
        testId,
        buildAnswersPayload()
      )
    );
  }, [finalize, testId]);

  /* ================= SECURITY ================= */

  const { enterFullscreen } = useExamSecurity({
    active: phase === "running",
    onViolation: handleViolation,
  });

  const {
    label: timeLabel,
    isLow,
  } = useCountdown(
    session?.deadline,
    handleTimeExpired
  );

  /* ================= START ================= */

  const handleStart = async () => {
    try {
      await enterFullscreen();

      const { data } =
        await StudentAptitudeApi.start(testId);

      setSession(data);
      setPhase("running");
    } catch (e) {
      setErrorMsg(
        e?.response?.data?.message ||
          "Could not start the test. It may already have been submitted."
      );

      setPhase("error");
    }
  };

  /* ================= ANSWER ================= */

  const selectOption = (
    questionId,
    option
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));

    clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(() => {
      StudentAptitudeApi.saveAnswer(
        testId,
        questionId,
        option
      ).catch(() => {});
    }, 350);
  };

  useEffect(() => {
    return () =>
      clearTimeout(saveTimerRef.current);
  }, []);

  /* ================= INTRO ================= */

  if (phase === "intro") {
    return (
      <div className="apt-runner">
        <style>{themeStyles}</style>

        <div className="apt-runner-intro">
          <div className="apt-runner-intro-center">
            <div className="apt-runner-intro-card">
              <div className="apt-runner-intro-top">
                <div className="apt-runner-intro-mark">
                  <ShieldCheck size={38} />
                </div>

                <p className="apt-runner-intro-eyebrow">
                  Secure Assessment
                </p>

                <h1 className="apt-runner-intro-title">
                  Ready to begin?
                </h1>

                <p className="apt-runner-intro-sub">
                  This test runs in full-screen,
                  timed mode.
                </p>
              </div>

              <div className="apt-runner-intro-body">
                <div className="apt-runner-rules">
                  <ExamRule
                    title="Full Screen Required"
                    text="The test must stay in full-screen mode."
                  />

                  <ExamRule
                    title="Timed Assessment"
                    text="The clock cannot be paused once the test starts."
                  />

                  <ExamRule
                    title="Security Monitoring"
                    text="Switching tabs, minimizing or exiting full screen may automatically submit the test."
                  />

                  <ExamRule
                    title="One Attempt"
                    text="Once started, the assessment cannot be resumed or retaken."
                  />
                </div>

                <button
                  onClick={handleStart}
                  className="apt-runner-start-btn"
                >
                  <ShieldCheck size={19} />
                  Enter Full Screen & Start Test
                </button>

                <button
                  onClick={() =>
                    navigate(
                      "/student/aptitude-tests"
                    )
                  }
                  className="apt-runner-cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (phase === "error") {
    return (
      <div className="apt-runner">
        <style>{themeStyles}</style>

        <div className="apt-runner-error-page">
          <div className="apt-runner-error-card">
            <div className="apt-runner-error-mark">
              <XCircle size={30} />
            </div>

            <h1 className="apt-runner-error-title">
              Unable to start
            </h1>

            <p className="apt-runner-error-text">
              {errorMsg}
            </p>

            <button
              onClick={() =>
                navigate(
                  "/student/aptitude-tests"
                )
              }
              className="apt-runner-error-btn"
            >
              Back to My Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= FINISHING ================= */

  if (phase === "finishing" || !session) {
    return (
      <div className="apt-runner">
        <style>{themeStyles}</style>

        <div className="apt-runner-finishing">
          <div>
            <div className="apt-runner-finishing-spinner" />

            <h2 className="apt-runner-finishing-title">
              Submitting your test...
            </h2>

            <p className="apt-runner-finishing-sub">
              Please don&rsquo;t close this window.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ================= RUNNING ================= */

  const question =
    session.questions[currentIdx];

  const answeredCount =
    Object.keys(answers).length;

  const totalQuestions =
    session.questions.length;

  return (
    <div className="apt-runner">
      <style>{themeStyles}</style>

      <div className="apt-runner-running">
        <header className="apt-runner-header">
          <div className="apt-runner-header-inner">
            <div className="apt-runner-header-row">
              <div>
                <h1 className="apt-runner-title">
                  {session.title}
                </h1>

                <p className="apt-runner-progress-text">
                  Question {currentIdx + 1} of{" "}
                  {totalQuestions}
                </p>
              </div>

              <div
                className={`apt-runner-timer ${
                  isLow ? "low" : "ok"
                }`}
              >
                <Clock3 size={17} />

                <span className="apt-runner-timer-label">
                  {timeLabel}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="apt-runner-main">
          <div className="apt-runner-grid">
            <section className="apt-runner-q-card">
              <div className="apt-runner-q-body">
                <div className="apt-runner-q-top-row">
                  <span className="apt-runner-q-tag">
                    QUESTION {currentIdx + 1}
                  </span>

                  <span className="apt-runner-q-counter">
                    {answeredCount}/
                    {totalQuestions} answered
                  </span>
                </div>

                <h2 className="apt-runner-q-text">
                  {question.questionText}
                </h2>

                <div className="apt-runner-options">
                  {question.options.map(
                    (option, index) => {
                      const selected =
                        answers[question.id] ===
                        option;

                      return (
                        <label
                          key={option}
                          className={`apt-runner-option ${
                            selected
                              ? "selected"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${question.id}`}
                            checked={selected}
                            onChange={() =>
                              selectOption(
                                question.id,
                                option
                              )
                            }
                            className="apt-runner-option-input"
                          />

                          <span className="apt-runner-option-letter">
                            {String.fromCharCode(
                              65 + index
                            )}
                          </span>

                          <span className="apt-runner-option-text">
                            {option}
                          </span>

                          {selected && (
                            <CheckCircle2
                              size={20}
                              color="#1d4ed8"
                            />
                          )}
                        </label>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="apt-runner-nav-row">
                <button
                  disabled={currentIdx === 0}
                  onClick={() =>
                    setCurrentIdx((i) =>
                      Math.max(0, i - 1)
                    )
                  }
                  className="apt-runner-nav-btn"
                >
                  <ChevronLeft size={17} />
                  Previous
                </button>

                {currentIdx <
                totalQuestions - 1 ? (
                  <button
                    onClick={() =>
                      setCurrentIdx((i) =>
                        Math.min(
                          totalQuestions - 1,
                          i + 1
                        )
                      )
                    }
                    className="apt-runner-nav-btn primary"
                  >
                    Next
                    <ChevronRight size={17} />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setShowSubmit(true)
                    }
                    className="apt-runner-nav-btn submit"
                  >
                    <CheckCircle2 size={18} />
                    Submit Test
                  </button>
                )}
              </div>
            </section>

            <aside className="apt-runner-aside">
              <div className="apt-runner-aside-head">
                <h3 className="apt-runner-aside-title">
                  Question Palette
                </h3>

                <span className="apt-runner-aside-count">
                  {answeredCount}/{totalQuestions}
                </span>
              </div>

              <div className="apt-runner-palette">
                {session.questions.map(
                  (q, i) => {
                    const answered =
                      answers[q.id] !== undefined;

                    const current =
                      i === currentIdx;

                    return (
                      <button
                        key={q.id}
                        onClick={() =>
                          setCurrentIdx(i)
                        }
                        className={`apt-runner-palette-btn ${
                          current
                            ? "current"
                            : answered
                            ? "answered"
                            : ""
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  }
                )}
              </div>

              <div className="apt-runner-legend">
                <Legend
                  color="#1d4ed8"
                  text="Current"
                />

                <Legend
                  color="#067647"
                  text="Answered"
                />

                <Legend
                  color="#d0d5dd"
                  text="Not Answered"
                />
              </div>

              <button
                onClick={() =>
                  setShowSubmit(true)
                }
                className="apt-runner-submit-full"
              >
                Submit Test
              </button>
            </aside>
          </div>
        </main>
      </div>

      {showSubmit && (
        <div className="apt-runner-modal-overlay">
          <div className="apt-runner-modal">
            <div className="apt-runner-modal-mark">
              <CheckCircle2 size={28} />
            </div>

            <h2 className="apt-runner-modal-title">
              Submit Test?
            </h2>

            <p className="apt-runner-modal-copy">
              You answered{" "}
              <strong>
                {answeredCount}
              </strong>{" "}
              of{" "}
              <strong>
                {totalQuestions}
              </strong>{" "}
              questions.
            </p>

            {answeredCount <
              totalQuestions && (
              <div className="apt-runner-modal-warning">
                <AlertTriangle size={16} />

                <span>
                  You still have unanswered
                  questions.
                </span>
              </div>
            )}

            <div className="apt-runner-modal-actions">
              <button
                onClick={() =>
                  setShowSubmit(false)
                }
                className="apt-runner-modal-cancel"
              >
                Continue
              </button>

              <button
                onClick={handleNormalSubmit}
                className="apt-runner-modal-confirm"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExamRule({ title, text }) {
  return (
    <div className="apt-runner-rule">
      <p className="apt-runner-rule-title">
        {title}
      </p>

      <p className="apt-runner-rule-text">
        {text}
      </p>
    </div>
  );
}

function Legend({ color, text }) {
  return (
    <div className="apt-runner-legend-row">
      <span
        className="apt-runner-legend-dot"
        style={{ background: color }}
      />
      {text}
    </div>
  );
}

