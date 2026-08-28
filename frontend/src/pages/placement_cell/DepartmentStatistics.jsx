// import React, { useEffect, useMemo, useState } from "react";
// import {
//   BarChart3,
//   Users,
//   ClipboardList,
//   CheckCircle2,
//   Eye,
//   Search,
//   Filter,
//   ArrowLeft,
//   Loader2,
//   RefreshCw,
//   XCircle,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
//
// const API_BASE_URL = "http://localhost:8080/api";
//
// export default function DepartmentStatistics() {
//   const navigate = useNavigate();
//
//   const [tests, setTests] = useState([]);
//
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState("");
//
//   const [department, setDepartment] =
//     useState("All Departments");
//
//   const [type, setType] =
//     useState("All Types");
//
//   const [search, setSearch] = useState("");
//
//   /*
//    * =========================================================
//    * AUTH HEADER
//    * =========================================================
//    */
//
//   const getHeaders = () => {
//     const token = localStorage.getItem("token");
//
//     return {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };
//   };
//
//
//   /*
//    * =========================================================
//    * FORMAT DATE
//    * =========================================================
//    */
//
//   const formatDate = (date) => {
//     if (!date || date === "-") {
//       return "-";
//     }
//
//     try {
//       return new Date(date).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
//     } catch {
//       return date;
//     }
//   };
//
//
//   /*
//    * =========================================================
//    * FETCH ALL TESTS
//    * =========================================================
//    *
//    * Coding:
//    * GET /api/placement/coding-tests
//    *
//    * Aptitude:
//    * GET /api/admin/aptitude-tests
//    *
//    */
//
//   const fetchStatistics = async (isRefresh = false) => {
//     try {
//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }
//
//       setError("");
//
//       const headers = getHeaders();
//
//       /*
//        * Fetch coding and aptitude tests together.
//        */
//       const [codingResponse, aptitudeResponse] =
//         await Promise.allSettled([
//           axios.get(
//             `${API_BASE_URL}/placement/coding-tests`,
//             { headers }
//           ),
//
//           axios.get(
//             `${API_BASE_URL}/admin/aptitude-tests`,
//             { headers }
//           ),
//         ]);
//
//
//       /*
//        * =====================================================
//        * CODING TESTS
//        * =====================================================
//        */
//
//       let codingTests = [];
//
//       if (
//         codingResponse.status === "fulfilled"
//       ) {
//         const data =
//           codingResponse.value.data;
//
//         codingTests = Array.isArray(data)
//           ? data
//           : data?.tests || [];
//       }
//
//
//       /*
//        * =====================================================
//        * APTITUDE TESTS
//        * =====================================================
//        */
//
//       let aptitudeTests = [];
//
//       if (
//         aptitudeResponse.status === "fulfilled"
//       ) {
//         const data =
//           aptitudeResponse.value.data;
//
//         aptitudeTests = Array.isArray(data)
//           ? data
//           : data?.tests || [];
//       }
//
//
//       /*
//        * =====================================================
//        * CODING STATISTICS
//        * =====================================================
//        */
//
//       const codingStatistics =
//         await Promise.all(
//           codingTests.map(async (test) => {
//
//             let results = [];
//
//             try {
//               const response =
//                 await axios.get(
//                   `${API_BASE_URL}/placement/coding-tests/${test.id}/results`,
//                   { headers }
//                 );
//
//               results =
//                 Array.isArray(response.data)
//                   ? response.data
//                   : response.data?.results || [];
//
//             } catch (err) {
//               console.error(
//                 `Coding results failed for ${test.id}`,
//                 err
//               );
//             }
//
//
//             /*
//              * Try different possible backend
//              * property names.
//              */
//             const registered =
//               Number(
//                 test.registeredStudents ??
//                 test.registered ??
//                 test.totalRegistered ??
//                 test.assignedStudents ??
//                 test.totalStudents ??
//                 0
//               );
//
//
//             const attended =
//               Number(
//                 test.attendedStudents ??
//                 test.attended ??
//                 test.totalAttended ??
//                 test.submittedStudents ??
//                 test.totalSubmissions ??
//                 results.length
//               );
//
//
//             return {
//               id: test.id,
//
//               testName:
//                 test.testName ??
//                 test.title ??
//                 test.name ??
//                 `Coding Test #${test.id}`,
//
//               type: "Coding",
//
//               department:
//                 test.department ??
//                 test.branch ??
//                 test.dept ??
//                 "All Departments",
//
//               date: formatDate(
//                 test.testDate ??
//                 test.date ??
//                 test.createdAt
//               ),
//
//               registered,
//
//               attended,
//
//               absent: Math.max(
//                 registered - attended,
//                 0
//               ),
//
//               results,
//
//               resultPath:
//                 `/placement/coding-tests/${test.id}/results`,
//             };
//           })
//         );
//
//
//       /*
//        * =====================================================
//        * APTITUDE STATISTICS
//        * =====================================================
//        */
//
//       const aptitudeStatistics =
//         await Promise.all(
//           aptitudeTests.map(async (test) => {
//
//             let results = [];
//
//             try {
//               const response =
//                 await axios.get(
//                   `${API_BASE_URL}/admin/aptitude-tests/${test.id}/results`,
//                   { headers }
//                 );
//
//               results =
//                 Array.isArray(response.data)
//                   ? response.data
//                   : response.data?.results || [];
//
//             } catch (err) {
//               console.error(
//                 `Aptitude results failed for ${test.id}`,
//                 err
//               );
//             }
//
//
//             const registered =
//               Number(
//                 test.registeredStudents ??
//                 test.registered ??
//                 test.totalRegistered ??
//                 test.assignedStudents ??
//                 test.totalStudents ??
//                 0
//               );
//
//
//             const attended =
//               Number(
//                 test.attendedStudents ??
//                 test.attended ??
//                 test.totalAttended ??
//                 test.submittedStudents ??
//                 test.totalSubmissions ??
//                 results.length
//               );
//
//
//             return {
//               id: `aptitude-${test.id}`,
//
//               originalId: test.id,
//
//               testName:
//                 test.testName ??
//                 test.title ??
//                 test.name ??
//                 `Aptitude Test #${test.id}`,
//
//               type: "Aptitude",
//
//               department:
//                 test.department ??
//                 test.branch ??
//                 test.dept ??
//                 "All Departments",
//
//               date: formatDate(
//                 test.testDate ??
//                 test.date ??
//                 test.createdAt
//               ),
//
//               registered,
//
//               attended,
//
//               absent: Math.max(
//                 registered - attended,
//                 0
//               ),
//
//               results,
//
//               resultPath:
//                 `/placement/aptitude-tests/${test.id}/results`,
//             };
//           })
//         );
//
//
//       /*
//        * =====================================================
//        * COMBINE APTITUDE + CODING
//        * =====================================================
//        */
//
//       const combined = [
//         ...aptitudeStatistics,
//         ...codingStatistics,
//       ];
//
//
//       /*
//        * Latest tests first.
//        */
//       combined.sort((a, b) => {
//         return (
//           new Date(b.date) -
//           new Date(a.date)
//         );
//       });
//
//
//       setTests(combined);
//
//     } catch (err) {
//
//       console.error(
//         "Statistics loading error:",
//         err
//       );
//
//       if (err.response?.status === 401) {
//         setError(
//           "Your session has expired. Please login again."
//         );
//       } else if (err.response?.status === 403) {
//         setError(
//           "You do not have permission to view statistics."
//         );
//       } else {
//         setError(
//           "Unable to load department statistics."
//         );
//       }
//
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };
//
//
//   /*
//    * =========================================================
//    * INITIAL LOAD
//    * =========================================================
//    */
//
//   useEffect(() => {
//     fetchStatistics();
//   }, []);
//
//
//   /*
//    * =========================================================
//    * FILTER
//    * =========================================================
//    */
//
//   const filteredTests = useMemo(() => {
//
//     return tests.filter((test) => {
//
//       const matchesDepartment =
//         department === "All Departments" ||
//         test.department === department;
//
//
//       const matchesType =
//         type === "All Types" ||
//         test.type === type;
//
//
//       const searchText =
//         search.trim().toLowerCase();
//
//
//       const matchesSearch =
//         !searchText ||
//         test.testName
//           .toLowerCase()
//           .includes(searchText) ||
//         test.department
//           .toLowerCase()
//           .includes(searchText);
//
//
//       return (
//         matchesDepartment &&
//         matchesType &&
//         matchesSearch
//       );
//     });
//
//   }, [
//     tests,
//     department,
//     type,
//     search,
//   ]);
//
//
//   /*
//    * =========================================================
//    * SUMMARY
//    * =========================================================
//    */
//
//   const totalTests =
//     filteredTests.length;
//
//
//   const totalRegistered =
//     filteredTests.reduce(
//       (sum, test) =>
//         sum + Number(test.registered || 0),
//       0
//     );
//
//
//   const totalAttended =
//     filteredTests.reduce(
//       (sum, test) =>
//         sum + Number(test.attended || 0),
//       0
//     );
//
//
//   const totalAbsent =
//     Math.max(
//       totalRegistered -
//       totalAttended,
//       0
//     );
//
//
//   const attendancePercentage =
//     totalRegistered > 0
//       ? Math.round(
//           (totalAttended /
//             totalRegistered) *
//             100
//         )
//       : 0;
//
//
//   /*
//    * =========================================================
//    * LOADING
//    * =========================================================
//    */
//
//   if (loading) {
//     return (
//       <div
//         className="min-h-screen bg-[#F5F7FC]
//                    flex items-center
//                    justify-center"
//       >
//         <div className="flex flex-col
//                         items-center gap-3">
//
//           <Loader2
//             className="w-9 h-9
//                        text-[#315FEA]
//                        animate-spin"
//           />
//
//           <p className="text-sm
//                         text-[#6B7280]">
//             Loading department statistics...
//           </p>
//
//         </div>
//       </div>
//     );
//   }
//
//
//   /*
//    * =========================================================
//    * PAGE
//    * =========================================================
//    */
//
//   return (
//     <div className="min-h-screen bg-[#F5F7FC]">
//
//       {/* =====================================================
//           HEADER
//       ===================================================== */}
//
//       <header
//         className="bg-white
//                    border-b
//                    border-[#E3E8F2]
//                    px-6 py-4"
//       >
//
//         <div
//           className="max-w-[1600px]
//                      mx-auto
//                      flex items-center
//                      justify-between"
//         >
//
//           <div className="flex items-center gap-4">
//
//             <button
//               onClick={() =>
//                 navigate(
//                   "/placement-dashboard"
//                 )
//               }
//               className="w-10 h-10
//                          rounded-xl
//                          border
//                          border-[#DCE3F5]
//                          flex items-center
//                          justify-center
//                          text-[#4B5563]
//                          hover:bg-[#F5F7FC]
//                          transition"
//             >
//               <ArrowLeft
//                 className="w-5 h-5"
//               />
//             </button>
//
//
//             <div>
//
//               <div className="flex
//                               items-center
//                               gap-2">
//
//                 <div
//                   className="w-9 h-9
//                              rounded-xl
//                              bg-[#EEF3FF]
//                              flex items-center
//                              justify-center"
//                 >
//                   <BarChart3
//                     className="w-5 h-5
//                                text-[#315FEA]"
//                   />
//                 </div>
//
//                 <h1
//                   className="text-xl
//                              font-bold
//                              text-[#0B1D42]"
//                 >
//                   Department Statistics
//                 </h1>
//
//               </div>
//
//
//               <p
//                 className="text-sm
//                            text-[#6B7280]
//                            mt-1"
//               >
//                 Aptitude and coding test
//                 attendance overview.
//               </p>
//
//             </div>
//
//           </div>
//
//
//           <button
//             onClick={() =>
//               fetchStatistics(true)
//             }
//             disabled={refreshing}
//             className="flex items-center
//                        gap-2
//                        px-4 py-2.5
//                        rounded-xl
//                        bg-[#315FEA]
//                        text-white
//                        text-sm
//                        font-semibold
//                        hover:bg-[#254ED0]
//                        disabled:opacity-60
//                        transition"
//           >
//
//             <RefreshCw
//               className={`w-4 h-4
//                 ${
//                   refreshing
//                     ? "animate-spin"
//                     : ""
//                 }`}
//             />
//
//             Refresh
//
//           </button>
//
//         </div>
//
//       </header>
//
//
//       <main
//         className="max-w-[1600px]
//                    mx-auto
//                    p-6"
//       >
//
//         {/* ===================================================
//             ERROR
//         =================================================== */}
//
//         {error && (
//           <div
//             className="mb-6
//                        bg-red-50
//                        border
//                        border-red-200
//                        rounded-xl
//                        px-4 py-3
//                        flex items-center
//                        gap-3"
//           >
//
//             <XCircle
//               className="w-5 h-5
//                          text-red-500"
//             />
//
//             <p
//               className="text-sm
//                          text-red-700"
//             >
//               {error}
//             </p>
//
//           </div>
//         )}
//
//
//         {/* ===================================================
//             SUMMARY CARDS
//         =================================================== */}
//
//         <div
//           className="grid
//                      grid-cols-1
//                      sm:grid-cols-2
//                      lg:grid-cols-4
//                      gap-5
//                      mb-6"
//         >
//
//           {/* TESTS */}
//
//           <div
//             className="bg-white
//                        border
//                        border-[#DCE3F5]
//                        rounded-2xl
//                        p-5
//                        shadow-sm"
//           >
//
//             <div
//               className="flex
//                          items-center
//                          justify-between"
//             >
//
//               <div>
//
//                 <p
//                   className="text-sm
//                              font-medium
//                              text-[#6B7280]"
//                 >
//                   Total Tests
//                 </p>
//
//                 <h3
//                   className="text-2xl
//                              font-bold
//                              text-[#0B1D42]
//                              mt-2"
//                 >
//                   {totalTests}
//                 </h3>
//
//                 <p
//                   className="text-xs
//                              text-[#9CA3AF]
//                              mt-1"
//                 >
//                   Aptitude + Coding
//                 </p>
//
//               </div>
//
//               <div
//                 className="w-11 h-11
//                            rounded-xl
//                            bg-[#EEF3FF]
//                            flex items-center
//                            justify-center"
//               >
//                 <ClipboardList
//                   className="w-5 h-5
//                              text-[#315FEA]"
//                 />
//               </div>
//
//             </div>
//
//           </div>
//
//
//           {/* REGISTERED */}
//
//           <div
//             className="bg-white
//                        border
//                        border-[#DCE3F5]
//                        rounded-2xl
//                        p-5
//                        shadow-sm"
//           >
//
//             <div
//               className="flex
//                          items-center
//                          justify-between"
//             >
//
//               <div>
//
//                 <p
//                   className="text-sm
//                              font-medium
//                              text-[#6B7280]"
//                 >
//                   Registered
//                 </p>
//
//                 <h3
//                   className="text-2xl
//                              font-bold
//                              text-[#0B1D42]
//                              mt-2"
//                 >
//                   {totalRegistered}
//                 </h3>
//
//                 <p
//                   className="text-xs
//                              text-[#9CA3AF]
//                              mt-1"
//                 >
//                   Total students
//                 </p>
//
//               </div>
//
//               <div
//                 className="w-11 h-11
//                            rounded-xl
//                            bg-[#EEF3FF]
//                            flex items-center
//                            justify-center"
//               >
//                 <Users
//                   className="w-5 h-5
//                              text-[#315FEA]"
//                 />
//               </div>
//
//             </div>
//
//           </div>
//
//
//           {/* ATTENDED */}
//
//           <div
//             className="bg-white
//                        border
//                        border-[#DCE3F5]
//                        rounded-2xl
//                        p-5
//                        shadow-sm"
//           >
//
//             <div
//               className="flex
//                          items-center
//                          justify-between"
//             >
//
//               <div>
//
//                 <p
//                   className="text-sm
//                              font-medium
//                              text-[#6B7280]"
//                 >
//                   Attended
//                 </p>
//
//                 <h3
//                   className="text-2xl
//                              font-bold
//                              text-[#15803D]
//                              mt-2"
//                 >
//                   {totalAttended}
//                 </h3>
//
//                 <p
//                   className="text-xs
//                              text-[#9CA3AF]
//                              mt-1"
//                 >
//                   Students participated
//                 </p>
//
//               </div>
//
//               <div
//                 className="w-11 h-11
//                            rounded-xl
//                            bg-[#ECFDF5]
//                            flex items-center
//                            justify-center"
//               >
//                 <CheckCircle2
//                   className="w-5 h-5
//                              text-[#16A34A]"
//                 />
//               </div>
//
//             </div>
//
//           </div>
//
//
//           {/* ATTENDANCE */}
//
//           <div
//             className="bg-white
//                        border
//                        border-[#DCE3F5]
//                        rounded-2xl
//                        p-5
//                        shadow-sm"
//           >
//
//             <div
//               className="flex
//                          items-center
//                          justify-between"
//             >
//
//               <div>
//
//                 <p
//                   className="text-sm
//                              font-medium
//                              text-[#6B7280]"
//                 >
//                   Attendance
//                 </p>
//
//                 <h3
//                   className="text-2xl
//                              font-bold
//                              text-[#315FEA]
//                              mt-2"
//                 >
//                   {attendancePercentage}%
//                 </h3>
//
//                 <p
//                   className="text-xs
//                              text-[#9CA3AF]
//                              mt-1"
//                 >
//                   {totalAbsent} absent
//                 </p>
//
//               </div>
//
//               <div
//                 className="w-11 h-11
//                            rounded-xl
//                            bg-[#EEF3FF]
//                            flex items-center
//                            justify-center"
//               >
//                 <BarChart3
//                   className="w-5 h-5
//                              text-[#315FEA]"
//                 />
//               </div>
//
//             </div>
//
//           </div>
//
//         </div>
//
//
//         {/* ===================================================
//             TABLE
//         =================================================== */}
//
//         <section
//           className="bg-white
//                      rounded-2xl
//                      border
//                      border-[#DCE3F5]
//                      shadow-sm"
//         >
//
//           {/* TABLE HEADER */}
//
//           <div
//             className="p-6
//                        border-b
//                        border-[#E8ECF4]"
//           >
//
//             <div
//               className="flex
//                          flex-col
//                          xl:flex-row
//                          xl:items-center
//                          xl:justify-between
//                          gap-5"
//             >
//
//               <div>
//
//                 <h2
//                   className="text-lg
//                              font-bold
//                              text-[#0B1D42]"
//                 >
//                   Test Attendance
//                 </h2>
//
//                 <p
//                   className="text-sm
//                              text-[#6B7280]
//                              mt-1"
//                 >
//                   Department-wise attendance
//                   for all published tests.
//                 </p>
//
//               </div>
//
//
//               <div
//                 className="flex
//                            flex-col
//                            sm:flex-row
//                            gap-3"
//               >
//
//                 {/* SEARCH */}
//
//                 <div
//                   className="relative"
//                 >
//
//                   <Search
//                     className="absolute
//                                left-3
//                                top-1/2
//                                -translate-y-1/2
//                                w-4 h-4
//                                text-[#9CA3AF]"
//                   />
//
//                   <input
//                     type="text"
//                     placeholder="Search tests..."
//                     value={search}
//                     onChange={(e) =>
//                       setSearch(
//                         e.target.value
//                       )
//                     }
//                     className="w-full
//                                sm:w-56
//                                pl-9 pr-3
//                                py-2.5
//                                border
//                                border-[#DCE3F5]
//                                rounded-xl
//                                text-sm
//                                outline-none
//                                focus:ring-2
//                                focus:ring-[#315FEA]/20
//                                focus:border-[#315FEA]"
//                   />
//
//                 </div>
//
//
//                 {/* DEPARTMENT */}
//
//                 <div
//                   className="relative"
//                 >
//
//                   <Filter
//                     className="absolute
//                                left-3
//                                top-1/2
//                                -translate-y-1/2
//                                w-4 h-4
//                                text-[#9CA3AF]"
//                   />
//
//                   <select
//                     value={department}
//                     onChange={(e) =>
//                       setDepartment(
//                         e.target.value
//                       )
//                     }
//                     className="appearance-none
//                                w-full
//                                sm:w-48
//                                pl-9 pr-8
//                                py-2.5
//                                border
//                                border-[#DCE3F5]
//                                rounded-xl
//                                text-sm
//                                bg-white
//                                outline-none"
//                   >
//
//                     <option>
//                       All Departments
//                     </option>
//
//                     <option>CSE</option>
//                     <option>IT</option>
//                     <option>ECE</option>
//                     <option>EEE</option>
//                     <option>MECH</option>
//
//                   </select>
//
//                 </div>
//
//
//                 {/* TYPE */}
//
//                 <select
//                   value={type}
//                   onChange={(e) =>
//                     setType(e.target.value)
//                   }
//                   className="w-full
//                              sm:w-36
//                              px-3
//                              py-2.5
//                              border
//                              border-[#DCE3F5]
//                              rounded-xl
//                              text-sm
//                              bg-white
//                              outline-none"
//                 >
//
//                   <option>
//                     All Types
//                   </option>
//
//                   <option>
//                     Aptitude
//                   </option>
//
//                   <option>
//                     Coding
//                   </option>
//
//                 </select>
//
//               </div>
//
//             </div>
//
//           </div>
//
//
//           {/* TABLE */}
//
//           <div className="overflow-x-auto">
//
//             <table
//               className="w-full
//                          min-w-[1150px]"
//             >
//
//               <thead>
//
//                 <tr
//                   className="bg-[#F8FAFF]
//                              border-b
//                              border-[#E5EAF3]"
//                 >
//
//                   <th
//                     className="text-left
//                                px-6 py-4
//                                text-xs
//                                font-bold
//                                text-[#6B7280]"
//                   >
//                     Test
//                   </th>
//
//                   <th
//                     className="text-left
//                                px-4 py-4
//                                text-xs
//                                font-bold
//                                text-[#6B7280]"
//                   >
//                     Type
//                   </th>
//
//                   <th
//                     className="text-left
//                                px-4 py-4
//                                text-xs
//                                font-bold
//                                text-[#6B7280]"
//                   >
//                     Department
//                   </th>
//
//                   <th
//                     className="text-left
//                                px-4 py-4
//                                text-xs
//                                font-bold
//                                text-[#6B7280]"
//                   >
//                     Date
//                   </th>
//
//                   <th
//                     className="text-center
//                                px-4 py-4
//                                text-xs
//                                font-bold
//                                text-[#6B7280]"
//                   >
//                     Registered
//                   </th>
//
//                   <th
//                     className="text-center
//                                px-4 py-4
//                                text-xs
//                                font-bold
//                                text-[#6B7280]"
//                   >
//                     Attended
//                   </th>
//
//                   <th
//                     className="text-center
//                                px-4 py-4
//                                text-xs
//                                font-bold
//                                text-[#6B7280]"
//                   >
//                     Absent
//                   </th>
//
//                   <th
//                     className="text-left
//                                px-4 py-4
//                                text-xs
//                                font-bold
//                                text-[#6B7280]"
//                   >
//                     Attendance
//                   </th>
//
//                   <th
//                     className="text-center
//                                px-6 py-4
//                                text-xs
//                                font-bold
//                                text-[#6B7280]"
//                   >
//                     Results
//                   </th>
//
//                 </tr>
//
//               </thead>
//
//
//               <tbody>
//
//                 {filteredTests.length === 0 ? (
//
//                   <tr>
//
//                     <td
//                       colSpan="9"
//                       className="px-6
//                                  py-16
//                                  text-center"
//                     >
//
//                       <BarChart3
//                         className="w-10 h-10
//                                    mx-auto
//                                    text-[#CBD5E1]"
//                       />
//
//                       <p
//                         className="mt-3
//                                    font-semibold
//                                    text-[#374151]"
//                       >
//                         No tests found
//                       </p>
//
//                       <p
//                         className="text-sm
//                                    text-[#9CA3AF]
//                                    mt-1"
//                       >
//                         Try changing the
//                         selected filters.
//                       </p>
//
//                     </td>
//
//                   </tr>
//
//                 ) : (
//
//                   filteredTests.map(
//                     (test) => {
//
//                       const percentage =
//                         test.registered > 0
//                           ? Math.round(
//                               (test.attended /
//                                 test.registered) *
//                                 100
//                             )
//                           : 0;
//
//
//                       return (
//                         <tr
//                           key={`${test.type}-${test.id}`}
//                           className="border-b
//                                      border-[#EEF1F7]
//                                      hover:bg-[#F9FBFF]
//                                      transition"
//                         >
//
//                           {/* TEST */}
//
//                           <td
//                             className="px-6 py-5"
//                           >
//
//                             <p
//                               className="font-semibold
//                                          text-[#0B1D42]"
//                             >
//                               {test.testName}
//                             </p>
//
//                             <p
//                               className="text-xs
//                                          text-[#9CA3AF]
//                                          mt-1"
//                             >
//                               Test ID:{" "}
//                               {test.originalId ??
//                                 test.id}
//                             </p>
//
//                           </td>
//
//
//                           {/* TYPE */}
//
//                           <td
//                             className="px-4 py-5"
//                           >
// <span
//   className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
//     test.type === "Coding"
//       ? "bg-[#E8EEFF] text-[#1D4ED8]"
//       : "bg-[#ECFDF5] text-[#047857]"
//   }`}
// >
//   {test.type}
// </span>
//
//                           </td>
//
//
//                           {/* DEPARTMENT */}
//
//                           <td
//                             className="px-4 py-5"
//                           >
//
//                             <span
//                               className="font-semibold
//                                          text-[#374151]"
//                             >
//                               {test.department}
//                             </span>
//
//                           </td>
//
//
//                           {/* DATE */}
//
//                           <td
//                             className="px-4 py-5
//                                        text-sm
//                                        text-[#6B7280]"
//                           >
//                             {test.date}
//                           </td>
//
//
//                           {/* REGISTERED */}
//
//                           <td
//                             className="px-4 py-5
//                                        text-center
//                                        font-semibold
//                                        text-[#111827]"
//                           >
//                             {test.registered}
//                           </td>
//
//
//                           {/* ATTENDED */}
//
//                           <td
//                             className="px-4 py-5
//                                        text-center
//                                        font-semibold
//                                        text-[#15803D]"
//                           >
//                             {test.attended}
//                           </td>
//
//
//                           {/* ABSENT */}
//
//                           <td
//                             className="px-4 py-5
//                                        text-center
//                                        font-semibold
//                                        text-[#DC2626]"
//                           >
//                             {test.absent}
//                           </td>
//
//
//                           {/* ATTENDANCE */}
//
//                           <td
//                             className="px-4 py-5"
//                           >
//
//                             <div
//                               className="flex
//                                          items-center
//                                          gap-3"
//                             >
//
//                               <div
//                                 className="w-24
//                                            h-2
//                                            bg-[#E5E7EB]
//                                            rounded-full
//                                            overflow-hidden"
//                               >
//
//                                 <div
//                                   className={`h-full
//                                               rounded-full
//                                     ${
//                                       percentage >=
//                                       90
//                                         ? "bg-[#16A34A]"
//                                         : percentage >=
//                                           75
//                                         ? "bg-[#F59E0B]"
//                                         : "bg-[#EF4444]"
//                                     }`}
//                                   style={{
//                                     width: `${percentage}%`,
//                                   }}
//                                 />
//
//                               </div>
//
//                               <span
//                                 className={`text-xs
//                                             font-bold
//                                   ${
//                                     percentage >=
//                                     90
//                                       ? "text-[#15803D]"
//                                       : percentage >=
//                                         75
//                                       ? "text-[#B45309]"
//                                       : "text-[#DC2626]"
//                                   }`}
//                               >
//                                 {percentage}%
//                               </span>
//
//                             </div>
//
//                           </td>
//
//
//                           {/* RESULTS */}
//
//                           <td
//                             className="px-6 py-5
//                                        text-center"
//                           >
//
//                             <button
//                               onClick={() =>
//                                 navigate(
//                                   test.resultPath
//                                 )
//                               }
//                               className="inline-flex
//                                          items-center
//                                          gap-2
//                                          px-3 py-2
//                                          rounded-lg
//                                          border
//                                          border-[#DCE3F5]
//                                          text-[#315FEA]
//                                          text-xs
//                                          font-semibold
//                                          hover:bg-[#EEF3FF]
//                                          transition"
//                             >
//
//                               <Eye
//                                 className="w-4 h-4"
//                               />
//
//                               View Results
//
//                             </button>
//
//                           </td>
//
//                         </tr>
//                       );
//                     }
//                   )
//
//                 )}
//
//               </tbody>
//
//             </table>
//
//           </div>
//
//
//           {/* FOOTER */}
//
//           <div
//             className="px-6 py-4
//                        border-t
//                        border-[#E8ECF4]
//                        flex items-center
//                        justify-between"
//           >
//
//             <p
//               className="text-xs
//                          text-[#6B7280]"
//             >
//
//               Showing{" "}
//
//               <span
//                 className="font-semibold
//                            text-[#374151]"
//               >
//                 {filteredTests.length}
//               </span>{" "}
//
//               test(s)
//
//             </p>
//
//
//             <div
//               className="flex
//                          items-center
//                          gap-4"
//             >
//
//               <div
//                 className="flex
//                            items-center
//                            gap-2
//                            text-xs
//                            text-[#6B7280]"
//               >
//
//                 <span
//                   className="w-2 h-2
//                              rounded-full
//                              bg-[#16A34A]"
//                 />
//
//                 90%+ attendance
//
//               </div>
//
//
//               <div
//                 className="flex
//                            items-center
//                            gap-2
//                            text-xs
//                            text-[#6B7280]"
//               >
//
//                 <span
//                   className="w-2 h-2
//                              rounded-full
//                              bg-[#F59E0B]"
//                 />
//
//                 75–89%
//
//               </div>
//
//             </div>
//
//           </div>
//
//         </section>
//
//       </main>
//
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Users,
  ClipboardList,
  CheckCircle2,
  Eye,
  Search,
  Filter,
  Loader2,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ============================================================
// COMMON SIDEBAR
// ============================================================
// Change this path ONLY if your Sidebar file is located elsewhere.
import Sidebar from "../placement_cell/PlacementSidebar";

const API_BASE_URL = "http://localhost:8080/api";

export default function DepartmentStatistics() {
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [department, setDepartment] = useState("All Departments");
  const [type, setType] = useState("All Types");
  const [search, setSearch] = useState("");

  // ==========================================================
  // AUTH HEADERS
  // ==========================================================

  const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date || date === "-") {
      return "-";
    }

    try {
      const parsed = new Date(date);

      if (Number.isNaN(parsed.getTime())) {
        return String(date);
      }

      return parsed.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return String(date);
    }
  };

  // ==========================================================
  // GET RAW DATE FOR SORTING
  // ==========================================================

  const getTimestamp = (date) => {
    if (!date || date === "-") {
      return 0;
    }

    const timestamp = new Date(date).getTime();

    return Number.isNaN(timestamp) ? 0 : timestamp;
  };

  // ==========================================================
  // FETCH STATISTICS
  // ==========================================================

  const fetchStatistics = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const headers = getHeaders();

      const [codingResponse, aptitudeResponse] =
        await Promise.allSettled([
          axios.get(
            `${API_BASE_URL}/placement/coding-tests`,
            { headers }
          ),

          axios.get(
            `${API_BASE_URL}/admin/aptitude-tests`,
            { headers }
          ),
        ]);

      // ========================================================
      // CODING TESTS
      // ========================================================

      let codingTests = [];

      if (codingResponse.status === "fulfilled") {
        const data = codingResponse.value.data;

        codingTests = Array.isArray(data)
          ? data
          : data?.tests || [];
      } else {
        console.error(
          "Coding tests failed:",
          codingResponse.reason
        );
      }

      // ========================================================
      // APTITUDE TESTS
      // ========================================================

      let aptitudeTests = [];

      if (aptitudeResponse.status === "fulfilled") {
        const data = aptitudeResponse.value.data;

        aptitudeTests = Array.isArray(data)
          ? data
          : data?.tests || [];
      } else {
        console.error(
          "Aptitude tests failed:",
          aptitudeResponse.reason
        );
      }

      // ========================================================
      // CODING STATISTICS
      // ========================================================

      const codingStatistics = await Promise.all(
        codingTests.map(async (test) => {
          let results = [];

          const testId =
            test.id ??
            test.testId;

          try {
            if (testId != null) {
              const response = await axios.get(
                `${API_BASE_URL}/placement/coding-tests/${testId}/results`,
                { headers }
              );

              results = Array.isArray(response.data)
                ? response.data
                : response.data?.results || [];
            }
          } catch (err) {
            console.error(
              `Coding results failed for ${testId}:`,
              err
            );
          }

          const registered = Number(
            test.registeredStudents ??
              test.registered ??
              test.totalRegistered ??
              test.assignedStudents ??
              test.totalStudents ??
              0
          );

          const attended = Number(
            test.attendedStudents ??
              test.attended ??
              test.totalAttended ??
              test.submittedStudents ??
              test.totalSubmissions ??
              results.length
          );

          const rawDate =
            test.testDate ??
            test.date ??
            test.startDate ??
            test.createdAt;

          return {
            id: testId,

            originalId: testId,

            testName:
              test.testName ??
              test.title ??
              test.name ??
              `Coding Test #${testId}`,

            type: "Coding",

            department:
              test.department ??
              test.branch ??
              test.dept ??
              "All Departments",

            date: formatDate(rawDate),

            timestamp: getTimestamp(rawDate),

            registered,

            attended,

            absent: Math.max(
              registered - attended,
              0
            ),

            results,

            resultPath:
              `/placement/reports?testId=${test.id}&type=Coding`,
          };
        })
      );

      // ========================================================
      // APTITUDE STATISTICS
      // ========================================================

      const aptitudeStatistics = await Promise.all(
        aptitudeTests.map(async (test) => {
          let results = [];

          const testId =
            test.id ??
            test.testId;

          try {
            if (testId != null) {
              const response = await axios.get(
                `${API_BASE_URL}/admin/aptitude-tests/${testId}/results`,
                { headers }
              );

              results = Array.isArray(response.data)
                ? response.data
                : response.data?.results || [];
            }
          } catch (err) {
            console.error(
              `Aptitude results failed for ${testId}:`,
              err
            );
          }

          const registered = Number(
            test.registeredStudents ??
              test.registered ??
              test.totalRegistered ??
              test.assignedStudents ??
              test.totalStudents ??
              0
          );

          const attended = Number(
            test.attendedStudents ??
              test.attended ??
              test.totalAttended ??
              test.submittedStudents ??
              test.totalSubmissions ??
              results.length
          );

          const rawDate =
            test.testDate ??
            test.date ??
            test.startDate ??
            test.createdAt;

          return {
            id: `aptitude-${testId}`,

            originalId: testId,

            testName:
              test.testName ??
              test.title ??
              test.name ??
              `Aptitude Test #${testId}`,

            type: "Aptitude",

            department:
              test.department ??
              test.branch ??
              test.dept ??
              "All Departments",

            date: formatDate(rawDate),

            timestamp: getTimestamp(rawDate),

            registered,

            attended,

            absent: Math.max(
              registered - attended,
              0
            ),

            results,

            resultPath:
              `/placement/reports?testId=${test.id}&type=Aptitude`,
          };
        })
      );

      // ========================================================
      // COMBINE
      // ========================================================

      const combined = [
        ...aptitudeStatistics,
        ...codingStatistics,
      ];

      combined.sort(
        (a, b) => b.timestamp - a.timestamp
      );

      setTests(combined);
    } catch (err) {
      console.error(
        "Statistics loading error:",
        err
      );

      if (err?.response?.status === 401) {
        setError(
          "Your session has expired. Please login again."
        );
      } else if (err?.response?.status === 403) {
        setError(
          "You do not have permission to view statistics."
        );
      } else {
        setError(
          "Unable to load department statistics."
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchStatistics();
  }, []);

  // ==========================================================
  // FILTER
  // ==========================================================

  const filteredTests = useMemo(() => {
    const searchText = search
      .trim()
      .toLowerCase();

    return tests.filter((test) => {
      const matchesDepartment =
        department === "All Departments" ||
        test.department === department;

      const matchesType =
        type === "All Types" ||
        test.type === type;

      const matchesSearch =
        !searchText ||
        test.testName
          .toLowerCase()
          .includes(searchText) ||
        test.department
          .toLowerCase()
          .includes(searchText);

      return (
        matchesDepartment &&
        matchesType &&
        matchesSearch
      );
    });
  }, [
    tests,
    department,
    type,
    search,
  ]);

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const totalTests = filteredTests.length;

  const totalRegistered = filteredTests.reduce(
    (sum, test) =>
      sum + Number(test.registered || 0),
    0
  );

  const totalAttended = filteredTests.reduce(
    (sum, test) =>
      sum + Number(test.attended || 0),
    0
  );

  const totalAbsent = Math.max(
    totalRegistered - totalAttended,
    0
  );

  const attendancePercentage =
    totalRegistered > 0
      ? Math.round(
          (totalAttended /
            totalRegistered) *
            100
        )
      : 0;

  // ==========================================================
  // NAVIGATION
  // ==========================================================

  const handleNavigate = (path) => {
    navigate(path);
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FC]">
        <div className="hidden md:block fixed left-0 top-0 h-screen z-40">
          <Sidebar
            activeKey="stats"
            onNavigate={handleNavigate}
          />
        </div>

        <div className="md:ml-64 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-9 h-9 text-[#315FEA] animate-spin" />

            <p className="text-sm text-[#6B7280]">
              Loading department statistics...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-[#F5F7FC]">

      {/* ======================================================
          FIXED COMMON SIDEBAR
      ====================================================== */}

      <div className="hidden md:block fixed left-0 top-0 h-screen z-40">
        <Sidebar
          activeKey="stats"
          onNavigate={handleNavigate}
        />
      </div>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="md:ml-64 min-h-screen">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="bg-white border-b border-[#E3E8F2] px-4 sm:px-6 py-4">

          <div className="max-w-[1600px] mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#EEF3FF] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-[#315FEA]" />
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#0B1D42]">
                    Department Statistics
                  </h1>

                  <p className="text-sm text-[#6B7280] mt-1">
                    Aptitude and coding test attendance overview.
                  </p>
                </div>

              </div>

              <button
                onClick={() => fetchStatistics(true)}
                disabled={refreshing}
                className="self-start sm:self-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#315FEA] text-white text-sm font-semibold hover:bg-[#254ED0] disabled:opacity-60 transition"
              >
                <RefreshCw
                  className={`w-4 h-4 ${
                    refreshing
                      ? "animate-spin"
                      : ""
                  }`}
                />

                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}
              </button>

            </div>

          </div>

        </header>

        {/* ====================================================
            MAIN
        ==================================================== */}

        <main className="w-full px-4 sm:px-6 py-6">

          <div className="max-w-[1600px] mx-auto">

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3">

                <XCircle className="w-5 h-5 text-red-500 shrink-0" />

                <p className="text-sm text-red-700">
                  {error}
                </p>

              </div>
            )}

            {/* ==================================================
                SUMMARY CARDS
            ================================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

              {/* TOTAL TESTS */}

              <div className="bg-white border border-[#DCE3F5] rounded-2xl p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-[#6B7280]">
                      Total Tests
                    </p>

                    <h3 className="text-2xl font-bold text-[#0B1D42] mt-2">
                      {totalTests}
                    </h3>

                    <p className="text-xs text-[#9CA3AF] mt-1">
                      Aptitude + Coding
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-[#315FEA]" />
                  </div>

                </div>

              </div>

              {/* REGISTERED */}

              <div className="bg-white border border-[#DCE3F5] rounded-2xl p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-[#6B7280]">
                      Registered
                    </p>

                    <h3 className="text-2xl font-bold text-[#0B1D42] mt-2">
                      {totalRegistered}
                    </h3>

                    <p className="text-xs text-[#9CA3AF] mt-1">
                      Total students
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#315FEA]" />
                  </div>

                </div>

              </div>

              {/* ATTENDED */}

              <div className="bg-white border border-[#DCE3F5] rounded-2xl p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-[#6B7280]">
                      Attended
                    </p>

                    <h3 className="text-2xl font-bold text-[#15803D] mt-2">
                      {totalAttended}
                    </h3>

                    <p className="text-xs text-[#9CA3AF] mt-1">
                      Students participated
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  </div>

                </div>

              </div>

              {/* ATTENDANCE */}

              <div className="bg-white border border-[#DCE3F5] rounded-2xl p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-[#6B7280]">
                      Attendance
                    </p>

                    <h3 className="text-2xl font-bold text-[#315FEA] mt-2">
                      {attendancePercentage}%
                    </h3>

                    <p className="text-xs text-[#9CA3AF] mt-1">
                      {totalAbsent} absent
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#315FEA]" />
                  </div>

                </div>

              </div>

            </div>

            {/* ==================================================
                TABLE CARD
            ================================================== */}

            <section className="bg-white rounded-2xl border border-[#DCE3F5] shadow-sm overflow-hidden">

              {/* TABLE HEADER */}

              <div className="p-5 sm:p-6 border-b border-[#E8ECF4]">

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                  <div>
                    <h2 className="text-lg font-bold text-[#0B1D42]">
                      Test Attendance
                    </h2>

                    <p className="text-sm text-[#6B7280] mt-1">
                      Department-wise attendance for all tests.
                    </p>
                  </div>

                  {/* FILTERS */}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full xl:w-auto">

                    {/* SEARCH */}

                    <div className="relative">

                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />

                      <input
                        type="text"
                        placeholder="Search tests..."
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                        className="w-full sm:w-56 pl-9 pr-3 py-2.5 border border-[#DCE3F5] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#315FEA]/20 focus:border-[#315FEA]"
                      />

                    </div>

                    {/* DEPARTMENT */}

                    <div className="relative">

                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />

                      <select
                        value={department}
                        onChange={(e) =>
                          setDepartment(e.target.value)
                        }
                        className="appearance-none w-full sm:w-48 pl-9 pr-8 py-2.5 border border-[#DCE3F5] rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-[#315FEA]/20"
                      >

                        <option>
                          All Departments
                        </option>

                        <option>CSE</option>
                        <option>IT</option>
                        <option>ECE</option>
                        <option>EEE</option>
                        <option>MECH</option>

                      </select>

                    </div>

                    {/* TYPE */}

                    <select
                      value={type}
                      onChange={(e) =>
                        setType(e.target.value)
                      }
                      className="w-full sm:w-36 px-3 py-2.5 border border-[#DCE3F5] rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-[#315FEA]/20"
                    >

                      <option>
                        All Types
                      </option>

                      <option>
                        Aptitude
                      </option>

                      <option>
                        Coding
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* ==================================================
                  TABLE
              ================================================== */}

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1100px]">

                  <thead>

                    <tr className="bg-[#F8FAFF] border-b border-[#E5EAF3]">

                      <th className="text-left px-6 py-4 text-xs font-bold text-[#6B7280]">
                        Test
                      </th>

                      <th className="text-left px-4 py-4 text-xs font-bold text-[#6B7280]">
                        Type
                      </th>

                      <th className="text-left px-4 py-4 text-xs font-bold text-[#6B7280]">
                        Department
                      </th>

                      <th className="text-left px-4 py-4 text-xs font-bold text-[#6B7280]">
                        Date
                      </th>

                      <th className="text-center px-4 py-4 text-xs font-bold text-[#6B7280]">
                        Registered
                      </th>

                      <th className="text-center px-4 py-4 text-xs font-bold text-[#6B7280]">
                        Attended
                      </th>

                      <th className="text-center px-4 py-4 text-xs font-bold text-[#6B7280]">
                        Absent
                      </th>

                      <th className="text-left px-4 py-4 text-xs font-bold text-[#6B7280]">
                        Attendance
                      </th>

                      <th className="text-center px-6 py-4 text-xs font-bold text-[#6B7280]">
                        Results
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredTests.length === 0 ? (

                      <tr>

                        <td
                          colSpan={9}
                          className="px-6 py-16 text-center"
                        >

                          <BarChart3 className="w-10 h-10 mx-auto text-[#CBD5E1]" />

                          <p className="mt-3 font-semibold text-[#374151]">
                            No tests found
                          </p>

                          <p className="text-sm text-[#9CA3AF] mt-1">
                            Try changing the selected filters.
                          </p>

                        </td>

                      </tr>

                    ) : (

                      filteredTests.map((test) => {

                        const percentage =
                          test.registered > 0
                            ? Math.round(
                                (test.attended /
                                  test.registered) *
                                  100
                              )
                            : 0;

                        return (

                          <tr
                            key={`${test.type}-${test.id}`}
                            className="border-b border-[#EEF1F7] hover:bg-[#F9FBFF] transition"
                          >

                            {/* TEST */}

                            <td className="px-6 py-5">

                              <p className="font-semibold text-[#0B1D42]">
                                {test.testName}
                              </p>

                              <p className="text-xs text-[#9CA3AF] mt-1">
                                Test ID:{" "}
                                {test.originalId ??
                                  test.id}
                              </p>

                            </td>

                            {/* TYPE */}

                            <td className="px-4 py-5">

                              <span
                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                  test.type === "Coding"
                                    ? "bg-[#E8EEFF] text-[#1D4ED8]"
                                    : "bg-[#ECFDF5] text-[#047857]"
                                }`}
                              >
                                {test.type}
                              </span>

                            </td>

                            {/* DEPARTMENT */}

                            <td className="px-4 py-5">

                              <span className="font-semibold text-[#374151]">
                                {test.department}
                              </span>

                            </td>

                            {/* DATE */}

                            <td className="px-4 py-5 text-sm text-[#6B7280]">
                              {test.date}
                            </td>

                            {/* REGISTERED */}

                            <td className="px-4 py-5 text-center font-semibold text-[#111827]">
                              {test.registered}
                            </td>

                            {/* ATTENDED */}

                            <td className="px-4 py-5 text-center font-semibold text-[#15803D]">
                              {test.attended}
                            </td>

                            {/* ABSENT */}

                            <td className="px-4 py-5 text-center font-semibold text-[#DC2626]">
                              {test.absent}
                            </td>

                            {/* ATTENDANCE */}

                            <td className="px-4 py-5">

                              <div className="flex items-center gap-3">

                                <div className="w-24 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">

                                  <div
                                    className={`h-full rounded-full ${
                                      percentage >= 90
                                        ? "bg-[#16A34A]"
                                        : percentage >= 75
                                        ? "bg-[#F59E0B]"
                                        : "bg-[#EF4444]"
                                    }`}
                                    style={{
                                      width: `${percentage}%`,
                                    }}
                                  />

                                </div>

                                <span
                                  className={`text-xs font-bold ${
                                    percentage >= 90
                                      ? "text-[#15803D]"
                                      : percentage >= 75
                                      ? "text-[#B45309]"
                                      : "text-[#DC2626]"
                                  }`}
                                >
                                  {percentage}%
                                </span>

                              </div>

                            </td>

                            {/* RESULTS */}

                            <td className="px-6 py-5 text-center">

                              <button
                                type="button"
                                onClick={() => {
                                  console.log(
                                    "Opening results:",
                                    test.resultPath
                                  );

                                  navigate(
                                    test.resultPath
                                  );
                                }}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#DCE3F5] text-[#315FEA] text-xs font-semibold hover:bg-[#EEF3FF] hover:border-[#315FEA] transition"
                              >

                                <Eye className="w-4 h-4" />

                                View Results

                              </button>

                            </td>

                          </tr>

                        );
                      })

                    )}

                  </tbody>

                </table>

              </div>

              {/* ==================================================
                  FOOTER
              ================================================== */}

              <div className="px-6 py-4 border-t border-[#E8ECF4] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <p className="text-xs text-[#6B7280]">

                  Showing{" "}

                  <span className="font-semibold text-[#374151]">
                    {filteredTests.length}
                  </span>{" "}

                  test(s)

                </p>

                <div className="flex items-center gap-4">

                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">

                    <span className="w-2 h-2 rounded-full bg-[#16A34A]" />

                    90%+ attendance

                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">

                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />

                    75–89%

                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">

                    <span className="w-2 h-2 rounded-full bg-[#EF4444]" />

                    Below 75%

                  </div>

                </div>

              </div>

            </section>

          </div>

        </main>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <footer className="px-6 py-6 text-center">

          <p className="text-xs text-[#9CA3AF]">
            © 2026 Placement Cell Portal
          </p>

        </footer>

      </div>
    </div>
  );
}