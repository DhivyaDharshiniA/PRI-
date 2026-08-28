// import React, { useEffect, useState } from "react";
// import {
//   Code2,
//   Save,
//   RefreshCw,
//   CheckCircle2,
//   AlertCircle,
//   ExternalLink,
//   LayoutGrid,
//   ClipboardList,
//   Sparkles,
//   Map,
//   ChevronRight,
//   Flame,
//   Settings,
//   LogOut,
//   GitBranch,
//   User,
//   UserPlus,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
//
// const API_BASE_URL = "http://localhost:8080";
//
// /* ============================================================
//    NAVIGATION
// ============================================================ */
//
// const NAV_ITEMS = [
//   {
//     key: "dashboard",
//     label: "Dashboard",
//     icon: LayoutGrid,
//     path: "/student-dashboard",
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
//   {
//     key: "profile",
//     label: "My Profile",
//     icon: User,
//     path: "/student/profile",
//   },
//   {
//     key: "profiles",
//     label: "Coding Profiles",
//     icon: GitBranch,
//     path: "/student/external-profiles",
//   },
//   {
//     key: "roadmap",
//     label: "Roadmap",
//     icon: Map,
//     path: "/student/roadmap",
//   },
// ];
//
// /* ============================================================
//    MAIN
// ============================================================ */
//
// export default function StudentExternalProfiles() {
//   const navigate = useNavigate();
//   const location = useLocation();
//
//   const [githubUsername, setGithubUsername] = useState("");
//   const [leetcodeUsername, setLeetcodeUsername] = useState("");
//
//   const [githubData, setGithubData] = useState(null);
//   const [leetcodeData, setLeetcodeData] = useState(null);
//
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//
//   const [profileExists, setProfileExists] = useState(false);
//
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//
//   /* ============================================================
//      ACTIVE NAV
// ============================================================ */
//
//   const active =
//     NAV_ITEMS.find((item) =>
//       location.pathname.startsWith(item.path)
//     )?.key || "profiles";
//
//   /* ============================================================
//      USER ID
// ============================================================ */
//
//   const getUserId = () => {
//     const userId =
//       localStorage.getItem("userId") ||
//       localStorage.getItem("studentId");
//
//     if (userId) {
//       return userId;
//     }
//
//     try {
//       const user = JSON.parse(
//         localStorage.getItem("user")
//       );
//
//       if (user?.id) return user.id;
//       if (user?.userId) return user.userId;
//       if (user?.studentId) return user.studentId;
//     } catch (e) {
//       console.log("No JSON user object");
//     }
//
//     return null;
//   };
//
//   /* ============================================================
//      AXIOS CONFIG
// ============================================================ */
//
//   const getConfig = () => {
//     const token = localStorage.getItem("token");
//
//     return token
//       ? {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       : {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         };
//   };
//
//   /* ============================================================
//      LOAD
// ============================================================ */
//
//   useEffect(() => {
//     loadProfile();
//   }, []);
//
//   const loadProfile = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");
//
//       const userId = getUserId();
//
//       console.log(
//         "Loading external profile for user:",
//         userId
//       );
//
//       if (!userId) {
//         setError(
//           "User ID not found. Please logout and login again."
//         );
//         return;
//       }
//
//       const response = await axios.get(
//         `${API_BASE_URL}/api/student/external-profiles`,
//         {
//           ...getConfig(),
//           params: {
//             userId,
//           },
//         }
//       );
//
//       console.log(
//         "External profile response:",
//         response.data
//       );
//
//       const data = response.data;
//
//       setGithubUsername(
//         data.githubUsername ||
//           data.github_username ||
//           ""
//       );
//
//       setLeetcodeUsername(
//         data.leetcodeUsername ||
//           data.leetcode_username ||
//           ""
//       );
//
//       setGithubData(
//         data.github || null
//       );
//
//       setLeetcodeData(
//         data.leetcode || null
//       );
//
//       setProfileExists(true);
//     } catch (err) {
//       console.error(
//         "Load external profile error:",
//         err
//       );
//
//       /*
//        * IMPORTANT:
//        *
//        * Your current backend throws:
//        *
//        * RuntimeException:
//        * Student profile not found
//        *
//        * which produces HTTP 500.
//        *
//        * We treat 404 and 500 as "profile not created".
//        */
//
//       if (
//         err.response?.status === 404 ||
//         err.response?.status === 500
//       ) {
//         setProfileExists(false);
//
//         setGithubUsername("");
//         setLeetcodeUsername("");
//
//         setGithubData(null);
//         setLeetcodeData(null);
//
//         setError(
//           "Your student profile has not been created yet."
//         );
//       } else {
//         setError(
//           err.response?.data?.message ||
//             err.response?.data ||
//             "Unable to load coding profile."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   /* ============================================================
//      SAVE
// ============================================================ */
//
//   const saveProfiles = async () => {
//     setMessage("");
//     setError("");
//
//     const userId = getUserId();
//
//     if (!userId) {
//       setError(
//         "User ID not found. Please login again."
//       );
//       return;
//     }
//
//     if (
//       !githubUsername.trim() &&
//       !leetcodeUsername.trim()
//     ) {
//       setError(
//         "Please enter at least one GitHub or LeetCode username."
//       );
//       return;
//     }
//
//     try {
//       setSaving(true);
//
//       const payload = {
//         githubUsername:
//           githubUsername.trim() || null,
//
//         leetcodeUsername:
//           leetcodeUsername.trim() || null,
//       };
//
//       console.log(
//         "Saving external profiles:",
//         payload
//       );
//
//       const response = await axios.put(
//         `${API_BASE_URL}/api/student/external-profiles`,
//         payload,
//         {
//           ...getConfig(),
//           params: {
//             userId,
//           },
//         }
//       );
//
//       const data = response.data;
//
//       setGithubUsername(
//         data.githubUsername ||
//           data.github_username ||
//           githubUsername
//       );
//
//       setLeetcodeUsername(
//         data.leetcodeUsername ||
//           data.leetcode_username ||
//           leetcodeUsername
//       );
//
//       setGithubData(
//         data.github || null
//       );
//
//       setLeetcodeData(
//         data.leetcode || null
//       );
//
//       setProfileExists(true);
//
//       setMessage(
//         "Coding profiles saved successfully."
//       );
//     } catch (err) {
//       console.error(
//         "Save external profile error:",
//         err
//       );
//
//       /*
//        * If backend says StudentProfile is missing,
//        * send the user to profile creation.
//        */
//
//       if (
//         err.response?.status === 404 ||
//         err.response?.status === 500
//       ) {
//         setError(
//           "Please complete your student profile first."
//         );
//       } else {
//         setError(
//           err.response?.data?.message ||
//             err.response?.data ||
//             "Unable to save coding profiles."
//         );
//       }
//     } finally {
//       setSaving(false);
//     }
//   };
//
//   /* ============================================================
//      REFRESH
// ============================================================ */
//
//   const refreshProfiles = async () => {
//     setMessage("");
//     setError("");
//
//     const userId = getUserId();
//
//     if (!userId) {
//       setError(
//         "User ID not found. Please login again."
//       );
//       return;
//     }
//
//     if (
//       !githubUsername.trim() &&
//       !leetcodeUsername.trim()
//     ) {
//       setError(
//         "Please save your usernames first."
//       );
//       return;
//     }
//
//     try {
//       setLoading(true);
//
//       const response = await axios.post(
//         `${API_BASE_URL}/api/student/external-profiles/refresh`,
//         {},
//         {
//           ...getConfig(),
//           params: {
//             userId,
//           },
//         }
//       );
//
//       const data = response.data;
//
//       setGithubData(
//         data.github || null
//       );
//
//       setLeetcodeData(
//         data.leetcode || null
//       );
//
//       setMessage(
//         "External profile data refreshed successfully."
//       );
//     } catch (err) {
//       console.error(
//         "Refresh error:",
//         err
//       );
//
//       setError(
//         err.response?.data?.message ||
//           err.response?.data ||
//           "Unable to refresh external profile data."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   /* ============================================================
//      LOGOUT
// ============================================================ */
//
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("username");
//     localStorage.removeItem("studentId");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("user");
//     localStorage.removeItem("email");
//
//     navigate("/login", {
//       replace: true,
//     });
//   };
//
//   /* ============================================================
//      RENDER
// ============================================================ */
//
//   return (
//     <div className="min-h-screen flex bg-[#F8FAFC] text-[#101828]">
//
//       {/* ======================================================
//           SIDEBAR
//       ====================================================== */}
//
//       <aside className="w-[260px] min-w-[260px] min-h-screen bg-[#0E1A2B] text-white p-5 flex flex-col sticky top-0 h-screen">
//
//         <div className="flex items-center gap-3 px-1 mb-10">
//
//           <div className="w-11 h-11 rounded-lg bg-[#16273D] border border-white/10 flex items-center justify-center font-serif font-semibold">
//             PP
//           </div>
//
//           <div>
//
//             <div className="text-[15px] font-semibold">
//               Placement
//               <span className="text-[#6B8DE3]">
//                 Path
//               </span>
//             </div>
//
//             <div className="text-[9px] tracking-[1.4px] uppercase text-white/40 mt-1">
//               Student Portal
//             </div>
//
//           </div>
//
//         </div>
//
//         <nav className="flex-1 space-y-1">
//
//           {NAV_ITEMS.map((item) => {
//
//             const Icon = item.icon;
//
//             const isActive =
//               active === item.key;
//
//             return (
//               <button
//                 key={item.key}
//                 type="button"
//                 onClick={() =>
//                   navigate(item.path)
//                 }
//                 className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-sm transition ${
//                   isActive
//                     ? "bg-[#1D4ED8] text-white shadow-lg"
//                     : "text-white/55 hover:bg-white/5 hover:text-white"
//                 }`}
//               >
//
//                 <Icon size={17} />
//
//                 <span>
//                   {item.label}
//                 </span>
//
//                 {isActive && (
//                   <ChevronRight
//                     size={14}
//                     className="ml-auto"
//                   />
//                 )}
//
//               </button>
//             );
//           })}
//
//         </nav>
//
//         <div className="p-4 rounded-xl bg-[#16273D] border border-white/10 mb-5">
//
//           <div className="flex items-center gap-2 text-[#8DA7E5] font-semibold text-sm">
//
//             <Flame size={15} />
//
//             7-day streak
//
//           </div>
//
//           <p className="text-[11px] leading-5 text-white/40 mt-2">
//
//             Keep testing daily to improve your
//             Placement Readiness Index.
//
//           </p>
//
//         </div>
//
//         <div className="pt-4 border-t border-white/10 space-y-1">
//
//           <button
//             type="button"
//             className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white/55 hover:bg-white/5 hover:text-white text-sm"
//           >
//
//             <Settings size={16} />
//
//             Settings
//
//           </button>
//
//           <button
//             type="button"
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white/55 hover:bg-white/5 hover:text-white text-sm"
//           >
//
//             <LogOut size={16} />
//
//             Sign out
//
//           </button>
//
//         </div>
//
//       </aside>
//
//       {/* ======================================================
//           MAIN
//       ====================================================== */}
//
//       <main className="flex-1 min-w-0">
//
//         <div className="p-8 lg:p-10 max-w-6xl mx-auto">
//
//           <div className="mb-8">
//
//             <p className="text-[10px] uppercase tracking-[1.8px] font-semibold text-[#7D95C4] mb-2">
//               Developer Profiles
//             </p>
//
//             <h1 className="text-3xl font-semibold text-[#0E1A2B]">
//               Coding Profiles
//             </h1>
//
//             <p className="text-sm text-[#667085] mt-2">
//               Connect your GitHub and LeetCode
//               profiles to improve your
//               Placement Readiness Index.
//             </p>
//
//           </div>
//
//           {/* USER */}
//
//           <div className="mb-5 flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3">
//
//             <User size={17} />
//
//             <div className="text-sm">
//
//               Logged in User ID:
//
//               <strong className="ml-1">
//                 {getUserId() || "Not found"}
//               </strong>
//
//             </div>
//
//           </div>
//
//           {/* SUCCESS */}
//
//           {message && (
//             <div className="mb-5 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
//
//               <CheckCircle2 size={17} />
//
//               {message}
//
//             </div>
//           )}
//
//           {/* PROFILE MISSING */}
//
//           {!profileExists && !loading && (
//             <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">
//
//               <div className="flex items-start gap-4">
//
//                 <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
//
//                   <UserPlus size={21} />
//
//                 </div>
//
//                 <div className="flex-1">
//
//                   <h2 className="font-semibold text-amber-900">
//
//                     Complete your student profile
//
//                   </h2>
//
//                   <p className="text-sm text-amber-700 mt-1 leading-6">
//
//                     Your student profile has not been
//                     created yet. Complete your profile
//                     before connecting your GitHub and
//                     LeetCode accounts.
//
//                   </p>
//
//                   <button
//                     type="button"
//                     onClick={() =>
//                       navigate("/student/profile")
//                     }
//                     className="mt-4 inline-flex items-center gap-2 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-5 py-3 rounded-xl text-sm font-semibold transition"
//                   >
//
//                     <UserPlus size={17} />
//
//                     Complete Profile
//
//                     <ChevronRight size={16} />
//
//                   </button>
//
//                 </div>
//
//               </div>
//
//             </div>
//           )}
//
//           {/* ERROR */}
//
//           {error && profileExists && (
//             <div className="mb-5 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
//
//               <AlertCircle
//                 size={17}
//                 className="mt-0.5 shrink-0"
//               />
//
//               <div>
//                 {error}
//               </div>
//
//             </div>
//           )}
//
//           {/* ==================================================
//               CONNECT
//           ================================================== */}
//
//           {profileExists && (
//             <>
//
//               <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 mb-6">
//
//                 <div className="mb-6">
//
//                   <h2 className="font-semibold text-[#0E1A2B]">
//                     Connect your profiles
//                   </h2>
//
//                   <p className="text-xs text-[#667085] mt-1">
//                     Enter your public GitHub and
//                     LeetCode usernames.
//                   </p>
//
//                 </div>
//
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//
//                   {/* GITHUB */}
//
//                   <div>
//
//                     <label className="block text-sm font-medium text-[#344054] mb-2">
//                       GitHub Username
//                     </label>
//
//                     <div className="relative">
//
//                       <GitBranch
//                         size={18}
//                         className="absolute left-3 top-3 text-[#667085]"
//                       />
//
//                       <input
//                         type="text"
//                         value={githubUsername}
//                         onChange={(e) =>
//                           setGithubUsername(
//                             e.target.value
//                           )
//                         }
//                         placeholder="octocat"
//                         className="w-full border border-[#D0D5DD] rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]"
//                       />
//
//                     </div>
//
//                     <p className="text-[11px] text-[#98A2B3] mt-2">
//                       github.com/username
//                     </p>
//
//                   </div>
//
//                   {/* LEETCODE */}
//
//                   <div>
//
//                     <label className="block text-sm font-medium text-[#344054] mb-2">
//                       LeetCode Username
//                     </label>
//
//                     <div className="relative">
//
//                       <Code2
//                         size={18}
//                         className="absolute left-3 top-3 text-[#667085]"
//                       />
//
//                       <input
//                         type="text"
//                         value={leetcodeUsername}
//                         onChange={(e) =>
//                           setLeetcodeUsername(
//                             e.target.value
//                           )
//                         }
//                         placeholder="yourusername"
//                         className="w-full border border-[#D0D5DD] rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]"
//                       />
//
//                     </div>
//
//                     <p className="text-[11px] text-[#98A2B3] mt-2">
//                       leetcode.com/u/username
//                     </p>
//
//                   </div>
//
//                 </div>
//
//                 <div className="flex flex-wrap gap-3 mt-6">
//
//                   <button
//                     type="button"
//                     onClick={saveProfiles}
//                     disabled={saving}
//                     className="flex items-center gap-2 bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-50 text-white px-5 py-3 rounded-xl text-sm font-semibold transition"
//                   >
//
//                     {saving ? (
//                       <>
//                         <RefreshCw
//                           size={16}
//                           className="animate-spin"
//                         />
//
//                         Saving...
//
//                       </>
//                     ) : (
//                       <>
//                         <Save size={16} />
//
//                         Save Profiles
//
//                       </>
//                     )}
//
//                   </button>
//
//                   <button
//                     type="button"
//                     onClick={refreshProfiles}
//                     disabled={loading}
//                     className="flex items-center gap-2 border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB] disabled:opacity-50 px-5 py-3 rounded-xl text-sm font-semibold text-[#344054]"
//                   >
//
//                     <RefreshCw
//                       size={16}
//                       className={
//                         loading
//                           ? "animate-spin"
//                           : ""
//                       }
//                     />
//
//                     Refresh Data
//
//                   </button>
//
//                 </div>
//
//               </div>
//
//               {/* ==================================================
//                   RESULTS
//               ================================================== */}
//
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//
//                 {/* GITHUB */}
//
//                 <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6">
//
//                   <div className="flex items-center justify-between mb-5">
//
//                     <div className="flex items-center gap-3">
//
//                       <div className="w-11 h-11 rounded-xl bg-[#101828] text-white flex items-center justify-center">
//
//                         <GitBranch size={22} />
//
//                       </div>
//
//                       <div>
//
//                         <h2 className="font-semibold text-[#0E1A2B]">
//                           GitHub
//                         </h2>
//
//                         <p className="text-xs text-[#98A2B3]">
//                           Repository and profile data
//                         </p>
//
//                       </div>
//
//                     </div>
//
//                     {githubUsername && (
//                       <a
//                         href={`https://github.com/${githubUsername}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-[#1D4ED8]"
//                       >
//
//                         <ExternalLink size={17} />
//
//                       </a>
//                     )}
//
//                   </div>
//
//                   {githubData ? (
//
//                     <div>
//
//                       <div className="mb-4">
//
//                         <p className="text-sm text-[#667085]">
//                           Profile
//                         </p>
//
//                         <p className="font-semibold text-[#0E1A2B] mt-1">
//
//                           {githubData.name ||
//                             githubData.login ||
//                             githubUsername}
//
//                         </p>
//
//                       </div>
//
//                       <div className="grid grid-cols-2 gap-3">
//
//                         <Stat
//                           label="Repositories"
//                           value={
//                             githubData.publicRepos ??
//                             githubData.repositories ??
//                             0
//                           }
//                         />
//
//                         <Stat
//                           label="Followers"
//                           value={
//                             githubData.followers ?? 0
//                           }
//                         />
//
//                         <Stat
//                           label="Following"
//                           value={
//                             githubData.following ?? 0
//                           }
//                         />
//
//                         <Stat
//                           label="Profile Score"
//                           value={`${githubData.score ?? 0}%`}
//                         />
//
//                       </div>
//
//                     </div>
//
//                   ) : (
//
//                     <EmptyProfile
//                       icon={<GitBranch size={30} />}
//                       title="No GitHub data yet"
//                       description={
//                         githubUsername
//                           ? "Click Refresh Data to fetch GitHub information."
//                           : "Enter your GitHub username above."
//                       }
//                     />
//
//                   )}
//
//                 </div>
//
//                 {/* LEETCODE */}
//
//                 <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6">
//
//                   <div className="flex items-center justify-between mb-5">
//
//                     <div className="flex items-center gap-3">
//
//                       <div className="w-11 h-11 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center">
//
//                         <Code2 size={22} />
//
//                       </div>
//
//                       <div>
//
//                         <h2 className="font-semibold text-[#0E1A2B]">
//                           LeetCode
//                         </h2>
//
//                         <p className="text-xs text-[#98A2B3]">
//                           Problem solving performance
//                         </p>
//
//                       </div>
//
//                     </div>
//
//                     {leetcodeUsername && (
//                       <a
//                         href={`https://leetcode.com/u/${leetcodeUsername}/`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-[#1D4ED8]"
//                       >
//
//                         <ExternalLink size={17} />
//
//                       </a>
//                     )}
//
//                   </div>
//
//                   {leetcodeData ? (
//
//                     <div>
//
//                       <div className="mb-4">
//
//                         <p className="text-sm text-[#667085]">
//                           Profile
//                         </p>
//
//                         <p className="font-semibold text-[#0E1A2B] mt-1">
//
//                           {leetcodeData.username ||
//                             leetcodeUsername}
//
//                         </p>
//
//                       </div>
//
//                       <div className="grid grid-cols-2 gap-3">
//
//                         <Stat
//                           label="Problems Solved"
//                           value={
//                             leetcodeData.totalSolved ??
//                             leetcodeData.totalQuestionsSolved ??
//                             0
//                           }
//                         />
//
//                         <Stat
//                           label="Easy"
//                           value={
//                             leetcodeData.easySolved ?? 0
//                           }
//                         />
//
//                         <Stat
//                           label="Medium"
//                           value={
//                             leetcodeData.mediumSolved ?? 0
//                           }
//                         />
//
//                         <Stat
//                           label="Hard"
//                           value={
//                             leetcodeData.hardSolved ?? 0
//                           }
//                         />
//
//                       </div>
//
//                     </div>
//
//                   ) : (
//
//                     <EmptyProfile
//                       icon={<Code2 size={30} />}
//                       title="No LeetCode data yet"
//                       description={
//                         leetcodeUsername
//                           ? "Click Refresh Data to fetch LeetCode information."
//                           : "Enter your LeetCode username above."
//                       }
//                     />
//
//                   )}
//
//                 </div>
//
//               </div>
//
//               {/* ==================================================
//                   SUMMARY
//               ================================================== */}
//
//               <div className="mt-6 bg-white border border-[#E4E7EC] rounded-2xl p-6">
//
//                 <div className="flex items-center gap-3 mb-5">
//
//                   <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#1D4ED8] flex items-center justify-center">
//
//                     <User size={19} />
//
//                   </div>
//
//                   <div>
//
//                     <h2 className="font-semibold text-[#0E1A2B]">
//                       Connected Profiles
//                     </h2>
//
//                     <p className="text-xs text-[#667085]">
//                       These usernames are stored in your
//                       student profile.
//                     </p>
//
//                   </div>
//
//                 </div>
//
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//
//                   <div className="border border-[#E4E7EC] rounded-xl p-4">
//
//                     <p className="text-xs text-[#667085]">
//                       GitHub Username
//                     </p>
//
//                     <p className="font-semibold text-[#0E1A2B] mt-2">
//
//                       {githubUsername ||
//                         "Not connected"}
//
//                     </p>
//
//                   </div>
//
//                   <div className="border border-[#E4E7EC] rounded-xl p-4">
//
//                     <p className="text-xs text-[#667085]">
//                       LeetCode Username
//                     </p>
//
//                     <p className="font-semibold text-[#0E1A2B] mt-2">
//
//                       {leetcodeUsername ||
//                         "Not connected"}
//
//                     </p>
//
//                   </div>
//
//                 </div>
//
//               </div>
//
//               {/* ==================================================
//                   PRI
//               ================================================== */}
//
//               <div className="mt-6 bg-[#0E1A2B] rounded-2xl p-6 text-white">
//
//                 <div className="flex items-start gap-4">
//
//                   <div className="w-11 h-11 rounded-xl bg-[#1D4ED8] flex items-center justify-center shrink-0">
//
//                     <Sparkles size={21} />
//
//                   </div>
//
//                   <div>
//
//                     <h2 className="font-semibold">
//                       How this affects your PRI
//                     </h2>
//
//                     <p className="text-sm text-white/60 mt-2 leading-6">
//
//                       Your GitHub repositories,
//                       followers and LeetCode problem
//                       solving activity can be used as
//                       additional technical evidence for
//                       your Placement Readiness Index.
//
//                     </p>
//
//                   </div>
//
//                 </div>
//
//               </div>
//
//             </>
//           )}
//
//         </div>
//
//       </main>
//
//     </div>
//   );
// }
//
// /* ============================================================
//    STAT
// ============================================================ */
//
// function Stat({ label, value }) {
//   return (
//     <div className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-4">
//
//       <p className="text-xs text-[#667085]">
//         {label}
//       </p>
//
//       <p className="text-xl font-semibold text-[#0E1A2B] mt-2">
//         {value}
//       </p>
//
//     </div>
//   );
// }
//
// /* ============================================================
//    EMPTY
// ============================================================ */
//
// function EmptyProfile({
//   icon,
//   title,
//   description,
// }) {
//   return (
//     <div className="border border-dashed border-[#D0D5DD] rounded-xl p-8 text-center">
//
//       <div className="text-[#98A2B3] flex justify-center mb-3">
//         {icon}
//       </div>
//
//       <p className="text-sm font-medium text-[#475467]">
//         {title}
//       </p>
//
//       <p className="text-xs text-[#98A2B3] mt-1">
//         {description}
//       </p>
//
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Code2,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  User,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import StudentSidebar from "../student/StudentSidebar";

const API_BASE_URL = "http://localhost:8080";

export default function StudentExternalProfiles() {
  const location = useLocation();

  const [githubUsername, setGithubUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");

  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ============================================================
     USER ID
  ============================================================ */

  const getUserId = () => {
    const userId =
      localStorage.getItem("userId") ||
      localStorage.getItem("studentId");

    if (userId) {
      return userId;
    }

    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (user?.id) return user.id;
      if (user?.userId) return user.userId;
      if (user?.studentId) return user.studentId;
    } catch (e) {
      console.log("No JSON user object found");
    }

    return null;
  };

  /* ============================================================
     AXIOS CONFIG
  ============================================================ */

  const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
    };
  };

  /* ============================================================
     LOAD PROFILE
  ============================================================ */

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const userId = getUserId();

      console.log("Loading external profile for user:", userId);

      if (!userId) {
        setError("User ID not found. Please logout and login again.");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/student/external-profiles`,
        {
          ...getConfig(),
          params: {
            userId,
          },
        }
      );

      console.log("External profile response:", response.data);

      const data = response.data || {};

      setGithubUsername(data.githubUsername || data.github_username || "");
      setLeetcodeUsername(
        data.leetcodeUsername || data.leetcode_username || ""
      );

      setGithubData(data.github || null);
      setLeetcodeData(data.leetcode || null);
    } catch (err) {
      console.error("Load external profile error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to load coding profile."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     SAVE PROFILES
  ============================================================ */

  const saveProfiles = async () => {
    setMessage("");
    setError("");

    const userId = getUserId();

    if (!userId) {
      setError("User ID not found. Please login again.");
      return;
    }

    if (!githubUsername.trim() && !leetcodeUsername.trim()) {
      setError("Please enter at least one GitHub or LeetCode username.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        githubUsername: githubUsername.trim() || null,
        leetcodeUsername: leetcodeUsername.trim() || null,
      };

      console.log("Saving external profiles:", payload);

      const response = await axios.put(
        `${API_BASE_URL}/api/student/external-profiles`,
        payload,
        {
          ...getConfig(),
          params: {
            userId,
          },
        }
      );

      const data = response.data || {};

      setGithubUsername(
        data.githubUsername || data.github_username || githubUsername
      );
      setLeetcodeUsername(
        data.leetcodeUsername || data.leetcode_username || leetcodeUsername
      );

      setGithubData(data.github || null);
      setLeetcodeData(data.leetcode || null);

      setMessage("Coding profiles saved successfully.");
    } catch (err) {
      console.error("Save external profile error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to save coding profiles."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     REFRESH DATA
  ============================================================ */

  const refreshProfiles = async () => {
    setMessage("");
    setError("");

    const userId = getUserId();

    if (!userId) {
      setError("User ID not found. Please login again.");
      return;
    }

    if (!githubUsername.trim() && !leetcodeUsername.trim()) {
      setError("Please save your usernames first.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/student/external-profiles/refresh`,
        {},
        {
          ...getConfig(),
          params: {
            userId,
          },
        }
      );

      const data = response.data || {};

      setGithubData(data.github || null);
      setLeetcodeData(data.leetcode || null);

      setMessage("External profile data refreshed successfully.");
    } catch (err) {
      console.error("Refresh error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to refresh external profile data."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#101828]">
      {/* SIDEBAR */}
      <StudentSidebar />

      {/* MAIN CONTENT */}
      <main className="min-h-screen lg:ml-[270px]">
        <div className="p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[1.8px] font-semibold text-[#7D95C4] mb-2">
              Developer Profiles
            </p>

            <h1 className="text-3xl font-semibold text-[#0E1A2B]">
              Coding Profiles
            </h1>

            <p className="text-sm text-[#667085] mt-2">
              Connect your GitHub and LeetCode profiles to improve your
              Placement Readiness Index.
            </p>
          </div>

          {/* USER ID */}
          <div className="mb-5 flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3">
            <User size={17} />
            <div className="text-sm">
              Logged in User ID:
              <strong className="ml-1">{getUserId() || "Not found"}</strong>
            </div>
          </div>

          {/* SUCCESS */}
          {message && (
            <div className="mb-5 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
              <CheckCircle2 size={17} />
              {message}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-5 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              <AlertCircle size={17} className="mt-0.5 shrink-0" />
              <div>{error}</div>
            </div>
          )}

          {/* CONNECT PROFILES */}
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 mb-6">
            <div className="mb-6">
              <h2 className="font-semibold text-[#0E1A2B]">
                Connect your profiles
              </h2>
              <p className="text-xs text-[#667085] mt-1">
                Enter your public GitHub and LeetCode usernames.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* GITHUB */}
              <div>
                <label className="block text-sm font-medium text-[#344054] mb-2">
                  GitHub Username
                </label>

                <div className="relative">
                  <Code2
                    size={18}
                    className="absolute left-3 top-3 text-[#667085]"
                  />

                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="octocat"
                    className="w-full border border-[#D0D5DD] rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]"
                  />
                </div>

                <p className="text-[11px] text-[#98A2B3] mt-2">
                  github.com/username
                </p>
              </div>

              {/* LEETCODE */}
              <div>
                <label className="block text-sm font-medium text-[#344054] mb-2">
                  LeetCode Username
                </label>

                <div className="relative">
                  <Code2
                    size={18}
                    className="absolute left-3 top-3 text-[#667085]"
                  />

                  <input
                    type="text"
                    value={leetcodeUsername}
                    onChange={(e) => setLeetcodeUsername(e.target.value)}
                    placeholder="yourusername"
                    className="w-full border border-[#D0D5DD] rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]"
                  />
                </div>

                <p className="text-[11px] text-[#98A2B3] mt-2">
                  leetcode.com/u/username
                </p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                type="button"
                onClick={saveProfiles}
                disabled={saving}
                className="flex items-center gap-2 bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-50 text-white px-5 py-3 rounded-xl text-sm font-semibold transition"
              >
                {saving ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Profiles
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={refreshProfiles}
                disabled={loading}
                className="flex items-center gap-2 border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB] disabled:opacity-50 px-5 py-3 rounded-xl text-sm font-semibold text-[#344054]"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                Refresh Data
              </button>
            </div>
          </div>

          {/* PROFILE RESULTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* GITHUB */}
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#101828] text-white flex items-center justify-center">
                    <Code2 size={22} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[#0E1A2B]">GitHub</h2>
                    <p className="text-xs text-[#98A2B3]">
                      Repository and profile data
                    </p>
                  </div>
                </div>

                {githubUsername && (
                  <a
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1D4ED8]"
                  >
                    <ExternalLink size={17} />
                  </a>
                )}
              </div>

              {githubData ? (
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-[#667085]">Profile</p>
                    <p className="font-semibold text-[#0E1A2B] mt-1">
                      {githubData.name || githubData.login || githubUsername}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Stat
                      label="Repositories"
                      value={githubData.publicRepos ?? githubData.repositories ?? 0}
                    />
                    <Stat label="Followers" value={githubData.followers ?? 0} />
                    <Stat label="Following" value={githubData.following ?? 0} />
                    <Stat
                      label="Profile Score"
                      value={`${githubData.score ?? 0}%`}
                    />
                  </div>
                </div>
              ) : (
                <EmptyProfile
                  icon={<Code2 size={30} />}
                  title="No GitHub data yet"
                  description={
                    githubUsername
                      ? "Click Refresh Data to fetch GitHub information."
                      : "Enter your GitHub username above."
                  }
                />
              )}
            </div>

            {/* LEETCODE */}
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center">
                    <Code2 size={22} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[#0E1A2B]">LeetCode</h2>
                    <p className="text-xs text-[#98A2B3]">
                      Problem solving performance
                    </p>
                  </div>
                </div>

                {leetcodeUsername && (
                  <a
                    href={`https://leetcode.com/u/${leetcodeUsername}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1D4ED8]"
                  >
                    <ExternalLink size={17} />
                  </a>
                )}
              </div>

              {leetcodeData ? (
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-[#667085]">Profile</p>
                    <p className="font-semibold text-[#0E1A2B] mt-1">
                      {leetcodeData.username || leetcodeUsername}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Stat
                      label="Problems Solved"
                      value={
                        leetcodeData.totalSolved ??
                        leetcodeData.totalQuestionsSolved ??
                        0
                      }
                    />
                    <Stat label="Easy" value={leetcodeData.easySolved ?? 0} />
                    <Stat label="Medium" value={leetcodeData.mediumSolved ?? 0} />
                    <Stat label="Hard" value={leetcodeData.hardSolved ?? 0} />
                  </div>
                </div>
              ) : (
                <EmptyProfile
                  icon={<Code2 size={30} />}
                  title="No LeetCode data yet"
                  description={
                    leetcodeUsername
                      ? "Click Refresh Data to fetch LeetCode information."
                      : "Enter your LeetCode username above."
                  }
                />
              )}
            </div>
          </div>

          {/* CONNECTED PROFILES */}
          <div className="mt-6 bg-white border border-[#E4E7EC] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#1D4ED8] flex items-center justify-center">
                <User size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-[#0E1A2B]">
                  Connected Profiles
                </h2>
                <p className="text-xs text-[#667085]">
                  Your connected coding usernames.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#E4E7EC] rounded-xl p-4">
                <p className="text-xs text-[#667085]">GitHub Username</p>
                <p className="font-semibold text-[#0E1A2B] mt-2">
                  {githubUsername || "Not connected"}
                </p>
              </div>

              <div className="border border-[#E4E7EC] rounded-xl p-4">
                <p className="text-xs text-[#667085]">LeetCode Username</p>
                <p className="font-semibold text-[#0E1A2B] mt-2">
                  {leetcodeUsername || "Not connected"}
                </p>
              </div>
            </div>
          </div>

          {/* PRI */}
          <div className="mt-6 bg-[#0E1A2B] rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1D4ED8] flex items-center justify-center shrink-0">
                <Sparkles size={21} />
              </div>

              <div>
                <h2 className="font-semibold">How this affects your PRI</h2>
                <p className="text-sm text-white/60 mt-2 leading-6">
                  Your GitHub repositories, followers and LeetCode problem
                  solving activity can be used as additional technical
                  evidence for your Placement Readiness Index.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ============================================================
   STAT
============================================================ */

function Stat({ label, value }) {
  return (
    <div className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-4">
      <p className="text-xs text-[#667085]">{label}</p>
      <p className="text-xl font-semibold text-[#0E1A2B] mt-2">{value}</p>
    </div>
  );
}

/* ============================================================
   EMPTY PROFILE
============================================================ */

function EmptyProfile({ icon, title, description }) {
  return (
    <div className="border border-dashed border-[#D0D5DD] rounded-xl p-8 text-center">
      <div className="text-[#98A2B3] flex justify-center mb-3">{icon}</div>
      <p className="text-sm font-medium text-[#475467]">{title}</p>
      <p className="text-xs text-[#98A2B3] mt-1">{description}</p>
    </div>
  );
}