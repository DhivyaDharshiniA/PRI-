// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// //
// // const StudentDashboard = () => {
// // const navigate = useNavigate();
// //
// // return (
// //
// // <div className="min-h-screen bg-gray-100 p-8">
// //
// //
// // <h1 className="text-3xl font-bold text-gray-800">
// // Student Dashboard
// // </h1>
// //
// //
// // <p className="text-gray-600 mt-2">
// // Track your Placement Readiness Index and improve your skills.
// // </p>
// //
// //
// //
// // <div className="grid md:grid-cols-4 gap-6 mt-8">
// //
// //
// // <div className="bg-white rounded-xl shadow p-6">
// //
// // <h3 className="text-gray-500">
// // PRI Score
// // </h3>
// //
// // <h2 className="text-3xl font-bold text-blue-600">
// // 78%
// // </h2>
// //
// // <p>
// // Current readiness
// // </p>
// //
// // </div>
// //
// //
// //
// //
// // <div className="bg-white rounded-xl shadow p-6">
// //
// // <h3 className="text-gray-500">
// // Assessments
// // </h3>
// //
// // <h2 className="text-3xl font-bold">
// // 12
// // </h2>
// //
// // <p>
// // Completed tests
// // </p>
// //
// // </div>
// //
// //
// //
// //
// // <div className="bg-white rounded-xl shadow p-6">
// //
// // <h3 className="text-gray-500">
// // Skills
// // </h3>
// //
// // <h2 className="text-3xl font-bold">
// // 6
// // </h2>
// //
// // <p>
// // Evaluated skills
// // </p>
// //
// // </div>
// //
// //
// //
// //
// // <div className="bg-white rounded-xl shadow p-6">
// //
// // <h3 className="text-gray-500">
// // Companies
// // </h3>
// //
// // <h2 className="text-3xl font-bold">
// // 25
// // </h2>
// //
// // <p>
// // Recommended
// // </p>
// //
// // </div>
// //
// //
// //
// // </div>
// //
// //
// //
// // <div className="mt-10 bg-white rounded-xl shadow p-6">
// //
// //
// // <h2 className="text-xl font-bold mb-5">
// // Student Actions
// // </h2>
// //
// //
// //
// // <div className="flex flex-wrap gap-4">
// //
// //
// // <button
// //   className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
// //   onClick={() => navigate("/student/aptitude-tests")}
// // >
// //   View Assessment
// // </button>
// //
// //
// //
// // <button
// //   className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
// //   onClick={() => navigate("/student/coding-tests")}
// // >
// //   Coding Tests
// // </button>
// //
// //
// //
// // <button className="bg-gray-800 text-white px-5 py-3 rounded-lg">
// //
// // View PRI Report
// //
// // </button>
// //
// //
// //
// // <button className="bg-green-600 text-white px-5 py-3 rounded-lg">
// //
// // Track Improvement
// //
// // </button>
// //
// //
// //
// // <button className="bg-purple-600 text-white px-5 py-3 rounded-lg">
// //
// // Company Roadmap
// //
// // </button>
// //
// //
// //
// // </div>
// //
// //
// // </div>
// //
// //
// // </div>
// //
// //
// // );
// //
// //
// // };
// //
// //
// // export default StudentDashboard;
// //
// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import {
// //   LayoutGrid,
// //   ClipboardList,
// //   Code2,
// //   Sparkles,
// //   Building2,
// //   Map,
// //   Search,
// //   Bell,
// //   ChevronRight,
// //   Flame,
// //   ArrowUpRight,
// //   Settings,
// //   LogOut,
// // } from "lucide-react";
// //
// // // ---------------------------------------------------------------------------
// // // Static data — swap for real API data. Kept at the top so the component body
// // // stays readable.
// // // ---------------------------------------------------------------------------
// //
// // const NAV_ITEMS = [
// //   { key: "dashboard", label: "Dashboard", icon: LayoutGrid, path: "/student/dashboard" },
// //   { key: "aptitude", label: "Assessments", icon: ClipboardList, path: "/student/aptitude-tests" },
// //   { key: "coding", label: "Coding tests", icon: Code2, path: "/student/coding-tests" },
// //   { key: "skills", label: "Skills", icon: Sparkles, path: "/student/skills" },
// //   { key: "companies", label: "Companies", icon: Building2, path: "/student/companies" },
// //   { key: "roadmap", label: "Roadmap", icon: Map, path: "/student/roadmap" },
// // ];
// //
// // const SUB_SCORES = [
// //   { label: "Aptitude", value: 82, color: "#3D63DD" },
// //   { label: "Coding", value: 71, color: "#E0A230" },
// //   { label: "Communication", value: 80, color: "#1F9D6E" },
// // ];
// //
// // const STATS = [
// //   { label: "Assessments completed", value: "12", note: "+2 this week" },
// //   { label: "Skills evaluated", value: "6", note: "2 need retest" },
// //   { label: "Companies matched", value: "25", note: "4 new this week" },
// // ];
// //
// // const ACTIONS = [
// //   { key: "aptitude", label: "View assessment", desc: "Resume your aptitude test", icon: ClipboardList, path: "/student/aptitude-tests" },
// //   { key: "coding", label: "Coding tests", desc: "3 problems pending", icon: Code2, path: "/student/coding-tests" },
// //   { key: "report", label: "View PRI report", desc: "Full breakdown & history", icon: LayoutGrid, path: "/student/pri-report" },
// //   { key: "improve", label: "Track improvement", desc: "See your growth curve", icon: ArrowUpRight, path: "/student/improvement" },
// //   { key: "roadmap", label: "Company roadmap", desc: "Your path to top picks", icon: Map, path: "/student/roadmap" },
// // ];
// //
// // const ROADMAP_STEPS = [
// //   { step: 1, title: "Aptitude foundation", status: "done" },
// //   { step: 2, title: "Core coding rounds", status: "active" },
// //   { step: 3, title: "System design basics", status: "upcoming" },
// //   { step: 4, title: "Mock interviews", status: "upcoming" },
// // ];
// //
// // // ---------------------------------------------------------------------------
// //
// // const StudentDashboard = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [dial, setDial] = useState(0);
// //   const PRI = 78;
// //
// //   // Active nav item is derived from the real route, so the sidebar stays in
// //   // sync even if the user lands here via a link, back button, or refresh.
// //   const active =
// //     NAV_ITEMS.find((item) => location.pathname.startsWith(item.path))?.key ??
// //     "dashboard";
// //
// //   useEffect(() => {
// //     const t = setTimeout(() => setDial(PRI), 150);
// //     return () => clearTimeout(t);
// //   }, []);
// //
// //   // Semi-circle gauge geometry
// //   const R = 84;
// //   const CX = 100;
// //   const CY = 100;
// //   const CIRC = Math.PI * R; // half circumference
// //   const offset = CIRC - (dial / 100) * CIRC;
// //
// //   return (
// //     <div
// //       style={{ fontFamily: "'Inter', sans-serif" }}
// //       className="min-h-screen flex bg-[#F5F6F8] text-[#1F2430]"
// //     >
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
// //         .font-display { font-family: 'Space Grotesk', sans-serif; }
// //         .font-mono { font-family: 'IBM Plex Mono', monospace; }
// //       `}</style>
// //
// //       {/* ---------------------------------------------------------------- */}
// //       {/* Sidebar                                                          */}
// //       {/* ---------------------------------------------------------------- */}
// //       <aside className="hidden md:flex flex-col w-64 shrink-0 bg-[#14192B] text-white px-5 py-6">
// //         <div className="flex items-center gap-2.5 px-1 mb-9">
// //           <div className="w-8 h-8 rounded-lg bg-[#1d4ed8] flex items-center justify-center font-display font-bold text-[#14192B] text-sm">
// //             P
// //           </div>
// //           <span className="font-display font-semibold text-[15px] tracking-tight">
// //             Placement<span className="text-[#E0A230]">Path</span>
// //           </span>
// //         </div>
// //
// //         <nav className="flex-1 flex flex-col gap-1">
// //           {NAV_ITEMS.map(({ key, label, icon: Icon, path }) => {
// //             const isActive = active === key;
// //             return (
// //               <button
// //                 key={key}
// //                 onClick={() => navigate(path)}
// //                 className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
// //                   isActive
// //                     ? "bg-white/10 text-white"
// //                     : "text-white/55 hover:text-white/90 hover:bg-white/5"
// //                 }`}
// //               >
// //                 <Icon
// //                   size={17}
// //                   strokeWidth={2}
// //                   className={isActive ? "text-[#E0A230]" : "text-white/40 group-hover:text-white/70"}
// //                 />
// //                 <span className="font-medium">{label}</span>
// //                 {isActive && <ChevronRight size={14} className="ml-auto text-white/40" />}
// //               </button>
// //             );
// //           })}
// //         </nav>
// //
// //         <div className="mt-6 rounded-xl bg-white/[0.06] p-4">
// //           <div className="flex items-center gap-2 text-[#E0A230] mb-1">
// //             <Flame size={15} />
// //             <span className="font-display font-semibold text-sm">7-day streak</span>
// //           </div>
// //           <p className="text-xs text-white/50 leading-relaxed">
// //             Keep testing daily to hold your PRI steady.
// //           </p>
// //         </div>
// //
// //         <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-1">
// //           <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/85 hover:bg-white/5 transition-colors">
// //             <Settings size={16} />
// //             <span>Settings</span>
// //           </button>
// //           <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/85 hover:bg-white/5 transition-colors">
// //             <LogOut size={16} />
// //             <span>Sign out</span>
// //           </button>
// //         </div>
// //       </aside>
// //
// //       {/* ---------------------------------------------------------------- */}
// //       {/* Main content                                                     */}
// //       {/* ---------------------------------------------------------------- */}
// //       <main className="flex-1 min-w-0 px-6 md:px-10 py-8">
// //         {/* Topbar */}
// //         <div className="flex items-center justify-between gap-4 mb-8">
// //           <div>
// //             <h1 className="font-display text-[26px] font-semibold tracking-tight text-[#14192B]">
// //               Good afternoon, Aditi
// //             </h1>
// //             <p className="text-sm text-[#6B7280] mt-1">
// //               You're 4 points from your best PRI score this term.
// //             </p>
// //           </div>
// //           <div className="hidden sm:flex items-center gap-3">
// //             <div className="flex items-center gap-2 bg-white border border-[#E4E6EB] rounded-lg px-3 py-2 w-56">
// //               <Search size={15} className="text-[#9CA3AF]" />
// //               <input
// //                 placeholder="Search companies, skills..."
// //                 className="bg-transparent text-sm outline-none w-full placeholder:text-[#9CA3AF]"
// //               />
// //             </div>
// //             <button className="relative w-9 h-9 rounded-lg bg-white border border-[#E4E6EB] flex items-center justify-center">
// //               <Bell size={16} className="text-[#4B5563]" />
// //               <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#E0A230]" />
// //             </button>
// //             <div className="w-9 h-9 rounded-full bg-[#3D63DD] text-white flex items-center justify-center font-display text-sm font-semibold">
// //               A
// //             </div>
// //           </div>
// //         </div>
// //
// //         {/* Hero: PRI gauge + sub-scores */}
// //         <div className="grid lg:grid-cols-[340px_1fr] gap-5 mb-6">
// //           <div className="bg-[#14192B] rounded-2xl p-6 flex flex-col items-center text-white">
// //             <div className="w-full flex items-center justify-between mb-1">
// //               <span className="font-display text-sm font-medium text-white/70">
// //                 Placement Readiness Index
// //               </span>
// //             </div>
// //             <svg viewBox="0 0 200 115" className="w-full max-w-[220px] mt-3">
// //               <path
// //                 d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
// //                 fill="none"
// //                 stroke="rgba(255,255,255,0.1)"
// //                 strokeWidth="14"
// //                 strokeLinecap="round"
// //               />
// //               <path
// //                 d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
// //                 fill="none"
// //                 stroke="#E0A230"
// //                 strokeWidth="14"
// //                 strokeLinecap="round"
// //                 strokeDasharray={CIRC}
// //                 strokeDashoffset={offset}
// //                 style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" }}
// //               />
// //               <text x="100" y="92" textAnchor="middle" className="font-display" fill="#fff" fontSize="34" fontWeight="700">
// //                 {dial}%
// //               </text>
// //               <text x="100" y="108" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11">
// //                 Current readiness
// //               </text>
// //             </svg>
// //
// //             <div className="w-full mt-4 flex flex-col gap-3">
// //               {SUB_SCORES.map((s) => (
// //                 <div key={s.label}>
// //                   <div className="flex justify-between text-xs mb-1">
// //                     <span className="text-white/60">{s.label}</span>
// //                     <span className="font-mono text-white/80">{s.value}</span>
// //                   </div>
// //                   <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
// //                     <div
// //                       className="h-full rounded-full"
// //                       style={{ width: `${s.value}%`, backgroundColor: s.color }}
// //                     />
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //
// //           {/* Stats + roadmap preview */}
// //           <div className="flex flex-col gap-5">
// //             <div className="grid sm:grid-cols-3 gap-4">
// //               {STATS.map((s) => (
// //                 <div key={s.label} className="bg-white rounded-2xl border border-[#E4E6EB] p-5">
// //                   <p className="text-xs text-[#6B7280] mb-2">{s.label}</p>
// //                   <p className="font-display text-3xl font-semibold text-[#14192B]">{s.value}</p>
// //                   <p className="text-xs text-[#1F9D6E] mt-1.5">{s.note}</p>
// //                 </div>
// //               ))}
// //             </div>
// //
// //             <div className="bg-white rounded-2xl border border-[#E4E6EB] p-5 flex-1">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="font-display font-semibold text-sm text-[#14192B]">
// //                   Your placement roadmap
// //                 </h3>
// //                 <button
// //                   onClick={() => navigate("/student/roadmap")}
// //                   className="text-xs text-[#3D63DD] font-medium flex items-center gap-1 hover:underline"
// //                 >
// //                   View full roadmap <ChevronRight size={13} />
// //                 </button>
// //               </div>
// //               <div className="flex items-center">
// //                 {ROADMAP_STEPS.map((r, i) => (
// //                   <React.Fragment key={r.step}>
// //                     <div className="flex flex-col items-center flex-1 text-center">
// //                       <div
// //                         className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-semibold mb-2 ${
// //                           r.status === "done"
// //                             ? "bg-[#1F9D6E] text-white"
// //                             : r.status === "active"
// //                             ? "bg-[#E0A230] text-[#14192B]"
// //                             : "bg-[#F1F2F5] text-[#9CA3AF]"
// //                         }`}
// //                       >
// //                         {r.step}
// //                       </div>
// //                       <span
// //                         className={`text-xs leading-tight ${
// //                           r.status === "upcoming" ? "text-[#9CA3AF]" : "text-[#1F2430] font-medium"
// //                         }`}
// //                       >
// //                         {r.title}
// //                       </span>
// //                     </div>
// //                     {i < ROADMAP_STEPS.length - 1 && (
// //                       <div
// //                         className={`h-px flex-1 -mt-6 ${
// //                           r.status === "done" ? "bg-[#1F9D6E]" : "bg-[#E4E6EB]"
// //                         }`}
// //                       />
// //                     )}
// //                   </React.Fragment>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //
// //         {/* Quick actions */}
// //         <div className="bg-white rounded-2xl border border-[#E4E6EB] p-6">
// //           <h2 className="font-display font-semibold text-base text-[#14192B] mb-5">
// //             Student actions
// //           </h2>
// //           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {ACTIONS.map(({ key, label, desc, icon: Icon, path }) => (
// //               <button
// //                 key={key}
// //                 onClick={() => navigate(path)}
// //                 className="group flex items-start gap-3 p-4 rounded-xl border border-[#E4E6EB] hover:border-[#3D63DD] hover:bg-[#F7F9FF] transition-colors text-left"
// //               >
// //                 <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] flex items-center justify-center shrink-0 group-hover:bg-[#3D63DD] transition-colors">
// //                   <Icon size={16} className="text-[#3D63DD] group-hover:text-white transition-colors" />
// //                 </div>
// //                 <div className="min-w-0">
// //                   <p className="text-sm font-semibold text-[#14192B]">{label}</p>
// //                   <p className="text-xs text-[#6B7280] mt-0.5">{desc}</p>
// //                 </div>
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };
// //
// // export default StudentDashboard;
//
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   LayoutGrid,
//   ClipboardList,
//   Code2,
//   Sparkles,
//   Building2,
//   Map,
//   Search,
//   Bell,
//   ChevronRight,
//   Flame,
//   ArrowUpRight,
//   Settings,
//   LogOut,
// } from "lucide-react";
//
// // ---------------------------------------------------------------------------
// // Navigation
// // ---------------------------------------------------------------------------
//
// const NAV_ITEMS = [
//   {
//     key: "dashboard",
//     label: "Dashboard",
//     icon: LayoutGrid,
//     path: "/student/dashboard",
//   },
//   {
//     key: "aptitude",
//     label: "Assessments",
//     icon: ClipboardList,
//     path: "/student/aptitude-tests",
//   },
//   {
//     key: "coding",
//     label: "Coding Tests",
//     icon: Code2,
//     path: "/student/coding-tests",
//   },
//   {
//     key: "skills",
//     label: "Skills",
//     icon: Sparkles,
//     path: "/student/skills",
//   },
// //   {
// //     key: "companies",
// //     label: "Companies",
// //     icon: Building2,
// //     path: "/student/companies",
// //   },
//   {
//     key: "roadmap",
//     label: "Roadmap",
//     icon: Map,
//     path: "/student/roadmap",
//   },
// ];
//
// // ---------------------------------------------------------------------------
// // PRI Sub Scores
// // ---------------------------------------------------------------------------
//
// const SUB_SCORES = [
//   {
//     label: "Aptitude",
//     value: 82,
//   },
//   {
//     label: "Coding",
//     value: 71,
//   },
//   {
//     label: "Communication",
//     value: 80,
//   },
// ];
//
// // ---------------------------------------------------------------------------
// // Dashboard Statistics
// // ---------------------------------------------------------------------------
//
// const STATS = [
//   {
//     label: "Assessments completed",
//     value: "12",
//     note: "+2 this week",
//   },
//   {
//     label: "Skills evaluated",
//     value: "6",
//     note: "2 need retest",
//   },
//   {
//     label: "Companies matched",
//     value: "25",
//     note: "4 new this week",
//   },
// ];
//
// // ---------------------------------------------------------------------------
// // Student Actions
// // ---------------------------------------------------------------------------
//
// const ACTIONS = [
//   {
//     key: "aptitude",
//     label: "View Assessment",
//     desc: "Resume your aptitude test",
//     icon: ClipboardList,
//     path: "/student/aptitude-tests",
//   },
//   {
//     key: "coding",
//     label: "Coding Tests",
//     desc: "3 problems pending",
//     icon: Code2,
//     path: "/student/coding-tests",
//   },
//   {
//     key: "report",
//     label: "View PRI Report",
//     desc: "Full breakdown & history",
//     icon: LayoutGrid,
//     path: "/student/pri-report",
//   },
//   {
//     key: "improve",
//     label: "Track Improvement",
//     desc: "See your growth curve",
//     icon: ArrowUpRight,
//     path: "/student/improvement",
//   },
//   {
//     key: "roadmap",
//     label: "Company Roadmap",
//     desc: "Your path to top picks",
//     icon: Map,
//     path: "/student/roadmap",
//   },
// ];
//
// // ---------------------------------------------------------------------------
// // Roadmap
// // ---------------------------------------------------------------------------
//
// const ROADMAP_STEPS = [
//   {
//     step: 1,
//     title: "Aptitude foundation",
//     status: "done",
//   },
//   {
//     step: 2,
//     title: "Core coding rounds",
//     status: "active",
//   },
//   {
//     step: 3,
//     title: "System design basics",
//     status: "upcoming",
//   },
//   {
//     step: 4,
//     title: "Mock interviews",
//     status: "upcoming",
//   },
// ];
//
// // ---------------------------------------------------------------------------
// // Student Dashboard
// // ---------------------------------------------------------------------------
//
// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//
//   const [dial, setDial] = useState(0);
//
//   const PRI = 78;
//
//   // -------------------------------------------------------------------------
//   // Determine active sidebar item
//   // -------------------------------------------------------------------------
//
//   const active =
//     NAV_ITEMS.find((item) =>
//       location.pathname.startsWith(item.path)
//     )?.key ?? "dashboard";
//
//   // -------------------------------------------------------------------------
//   // PRI Animation
//   // -------------------------------------------------------------------------
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDial(PRI);
//     }, 150);
//
//     return () => clearTimeout(timer);
//   }, []);
//
//   // -------------------------------------------------------------------------
//   // Logout
//   // -------------------------------------------------------------------------
//
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("username");
//     localStorage.removeItem("studentId");
//     localStorage.removeItem("user");
//
//     navigate("/login", {
//       replace: true,
//     });
//   };
//
//   // -------------------------------------------------------------------------
//   // Gauge calculations
//   // -------------------------------------------------------------------------
//
//   const R = 84;
//   const CX = 100;
//   const CY = 100;
//
//   const CIRC = Math.PI * R;
//
//   const offset =
//     CIRC - (dial / 100) * CIRC;
//
//   // -------------------------------------------------------------------------
//   // UI
//   // -------------------------------------------------------------------------
//
//   return (
//     <div className="student-dashboard">
//
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
//
//         * {
//           box-sizing: border-box;
//         }
//
//         .student-dashboard {
//           --navy: #0e1a2b;
//           --navy-raised: #16273d;
//           --blue: #1d4ed8;
//           --blue-hover: #1740b8;
//           --blue-soft: #eef4ff;
//           --blue-light: #6b8de3;
//
//           --ink: #101828;
//           --muted: #667085;
//           --border: #e4e7ec;
//           --bg: #f8fafc;
//
//           min-height: 100vh;
//           width: 100%;
//           display: flex;
//
//           background: var(--bg);
//           color: var(--ink);
//
//           font-family: 'Inter', sans-serif;
//         }
//
//         /* ================================================================
//            SIDEBAR
//         ================================================================ */
//
//         .dashboard-sidebar {
//           width: 260px;
//           min-width: 260px;
//
//           height: 100vh;
//
//           position: sticky;
//           top: 0;
//
//           background: var(--navy);
//
//           color: white;
//
//           display: flex;
//           flex-direction: column;
//
//           padding: 24px 20px;
//
//           overflow-y: auto;
//
//           flex-shrink: 0;
//         }
//
//         .dashboard-sidebar::-webkit-scrollbar {
//           width: 5px;
//         }
//
//         .dashboard-sidebar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//
//         .dashboard-sidebar::-webkit-scrollbar-thumb {
//           background: rgba(255,255,255,0.15);
//           border-radius: 10px;
//         }
//
//         /* ================================================================
//            LOGO
//         ================================================================ */
//
//         .dashboard-logo {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//
//           padding: 0 4px;
//
//           margin-bottom: 40px;
//         }
//
//         .dashboard-logo-mark {
//           width: 42px;
//           height: 42px;
//
//           border-radius: 9px;
//
//           background: var(--navy-raised);
//
//           border: 1px solid rgba(255,255,255,0.12);
//
//           display: flex;
//           align-items: center;
//           justify-content: center;
//
//           font-family: 'Source Serif 4', serif;
//
//           font-size: 16px;
//           font-weight: 600;
//
//           letter-spacing: 0.5px;
//         }
//
//         .dashboard-logo-name {
//           font-size: 15px;
//           font-weight: 600;
//
//           letter-spacing: -0.2px;
//         }
//
//         .dashboard-logo-name span {
//           color: var(--blue-light);
//         }
//
//         .dashboard-logo-subtitle {
//           margin-top: 3px;
//
//           font-size: 9px;
//
//           letter-spacing: 1.4px;
//
//           text-transform: uppercase;
//
//           color: rgba(255,255,255,0.38);
//         }
//
//         /* ================================================================
//            SIDEBAR NAV
//         ================================================================ */
//
//         .sidebar-navigation {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//
//           flex: 1;
//         }
//
//         .sidebar-nav-button {
//           width: 100%;
//
//           display: flex;
//           align-items: center;
//
//           gap: 12px;
//
//           padding: 11px 12px;
//
//           border: none;
//           border-radius: 8px;
//
//           background: transparent;
//
//           color: rgba(255,255,255,0.52);
//
//           cursor: pointer;
//
//           text-align: left;
//
//           font-family: 'Inter', sans-serif;
//           font-size: 13px;
//           font-weight: 500;
//
//           transition:
//             background 0.2s ease,
//             color 0.2s ease;
//         }
//
//         .sidebar-nav-button:hover {
//           background: rgba(255,255,255,0.06);
//           color: white;
//         }
//
//         .sidebar-nav-button.active {
//           background: var(--blue);
//           color: white;
//
//           box-shadow:
//             0 5px 14px rgba(29,78,216,0.25);
//         }
//
//         .sidebar-nav-button.active:hover {
//           background: var(--blue-hover);
//         }
//
//         .sidebar-nav-icon {
//           width: 18px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//
//         .sidebar-chevron {
//           margin-left: auto;
//           opacity: 0.65;
//         }
//
//         /* ================================================================
//            STREAK
//         ================================================================ */
//
//         .streak-card {
//           margin-top: 22px;
//
//           padding: 15px;
//
//           border-radius: 11px;
//
//           background: var(--navy-raised);
//
//           border: 1px solid rgba(255,255,255,0.08);
//         }
//
//         .streak-title {
//           display: flex;
//           align-items: center;
//           gap: 7px;
//
//           color: #8da7e5;
//
//           font-size: 13px;
//           font-weight: 600;
//         }
//
//         .streak-description {
//           margin: 6px 0 0;
//
//           color: rgba(255,255,255,0.43);
//
//           font-size: 11px;
//
//           line-height: 1.6;
//         }
//
//         /* ================================================================
//            SIDEBAR BOTTOM
//         ================================================================ */
//
//         .sidebar-bottom {
//           margin-top: 20px;
//
//           padding-top: 16px;
//
//           border-top: 1px solid rgba(255,255,255,0.09);
//
//           display: flex;
//           flex-direction: column;
//
//           gap: 3px;
//         }
//
//         /* ================================================================
//            MAIN
//         ================================================================ */
//
//         .dashboard-main {
//           flex: 1;
//
//           min-width: 0;
//
//           min-height: 100vh;
//
//           background: var(--bg);
//
//           overflow-x: hidden;
//         }
//
//         .dashboard-content {
//           width: 100%;
//
//           padding: 32px 40px 45px;
//         }
//
//         /* ================================================================
//            TOP BAR
//         ================================================================ */
//
//         .dashboard-topbar {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//
//           gap: 20px;
//
//           margin-bottom: 30px;
//         }
//
//         .dashboard-eyebrow {
//           margin-bottom: 6px;
//
//           color: #7d95c4;
//
//           font-size: 10px;
//           font-weight: 600;
//
//           letter-spacing: 1.8px;
//
//           text-transform: uppercase;
//         }
//
//         .dashboard-title {
//           margin: 0;
//
//           color: var(--navy);
//
//           font-family: 'Source Serif 4', serif;
//
//           font-size: 30px;
//           font-weight: 600;
//
//           letter-spacing: -0.5px;
//
//           line-height: 1.2;
//         }
//
//         .dashboard-subtitle {
//           margin: 7px 0 0;
//
//           color: var(--muted);
//
//           font-size: 13px;
//         }
//
//         .dashboard-top-actions {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }
//
//         /* ================================================================
//            SEARCH
//         ================================================================ */
//
//         .dashboard-search {
//           width: 230px;
//
//           height: 38px;
//
//           display: flex;
//           align-items: center;
//
//           gap: 8px;
//
//           padding: 0 11px;
//
//           background: white;
//
//           border: 1px solid var(--border);
//
//           border-radius: 7px;
//         }
//
//         .dashboard-search input {
//           width: 100%;
//
//           border: none;
//           outline: none;
//
//           background: transparent;
//
//           color: var(--ink);
//
//           font-family: 'Inter', sans-serif;
//           font-size: 12px;
//         }
//
//         .dashboard-search input::placeholder {
//           color: #98a2b3;
//         }
//
//         /* ================================================================
//            NOTIFICATION
//         ================================================================ */
//
//         .notification-button {
//           position: relative;
//
//           width: 38px;
//           height: 38px;
//
//           display: flex;
//           align-items: center;
//           justify-content: center;
//
//           border: 1px solid var(--border);
//
//           border-radius: 7px;
//
//           background: white;
//
//           cursor: pointer;
//         }
//
//         .notification-button:hover {
//           background: #f9fafb;
//         }
//
//         .notification-dot {
//           position: absolute;
//
//           top: 7px;
//           right: 7px;
//
//           width: 6px;
//           height: 6px;
//
//           border-radius: 50%;
//
//           background: var(--blue);
//         }
//
//         /* ================================================================
//            PROFILE
//         ================================================================ */
//
//         .profile-circle {
//           width: 38px;
//           height: 38px;
//
//           display: flex;
//           align-items: center;
//           justify-content: center;
//
//           border-radius: 50%;
//
//           background: var(--blue);
//
//           color: white;
//
//           font-size: 13px;
//           font-weight: 600;
//         }
//
//         /* ================================================================
//            HERO GRID
//         ================================================================ */
//
//         .dashboard-hero {
//           display: grid;
//
//           grid-template-columns: 330px minmax(0, 1fr);
//
//           gap: 18px;
//
//           margin-bottom: 18px;
//         }
//
//         /* ================================================================
//            PRI CARD
//         ================================================================ */
//
//         .pri-card {
//           padding: 23px;
//
//           border-radius: 15px;
//
//           background: var(--navy);
//
//           color: white;
//
//           box-shadow:
//             0 8px 25px rgba(14,26,43,0.08);
//         }
//
//         .pri-header {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }
//
//         .pri-title {
//           font-size: 13px;
//           font-weight: 600;
//
//           color: rgba(255,255,255,0.78);
//         }
//
//         .pri-label {
//           font-family: 'IBM Plex Mono', monospace;
//
//           font-size: 9px;
//
//           letter-spacing: 1px;
//
//           color: #7d95c4;
//         }
//
//         .pri-gauge {
//           display: block;
//
//           width: 100%;
//           max-width: 220px;
//
//           margin: 10px auto 0;
//         }
//
//         .score-list {
//           margin-top: 10px;
//
//           display: flex;
//           flex-direction: column;
//
//           gap: 13px;
//         }
//
//         .score-row-header {
//           display: flex;
//           justify-content: space-between;
//
//           margin-bottom: 5px;
//
//           font-size: 11px;
//         }
//
//         .score-name {
//           color: rgba(255,255,255,0.56);
//         }
//
//         .score-value {
//           font-family: 'IBM Plex Mono', monospace;
//
//           color: rgba(255,255,255,0.78);
//         }
//
//         .score-track {
//           width: 100%;
//
//           height: 5px;
//
//           border-radius: 99px;
//
//           background: rgba(255,255,255,0.1);
//
//           overflow: hidden;
//         }
//
//         .score-progress {
//           height: 100%;
//
//           border-radius: 99px;
//
//           background: #6b8de3;
//         }
//
//         /* ================================================================
//            RIGHT HERO
//         ================================================================ */
//
//         .hero-right {
//           display: flex;
//           flex-direction: column;
//
//           gap: 18px;
//         }
//
//         /* ================================================================
//            STATS
//         ================================================================ */
//
//         .stats-grid {
//           display: grid;
//
//           grid-template-columns: repeat(3, minmax(0, 1fr));
//
//           gap: 14px;
//         }
//
//         .dashboard-card {
//           background: white;
//
//           border: 1px solid var(--border);
//
//           border-radius: 15px;
//
//           transition:
//             border-color 0.2s ease,
//             box-shadow 0.2s ease;
//         }
//
//         .dashboard-card:hover {
//           border-color: #c7d7fe;
//
//           box-shadow:
//             0 6px 20px rgba(16,24,40,0.05);
//         }
//
//         .stat-card {
//           padding: 18px;
//         }
//
//         .stat-label {
//           color: var(--muted);
//
//           font-size: 11px;
//
//           line-height: 1.4;
//
//           margin-bottom: 7px;
//         }
//
//         .stat-value {
//           color: var(--navy);
//
//           font-family: 'Source Serif 4', serif;
//
//           font-size: 30px;
//           font-weight: 600;
//         }
//
//         .stat-note {
//           margin-top: 4px;
//
//           color: #1f9d6e;
//
//           font-size: 10px;
//         }
//
//         /* ================================================================
//            ROADMAP
//         ================================================================ */
//
//         .roadmap-card {
//           padding: 20px;
//         }
//
//         .card-header {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//
//           margin-bottom: 18px;
//         }
//
//         .card-title {
//           margin: 0;
//
//           color: var(--navy);
//
//           font-size: 14px;
//           font-weight: 600;
//         }
//
//         .view-link {
//           display: flex;
//           align-items: center;
//           gap: 3px;
//
//           padding: 0;
//
//           border: none;
//
//           background: transparent;
//
//           color: var(--blue);
//
//           font-family: 'Inter', sans-serif;
//
//           font-size: 11px;
//           font-weight: 600;
//
//           cursor: pointer;
//         }
//
//         .view-link:hover {
//           text-decoration: underline;
//         }
//
//         .roadmap-container {
//           display: flex;
//           align-items: flex-start;
//         }
//
//         .roadmap-item {
//           flex: 1;
//
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//
//           text-align: center;
//         }
//
//         .roadmap-number {
//           width: 30px;
//           height: 30px;
//
//           display: flex;
//           align-items: center;
//           justify-content: center;
//
//           margin-bottom: 7px;
//
//           border-radius: 50%;
//
//           font-family: 'IBM Plex Mono', monospace;
//
//           font-size: 10px;
//           font-weight: 600;
//         }
//
//         .roadmap-number.done {
//           background: #1f9d6e;
//           color: white;
//         }
//
//         .roadmap-number.active {
//           background: var(--blue);
//           color: white;
//         }
//
//         .roadmap-number.upcoming {
//           background: #f2f4f7;
//           color: #98a2b3;
//         }
//
//         .roadmap-title {
//           max-width: 100px;
//
//           color: var(--ink);
//
//           font-size: 10px;
//
//           line-height: 1.35;
//         }
//
//         .roadmap-title.upcoming {
//           color: #98a2b3;
//         }
//
//         .roadmap-line {
//           height: 1px;
//
//           flex: 1;
//
//           margin-top: 15px;
//
//           background: var(--border);
//         }
//
//         .roadmap-line.done {
//           background: #1f9d6e;
//         }
//
//         /* ================================================================
//            ACTIONS
//         ================================================================ */
//
//         .actions-card {
//           padding: 23px;
//         }
//
//         .actions-heading {
//           margin-bottom: 18px;
//         }
//
//         .actions-eyebrow {
//           color: #7d95c4;
//
//           font-size: 9px;
//
//           font-weight: 600;
//
//           letter-spacing: 1.5px;
//
//           text-transform: uppercase;
//
//           margin-bottom: 4px;
//         }
//
//         .actions-title {
//           margin: 0;
//
//           color: var(--navy);
//
//           font-family: 'Source Serif 4', serif;
//
//           font-size: 18px;
//           font-weight: 600;
//         }
//
//         .actions-grid {
//           display: grid;
//
//           grid-template-columns:
//             repeat(3, minmax(0, 1fr));
//
//           gap: 12px;
//         }
//
//         .action-button {
//           width: 100%;
//
//           display: flex;
//           align-items: flex-start;
//
//           gap: 12px;
//
//           padding: 14px;
//
//           border: 1px solid var(--border);
//
//           border-radius: 11px;
//
//           background: white;
//
//           text-align: left;
//
//           cursor: pointer;
//
//           transition:
//             border-color 0.2s ease,
//             background 0.2s ease,
//             transform 0.2s ease;
//         }
//
//         .action-button:hover {
//           border-color: var(--blue);
//
//           background: #f7f9ff;
//
//           transform: translateY(-1px);
//         }
//
//         .action-icon {
//           width: 36px;
//           height: 36px;
//
//           min-width: 36px;
//
//           display: flex;
//           align-items: center;
//           justify-content: center;
//
//           border-radius: 8px;
//
//           background: var(--blue-soft);
//
//           color: var(--blue);
//
//           transition:
//             background 0.2s ease,
//             color 0.2s ease;
//         }
//
//         .action-button:hover .action-icon {
//           background: var(--blue);
//
//           color: white;
//         }
//
//         .action-name {
//           color: var(--navy);
//
//           font-size: 12px;
//           font-weight: 600;
//         }
//
//         .action-description {
//           margin-top: 3px;
//
//           color: var(--muted);
//
//           font-size: 10px;
//
//           line-height: 1.4;
//         }
//
//         /* ================================================================
//            RESPONSIVE
//         ================================================================ */
//
//         @media (max-width: 1100px) {
//
//           .dashboard-content {
//             padding: 28px;
//           }
//
//           .dashboard-hero {
//             grid-template-columns: 290px minmax(0, 1fr);
//           }
//
//           .dashboard-search {
//             width: 190px;
//           }
//
//           .actions-grid {
//             grid-template-columns:
//               repeat(2, minmax(0, 1fr));
//           }
//
//         }
//
//         @media (max-width: 900px) {
//
//           .dashboard-sidebar {
//             width: 220px;
//             min-width: 220px;
//
//             padding: 20px 14px;
//           }
//
//           .dashboard-content {
//             padding: 24px 20px;
//           }
//
//           .dashboard-hero {
//             grid-template-columns: 1fr;
//           }
//
//           .stats-grid {
//             grid-template-columns:
//               repeat(3, minmax(0, 1fr));
//           }
//
//           .dashboard-top-actions {
//             display: none;
//           }
//
//         }
//
//         @media (max-width: 650px) {
//
//           .dashboard-sidebar {
//             width: 190px;
//             min-width: 190px;
//
//             padding: 18px 10px;
//           }
//
//           .dashboard-logo {
//             margin-bottom: 25px;
//           }
//
//           .dashboard-logo-name {
//             font-size: 13px;
//           }
//
//           .dashboard-logo-subtitle {
//             font-size: 7px;
//           }
//
//           .sidebar-nav-button {
//             padding: 10px 8px;
//
//             gap: 8px;
//
//             font-size: 11px;
//           }
//
//           .streak-card {
//             padding: 11px;
//           }
//
//           .streak-description {
//             font-size: 9px;
//           }
//
//           .dashboard-content {
//             padding: 20px 14px;
//           }
//
//           .dashboard-title {
//             font-size: 23px;
//           }
//
//           .stats-grid {
//             grid-template-columns: 1fr;
//           }
//
//           .actions-grid {
//             grid-template-columns: 1fr;
//           }
//
//           .roadmap-container {
//             overflow-x: auto;
//
//             min-width: 480px;
//           }
//
//           .roadmap-card {
//             overflow-x: auto;
//           }
//
//         }
//
//       `}</style>
//
//       {/* ===================================================================
//           PERMANENT SIDEBAR
//       =================================================================== */}
//
//       <aside className="dashboard-sidebar">
//
//         {/* Logo */}
//
//         <div className="dashboard-logo">
//
//           <div className="dashboard-logo-mark">
//             PP
//           </div>
//
//           <div>
//
//             <div className="dashboard-logo-name">
//               Placement<span>Path</span>
//             </div>
//
//             <div className="dashboard-logo-subtitle">
//               Student Portal
//             </div>
//
//           </div>
//
//         </div>
//
//         {/* Navigation */}
//
//         <nav className="sidebar-navigation">
//
//           {NAV_ITEMS.map(
//             ({
//               key,
//               label,
//               icon: Icon,
//               path,
//             }) => {
//
//               const isActive = active === key;
//
//               return (
//                 <button
//                   key={key}
//                   type="button"
//                   onClick={() => navigate(path)}
//                   className={`
//                     sidebar-nav-button
//                     ${isActive ? "active" : ""}
//                   `}
//                 >
//
//                   <span className="sidebar-nav-icon">
//
//                     <Icon
//                       size={17}
//                       strokeWidth={2}
//                     />
//
//                   </span>
//
//                   <span>
//                     {label}
//                   </span>
//
//                   {isActive && (
//                     <ChevronRight
//                       size={14}
//                       className="sidebar-chevron"
//                     />
//                   )}
//
//                 </button>
//               );
//             }
//           )}
//
//         </nav>
//
//         {/* Streak */}
//
//         <div className="streak-card">
//
//           <div className="streak-title">
//
//             <Flame size={15} />
//
//             <span>
//               7-day streak
//             </span>
//
//           </div>
//
//           <p className="streak-description">
//             Keep testing daily to improve your Placement Readiness Index.
//           </p>
//
//         </div>
//
//         {/* Settings + Logout */}
//
//         <div className="sidebar-bottom">
//
//           <button
//             type="button"
//             className="sidebar-nav-button"
//           >
//
//             <span className="sidebar-nav-icon">
//               <Settings size={16} />
//             </span>
//
//             <span>
//               Settings
//             </span>
//
//           </button>
//
//           <button
//             type="button"
//             onClick={handleLogout}
//             className="sidebar-nav-button"
//           >
//
//             <span className="sidebar-nav-icon">
//               <LogOut size={16} />
//             </span>
//
//             <span>
//               Sign out
//             </span>
//
//           </button>
//
//         </div>
//
//       </aside>
//
//       {/* ===================================================================
//           RIGHT SIDE
//       =================================================================== */}
//
//       <main className="dashboard-main">
//
//         <div className="dashboard-content">
//
//           {/* ================================================================
//               TOP BAR
//           ================================================================ */}
//
//           <div className="dashboard-topbar">
//
//             <div>
//
//               <div className="dashboard-eyebrow">
//                 Student Dashboard
//               </div>
//
//               <h1 className="dashboard-title">
//                 Good afternoon, Aditi
//               </h1>
//
//               <p className="dashboard-subtitle">
//                 You're 4 points from your best PRI score this term.
//               </p>
//
//             </div>
//
//             <div className="dashboard-top-actions">
//
//               {/* Search */}
//
//               <div className="dashboard-search">
//
//                 <Search
//                   size={15}
//                   color="#98A2B3"
//                 />
//
//                 <input
//                   type="text"
//                   placeholder="Search companies, skills..."
//                 />
//
//               </div>
//
//               {/* Notifications */}
//
//               <button
//                 type="button"
//                 className="notification-button"
//               >
//
//                 <Bell
//                   size={16}
//                   color="#475467"
//                 />
//
//                 <span className="notification-dot" />
//
//               </button>
//
//               {/* Profile */}
//
//               <div className="profile-circle">
//                 A
//               </div>
//
//             </div>
//
//           </div>
//
//           {/* ================================================================
//               HERO
//           ================================================================ */}
//
//           <div className="dashboard-hero">
//
//             {/* PRI */}
//
//             <div className="pri-card">
//
//               <div className="pri-header">
//
//                 <span className="pri-title">
//                   Placement Readiness Index
//                 </span>
//
//                 <span className="pri-label">
//                   PRI
//                 </span>
//
//               </div>
//
//               <svg
//                 viewBox="0 0 200 115"
//                 className="pri-gauge"
//               >
//
//                 {/* Background */}
//
//                 <path
//                   d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
//                   fill="none"
//                   stroke="rgba(255,255,255,0.10)"
//                   strokeWidth="14"
//                   strokeLinecap="round"
//                 />
//
//                 {/* Progress */}
//
//                 <path
//                   d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
//                   fill="none"
//                   stroke="#1D4ED8"
//                   strokeWidth="14"
//                   strokeLinecap="round"
//                   strokeDasharray={CIRC}
//                   strokeDashoffset={offset}
//                   style={{
//                     transition:
//                       "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)",
//                   }}
//                 />
//
//                 {/* Score */}
//
//                 <text
//                   x="100"
//                   y="92"
//                   textAnchor="middle"
//                   fill="#FFFFFF"
//                   fontSize="34"
//                   fontWeight="700"
//                   fontFamily="Inter"
//                 >
//                   {dial}%
//                 </text>
//
//                 <text
//                   x="100"
//                   y="108"
//                   textAnchor="middle"
//                   fill="rgba(255,255,255,0.5)"
//                   fontSize="11"
//                   fontFamily="Inter"
//                 >
//                   Current readiness
//                 </text>
//
//               </svg>
//
//               {/* Scores */}
//
//               <div className="score-list">
//
//                 {SUB_SCORES.map((score) => (
//
//                   <div key={score.label}>
//
//                     <div className="score-row-header">
//
//                       <span className="score-name">
//                         {score.label}
//                       </span>
//
//                       <span className="score-value">
//                         {score.value}
//                       </span>
//
//                     </div>
//
//                     <div className="score-track">
//
//                       <div
//                         className="score-progress"
//                         style={{
//                           width: `${score.value}%`,
//                         }}
//                       />
//
//                     </div>
//
//                   </div>
//
//                 ))}
//
//               </div>
//
//             </div>
//
//             {/* RIGHT HERO CONTENT */}
//
//             <div className="hero-right">
//
//               {/* Statistics */}
//
//               <div className="stats-grid">
//
//                 {STATS.map((stat) => (
//
//                   <div
//                     key={stat.label}
//                     className="dashboard-card stat-card"
//                   >
//
//                     <div className="stat-label">
//                       {stat.label}
//                     </div>
//
//                     <div className="stat-value">
//                       {stat.value}
//                     </div>
//
//                     <div className="stat-note">
//                       {stat.note}
//                     </div>
//
//                   </div>
//
//                 ))}
//
//               </div>
//
//               {/* Roadmap */}
//
//               <div className="dashboard-card roadmap-card">
//
//                 <div className="card-header">
//
//                   <h3 className="card-title">
//                     Your placement roadmap
//                   </h3>
//
//                   <button
//                     type="button"
//                     onClick={() =>
//                       navigate("/student/roadmap")
//                     }
//                     className="view-link"
//                   >
//
//                     View full roadmap
//
//                     <ChevronRight size={13} />
//
//                   </button>
//
//                 </div>
//
//                 <div className="roadmap-container">
//
//                   {ROADMAP_STEPS.map(
//                     (step, index) => (
//
//                       <React.Fragment
//                         key={step.step}
//                       >
//
//                         <div className="roadmap-item">
//
//                           <div
//                             className={`
//                               roadmap-number
//                               ${step.status}
//                             `}
//                           >
//                             {step.step}
//                           </div>
//
//                           <span
//                             className={`
//                               roadmap-title
//                               ${
//                                 step.status ===
//                                 "upcoming"
//                                   ? "upcoming"
//                                   : ""
//                               }
//                             `}
//                           >
//                             {step.title}
//                           </span>
//
//                         </div>
//
//                         {index <
//                           ROADMAP_STEPS.length -
//                             1 && (
//
//                           <div
//                             className={`
//                               roadmap-line
//                               ${
//                                 step.status ===
//                                 "done"
//                                   ? "done"
//                                   : ""
//                               }
//                             `}
//                           />
//
//                         )}
//
//                       </React.Fragment>
//
//                     )
//                   )}
//
//                 </div>
//
//               </div>
//
//             </div>
//
//           </div>
//
//           {/* ================================================================
//               STUDENT ACTIONS
//           ================================================================ */}
//
//           <div className="dashboard-card actions-card">
//
//             <div className="actions-heading">
//
//               <div className="actions-eyebrow">
//                 Placement preparation
//               </div>
//
//               <h2 className="actions-title">
//                 Student actions
//               </h2>
//
//             </div>
//
//             <div className="actions-grid">
//
//               {ACTIONS.map(
//                 ({
//                   key,
//                   label,
//                   desc,
//                   icon: Icon,
//                   path,
//                 }) => (
//
//                   <button
//                     key={key}
//                     type="button"
//                     onClick={() =>
//                       navigate(path)
//                     }
//                     className="action-button"
//                   >
//
//                     <div className="action-icon">
//
//                       <Icon size={17} />
//
//                     </div>
//
//                     <div>
//
//                       <div className="action-name">
//                         {label}
//                       </div>
//
//                       <div className="action-description">
//                         {desc}
//                       </div>
//
//                     </div>
//
//                   </button>
//
//                 )
//               )}
//
//             </div>
//
//           </div>
//
//         </div>
//
//       </main>
//
//     </div>
//   );
// };
//
// export default StudentDashboard;
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  Code2,
  Sparkles,
  Map,
  Search,
  Bell,
  ChevronRight,
  Flame,
  ArrowUpRight,
  Settings,
  LogOut,
  RefreshCw,
  Loader2,
  TrendingUp,
  Target,
  Award,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/* ============================================================
   API CONFIG
============================================================ */

const API_BASE_URL = "http://localhost:8080";

/* ============================================================
   NAVIGATION
============================================================ */

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    path: "/student/dashboard",
  },
  {
    key: "aptitude",
    label: "Assessments",
    icon: ClipboardList,
    path: "/student/aptitude-tests",
  },
  {
    key: "coding",
    label: "Coding Tests",
    icon: Code2,
    path: "/student/coding-tests",
  },
  {
    key: "skills",
    label: "Skills",
    icon: Sparkles,
    path: "/student/skills",
  },
  {
    key: "roadmap",
    label: "Roadmap",
    icon: Map,
    path: "/student/roadmap",
  },
];

/* ============================================================
   ROADMAP
============================================================ */

const ROADMAP_STEPS = [
  {
    step: 1,
    title: "Aptitude foundation",
    status: "done",
  },
  {
    step: 2,
    title: "Core coding rounds",
    status: "active",
  },
  {
    step: 3,
    title: "System design basics",
    status: "upcoming",
  },
  {
    step: 4,
    title: "Mock interviews",
    status: "upcoming",
  },
];

/* ============================================================
   HELPER FUNCTIONS
============================================================ */

/**
 * Get authentication token.
 */
const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Generic authenticated GET.
 */
async function apiGet(url) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error("AUTH_ERROR");
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Safely convert a value into number.
 */
function numberValue(value) {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    Number.isNaN(Number(value))
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

/**
 * Find first usable property from an object.
 */
function firstNumber(object, keys) {
  if (!object) return null;

  for (const key of keys) {
    const value = numberValue(object[key]);

    if (value !== null) {
      return value;
    }
  }

  return null;
}

/**
 * Extract percentage from a result.
 *
 * Supports common backend DTO formats such as:
 *
 * scorePercentage
 * percentage
 * percentageScore
 * scorePercent
 * obtainedPercentage
 *
 * OR calculates:
 *
 * score / totalScore * 100
 *
 * OR:
 *
 * correctAnswers / totalQuestions * 100
 */
function extractPercentage(result) {
  if (!result) return null;

  const directPercentage = firstNumber(result, [
    "scorePercentage",
    "percentage",
    "percentageScore",
    "scorePercent",
    "obtainedPercentage",
    "percent",
    "percentageMarks",
  ]);

  if (directPercentage !== null) {
    return Math.max(0, Math.min(100, directPercentage));
  }

  const score = firstNumber(result, [
    "score",
    "marks",
    "obtainedMarks",
    "totalScoreObtained",
    "obtainedScore",
    "points",
  ]);

  const totalScore = firstNumber(result, [
    "totalScore",
    "maxScore",
    "maximumScore",
    "totalMarks",
    "maxMarks",
  ]);

  if (
    score !== null &&
    totalScore !== null &&
    totalScore > 0
  ) {
    return Math.max(
      0,
      Math.min(100, (score / totalScore) * 100)
    );
  }

  const correct = firstNumber(result, [
    "correctAnswers",
    "correct",
    "correctCount",
    "passedQuestions",
  ]);

  const totalQuestions = firstNumber(result, [
    "totalQuestions",
    "questionCount",
    "total",
    "numberOfQuestions",
  ]);

  if (
    correct !== null &&
    totalQuestions !== null &&
    totalQuestions > 0
  ) {
    return Math.max(
      0,
      Math.min(100, (correct / totalQuestions) * 100)
    );
  }

  return null;
}

/**
 * Determine whether an assignment is completed.
 */
function isCompletedAssignment(assignment) {
  if (!assignment) return false;

  const status = String(
    assignment.status ||
      assignment.attemptStatus ||
      assignment.resultStatus ||
      ""
  ).toLowerCase();

  if (
    [
      "completed",
      "submitted",
      "finished",
      "evaluated",
      "passed",
      "failed",
    ].includes(status)
  ) {
    return true;
  }

  if (
    assignment.completed === true ||
    assignment.submitted === true ||
    assignment.completedAt ||
    assignment.submittedAt
  ) {
    return true;
  }

  return false;
}

/**
 * Get test ID from assignment.
 */
function getTestId(assignment) {
  return (
    assignment?.testId ??
    assignment?.id ??
    assignment?.assignmentId
  );
}

/**
 * Calculate average.
 *
 * Only evaluated categories are included.
 * This prevents an unavailable communication score from
 * artificially becoming 0.
 */
function calculatePRI(scores) {
  const available = scores.filter(
    (item) => typeof item.value === "number"
  );

  if (available.length === 0) {
    return 0;
  }

  const total = available.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return Math.round(total / available.length);
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ----------------------------------------------------------
     State
  ---------------------------------------------------------- */

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [aptitudeScore, setAptitudeScore] = useState(null);
  const [codingScore, setCodingScore] = useState(null);
  const [communicationScore, setCommunicationScore] =
    useState(null);

  const [aptitudeTestsCompleted, setAptitudeTestsCompleted] =
    useState(0);

  const [codingTestsCompleted, setCodingTestsCompleted] =
    useState(0);

  const [aptitudeTests, setAptitudeTests] = useState([]);
  const [codingTests, setCodingTests] = useState([]);

  const [dial, setDial] = useState(0);

  /* ----------------------------------------------------------
     User information
  ---------------------------------------------------------- */

  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const username =
    storedUser?.name ||
    storedUser?.username ||
    storedUser?.fullName ||
    localStorage.getItem("username") ||
    "Student";

  const firstName =
    username
      ?.split(" ")
      ?.filter(Boolean)?.[0] || "Student";

  const initials =
    username
      ?.split(" ")
      ?.filter(Boolean)
      ?.slice(0, 2)
      ?.map((word) => word.charAt(0).toUpperCase())
      ?.join("") || "S";

  /* ----------------------------------------------------------
     Active sidebar item
  ---------------------------------------------------------- */

  const active =
    NAV_ITEMS.find((item) =>
      location.pathname.startsWith(item.path)
    )?.key || "dashboard";

  /* ==========================================================
     LOAD PRI DATA
  ========================================================== */

  const loadPRIData = async () => {
    try {
      setError("");

      const [
        aptitudeAssignmentsResponse,
        codingAssignmentsResponse,
      ] = await Promise.all([
        apiGet("/api/student/aptitude-tests"),
        apiGet("/api/student/coding-tests"),
      ]);

      const aptitudeAssignments = Array.isArray(
        aptitudeAssignmentsResponse
      )
        ? aptitudeAssignmentsResponse
        : aptitudeAssignmentsResponse?.content || [];

      const codingAssignments = Array.isArray(
        codingAssignmentsResponse
      )
        ? codingAssignmentsResponse
        : codingAssignmentsResponse?.content || [];

      setAptitudeTests(aptitudeAssignments);
      setCodingTests(codingAssignments);

      /* --------------------------------------------------------
         Find completed aptitude tests
      -------------------------------------------------------- */

      const completedAptitude =
        aptitudeAssignments.filter(isCompletedAssignment);

      /*
       * If backend does not provide status,
       * we attempt result endpoints for assignments.
       */
      const aptitudeCandidates =
        completedAptitude.length > 0
          ? completedAptitude
          : aptitudeAssignments;

      let aptitudeResults = [];

      for (const assignment of aptitudeCandidates) {
        const testId = getTestId(assignment);

        if (!testId) continue;

        try {
          const result = await apiGet(
            `/api/student/aptitude-tests/${testId}/result`
          );

          const percentage = extractPercentage(result);

          if (percentage !== null) {
            aptitudeResults.push({
              testId,
              percentage,
              result,
            });
          }
        } catch {
          // Test may not have been attempted yet.
        }
      }

      /* --------------------------------------------------------
         Find completed coding tests
      -------------------------------------------------------- */

      const completedCoding =
        codingAssignments.filter(isCompletedAssignment);

      const codingCandidates =
        completedCoding.length > 0
          ? completedCoding
          : codingAssignments;

      let codingResults = [];

      for (const assignment of codingCandidates) {
        const testId = getTestId(assignment);

        if (!testId) continue;

        try {
          const result = await apiGet(
            `/api/student/coding-tests/${testId}/result`
          );

          const percentage = extractPercentage(result);

          if (percentage !== null) {
            codingResults.push({
              testId,
              percentage,
              result,
            });
          }
        } catch {
          // Test may not have been attempted yet.
        }
      }

      /* --------------------------------------------------------
         Calculate current scores
      -------------------------------------------------------- */

      const latestAptitude =
        aptitudeResults.length > 0
          ? aptitudeResults[aptitudeResults.length - 1]
              .percentage
          : null;

      const latestCoding =
        codingResults.length > 0
          ? codingResults[codingResults.length - 1]
              .percentage
          : null;

      setAptitudeScore(
        latestAptitude !== null
          ? Math.round(latestAptitude)
          : null
      );

      setCodingScore(
        latestCoding !== null
          ? Math.round(latestCoding)
          : null
      );

      setAptitudeTestsCompleted(
        aptitudeResults.length
      );

      setCodingTestsCompleted(
        codingResults.length
      );

      /*
       * Communication is NOT calculated here because the
       * controllers you provided do not expose a communication
       * result endpoint.
       *
       * It remains null until you create a communication
       * assessment/result API.
       */
      setCommunicationScore(null);

      setLoading(false);
    } catch (err) {
      console.error("PRI loading error:", err);

      if (err.message === "AUTH_ERROR") {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      setError(
        "Unable to load your assessment results."
      );

      setLoading(false);
    }
  };

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    loadPRIData();
  }, []);

  /* ==========================================================
     CALCULATE PRI
  ========================================================== */

  const subScores = useMemo(
    () => [
      {
        label: "Aptitude",
        value: aptitudeScore,
      },
      {
        label: "Coding",
        value: codingScore,
      },
      {
        label: "Communication",
        value: communicationScore,
      },
    ],
    [
      aptitudeScore,
      codingScore,
      communicationScore,
    ]
  );

  const PRI = useMemo(
    () => calculatePRI(subScores),
    [subScores]
  );

  /* ==========================================================
     ANIMATE GAUGE
  ========================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDial(PRI);
    }, 150);

    return () => clearTimeout(timer);
  }, [PRI]);

  /* ==========================================================
     REFRESH
  ========================================================== */

  const handleRefresh = async () => {
    setRefreshing(true);

    await loadPRIData();

    setRefreshing(false);
  };

  /* ==========================================================
     LOGOUT
  ========================================================== */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("studentId");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  /* ==========================================================
     PRI GAUGE
  ========================================================== */

  const R = 84;
  const CX = 100;
  const CY = 100;

  const CIRC = Math.PI * R;

  const offset =
    CIRC - (dial / 100) * CIRC;

  /* ==========================================================
     PRI STATUS
  ========================================================== */

  const priStatus =
    PRI >= 80
      ? "Excellent readiness"
      : PRI >= 70
      ? "Good readiness"
      : PRI >= 50
      ? "Needs improvement"
      : "Start building your readiness";

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="student-dashboard">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

        * {
          box-sizing: border-box;
        }

        .student-dashboard {
          --navy: #0e1a2b;
          --navy-raised: #16273d;
          --blue: #1d4ed8;
          --blue-hover: #1740b8;
          --blue-soft: #eef4ff;
          --blue-light: #6b8de3;

          --ink: #101828;
          --muted: #667085;
          --border: #e4e7ec;
          --bg: #f8fafc;

          min-height: 100vh;
          width: 100%;
          display: flex;

          background: var(--bg);
          color: var(--ink);

          font-family: 'Inter', sans-serif;
        }

        /* =====================================================
           SIDEBAR
        ===================================================== */

        .dashboard-sidebar {
          width: 260px;
          min-width: 260px;
          height: 100vh;

          position: sticky;
          top: 0;

          background: var(--navy);
          color: white;

          display: flex;
          flex-direction: column;

          padding: 24px 20px;

          overflow-y: auto;
          flex-shrink: 0;
        }

        .dashboard-sidebar::-webkit-scrollbar {
          width: 5px;
        }

        .dashboard-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }

        .dashboard-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 10px;
        }

        /* =====================================================
           LOGO
        ===================================================== */

        .dashboard-logo {
          display: flex;
          align-items: center;
          gap: 12px;

          padding: 0 4px;
          margin-bottom: 40px;
        }

        .dashboard-logo-mark {
          width: 42px;
          height: 42px;

          border-radius: 9px;

          background: var(--navy-raised);
          border: 1px solid rgba(255,255,255,0.12);

          display: flex;
          align-items: center;
          justify-content: center;

          font-family: 'Source Serif 4', serif;
          font-size: 16px;
          font-weight: 600;
        }

        .dashboard-logo-name {
          font-size: 15px;
          font-weight: 600;
        }

        .dashboard-logo-name span {
          color: var(--blue-light);
        }

        .dashboard-logo-subtitle {
          margin-top: 3px;
          font-size: 9px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
        }

        /* =====================================================
           NAVIGATION
        ===================================================== */

        .sidebar-navigation {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .sidebar-nav-button {
          width: 100%;

          display: flex;
          align-items: center;

          gap: 12px;
          padding: 11px 12px;

          border: none;
          border-radius: 8px;

          background: transparent;
          color: rgba(255,255,255,0.52);

          cursor: pointer;
          text-align: left;

          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;

          transition: all 0.2s ease;
        }

        .sidebar-nav-button:hover {
          background: rgba(255,255,255,0.06);
          color: white;
        }

        .sidebar-nav-button.active {
          background: var(--blue);
          color: white;

          box-shadow:
            0 5px 14px rgba(29,78,216,0.25);
        }

        .sidebar-nav-icon {
          width: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-chevron {
          margin-left: auto;
          opacity: 0.65;
        }

        /* =====================================================
           STREAK
        ===================================================== */

        .streak-card {
          margin-top: 22px;

          padding: 15px;
          border-radius: 11px;

          background: var(--navy-raised);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .streak-title {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #8da7e5;

          font-size: 13px;
          font-weight: 600;
        }

        .streak-description {
          margin: 6px 0 0;

          color: rgba(255,255,255,0.43);

          font-size: 11px;
          line-height: 1.6;
        }

        /* =====================================================
           SIDEBAR BOTTOM
        ===================================================== */

        .sidebar-bottom {
          margin-top: 20px;
          padding-top: 16px;

          border-top: 1px solid rgba(255,255,255,0.09);

          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        /* =====================================================
           MAIN
        ===================================================== */

        .dashboard-main {
          flex: 1;
          min-width: 0;
          min-height: 100vh;

          background: var(--bg);
          overflow-x: hidden;
        }

        .dashboard-content {
          width: 100%;
          padding: 32px 40px 45px;
        }

        /* =====================================================
           TOP BAR
        ===================================================== */

        .dashboard-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;
          margin-bottom: 30px;
        }

        .dashboard-eyebrow {
          margin-bottom: 6px;

          color: #7d95c4;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .dashboard-title {
          margin: 0;

          color: var(--navy);

          font-family: 'Source Serif 4', serif;

          font-size: 30px;
          font-weight: 600;

          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .dashboard-subtitle {
          margin: 7px 0 0;
          color: var(--muted);
          font-size: 13px;
        }

        .dashboard-top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* =====================================================
           SEARCH
        ===================================================== */

        .dashboard-search {
          width: 230px;
          height: 38px;

          display: flex;
          align-items: center;
          gap: 8px;

          padding: 0 11px;

          background: white;
          border: 1px solid var(--border);
          border-radius: 7px;
        }

        .dashboard-search input {
          width: 100%;

          border: none;
          outline: none;

          background: transparent;
          color: var(--ink);

          font-family: 'Inter', sans-serif;
          font-size: 12px;
        }

        /* =====================================================
           NOTIFICATION
        ===================================================== */

        .notification-button {
          position: relative;

          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid var(--border);
          border-radius: 7px;

          background: white;
          cursor: pointer;
        }

        .notification-dot {
          position: absolute;

          top: 7px;
          right: 7px;

          width: 6px;
          height: 6px;

          border-radius: 50%;
          background: var(--blue);
        }

        .profile-circle {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: var(--blue);
          color: white;

          font-size: 13px;
          font-weight: 600;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .dashboard-hero {
          display: grid;

          grid-template-columns: 330px minmax(0, 1fr);

          gap: 18px;
          margin-bottom: 18px;
        }

        /* =====================================================
           PRI
        ===================================================== */

        .pri-card {
          padding: 23px;

          border-radius: 15px;

          background: var(--navy);
          color: white;

          box-shadow:
            0 8px 25px rgba(14,26,43,0.08);

          cursor: pointer;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .pri-card:hover {
          transform: translateY(-2px);

          box-shadow:
            0 14px 30px rgba(14,26,43,0.15);
        }

        .pri-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pri-title {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.78);
        }

        .pri-label {
          font-family: 'IBM Plex Mono', monospace;

          font-size: 9px;
          letter-spacing: 1px;

          color: #7d95c4;
        }

        .pri-gauge {
          display: block;

          width: 100%;
          max-width: 220px;

          margin: 10px auto 0;
        }

        .pri-status {
          margin-top: 4px;

          text-align: center;

          color: #8da7e5;

          font-size: 11px;
          font-weight: 600;
        }

        .pri-click {
          margin-top: 9px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;

          color: rgba(255,255,255,0.42);

          font-size: 9px;
        }

        /* =====================================================
           SCORE LIST
        ===================================================== */

        .score-list {
          margin-top: 18px;

          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .score-row-header {
          display: flex;
          justify-content: space-between;

          margin-bottom: 5px;

          font-size: 11px;
        }

        .score-name {
          color: rgba(255,255,255,0.56);
        }

        .score-value {
          font-family: 'IBM Plex Mono', monospace;
          color: rgba(255,255,255,0.78);
        }

        .score-track {
          width: 100%;
          height: 5px;

          border-radius: 99px;

          background: rgba(255,255,255,0.1);

          overflow: hidden;
        }

        .score-progress {
          height: 100%;
          border-radius: 99px;

          background: #6b8de3;

          transition: width 0.7s ease;
        }

        .score-not-available {
          color: rgba(255,255,255,0.35);
          font-size: 9px;
        }

        /* =====================================================
           HERO RIGHT
        ===================================================== */

        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* =====================================================
           STATS
        ===================================================== */

        .stats-grid {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 14px;
        }

        .dashboard-card {
          background: white;

          border: 1px solid var(--border);
          border-radius: 15px;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .dashboard-card:hover {
          border-color: #c7d7fe;

          box-shadow:
            0 6px 20px rgba(16,24,40,0.05);
        }

        .stat-card {
          padding: 18px;
        }

        .stat-label {
          color: var(--muted);

          font-size: 11px;
          line-height: 1.4;

          margin-bottom: 7px;
        }

        .stat-value {
          color: var(--navy);

          font-family: 'Source Serif 4', serif;

          font-size: 30px;
          font-weight: 600;
        }

        .stat-note {
          margin-top: 4px;

          color: #1f9d6e;
          font-size: 10px;
        }

        /* =====================================================
           ROADMAP
        ===================================================== */

        .roadmap-card {
          padding: 20px;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 18px;
        }

        .card-title {
          margin: 0;

          color: var(--navy);

          font-size: 14px;
          font-weight: 600;
        }

        .view-link {
          display: flex;
          align-items: center;
          gap: 3px;

          padding: 0;
          border: none;

          background: transparent;
          color: var(--blue);

          font-family: 'Inter', sans-serif;

          font-size: 11px;
          font-weight: 600;

          cursor: pointer;
        }

        .roadmap-container {
          display: flex;
          align-items: flex-start;
        }

        .roadmap-item {
          flex: 1;

          display: flex;
          flex-direction: column;
          align-items: center;

          text-align: center;
        }

        .roadmap-number {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 7px;

          border-radius: 50%;

          font-family: 'IBM Plex Mono', monospace;

          font-size: 10px;
          font-weight: 600;
        }

        .roadmap-number.done {
          background: #1f9d6e;
          color: white;
        }

        .roadmap-number.active {
          background: var(--blue);
          color: white;
        }

        .roadmap-number.upcoming {
          background: #f2f4f7;
          color: #98a2b3;
        }

        .roadmap-title {
          max-width: 100px;

          color: var(--ink);

          font-size: 10px;
          line-height: 1.35;
        }

        .roadmap-title.upcoming {
          color: #98a2b3;
        }

        .roadmap-line {
          height: 1px;

          flex: 1;

          margin-top: 15px;

          background: var(--border);
        }

        .roadmap-line.done {
          background: #1f9d6e;
        }

        /* =====================================================
           ACTIONS
        ===================================================== */

        .actions-card {
          padding: 23px;
        }

        .actions-heading {
          margin-bottom: 18px;
        }

        .actions-eyebrow {
          color: #7d95c4;

          font-size: 9px;
          font-weight: 600;

          letter-spacing: 1.5px;
          text-transform: uppercase;

          margin-bottom: 4px;
        }

        .actions-title {
          margin: 0;

          color: var(--navy);

          font-family: 'Source Serif 4', serif;

          font-size: 18px;
          font-weight: 600;
        }

        .actions-grid {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 12px;
        }

        .action-button {
          width: 100%;

          display: flex;
          align-items: flex-start;

          gap: 12px;
          padding: 14px;

          border: 1px solid var(--border);
          border-radius: 11px;

          background: white;

          text-align: left;
          cursor: pointer;

          transition: all 0.2s ease;
        }

        .action-button:hover {
          border-color: var(--blue);
          background: #f7f9ff;
          transform: translateY(-1px);
        }

        .action-icon {
          width: 36px;
          height: 36px;

          min-width: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 8px;

          background: var(--blue-soft);
          color: var(--blue);
        }

        .action-name {
          color: var(--navy);

          font-size: 12px;
          font-weight: 600;
        }

        .action-description {
          margin-top: 3px;

          color: var(--muted);

          font-size: 10px;
          line-height: 1.4;
        }

        /* =====================================================
           ERROR
        ===================================================== */

        .error-card {
          display: flex;
          align-items: center;
          gap: 10px;

          padding: 12px 15px;

          margin-bottom: 18px;

          background: #fff7ed;
          border: 1px solid #fed7aa;
          border-radius: 10px;

          color: #9a3412;

          font-size: 12px;
        }

        /* =====================================================
           LOADING
        ===================================================== */

        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;

          flex-direction: column;
          gap: 12px;

          color: var(--muted);
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        /* =====================================================
           REFRESH
        ===================================================== */

        .refresh-button {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 38px;
          height: 38px;

          border: 1px solid var(--border);
          border-radius: 7px;

          background: white;

          color: #475467;

          cursor: pointer;
        }

        .refresh-button:hover {
          background: #f9fafb;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {
          .dashboard-content {
            padding: 28px;
          }

          .dashboard-hero {
            grid-template-columns:
              290px minmax(0, 1fr);
          }

          .dashboard-search {
            width: 190px;
          }

          .actions-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .dashboard-sidebar {
            width: 220px;
            min-width: 220px;

            padding: 20px 14px;
          }

          .dashboard-content {
            padding: 24px 20px;
          }

          .dashboard-hero {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .dashboard-top-actions {
            display: none;
          }
        }

        @media (max-width: 650px) {
          .dashboard-sidebar {
            width: 190px;
            min-width: 190px;

            padding: 18px 10px;
          }

          .dashboard-logo {
            margin-bottom: 25px;
          }

          .dashboard-logo-name {
            font-size: 13px;
          }

          .sidebar-nav-button {
            padding: 10px 8px;
            gap: 8px;
            font-size: 11px;
          }

          .dashboard-content {
            padding: 20px 14px;
          }

          .dashboard-title {
            font-size: 23px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }

          .roadmap-container {
            overflow-x: auto;
            min-width: 480px;
          }

          .roadmap-card {
            overflow-x: auto;
          }
        }
      `}</style>

      {/* =========================================================
          PERMANENT SIDEBAR
      ========================================================= */}

      <aside className="dashboard-sidebar">
        {/* Logo */}

        <div className="dashboard-logo">
          <div className="dashboard-logo-mark">
            PP
          </div>

          <div>
            <div className="dashboard-logo-name">
              Placement<span>Path</span>
            </div>

            <div className="dashboard-logo-subtitle">
              Student Portal
            </div>
          </div>
        </div>

        {/* Navigation */}

        <nav className="sidebar-navigation">
          {NAV_ITEMS.map(
            ({
              key,
              label,
              icon: Icon,
              path,
            }) => {
              const isActive = active === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => navigate(path)}
                  className={`sidebar-nav-button ${
                    isActive ? "active" : ""
                  }`}
                >
                  <span className="sidebar-nav-icon">
                    <Icon
                      size={17}
                      strokeWidth={2}
                    />
                  </span>

                  <span>{label}</span>

                  {isActive && (
                    <ChevronRight
                      size={14}
                      className="sidebar-chevron"
                    />
                  )}
                </button>
              );
            }
          )}
        </nav>

        {/* Streak */}

        <div className="streak-card">
          <div className="streak-title">
            <Flame size={15} />

            <span>7-day streak</span>
          </div>

          <p className="streak-description">
            Keep testing daily to improve your
            Placement Readiness Index.
          </p>
        </div>

        {/* Bottom */}

        <div className="sidebar-bottom">
          <button
            type="button"
            className="sidebar-nav-button"
          >
            <span className="sidebar-nav-icon">
              <Settings size={16} />
            </span>

            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="sidebar-nav-button"
          >
            <span className="sidebar-nav-icon">
              <LogOut size={16} />
            </span>

            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="dashboard-main">
        <div className="dashboard-content">

          {/* =====================================================
              TOP BAR
          ===================================================== */}

          <div className="dashboard-topbar">
            <div>
              <div className="dashboard-eyebrow">
                Student Dashboard
              </div>

              <h1 className="dashboard-title">
                Good afternoon, {firstName}
              </h1>

              <p className="dashboard-subtitle">
                Your placement readiness is calculated
                from your actual assessment results.
              </p>
            </div>

            <div className="dashboard-top-actions">

              {/* Search */}

              <div className="dashboard-search">
                <Search
                  size={15}
                  color="#98A2B3"
                />

                <input
                  type="text"
                  placeholder="Search companies, skills..."
                />
              </div>

              {/* Refresh */}

              <button
                type="button"
                className="refresh-button"
                onClick={handleRefresh}
                title="Refresh PRI"
              >
                <RefreshCw
                  size={15}
                  className={
                    refreshing ? "spin" : ""
                  }
                />
              </button>

              {/* Notification */}

              <button
                type="button"
                className="notification-button"
              >
                <Bell
                  size={16}
                  color="#475467"
                />

                <span className="notification-dot" />
              </button>

              {/* Profile */}

              <div className="profile-circle">
                {initials}
              </div>
            </div>
          </div>

          {/* =====================================================
              ERROR
          ===================================================== */}

          {error && (
            <div className="error-card">
              <AlertCircle size={17} />

              <span>{error}</span>
            </div>
          )}

          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading ? (
            <div className="loading-screen">
              <Loader2
                size={32}
                className="spin"
              />

              <span>
                Calculating your Placement Readiness Index...
              </span>
            </div>
          ) : (
            <>
              {/* =================================================
                  HERO
              ================================================= */}

              <div className="dashboard-hero">

                {/* =================================================
                    PRI CARD
                ================================================= */}

                <div
                  className="pri-card"
                  onClick={() =>
                    navigate("/student/pri-report")
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      navigate(
                        "/student/pri-report"
                      );
                    }
                  }}
                >
                  <div className="pri-header">
                    <span className="pri-title">
                      Placement Readiness Index
                    </span>

                    <span className="pri-label">
                      PRI
                    </span>
                  </div>

                  {/* Gauge */}

                  <svg
                    viewBox="0 0 200 115"
                    className="pri-gauge"
                  >
                    {/* Background */}

                    <path
                      d={`M ${CX - R} ${CY}
                          A ${R} ${R} 0 0 1
                          ${CX + R} ${CY}`}
                      fill="none"
                      stroke="rgba(255,255,255,0.10)"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />

                    {/* Progress */}

                    <path
                      d={`M ${CX - R} ${CY}
                          A ${R} ${R} 0 0 1
                          ${CX + R} ${CY}`}
                      fill="none"
                      stroke="#1D4ED8"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      strokeDashoffset={offset}
                      style={{
                        transition:
                          "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />

                    {/* Score */}

                    <text
                      x="100"
                      y="92"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="34"
                      fontWeight="700"
                      fontFamily="Inter"
                    >
                      {dial}%
                    </text>

                    <text
                      x="100"
                      y="108"
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.5)"
                      fontSize="11"
                      fontFamily="Inter"
                    >
                      Current readiness
                    </text>
                  </svg>

                  <div className="pri-status">
                    {priStatus}
                  </div>

                  {/* Scores */}

                  <div className="score-list">
                    {subScores.map((score) => (
                      <div key={score.label}>
                        <div className="score-row-header">
                          <span className="score-name">
                            {score.label}
                          </span>

                          {score.value !== null ? (
                            <span className="score-value">
                              {score.value}
                            </span>
                          ) : (
                            <span className="score-not-available">
                              Not evaluated
                            </span>
                          )}
                        </div>

                        <div className="score-track">
                          {score.value !== null && (
                            <div
                              className="score-progress"
                              style={{
                                width: `${score.value}%`,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pri-click">
                    Click to view complete PRI report
                    <ChevronRight size={11} />
                  </div>
                </div>

                {/* =================================================
                    RIGHT HERO
                ================================================= */}

                <div className="hero-right">

                  {/* Stats */}

                  <div className="stats-grid">

                    <div className="dashboard-card stat-card">
                      <div className="stat-label">
                        Aptitude tests completed
                      </div>

                      <div className="stat-value">
                        {aptitudeTestsCompleted}
                      </div>

                      <div className="stat-note">
                        Real assessment data
                      </div>
                    </div>

                    <div className="dashboard-card stat-card">
                      <div className="stat-label">
                        Coding tests completed
                      </div>

                      <div className="stat-value">
                        {codingTestsCompleted}
                      </div>

                      <div className="stat-note">
                        Real coding results
                      </div>
                    </div>

                    <div className="dashboard-card stat-card">
                      <div className="stat-label">
                        Current PRI
                      </div>

                      <div className="stat-value">
                        {PRI}
                      </div>

                      <div className="stat-note">
                        Dynamically calculated
                      </div>
                    </div>
                  </div>

                  {/* Roadmap */}

                  <div className="dashboard-card roadmap-card">
                    <div className="card-header">
                      <h3 className="card-title">
                        Your placement roadmap
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            "/student/roadmap"
                          )
                        }
                        className="view-link"
                      >
                        View full roadmap
                        <ChevronRight size={13} />
                      </button>
                    </div>

                    <div className="roadmap-container">
                      {ROADMAP_STEPS.map(
                        (step, index) => (
                          <React.Fragment
                            key={step.step}
                          >
                            <div className="roadmap-item">
                              <div
                                className={`roadmap-number ${step.status}`}
                              >
                                {step.step}
                              </div>

                              <span
                                className={`roadmap-title ${
                                  step.status ===
                                  "upcoming"
                                    ? "upcoming"
                                    : ""
                                }`}
                              >
                                {step.title}
                              </span>
                            </div>

                            {index <
                              ROADMAP_STEPS.length -
                                1 && (
                              <div
                                className={`roadmap-line ${
                                  step.status ===
                                  "done"
                                    ? "done"
                                    : ""
                                }`}
                              />
                            )}
                          </React.Fragment>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="dashboard-card actions-card">
                <div className="actions-heading">
                  <div className="actions-eyebrow">
                    Placement preparation
                  </div>

                  <h2 className="actions-title">
                    Student actions
                  </h2>
                </div>

                <div className="actions-grid">

                  {/* Aptitude */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/student/aptitude-tests"
                      )
                    }
                    className="action-button"
                  >
                    <div className="action-icon">
                      <ClipboardList size={17} />
                    </div>

                    <div>
                      <div className="action-name">
                        Aptitude Tests
                      </div>

                      <div className="action-description">
                        View and complete assessments
                      </div>
                    </div>
                  </button>

                  {/* Coding */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/student/coding-tests"
                      )
                    }
                    className="action-button"
                  >
                    <div className="action-icon">
                      <Code2 size={17} />
                    </div>

                    <div>
                      <div className="action-name">
                        Coding Tests
                      </div>

                      <div className="action-description">
                        Solve coding problems
                      </div>
                    </div>
                  </button>

                  {/* PRI Report */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/student/pri-report"
                      )
                    }
                    className="action-button"
                  >
                    <div className="action-icon">
                      <Target size={17} />
                    </div>

                    <div>
                      <div className="action-name">
                        PRI Report
                      </div>

                      <div className="action-description">
                        View your detailed readiness
                      </div>
                    </div>
                  </button>

                  {/* Improvement */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/student/improvement"
                      )
                    }
                    className="action-button"
                  >
                    <div className="action-icon">
                      <TrendingUp size={17} />
                    </div>

                    <div>
                      <div className="action-name">
                        Track Improvement
                      </div>

                      <div className="action-description">
                        See your progress over time
                      </div>
                    </div>
                  </button>

                  {/* Roadmap */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/student/roadmap"
                      )
                    }
                    className="action-button"
                  >
                    <div className="action-icon">
                      <Map size={17} />
                    </div>

                    <div>
                      <div className="action-name">
                        Company Roadmap
                      </div>

                      <div className="action-description">
                        Follow your placement path
                      </div>
                    </div>
                  </button>

                  {/* Skills */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/student/skills"
                      )
                    }
                    className="action-button"
                  >
                    <div className="action-icon">
                      <Award size={17} />
                    </div>

                    <div>
                      <div className="action-name">
                        Skills
                      </div>

                      <div className="action-description">
                        Review your evaluated skills
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}