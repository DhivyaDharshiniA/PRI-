// import { useState } from "react";
// import { AdminAptitudeApi } from "../../api/aptitudeApi";
// import "../../styles/aptitude.css";
//
// export default function PublishAptitudeTest() {
//   const [publishing, setPublishing] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [title, setTitle] = useState("");
//
//   const handlePublish = async () => {
//     setPublishing(true);
//     setError("");
//     setResult(null);
//     try {
//       const { data } = await AdminAptitudeApi.publishTest({
//         title: title || undefined,
//         durationMinutes: 45,
//         questionCount: 30,
//       });
//       setResult(data);
//     } catch (e) {
//       setError(
//         e?.response?.data?.message ||
//           "Could not publish the test. Please try again."
//       );
//     } finally {
//       setPublishing(false);
//     }
//   };
//
//   return (
//     <div className="apt-page">
//       <div className="apt-container">
//         <div className="apt-card">
//           <h1 className="apt-title">Aptitude Evaluation</h1>
//           <p className="apt-subtitle">
//             Publishing automatically fetches 30 aptitude questions and sends
//             the test to every student. Each student gets a 45-minute,
//             full-screen, no-tab-switch, single-attempt session.
//           </p>
//
//           <label style={{ fontSize: 13, fontWeight: 600, color: "#0b1f4b" }}>
//             Test title (optional)
//           </label>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="e.g. Weekly Aptitude Assessment - Batch A"
//             style={{
//               width: "100%",
//               padding: "12px 14px",
//               margin: "8px 0 20px",
//               borderRadius: 10,
//               border: "1.5px solid #e6efff",
//               fontSize: 14,
//             }}
//           />
//
//           <button
//             className="apt-btn apt-btn-primary"
//             onClick={handlePublish}
//             disabled={publishing}
//           >
//             {publishing ? "Publishing…" : "🚀 Publish Test to All Students"}
//           </button>
//
//           {error && (
//             <p style={{ color: "#dc2626", marginTop: 16, fontSize: 14 }}>
//               {error}
//             </p>
//           )}
//
//           {result && (
//             <div
//               className="apt-card"
//               style={{ marginTop: 22, background: "#f4f8ff" }}
//             >
//               <span className="apt-pill apt-pill-green">✓ Published</span>
//               <h3 style={{ margin: "12px 0 4px" }}>{result.title}</h3>
//               <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>
//                 {result.totalQuestions} questions · {result.durationMinutes}{" "}
//                 minutes · sent to {result.studentsAssigned} student
//                 {result.studentsAssigned === 1 ? "" : "s"}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ClipboardList,
  Clock3,
  FileQuestion,
  Users,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

import { AdminAptitudeApi } from "../../api/aptitudeApi";

export default function PublishAptitudeTest() {
  const navigate = useNavigate();

  const [publishing, setPublishing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  const handlePublish = async () => {
    setPublishing(true);
    setError("");
    setResult(null);

    try {
      const { data } = await AdminAptitudeApi.publishTest({
        title: title || undefined,
        durationMinutes: 45,
        questionCount: 30,
      });

      setResult(data);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          "Could not publish the test. Please try again."
      );
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] text-[#111827]">
      {/* Background decoration */}
      <div className="fixed -right-32 -top-32 h-80 w-80 rounded-full bg-[#3D6EFF]/5 pointer-events-none" />
      <div className="fixed -left-40 bottom-0 h-72 w-72 rounded-full bg-[#2563EB]/5 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">

        {/* =====================================================
            BACK BUTTON
        ====================================================== */}
        <button
          type="button"
          onClick={() => navigate("/placement-dashboard")}
          className="mb-6 flex items-center gap-2 rounded-lg px-1 py-1.5 text-sm font-medium text-[#64748B] transition hover:-translate-x-1 hover:text-[#2563EB]"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8EEFF] text-[#2563EB] shadow-sm">
            <ClipboardList size={24} />
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-[#94A3B8]">
              <span>Placement Cell</span>
              <ChevronRight size={12} />
              <span>Aptitude Tests</span>
            </div>

            <h1 className="font-display text-2xl font-bold tracking-tight text-[#0B1D42] sm:text-[28px]">
              Aptitude Evaluation
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#64748B]">
              Create and publish an aptitude assessment for students.
              The assessment will be automatically distributed to eligible
              students.
            </p>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* ===================================================
              MAIN FORM CARD
          ==================================================== */}
          <div className="rounded-2xl border border-[#DCE3F5] bg-white p-6 shadow-[0_8px_30px_rgba(30,64,175,0.04)] sm:p-7">

            {/* Card heading */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#0B1D42]">
                  Create Aptitude Assessment
                </h2>

                <p className="mt-1 text-xs text-[#94A3B8]">
                  Configure your assessment before publishing it.
                </p>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full border border-[#DCFCE7] bg-[#F0FDF4] px-3 py-1.5 text-[11px] font-semibold text-[#15803D]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                Ready to publish
              </div>
            </div>

            <div className="my-6 h-px bg-[#EEF2F7]" />

            {/* =================================================
                TITLE
            ================================================== */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <label
                  htmlFor="test-title"
                  className="text-sm font-semibold text-[#0B1D42]"
                >
                  Test title
                </label>

                <span className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-medium text-[#94A3B8]">
                  Optional
                </span>
              </div>

              <input
                id="test-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Weekly Aptitude Assessment - Batch A"
                className="h-11 w-full rounded-lg border border-[#DCE3F5] bg-white px-3.5 text-sm text-[#111827] outline-none transition placeholder:text-[#A1AAB8] hover:border-[#B8C8EC] focus:border-[#3D6EFF] focus:ring-4 focus:ring-[#3D6EFF]/10"
              />

              <p className="mt-1.5 text-[11px] text-[#94A3B8]">
                Give your assessment a meaningful name so students can
                easily identify it.
              </p>
            </div>

            {/* =================================================
                CONFIGURATION
            ================================================== */}
            <div className="mt-7">
              <h3 className="mb-3 text-sm font-semibold text-[#0B1D42]">
                Assessment configuration
              </h3>

              <div className="grid gap-3 sm:grid-cols-3">

                {/* Questions */}
                <div className="rounded-xl border border-[#E2E8F5] bg-[#FBFCFF] p-4 transition hover:border-[#C7D5F5] hover:bg-[#F8FAFF]">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8EEFF] text-[#2563EB]">
                    <FileQuestion size={18} />
                  </div>

                  <p className="text-[11px] font-medium text-[#64748B]">
                    Questions
                  </p>

                  <div className="mt-0.5">
                    <span className="font-display text-xl font-bold text-[#0B1D42]">
                      30
                    </span>
                    <span className="ml-1 text-[11px] text-[#94A3B8]">
                      questions
                    </span>
                  </div>
                </div>

                {/* Duration */}
                <div className="rounded-xl border border-[#E2E8F5] bg-[#FBFCFF] p-4 transition hover:border-[#C7D5F5] hover:bg-[#F8FAFF]">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8EEFF] text-[#2563EB]">
                    <Clock3 size={18} />
                  </div>

                  <p className="text-[11px] font-medium text-[#64748B]">
                    Duration
                  </p>

                  <div className="mt-0.5">
                    <span className="font-display text-xl font-bold text-[#0B1D42]">
                      45
                    </span>
                    <span className="ml-1 text-[11px] text-[#94A3B8]">
                      minutes
                    </span>
                  </div>
                </div>

                {/* Students */}
                <div className="rounded-xl border border-[#E2E8F5] bg-[#FBFCFF] p-4 transition hover:border-[#C7D5F5] hover:bg-[#F8FAFF]">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8EEFF] text-[#2563EB]">
                    <Users size={18} />
                  </div>

                  <p className="text-[11px] font-medium text-[#64748B]">
                    Distribution
                  </p>

                  <div className="mt-0.5">
                    <span className="font-display text-xl font-bold text-[#0B1D42]">
                      All
                    </span>
                    <span className="ml-1 text-[11px] text-[#94A3B8]">
                      students
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RULES
            ================================================== */}
            <div className="mt-6 flex gap-3 rounded-xl border border-[#DBE7FF] bg-[#F5F8FF] p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E0EAFF] text-[#2563EB]">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#0B1D42]">
                  Assessment rules
                </h3>

                <ul className="mt-1.5 space-y-1 text-[11px] leading-5 text-[#64748B]">
                  <li>• Full-screen assessment environment</li>
                  <li>• Tab switching is restricted</li>
                  <li>• Each student gets a single attempt</li>
                  <li>• 45-minute time limit</li>
                </ul>
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================== */}
            {error && (
              <div className="mt-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-red-600">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />

                <div>
                  <p className="text-xs font-bold">
                    Publishing failed
                  </p>

                  <p className="mt-1 text-[11px] text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                PUBLISH BUTTON
            ================================================== */}
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishing}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] text-sm font-bold text-white shadow-[0_6px_18px_rgba(37,99,235,0.2)] transition hover:bg-[#1D4ED8] hover:shadow-[0_8px_22px_rgba(37,99,235,0.25)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {publishing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Publishing assessment...
                </>
              ) : (
                <>
                  <Rocket size={18} />
                  Publish Test to All Students
                </>
              )}
            </button>

            <p className="mt-2 text-center text-[10px] text-[#94A3B8]">
              By publishing, this assessment will become available to
              all eligible students immediately.
            </p>
          </div>

          {/* ===================================================
              RIGHT SIDEBAR
          ==================================================== */}
          <div className="space-y-4">

            {/* Assessment Summary */}
            <div className="rounded-2xl border border-[#DCE3F5] bg-white p-5 shadow-[0_7px_25px_rgba(30,64,175,0.035)]">
              <div className="flex items-center gap-3 border-b border-[#EEF2F7] pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8EEFF] text-[#2563EB]">
                  <ClipboardList size={18} />
                </div>

                <div>
                  <h3 className="font-display text-sm font-semibold text-[#0B1D42]">
                    Assessment Summary
                  </h3>

                  <p className="mt-0.5 text-[10px] text-[#94A3B8]">
                    Review before publishing
                  </p>
                </div>
              </div>

              <div className="divide-y divide-[#F1F5F9]">
                <div className="flex items-center justify-between py-3">
                  <span className="text-[11px] text-[#64748B]">
                    Questions
                  </span>

                  <span className="text-xs font-bold text-[#0B1D42]">
                    30
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-[11px] text-[#64748B]">
                    Duration
                  </span>

                  <span className="text-xs font-bold text-[#0B1D42]">
                    45 min
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-[11px] text-[#64748B]">
                    Attempts
                  </span>

                  <span className="text-xs font-bold text-[#0B1D42]">
                    1
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-[11px] text-[#64748B]">
                    Students
                  </span>

                  <span className="text-xs font-bold text-[#2563EB]">
                    All eligible
                  </span>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="rounded-2xl border border-[#DCE3F5] bg-white p-5 shadow-[0_7px_25px_rgba(30,64,175,0.035)]">
              <h3 className="mb-5 font-display text-sm font-semibold text-[#0B1D42]">
                What happens next?
              </h3>

              {/* Step 1 */}
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EEFF] text-[10px] font-bold text-[#2563EB]">
                  1
                </div>

                <div>
                  <p className="text-[11px] font-bold text-[#0B1D42]">
                    Questions are fetched
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#94A3B8]">
                    30 aptitude questions are automatically selected.
                  </p>
                </div>
              </div>

              <div className="ml-3.5 h-5 w-px bg-[#DCE5F7]" />

              {/* Step 2 */}
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EEFF] text-[10px] font-bold text-[#2563EB]">
                  2
                </div>

                <div>
                  <p className="text-[11px] font-bold text-[#0B1D42]">
                    Students are notified
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#94A3B8]">
                    The assessment becomes available to eligible students.
                  </p>
                </div>
              </div>

              <div className="ml-3.5 h-5 w-px bg-[#DCE5F7]" />

              {/* Step 3 */}
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EEFF] text-[10px] font-bold text-[#2563EB]">
                  3
                </div>

                <div>
                  <p className="text-[11px] font-bold text-[#0B1D42]">
                    Students take the test
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#94A3B8]">
                    Each student receives a 45-minute single attempt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SUCCESS RESULT
        ====================================================== */}
        {result && (
          <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-green-200 bg-green-50 p-5 sm:flex-row sm:items-center">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <CheckCircle2 size={25} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
                Assessment Published Successfully
              </p>

              <h2 className="mt-1 font-display text-base font-bold text-green-900">
                {result.title}
              </h2>

              <p className="mt-1 text-xs text-green-700">
                Your aptitude assessment has been successfully published
                and assigned to students.
              </p>

              <div className="mt-3 flex flex-wrap gap-5">
                <div>
                  <strong className="block text-sm text-green-900">
                    {result.totalQuestions}
                  </strong>
                  <span className="text-[9px] text-green-600">
                    Questions
                  </span>
                </div>

                <div>
                  <strong className="block text-sm text-green-900">
                    {result.durationMinutes}
                  </strong>
                  <span className="text-[9px] text-green-600">
                    Minutes
                  </span>
                </div>

                <div>
                  <strong className="block text-sm text-green-900">
                    {result.studentsAssigned}
                  </strong>
                  <span className="text-[9px] text-green-600">
                    Students
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/placement-dashboard")}
              className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-4 text-xs font-bold text-[#2563EB] transition hover:bg-blue-50"
            >
              Go to Dashboard
              <ArrowLeft
                size={15}
                className="rotate-180"
              />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}