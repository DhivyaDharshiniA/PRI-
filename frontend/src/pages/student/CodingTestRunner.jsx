// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Editor from "@monaco-editor/react";
// import { StudentCodingApi } from "../../api/codingApi";
// import { useExamSecurity } from "../../hooks/useExamSecurity";
// import { useCountdown } from "../../hooks/useCountdown";
// import { captureViolationScreenshot } from "../../hooks/useScreenshot";
// import "../../styles/aptitude.css";
// import "../../styles/coding.css";
//
// const LANGUAGES = [
//   { key: "python", label: "Python 3", monaco: "python" },
//   { key: "java", label: "Java", monaco: "java" },
//   { key: "cpp", label: "C++", monaco: "cpp" },
//   { key: "c", label: "C", monaco: "c" },
//   { key: "javascript", label: "JavaScript (Node)", monaco: "javascript" },
// ];
//
// const DEFAULT_CODE = {
//   python: "# Read input from stdin, write your answer to stdout\n\n",
//   java:
//     "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // your code here\n    }\n}\n",
//   cpp:
//     "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}\n",
//   c: "#include <stdio.h>\n\nint main() {\n    // your code here\n    return 0;\n}\n",
//   javascript:
//     "// Read input from stdin, write your answer to stdout\nconst input = require('fs').readFileSync(0, 'utf8');\n\n",
// };
//
// export default function CodingTestRunner() {
//   const { testId } = useParams();
//   const navigate = useNavigate();
//
//   const [phase, setPhase] = useState("intro"); // intro | running | finishing | error
//   const [session, setSession] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [currentIdx, setCurrentIdx] = useState(0);
//
//   // questionId -> { language, code }
//   const [codeState, setCodeState] = useState({});
//   // questionId -> last run/submit response
//   const [runResults, setRunResults] = useState({});
//   // questionId -> { score, maxScore, passedCount, totalCount }
//   const [questionScores, setQuestionScores] = useState({});
//   const [running, setRunning] = useState(false);
//   const [submittingQuestion, setSubmittingQuestion] = useState(false);
//
//   const codeStateRef = useRef(codeState);
//   codeStateRef.current = codeState;
//   const saveTimerRef = useRef(null);
//
//   // ---------- finish/submit ----------
//
//   const buildPendingCodePayload = () =>
//     Object.entries(codeStateRef.current).map(([questionId, v]) => ({
//       questionId: Number(questionId),
//       language: v.language,
//       code: v.code,
//     }));
//
//   const finalize = useCallback(
//     async (submitFn) => {
//       setPhase("finishing");
//       try {
//         const { data } = await submitFn();
//         navigate(`/student/coding-tests/${testId}/result`, {
//           replace: true,
//           state: { result: data },
//         });
//       } catch (e) {
//         navigate(`/student/coding-tests/${testId}/result`, { replace: true });
//       }
//     },
//     [navigate, testId]
//   );
//
//   const handleNormalSubmit = useCallback(() => {
//     finalize(() => StudentCodingApi.submit(testId, buildPendingCodePayload()));
//   }, [finalize, testId]);
//
//   const handleTimeExpired = useCallback(() => {
//     finalize(() => StudentCodingApi.submit(testId, buildPendingCodePayload()));
//   }, [finalize, testId]);
//
//   const handleViolation = useCallback(
//     async (type) => {
//       const screenshot = await captureViolationScreenshot();
//       finalize(() =>
//         StudentCodingApi.reportViolation(testId, type, screenshot, buildPendingCodePayload())
//       );
//     },
//     [finalize, testId]
//   );
//
//   // ---------- security lockdown ----------
//
//   const { enterFullscreen } = useExamSecurity({
//     active: phase === "running",
//     onViolation: handleViolation,
//   });
//
//   const { label: timeLabel, isLow } = useCountdown(session?.deadline, handleTimeExpired);
//
//   // ---------- start ----------
//
//   const handleStart = async () => {
//     try {
//       await enterFullscreen();
//       const { data } = await StudentCodingApi.start(testId);
//       setSession(data);
//
//       const initialCode = {};
//       const initialScores = {};
//       data.questions.forEach((q) => {
//         const saved = data.savedCode?.find((s) => s.questionId === q.id);
//         initialCode[q.id] = {
//           language: saved?.language || "python",
//           code: saved?.code || DEFAULT_CODE.python,
//         };
//         if (saved?.score != null) {
//           initialScores[q.id] = { score: saved.score, maxScore: saved.maxScore };
//         }
//       });
//       setCodeState(initialCode);
//       setQuestionScores(initialScores);
//       setPhase("running");
//     } catch (e) {
//       setErrorMsg(
//         e?.response?.data?.message || "Could not start the test. It may already have been submitted."
//       );
//       setPhase("error");
//     }
//   };
//
//   // ---------- editor change (debounced autosave) ----------
//
//   const question = session?.questions?.[currentIdx];
//   const current = question ? codeState[question.id] : null;
//
//   const updateCode = (patch) => {
//     if (!question) return;
//     setCodeState((prev) => ({ ...prev, [question.id]: { ...prev[question.id], ...patch } }));
//     clearTimeout(saveTimerRef.current);
//     saveTimerRef.current = setTimeout(() => {
//       const c = { ...codeStateRef.current[question.id], ...patch };
//       StudentCodingApi.autosaveCode(testId, question.id, c.language, c.code).catch(() => {});
//     }, 600);
//   };
//
//   useEffect(() => () => clearTimeout(saveTimerRef.current), []);
//
//   const handleLanguageChange = (lang) => {
//     const hasCustomCode = current?.code && current.code.trim() !== "" &&
//       !Object.values(DEFAULT_CODE).includes(current.code);
//     updateCode({ language: lang, code: hasCustomCode ? current.code : DEFAULT_CODE[lang] });
//   };
//
//   // ---------- run / submit question ----------
//
//   const handleRun = async () => {
//     if (!question || !current) return;
//     setRunning(true);
//     try {
//       const { data } = await StudentCodingApi.runCode(testId, question.id, current.language, current.code);
//       setRunResults((prev) => ({ ...prev, [question.id]: data }));
//     } catch (e) {
//       setRunResults((prev) => ({
//         ...prev,
//         [question.id]: { allPassed: false, results: [], error: e?.response?.data?.message || "Run failed." },
//       }));
//     } finally {
//       setRunning(false);
//     }
//   };
//
//   const handleSubmitQuestion = async () => {
//     if (!question || !current) return;
//     setSubmittingQuestion(true);
//     try {
//       const { data } = await StudentCodingApi.submitQuestion(testId, question.id, current.language, current.code);
//       setRunResults((prev) => ({ ...prev, [question.id]: data }));
//       setQuestionScores((prev) => ({
//         ...prev,
//         [question.id]: { score: data.score, maxScore: data.maxScore, passedCount: data.passedCount, totalCount: data.totalCount },
//       }));
//     } catch (e) {
//       setRunResults((prev) => ({
//         ...prev,
//         [question.id]: { allPassed: false, results: [], error: e?.response?.data?.message || "Submit failed." },
//       }));
//     } finally {
//       setSubmittingQuestion(false);
//     }
//   };
//
//   // ---------- render: intro / lock screen ----------
//
//   if (phase === "intro") {
//     return (
//       <div className="apt-page">
//         <div className="apt-container">
//           <div className="apt-card cd-lock-screen">
//             <div className="apt-lock-icon">🔒</div>
//             <h1 className="apt-title">Ready to begin?</h1>
//             <p className="apt-subtitle">This coding assessment runs in full-screen, timed mode.</p>
//             <ul className="apt-rules">
//               <li>Write and run code directly in the browser — Python, Java, C, C++, and JavaScript are all supported.</li>
//               <li>The clock starts the moment you enter full screen and cannot be paused.</li>
//               <li>Switching tabs, minimizing, or exiting full screen immediately auto-submits your test and sends a screenshot to the Placement Cell.</li>
//               <li>Only the Placement Cell can approve resuming after a violation — you cannot restart it yourself.</li>
//               <li>"Run" checks your code against sample cases only. "Submit" scores it against every test case, including hidden ones.</li>
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
//           <div className="apt-card cd-lock-screen">
//             <h1 className="apt-title">Unable to start</h1>
//             <p style={{ color: "#dc2626" }}>{errorMsg}</p>
//             <button className="apt-btn apt-btn-outline" onClick={() => navigate("/student/coding-tests")}>
//               Back to my tests
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//
//   if (phase === "finishing" || !session || !question) {
//     return (
//       <div className="cd-exam-shell" style={{ alignItems: "center", justifyContent: "center" }}>
//         <div style={{ margin: "auto", textAlign: "center" }}>
//           <h2>Submitting your test…</h2>
//           <p style={{ color: "#94a3b8" }}>Please don't close this window.</p>
//         </div>
//       </div>
//     );
//   }
//
//   // ---------- render: running exam ----------
//
//   const result = runResults[question.id];
//   const monacoLang = LANGUAGES.find((l) => l.key === current.language)?.monaco || "python";
//
//   return (
//     <div className="cd-exam-shell">
//       <div className="cd-exam-header">
//         <div>
//           <h3>{session.title}</h3>
//           <div className="cd-exam-sub">
//             Question {currentIdx + 1} of {session.questions.length}
//           </div>
//         </div>
//         <div className={`cd-timer ${isLow ? "low" : ""}`}>⏱ {timeLabel}</div>
//       </div>
//
//       <div className="cd-exam-body">
//         {/* question list sidebar */}
//         <div className="cd-question-list">
//           {session.questions.map((q, i) => {
//             const sc = questionScores[q.id];
//             const solved = sc && sc.passedCount != null && sc.passedCount === sc.totalCount && sc.totalCount > 0;
//             const attempted = codeState[q.id]?.code && codeState[q.id].code !== DEFAULT_CODE[codeState[q.id].language];
//             return (
//               <div
//                 key={q.id}
//                 className={`cd-question-item ${i === currentIdx ? "current" : ""}`}
//                 onClick={() => setCurrentIdx(i)}
//               >
//                 <div className="cd-q-title">
//                   {i + 1}. {q.title}
//                 </div>
//                 <span className={`cd-badge ${solved ? "solved" : attempted ? "attempted" : "untouched"}`}>
//                   {solved ? "Solved" : attempted ? "Attempted" : "Not attempted"}
//                 </span>
//                 {sc && (
//                   <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
//                     {sc.score}/{sc.maxScore} pts
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//           <button
//             className="cd-btn cd-btn-finish"
//             style={{ width: "100%", marginTop: 10 }}
//             onClick={handleNormalSubmit}
//           >
//             Finish &amp; Submit Test
//           </button>
//         </div>
//
//         {/* problem statement */}
//         <div className="cd-problem-panel">
//           <h2 className="cd-problem-title">{question.title}</h2>
//           <span className={`cd-difficulty ${(question.difficulty || "medium").toLowerCase()}`}>
//             {question.difficulty} · {question.points} pts
//           </span>
//           <div className="cd-problem-desc">{question.description}</div>
//
//           {question.constraintsText && (
//             <div className="cd-constraints">
//               <strong>Constraints:</strong>
//               <br />
//               {question.constraintsText}
//             </div>
//           )}
//
//           {question.sampleTestCases?.map((tc, i) => (
//             <div className="cd-sample-case" key={i}>
//               <h5>Sample Input {i + 1}</h5>
//               <pre>{tc.input || "(no input)"}</pre>
//               <h5>Sample Output {i + 1}</h5>
//               <pre>{tc.expectedOutput}</pre>
//             </div>
//           ))}
//         </div>
//
//         {/* editor */}
//         <div className="cd-editor-panel">
//           <div className="cd-editor-toolbar">
//             <select
//               className="cd-lang-select"
//               value={current.language}
//               onChange={(e) => handleLanguageChange(e.target.value)}
//             >
//               {LANGUAGES.map((l) => (
//                 <option key={l.key} value={l.key}>
//                   {l.label}
//                 </option>
//               ))}
//             </select>
//             <div className="cd-editor-actions">
//               <button className="cd-btn cd-btn-run" onClick={handleRun} disabled={running}>
//                 {running ? "Running…" : "▶ Run"}
//               </button>
//               <button className="cd-btn cd-btn-submit" onClick={handleSubmitQuestion} disabled={submittingQuestion}>
//                 {submittingQuestion ? "Submitting…" : "✓ Submit"}
//               </button>
//             </div>
//           </div>
//
//           <div className="cd-editor-wrap">
//             <Editor
//               height="100%"
//               language={monacoLang}
//               theme="vs-dark"
//               value={current.code}
//               onChange={(value) => updateCode({ code: value ?? "" })}
//               options={{
//                 minimap: { enabled: false },
//                 fontSize: 13,
//                 automaticLayout: true,
//                 scrollBeyondLastLine: false,
//               }}
//             />
//           </div>
//
//           {result && (
//             <div className="cd-results-panel">
//               {result.error ? (
//                 <p style={{ color: "#fca5a5" }}>{result.error}</p>
//               ) : (
//                 <>
//                   <div className={`cd-results-summary ${result.allPassed || result.passedCount === result.totalCount ? "pass" : "fail"}`}>
//                     {result.passedCount != null
//                       ? `${result.passedCount} / ${result.totalCount} test cases passed${
//                           result.score != null ? ` · ${result.score}/${result.maxScore} pts` : ""
//                         }`
//                       : result.allPassed
//                       ? "All sample cases passed"
//                       : "Some sample cases failed"}
//                   </div>
//                   {result.results?.map((r, i) => (
//                     <div className={`cd-case-row ${r.passed ? "pass" : "fail"}`} key={i}>
//                       <div className="cd-case-head">
//                         <span>
//                           {r.hidden ? "Hidden case" : `Case ${i + 1}`} {r.passed ? "✓ Passed" : "✗ Failed"}
//                         </span>
//                       </div>
//                       {!r.hidden && (
//                         <>
//                           <div className="cd-case-detail">Input: {r.input || "(none)"}</div>
//                           <div className="cd-case-detail">Expected: {r.expectedOutput}</div>
//                           <div className="cd-case-detail">Got: {r.actualOutput ?? "(no output)"}</div>
//                         </>
//                       )}
//                       {r.errorMessage && <div className="cd-case-detail" style={{ color: "#fca5a5" }}>{r.errorMessage}</div>}
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { StudentCodingApi } from "../../api/codingApi";
import { useExamSecurity } from "../../hooks/useExamSecurity";
import { useCountdown } from "../../hooks/useCountdown";
import { captureViolationScreenshot } from "../../hooks/useScreenshot";
import "../../styles/aptitude.css";
import "../../styles/coding.css";

const LANGUAGES = [
  { key: "python", label: "Python 3", monaco: "python" },
  { key: "java", label: "Java", monaco: "java" },
  { key: "cpp", label: "C++", monaco: "cpp" },
  { key: "c", label: "C", monaco: "c" },
  { key: "javascript", label: "JavaScript (Node)", monaco: "javascript" },
];

const DEFAULT_CODE = {
  python: "# Read input from stdin, write your answer to stdout\n\n",
  java:
    "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // your code here\n    }\n}\n",
  cpp:
    "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}\n",
  c: "#include <stdio.h>\n\nint main() {\n    // your code here\n    return 0;\n}\n",
  javascript:
    "// Read input from stdin, write your answer to stdout\nconst input = require('fs').readFileSync(0, 'utf8');\n\n",
};

export default function CodingTestRunner() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [phase, setPhase] = useState("intro"); // intro | running | finishing | error
  const [session, setSession] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);

  // questionId -> { language, code }
  const [codeState, setCodeState] = useState({});
  // questionId -> last run/submit response
  const [runResults, setRunResults] = useState({});
  // questionId -> { score, maxScore, passedCount, totalCount }
  const [questionScores, setQuestionScores] = useState({});
  const [running, setRunning] = useState(false);
  const [submittingQuestion, setSubmittingQuestion] = useState(false);

  const codeStateRef = useRef(codeState);
  codeStateRef.current = codeState;
  const saveTimerRef = useRef(null);

  // ---------- finish/submit ----------

  const buildPendingCodePayload = () =>
    Object.entries(codeStateRef.current).map(([questionId, v]) => ({
      questionId: Number(questionId),
      language: v.language,
      code: v.code,
    }));

  const finalize = useCallback(
    async (submitFn) => {
      setPhase("finishing");
      try {
        const { data } = await submitFn();
        navigate(`/student/coding-tests/${testId}/result`, {
          replace: true,
          state: { result: data },
        });
      } catch (e) {
        navigate(`/student/coding-tests/${testId}/result`, { replace: true });
      }
    },
    [navigate, testId]
  );

  const handleNormalSubmit = useCallback(() => {
    finalize(() => StudentCodingApi.submit(testId, buildPendingCodePayload()));
  }, [finalize, testId]);

  const handleTimeExpired = useCallback(() => {
    finalize(() => StudentCodingApi.submit(testId, buildPendingCodePayload()));
  }, [finalize, testId]);

  const handleViolation = useCallback(
    async (type) => {
      const screenshot = await captureViolationScreenshot();
      finalize(() =>
        StudentCodingApi.reportViolation(testId, type, screenshot, buildPendingCodePayload())
      );
    },
    [finalize, testId]
  );

  // ---------- security lockdown ----------

  const { enterFullscreen } = useExamSecurity({
    active: phase === "running",
    onViolation: handleViolation,
  });

  const { label: timeLabel, isLow } = useCountdown(session?.deadline, handleTimeExpired);

  // ---------- start ----------

  const handleStart = async () => {
    try {
      await enterFullscreen();
      const { data } = await StudentCodingApi.start(testId);
      setSession(data);

      const initialCode = {};
      const initialScores = {};
      data.questions.forEach((q) => {
        const saved = data.savedCode?.find((s) => s.questionId === q.id);
        initialCode[q.id] = {
          language: saved?.language || "python",
          code: saved?.code || DEFAULT_CODE.python,
        };
        if (saved?.score != null) {
          initialScores[q.id] = { score: saved.score, maxScore: saved.maxScore };
        }
      });
      setCodeState(initialCode);
      setQuestionScores(initialScores);
      setPhase("running");
    } catch (e) {
      setErrorMsg(
        e?.response?.data?.message || "Could not start the test. It may already have been submitted."
      );
      setPhase("error");
    }
  };

  // ---------- editor change (debounced autosave) ----------

  const question = session?.questions?.[currentIdx];
  const current = question ? codeState[question.id] : null;

  const updateCode = (patch) => {
    if (!question) return;
    setCodeState((prev) => ({ ...prev, [question.id]: { ...prev[question.id], ...patch } }));
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const c = { ...codeStateRef.current[question.id], ...patch };
      StudentCodingApi.autosaveCode(testId, question.id, c.language, c.code).catch(() => {});
    }, 600);
  };

  useEffect(() => () => clearTimeout(saveTimerRef.current), []);

  const handleLanguageChange = (lang) => {
    const hasCustomCode = current?.code && current.code.trim() !== "" &&
      !Object.values(DEFAULT_CODE).includes(current.code);
    updateCode({ language: lang, code: hasCustomCode ? current.code : DEFAULT_CODE[lang] });
  };

  // ---------- run / submit question ----------

  const handleRun = async () => {
    if (!question || !current) return;
    setRunning(true);
    try {
      const { data } = await StudentCodingApi.runCode(testId, question.id, current.language, current.code);
      setRunResults((prev) => ({ ...prev, [question.id]: data }));
    } catch (e) {
      setRunResults((prev) => ({
        ...prev,
        [question.id]: { allPassed: false, results: [], error: e?.response?.data?.message || "Run failed." },
      }));
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitQuestion = async () => {
    if (!question || !current) return;
    setSubmittingQuestion(true);
    try {
      const { data } = await StudentCodingApi.submitQuestion(testId, question.id, current.language, current.code);
      setRunResults((prev) => ({ ...prev, [question.id]: data }));
      setQuestionScores((prev) => ({
        ...prev,
        [question.id]: { score: data.score, maxScore: data.maxScore, passedCount: data.passedCount, totalCount: data.totalCount },
      }));
    } catch (e) {
      setRunResults((prev) => ({
        ...prev,
        [question.id]: { allPassed: false, results: [], error: e?.response?.data?.message || "Submit failed." },
      }));
    } finally {
      setSubmittingQuestion(false);
    }
  };

  // ---------- render: intro / lock screen ----------

  if (phase === "intro") {
    return (
      <div className="apt-page">
        <div className="apt-container">
          <button className="cd-exit-btn" onClick={() => navigate("/student/coding-tests")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to My Tests
          </button>
          <div className="apt-card cd-lock-screen">
            <div className="apt-lock-icon">🔒</div>
            <h1 className="apt-title">Ready to begin?</h1>
            <p className="apt-subtitle">This coding assessment runs in full-screen, timed mode.</p>
            <ul className="apt-rules">
              <li>Write and run code directly in the browser — Python, Java, C, C++, and JavaScript are all supported.</li>
              <li>The clock starts the moment you enter full screen and cannot be paused.</li>
              <li>Switching tabs, minimizing, or exiting full screen immediately auto-submits your test and sends a screenshot to the Placement Cell.</li>
              <li>Only the Placement Cell can approve resuming after a violation — you cannot restart it yourself.</li>
              <li>"Run" checks your code against sample cases only. "Submit" scores it against every test case, including hidden ones.</li>
            </ul>
            <button className="apt-btn apt-btn-primary" onClick={handleStart}>
              Enter Full Screen &amp; Start Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="apt-page">
        <div className="apt-container">
          <div className="apt-card cd-lock-screen">
            <h1 className="apt-title">Unable to start</h1>
            <p style={{ color: "#dc2626" }}>{errorMsg}</p>
            <button className="apt-btn apt-btn-outline" onClick={() => navigate("/student/coding-tests")}>
              Back to my tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "finishing" || !session || !question) {
    return (
      <div className="cd-exam-shell" style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <h2>Submitting your test…</h2>
          <p style={{ color: "#94a3b8" }}>Please don't close this window.</p>
        </div>
      </div>
    );
  }

  // ---------- render: running exam ----------

  const result = runResults[question.id];
  const monacoLang = LANGUAGES.find((l) => l.key === current.language)?.monaco || "python";

  return (
    <div className="cd-exam-shell">
      <div className="cd-exam-header">
        <div>
          <h3>{session.title}</h3>
          <div className="cd-exam-sub">
            Question {currentIdx + 1} of {session.questions.length}
          </div>
        </div>
        <div className={`cd-timer ${isLow ? "low" : ""}`}>⏱ {timeLabel}</div>
      </div>

      <div className="cd-exam-body">
        {/* question list sidebar */}
        <div className="cd-question-list">
          {session.questions.map((q, i) => {
            const sc = questionScores[q.id];
            const solved = sc && sc.passedCount != null && sc.passedCount === sc.totalCount && sc.totalCount > 0;
            const attempted = codeState[q.id]?.code && codeState[q.id].code !== DEFAULT_CODE[codeState[q.id].language];
            return (
              <div
                key={q.id}
                className={`cd-question-item ${i === currentIdx ? "current" : ""}`}
                onClick={() => setCurrentIdx(i)}
              >
                <div className="cd-q-title">
                  {i + 1}. {q.title}
                </div>
                <span className={`cd-badge ${solved ? "solved" : attempted ? "attempted" : "untouched"}`}>
                  {solved ? "Solved" : attempted ? "Attempted" : "Not attempted"}
                </span>
                {sc && (
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                    {sc.score}/{sc.maxScore} pts
                  </div>
                )}
              </div>
            );
          })}
          <button
            className="cd-btn cd-btn-finish"
            style={{ width: "100%", marginTop: 10 }}
            onClick={handleNormalSubmit}
          >
            Finish &amp; Submit Test
          </button>
        </div>

        {/* problem statement */}
        <div className="cd-problem-panel">
          <h2 className="cd-problem-title">{question.title}</h2>
          <span className={`cd-difficulty ${(question.difficulty || "medium").toLowerCase()}`}>
            {question.difficulty} · {question.points} pts
          </span>
          <div className="cd-problem-desc">{question.description}</div>

          {question.constraintsText && (
            <div className="cd-constraints">
              <strong>Constraints:</strong>
              <br />
              {question.constraintsText}
            </div>
          )}

          {question.sampleTestCases?.map((tc, i) => (
            <div className="cd-sample-case" key={i}>
              <h5>Sample Input {i + 1}</h5>
              <pre>{tc.input || "(no input)"}</pre>
              <h5>Sample Output {i + 1}</h5>
              <pre>{tc.expectedOutput}</pre>
            </div>
          ))}
        </div>

        {/* editor */}
        <div className="cd-editor-panel">
          <div className="cd-editor-toolbar">
            <select
              className="cd-lang-select"
              value={current.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l.key} value={l.key}>
                  {l.label}
                </option>
              ))}
            </select>
            <div className="cd-editor-actions">
              <button className="cd-btn cd-btn-run" onClick={handleRun} disabled={running}>
                {running ? "Running…" : "▶ Run"}
              </button>
              <button className="cd-btn cd-btn-submit" onClick={handleSubmitQuestion} disabled={submittingQuestion}>
                {submittingQuestion ? "Submitting…" : "✓ Submit"}
              </button>
            </div>
          </div>

          <div className="cd-editor-wrap">
            <Editor
              height="100%"
              language={monacoLang}
              theme="vs-dark"
              value={current.code}
              onChange={(value) => updateCode({ code: value ?? "" })}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                automaticLayout: true,
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          {result && (
            <div className="cd-results-panel">
              {result.error ? (
                <p style={{ color: "#fca5a5" }}>{result.error}</p>
              ) : (
                <>
                  <div className={`cd-results-summary ${result.allPassed || result.passedCount === result.totalCount ? "pass" : "fail"}`}>
                    {result.passedCount != null
                      ? `${result.passedCount} / ${result.totalCount} test cases passed${
                          result.score != null ? ` · ${result.score}/${result.maxScore} pts` : ""
                        }`
                      : result.allPassed
                      ? "All sample cases passed"
                      : "Some sample cases failed"}
                  </div>
                  {result.results?.map((r, i) => (
                    <div className={`cd-case-row ${r.passed ? "pass" : "fail"}`} key={i}>
                      <div className="cd-case-head">
                        <span>
                          {r.hidden ? "Hidden case" : `Case ${i + 1}`} {r.passed ? "✓ Passed" : "✗ Failed"}
                        </span>
                      </div>
                      {!r.hidden && (
                        <>
                          <div className="cd-case-detail">Input: {r.input || "(none)"}</div>
                          <div className="cd-case-detail">Expected: {r.expectedOutput}</div>
                          <div className="cd-case-detail">Got: {r.actualOutput ?? "(no output)"}</div>
                        </>
                      )}
                      {r.errorMessage && <div className="cd-case-detail" style={{ color: "#fca5a5" }}>{r.errorMessage}</div>}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}