// import React, { useEffect, useState } from "react";
// import {
//   User,
//   Mail,
//   Phone,
//   Building2,
//   GraduationCap,
//   GitBranch,
//   Code2,
//   Save,
//   ArrowLeft,
//   Loader2,
//   CheckCircle2,
//   AlertCircle,
//   LayoutGrid,
//   ClipboardList,
//   Sparkles,
//   Map,
//   ChevronRight,
//   Flame,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
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
//    INITIAL FORM
// ============================================================ */
//
// const INITIAL_FORM = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   department: "",
//   branch: "",
//   year: "",
//   githubUsername: "",
//   leetcodeUsername: "",
// };
//
// /* ============================================================
//    MAIN COMPONENT
// ============================================================ */
//
// export default function StudentProfile() {
//   const navigate = useNavigate();
//
//   const [form, setForm] = useState(INITIAL_FORM);
//
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//
//   const [profileExists, setProfileExists] = useState(false);
//
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//
//   /* ============================================================
//      USER ID
//   ============================================================ */
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
//   ============================================================ */
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
//      LOAD PROFILE
//   ============================================================ */
//
//   useEffect(() => {
//     loadProfile();
//   }, []);
//
//   const loadProfile = async () => {
//     try {
//       setLoading(true);
//       setError("");
//
//       const userId = getUserId();
//
//       console.log("Loading student profile for:", userId);
//
//       if (!userId) {
//         setError(
//           "User ID not found. Please logout and login again."
//         );
//         return;
//       }
//
//       const response = await axios.get(
//         `${API_BASE_URL}/api/student/profile`,
//         {
//           ...getConfig(),
//           params: {
//             userId,
//           },
//         }
//       );
//
//       console.log(
//         "Student profile response:",
//         response.data
//       );
//
//       const data = response.data;
//
//       setForm({
//         firstName: data.firstName || "",
//         lastName: data.lastName || "",
//         email: data.email || "",
//         phone: data.phone || data.phoneNumber || "",
//         department: data.department || "",
//         branch: data.branch || "",
//         year:
//           data.year !== null &&
//           data.year !== undefined
//             ? String(data.year)
//             : "",
//         githubUsername:
//           data.githubUsername ||
//           data.github_username ||
//           "",
//         leetcodeUsername:
//           data.leetcodeUsername ||
//           data.leetcode_username ||
//           "",
//       });
//
//       setProfileExists(true);
//     } catch (err) {
//       console.error(
//         "Load student profile error:",
//         err
//       );
//
//       if (
//         err.response?.status === 404 ||
//         err.response?.status === 500
//       ) {
//         /*
//          * Profile does not exist.
//          *
//          * We can still use the email from login.
//          */
//
//         const loggedEmail =
//           localStorage.getItem("email") || "";
//
//         setForm({
//           ...INITIAL_FORM,
//           email: loggedEmail,
//         });
//
//         setProfileExists(false);
//       } else {
//         setError(
//           err.response?.data?.message ||
//             err.response?.data ||
//             "Unable to load student profile."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   /* ============================================================
//      INPUT CHANGE
//   ============================================================ */
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//
//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//
//     setError("");
//     setMessage("");
//   };
//
//   /* ============================================================
//      VALIDATION
//   ============================================================ */
//
//   const validateForm = () => {
//     if (!form.firstName.trim()) {
//       setError("Please enter your first name.");
//       return false;
//     }
//
//     if (!form.lastName.trim()) {
//       setError("Please enter your last name.");
//       return false;
//     }
//
//     if (!form.email.trim()) {
//       setError("Please enter your email.");
//       return false;
//     }
//
//     if (!form.phone.trim()) {
//       setError("Please enter your phone number.");
//       return false;
//     }
//
//     if (!form.department.trim()) {
//       setError("Please enter your department.");
//       return false;
//     }
//
//     if (!form.branch.trim()) {
//       setError("Please enter your branch.");
//       return false;
//     }
//
//     if (!form.year) {
//       setError("Please select your year.");
//       return false;
//     }
//
//     return true;
//   };
//
//   /* ============================================================
//      SAVE PROFILE
//   ============================================================ */
//
//   const saveProfile = async (e) => {
//     e.preventDefault();
//
//     setMessage("");
//     setError("");
//
//     if (!validateForm()) {
//       return;
//     }
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
//     try {
//       setSaving(true);
//
//       const payload = {
//         firstName: form.firstName.trim(),
//         lastName: form.lastName.trim(),
//         email: form.email.trim(),
//         phone: form.phone.trim(),
//         department: form.department.trim(),
//         branch: form.branch.trim(),
//         year: Number(form.year),
//         githubUsername:
//           form.githubUsername.trim() || null,
//         leetcodeUsername:
//           form.leetcodeUsername.trim() || null,
//       };
//
//       console.log(
//         "Saving student profile:",
//         payload
//       );
//
//       let response;
//
//       if (profileExists) {
//         response = await axios.put(
//           `${API_BASE_URL}/api/student/profile`,
//           payload,
//           {
//             ...getConfig(),
//             params: {
//               userId,
//             },
//           }
//         );
//       } else {
//         response = await axios.post(
//           `${API_BASE_URL}/api/student/profile`,
//           payload,
//           {
//             ...getConfig(),
//             params: {
//               userId,
//             },
//           }
//         );
//       }
//
//       console.log(
//         "Profile saved:",
//         response.data
//       );
//
//       setProfileExists(true);
//
//       setMessage(
//         "Student profile saved successfully."
//       );
//
//       /*
//        * Redirect to Coding Profiles after
//        * successful profile creation.
//        */
//
//       setTimeout(() => {
//         navigate("/student/external-profiles");
//       }, 800);
//     } catch (err) {
//       console.error(
//         "Save student profile error:",
//         err
//       );
//
//       setError(
//         err.response?.data?.message ||
//           err.response?.data ||
//           "Unable to save student profile."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };
//
//   /* ============================================================
//      LOGOUT
//   ============================================================ */
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
//      LOADING
//   ============================================================ */
//
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
//
//         <div className="flex flex-col items-center gap-3">
//
//           <Loader2
//             size={35}
//             className="animate-spin text-[#1D4ED8]"
//           />
//
//           <p className="text-sm text-[#667085]">
//             Loading your profile...
//           </p>
//
//         </div>
//
//       </div>
//     );
//   }
//
//   /* ============================================================
//      RENDER
//   ============================================================ */
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
//         {/* LOGO */}
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
//         {/* NAVIGATION */}
//
//         <nav className="flex-1 space-y-1">
//
//           {NAV_ITEMS.map((item) => {
//
//             const Icon = item.icon;
//
//             const isActive =
//               item.key === "profile";
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
//         {/* STREAK */}
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
//         {/* BOTTOM */}
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
//         <div className="p-8 lg:p-10 max-w-5xl mx-auto">
//
//           {/* BACK */}
//
//           <button
//             type="button"
//             onClick={() =>
//               navigate("/student/external-profiles")
//             }
//             className="flex items-center gap-2 text-sm text-[#667085] hover:text-[#1D4ED8] mb-6"
//           >
//
//             <ArrowLeft size={17} />
//
//             Back to Coding Profiles
//
//           </button>
//
//           {/* HEADER */}
//
//           <div className="mb-8">
//
//             <p className="text-[10px] uppercase tracking-[1.8px] font-semibold text-[#7D95C4] mb-2">
//               Student Information
//             </p>
//
//             <h1 className="text-3xl font-semibold text-[#0E1A2B]">
//               Complete Your Profile
//             </h1>
//
//             <p className="text-sm text-[#667085] mt-2">
//               Enter your details so we can build
//               your placement profile and connect
//               your coding accounts.
//             </p>
//
//           </div>
//
//           {/* USER ID */}
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
//           {/* ERROR */}
//
//           {error && (
//             <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-4 text-sm">
//
//               <AlertCircle
//                 size={18}
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
//               FORM
//           ================================================== */}
//
//           <form
//             onSubmit={saveProfile}
//             className="space-y-6"
//           >
//
//             {/* ==================================================
//                 PERSONAL INFORMATION
//             ================================================== */}
//
//             <section className="bg-white border border-[#E4E7EC] rounded-2xl p-6">
//
//               <div className="flex items-center gap-3 mb-6">
//
//                 <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#1D4ED8] flex items-center justify-center">
//
//                   <User size={19} />
//
//                 </div>
//
//                 <div>
//
//                   <h2 className="font-semibold text-[#0E1A2B]">
//                     Personal Information
//                   </h2>
//
//                   <p className="text-xs text-[#667085]">
//                     Basic information about you
//                   </p>
//
//                 </div>
//
//               </div>
//
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//
//                 <InputField
//                   label="First Name"
//                   name="firstName"
//                   value={form.firstName}
//                   onChange={handleChange}
//                   placeholder="Dhivya"
//                   icon={<User size={17} />}
//                   required
//                 />
//
//                 <InputField
//                   label="Last Name"
//                   name="lastName"
//                   value={form.lastName}
//                   onChange={handleChange}
//                   placeholder="Dharshini"
//                   icon={<User size={17} />}
//                   required
//                 />
//
//                 <InputField
//                   label="Email"
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="your@email.com"
//                   icon={<Mail size={17} />}
//                   required
//                 />
//
//                 <InputField
//                   label="Phone Number"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   placeholder="9876543210"
//                   icon={<Phone size={17} />}
//                   required
//                 />
//
//               </div>
//
//             </section>
//
//             {/* ==================================================
//                 ACADEMIC INFORMATION
//             ================================================== */}
//
//             <section className="bg-white border border-[#E4E7EC] rounded-2xl p-6">
//
//               <div className="flex items-center gap-3 mb-6">
//
//                 <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
//
//                   <GraduationCap size={19} />
//
//                 </div>
//
//                 <div>
//
//                   <h2 className="font-semibold text-[#0E1A2B]">
//                     Academic Information
//                   </h2>
//
//                   <p className="text-xs text-[#667085]">
//                     Your college and academic details
//                   </p>
//
//                 </div>
//
//               </div>
//
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//
//                 <InputField
//                   label="Department"
//                   name="department"
//                   value={form.department}
//                   onChange={handleChange}
//                   placeholder="Computer Science and Engineering"
//                   icon={<Building2 size={17} />}
//                   required
//                 />
//
//                 <InputField
//                   label="Branch"
//                   name="branch"
//                   value={form.branch}
//                   onChange={handleChange}
//                   placeholder="CSE"
//                   icon={<GraduationCap size={17} />}
//                   required
//                 />
//
//                 <div>
//
//                   <label className="block text-sm font-medium text-[#344054] mb-2">
//                     Current Year
//                   </label>
//
//                   <select
//                     name="year"
//                     value={form.year}
//                     onChange={handleChange}
//                     className="w-full border border-[#D0D5DD] rounded-xl px-4 py-3 text-sm outline-none bg-white focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]"
//                     required
//                   >
//
//                     <option value="">
//                       Select year
//                     </option>
//
//                     <option value="1">
//                       1st Year
//                     </option>
//
//                     <option value="2">
//                       2nd Year
//                     </option>
//
//                     <option value="3">
//                       3rd Year
//                     </option>
//
//                     <option value="4">
//                       4th Year
//                     </option>
//
//                   </select>
//
//                 </div>
//
//               </div>
//
//             </section>
//
//             {/* ==================================================
//                 CODING PROFILES
//             ================================================== */}
//
//             <section className="bg-white border border-[#E4E7EC] rounded-2xl p-6">
//
//               <div className="flex items-center gap-3 mb-6">
//
//                 <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center">
//
//                   <Code2 size={19} />
//
//                 </div>
//
//                 <div>
//
//                   <h2 className="font-semibold text-[#0E1A2B]">
//                     Coding Profiles
//                   </h2>
//
//                   <p className="text-xs text-[#667085]">
//                     These usernames will be used to
//                     calculate your technical readiness.
//                   </p>
//
//                 </div>
//
//               </div>
//
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//
//                 <InputField
//                   label="GitHub Username"
//                   name="githubUsername"
//                   value={form.githubUsername}
//                   onChange={handleChange}
//                   placeholder="your-github-username"
//                   icon={<GitBranch size={17} />}
//                 />
//
//                 <InputField
//                   label="LeetCode Username"
//                   name="leetcodeUsername"
//                   value={form.leetcodeUsername}
//                   onChange={handleChange}
//                   placeholder="your-leetcode-username"
//                   icon={<Code2 size={17} />}
//                 />
//
//               </div>
//
//               <div className="mt-5 bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-4">
//
//                 <p className="text-xs text-[#667085] leading-5">
//
//                   <strong className="text-[#344054]">
//                     Why do we need these?
//                   </strong>
//
//                   <br />
//
//                   GitHub activity and LeetCode problem
//                   solving data can be used as additional
//                   technical evidence when calculating
//                   your Placement Readiness Index.
//
//                 </p>
//
//               </div>
//
//             </section>
//
//             {/* ==================================================
//                 SAVE
//             ================================================== */}
//
//             <div className="flex justify-end gap-3">
//
//               <button
//                 type="button"
//                 onClick={() =>
//                   navigate(
//                     "/student/external-profiles"
//                   )
//                 }
//                 className="flex items-center gap-2 border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB] px-5 py-3 rounded-xl text-sm font-semibold text-[#344054]"
//               >
//
//                 Cancel
//
//               </button>
//
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="flex items-center gap-2 bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-50 text-white px-6 py-3 rounded-xl text-sm font-semibold transition"
//               >
//
//                 {saving ? (
//                   <>
//                     <Loader2
//                       size={17}
//                       className="animate-spin"
//                     />
//
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={17} />
//
//                     Save Profile
//                   </>
//                 )}
//
//               </button>
//
//             </div>
//
//           </form>
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
//    INPUT FIELD
// ============================================================ */
//
// function InputField({
//   label,
//   name,
//   type = "text",
//   value,
//   onChange,
//   placeholder,
//   icon,
//   required = false,
// }) {
//   return (
//     <div>
//
//       <label className="block text-sm font-medium text-[#344054] mb-2">
//
//         {label}
//
//         {required && (
//           <span className="text-red-500 ml-1">
//             *
//           </span>
//         )}
//
//       </label>
//
//       <div className="relative">
//
//         <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">
//           {icon}
//         </div>
//
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           required={required}
//           className="w-full border border-[#D0D5DD] rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]"
//         />
//
//       </div>
//
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Save,
  ArrowLeft,
  User,
  Mail,
  Phone,
  GraduationCap,
  GitBranch,
  Code2,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080";

export default function StudentProfile() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    branch: "",
    year: "",
    githubUsername: "",
    leetcodeUsername: "",
  });

  // ============================================================
  // GET USER ID
  // ============================================================

  const getUserId = () => {

    const userId =
      localStorage.getItem("userId") ||
      localStorage.getItem("studentId");

    if (userId) {
      return userId;
    }

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (user?.id) return user.id;

      if (user?.userId) return user.userId;

      if (user?.studentId) return user.studentId;

    } catch (e) {
      console.log(
        "User JSON not found"
      );
    }

    return null;
  };

  // ============================================================
  // AXIOS CONFIG
  // ============================================================

  const getConfig = () => {

    const token =
      localStorage.getItem("token");

    return token
      ? {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
        }
      : {};
  };

  // ============================================================
  // LOAD PROFILE
  // ============================================================

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      setLoading(true);
      setError("");
      setMessage("");

      const userId =
        getUserId();

      console.log(
        "Loading student profile for:",
        userId
      );

      if (!userId) {

        setError(
          "User ID not found. Please login again."
        );

        return;
      }

      const response =
        await axios.get(
          `${API_BASE_URL}/api/student/profile`,
          {
            ...getConfig(),
            params: {
              userId,
            },
          }
        );

      console.log(
        "Student profile:",
        response.data
      );

      const data =
        response.data;

      setForm({

        firstName:
          data.firstName || "",

        lastName:
          data.lastName || "",

        email:
          data.email || "",

        phone:
          data.phone || "",

        department:
          data.department || "",

        branch:
          data.branch || "",

        year:
          data.year || "",

        githubUsername:
          data.githubUsername || "",

        leetcodeUsername:
          data.leetcodeUsername || "",
      });

    } catch (err) {

      console.error(
        "Load student profile error:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Unable to load student profile."
      );

    } finally {

      setLoading(false);

    }
  };

  // ============================================================
  // INPUT
  // ============================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ============================================================
  // SAVE
  // ============================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    const userId =
      getUserId();

    if (!userId) {

      setError(
        "User ID not found. Please login again."
      );

      return;
    }

    // Basic validation

    if (!form.firstName.trim()) {

      setError(
        "Please enter your first name."
      );

      return;
    }

    if (!form.lastName.trim()) {

      setError(
        "Please enter your last name."
      );

      return;
    }

    if (!form.email.trim()) {

      setError(
        "Please enter your email."
      );

      return;
    }

    if (!form.phone.trim()) {

      setError(
        "Please enter your phone number."
      );

      return;
    }

    if (!form.department.trim()) {

      setError(
        "Please select your department."
      );

      return;
    }

    if (!form.branch.trim()) {

      setError(
        "Please select your branch."
      );

      return;
    }

    if (!form.year) {

      setError(
        "Please select your year."
      );

      return;
    }

    try {

      setSaving(true);

      console.log(
        "Saving student profile:",
        form
      );

      const payload = {

        firstName:
          form.firstName.trim(),

        lastName:
          form.lastName.trim(),

        email:
          form.email.trim(),

        phone:
          form.phone.trim(),

        department:
          form.department,

        branch:
          form.branch,

        year:
          Number(form.year),

        githubUsername:
          form.githubUsername.trim() ||
          null,

        leetcodeUsername:
          form.leetcodeUsername.trim() ||
          null,
      };

      const response =
        await axios.put(
          `${API_BASE_URL}/api/student/profile`,
          payload,
          {
            ...getConfig(),
            params: {
              userId,
            },
          }
        );

      console.log(
        "Profile saved:",
        response.data
      );

      setMessage(
        "Student profile saved successfully."
      );

      // Move to external profiles

      setTimeout(() => {

        navigate(
          "/student/external-profiles"
        );

      }, 1000);

    } catch (err) {

      console.error(
        "Save student profile error:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Unable to save student profile."
      );

    } finally {

      setSaving(false);

    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">

        <div className="text-center">

          <Loader2
            size={35}
            className="animate-spin text-[#1D4ED8] mx-auto"
          />

          <p className="text-sm text-gray-500 mt-3">
            Loading your profile...
          </p>

        </div>

      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (

    <div className="min-h-screen bg-[#F8FAFC]">

      {/* HEADER */}

      <header className="bg-[#0E1A2B] text-white">

        <div className="max-w-5xl mx-auto px-6 py-5">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/student-dashboard"
              )
            }
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-5"
          >

            <ArrowLeft size={17} />

            Back to Dashboard

          </button>

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-[#1D4ED8] flex items-center justify-center">

              <User size={23} />

            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-white/50">
                Student Portal
              </p>

              <h1 className="text-2xl font-semibold">
                Complete Your Profile
              </h1>

            </div>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* INFORMATION */}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">

          <div className="flex gap-3">

            <User
              size={19}
              className="text-blue-600 mt-0.5"
            />

            <div>

              <p className="font-semibold text-blue-900 text-sm">
                Complete your student profile
              </p>

              <p className="text-sm text-blue-700 mt-1">
                This information will be used to
                calculate your Placement Readiness
                Index and recommend suitable
                placement opportunities.
              </p>

            </div>

          </div>

        </div>

        {/* SUCCESS */}

        {message && (

          <div className="mb-5 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 flex items-center gap-2 text-sm">

            <CheckCircle2 size={18} />

            {message}

          </div>

        )}

        {/* ERROR */}

        {error && (

          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 flex items-center gap-2 text-sm">

            <AlertCircle size={18} />

            {error}

          </div>

        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ====================================================
              PERSONAL INFORMATION
          ==================================================== */}

          <section className="bg-white border border-[#E4E7EC] rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

                <User size={19} />

              </div>

              <div>

                <h2 className="font-semibold text-[#101828]">
                  Personal Information
                </h2>

                <p className="text-xs text-gray-500">
                  Enter your basic details
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <Input
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Dhivyadharshini"
              />

              <Input
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="A"
              />

              <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                type="email"
              />

              <Input
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
              />

            </div>

          </section>

          {/* ====================================================
              EDUCATION
          ==================================================== */}

          <section className="bg-white border border-[#E4E7EC] rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">

                <GraduationCap size={19} />

              </div>

              <div>

                <h2 className="font-semibold text-[#101828]">
                  Academic Information
                </h2>

                <p className="text-xs text-gray-500">
                  Tell us about your education
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <Select
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
                options={[
                  "B.E",
                  "B.Tech",
                  "M.E",
                  "M.Tech",
                  "MCA",
                  "MBA",
                  "B.Sc",
                  "M.Sc",
                ]}
              />

              <Select
                label="Branch"
                name="branch"
                value={form.branch}
                onChange={handleChange}
                options={[
                  "CSE",
                  "IT",
                  "ECE",
                  "EEE",
                  "MECH",
                  "CIVIL",
                  "AIDS",
                  "AIML",
                ]}
              />

              <Select
                label="Year"
                name="year"
                value={form.year}
                onChange={handleChange}
                options={[
                  "1",
                  "2",
                  "3",
                  "4",
                ]}
              />

            </div>

          </section>

          {/* ====================================================
              CODING PROFILES
          ==================================================== */}

          <section className="bg-white border border-[#E4E7EC] rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">

                <Code2 size={19} />

              </div>

              <div>

                <h2 className="font-semibold text-[#101828]">
                  Coding Profiles
                </h2>

                <p className="text-xs text-gray-500">
                  Optional — you can add these later
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <Input
                label="GitHub Username"
                name="githubUsername"
                value={form.githubUsername}
                onChange={handleChange}
                placeholder="your-github-username"
                icon={
                  <GitBranch size={17} />
                }
              />

              <Input
                label="LeetCode Username"
                name="leetcodeUsername"
                value={form.leetcodeUsername}
                onChange={handleChange}
                placeholder="your-leetcode-username"
                icon={
                  <Code2 size={17} />
                }
              />

            </div>

          </section>

          {/* ====================================================
              SAVE
          ==================================================== */}

          <div className="flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-50 text-white px-7 py-3 rounded-xl font-semibold text-sm"
            >

              {saving ? (

                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Saving...

                </>

              ) : (

                <>
                  <Save size={17} />

                  Save Profile

                </>

              )}

            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

// ================================================================
// INPUT
// ================================================================

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}) {

  return (

    <div>

      <label className="block text-sm font-medium text-[#344054] mb-2">

        {label}

      </label>

      <div className="relative">

        {icon && (

          <div className="absolute left-3 top-3.5 text-gray-400">

            {icon}

          </div>

        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border border-[#D0D5DD] rounded-xl py-3 text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 ${
            icon
              ? "pl-10 pr-4"
              : "px-4"
          }`}
        />

      </div>

    </div>
  );
}

// ================================================================
// SELECT
// ================================================================

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {

  return (

    <div>

      <label className="block text-sm font-medium text-[#344054] mb-2">

        {label}

      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-[#D0D5DD] rounded-xl px-4 py-3 text-sm outline-none bg-white focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100"
      >

        <option value="">
          Select {label}
        </option>

        {options.map((option) => (

          <option
            key={option}
            value={option}
          >
            {option}
          </option>

        ))}

      </select>

    </div>
  );
}