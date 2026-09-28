// import React, { useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { PlacementCodingApi } from "../../api/codingApi";
// import "../../styles/aptitude.css";
// import "../../styles/coding.css";
//
// import {
//   LayoutGrid,
//   ClipboardList,
//   Code2,
//   ShieldAlert,
//   BarChart3,
//   Settings,
//   LogOut,
//   ChevronRight,
//   Clock3,
//   Plus,
//   Trash2,
//   Eye,
//   EyeOff,
//   FileCode2,
//   CircleCheck,
//   AlertCircle,
//   ArrowLeft,
//   Rocket,
//   BookOpen,
//   Terminal,
//   Trophy,
// } from "lucide-react";
//
// // =============================================================================
// // NAVIGATION
// // =============================================================================
//
// const NAV_ITEMS = [
//   {
//     key: "dashboard",
//     label: "Dashboard",
//     icon: LayoutGrid,
//     path: "/placement-dashboard",
//   },
//   {
//     key: "aptitude",
//     label: "Aptitude tests",
//     icon: ClipboardList,
//     path: "/placement/aptitude-tests/publish",
//   },
//   {
//     key: "coding",
//     label: "Coding tests",
//     icon: Code2,
//     path: "/placement/coding-tests/publish",
//   },
//   {
//     key: "violations",
//     label: "Violations & results",
//     icon: ShieldAlert,
//     path: "/placement/coding-tests/manage",
//   },
//   {
//     key: "stats",
//     label: "Tests",
//     icon: BarChart3,
//     path: "/placement/stats",
//   },
// ];
//
// // =============================================================================
// // HELPERS
// // =============================================================================
//
// function emptyTestCase(hidden) {
//   return {
//     input: "",
//     expectedOutput: "",
//     hidden,
//   };
// }
//
// function emptyQuestion() {
//   return {
//     title: "",
//     description: "",
//     difficulty: "MEDIUM",
//     points: 100,
//     constraintsText: "",
//     testCases: [
//       emptyTestCase(false),
//       emptyTestCase(true),
//     ],
//   };
// }
//
// // =============================================================================
// // SIDEBAR
// // =============================================================================
//
// function Sidebar({ activeKey, onNavigate }) {
//   return (
//     <aside
//       className="
//         hidden md:flex
//         fixed left-0 top-0 bottom-0
//         w-64
//         flex-col
//         bg-[#0B1D42]
//         text-white
//         px-5 py-6
//         z-50
//       "
//     >
//       {/* Logo */}
//       <div className="flex items-center gap-2.5 px-1 mb-9">
//         <div
//           className="
//             w-9 h-9
//             rounded-xl
//             bg-[#3D6EFF]
//             flex items-center justify-center
//             font-bold
//             text-white
//             shadow-lg shadow-blue-900/20
//           "
//         >
//           P
//         </div>
//
//         <div>
//           <div className="font-display font-semibold text-[15px] tracking-tight">
//             Placement<span className="text-[#7DA2FF]">Cell</span>
//           </div>
//
//           <div className="text-[10px] text-white/35 uppercase tracking-wider mt-0.5">
//             Placement Management
//           </div>
//         </div>
//       </div>
//
//       {/* Navigation */}
//       <nav className="flex-1 flex flex-col gap-1">
//         {NAV_ITEMS.map(({ key, label, icon: Icon, path }) => {
//           const isActive = activeKey === key;
//
//           return (
//             <button
//               key={key}
//               type="button"
//               onClick={() => onNavigate(path)}
//               className={`
//                 group
//                 flex
//                 items-center
//                 gap-3
//                 px-3
//                 py-3
//                 rounded-xl
//                 text-sm
//                 text-left
//                 transition-all
//                 ${
//                   isActive
//                     ? "bg-white/10 text-white shadow-sm"
//                     : "text-white/50 hover:text-white hover:bg-white/[0.06]"
//                 }
//               `}
//             >
//               <Icon
//                 size={17}
//                 strokeWidth={2}
//                 className={
//                   isActive
//                     ? "text-[#7DA2FF]"
//                     : "text-white/35 group-hover:text-white/70"
//                 }
//               />
//
//               <span className="font-medium flex-1">
//                 {label}
//               </span>
//
//               {isActive && (
//                 <ChevronRight
//                   size={14}
//                   className="text-white/35"
//                 />
//               )}
//             </button>
//           );
//         })}
//       </nav>
//
//       {/* Weekly summary */}
//       <div className="rounded-xl bg-white/[0.06] border border-white/[0.04] p-4">
//         <div className="flex items-center gap-2 text-[#7DA2FF] mb-1.5">
//           <BarChart3 size={15} />
//
//           <span className="font-semibold text-sm">
//             This week
//           </span>
//         </div>
//
//         <p className="text-xs text-white/45 leading-relaxed">
//           186 tests submitted, 24 awaiting review.
//         </p>
//       </div>
//
//       {/* Bottom */}
//       <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-1">
//         <button
//           type="button"
//           className="
//             flex items-center gap-3
//             px-3 py-2.5
//             rounded-lg
//             text-sm
//             text-white/45
//             hover:text-white
//             hover:bg-white/[0.05]
//             transition-colors
//           "
//         >
//           <Settings size={16} />
//           <span>Settings</span>
//         </button>
//
//         <button
//           type="button"
//           className="
//             flex items-center gap-3
//             px-3 py-2.5
//             rounded-lg
//             text-sm
//             text-white/45
//             hover:text-white
//             hover:bg-white/[0.05]
//             transition-colors
//           "
//         >
//           <LogOut size={16} />
//           <span>Sign out</span>
//         </button>
//       </div>
//     </aside>
//   );
// }
//
// // =============================================================================
// // PAGE HEADER
// // =============================================================================
//
// function PageHeader({ onBack }) {
//   return (
//     <div className="mb-7">
//       <button
//         type="button"
//         onClick={onBack}
//         className="
//           inline-flex
//           items-center
//           gap-2
//           text-xs
//           font-medium
//           text-[#64748B]
//           hover:text-[#1D4ED8]
//           transition-colors
//           mb-4
//         "
//       >
//         <ArrowLeft size={14} />
//         Back to dashboard
//       </button>
//
//       <div className="flex items-start justify-between gap-5">
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//             <div
//               className="
//                 w-10 h-10
//                 rounded-xl
//                 bg-[#E8EEFF]
//                 flex items-center justify-center
//               "
//             >
//               <FileCode2
//                 size={20}
//                 className="text-[#3D6EFF]"
//               />
//             </div>
//
//             <h1
//               className="
//                 font-display
//                 text-[28px]
//                 font-semibold
//                 tracking-tight
//                 text-[#0B1D42]
//               "
//             >
//               Create Coding Assessment
//             </h1>
//           </div>
//
//           <p className="text-sm text-[#64748B] max-w-2xl leading-relaxed">
//             Build a coding assessment with multiple programming problems,
//             sample test cases, hidden test cases, difficulty levels and
//             automatic evaluation.
//           </p>
//         </div>
//
//         <div className="hidden lg:flex items-center gap-2">
//           <div className="flex items-center gap-2 bg-white border border-[#DCE3F5] rounded-xl px-3 py-2">
//             <Terminal
//               size={15}
//               className="text-[#3D6EFF]"
//             />
//
//             <span className="text-xs font-medium text-[#475569]">
//               Python · Java · C · C++ · JavaScript
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// // =============================================================================
// // TEST SETTINGS
// // =============================================================================
//
// function TestSettings({
//   title,
//   setTitle,
//   durationMinutes,
//   setDurationMinutes,
// }) {
//   return (
//     <section className="bg-white rounded-2xl border border-[#DCE3F5] shadow-sm overflow-hidden mb-6">
//       <div className="px-6 py-5 border-b border-[#EEF2F8]">
//         <div className="flex items-center gap-2">
//           <BookOpen
//             size={17}
//             className="text-[#3D6EFF]"
//           />
//
//           <h2 className="font-display font-semibold text-base text-[#0B1D42]">
//             Assessment details
//           </h2>
//         </div>
//
//         <p className="text-xs text-[#64748B] mt-1">
//           Configure the basic information for your coding assessment.
//         </p>
//       </div>
//
//       <div className="p-6 grid md:grid-cols-[2fr_1fr] gap-5">
//         <div>
//           <label className="block text-xs font-semibold text-[#334155] mb-2">
//             Test title
//           </label>
//
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="e.g. Round 1 - Coding Assessment"
//             className="
//               w-full
//               h-11
//               px-3.5
//               rounded-xl
//               border
//               border-[#DCE3F5]
//               bg-[#FBFCFF]
//               text-sm
//               text-[#0F172A]
//               outline-none
//               transition-all
//               focus:border-[#3D6EFF]
//               focus:ring-4
//               focus:ring-[#3D6EFF]/10
//             "
//           />
//         </div>
//
//         <div>
//           <label className="block text-xs font-semibold text-[#334155] mb-2">
//             Duration
//           </label>
//
//           <div className="relative">
//             <Clock3
//               size={15}
//               className="
//                 absolute
//                 left-3.5
//                 top-1/2
//                 -translate-y-1/2
//                 text-[#94A3B8]
//               "
//             />
//
//             <input
//               type="number"
//               min={5}
//               value={durationMinutes}
//               onChange={(e) =>
//                 setDurationMinutes(e.target.value)
//               }
//               className="
//                 w-full
//                 h-11
//                 pl-10
//                 pr-16
//                 rounded-xl
//                 border
//                 border-[#DCE3F5]
//                 bg-[#FBFCFF]
//                 text-sm
//                 text-[#0F172A]
//                 outline-none
//                 focus:border-[#3D6EFF]
//                 focus:ring-4
//                 focus:ring-[#3D6EFF]/10
//               "
//             />
//
//             <span
//               className="
//                 absolute
//                 right-3.5
//                 top-1/2
//                 -translate-y-1/2
//                 text-xs
//                 text-[#94A3B8]
//               "
//             >
//               minutes
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
//
// // =============================================================================
// // INPUT FIELD
// // =============================================================================
//
// function FieldLabel({ children }) {
//   return (
//     <label className="block text-xs font-semibold text-[#334155] mb-2">
//       {children}
//     </label>
//   );
// }
//
// // =============================================================================
// // TEST CASE
// // =============================================================================
//
// function TestCaseCard({
//   tc,
//   tcIdx,
//   qIdx,
//   total,
//   updateTestCase,
//   removeTestCase,
// }) {
//   return (
//     <div
//       className="
//         rounded-xl
//         border
//         border-[#E2E8F0]
//         bg-[#FCFDFF]
//         p-4
//         mb-3
//       "
//     >
//       <div className="flex items-center justify-between gap-3 mb-4">
//         <div className="flex items-center gap-2">
//           <div
//             className={`
//               w-7 h-7
//               rounded-lg
//               flex items-center justify-center
//               ${
//                 tc.hidden
//                   ? "bg-[#FFF1F2] text-[#E11D48]"
//                   : "bg-[#EEF4FF] text-[#2563EB]"
//               }
//             `}
//           >
//             {tc.hidden ? (
//               <EyeOff size={14} />
//             ) : (
//               <Eye size={14} />
//             )}
//           </div>
//
//           <div>
//             <p className="text-xs font-semibold text-[#334155]">
//               Test case {tcIdx + 1}
//             </p>
//
//             <p className="text-[10px] text-[#94A3B8]">
//               {tc.hidden
//                 ? "Used for automatic evaluation"
//                 : "Visible sample for students"}
//             </p>
//           </div>
//         </div>
//
//         <div className="flex items-center gap-3">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={tc.hidden}
//               onChange={(e) =>
//                 updateTestCase(
//                   qIdx,
//                   tcIdx,
//                   {
//                     hidden: e.target.checked,
//                   }
//                 )
//               }
//               className="accent-[#3D6EFF]"
//             />
//
//             <span className="text-xs text-[#475569]">
//               Hidden
//             </span>
//           </label>
//
//           {total > 1 && (
//             <button
//               type="button"
//               onClick={() =>
//                 removeTestCase(qIdx, tcIdx)
//               }
//               className="
//                 w-7 h-7
//                 rounded-lg
//                 flex items-center justify-center
//                 text-[#94A3B8]
//                 hover:text-[#DC2626]
//                 hover:bg-[#FFF1F2]
//                 transition-colors
//               "
//               title="Remove test case"
//             >
//               <Trash2 size={14} />
//             </button>
//           )}
//         </div>
//       </div>
//
//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <FieldLabel>
//             Input <span className="font-normal text-[#94A3B8]">(stdin)</span>
//           </FieldLabel>
//
//           <textarea
//             value={tc.input}
//             onChange={(e) =>
//               updateTestCase(
//                 qIdx,
//                 tcIdx,
//                 {
//                   input: e.target.value,
//                 }
//               )
//             }
//             placeholder="Enter input..."
//             className="
//               w-full
//               min-h-[100px]
//               resize-y
//               px-3
//               py-2.5
//               rounded-xl
//               border
//               border-[#DCE3F5]
//               bg-[#0F172A]
//               text-[#E2E8F0]
//               font-mono
//               text-xs
//               leading-relaxed
//               outline-none
//               focus:border-[#3D6EFF]
//               focus:ring-4
//               focus:ring-[#3D6EFF]/10
//             "
//           />
//         </div>
//
//         <div>
//           <FieldLabel>
//             Expected output{" "}
//             <span className="font-normal text-[#94A3B8]">
//               (stdout)
//             </span>
//           </FieldLabel>
//
//           <textarea
//             value={tc.expectedOutput}
//             onChange={(e) =>
//               updateTestCase(
//                 qIdx,
//                 tcIdx,
//                 {
//                   expectedOutput:
//                     e.target.value,
//                 }
//               )
//             }
//             placeholder="Enter expected output..."
//             className="
//               w-full
//               min-h-[100px]
//               resize-y
//               px-3
//               py-2.5
//               rounded-xl
//               border
//               border-[#DCE3F5]
//               bg-[#0F172A]
//               text-[#E2E8F0]
//               font-mono
//               text-xs
//               leading-relaxed
//               outline-none
//               focus:border-[#3D6EFF]
//               focus:ring-4
//               focus:ring-[#3D6EFF]/10
//             "
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
//
// // =============================================================================
// // QUESTION CARD
// // =============================================================================
//
// function QuestionCard({
//   q,
//   qIdx,
//   totalQuestions,
//   updateQuestion,
//   updateTestCase,
//   addTestCase,
//   removeTestCase,
//   removeQuestion,
// }) {
//   const visibleCases = q.testCases.filter(
//     (tc) => !tc.hidden
//   ).length;
//
//   const hiddenCases = q.testCases.filter(
//     (tc) => tc.hidden
//   ).length;
//
//   return (
//     <section
//       className="
//         bg-white
//         rounded-2xl
//         border
//         border-[#DCE3F5]
//         shadow-sm
//         overflow-hidden
//         mb-6
//       "
//     >
//       {/* Question header */}
//       <div
//         className="
//           px-6
//           py-4
//           border-b
//           border-[#EEF2F8]
//           bg-[#FBFCFF]
//           flex
//           items-center
//           justify-between
//           gap-4
//         "
//       >
//         <div className="flex items-center gap-3">
//           <div
//             className="
//               w-9 h-9
//               rounded-xl
//               bg-[#0B1D42]
//               text-white
//               flex
//               items-center
//               justify-center
//               font-display
//               font-semibold
//               text-sm
//             "
//           >
//             {qIdx + 1}
//           </div>
//
//           <div>
//             <h2 className="font-display font-semibold text-sm text-[#0B1D42]">
//               Coding problem
//             </h2>
//
//             <div className="flex items-center gap-3 mt-1">
//               <span className="text-[11px] text-[#64748B]">
//                 {visibleCases} visible
//               </span>
//
//               <span className="text-[#CBD5E1]">
//                 •
//               </span>
//
//               <span className="text-[11px] text-[#64748B]">
//                 {hiddenCases} hidden
//               </span>
//             </div>
//           </div>
//         </div>
//
//         {totalQuestions > 1 && (
//           <button
//             type="button"
//             onClick={() => removeQuestion(qIdx)}
//             className="
//               flex items-center gap-1.5
//               px-3 py-2
//               rounded-lg
//               text-xs
//               font-medium
//               text-[#DC2626]
//               border border-[#FECACA]
//               hover:bg-[#FFF1F2]
//               transition-colors
//             "
//           >
//             <Trash2 size={13} />
//             Remove question
//           </button>
//         )}
//       </div>
//
//       <div className="p-6">
//         {/* Title */}
//         <div className="mb-5">
//           <FieldLabel>
//             Problem title
//           </FieldLabel>
//
//           <input
//             value={q.title}
//             onChange={(e) =>
//               updateQuestion(qIdx, {
//                 title: e.target.value,
//               })
//             }
//             placeholder="e.g. Two Sum"
//             className="
//               w-full
//               h-11
//               px-3.5
//               rounded-xl
//               border
//               border-[#DCE3F5]
//               bg-[#FBFCFF]
//               text-sm
//               outline-none
//               focus:border-[#3D6EFF]
//               focus:ring-4
//               focus:ring-[#3D6EFF]/10
//             "
//           />
//         </div>
//
//         {/* Description */}
//         <div className="mb-5">
//           <FieldLabel>
//             Problem statement
//           </FieldLabel>
//
//           <textarea
//             value={q.description}
//             onChange={(e) =>
//               updateQuestion(qIdx, {
//                 description:
//                   e.target.value,
//               })
//             }
//             placeholder="Describe the problem, input format, output format and what the student needs to solve..."
//             className="
//               w-full
//               min-h-[140px]
//               resize-y
//               px-3.5
//               py-3
//               rounded-xl
//               border
//               border-[#DCE3F5]
//               bg-[#FBFCFF]
//               text-sm
//               leading-relaxed
//               outline-none
//               focus:border-[#3D6EFF]
//               focus:ring-4
//               focus:ring-[#3D6EFF]/10
//             "
//           />
//         </div>
//
//         {/* Difficulty + points */}
//         <div className="grid sm:grid-cols-2 gap-4 mb-5">
//           <div>
//             <FieldLabel>
//               Difficulty
//             </FieldLabel>
//
//             <select
//               value={q.difficulty}
//               onChange={(e) =>
//                 updateQuestion(qIdx, {
//                   difficulty:
//                     e.target.value,
//                 })
//               }
//               className="
//                 w-full
//                 h-11
//                 px-3
//                 rounded-xl
//                 border
//                 border-[#DCE3F5]
//                 bg-[#FBFCFF]
//                 text-sm
//                 outline-none
//                 focus:border-[#3D6EFF]
//                 focus:ring-4
//                 focus:ring-[#3D6EFF]/10
//               "
//             >
//               <option value="EASY">
//                 Easy
//               </option>
//
//               <option value="MEDIUM">
//                 Medium
//               </option>
//
//               <option value="HARD">
//                 Hard
//               </option>
//             </select>
//           </div>
//
//           <div>
//             <FieldLabel>
//               Points
//             </FieldLabel>
//
//             <input
//               type="number"
//               min="1"
//               value={q.points}
//               onChange={(e) =>
//                 updateQuestion(qIdx, {
//                   points: e.target.value,
//                 })
//               }
//               className="
//                 w-full
//                 h-11
//                 px-3
//                 rounded-xl
//                 border
//                 border-[#DCE3F5]
//                 bg-[#FBFCFF]
//                 text-sm
//                 outline-none
//                 focus:border-[#3D6EFF]
//                 focus:ring-4
//                 focus:ring-[#3D6EFF]/10
//               "
//             />
//           </div>
//         </div>
//
//         {/* Constraints */}
//         <div className="mb-6">
//           <FieldLabel>
//             Constraints{" "}
//             <span className="font-normal text-[#94A3B8]">
//               (optional)
//             </span>
//           </FieldLabel>
//
//           <textarea
//             value={q.constraintsText}
//             onChange={(e) =>
//               updateQuestion(qIdx, {
//                 constraintsText:
//                   e.target.value,
//               })
//             }
//             placeholder={"1 <= n <= 10^5\n-10^9 <= nums[i] <= 10^9"}
//             className="
//               w-full
//               min-h-[75px]
//               resize-y
//               px-3
//               py-2.5
//               rounded-xl
//               border
//               border-[#DCE3F5]
//               bg-[#0F172A]
//               text-[#E2E8F0]
//               font-mono
//               text-xs
//               leading-relaxed
//               outline-none
//               focus:border-[#3D6EFF]
//               focus:ring-4
//               focus:ring-[#3D6EFF]/10
//             "
//           />
//         </div>
//
//         {/* Test cases */}
//         <div
//           className="
//             border-t
//             border-[#EEF2F8]
//             pt-6
//           "
//         >
//           <div className="flex items-start justify-between gap-4 mb-4">
//             <div>
//               <div className="flex items-center gap-2">
//                 <Terminal
//                   size={16}
//                   className="text-[#3D6EFF]"
//                 />
//
//                 <h3 className="font-display font-semibold text-sm text-[#0B1D42]">
//                   Test cases
//                 </h3>
//               </div>
//
//               <p className="text-xs text-[#64748B] mt-1">
//                 Visible cases are sample inputs. Hidden cases are used
//                 privately for automatic scoring.
//               </p>
//             </div>
//           </div>
//
//           {q.testCases.map(
//             (tc, tcIdx) => (
//               <TestCaseCard
//                 key={tcIdx}
//                 tc={tc}
//                 tcIdx={tcIdx}
//                 qIdx={qIdx}
//                 total={q.testCases.length}
//                 updateTestCase={
//                   updateTestCase
//                 }
//                 removeTestCase={
//                   removeTestCase
//                 }
//               />
//             )
//           )}
//
//           <div className="flex flex-wrap gap-2 mt-4">
//             <button
//               type="button"
//               onClick={() =>
//                 addTestCase(qIdx, false)
//               }
//               className="
//                 inline-flex
//                 items-center
//                 gap-2
//                 px-3.5
//                 py-2
//                 rounded-lg
//                 border
//                 border-[#C7D7F8]
//                 bg-white
//                 text-xs
//                 font-semibold
//                 text-[#2563EB]
//                 hover:bg-[#F5F8FF]
//                 transition-colors
//               "
//             >
//               <Plus size={14} />
//               Visible case
//             </button>
//
//             <button
//               type="button"
//               onClick={() =>
//                 addTestCase(qIdx, true)
//               }
//               className="
//                 inline-flex
//                 items-center
//                 gap-2
//                 px-3.5
//                 py-2
//                 rounded-lg
//                 border
//                 border-[#FECACA]
//                 bg-white
//                 text-xs
//                 font-semibold
//                 text-[#DC2626]
//                 hover:bg-[#FFF7F7]
//                 transition-colors
//               "
//             >
//               <Plus size={14} />
//               Hidden case
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
//
// // =============================================================================
// // PUBLISH RESULT
// // =============================================================================
//
// function PublishResult({
//   result,
//   onManage,
// }) {
//   if (!result) return null;
//
//   return (
//     <div
//       className="
//         mt-6
//         bg-white
//         rounded-2xl
//         border
//         border-[#BBF7D0]
//         overflow-hidden
//         shadow-sm
//       "
//     >
//       <div className="bg-[#F0FDF4] px-6 py-5">
//         <div className="flex items-center gap-3">
//           <div
//             className="
//               w-10 h-10
//               rounded-xl
//               bg-[#DCFCE7]
//               flex items-center justify-center
//             "
//           >
//             <CircleCheck
//               size={21}
//               className="text-[#16A34A]"
//             />
//           </div>
//
//           <div>
//             <p className="text-xs font-semibold text-[#16A34A] uppercase tracking-wide">
//               Assessment published
//             </p>
//
//             <h3 className="font-display font-semibold text-lg text-[#14532D] mt-0.5">
//               {result.title}
//             </h3>
//           </div>
//         </div>
//       </div>
//
//       <div className="p-6">
//         <div className="grid sm:grid-cols-3 gap-3">
//           <div className="rounded-xl bg-[#F8FAFC] p-4">
//             <p className="text-[11px] text-[#64748B]">
//               Questions
//             </p>
//
//             <p className="font-display font-semibold text-xl text-[#0B1D42] mt-1">
//               {result.totalQuestions}
//             </p>
//           </div>
//
//           <div className="rounded-xl bg-[#F8FAFC] p-4">
//             <p className="text-[11px] text-[#64748B]">
//               Duration
//             </p>
//
//             <p className="font-display font-semibold text-xl text-[#0B1D42] mt-1">
//               {result.durationMinutes}
//               <span className="text-xs font-medium text-[#64748B] ml-1">
//                 min
//               </span>
//             </p>
//           </div>
//
//           <div className="rounded-xl bg-[#F8FAFC] p-4">
//             <p className="text-[11px] text-[#64748B]">
//               Students assigned
//             </p>
//
//             <p className="font-display font-semibold text-xl text-[#0B1D42] mt-1">
//               {result.studentsAssigned}
//             </p>
//           </div>
//         </div>
//
//         <button
//           type="button"
//           onClick={onManage}
//           className="
//             mt-5
//             inline-flex
//             items-center
//             gap-2
//             px-4
//             py-2.5
//             rounded-xl
//             bg-[#0B1D42]
//             text-white
//             text-xs
//             font-semibold
//             hover:bg-[#132B59]
//             transition-colors
//           "
//         >
//           <Trophy size={14} />
//           Go to results & violation review
//           <ChevronRight size={14} />
//         </button>
//       </div>
//     </div>
//   );
// }
//
// // =============================================================================
// // MAIN COMPONENT
// // =============================================================================
//
// export default function PublishCodingTest() {
//   const navigate = useNavigate();
//   const location = useLocation();
//
//   const [title, setTitle] = useState("");
//   const [durationMinutes, setDurationMinutes] =
//     useState(60);
//
//   const [questions, setQuestions] = useState([
//     emptyQuestion(),
//   ]);
//
//   const [publishing, setPublishing] =
//     useState(false);
//
//   const [error, setError] = useState("");
//
//   const [result, setResult] = useState(null);
//
//   // ---------------------------------------------------------------------------
//   // Active sidebar item
//   // ---------------------------------------------------------------------------
//
//   const activeKey = useMemo(() => {
//     const current = NAV_ITEMS.find(
//       (item) =>
//         location.pathname === item.path ||
//         location.pathname.startsWith(
//           `${item.path}/`
//         )
//     );
//
//     return current?.key ?? "coding";
//   }, [location.pathname]);
//
//   // ---------------------------------------------------------------------------
//   // Question update
//   // ---------------------------------------------------------------------------
//
//   const updateQuestion = (qIdx, patch) => {
//     setQuestions((prev) =>
//       prev.map((q, i) =>
//         i === qIdx
//           ? {
//               ...q,
//               ...patch,
//             }
//           : q
//       )
//     );
//   };
//
//   // ---------------------------------------------------------------------------
//   // Test case update
//   // ---------------------------------------------------------------------------
//
//   const updateTestCase = (
//     qIdx,
//     tcIdx,
//     patch
//   ) => {
//     setQuestions((prev) =>
//       prev.map((q, i) =>
//         i !== qIdx
//           ? q
//           : {
//               ...q,
//               testCases:
//                 q.testCases.map(
//                   (tc, j) =>
//                     j === tcIdx
//                       ? {
//                           ...tc,
//                           ...patch,
//                         }
//                       : tc
//                 ),
//             }
//       )
//     );
//   };
//
//   // ---------------------------------------------------------------------------
//   // Add question
//   // ---------------------------------------------------------------------------
//
//   const addQuestion = () => {
//     setQuestions((prev) => [
//       ...prev,
//       emptyQuestion(),
//     ]);
//
//     setTimeout(() => {
//       window.scrollTo({
//         top: document.body.scrollHeight,
//         behavior: "smooth",
//       });
//     }, 50);
//   };
//
//   // ---------------------------------------------------------------------------
//   // Remove question
//   // ---------------------------------------------------------------------------
//
//   const removeQuestion = (qIdx) => {
//     setQuestions((prev) =>
//       prev.filter((_, i) => i !== qIdx)
//     );
//   };
//
//   // ---------------------------------------------------------------------------
//   // Add test case
//   // ---------------------------------------------------------------------------
//
//   const addTestCase = (qIdx, hidden) => {
//     setQuestions((prev) =>
//       prev.map((q, i) =>
//         i !== qIdx
//           ? q
//           : {
//               ...q,
//               testCases: [
//                 ...q.testCases,
//                 emptyTestCase(hidden),
//               ],
//             }
//       )
//     );
//   };
//
//   // ---------------------------------------------------------------------------
//   // Remove test case
//   // ---------------------------------------------------------------------------
//
//   const removeTestCase = (
//     qIdx,
//     tcIdx
//   ) => {
//     setQuestions((prev) =>
//       prev.map((q, i) =>
//         i !== qIdx
//           ? q
//           : {
//               ...q,
//               testCases:
//                 q.testCases.filter(
//                   (_, j) => j !== tcIdx
//                 ),
//             }
//       )
//     );
//   };
//
//   // ---------------------------------------------------------------------------
//   // Validation
//   // ---------------------------------------------------------------------------
//
//   const validateForm = () => {
//     if (!title.trim()) {
//       return "Please enter a title for the coding assessment.";
//     }
//
//     const duration =
//       Number(durationMinutes);
//
//     if (!duration || duration < 5) {
//       return "Assessment duration must be at least 5 minutes.";
//     }
//
//     if (!questions.length) {
//       return "Please add at least one coding question.";
//     }
//
//     for (
//       let i = 0;
//       i < questions.length;
//       i++
//     ) {
//       const q = questions[i];
//
//       if (!q.title.trim()) {
//         return `Please enter a title for Question ${
//           i + 1
//         }.`;
//       }
//
//       if (!q.description.trim()) {
//         return `Please enter a problem statement for Question ${
//           i + 1
//         }.`;
//       }
//
//       if (!q.testCases.length) {
//         return `Question ${
//           i + 1
//         } must have at least one test case.`;
//       }
//
//       const visibleCases =
//         q.testCases.filter(
//           (tc) => !tc.hidden
//         );
//
//       if (!visibleCases.length) {
//         return `Question ${
//           i + 1
//         } must have at least one visible sample test case.`;
//       }
//
//       for (
//         let j = 0;
//         j < q.testCases.length;
//         j++
//       ) {
//         const tc = q.testCases[j];
//
//         if (
//           !tc.input.trim() &&
//           !tc.expectedOutput.trim()
//         ) {
//           return `Test case ${
//             j + 1
//           } in Question ${
//             i + 1
//           } cannot be empty.`;
//         }
//       }
//     }
//
//     return "";
//   };
//
//   // ---------------------------------------------------------------------------
//   // Publish
//   // ---------------------------------------------------------------------------
//
//   const handlePublish = async () => {
//     setError("");
//     setResult(null);
//
//     const validationError =
//       validateForm();
//
//     if (validationError) {
//       setError(validationError);
//
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//
//       return;
//     }
//
//     setPublishing(true);
//
//     try {
//       const { data } =
//         await PlacementCodingApi.publishTest(
//           {
//             title:
//               title.trim() ||
//               undefined,
//
//             durationMinutes:
//               Number(durationMinutes) ||
//               60,
//
//             questions:
//               questions.map((q) => ({
//                 ...q,
//                 points:
//                   Number(q.points) ||
//                   100,
//               })),
//           }
//         );
//
//       setResult(data);
//
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     } catch (e) {
//       setError(
//         e?.response?.data?.message ||
//           "Could not publish the coding test. Please check every question has a title and at least one visible sample test case."
//       );
//
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     } finally {
//       setPublishing(false);
//     }
//   };
//
//   // =============================================================================
//   // RENDER
//   // =============================================================================
//
//   return (
//     <>
//       {/* Fonts */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
//
//         .font-display {
//           font-family: 'Space Grotesk', sans-serif;
//         }
//
//         .font-mono {
//           font-family: 'IBM Plex Mono', monospace;
//         }
//
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
//
//       <div
//         className="
//           min-h-screen
//           bg-[#F4F6FB]
//           text-[#111827]
//         "
//         style={{
//           fontFamily:
//             "'Inter', sans-serif",
//         }}
//       >
//         {/* Sidebar */}
//         <Sidebar
//           activeKey={activeKey}
//           onNavigate={navigate}
//         />
//
//         {/* Main */}
//         <main
//           className="
//             md:ml-64
//             min-h-screen
//             px-5
//             sm:px-7
//             lg:px-10
//             py-7
//           "
//         >
//           <div className="max-w-[1100px] mx-auto">
//             {/* Header */}
//             <PageHeader
//               onBack={() =>
//                 navigate(
//                   "/placement/dashboard"
//                 )
//               }
//             />
//
//             {/* Error */}
//             {error && (
//               <div
//                 className="
//                   mb-6
//                   rounded-xl
//                   border
//                   border-[#FECACA]
//                   bg-[#FFF7F7]
//                   px-4
//                   py-3.5
//                   flex
//                   items-start
//                   gap-3
//                 "
//               >
//                 <div className="shrink-0 mt-0.5">
//                   <AlertCircle
//                     size={17}
//                     className="text-[#DC2626]"
//                   />
//                 </div>
//
//                 <div>
//                   <p className="text-xs font-semibold text-[#991B1B]">
//                     Unable to publish assessment
//                   </p>
//
//                   <p className="text-xs text-[#B91C1C] mt-0.5 leading-relaxed">
//                     {error}
//                   </p>
//                 </div>
//
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setError("")
//                   }
//                   className="
//                     ml-auto
//                     text-xs
//                     text-[#991B1B]
//                     hover:underline
//                   "
//                 >
//                   Dismiss
//                 </button>
//               </div>
//             )}
//
//             {/* Assessment details */}
//             <TestSettings
//               title={title}
//               setTitle={setTitle}
//               durationMinutes={
//                 durationMinutes
//               }
//               setDurationMinutes={
//                 setDurationMinutes
//               }
//             />
//
//             {/* Questions */}
//             <div>
//               {questions.map(
//                 (q, qIdx) => (
//                   <QuestionCard
//                     key={qIdx}
//                     q={q}
//                     qIdx={qIdx}
//                     totalQuestions={
//                       questions.length
//                     }
//                     updateQuestion={
//                       updateQuestion
//                     }
//                     updateTestCase={
//                       updateTestCase
//                     }
//                     addTestCase={
//                       addTestCase
//                     }
//                     removeTestCase={
//                       removeTestCase
//                     }
//                     removeQuestion={
//                       removeQuestion
//                     }
//                   />
//                 )
//               )}
//             </div>
//
//             {/* Add question */}
//             <button
//               type="button"
//               onClick={addQuestion}
//               className="
//                 w-full
//                 py-4
//                 rounded-2xl
//                 border-2
//                 border-dashed
//                 border-[#C7D7F8]
//                 bg-white
//                 text-[#2563EB]
//                 hover:border-[#3D6EFF]
//                 hover:bg-[#F7F9FF]
//                 transition-all
//                 flex
//                 items-center
//                 justify-center
//                 gap-2
//                 text-sm
//                 font-semibold
//               "
//             >
//               <Plus size={17} />
//               Add another coding question
//             </button>
//
//             {/* Bottom publish area */}
//             <div
//               className="
//                 mt-6
//                 bg-[#0B1D42]
//                 rounded-2xl
//                 p-5
//                 sm:p-6
//                 flex
//                 flex-col
//                 sm:flex-row
//                 items-start
//                 sm:items-center
//                 justify-between
//                 gap-5
//               "
//             >
//               <div>
//                 <div className="flex items-center gap-2 text-white mb-1">
//                   <Rocket size={17} />
//                   <h2 className="font-display font-semibold text-sm">
//                     Ready to publish?
//                   </h2>
//                 </div>
//
//                 <p className="text-xs text-white/50 max-w-xl leading-relaxed">
//                   Publishing will make this coding assessment
//                   available to all assigned students. Hidden
//                   test cases remain private and are used only for
//                   automatic evaluation.
//                 </p>
//               </div>
//
//               <button
//                 type="button"
//                 onClick={handlePublish}
//                 disabled={publishing}
//                 className="
//                   shrink-0
//                   inline-flex
//                   items-center
//                   justify-center
//                   gap-2
//                   min-w-[220px]
//                   px-5
//                   py-3
//                   rounded-xl
//                   bg-[#3D6EFF]
//                   text-white
//                   text-sm
//                   font-semibold
//                   shadow-lg
//                   shadow-blue-950/20
//                   hover:bg-[#315FEA]
//                   disabled:opacity-60
//                   disabled:cursor-not-allowed
//                   transition-all
//                 "
//               >
//                 {publishing ? (
//                   <>
//                     <span
//                       className="
//                         w-4 h-4
//                         rounded-full
//                         border-2
//                         border-white/30
//                         border-t-white
//                         animate-spin
//                       "
//                     />
//
//                     Publishing...
//                   </>
//                 ) : (
//                   <>
//                     <Rocket size={16} />
//                     Publish Coding Test
//                   </>
//                 )}
//               </button>
//             </div>
//
//             {/* Published result */}
//             <PublishResult
//               result={result}
//               onManage={() =>
//                 navigate(
//                   "/placement/coding-tests/manage"
//                 )
//               }
//             />
//
//             {/* Footer note */}
//             <div className="flex items-center justify-center gap-2 py-7">
//               <CircleCheck
//                 size={13}
//                 className="text-[#94A3B8]"
//               />
//
//               <p className="text-[11px] text-[#94A3B8]">
//                 Students will code in the browser using the
//                 supported programming languages.
//               </p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }


import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlacementCodingApi } from "../../api/codingApi";
import "../../styles/aptitude.css";
import "../../styles/coding.css";

import {
  LayoutGrid,
  ClipboardList,
  Code2,
  ShieldAlert,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Clock3,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  FileCode2,
  CircleCheck,
  AlertCircle,
  ArrowLeft,
  Rocket,
  BookOpen,
  Terminal,
  Trophy,
} from "lucide-react";

// =============================================================================
// NAVIGATION
// =============================================================================

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    path: "/placement-dashboard",
  },
  {
    key: "aptitude",
    label: "Aptitude tests",
    icon: ClipboardList,
    path: "/placement/aptitude-tests/publish",
  },
  {
    key: "coding",
    label: "Coding tests",
    icon: Code2,
    path: "/placement/coding-tests/publish",
  },
  {
    key: "violations",
    label: "Violations & results",
    icon: ShieldAlert,
    path: "/placement/coding-tests/manage",
  },
  {
    key: "stats",
    label: "Tests",
    icon: BarChart3,
    path: "/placement/stats",
  },
  {
    key: "reports",
    label: "Reports",
    icon: BarChart3,
    path: "/placement/reports",
  },
];

// =============================================================================
// HELPERS
// =============================================================================

function emptyTestCase(hidden = false) {
  return {
    input: "",
    expectedOutput: "",
    hidden,
  };
}

function emptyQuestion() {
  return {
    title: "",
    description: "",
    difficulty: "MEDIUM",
    points: 100,
    constraintsText: "",
    testCases: [
      emptyTestCase(false),
      emptyTestCase(true),
    ],
  };
}

// =============================================================================
// SIDEBAR
// =============================================================================

function Sidebar({ activeKey, onNavigate }) {
  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside
      className="
        hidden md:flex
        fixed
        left-0
        top-0
        bottom-0
        w-64
        flex-col
        bg-[#0B1D42]
        text-white
        px-5
        py-6
        z-50
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-1 mb-9">
        <div
          className="
            w-9 h-9
            rounded-xl
            bg-[#3D6EFF]
            flex
            items-center
            justify-center
            font-bold
            text-white
            shadow-lg
          "
        >
          P
        </div>

        <div>
          <div className="font-display font-semibold text-[15px]">
            Placement<span className="text-[#7DA2FF]">Cell</span>
          </div>

          <div className="text-[10px] text-white/35 uppercase tracking-wider mt-0.5">
            Placement Management
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map(
          ({ key, label, icon: Icon, path }) => {
            const isActive =
              activeKey === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() =>
                  onNavigate(path)
                }
                className={`
                  group
                  w-full
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-xl
                  text-sm
                  text-left
                  transition-all
                  ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                  }
                `}
              >
                <Icon
                  size={17}
                  className={
                    isActive
                      ? "text-[#7DA2FF]"
                      : "text-white/35 group-hover:text-white/70"
                  }
                />

                <span className="font-medium flex-1">
                  {label}
                </span>

                {isActive && (
                  <ChevronRight
                    size={14}
                    className="text-white/40"
                  />
                )}
              </button>
            );
          }
        )}
      </nav>

      {/* Sidebar information */}
      <div className="rounded-xl bg-white/[0.06] border border-white/[0.05] p-4">
        <div className="flex items-center gap-2 text-[#7DA2FF] mb-1.5">
          <BarChart3 size={15} />

          <span className="font-semibold text-sm">
            Placement workspace
          </span>
        </div>

        <p className="text-xs text-white/45 leading-relaxed">
          Create and manage aptitude and coding assessments.
        </p>
      </div>

      {/* Bottom */}
      <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-1">
        <button
          type="button"
          className="
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-lg
            text-sm
            text-white/45
            hover:text-white
            hover:bg-white/[0.05]
          "
        >
          <Settings size={16} />
          <span>Settings</span>
        </button>

        <button
          type="button"
          onClick={handleSignOut}
          className="
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-lg
            text-sm
            text-white/45
            hover:text-white
            hover:bg-white/[0.05]
          "
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

// =============================================================================
// PAGE HEADER
// =============================================================================

function PageHeader({ onBack }) {
  return (
    <div className="mb-7">
      <button
        type="button"
        onClick={onBack}
        className="
          inline-flex
          items-center
          gap-2
          text-xs
          font-medium
          text-[#64748B]
          hover:text-[#1D4ED8]
          mb-4
        "
      >
        <ArrowLeft size={14} />
        Back to dashboard
      </button>

      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-[#E8EEFF]
                flex
                items-center
                justify-center
              "
            >
              <FileCode2
                size={20}
                className="text-[#3D6EFF]"
              />
            </div>

            <h1
              className="
                font-display
                text-[28px]
                font-semibold
                tracking-tight
                text-[#0B1D42]
              "
            >
              Create Coding Assessment
            </h1>
          </div>

          <p className="text-sm text-[#64748B] max-w-2xl leading-relaxed">
            Build a coding assessment with multiple programming
            problems, sample test cases, hidden test cases,
            difficulty levels and automatic evaluation.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-[#DCE3F5] rounded-xl px-3 py-2">
            <Terminal
              size={15}
              className="text-[#3D6EFF]"
            />

            <span className="text-xs font-medium text-[#475569]">
              Python · Java · C · C++ · JavaScript
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// ASSESSMENT DETAILS
// =============================================================================

function TestSettings({
  title,
  setTitle,
  durationMinutes,
  setDurationMinutes,
}) {
  return (
    <section className="bg-white rounded-2xl border border-[#DCE3F5] shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-5 border-b border-[#EEF2F8]">
        <div className="flex items-center gap-2">
          <BookOpen
            size={17}
            className="text-[#3D6EFF]"
          />

          <h2 className="font-display font-semibold text-base text-[#0B1D42]">
            Assessment details
          </h2>
        </div>

        <p className="text-xs text-[#64748B] mt-1">
          Configure the basic information for your coding assessment.
        </p>
      </div>

      <div className="p-6 grid md:grid-cols-[2fr_1fr] gap-5">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-2">
            Test title
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="e.g. Round 1 - Coding Assessment"
            className="
              w-full
              h-11
              px-3.5
              rounded-xl
              border
              border-[#DCE3F5]
              bg-[#FBFCFF]
              text-sm
              outline-none
              focus:border-[#3D6EFF]
              focus:ring-4
              focus:ring-[#3D6EFF]/10
            "
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-2">
            Duration
          </label>

          <div className="relative">
            <Clock3
              size={15}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-[#94A3B8]
              "
            />

            <input
              type="number"
              min={5}
              value={durationMinutes}
              onChange={(e) =>
                setDurationMinutes(
                  e.target.value
                )
              }
              className="
                w-full
                h-11
                pl-10
                pr-16
                rounded-xl
                border
                border-[#DCE3F5]
                bg-[#FBFCFF]
                text-sm
                outline-none
                focus:border-[#3D6EFF]
                focus:ring-4
                focus:ring-[#3D6EFF]/10
              "
            />

            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">
              minutes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// FIELD LABEL
// =============================================================================

function FieldLabel({ children }) {
  return (
    <label className="block text-xs font-semibold text-[#334155] mb-2">
      {children}
    </label>
  );
}

// =============================================================================
// TEST CASE
// =============================================================================

function TestCaseCard({
  tc,
  tcIdx,
  qIdx,
  total,
  updateTestCase,
  removeTestCase,
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#FCFDFF] p-4 mb-3">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`
              w-7 h-7
              rounded-lg
              flex
              items-center
              justify-center
              ${
                tc.hidden
                  ? "bg-[#FFF1F2] text-[#E11D48]"
                  : "bg-[#EEF4FF] text-[#2563EB]"
              }
            `}
          >
            {tc.hidden ? (
              <EyeOff size={14} />
            ) : (
              <Eye size={14} />
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-[#334155]">
              Test case {tcIdx + 1}
            </p>

            <p className="text-[10px] text-[#94A3B8]">
              {tc.hidden
                ? "Used for automatic evaluation"
                : "Visible sample for students"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={tc.hidden}
              onChange={(e) =>
                updateTestCase(
                  qIdx,
                  tcIdx,
                  {
                    hidden:
                      e.target.checked,
                  }
                )
              }
              className="accent-[#3D6EFF]"
            />

            <span className="text-xs text-[#475569]">
              Hidden
            </span>
          </label>

          {total > 1 && (
            <button
              type="button"
              onClick={() =>
                removeTestCase(
                  qIdx,
                  tcIdx
                )
              }
              className="
                w-7
                h-7
                rounded-lg
                flex
                items-center
                justify-center
                text-[#94A3B8]
                hover:text-[#DC2626]
                hover:bg-[#FFF1F2]
              "
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>
            Input{" "}
            <span className="font-normal text-[#94A3B8]">
              (stdin)
            </span>
          </FieldLabel>

          <textarea
            value={tc.input}
            onChange={(e) =>
              updateTestCase(
                qIdx,
                tcIdx,
                {
                  input: e.target.value,
                }
              )
            }
            placeholder="Enter input..."
            className="
              w-full
              min-h-[100px]
              resize-y
              px-3
              py-2.5
              rounded-xl
              border
              border-[#DCE3F5]
              bg-[#0F172A]
              text-[#E2E8F0]
              font-mono
              text-xs
              outline-none
              focus:border-[#3D6EFF]
              focus:ring-4
              focus:ring-[#3D6EFF]/10
            "
          />
        </div>

        <div>
          <FieldLabel>
            Expected output{" "}
            <span className="font-normal text-[#94A3B8]">
              (stdout)
            </span>
          </FieldLabel>

          <textarea
            value={tc.expectedOutput}
            onChange={(e) =>
              updateTestCase(
                qIdx,
                tcIdx,
                {
                  expectedOutput:
                    e.target.value,
                }
              )
            }
            placeholder="Enter expected output..."
            className="
              w-full
              min-h-[100px]
              resize-y
              px-3
              py-2.5
              rounded-xl
              border
              border-[#DCE3F5]
              bg-[#0F172A]
              text-[#E2E8F0]
              font-mono
              text-xs
              outline-none
              focus:border-[#3D6EFF]
              focus:ring-4
              focus:ring-[#3D6EFF]/10
            "
          />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// QUESTION CARD
// =============================================================================

function QuestionCard({
  q,
  qIdx,
  totalQuestions,
  updateQuestion,
  updateTestCase,
  addTestCase,
  removeTestCase,
  removeQuestion,
}) {
  const visibleCases = q.testCases.filter(
    (tc) => !tc.hidden
  ).length;

  const hiddenCases = q.testCases.filter(
    (tc) => tc.hidden
  ).length;

  return (
    <section className="bg-white rounded-2xl border border-[#DCE3F5] shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-[#EEF2F8] bg-[#FBFCFF] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0B1D42] text-white flex items-center justify-center font-display font-semibold text-sm">
            {qIdx + 1}
          </div>

          <div>
            <h2 className="font-display font-semibold text-sm text-[#0B1D42]">
              Coding problem
            </h2>

            <div className="flex items-center gap-3 mt-1">
              <span className="text-[11px] text-[#64748B]">
                {visibleCases} visible
              </span>

              <span className="text-[#CBD5E1]">
                •
              </span>

              <span className="text-[11px] text-[#64748B]">
                {hiddenCases} hidden
              </span>
            </div>
          </div>
        </div>

        {totalQuestions > 1 && (
          <button
            type="button"
            onClick={() =>
              removeQuestion(qIdx)
            }
            className="
              flex
              items-center
              gap-1.5
              px-3
              py-2
              rounded-lg
              text-xs
              font-medium
              text-[#DC2626]
              border
              border-[#FECACA]
              hover:bg-[#FFF1F2]
            "
          >
            <Trash2 size={13} />
            Remove question
          </button>
        )}
      </div>

      <div className="p-6">
        {/* Problem title */}
        <div className="mb-5">
          <FieldLabel>
            Problem title
          </FieldLabel>

          <input
            value={q.title}
            onChange={(e) =>
              updateQuestion(qIdx, {
                title: e.target.value,
              })
            }
            placeholder="e.g. Two Sum"
            className="
              w-full
              h-11
              px-3.5
              rounded-xl
              border
              border-[#DCE3F5]
              bg-[#FBFCFF]
              text-sm
              outline-none
              focus:border-[#3D6EFF]
              focus:ring-4
              focus:ring-[#3D6EFF]/10
            "
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <FieldLabel>
            Problem statement
          </FieldLabel>

          <textarea
            value={q.description}
            onChange={(e) =>
              updateQuestion(qIdx, {
                description:
                  e.target.value,
              })
            }
            placeholder="Describe the problem, input format, output format and what the student needs to solve..."
            className="
              w-full
              min-h-[140px]
              resize-y
              px-3.5
              py-3
              rounded-xl
              border
              border-[#DCE3F5]
              bg-[#FBFCFF]
              text-sm
              leading-relaxed
              outline-none
              focus:border-[#3D6EFF]
              focus:ring-4
              focus:ring-[#3D6EFF]/10
            "
          />
        </div>

        {/* Difficulty and points */}
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <FieldLabel>
              Difficulty
            </FieldLabel>

            <select
              value={q.difficulty}
              onChange={(e) =>
                updateQuestion(qIdx, {
                  difficulty:
                    e.target.value,
                })
              }
              className="
                w-full
                h-11
                px-3
                rounded-xl
                border
                border-[#DCE3F5]
                bg-[#FBFCFF]
                text-sm
                outline-none
                focus:border-[#3D6EFF]
                focus:ring-4
                focus:ring-[#3D6EFF]/10
              "
            >
              <option value="EASY">
                Easy
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="HARD">
                Hard
              </option>
            </select>
          </div>

          <div>
            <FieldLabel>
              Points
            </FieldLabel>

            <input
              type="number"
              min="1"
              value={q.points}
              onChange={(e) =>
                updateQuestion(qIdx, {
                  points: e.target.value,
                })
              }
              className="
                w-full
                h-11
                px-3
                rounded-xl
                border
                border-[#DCE3F5]
                bg-[#FBFCFF]
                text-sm
                outline-none
                focus:border-[#3D6EFF]
                focus:ring-4
                focus:ring-[#3D6EFF]/10
              "
            />
          </div>
        </div>

        {/* Constraints */}
        <div className="mb-6">
          <FieldLabel>
            Constraints{" "}
            <span className="font-normal text-[#94A3B8]">
              (optional)
            </span>
          </FieldLabel>

          <textarea
            value={q.constraintsText}
            onChange={(e) =>
              updateQuestion(qIdx, {
                constraintsText:
                  e.target.value,
              })
            }
            placeholder={
              "1 <= n <= 10^5\n-10^9 <= nums[i] <= 10^9"
            }
            className="
              w-full
              min-h-[75px]
              resize-y
              px-3
              py-2.5
              rounded-xl
              border
              border-[#DCE3F5]
              bg-[#0F172A]
              text-[#E2E8F0]
              font-mono
              text-xs
              outline-none
              focus:border-[#3D6EFF]
              focus:ring-4
              focus:ring-[#3D6EFF]/10
            "
          />
        </div>

        {/* Test cases */}
        <div className="border-t border-[#EEF2F8] pt-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Terminal
                  size={16}
                  className="text-[#3D6EFF]"
                />

                <h3 className="font-display font-semibold text-sm text-[#0B1D42]">
                  Test cases
                </h3>
              </div>

              <p className="text-xs text-[#64748B] mt-1">
                Visible cases are sample inputs. Hidden cases
                are used privately for automatic scoring.
              </p>
            </div>
          </div>

          {q.testCases.map(
            (tc, tcIdx) => (
              <TestCaseCard
                key={tcIdx}
                tc={tc}
                tcIdx={tcIdx}
                qIdx={qIdx}
                total={q.testCases.length}
                updateTestCase={
                  updateTestCase
                }
                removeTestCase={
                  removeTestCase
                }
              />
            )
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              onClick={() =>
                addTestCase(
                  qIdx,
                  false
                )
              }
              className="
                inline-flex
                items-center
                gap-2
                px-3.5
                py-2
                rounded-lg
                border
                border-[#C7D7F8]
                bg-white
                text-xs
                font-semibold
                text-[#2563EB]
                hover:bg-[#F5F8FF]
              "
            >
              <Plus size={14} />
              Visible case
            </button>

            <button
              type="button"
              onClick={() =>
                addTestCase(
                  qIdx,
                  true
                )
              }
              className="
                inline-flex
                items-center
                gap-2
                px-3.5
                py-2
                rounded-lg
                border
                border-[#FECACA]
                bg-white
                text-xs
                font-semibold
                text-[#DC2626]
                hover:bg-[#FFF7F7]
              "
            >
              <Plus size={14} />
              Hidden case
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// PUBLISH RESULT
// =============================================================================

function PublishResult({
  result,
  onManage,
}) {
  if (!result) return null;

  return (
    <div className="mt-6 bg-white rounded-2xl border border-[#BBF7D0] overflow-hidden shadow-sm">
      <div className="bg-[#F0FDF4] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] flex items-center justify-center">
            <CircleCheck
              size={21}
              className="text-[#16A34A]"
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#16A34A] uppercase tracking-wide">
              Assessment published
            </p>

            <h3 className="font-display font-semibold text-lg text-[#14532D] mt-0.5">
              {result.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-[#F8FAFC] p-4">
            <p className="text-[11px] text-[#64748B]">
              Questions
            </p>

            <p className="font-display font-semibold text-xl text-[#0B1D42] mt-1">
              {result.totalQuestions}
            </p>
          </div>

          <div className="rounded-xl bg-[#F8FAFC] p-4">
            <p className="text-[11px] text-[#64748B]">
              Duration
            </p>

            <p className="font-display font-semibold text-xl text-[#0B1D42] mt-1">
              {result.durationMinutes}
              <span className="text-xs font-medium text-[#64748B] ml-1">
                min
              </span>
            </p>
          </div>

          <div className="rounded-xl bg-[#F8FAFC] p-4">
            <p className="text-[11px] text-[#64748B]">
              Students assigned
            </p>

            <p className="font-display font-semibold text-xl text-[#0B1D42] mt-1">
              {result.studentsAssigned}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onManage}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-[#0B1D42]
            text-white
            text-xs
            font-semibold
            hover:bg-[#132B59]
          "
        >
          <Trophy size={14} />
          Go to results & violation review
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function PublishCodingTest() {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] =
    useState(60);

  const [questions, setQuestions] = useState([
    emptyQuestion(),
  ]);

  const [publishing, setPublishing] =
    useState(false);

  const [error, setError] = useState("");

  const [result, setResult] = useState(null);

  // ---------------------------------------------------------------------------
  // Active navigation
  // ---------------------------------------------------------------------------

  const activeKey = useMemo(() => {
    const current = NAV_ITEMS.find(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(
          `${item.path}/`
        )
    );

    return current?.key || "coding";
  }, [location.pathname]);

  // ---------------------------------------------------------------------------
  // Question update
  // ---------------------------------------------------------------------------

  const updateQuestion = (
    qIdx,
    patch
  ) => {
    setQuestions((prev) =>
      prev.map((q, index) =>
        index === qIdx
          ? {
              ...q,
              ...patch,
            }
          : q
      )
    );
  };

  // ---------------------------------------------------------------------------
  // Test case update
  // ---------------------------------------------------------------------------

  const updateTestCase = (
    qIdx,
    tcIdx,
    patch
  ) => {
    setQuestions((prev) =>
      prev.map((q, index) =>
        index !== qIdx
          ? q
          : {
              ...q,
              testCases:
                q.testCases.map(
                  (tc, index2) =>
                    index2 === tcIdx
                      ? {
                          ...tc,
                          ...patch,
                        }
                      : tc
                ),
            }
      )
    );
  };

  // ---------------------------------------------------------------------------
  // Add question
  // ---------------------------------------------------------------------------

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      emptyQuestion(),
    ]);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  // ---------------------------------------------------------------------------
  // Remove question
  // ---------------------------------------------------------------------------

  const removeQuestion = (
    qIdx
  ) => {
    setQuestions((prev) =>
      prev.filter(
        (_, index) => index !== qIdx
      )
    );
  };

  // ---------------------------------------------------------------------------
  // Add test case
  // ---------------------------------------------------------------------------

  const addTestCase = (
    qIdx,
    hidden
  ) => {
    setQuestions((prev) =>
      prev.map((q, index) =>
        index !== qIdx
          ? q
          : {
              ...q,
              testCases: [
                ...q.testCases,
                emptyTestCase(hidden),
              ],
            }
      )
    );
  };

  // ---------------------------------------------------------------------------
  // Remove test case
  // ---------------------------------------------------------------------------

  const removeTestCase = (
    qIdx,
    tcIdx
  ) => {
    setQuestions((prev) =>
      prev.map((q, index) =>
        index !== qIdx
          ? q
          : {
              ...q,
              testCases:
                q.testCases.filter(
                  (_, index2) =>
                    index2 !== tcIdx
                ),
            }
      )
    );
  };

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------

  const validateForm = () => {
    if (!title.trim()) {
      return "Please enter a title for the coding assessment.";
    }

    const duration =
      Number(durationMinutes);

    if (!duration || duration < 5) {
      return "Assessment duration must be at least 5 minutes.";
    }

    if (!questions.length) {
      return "Please add at least one coding question.";
    }

    for (
      let i = 0;
      i < questions.length;
      i++
    ) {
      const question =
        questions[i];

      if (!question.title.trim()) {
        return `Please enter a title for Question ${
          i + 1
        }.`;
      }

      if (!question.description.trim()) {
        return `Please enter a problem statement for Question ${
          i + 1
        }.`;
      }

      if (!question.testCases.length) {
        return `Question ${
          i + 1
        } must have at least one test case.`;
      }

      const visibleCases =
        question.testCases.filter(
          (tc) => !tc.hidden
        );

      if (!visibleCases.length) {
        return `Question ${
          i + 1
        } must have at least one visible sample test case.`;
      }

      for (
        let j = 0;
        j < question.testCases.length;
        j++
      ) {
        const testCase =
          question.testCases[j];

        if (
          !testCase.input.trim() &&
          !testCase.expectedOutput.trim()
        ) {
          return `Test case ${
            j + 1
          } in Question ${
            i + 1
          } cannot be empty.`;
        }
      }
    }

    return "";
  };

  // ---------------------------------------------------------------------------
  // Publish
  // ---------------------------------------------------------------------------

  const handlePublish = async () => {
    setError("");
    setResult(null);

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setPublishing(true);

    try {
      const { data } =
        await PlacementCodingApi.publishTest(
          {
            title:
              title.trim() ||
              undefined,

            durationMinutes:
              Number(durationMinutes) ||
              60,

            questions:
              questions.map((q) => ({
                ...q,
                points:
                  Number(q.points) ||
                  100,
              })),
          }
        );

      setResult(data);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          "Could not publish the coding test. Please check every question has a title and at least one visible sample test case."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setPublishing(false);
    }
  };

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }

        .font-mono {
          font-family: 'IBM Plex Mono', monospace;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      <div
        className="min-h-screen bg-[#F4F6FB] text-[#111827]"
        style={{
          fontFamily:
            "'Inter', sans-serif",
        }}
      >
        {/* ============================================================
            SIDEBAR
        ============================================================ */}

        <Sidebar
          activeKey={activeKey}
          onNavigate={navigate}
        />

        {/* ============================================================
            MAIN CONTENT
        ============================================================ */}

        <main
          className="
            min-h-screen
            md:ml-64
            px-4
            sm:px-6
            lg:px-8
            py-6
            md:py-8
          "
        >
          <div className="w-full max-w-[1180px] mx-auto">
            {/* Header */}
            <PageHeader
              onBack={() =>
                navigate(
                  "/placement-dashboard"
                )
              }
            />

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-[#FECACA] bg-[#FFF7F7] px-4 py-3.5 flex items-start gap-3">
                <AlertCircle
                  size={17}
                  className="text-[#DC2626] mt-0.5 shrink-0"
                />

                <div>
                  <p className="text-xs font-semibold text-[#991B1B]">
                    Unable to publish assessment
                  </p>

                  <p className="text-xs text-[#B91C1C] mt-0.5 leading-relaxed">
                    {error}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setError("")
                  }
                  className="ml-auto text-xs text-[#991B1B] hover:underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Assessment details */}
            <TestSettings
              title={title}
              setTitle={setTitle}
              durationMinutes={
                durationMinutes
              }
              setDurationMinutes={
                setDurationMinutes
              }
            />

            {/* Questions */}
            {questions.map(
              (question, qIdx) => (
                <QuestionCard
                  key={qIdx}
                  q={question}
                  qIdx={qIdx}
                  totalQuestions={
                    questions.length
                  }
                  updateQuestion={
                    updateQuestion
                  }
                  updateTestCase={
                    updateTestCase
                  }
                  addTestCase={
                    addTestCase
                  }
                  removeTestCase={
                    removeTestCase
                  }
                  removeQuestion={
                    removeQuestion
                  }
                />
              )
            )}

            {/* Add question */}
            <button
              type="button"
              onClick={addQuestion}
              className="
                w-full
                py-4
                rounded-2xl
                border-2
                border-dashed
                border-[#C7D7F8]
                bg-white
                text-[#2563EB]
                hover:border-[#3D6EFF]
                hover:bg-[#F7F9FF]
                transition-all
                flex
                items-center
                justify-center
                gap-2
                text-sm
                font-semibold
              "
            >
              <Plus size={17} />
              Add another coding question
            </button>

            {/* Publish */}
            <div className="mt-6 bg-[#0B1D42] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 text-white mb-1">
                  <Rocket size={17} />

                  <h2 className="font-display font-semibold text-sm">
                    Ready to publish?
                  </h2>
                </div>

                <p className="text-xs text-white/50 max-w-xl leading-relaxed">
                  Publishing will make this coding assessment
                  available to the assigned students. Hidden
                  test cases remain private.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePublish}
                disabled={publishing}
                className="
                  shrink-0
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  min-w-[220px]
                  px-5
                  py-3
                  rounded-xl
                  bg-[#3D6EFF]
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-[#315FEA]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  transition-all
                "
              >
                {publishing ? (
                  <>
                    <span
                      className="
                        w-4
                        h-4
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                        animate-spin
                      "
                    />

                    Publishing...
                  </>
                ) : (
                  <>
                    <Rocket size={16} />
                    Publish Coding Test
                  </>
                )}
              </button>
            </div>

            {/* Published result */}
            <PublishResult
              result={result}
              onManage={() =>
                navigate(
                  "/placement/coding-tests/manage"
                )
              }
            />

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 py-7">
              <CircleCheck
                size={13}
                className="text-[#94A3B8]"
              />

              <p className="text-[11px] text-[#94A3B8]">
                Students will code in the browser using the
                supported programming languages.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}