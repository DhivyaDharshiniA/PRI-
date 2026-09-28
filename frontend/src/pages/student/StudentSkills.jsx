// import React, { useEffect, useMemo, useState } from "react";
// import {
//   CheckCircle2,
//   AlertCircle,
//   TrendingUp,
//   Sparkles,
//   Target,
//   RefreshCw,
//   BriefcaseBusiness,
// } from "lucide-react";
// import StudentSidebar from "../student/StudentSidebar";
//
// const API_BASE_URL = "http://localhost:8080";
//
// export default function StudentSkills() {
//   const [skills, setSkills] = useState([]);
//   const [recommendedRoles, setRecommendedRoles] = useState([]);
//   const [priScore, setPriScore] = useState(0);
//
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//
//   // ============================================================
//   // GET STUDENT ID
//   // ============================================================
//
//   const getStudentId = () => {
//     // ----------------------------------------------------------
//     // 1. Try studentId
//     // ----------------------------------------------------------
//
//     const studentId = localStorage.getItem("studentId");
//
//     if (
//       studentId &&
//       studentId !== "null" &&
//       studentId !== "undefined"
//     ) {
//       return studentId;
//     }
//
//     // ----------------------------------------------------------
//     // 2. Try userId
//     // ----------------------------------------------------------
//
//     const userId = localStorage.getItem("userId");
//
//     if (
//       userId &&
//       userId !== "null" &&
//       userId !== "undefined"
//     ) {
//       return userId;
//     }
//
//     // ----------------------------------------------------------
//     // 3. Try user object
//     // ----------------------------------------------------------
//
//     const userString = localStorage.getItem("user");
//
//     if (userString) {
//       try {
//         const user = JSON.parse(userString);
//
//         const id =
//           user.studentId ??
//           user.userId ??
//           user.id;
//
//         if (
//           id !== null &&
//           id !== undefined
//         ) {
//           return String(id);
//         }
//       } catch (error) {
//         console.error(
//           "Invalid user object:",
//           error
//         );
//       }
//     }
//
//     return null;
//   };
//
//   // ============================================================
//   // FETCH PRI
//   // ============================================================
//
//   const fetchSkills = async () => {
//     try {
//       setLoading(true);
//       setError("");
//
//       const token =
//         localStorage.getItem("token");
//
//       const studentId =
//         getStudentId();
//
//       console.log(
//         "Student ID:",
//         studentId
//       );
//
//       console.log(
//         "User ID:",
//         localStorage.getItem(
//           "userId"
//         )
//       );
//
//       // --------------------------------------------------------
//       // Check student ID
//       // --------------------------------------------------------
//
//       if (!studentId) {
//         throw new Error(
//           "Student ID not found. Please login again."
//         );
//       }
//
//       // --------------------------------------------------------
//       // API URL
//       // --------------------------------------------------------
//
//       const url =
//         `${API_BASE_URL}/api/student/skills` +
//         `?studentId=${encodeURIComponent(
//           studentId
//         )}`;
//
//       console.log(
//         "Fetching PRI:",
//         url
//       );
//
//       // --------------------------------------------------------
//       // API CALL
//       // --------------------------------------------------------
//
//       const response =
//         await fetch(url, {
//           method: "GET",
//
//           headers: {
//             Accept:
//               "application/json",
//
//             ...(token
//               ? {
//                   Authorization:
//                     `Bearer ${token}`,
//                 }
//               : {}),
//           },
//         });
//
//       // --------------------------------------------------------
//       // HTTP ERROR
//       // --------------------------------------------------------
//
//       if (!response.ok) {
//         const errorText =
//           await response.text();
//
//         console.error(
//           "PRI API Error:",
//           response.status,
//           errorText
//         );
//
//         throw new Error(
//           `Failed to load skills. Status: ${response.status}`
//         );
//       }
//
//       // --------------------------------------------------------
//       // JSON
//       // --------------------------------------------------------
//
//       const data =
//         await response.json();
//
//       console.log(
//         "PRI RESPONSE:",
//         data
//       );
//
//       // --------------------------------------------------------
//       // PRI SCORE
//       // --------------------------------------------------------
//
//       const calculatedPri =
//         Number(
//           data.overallScore ??
//           data.priScore ??
//           0
//         );
//
//       setPriScore(
//         Number.isFinite(
//           calculatedPri
//         )
//           ? calculatedPri
//           : 0
//       );
//
//       // --------------------------------------------------------
//       // SKILLS
//       // --------------------------------------------------------
//
//       setSkills(
//         Array.isArray(
//           data.skills
//         )
//           ? data.skills
//           : []
//       );
//
//       // --------------------------------------------------------
//       // RECOMMENDED ROLES
//       // --------------------------------------------------------
//
//       setRecommendedRoles(
//         Array.isArray(
//           data.recommendedRoles
//         )
//           ? data.recommendedRoles
//           : []
//       );
//
//     } catch (err) {
//       console.error(
//         "Skill API error:",
//         err
//       );
//
//       setError(
//         err.message ||
//           "Unable to load your skill assessment."
//       );
//
//       setSkills([]);
//       setRecommendedRoles([]);
//       setPriScore(0);
//
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   // ============================================================
//   // INITIAL LOAD
//   // ============================================================
//
//   useEffect(() => {
//     fetchSkills();
//   }, []);
//
//   // ============================================================
//   // AVERAGE SKILL SCORE
//   // ============================================================
//
//   const averageScore =
//     useMemo(() => {
//       if (!skills.length) {
//         return 0;
//       }
//
//       const total =
//         skills.reduce(
//           (sum, skill) =>
//             sum +
//             Number(
//               skill.score || 0
//             ),
//           0
//         );
//
//       return Math.round(
//         total / skills.length
//       );
//     }, [skills]);
//
//   // ============================================================
//   // STRONG SKILLS
//   // ============================================================
//
//   const strongSkills =
//     useMemo(() => {
//       return skills.filter(
//         (skill) =>
//           Number(
//             skill.score || 0
//           ) >= 80
//       ).length;
//     }, [skills]);
//
//   // ============================================================
//   // IMPROVEMENT SKILLS
//   // ============================================================
//
//   const improvementSkills =
//     useMemo(() => {
//       return skills.filter(
//         (skill) =>
//           Number(
//             skill.score || 0
//           ) < 70
//       ).length;
//     }, [skills]);
//
//   // ============================================================
//   // SKILL LEVEL
//   // ============================================================
//
//   const getLevel = (
//     score
//   ) => {
//     if (score >= 80) {
//       return "Strong";
//     }
//
//     if (score >= 70) {
//       return "Good";
//     }
//
//     return "Improve";
//   };
//
//   // ============================================================
//   // LEVEL COLOR
//   // ============================================================
//
//   const getLevelColor = (
//     level
//   ) => {
//     if (level === "Strong") {
//       return "text-[#15803D]";
//     }
//
//     if (level === "Improve") {
//       return "text-[#DC2626]";
//     }
//
//     return "text-[#1D4ED8]";
//   };
//
//   // ============================================================
//   // PROGRESS BAR COLOR
//   // ============================================================
//
//   const getBarColor = (
//     level
//   ) => {
//     if (level === "Strong") {
//       return "bg-[#15803D]";
//     }
//
//     if (level === "Improve") {
//       return "bg-[#DC2626]";
//     }
//
//     return "bg-[#1D4ED8]";
//   };
//
//   // ============================================================
//   // PRI LABEL
//   // ============================================================
//
//   const getPriLabel = (
//     score
//   ) => {
//     if (score >= 85) {
//       return "Excellent";
//     }
//
//     if (score >= 75) {
//       return "Placement Ready";
//     }
//
//     if (score >= 60) {
//       return "Good";
//     }
//
//     if (score >= 40) {
//       return "Needs Improvement";
//     }
//
//     return "Needs Attention";
//   };
//
//   // ============================================================
//   // SAFE SCORE
//   // ============================================================
//
//   const safeScore = Math.min(
//     Math.max(
//       Number(priScore) || 0,
//       0
//     ),
//     100
//   );
//
//   // ============================================================
//   // RENDER
//   // ============================================================
//
//   return (
//     <div className="min-h-screen bg-[#F8FAFC] text-[#101828]">
//
//       {/* ======================================================
//           SIDEBAR
//       ====================================================== */}
//
//       <StudentSidebar />
//
//       {/* ======================================================
//           MAIN
//       ====================================================== */}
//
//       <main className="lg:ml-[270px] min-h-screen">
//
//         <div className="p-6 md:p-8 lg:p-10">
//
//           {/* ==================================================
//               HEADER
//           ================================================== */}
//
//           <div className="mb-8">
//
//             <p className="text-[10px] uppercase tracking-[1.8px] font-semibold text-[#7D95C4] mb-2">
//               Student Profile
//             </p>
//
//             <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
//
//               <div>
//
//                 <h1 className="text-3xl font-semibold text-[#0E1A2B]">
//                   My Skills
//                 </h1>
//
//                 <p className="text-sm text-[#667085] mt-2 max-w-2xl">
//                   Your skills and Placement Readiness
//                   Index are dynamically calculated from
//                   your aptitude, coding, GitHub and
//                   LeetCode performance.
//                 </p>
//
//               </div>
//
//               {/* REFRESH */}
//
//               <button
//                 type="button"
//                 onClick={
//                   fetchSkills
//                 }
//                 disabled={
//                   loading
//                 }
//                 className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#D0D5DD] bg-white text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] transition disabled:opacity-50"
//               >
//
//                 <RefreshCw
//                   size={15}
//                   className={
//                     loading
//                       ? "animate-spin"
//                       : ""
//                   }
//                 />
//
//                 Refresh
//
//               </button>
//
//             </div>
//
//           </div>
//
//           {/* ==================================================
//               ERROR
//           ================================================== */}
//
//           {error && (
//             <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
//
//               <AlertCircle
//                 size={18}
//                 className="text-red-600 mt-0.5 flex-shrink-0"
//               />
//
//               <div>
//
//                 <p className="text-sm font-semibold text-red-800">
//                   Unable to load skills
//                 </p>
//
//                 <p className="text-xs text-red-700 mt-1">
//                   {error}
//                 </p>
//
//                 {/* LOGIN AGAIN */}
//
//                 {!getStudentId() && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       window.location.href =
//                         "/login";
//                     }}
//                     className="mt-3 text-xs font-semibold text-red-800 underline"
//                   >
//                     Login again
//                   </button>
//                 )}
//
//               </div>
//
//             </div>
//           )}
//
//           {/* ==================================================
//               SUMMARY
//           ================================================== */}
//
//           <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-6">
//
//             {/* =================================================
//                 PRI
//             ================================================= */}
//
//             <div className="bg-[#0E1A2B] rounded-2xl p-6 text-white relative overflow-hidden">
//
//               <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#1D4ED8]/30" />
//
//               <div className="relative">
//
//                 <div className="flex items-center gap-2 text-[#8DA7E5] text-xs font-semibold uppercase tracking-wider">
//
//                   <Target size={15} />
//
//                   PRI Score
//
//                 </div>
//
//                 <div className="mt-4 flex items-end gap-2">
//
//                   <span className="text-5xl font-semibold">
//                     {safeScore}
//                   </span>
//
//                   <span className="text-white/40 text-sm mb-2">
//                     / 100
//                   </span>
//
//                 </div>
//
//                 <p className="text-sm text-[#8DA7E5] mt-2">
//                   {getPriLabel(
//                     safeScore
//                   )}
//                 </p>
//
//                 <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
//
//                   <div
//                     className="h-full bg-[#6B8DE3] rounded-full transition-all duration-700"
//                     style={{
//                       width:
//                         `${safeScore}%`,
//                     }}
//                   />
//
//                 </div>
//
//               </div>
//
//             </div>
//
//             {/* =================================================
//                 SKILLS EVALUATED
//             ================================================= */}
//
//             <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5">
//
//               <p className="text-xs text-[#667085]">
//                 Skills evaluated
//               </p>
//
//               <p className="text-3xl font-semibold text-[#0E1A2B] mt-2">
//                 {skills.length}
//               </p>
//
//               <p className="text-xs text-[#1F9D6E] mt-2">
//                 Across your assessments
//               </p>
//
//             </div>
//
//             {/* =================================================
//                 AVERAGE
//             ================================================= */}
//
//             <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5">
//
//               <p className="text-xs text-[#667085]">
//                 Average skill score
//               </p>
//
//               <p className="text-3xl font-semibold text-[#0E1A2B] mt-2">
//                 {averageScore}%
//               </p>
//
//               <p className="text-xs text-[#1F9D6E] mt-2 flex items-center gap-1">
//
//                 <TrendingUp
//                   size={13}
//                 />
//
//                 Overall performance
//
//               </p>
//
//             </div>
//
//             {/* =================================================
//                 STRONG
//             ================================================= */}
//
//             <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5">
//
//               <p className="text-xs text-[#667085]">
//                 Strong skills
//               </p>
//
//               <p className="text-3xl font-semibold text-[#0E1A2B] mt-2">
//                 {strongSkills}
//               </p>
//
//               <p className="text-xs text-[#1F9D6E] mt-2">
//                 Placement ready
//               </p>
//
//             </div>
//
//           </div>
//
//           {/* ==================================================
//               COMPONENT BREAKDOWN
//           ================================================== */}
//
//           {!loading &&
//             skills.length > 0 && (
//               <div className="mb-6 bg-white border border-[#E4E7EC] rounded-2xl p-6">
//
//                 <div className="flex items-center gap-2 mb-5">
//
//                   <Target
//                     size={18}
//                     className="text-[#1D4ED8]"
//                   />
//
//                   <div>
//
//                     <h2 className="font-semibold text-[#0E1A2B]">
//                       PRI Components
//                     </h2>
//
//                     <p className="text-xs text-[#667085] mt-1">
//                       Your readiness score is based on
//                       multiple performance areas.
//                     </p>
//
//                   </div>
//
//                 </div>
//
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//
//                   {skills
//                     .filter(
//                       (skill) =>
//                         [
//                           "Aptitude",
//                           "Coding",
//                           "GitHub",
//                           "LeetCode",
//                         ].some(
//                           (name) =>
//                             String(
//                               skill.name
//                             )
//                               .toLowerCase()
//                               .includes(
//                                 name.toLowerCase()
//                               )
//                         )
//                     )
//                     .map(
//                       (
//                         skill,
//                         index
//                       ) => {
//
//                         const score =
//                           Math.min(
//                             Math.max(
//                               Number(
//                                 skill.score ||
//                                   0
//                               ),
//                               0
//                             ),
//                             100
//                           );
//
//                         return (
//                           <div
//                             key={
//                               skill.name ||
//                               index
//                             }
//                             className="border border-[#E4E7EC] rounded-xl p-4"
//                           >
//
//                             <div className="flex items-center justify-between">
//
//                               <span className="text-sm font-semibold text-[#101828]">
//                                 {
//                                   skill.name
//                                 }
//                               </span>
//
//                               <span className="text-sm font-semibold text-[#1D4ED8]">
//                                 {
//                                   score
//                                 }%
//                               </span>
//
//                             </div>
//
//                             <div className="mt-3 h-2 bg-[#EEF1F7] rounded-full overflow-hidden">
//
//                               <div
//                                 className="h-full bg-[#1D4ED8] rounded-full"
//                                 style={{
//                                   width:
//                                     `${score}%`,
//                                 }}
//                               />
//
//                             </div>
//
//                           </div>
//                         );
//                       }
//                     )}
//
//                 </div>
//
//               </div>
//             )}
//
//           {/* ==================================================
//               SKILL GAP
//           ================================================== */}
//
//           {!loading &&
//             improvementSkills >
//               0 && (
//               <div className="mb-6 rounded-2xl border border-[#FDE2E1] bg-[#FFF7F7] p-5">
//
//                 <div className="flex items-start gap-3">
//
//                   <div className="w-9 h-9 rounded-lg bg-[#FEE4E2] flex items-center justify-center flex-shrink-0">
//
//                     <AlertCircle
//                       size={18}
//                       className="text-[#DC2626]"
//                     />
//
//                   </div>
//
//                   <div>
//
//                     <h3 className="text-sm font-semibold text-[#101828]">
//                       Skills that need attention
//                     </h3>
//
//                     <p className="text-xs text-[#667085] mt-1">
//                       You currently have{" "}
//                       {
//                         improvementSkills
//                       }{" "}
//                       skill
//                       {improvementSkills >
//                       1
//                         ? "s"
//                         : ""}{" "}
//                       below the recommended
//                       70% level. Improving
//                       these areas can increase
//                       your PRI score.
//                     </p>
//
//                   </div>
//
//                 </div>
//
//               </div>
//             )}
//
//           {/* ==================================================
//               SKILLS
//           ================================================== */}
//
//           <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6">
//
//             <div className="flex items-center gap-2 mb-6">
//
//               <Sparkles
//                 size={18}
//                 className="text-[#1D4ED8]"
//               />
//
//               <div>
//
//                 <h2 className="font-semibold text-[#0E1A2B]">
//                   Skill Assessment
//                 </h2>
//
//                 <p className="text-xs text-[#667085] mt-1">
//                   Dynamically calculated from
//                   your PRI components.
//                 </p>
//
//               </div>
//
//             </div>
//
//             {/* =================================================
//                 LOADING
//             ================================================= */}
//
//             {loading && (
//               <div className="py-16 text-center">
//
//                 <RefreshCw
//                   size={28}
//                   className="mx-auto text-[#1D4ED8] animate-spin"
//                 />
//
//                 <p className="text-sm text-[#667085] mt-4">
//                   Calculating your skills...
//                 </p>
//
//               </div>
//             )}
//
//             {/* =================================================
//                 EMPTY
//             ================================================= */}
//
//             {!loading &&
//               !error &&
//               skills.length === 0 && (
//                 <div className="py-16 text-center">
//
//                   <Sparkles
//                     size={30}
//                     className="mx-auto text-[#98A2B3]"
//                   />
//
//                   <h3 className="font-semibold text-[#101828] mt-4">
//                     No skill assessment available
//                   </h3>
//
//                   <p className="text-xs text-[#667085] mt-2">
//                     Complete your aptitude and
//                     coding assessments to generate
//                     your skill profile.
//                   </p>
//
//                 </div>
//               )}
//
//             {/* =================================================
//                 SKILL CARDS
//             ================================================= */}
//
//             {!loading &&
//               skills.length > 0 && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//
//                   {skills.map(
//                     (
//                       skill,
//                       index
//                     ) => {
//
//                       const score =
//                         Math.min(
//                           Math.max(
//                             Number(
//                               skill.score ||
//                                 0
//                             ),
//                             0
//                           ),
//                           100
//                         );
//
//                       const level =
//                         skill.level ||
//                         getLevel(
//                           score
//                         );
//
//                       return (
//                         <div
//                           key={
//                             skill.name ||
//                             index
//                           }
//                           className="border border-[#E4E7EC] rounded-xl p-5 hover:border-[#B8C8F5] hover:shadow-sm transition"
//                         >
//
//                           {/* TOP */}
//
//                           <div className="flex items-start justify-between gap-4">
//
//                             <div className="min-w-0">
//
//                               <h3 className="font-semibold text-[#101828]">
//                                 {
//                                   skill.name
//                                 }
//                               </h3>
//
//                               <p className="text-xs text-[#98A2B3] mt-1">
//                                 {
//                                   skill.category ||
//                                   "Skill"
//                                 }
//                               </p>
//
//                             </div>
//
//                             <div
//                               className={`flex items-center gap-1 text-xs font-semibold whitespace-nowrap ${getLevelColor(
//                                 level
//                               )}`}
//                             >
//
//                               {level ===
//                               "Improve" ? (
//                                 <AlertCircle
//                                   size={
//                                     14
//                                   }
//                                 />
//                               ) : (
//                                 <CheckCircle2
//                                   size={
//                                     14
//                                   }
//                                 />
//                               )}
//
//                               {
//                                 level
//                               }
//
//                             </div>
//
//                           </div>
//
//                           {/* PROGRESS */}
//
//                           <div className="flex items-center gap-3 mt-5">
//
//                             <div className="flex-1 h-2 bg-[#EEF1F7] rounded-full overflow-hidden">
//
//                               <div
//                                 className={`h-full rounded-full transition-all duration-700 ${getBarColor(
//                                   level
//                                 )}`}
//                                 style={{
//                                   width:
//                                     `${score}%`,
//                                 }}
//                               />
//
//                             </div>
//
//                             <span className="text-sm font-semibold text-[#1D4ED8] w-11 text-right">
//                               {
//                                 score
//                               }%
//                             </span>
//
//                           </div>
//
//                           {/* REASON */}
//
//                           {skill.reason && (
//                             <p className="text-[11px] text-[#667085] mt-3">
//                               {
//                                 skill.reason
//                               }
//                             </p>
//                           )}
//
//                         </div>
//                       );
//                     }
//                   )}
//
//                 </div>
//               )}
//
//           </div>
//
//           {/* ==================================================
//               RECOMMENDED ROLES
//           ================================================== */}
//
//           {!loading &&
//             recommendedRoles.length >
//               0 && (
//               <div className="mt-6 bg-white border border-[#E4E7EC] rounded-2xl p-6">
//
//                 <div className="flex items-center gap-2 mb-1">
//
//                   <BriefcaseBusiness
//                     size={18}
//                     className="text-[#1D4ED8]"
//                   />
//
//                   <h2 className="font-semibold text-[#0E1A2B]">
//                     Recommended Career Roles
//                   </h2>
//
//                 </div>
//
//                 <p className="text-xs text-[#667085] mb-5">
//                   Roles matched against your current
//                   skill profile.
//                 </p>
//
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//
//                   {recommendedRoles.map(
//                     (
//                       role,
//                       index
//                     ) => (
//
//                       <div
//                         key={
//                           role.name ||
//                           index
//                         }
//                         className="border border-[#E4E7EC] rounded-xl p-4 hover:border-[#B8C8F5] transition"
//                       >
//
//                         <div className="flex items-center justify-between gap-3">
//
//                           <h3 className="font-semibold text-sm text-[#101828]">
//                             {
//                               role.name
//                             }
//                           </h3>
//
//                           {role.matchScore !==
//                             undefined &&
//                             role.matchScore !==
//                               null && (
//                               <span className="text-xs font-semibold text-[#1D4ED8]">
//                                 {
//                                   role.matchScore
//                                 }
//                                 %
//                               </span>
//                             )}
//
//                         </div>
//
//                         {role.description && (
//                           <p className="text-xs text-[#667085] mt-2 leading-5">
//                             {
//                               role.description
//                             }
//                           </p>
//                         )}
//
//                         {Array.isArray(
//                           role.missingSkills
//                         ) &&
//                           role.missingSkills
//                             .length >
//                             0 && (
//                             <div className="mt-3">
//
//                               <p className="text-[10px] uppercase tracking-wider font-semibold text-[#98A2B3]">
//                                 Skill gaps
//                               </p>
//
//                               <div className="flex flex-wrap gap-1.5 mt-2">
//
//                                 {role.missingSkills.map(
//                                   (
//                                     item,
//                                     skillIndex
//                                   ) => (
//                                     <span
//                                       key={`${item}-${skillIndex}`}
//                                       className="px-2 py-1 rounded-md bg-[#F2F4F7] text-[10px] text-[#475467]"
//                                     >
//                                       {
//                                         item
//                                       }
//                                     </span>
//                                   )
//                                 )}
//
//                               </div>
//
//                             </div>
//                           )}
//
//                       </div>
//
//                     )
//                   )}
//
//                 </div>
//
//               </div>
//             )}
//
//         </div>
//
//       </main>
//
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Target,
  RefreshCw,
  BriefcaseBusiness,
} from "lucide-react";
import StudentSidebar from "../student/StudentSidebar";

const API_BASE_URL = "http://localhost:8080";

export default function StudentSkills() {
  const [skills, setSkills] = useState([]);
  const [recommendedRoles, setRecommendedRoles] = useState([]);
  const [priScore, setPriScore] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // GET STUDENT IDENTIFIER
  // ============================================================

  const getStudentIdentifier = () => {
    // ----------------------------------------------------------
    // 1. studentId directly stored in localStorage
    // ----------------------------------------------------------

    const studentId = localStorage.getItem("studentId");

    if (
      studentId &&
      studentId !== "null" &&
      studentId !== "undefined"
    ) {
      return {
        type: "studentId",
        value: String(studentId),
      };
    }

    // ----------------------------------------------------------
    // 2. userId directly stored in localStorage
    // ----------------------------------------------------------

    const userId = localStorage.getItem("userId");

    if (
      userId &&
      userId !== "null" &&
      userId !== "undefined"
    ) {
      return {
        type: "userId",
        value: String(userId),
      };
    }

    // ----------------------------------------------------------
    // 3. user object
    // ----------------------------------------------------------

    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const user = JSON.parse(userString);

        // Student profile ID
        if (
          user.studentId !== null &&
          user.studentId !== undefined &&
          String(user.studentId) !== "null" &&
          String(user.studentId) !== "undefined"
        ) {
          return {
            type: "studentId",
            value: String(user.studentId),
          };
        }

        // Application user ID
        if (
          user.userId !== null &&
          user.userId !== undefined &&
          String(user.userId) !== "null" &&
          String(user.userId) !== "undefined"
        ) {
          return {
            type: "userId",
            value: String(user.userId),
          };
        }

        // Sometimes login response stores ID as "id"
        if (
          user.id !== null &&
          user.id !== undefined &&
          String(user.id) !== "null" &&
          String(user.id) !== "undefined"
        ) {
          return {
            type: "userId",
            value: String(user.id),
          };
        }
      } catch (err) {
        console.error(
          "Invalid user object in localStorage:",
          err
        );
      }
    }

    return null;
  };

  // ============================================================
  // GET TOKEN
  // ============================================================

  const getToken = () => {
    const token = localStorage.getItem("token");

    if (
      token &&
      token !== "null" &&
      token !== "undefined"
    ) {
      return token;
    }

    return null;
  };

  // ============================================================
  // FETCH PRI / SKILLS
  // ============================================================

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const identifier =
        getStudentIdentifier();

      console.log(
        "===================================="
      );

      console.log(
        "PRI / SKILLS REQUEST"
      );

      console.log(
        "Identifier:",
        identifier
      );

      console.log(
        "studentId:",
        localStorage.getItem("studentId")
      );

      console.log(
        "userId:",
        localStorage.getItem("userId")
      );

      console.log(
        "user:",
        localStorage.getItem("user")
      );

      console.log(
        "===================================="
      );

      // --------------------------------------------------------
      // No ID
      // --------------------------------------------------------

      if (!identifier) {
        throw new Error(
          "Student ID or User ID not found. Please login again."
        );
      }

      // --------------------------------------------------------
      // Build API URL
      // --------------------------------------------------------

      let url =
        `${API_BASE_URL}/api/student/skills`;

      if (identifier.type === "studentId") {
        url +=
          `?studentId=${encodeURIComponent(
            identifier.value
          )}`;
      } else {
        url +=
          `?userId=${encodeURIComponent(
            identifier.value
          )}`;
      }

      console.log(
        "Skills API URL:",
        url
      );

      // --------------------------------------------------------
      // Headers
      // --------------------------------------------------------

      const token = getToken();

      const headers = {
        Accept: "application/json",
      };

      if (token) {
        headers.Authorization =
          `Bearer ${token}`;
      }

      // --------------------------------------------------------
      // API CALL
      // --------------------------------------------------------

      const response =
        await fetch(url, {
          method: "GET",
          headers,
        });

      console.log(
        "Skills API status:",
        response.status
      );

      // --------------------------------------------------------
      // HTTP ERROR
      // --------------------------------------------------------

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          "Skills API error:",
          response.status,
          errorText
        );

        throw new Error(
          `Failed to load skills. Server returned ${response.status}.`
        );
      }

      // --------------------------------------------------------
      // JSON RESPONSE
      // --------------------------------------------------------

      const data =
        await response.json();

      console.log(
        "FULL PRI RESPONSE:",
        data
      );

      // ========================================================
      // PRI SCORE
      // ========================================================

      const calculatedPri =
        Number(
          data.overallScore ??
          data.priScore ??
          data.score ??
          0
        );

      if (
        Number.isFinite(
          calculatedPri
        )
      ) {
        setPriScore(
          Math.min(
            Math.max(
              calculatedPri,
              0
            ),
            100
          )
        );
      } else {
        setPriScore(0);
      }

      // ========================================================
      // SKILLS
      // ========================================================
      //
      // Your new backend StudentPriService returns:
      //
      // response.setDimensions(dimensions)
      //
      // not necessarily:
      //
      // response.setSkills(...)
      //
      // Therefore we support BOTH.
      // ========================================================

      let skillData = [];

      // --------------------------------------------------------
      // Case 1: backend directly returns skills
      // --------------------------------------------------------

      if (
        Array.isArray(
          data.skills
        )
      ) {
        skillData =
          data.skills;
      }

      // --------------------------------------------------------
      // Case 2: backend returns PRI dimensions
      // --------------------------------------------------------

      else if (
        Array.isArray(
          data.dimensions
        )
      ) {
        skillData =
          data.dimensions.map(
            (dimension) => ({
              name:
                dimension.name ||
                formatDimensionName(
                  dimension.key
                ),

              key:
                dimension.key,

              category:
                "PRI Component",

              score:
                Number(
                  dimension.score || 0
                ),

              weight:
                dimension.weight,

              level:
                getSkillLevel(
                  Number(
                    dimension.score || 0
                  )
                ),

              reason:
                getSkillReason(
                  dimension.key,
                  Number(
                    dimension.score || 0
                  )
                ),
            })
          );
      }

      console.log(
        "Processed skills:",
        skillData
      );

      setSkills(
        Array.isArray(
          skillData
        )
          ? skillData
          : []
      );

      // ========================================================
      // RECOMMENDED ROLES
      // ========================================================

      if (
        Array.isArray(
          data.recommendedRoles
        )
      ) {
        setRecommendedRoles(
          data.recommendedRoles
        );
      } else {
        setRecommendedRoles([]);
      }

    } catch (err) {
      console.error(
        "Skill API error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load your skill assessment."
      );

      setSkills([]);
      setRecommendedRoles([]);
      setPriScore(0);

    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchSkills();
  }, []);

  // ============================================================
  // AVERAGE SKILL SCORE
  // ============================================================

  const averageScore =
    useMemo(() => {
      if (!skills.length) {
        return 0;
      }

      const validScores =
        skills
          .map(
            (skill) =>
              Number(
                skill.score || 0
              )
          )
          .filter(
            (score) =>
              Number.isFinite(score)
          );

      if (!validScores.length) {
        return 0;
      }

      const total =
        validScores.reduce(
          (sum, score) =>
            sum + score,
          0
        );

      return Math.round(
        total / validScores.length
      );
    }, [skills]);

  // ============================================================
  // STRONG SKILLS
  // ============================================================

  const strongSkills =
    useMemo(() => {
      return skills.filter(
        (skill) =>
          Number(
            skill.score || 0
          ) >= 80
      ).length;
    }, [skills]);

  // ============================================================
  // IMPROVEMENT SKILLS
  // ============================================================

  const improvementSkills =
    useMemo(() => {
      return skills.filter(
        (skill) =>
          Number(
            skill.score || 0
          ) < 70
      ).length;
    }, [skills]);

  // ============================================================
  // SKILL LEVEL
  // ============================================================

  const getLevel = (
    score
  ) => {
    if (score >= 80) {
      return "Strong";
    }

    if (score >= 70) {
      return "Good";
    }

    return "Improve";
  };

  // ============================================================
  // LEVEL COLOR
  // ============================================================

  const getLevelColor = (
    level
  ) => {
    if (level === "Strong") {
      return "text-[#15803D]";
    }

    if (level === "Improve") {
      return "text-[#DC2626]";
    }

    return "text-[#1D4ED8]";
  };

  // ============================================================
  // PROGRESS BAR COLOR
  // ============================================================

  const getBarColor = (
    level
  ) => {
    if (level === "Strong") {
      return "bg-[#15803D]";
    }

    if (level === "Improve") {
      return "bg-[#DC2626]";
    }

    return "bg-[#1D4ED8]";
  };

  // ============================================================
  // PRI LABEL
  // ============================================================

  const getPriLabel = (
    score
  ) => {
    if (score >= 85) {
      return "Excellent";
    }

    if (score >= 75) {
      return "Placement Ready";
    }

    if (score >= 60) {
      return "Good";
    }

    if (score >= 40) {
      return "Needs Improvement";
    }

    return "Needs Attention";
  };

  // ============================================================
  // SAFE PRI SCORE
  // ============================================================

  const safeScore =
    Math.min(
      Math.max(
        Number(priScore) || 0,
        0
      ),
      100
    );

  // ============================================================
  // LOGGED-IN IDENTIFIER
  // ============================================================

  const currentIdentifier =
    getStudentIdentifier();

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#101828]">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <StudentSidebar />

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="lg:ml-[270px] min-h-screen">

        <div className="p-6 md:p-8 lg:p-10">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-8">

            <p className="text-[10px] uppercase tracking-[1.8px] font-semibold text-[#7D95C4] mb-2">
              Student Profile
            </p>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

              <div>

                <h1 className="text-3xl font-semibold text-[#0E1A2B]">
                  My Skills
                </h1>

                <p className="text-sm text-[#667085] mt-2 max-w-2xl">
                  Your skills and Placement Readiness
                  Index are dynamically calculated from
                  your assessment performance and
                  connected profiles.
                </p>

              </div>

              {/* REFRESH */}

              <button
                type="button"
                onClick={fetchSkills}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#D0D5DD] bg-white text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] transition disabled:opacity-50"
              >

                <RefreshCw
                  size={15}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh

              </button>

            </div>

          </div>

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">

              <AlertCircle
                size={18}
                className="text-red-600 mt-0.5 flex-shrink-0"
              />

              <div className="flex-1">

                <p className="text-sm font-semibold text-red-800">
                  Unable to load skills
                </p>

                <p className="text-xs text-red-700 mt-1">
                  {error}
                </p>

                {!currentIdentifier && (
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href =
                        "/login";
                    }}
                    className="mt-3 text-xs font-semibold text-red-800 underline"
                  >
                    Login again
                  </button>
                )}

                {currentIdentifier && (
                  <button
                    type="button"
                    onClick={fetchSkills}
                    className="mt-3 text-xs font-semibold text-red-800 underline"
                  >
                    Try again
                  </button>
                )}

              </div>

            </div>
          )}

          {/* ==================================================
              SUMMARY
          ================================================== */}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-6">

            {/* =================================================
                PRI
            ================================================= */}

            <div className="bg-[#0E1A2B] rounded-2xl p-6 text-white relative overflow-hidden">

              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#1D4ED8]/30" />

              <div className="relative">

                <div className="flex items-center gap-2 text-[#8DA7E5] text-xs font-semibold uppercase tracking-wider">

                  <Target size={15} />

                  PRI Score

                </div>

                <div className="mt-4 flex items-end gap-2">

                  <span className="text-5xl font-semibold">
                    {safeScore}
                  </span>

                  <span className="text-white/40 text-sm mb-2">
                    / 100
                  </span>

                </div>

                <p className="text-sm text-[#8DA7E5] mt-2">
                  {getPriLabel(
                    safeScore
                  )}
                </p>

                <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">

                  <div
                    className="h-full bg-[#6B8DE3] rounded-full transition-all duration-700"
                    style={{
                      width:
                        `${safeScore}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                SKILLS EVALUATED
            ================================================= */}

            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5">

              <p className="text-xs text-[#667085]">
                Skills evaluated
              </p>

              <p className="text-3xl font-semibold text-[#0E1A2B] mt-2">
                {skills.length}
              </p>

              <p className="text-xs text-[#1F9D6E] mt-2">
                Based on your PRI components
              </p>

            </div>

            {/* =================================================
                AVERAGE
            ================================================= */}

            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5">

              <p className="text-xs text-[#667085]">
                Average skill score
              </p>

              <p className="text-3xl font-semibold text-[#0E1A2B] mt-2">
                {averageScore}%
              </p>

              <p className="text-xs text-[#1F9D6E] mt-2 flex items-center gap-1">

                <TrendingUp
                  size={13}
                />

                Overall performance

              </p>

            </div>

            {/* =================================================
                STRONG
            ================================================= */}

            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5">

              <p className="text-xs text-[#667085]">
                Strong skills
              </p>

              <p className="text-3xl font-semibold text-[#0E1A2B] mt-2">
                {strongSkills}
              </p>

              <p className="text-xs text-[#1F9D6E] mt-2">
                Score of 80% or above
              </p>

            </div>

          </div>

          {/* ==================================================
              COMPONENT BREAKDOWN
          ================================================== */}

          {!loading &&
            skills.length > 0 && (

              <div className="mb-6 bg-white border border-[#E4E7EC] rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-5">

                  <Target
                    size={18}
                    className="text-[#1D4ED8]"
                  />

                  <div>

                    <h2 className="font-semibold text-[#0E1A2B]">
                      PRI Components
                    </h2>

                    <p className="text-xs text-[#667085] mt-1">
                      Your readiness score is calculated
                      from the available performance areas.
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                  {skills.map(
                    (
                      skill,
                      index
                    ) => {

                      const score =
                        Math.min(
                          Math.max(
                            Number(
                              skill.score ||
                                0
                            ),
                            0
                          ),
                          100
                        );

                      return (
                        <div
                          key={
                            skill.key ||
                            skill.name ||
                            index
                          }
                          className="border border-[#E4E7EC] rounded-xl p-4"
                        >

                          <div className="flex items-center justify-between gap-3">

                            <span className="text-sm font-semibold text-[#101828]">
                              {
                                skill.name
                              }
                            </span>

                            <span className="text-sm font-semibold text-[#1D4ED8]">
                              {
                                score
                              }%
                            </span>

                          </div>

                          <div className="mt-3 h-2 bg-[#EEF1F7] rounded-full overflow-hidden">

                            <div
                              className="h-full bg-[#1D4ED8] rounded-full transition-all duration-700"
                              style={{
                                width:
                                  `${score}%`,
                              }}
                            />

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>
            )}

          {/* ==================================================
              SKILL GAP
          ================================================== */}

          {!loading &&
            improvementSkills > 0 && (

              <div className="mb-6 rounded-2xl border border-[#FDE2E1] bg-[#FFF7F7] p-5">

                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-lg bg-[#FEE4E2] flex items-center justify-center flex-shrink-0">

                    <AlertCircle
                      size={18}
                      className="text-[#DC2626]"
                    />

                  </div>

                  <div>

                    <h3 className="text-sm font-semibold text-[#101828]">
                      Skills that need attention
                    </h3>

                    <p className="text-xs text-[#667085] mt-1">

                      You currently have{" "}

                      {improvementSkills}

                      {" "}

                      skill
                      {improvementSkills > 1
                        ? "s"
                        : ""}

                      {" "}
                      below the recommended
                      70% level.

                    </p>

                  </div>

                </div>

              </div>
            )}

          {/* ==================================================
              SKILL ASSESSMENT
          ================================================== */}

          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6">

            <div className="flex items-center gap-2 mb-6">

              <Sparkles
                size={18}
                className="text-[#1D4ED8]"
              />

              <div>

                <h2 className="font-semibold text-[#0E1A2B]">
                  Skill Assessment
                </h2>

                <p className="text-xs text-[#667085] mt-1">
                  Dynamically calculated from your
                  Placement Readiness Index.
                </p>

              </div>

            </div>

            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (

              <div className="py-16 text-center">

                <RefreshCw
                  size={28}
                  className="mx-auto text-[#1D4ED8] animate-spin"
                />

                <p className="text-sm text-[#667085] mt-4">
                  Calculating your skills...
                </p>

              </div>
            )}

            {/* =================================================
                EMPTY
            ================================================= */}

            {!loading &&
              !error &&
              skills.length === 0 && (

                <div className="py-16 text-center">

                  <Sparkles
                    size={30}
                    className="mx-auto text-[#98A2B3]"
                  />

                  <h3 className="font-semibold text-[#101828] mt-4">
                    No skill assessment available
                  </h3>

                  <p className="text-xs text-[#667085] mt-2 max-w-md mx-auto">
                    Complete your aptitude and coding
                    assessments to generate your
                    skill profile.
                  </p>

                  <button
                    type="button"
                    onClick={fetchSkills}
                    className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition"
                  >

                    <RefreshCw size={14} />

                    Refresh

                  </button>

                </div>
              )}

            {/* =================================================
                SKILL CARDS
            ================================================= */}

            {!loading &&
              skills.length > 0 && (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {skills.map(
                    (
                      skill,
                      index
                    ) => {

                      const score =
                        Math.min(
                          Math.max(
                            Number(
                              skill.score ||
                                0
                            ),
                            0
                          ),
                          100
                        );

                      const level =
                        skill.level ||
                        getLevel(
                          score
                        );

                      return (
                        <div
                          key={
                            skill.key ||
                            skill.name ||
                            index
                          }
                          className="border border-[#E4E7EC] rounded-xl p-5 hover:border-[#B8C8F5] hover:shadow-sm transition"
                        >

                          {/* TOP */}

                          <div className="flex items-start justify-between gap-4">

                            <div className="min-w-0">

                              <h3 className="font-semibold text-[#101828]">
                                {
                                  skill.name
                                }
                              </h3>

                              <p className="text-xs text-[#98A2B3] mt-1">
                                {
                                  skill.category ||
                                  "PRI Component"
                                }
                              </p>

                            </div>

                            <div
                              className={`flex items-center gap-1 text-xs font-semibold whitespace-nowrap ${getLevelColor(
                                level
                              )}`}
                            >

                              {level ===
                              "Improve" ? (

                                <AlertCircle
                                  size={14}
                                />

                              ) : (

                                <CheckCircle2
                                  size={14}
                                />
                              )}

                              {
                                level
                              }

                            </div>

                          </div>

                          {/* PROGRESS */}

                          <div className="flex items-center gap-3 mt-5">

                            <div className="flex-1 h-2 bg-[#EEF1F7] rounded-full overflow-hidden">

                              <div
                                className={`h-full rounded-full transition-all duration-700 ${getBarColor(
                                  level
                                )}`}
                                style={{
                                  width:
                                    `${score}%`,
                                }}
                              />

                            </div>

                            <span className="text-sm font-semibold text-[#1D4ED8] w-11 text-right">
                              {
                                score
                              }%
                            </span>

                          </div>

                          {/* REASON */}

                          {skill.reason && (

                            <p className="text-[11px] text-[#667085] mt-3">
                              {
                                skill.reason
                              }
                            </p>

                          )}

                        </div>
                      );
                    }
                  )}

                </div>
              )}

          </div>

          {/* ==================================================
              RECOMMENDED ROLES
          ================================================== */}

          {!loading &&
            recommendedRoles.length > 0 && (

              <div className="mt-6 bg-white border border-[#E4E7EC] rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-1">

                  <BriefcaseBusiness
                    size={18}
                    className="text-[#1D4ED8]"
                  />

                  <h2 className="font-semibold text-[#0E1A2B]">
                    Recommended Career Roles
                  </h2>

                </div>

                <p className="text-xs text-[#667085] mb-5">
                  Roles matched against your current
                  skill profile.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  {recommendedRoles.map(
                    (
                      role,
                      index
                    ) => (

                      <div
                        key={
                          role.name ||
                          index
                        }
                        className="border border-[#E4E7EC] rounded-xl p-4 hover:border-[#B8C8F5] transition"
                      >

                        <div className="flex items-center justify-between gap-3">

                          <h3 className="font-semibold text-sm text-[#101828]">
                            {
                              role.name
                            }
                          </h3>

                          {role.matchScore !==
                            undefined &&
                            role.matchScore !==
                              null && (

                              <span className="text-xs font-semibold text-[#1D4ED8]">

                                {
                                  role.matchScore
                                }
                                %

                              </span>
                            )}

                        </div>

                        {role.description && (

                          <p className="text-xs text-[#667085] mt-2 leading-5">
                            {
                              role.description
                            }
                          </p>
                        )}

                        {Array.isArray(
                          role.missingSkills
                        ) &&
                          role.missingSkills.length >
                            0 && (

                            <div className="mt-3">

                              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#98A2B3]">
                                Skill gaps
                              </p>

                              <div className="flex flex-wrap gap-1.5 mt-2">

                                {role.missingSkills.map(
                                  (
                                    item,
                                    skillIndex
                                  ) => (

                                    <span
                                      key={`${item}-${skillIndex}`}
                                      className="px-2 py-1 rounded-md bg-[#F2F4F7] text-[10px] text-[#475467]"
                                    >
                                      {
                                        item
                                      }
                                    </span>

                                  )
                                )}

                              </div>

                            </div>
                          )}

                      </div>

                    )
                  )}

                </div>

              </div>
            )}

        </div>

      </main>

    </div>
  );
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function formatDimensionName(
  key
) {
  if (!key) {
    return "Skill";
  }

  const names = {
    aptitude: "Aptitude",
    technical: "Technical Knowledge",
    coding: "Coding",
    communication: "Communication",
    git: "Git / GitHub",
    upskilling: "Upskilling",
    consistency: "Consistency",
  };

  return (
    names[key] ||
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) =>
        char.toUpperCase()
      )
  );
}

function getSkillLevel(
  score
) {
  if (score >= 80) {
    return "Strong";
  }

  if (score >= 70) {
    return "Good";
  }

  return "Improve";
}

function getSkillReason(
  key,
  score
) {
  if (score >= 80) {
    return "Strong performance in this area.";
  }

  if (score >= 70) {
    return "Good progress. Continue practicing to strengthen this area.";
  }

  const reasons = {
    aptitude:
      "Complete more aptitude assessments and improve quantitative, logical and verbal reasoning.",

    technical:
      "Strengthen core computer science concepts and technical fundamentals.",

    coding:
      "Complete more coding assessments and practice programming problems.",

    communication:
      "Improve communication, vocabulary, grammar and interview skills.",

    git:
      "Build your GitHub profile through projects and consistent repository activity.",

    upskilling:
      "Continue learning new technologies and completing practical learning activities.",

    consistency:
      "Practice regularly and maintain consistent assessment activity.",
  };

  return (
    reasons[key] ||
    "Continue improving this area."
  );
}