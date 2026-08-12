// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { StudentCodingApi } from "../../api/codingApi";
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
// export default function CodingTestResult() {
//   const { testId } = useParams();
//   const { state } = useLocation();
//   const navigate = useNavigate();
//
//   const [result, setResult] = useState(state?.result || null);
//   const [loading, setLoading] = useState(!state?.result);
//
//   useEffect(() => {
//     if (result) return;
//     StudentCodingApi.getResult(testId)
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
//             <button className="apt-btn apt-btn-outline" onClick={() => navigate("/student/coding-tests")}>
//               Back to my tests
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//
//   return (
//     <div className="apt-page">
//       <div className="apt-container">
//         <div className="apt-card" style={{ textAlign: "center" }}>
//           {result.violationType && (
//             <div className="apt-pill apt-pill-red" style={{ marginBottom: 18 }}>
//               ⚠ {VIOLATION_MESSAGE[result.violationType] || "Auto-submitted"}
//             </div>
//           )}
//
//           {result.violationType && result.resumeDecision === "PENDING" && (
//             <p style={{ color: "#d97706" }}>
//               A screenshot was sent to the Placement Cell. Your resume request is pending review.
//             </p>
//           )}
//           {result.violationType && result.resumeDecision === "REJECTED" && (
//             <p style={{ color: "#dc2626" }}>The Placement Cell denied your resume request.</p>
//           )}
//
//           <h1 className="apt-title">{result.title}</h1>
//
//           {!result.resultsPublished ? (
//             <>
//               <p className="apt-subtitle">Your test has been submitted successfully.</p>
//               <p style={{ color: "#64748b", fontSize: 15 }}>
//                 The Placement Cell hasn't published marks for this test yet. Check back later.
//               </p>
//             </>
//           ) : (
//             <>
//               <p className="apt-subtitle">Here's how you did</p>
//               <div className="apt-result-ring" style={{ "--pct": result.percentage ?? 0 }}>
//                 <div className="apt-result-ring-inner">
//                   <div style={{ fontSize: 26, fontWeight: 800, color: "#14428f" }}>
//                     {result.percentage ?? 0}%
//                   </div>
//                 </div>
//               </div>
//               <div className="apt-result-score">
//                 {result.score} / {result.totalMarks}
//               </div>
//               <p style={{ color: "#64748b" }}>Total score</p>
//
//               {result.questionResults && (
//                 <div style={{ textAlign: "left", marginTop: 24 }}>
//                   <table className="cd-results-table" style={{ width: "100%" }}>
//                     <thead>
//                       <tr>
//                         <th>Question</th>
//                         <th>Test cases passed</th>
//                         <th>Score</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {result.questionResults.map((q) => (
//                         <tr key={q.questionId}>
//                           <td>{q.title}</td>
//                           <td>
//                             {q.passedCount} / {q.totalCount}
//                           </td>
//                           <td>
//                             {q.score} / {q.maxScore}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </>
//           )}
//
//           <button
//             className="apt-btn apt-btn-primary"
//             style={{ marginTop: 20 }}
//             onClick={() => navigate("/student/coding-tests")}
//           >
//             Back to My Tests
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StudentCodingApi } from "../../api/codingApi";
import BackHeader from "../../components/BackHeader";
import "../../styles/aptitude.css";
import "../../styles/coding.css";

const VIOLATION_MESSAGE = {
  TAB_SWITCH: "Your test was auto-submitted because you switched tabs.",
  WINDOW_BLUR: "Your test was auto-submitted because the window lost focus.",
  FULLSCREEN_EXIT: "Your test was auto-submitted because you exited full screen.",
  TIME_EXPIRED: "Time ran out, so your test was submitted automatically.",
  RESUME_ATTEMPT: "Your test was auto-submitted because it cannot be resumed once started.",
};

export default function CodingTestResult() {
  const { testId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState(state?.result || null);
  const [loading, setLoading] = useState(!state?.result);

  useEffect(() => {
    if (result) return;
    StudentCodingApi.getResult(testId)
      .then(({ data }) => setResult(data))
      .finally(() => setLoading(false));
  }, [testId, result]);

  if (loading) {
    return (
      <div className="apt-page">
        <div className="apt-container">
          <p>Loading result…</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="apt-page">
        <div className="apt-container">
          <BackHeader to="/student/coding-tests" label="Back to My Tests" />
          <div className="apt-card">
            <h1 className="apt-title">Result not available</h1>
            <button className="apt-btn apt-btn-outline" onClick={() => navigate("/student/coding-tests")}>
              Back to my tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="apt-page">
      <div className="apt-container">
        <BackHeader to="/student/coding-tests" label="Back to My Tests" eyebrow="Result" />
        <div className="apt-card" style={{ textAlign: "center" }}>
          {result.violationType && (
            <div className="apt-pill apt-pill-red" style={{ marginBottom: 18 }}>
              ⚠ {VIOLATION_MESSAGE[result.violationType] || "Auto-submitted"}
            </div>
          )}

          {result.violationType && result.resumeDecision === "PENDING" && (
            <p style={{ color: "#d97706" }}>
              A screenshot was sent to the Placement Cell. Your resume request is pending review.
            </p>
          )}
          {result.violationType && result.resumeDecision === "REJECTED" && (
            <p style={{ color: "#dc2626" }}>The Placement Cell denied your resume request.</p>
          )}

          <h1 className="apt-title">{result.title}</h1>

          {!result.resultsPublished ? (
            <>
              <p className="apt-subtitle">Your test has been submitted successfully.</p>
              <p style={{ color: "#64748b", fontSize: 15 }}>
                The Placement Cell hasn't published marks for this test yet. Check back later.
              </p>
            </>
          ) : (
            <>
              <p className="apt-subtitle">Here's how you did</p>
              <div className="apt-result-ring" style={{ "--pct": result.percentage ?? 0 }}>
                <div className="apt-result-ring-inner">
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#14428f" }}>
                    {result.percentage ?? 0}%
                  </div>
                </div>
              </div>
              <div className="apt-result-score">
                {result.score} / {result.totalMarks}
              </div>
              <p style={{ color: "#64748b" }}>Total score</p>

              {result.questionResults && (
                <div style={{ textAlign: "left", marginTop: 24 }}>
                  <table className="cd-results-table" style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Question</th>
                        <th>Test cases passed</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.questionResults.map((q) => (
                        <tr key={q.questionId}>
                          <td>{q.title}</td>
                          <td>
                            {q.passedCount} / {q.totalCount}
                          </td>
                          <td>
                            {q.score} / {q.maxScore}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          <button
            className="apt-btn apt-btn-primary"
            style={{ marginTop: 20 }}
            onClick={() => navigate("/student/coding-tests")}
          >
            Back to My Tests
          </button>
        </div>
      </div>
    </div>
  );
}