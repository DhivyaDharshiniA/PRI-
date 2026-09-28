// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
//
// import {
//   Users,
//   Search,
//   RefreshCw,
//   Download,
//   TrendingUp,
//   CheckCircle2,
//   AlertCircle,
//   Eye,
//   X,
// } from "lucide-react";
//
// import PlacementSidebar from "./PlacementSidebar";
//
// const API_BASE_URL =
//   "http://localhost:8080";
//
// export default function PlacementDashboard() {
//
//   const [students, setStudents] =
//     useState([]);
//
//   const [search, setSearch] =
//     useState("");
//
//   const [loading, setLoading] =
//     useState(true);
//
//   const [refreshing, setRefreshing] =
//     useState(false);
//
//   const [error, setError] =
//     useState("");
//
//   const [selectedStudent, setSelectedStudent] =
//     useState(null);
//
//   const getToken = () => {
//     return (
//       localStorage.getItem("token") ||
//       localStorage.getItem("jwtToken") ||
//       localStorage.getItem("accessToken") ||
//       ""
//     );
//   };
//
//   // ============================================================
//   // LOAD STUDENT PRI
//   // ============================================================
//
//   const loadStudents = async () => {
//
//     try {
//
//       setError("");
//
//       const token =
//         getToken();
//
//       const response =
//         await fetch(
//           `${API_BASE_URL}/api/placement/students/pri`,
//           {
//             method: "GET",
//
//             headers: {
//               "Content-Type":
//                 "application/json",
//
//               ...(token
//                 ? {
//                     Authorization:
//                       `Bearer ${token}`,
//                   }
//                 : {}),
//             },
//           }
//         );
//
//       if (!response.ok) {
//
//         throw new Error(
//           `Failed to load student PRI. Status: ${response.status}`
//         );
//       }
//
//       const data =
//         await response.json();
//
//       if (!Array.isArray(data)) {
//
//         throw new Error(
//           "Invalid PRI response from backend."
//         );
//       }
//
//       const formatted =
//         data.map((student) => {
//
//           const pri =
//             Number(
//               student.priScore ?? 0
//             );
//
//           return {
//
//             studentId:
//               student.studentId,
//
//             priScore:
//               pri,
//
//             level:
//               student.level ||
//               getPriLevel(pri),
//
//             placementReady:
//               student.placementReady === true,
//
//             totalTests:
//               Number(
//                 student.totalTests ?? 0
//               ),
//
//             aptitudeTests:
//               Number(
//                 student.aptitudeTests ?? 0
//               ),
//
//             codingTests:
//               Number(
//                 student.codingTests ?? 0
//               ),
//           };
//         });
//
//       setStudents(formatted);
//
//     } catch (err) {
//
//       console.error(
//         "Placement PRI error:",
//         err
//       );
//
//       setError(
//         err.message ||
//           "Unable to load student PRI."
//       );
//
//       setStudents([]);
//
//     } finally {
//
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };
//
//   // ============================================================
//   // INITIAL LOAD
//   // ============================================================
//
//   useEffect(() => {
//     loadStudents();
//   }, []);
//
//   // ============================================================
//   // REFRESH
//   // ============================================================
//
//   const handleRefresh = () => {
//
//     setRefreshing(true);
//
//     loadStudents();
//   };
//
//   // ============================================================
//   // SEARCH
//   // ============================================================
//
//   const filteredStudents =
//     useMemo(() => {
//
//       const query =
//         search
//           .trim()
//           .toLowerCase();
//
//       if (!query) {
//         return students;
//       }
//
//       return students.filter(
//         (student) =>
//           String(
//             student.studentId
//           )
//             .toLowerCase()
//             .includes(query)
//       );
//
//     }, [students, search]);
//
//   // ============================================================
//   // STATISTICS
//   // ============================================================
//
//   const statistics =
//     useMemo(() => {
//
//       const total =
//         students.length;
//
//       const ready =
//         students.filter(
//           (student) =>
//             student.placementReady
//         ).length;
//
//       const improvement =
//         total - ready;
//
//       const average =
//         total === 0
//           ? 0
//           : students.reduce(
//               (sum, student) =>
//                 sum +
//                 Number(
//                   student.priScore || 0
//                 ),
//               0
//             ) / total;
//
//       return {
//         total,
//         ready,
//         improvement,
//         average,
//       };
//
//     }, [students]);
//
//   // ============================================================
//   // DOWNLOAD ALL PRI
//   // ============================================================
//
//   const downloadAllPRI = () => {
//
//     if (students.length === 0) {
//
//       alert(
//         "No student PRI data available."
//       );
//
//       return;
//     }
//
//     const headers = [
//       "Student ID",
//       "PRI Score",
//       "PRI Level",
//       "Placement Ready",
//       "Total Tests",
//       "Aptitude Tests",
//       "Coding Tests",
//     ];
//
//     const rows =
//       students.map(
//         (student) => [
//           student.studentId,
//
//           Number(
//             student.priScore || 0
//           ).toFixed(1),
//
//           student.level,
//
//           student.placementReady
//             ? "Yes"
//             : "No",
//
//           student.totalTests,
//
//           student.aptitudeTests,
//
//           student.codingTests,
//         ]
//       );
//
//     const csv =
//       createCSV(
//         headers,
//         rows
//       );
//
//     downloadFile(
//       csv,
//       `Placement_PRI_${getDateString()}.csv`
//     );
//   };
//
//   // ============================================================
//   // DOWNLOAD SINGLE PRI
//   // ============================================================
//
//   const downloadStudentPRI =
//     (student) => {
//
//       const headers = [
//         "Student ID",
//         "PRI Score",
//         "PRI Level",
//         "Placement Ready",
//         "Total Tests",
//         "Aptitude Tests",
//         "Coding Tests",
//       ];
//
//       const rows = [
//         [
//           student.studentId,
//
//           Number(
//             student.priScore || 0
//           ).toFixed(1),
//
//           student.level,
//
//           student.placementReady
//             ? "Yes"
//             : "No",
//
//           student.totalTests,
//
//           student.aptitudeTests,
//
//           student.codingTests,
//         ],
//       ];
//
//       const csv =
//         createCSV(
//           headers,
//           rows
//         );
//
//       downloadFile(
//         csv,
//         `Student_${student.studentId}_PRI.csv`
//       );
//     };
//
//   // ============================================================
//   // UI
//   // ============================================================
//
//   return (
//     <div className="min-h-screen bg-slate-50">
//
//       {/* ======================================================
//           PLACEMENT SIDEBAR
//       ====================================================== */}
//
//       <PlacementSidebar />
//
//       {/* ======================================================
//           MAIN CONTENT
//       ====================================================== */}
//
//       <main className="min-h-screen lg:ml-[270px]">
//
//         {/* HEADER */}
//
//         <header className="border-b border-slate-200 bg-white">
//
//           <div className="px-6 py-5">
//
//             <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//
//               <div>
//
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Placement Dashboard
//                 </h1>
//
//                 <p className="mt-1 text-sm text-slate-500">
//                   View the live Placement
//                   Readiness Index of every
//                   student.
//                 </p>
//
//               </div>
//
//               <div className="flex gap-3">
//
//                 <button
//                   onClick={
//                     handleRefresh
//                   }
//                   disabled={
//                     refreshing
//                   }
//                   className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
//                 >
//
//                   <RefreshCw
//                     size={17}
//                     className={
//                       refreshing
//                         ? "animate-spin"
//                         : ""
//                     }
//                   />
//
//                   {refreshing
//                     ? "Refreshing..."
//                     : "Refresh"}
//
//                 </button>
//
//                 <button
//                   onClick={
//                     downloadAllPRI
//                   }
//                   disabled={
//                     students.length ===
//                     0
//                   }
//                   className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
//                 >
//
//                   <Download
//                     size={17}
//                   />
//
//                   Download PRI
//
//                 </button>
//
//               </div>
//
//             </div>
//
//           </div>
//
//         </header>
//
//         <div className="p-6">
//
//           {/* ERROR */}
//
//           {error && (
//
//             <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
//
//               <AlertCircle
//                 size={20}
//               />
//
//               <div>
//
//                 <p className="font-semibold">
//                   Unable to load PRI
//                 </p>
//
//                 <p className="mt-1 text-sm">
//                   {error}
//                 </p>
//
//               </div>
//
//             </div>
//           )}
//
//           {/* STATISTICS */}
//
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
//
//             <StatCard
//               icon={
//                 <Users size={21} />
//               }
//               title="Total Students"
//               value={
//                 statistics.total
//               }
//               description="Students evaluated"
//             />
//
//             <StatCard
//               icon={
//                 <CheckCircle2
//                   size={21}
//                 />
//               }
//               title="Placement Ready"
//               value={
//                 statistics.ready
//               }
//               description="PRI ≥ 70"
//             />
//
//             <StatCard
//               icon={
//                 <AlertCircle
//                   size={21}
//                 />
//               }
//               title="Needs Improvement"
//               value={
//                 statistics.improvement
//               }
//               description="PRI below 70"
//             />
//
//             <StatCard
//               icon={
//                 <TrendingUp
//                   size={21}
//                 />
//               }
//               title="Average PRI"
//               value={statistics.average.toFixed(
//                 1
//               )}
//               description="Current average"
//             />
//
//           </div>
//
//           {/* SEARCH */}
//
//           <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
//
//             <div className="relative max-w-md">
//
//               <Search
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />
//
//               <input
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(
//                     e.target.value
//                   )
//                 }
//                 placeholder="Search by Student ID..."
//                 className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//               />
//
//             </div>
//
//           </div>
//
//           {/* TABLE */}
//
//           <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
//
//             <div className="overflow-x-auto">
//
//               <table className="w-full min-w-[850px]">
//
//                 <thead className="bg-slate-50">
//
//                   <tr className="border-b border-slate-200">
//
//                     <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                       Student ID
//                     </th>
//
//                     <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
//                       PRI Score
//                     </th>
//
//                     <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
//                       Level
//                     </th>
//
//                     <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
//                       Readiness
//                     </th>
//
//                     <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
//                       Total Tests
//                     </th>
//
//                     <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
//                       Action
//                     </th>
//
//                   </tr>
//
//                 </thead>
//
//                 <tbody className="divide-y divide-slate-100">
//
//                   {loading ? (
//
//                     <LoadingRows />
//
//                   ) : filteredStudents.length ===
//                     0 ? (
//
//                     <tr>
//
//                       <td
//                         colSpan="6"
//                         className="px-6 py-14 text-center"
//                       >
//
//                         <Users
//                           size={40}
//                           className="mx-auto text-slate-300"
//                         />
//
//                         <p className="mt-3 font-semibold text-slate-700">
//                           No students found
//                         </p>
//
//                         <p className="mt-1 text-sm text-slate-500">
//                           No PRI data is
//                           currently available.
//                         </p>
//
//                       </td>
//
//                     </tr>
//
//                   ) : (
//
//                     filteredStudents.map(
//                       (student) => (
//
//                         <StudentRow
//                           key={
//                             student.studentId
//                           }
//                           student={
//                             student
//                           }
//                           onView={() =>
//                             setSelectedStudent(
//                               student
//                             )
//                           }
//                           onDownload={() =>
//                             downloadStudentPRI(
//                               student
//                             )
//                           }
//                         />
//
//                       )
//                     )
//
//                   )}
//
//                 </tbody>
//
//               </table>
//
//             </div>
//
//           </div>
//
//           {/* NOTE */}
//
//           <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
//
//             <strong>
//               PRI source:
//             </strong>{" "}
//             This dashboard uses the same
//             StudentPriService calculation
//             used by the Student Skills
//             page. No separate PRI is stored
//             or calculated in Placement.
//
//           </div>
//
//         </div>
//
//       </main>
//
//       {/* DETAILS */}
//
//       {selectedStudent && (
//
//         <StudentDetailsModal
//           student={
//             selectedStudent
//           }
//           onClose={() =>
//             setSelectedStudent(null)
//           }
//           onDownload={() =>
//             downloadStudentPRI(
//               selectedStudent
//             )
//           }
//         />
//
//       )}
//
//     </div>
//   );
// }
//
// /* ============================================================
//    STAT CARD
// ============================================================ */
//
// function StatCard({
//   icon,
//   title,
//   value,
//   description,
// }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
//
//       <div className="flex items-start justify-between">
//
//         <div>
//
//           <p className="text-sm font-medium text-slate-500">
//             {title}
//           </p>
//
//           <p className="mt-2 text-3xl font-bold text-slate-900">
//             {value}
//           </p>
//
//           <p className="mt-1 text-xs text-slate-400">
//             {description}
//           </p>
//
//         </div>
//
//         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
//           {icon}
//         </div>
//
//       </div>
//
//     </div>
//   );
// }
//
// /* ============================================================
//    STUDENT ROW
// ============================================================ */
//
// function StudentRow({
//   student,
//   onView,
//   onDownload,
// }) {
//   const score =
//     Number(
//       student.priScore || 0
//     );
//
//   return (
//     <tr className="hover:bg-slate-50">
//
//       <td className="px-5 py-4">
//
//         <div className="flex items-center gap-3">
//
//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
//             {String(
//               student.studentId
//             ).slice(-2)}
//           </div>
//
//           <div>
//
//             <p className="font-semibold text-slate-800">
//               Student
//             </p>
//
//             <p className="text-sm text-slate-500">
//               ID:{" "}
//               {student.studentId}
//             </p>
//
//           </div>
//
//         </div>
//
//       </td>
//
//       <td className="px-5 py-4 text-center">
//
//         <div className="inline-flex flex-col items-center">
//
//           <span
//             className={`text-xl font-bold ${getPriTextColor(
//               score
//             )}`}
//           >
//             {score.toFixed(1)}
//           </span>
//
//           <div className="mt-1 h-1.5 w-20 rounded-full bg-slate-200">
//
//             <div
//               className={`h-full rounded-full ${getPriBarColor(
//                 score
//               )}`}
//               style={{
//                 width: `${Math.min(
//                   Math.max(
//                     score,
//                     0
//                   ),
//                   100
//                 )}%`,
//               }}
//             />
//
//           </div>
//
//         </div>
//
//       </td>
//
//       <td className="px-5 py-4 text-center">
//
//         <span
//           className={`rounded-full px-3 py-1 text-xs font-semibold ${getLevelBadge(
//             student.level
//           )}`}
//         >
//           {student.level}
//         </span>
//
//       </td>
//
//       <td className="px-5 py-4 text-center">
//
//         {student.placementReady ? (
//
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
//
//             <CheckCircle2
//               size={14}
//             />
//
//             Ready
//
//           </span>
//
//         ) : (
//
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
//
//             <AlertCircle
//               size={14}
//             />
//
//             Improve
//
//           </span>
//
//         )}
//
//       </td>
//
//       <td className="px-5 py-4 text-center font-semibold text-slate-700">
//         {student.totalTests}
//       </td>
//
//       <td className="px-5 py-4">
//
//         <div className="flex justify-end gap-2">
//
//           <button
//             onClick={onView}
//             className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100"
//             title="View"
//           >
//             <Eye size={16} />
//           </button>
//
//           <button
//             onClick={onDownload}
//             className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
//             title="Download PRI"
//           >
//             <Download size={16} />
//           </button>
//
//         </div>
//
//       </td>
//
//     </tr>
//   );
// }
//
// /* ============================================================
//    MODAL
// ============================================================ */
//
// function StudentDetailsModal({
//   student,
//   onClose,
//   onDownload,
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//
//       <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
//
//         <div className="flex items-center justify-between border-b border-slate-200 p-5">
//
//           <div>
//
//             <h2 className="text-xl font-bold text-slate-900">
//               Student PRI
//             </h2>
//
//             <p className="text-sm text-slate-500">
//               Student ID:{" "}
//               {student.studentId}
//             </p>
//
//           </div>
//
//           <button
//             onClick={onClose}
//             className="rounded-lg p-2 hover:bg-slate-100"
//           >
//             <X size={20} />
//           </button>
//
//         </div>
//
//         <div className="p-6">
//
//           <div className="rounded-xl bg-slate-50 p-6 text-center">
//
//             <p className="text-sm text-slate-500">
//               Placement Readiness
//               Index
//             </p>
//
//             <p
//               className={`mt-2 text-5xl font-bold ${getPriTextColor(
//                 student.priScore
//               )}`}
//             >
//               {Number(
//                 student.priScore || 0
//               ).toFixed(1)}
//             </p>
//
//             <span
//               className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getLevelBadge(
//                 student.level
//               )}`}
//             >
//               {student.level}
//             </span>
//
//           </div>
//
//           <div className="mt-5 grid grid-cols-3 gap-3">
//
//             <InfoBox
//               label="Total Tests"
//               value={
//                 student.totalTests
//               }
//             />
//
//             <InfoBox
//               label="Aptitude"
//               value={
//                 student.aptitudeTests
//               }
//             />
//
//             <InfoBox
//               label="Coding"
//               value={
//                 student.codingTests
//               }
//             />
//
//           </div>
//
//           <div className="mt-5 rounded-lg border border-slate-200 p-4">
//
//             <p className="text-sm text-slate-500">
//               Placement Readiness
//             </p>
//
//             <p className="mt-1 font-semibold">
//
//               {student.placementReady
//                 ? "Ready for placement"
//                 : "Needs improvement"}
//
//             </p>
//
//           </div>
//
//           <div className="mt-6 flex justify-end gap-3">
//
//             <button
//               onClick={onClose}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
//             >
//               Close
//             </button>
//
//             <button
//               onClick={onDownload}
//               className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//             >
//               <Download
//                 size={17}
//               />
//
//               Download PRI
//             </button>
//
//           </div>
//
//         </div>
//
//       </div>
//
//     </div>
//   );
// }
//
// /* ============================================================
//    INFO BOX
// ============================================================ */
//
// function InfoBox({
//   label,
//   value,
// }) {
//   return (
//     <div className="rounded-lg border border-slate-200 p-3">
//
//       <p className="text-xs text-slate-400">
//         {label}
//       </p>
//
//       <p className="mt-1 font-semibold text-slate-800">
//         {value}
//       </p>
//
//     </div>
//   );
// }
//
// /* ============================================================
//    LOADING
// ============================================================ */
//
// function LoadingRows() {
//   return (
//     <>
//       {Array.from({
//         length: 5,
//       }).map((_, index) => (
//         <tr key={index}>
//
//           <td
//             colSpan="6"
//             className="px-5 py-5"
//           >
//             <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
//           </td>
//
//         </tr>
//       ))}
//     </>
//   );
// }
//
// /* ============================================================
//    CSV
// ============================================================ */
//
// function createCSV(
//   headers,
//   rows
// ) {
//   const escapeCSV =
//     (value) => {
//       const text =
//         value === null ||
//         value === undefined
//           ? ""
//           : String(value);
//
//       return `"${text.replace(
//         /"/g,
//         '""'
//       )}"`;
//     };
//
//   return (
//     "\uFEFF" +
//     [
//       headers
//         .map(escapeCSV)
//         .join(","),
//
//       ...rows.map(
//         (row) =>
//           row
//             .map(
//               escapeCSV
//             )
//             .join(",")
//       ),
//     ].join("\n")
//   );
// }
//
// function downloadFile(
//   content,
//   fileName
// ) {
//   const blob =
//     new Blob(
//       [content],
//       {
//         type:
//           "text/csv;charset=utf-8;",
//       }
//     );
//
//   const url =
//     URL.createObjectURL(
//       blob
//     );
//
//   const link =
//     document.createElement(
//       "a"
//     );
//
//   link.href = url;
//   link.download =
//     fileName;
//
//   document.body.appendChild(
//     link
//   );
//
//   link.click();
//
//   document.body.removeChild(
//     link
//   );
//
//   URL.revokeObjectURL(
//     url
//   );
// }
//
// function getDateString() {
//   return new Date()
//     .toISOString()
//     .split("T")[0];
// }
//
// /* ============================================================
//    PRI HELPERS
// ============================================================ */
//
// function getPriLevel(
//   score
// ) {
//   const value =
//     Number(score || 0);
//
//   if (value >= 80)
//     return "Strong";
//
//   if (value >= 70)
//     return "Good";
//
//   if (value >= 50)
//     return "Developing";
//
//   return "Needs Improvement";
// }
//
// function getPriTextColor(
//   score
// ) {
//   const value =
//     Number(score || 0);
//
//   if (value >= 80)
//     return "text-emerald-600";
//
//   if (value >= 70)
//     return "text-blue-600";
//
//   if (value >= 50)
//     return "text-amber-600";
//
//   return "text-red-600";
// }
//
// function getPriBarColor(
//   score
// ) {
//   const value =
//     Number(score || 0);
//
//   if (value >= 80)
//     return "bg-emerald-500";
//
//   if (value >= 70)
//     return "bg-blue-500";
//
//   if (value >= 50)
//     return "bg-amber-500";
//
//   return "bg-red-500";
// }
//
// function getLevelBadge(
//   level
// ) {
//   const value =
//     String(
//       level || ""
//     ).toLowerCase();
//
//   if (
//     value.includes(
//       "strong"
//     )
//   ) {
//     return "bg-emerald-50 text-emerald-700";
//   }
//
//   if (
//     value.includes(
//       "good"
//     )
//   ) {
//     return "bg-blue-50 text-blue-700";
//   }
//
//   if (
//     value.includes(
//       "develop"
//     )
//   ) {
//     return "bg-amber-50 text-amber-700";
//   }
//
//   return "bg-red-50 text-red-700";
// }

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Users,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText,
  ClipboardList,
  Code2,
  BarChart3,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import PlacementSidebar from "./PlacementSidebar";

const API_BASE_URL =
  "http://localhost:8080";

export default function PlacementDashboard() {
  const navigate =
    useNavigate();

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("jwtToken") ||
      localStorage.getItem("accessToken") ||
      ""
    );
  };

  // ============================================================
  // LOAD LIVE PLACEMENT DATA
  // ============================================================

  const loadDashboard = async () => {
    try {
      setError("");

      const token =
        getToken();

      const response =
        await fetch(
          `${API_BASE_URL}/api/placement/students/pri`,
          {
            method: "GET",
            headers: {
              "Content-Type":
                "application/json",

              ...(token
                ? {
                    Authorization:
                      `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

      if (!response.ok) {
        throw new Error(
          `Unable to load dashboard. Status: ${response.status}`
        );
      }

      const data =
        await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid dashboard response."
        );
      }

      const formatted =
        data.map((student) => {
          const pri =
            Number(
              student.priScore ??
                student.overallScore ??
                student.pri ??
                student.score ??
                0
            );

          return {
            studentId:
              student.studentId ??
              student.id ??
              "",

            studentName:
              student.studentName ??
              student.fullName ??
              student.name ??
              "Student",

            priScore:
              pri,

            level:
              student.level ??
              getPriLevel(pri),

            placementReady:
              student.placementReady === true ||
              pri >= 70,

            totalTests:
              Number(
                student.totalTests ?? 0
              ),
          };
        });

      setStudents(
        formatted
      );
    } catch (err) {
      console.error(
        "Placement Dashboard Error:",
        err
      );

      setError(
        err.message ||
          "Unable to load dashboard."
      );

      setStudents([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleRefresh =
    () => {
      setRefreshing(true);
      loadDashboard();
    };

  // ============================================================
  // STATISTICS
  // ============================================================

  const statistics =
    useMemo(() => {
      const total =
        students.length;

      const ready =
        students.filter(
          (student) =>
            student.placementReady
        ).length;

      const improvement =
        total - ready;

      const average =
        total === 0
          ? 0
          : students.reduce(
              (sum, student) =>
                sum +
                Number(
                  student.priScore ||
                    0
                ),
              0
            ) / total;

      const strong =
        students.filter(
          (student) =>
            Number(
              student.priScore
            ) >= 80
        ).length;

      return {
        total,
        ready,
        improvement,
        average,
        strong,
      };
    }, [students]);

  // ============================================================
  // RECENT STUDENTS
  // ============================================================

  const recentStudents =
    useMemo(() => {
      return [...students]
        .sort(
          (a, b) =>
            Number(
              b.priScore || 0
            ) -
            Number(
              a.priScore || 0
            )
        )
        .slice(0, 5);
    }, [students]);

  return (
    <div className="min-h-screen bg-[#F4F6FB]">

      <PlacementSidebar />

      <main className="min-h-screen md:ml-64">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="border-b border-slate-200 bg-white">

          <div className="px-6 py-6 lg:px-8">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <p className="text-sm font-semibold text-[#3D6EFF]">
                  Placement Cell
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0B1D42]">
                  Placement Dashboard
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor student readiness,
                  assessments and placement
                  progress from one place.
                </p>

              </div>

              <button
                onClick={
                  handleRefresh
                }
                disabled={
                  refreshing
                }
                className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 lg:self-auto"
              >

                <RefreshCw
                  size={17}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}

              </button>

            </div>

          </div>

        </header>

        <div className="p-6 lg:p-8">

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

              <div className="flex items-start gap-3">

                <AlertCircle
                  size={20}
                />

                <div>

                  <p className="font-semibold">
                    Unable to load dashboard
                  </p>

                  <p className="mt-1 text-sm">
                    {error}
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* ==================================================
              OVERVIEW CARDS
          ================================================== */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <DashboardCard
              icon={
                <Users
                  size={21}
                />
              }
              title="Total Students"
              value={
                loading
                  ? "—"
                  : statistics.total
              }
              description="Students evaluated"
            />

            <DashboardCard
              icon={
                <CheckCircle2
                  size={21}
                />
              }
              title="Placement Ready"
              value={
                loading
                  ? "—"
                  : statistics.ready
              }
              description="PRI ≥ 70"
            />

            <DashboardCard
              icon={
                <TrendingUp
                  size={21}
                />
              }
              title="Average PRI"
              value={
                loading
                  ? "—"
                  : statistics.average.toFixed(
                      1
                    )
              }
              description="Current student average"
            />

            <DashboardCard
              icon={
                <AlertCircle
                  size={21}
                />
              }
              title="Needs Improvement"
              value={
                loading
                  ? "—"
                  : statistics.improvement
              }
              description="Students below readiness"
            />

          </div>

          {/* ==================================================
              MAIN GRID
          ================================================== */}

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

            {/* ================================================
                READINESS OVERVIEW
            ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="font-semibold text-slate-900">
                    Placement Readiness Overview
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Current readiness distribution
                    based on live PRI scores.
                  </p>

                </div>

                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                  <BarChart3
                    size={20}
                  />
                </div>

              </div>

              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-3">

                <ReadinessBox
                  title="Strong"
                  value={
                    loading
                      ? "—"
                      : statistics.strong
                  }
                  subtitle="PRI ≥ 80"
                  type="strong"
                />

                <ReadinessBox
                  title="Placement Ready"
                  value={
                    loading
                      ? "—"
                      : statistics.ready
                  }
                  subtitle="PRI ≥ 70"
                  type="ready"
                />

                <ReadinessBox
                  title="Needs Improvement"
                  value={
                    loading
                      ? "—"
                      : statistics.improvement
                  }
                  subtitle="PRI < 70"
                  type="improve"
                />

              </div>

              <div className="mt-7">

                <div className="mb-2 flex items-center justify-between text-sm">

                  <span className="font-medium text-slate-600">
                    Placement readiness rate
                  </span>

                  <span className="font-bold text-slate-900">
                    {statistics.total ===
                    0
                      ? "0%"
                      : `${Math.round(
                          (statistics.ready /
                            statistics.total) *
                            100
                        )}%`}
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-[#3D6EFF] transition-all"
                    style={{
                      width:
                        statistics.total ===
                        0
                          ? "0%"
                          : `${Math.min(
                              (statistics.ready /
                                statistics.total) *
                                100,
                              100
                            )}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* ================================================
                QUICK ACTIONS
            ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-semibold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Common placement cell tasks.
              </p>

              <div className="mt-5 space-y-3">

                <QuickAction
                  icon={
                    <ClipboardList
                      size={19}
                    />
                  }
                  title="Publish Aptitude Test"
                  description="Create a new assessment"
                  onClick={() =>
                    navigate(
                      "/placement/aptitude-tests/publish"
                    )
                  }
                />

                <QuickAction
                  icon={
                    <Code2
                      size={19}
                    />
                  }
                  title="Publish Coding Test"
                  description="Create coding assessment"
                  onClick={() =>
                    navigate(
                      "/placement/coding-tests/publish"
                    )
                  }
                />

                <QuickAction
                  icon={
                    <FileText
                      size={19}
                    />
                  }
                  title="View Reports"
                  description="Student PRI and exports"
                  onClick={() =>
                    navigate(
                      "/placement/reports"
                    )
                  }
                />

                <QuickAction
                  icon={
                    <BarChart3
                      size={19}
                    />
                  }
                  title="Department Statistics"
                  description="Analyze assessment data"
                  onClick={() =>
                    navigate(
                      "/placement/stats"
                    )
                  }
                />

              </div>

            </div>

          </div>

          {/* ==================================================
              TOP STUDENTS
          ================================================== */}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="font-semibold text-slate-900">
                  Student Readiness Snapshot
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Students with the highest current
                  PRI scores.
                </p>

              </div>

              <button
                onClick={() =>
                  navigate(
                    "/placement/reports"
                  )
                }
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3D6EFF] hover:underline"
              >
                View full report
                <ArrowRight
                  size={16}
                />
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead className="bg-slate-50">

                  <tr className="border-b border-slate-200">

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Student
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      PRI
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Level
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tests
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {loading ? (
                    <DashboardLoading />
                  ) : recentStudents.length ===
                    0 ? (
                    <tr>

                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center"
                      >

                        <Users
                          size={36}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 font-semibold text-slate-700">
                          No student data
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Student readiness data
                          will appear here.
                        </p>

                      </td>

                    </tr>
                  ) : (
                    recentStudents.map(
                      (student) => (
                        <tr
                          key={
                            student.studentId
                          }
                          className="hover:bg-slate-50"
                        >

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                                {getInitials(
                                  student.studentName
                                )}
                              </div>

                              <div>

                                <p className="font-semibold text-slate-800">
                                  {
                                    student.studentName
                                  }
                                </p>

                                <p className="text-xs text-slate-400">
                                  ID:{" "}
                                  {
                                    student.studentId
                                  }
                                </p>

                              </div>

                            </div>

                          </td>

                          <td className="px-6 py-4 text-center">

                            <span
                              className={`text-lg font-bold ${getPriTextColor(
                                student.priScore
                              )}`}
                            >
                              {Number(
                                student.priScore ||
                                  0
                              ).toFixed(1)}
                            </span>

                          </td>

                          <td className="px-6 py-4 text-center">

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getLevelBadge(
                                student.level
                              )}`}
                            >
                              {
                                student.level
                              }
                            </span>

                          </td>

                          <td className="px-6 py-4 text-center">

                            {student.placementReady ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">

                                <CheckCircle2
                                  size={14}
                                />

                                Ready

                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">

                                <AlertCircle
                                  size={14}
                                />

                                Improve

                              </span>
                            )}

                          </td>

                          <td className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                            {
                              student.totalTests
                            }
                          </td>

                        </tr>
                      )
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* ==================================================
              BOTTOM INFORMATION
          ================================================== */}

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <div className="flex items-start gap-3">

              <TrendingUp
                size={20}
                className="mt-0.5 text-blue-600"
              />

              <div>

                <p className="font-semibold text-blue-900">
                  Live placement intelligence
                </p>

                <p className="mt-1 text-sm leading-6 text-blue-700">
                  Student readiness is calculated
                  dynamically from the existing
                  StudentPriService. Use the Reports
                  page when you need the complete
                  student-wise PRI report or an export.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

/* ==============================================================
   DASHBOARD CARD
============================================================== */

function DashboardCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

/* ==============================================================
   READINESS BOX
============================================================== */

function ReadinessBox({
  title,
  value,
  subtitle,
  type,
}) {
  const styles = {
    strong:
      "border-emerald-100 bg-emerald-50 text-emerald-700",

    ready:
      "border-blue-100 bg-blue-50 text-blue-700",

    improve:
      "border-amber-100 bg-amber-50 text-amber-700",
  };

  return (
    <div
      className={`rounded-xl border p-5 ${styles[type]}`}
    >

      <p className="text-sm font-semibold">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs opacity-75">
        {subtitle}
      </p>

    </div>
  );
}

/* ==============================================================
   QUICK ACTION
============================================================== */

function QuickAction({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-blue-100 group-hover:text-blue-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-500">
          {description}
        </p>

      </div>

      <ArrowRight
        size={16}
        className="text-slate-300 transition group-hover:text-blue-500"
      />

    </button>
  );
}

/* ==============================================================
   LOADING
============================================================== */

function DashboardLoading() {
  return (
    <>
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <tr key={index}>
          <td
            colSpan="5"
            className="px-6 py-4"
          >
            <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
          </td>
        </tr>
      ))}
    </>
  );
}

/* ==============================================================
   HELPERS
============================================================== */

function getInitials(name) {
  if (!name) return "S";

  const parts =
    String(name)
      .trim()
      .split(/\s+/);

  if (parts.length === 1) {
    return parts[0]
      .substring(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[
      parts.length - 1
    ][0]
  ).toUpperCase();
}

function getPriLevel(score) {
  const value =
    Number(score || 0);

  if (value >= 80)
    return "Strong";

  if (value >= 70)
    return "Good";

  if (value >= 50)
    return "Developing";

  return "Needs Improvement";
}

function getPriTextColor(score) {
  const value =
    Number(score || 0);

  if (value >= 80)
    return "text-emerald-600";

  if (value >= 70)
    return "text-blue-600";

  if (value >= 50)
    return "text-amber-600";

  return "text-red-600";
}

function getLevelBadge(level) {
  const value =
    String(
      level || ""
    ).toLowerCase();

  if (
    value.includes("strong")
  ) {
    return "bg-emerald-50 text-emerald-700";
  }

  if (
    value.includes("good")
  ) {
    return "bg-blue-50 text-blue-700";
  }

  if (
    value.includes("develop")
  ) {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-red-50 text-red-700";
}