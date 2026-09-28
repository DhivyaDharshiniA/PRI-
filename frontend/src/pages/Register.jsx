// // import React, { useState } from "react";
// // import axios from "axios";
// //
// // const Register = () => {
// //
// //     const [formData, setFormData] = useState({
// //         fullName: "",
// //         registerNumber: "",
// //         email: "",
// //         phoneNumber: "",
// //         password: "",
// //         role: "STUDENT"
// //     });
// //
// //
// //     const handleChange = (e) => {
// //
// //         setFormData({
// //             ...formData,
// //             [e.target.name]: e.target.value
// //         });
// //
// //     };
// //
// //     // Same effect as handleChange, just triggered from the segmented
// //     // control instead of a <select> — role still lands in formData.role
// //     // exactly the same way, so submission logic is untouched.
// //     const handleRoleSelect = (role) => {
// //
// //         setFormData({
// //             ...formData,
// //             role
// //         });
// //
// //     };
// //
// //
// //     const handleRegister = async (e) => {
// //
// //         e.preventDefault();
// //
// //         try {
// //
// //             const response = await axios.post(
// //                 "http://localhost:8080/api/auth/register",
// //                 formData
// //             );
// //
// //
// //             alert(response.data);
// //
// //             window.location.href = "/login";
// //
// //
// //         } catch(error) {
// //
// //             console.error(error);
// //
// //             alert(
// //                 error.response?.data ||
// //                 "Registration failed"
// //             );
// //
// //         }
// //
// //     };
// //
// //
// //     return (
// //
// //         <div className="reg-page">
// //
// //             <style>{`
// //                 @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
// //
// //                 * { box-sizing: border-box; }
// //
// //                 .reg-page {
// //                     --navy: #0e1a2b;
// //                     --navy-raised: #16273d;
// //                     --blue: #1d4ed8;
// //                     --blue-soft: rgba(29, 78, 216, 0.07);
// //                     --blue-soft-strong: rgba(29, 78, 216, 0.12);
// //                     --ink: #101828;
// //                     --muted: #667085;
// //                     --border: #e4e7ec;
// //                     --bg: #ffffff;
// //
// //                     min-height: 100vh;
// //                     width: 100%;
// //                     display: grid;
// //                     grid-template-columns: 1fr 1fr;
// //                     font-family: 'Inter', sans-serif;
// //                     color: var(--ink);
// //                     background: var(--bg);
// //                 }
// //
// //                 .reg-aside {
// //                     background: var(--navy);
// //                     color: #eef1f6;
// //                     padding: 56px 52px;
// //                     display: flex;
// //                     flex-direction: column;
// //                     justify-content: space-between;
// //                     position: relative;
// //                     overflow: hidden;
// //                 }
// //
// //                 .reg-aside::before {
// //                     content: "";
// //                     position: absolute;
// //                     inset: 0;
// //                     background: radial-gradient(700px 420px at 100% 0%, rgba(29,78,216,0.22), transparent 60%);
// //                     pointer-events: none;
// //                 }
// //
// //                 .reg-mark {
// //                     position: relative;
// //                     width: 44px;
// //                     height: 44px;
// //                     border-radius: 8px;
// //                     background: var(--navy-raised);
// //                     border: 1px solid rgba(255,255,255,0.12);
// //                     display: flex;
// //                     align-items: center;
// //                     justify-content: center;
// //                     font-family: 'Source Serif 4', serif;
// //                     font-weight: 600;
// //                     font-size: 17px;
// //                     letter-spacing: 0.5px;
// //                 }
// //
// //                 .reg-aside-body {
// //                     position: relative;
// //                     max-width: 380px;
// //                     margin-top: 40px;
// //                 }
// //
// //                 .reg-aside-eyebrow {
// //                     font-family: 'IBM Plex Mono', monospace;
// //                     font-size: 11px;
// //                     letter-spacing: 2px;
// //                     text-transform: uppercase;
// //                     color: #7d95c4;
// //                     margin-bottom: 16px;
// //                 }
// //
// //                 .reg-aside-title {
// //                     font-family: 'Source Serif 4', serif;
// //                     font-weight: 600;
// //                     font-size: 30px;
// //                     line-height: 1.3;
// //                     margin: 0 0 14px;
// //                 }
// //
// //                 .reg-aside-copy {
// //                     font-size: 14.5px;
// //                     line-height: 1.7;
// //                     color: #aab6cc;
// //                     margin: 0;
// //                 }
// //
// //                 .reg-aside-footer {
// //                     position: relative;
// //                     display: flex;
// //                     gap: 28px;
// //                     padding-top: 24px;
// //                     border-top: 1px solid rgba(255,255,255,0.1);
// //                 }
// //
// //                 .reg-stat-value {
// //                     font-family: 'Source Serif 4', serif;
// //                     font-size: 20px;
// //                     font-weight: 600;
// //                 }
// //
// //                 .reg-stat-label {
// //                     font-size: 11.5px;
// //                     color: #8a96ab;
// //                     margin-top: 2px;
// //                 }
// //
// //                 .reg-form-side {
// //                     display: flex;
// //                     align-items: center;
// //                     justify-content: center;
// //                     padding: 40px 24px;
// //                 }
// //
// //                 .reg-form-wrap {
// //                     width: 100%;
// //                     max-width: 380px;
// //                 }
// //
// //                 .reg-title {
// //                     font-size: 22px;
// //                     font-weight: 600;
// //                     margin: 0 0 6px;
// //                     letter-spacing: -0.2px;
// //                 }
// //
// //                 .reg-subtitle {
// //                     font-size: 14px;
// //                     color: var(--muted);
// //                     margin: 0 0 30px;
// //                 }
// //
// //                 .reg-form {
// //                     display: flex;
// //                     flex-direction: column;
// //                     gap: 16px;
// //                 }
// //
// //                 .reg-row {
// //                     display: grid;
// //                     grid-template-columns: 1fr 1fr;
// //                     gap: 12px;
// //                 }
// //
// //                 .reg-field {
// //                     display: flex;
// //                     flex-direction: column;
// //                     gap: 6px;
// //                 }
// //
// //                 .reg-label {
// //                     font-size: 13px;
// //                     font-weight: 500;
// //                     color: var(--ink);
// //                 }
// //
// //                 .reg-input {
// //                     background: #fff;
// //                     border: 1px solid var(--border);
// //                     border-radius: 6px;
// //                     padding: 10px 12px;
// //                     font-size: 14px;
// //                     font-family: 'Inter', sans-serif;
// //                     color: var(--ink);
// //                     outline: none;
// //                     transition: border-color 0.15s ease, box-shadow 0.15s ease;
// //                 }
// //
// //                 .reg-input::placeholder {
// //                     color: #98a2b3;
// //                 }
// //
// //                 .reg-input:focus {
// //                     border-color: var(--blue);
// //                     box-shadow: 0 0 0 3px var(--blue-soft);
// //                 }
// //
// //                 .reg-role-group {
// //                     display: flex;
// //                     flex-direction: column;
// //                     gap: 6px;
// //                 }
// //
// //                 .reg-role-tabs {
// //                     display: flex;
// //                     background: #f9fafb;
// //                     border: 1px solid var(--border);
// //                     border-radius: 6px;
// //                     padding: 3px;
// //                     gap: 3px;
// //                 }
// //
// //                 .reg-role-tab {
// //                     flex: 1;
// //                     border: none;
// //                     background: transparent;
// //                     color: var(--muted);
// //                     font-family: 'Inter', sans-serif;
// //                     font-size: 13px;
// //                     font-weight: 500;
// //                     padding: 9px 0;
// //                     border-radius: 5px;
// //                     cursor: pointer;
// //                     transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
// //                 }
// //
// //                 .reg-role-tab:hover {
// //                     color: var(--ink);
// //                 }
// //
// //                 .reg-role-tab--active {
// //                     background: #fff;
// //                     color: var(--blue);
// //                     box-shadow: 0 1px 2px rgba(16,24,40,0.08);
// //                 }
// //
// //                 .reg-submit {
// //                     margin-top: 8px;
// //                     background: var(--blue);
// //                     color: #fff;
// //                     border: none;
// //                     border-radius: 6px;
// //                     padding: 12px 0;
// //                     font-family: 'Inter', sans-serif;
// //                     font-weight: 600;
// //                     font-size: 14px;
// //                     cursor: pointer;
// //                     transition: background 0.15s ease, transform 0.05s ease;
// //                 }
// //
// //                 .reg-submit:hover {
// //                     background: #1740b8;
// //                 }
// //
// //                 .reg-submit:active {
// //                     transform: translateY(1px);
// //                 }
// //
// //                 .reg-footnote {
// //                     font-size: 13.5px;
// //                     color: var(--muted);
// //                     text-align: center;
// //                     margin-top: 22px;
// //                 }
// //
// //                 .reg-footnote a {
// //                     color: var(--blue);
// //                     font-weight: 500;
// //                     text-decoration: none;
// //                 }
// //
// //                 .reg-footnote a:hover {
// //                     text-decoration: underline;
// //                 }
// //
// //                 @media (max-width: 860px) {
// //                     .reg-page {
// //                         grid-template-columns: 1fr;
// //                     }
// //
// //                     .reg-aside {
// //                         display: none;
// //                     }
// //
// //                     .reg-form-side {
// //                         padding: 48px 20px;
// //                     }
// //                 }
// //
// //                 @media (max-width: 420px) {
// //                     .reg-row {
// //                         grid-template-columns: 1fr;
// //                     }
// //                 }
// //             `}</style>
// //
// //             <aside className="reg-aside">
// //
// //                 <div className="reg-mark">UR</div>
// //
// //                 <div className="reg-aside-body">
// //                     <div className="reg-aside-eyebrow">Registrar's Office</div>
// //                     <h1 className="reg-aside-title">Manage your academic records in one place.</h1>
// //                     <p className="reg-aside-copy">
// //                         One account gives students and administrators secure access
// //                         to enrollment, records and campus services.
// //                     </p>
// //                 </div>
// //
// //                 <div className="reg-aside-footer">
// //                     <div>
// //                         <div className="reg-stat-value">12,400+</div>
// //                         <div className="reg-stat-label">Students registered</div>
// //                     </div>
// //                     <div>
// //                         <div className="reg-stat-value">99.9%</div>
// //                         <div className="reg-stat-label">Portal uptime</div>
// //                     </div>
// //                     <div>
// //                         <div className="reg-stat-value">SOC 2</div>
// //                         <div className="reg-stat-label">Data handling</div>
// //                     </div>
// //                 </div>
// //
// //             </aside>
// //
// //             <div className="reg-form-side">
// //                 <div className="reg-form-wrap">
// //
// //                     <h2 className="reg-title">Create your account</h2>
// //                     <p className="reg-subtitle">Enrollment takes less than a minute.</p>
// //
// //                     <form className="reg-form" onSubmit={handleRegister}>
// //
// //                         <div className="reg-field">
// //                             <label className="reg-label" htmlFor="fullName">Full name</label>
// //                             <input
// //                                 id="fullName"
// //                                 className="reg-input"
// //                                 type="text"
// //                                 name="fullName"
// //                                 placeholder="Ananya Rao"
// //                                 value={formData.fullName}
// //                                 onChange={handleChange}
// //                                 required
// //                             />
// //                         </div>
// //
// //                         <div className="reg-row">
// //                             <div className="reg-field">
// //                                 <label className="reg-label" htmlFor="registerNumber">Register number</label>
// //                                 <input
// //                                     id="registerNumber"
// //                                     className="reg-input"
// //                                     type="text"
// //                                     name="registerNumber"
// //                                     placeholder="REG-0000"
// //                                     value={formData.registerNumber}
// //                                     onChange={handleChange}
// //                                 />
// //                             </div>
// //
// //                             <div className="reg-field">
// //                                 <label className="reg-label" htmlFor="phoneNumber">Phone number</label>
// //                                 <input
// //                                     id="phoneNumber"
// //                                     className="reg-input"
// //                                     type="text"
// //                                     name="phoneNumber"
// //                                     placeholder="+91 00000 00000"
// //                                     value={formData.phoneNumber}
// //                                     onChange={handleChange}
// //                                 />
// //                             </div>
// //                         </div>
// //
// //                         <div className="reg-field">
// //                             <label className="reg-label" htmlFor="email">Email</label>
// //                             <input
// //                                 id="email"
// //                                 className="reg-input"
// //                                 type="email"
// //                                 name="email"
// //                                 placeholder="you@college.edu"
// //                                 value={formData.email}
// //                                 onChange={handleChange}
// //                                 required
// //                             />
// //                         </div>
// //
// //                         <div className="reg-field">
// //                             <label className="reg-label" htmlFor="password">Password</label>
// //                             <input
// //                                 id="password"
// //                                 className="reg-input"
// //                                 type="password"
// //                                 name="password"
// //                                 placeholder="••••••••"
// //                                 value={formData.password}
// //                                 onChange={handleChange}
// //                                 required
// //                             />
// //                         </div>
// //
// //                         <div className="reg-role-group">
// //                             <label className="reg-label">Role</label>
// //                             <div className="reg-role-tabs">
// //                                 <button
// //                                     type="button"
// //                                     className={`reg-role-tab ${formData.role === "STUDENT" ? "reg-role-tab--active" : ""}`}
// //                                     onClick={() => handleRoleSelect("STUDENT")}
// //                                 >
// //                                     Student
// //                                 </button>
// // {/*                                 <button */}
// // {/*                                     type="button" */}
// // {/*                                     className={`reg-role-tab ${formData.role === "ADMIN" ? "reg-role-tab--active" : ""}`} */}
// // {/*                                     onClick={() => handleRoleSelect("ADMIN")} */}
// // {/*                                 > */}
// // {/*                                     Admin */}
// // {/*                                 </button> */}
// //                                 <button
// //                                 type="button"
// //                                 className={`reg-role-tab ${
// //                                 formData.role==="PLACEMENT_CELL"
// //                                 ?"reg-role-tab--active":""
// //                                 }`}
// //                                 onClick={()=>handleRoleSelect("PLACEMENT_CELL")}
// //                                 >
// //                                 Placement Cell
// //                                 </button>
// //
// //
// //
// //
// //                             </div>
// //                         </div>
// //
// //                         <button className="reg-submit" type="submit">
// //                             Create account
// //                         </button>
// //
// //                     </form>
// //
// //                     <p className="reg-footnote">
// //                         Already have an account? <a href="/login">Sign in</a>
// //                     </p>
// //
// //                 </div>
// //             </div>
// //
// //         </div>
// //
// //     );
// //
// // };
// //
// //
// // export default Register;
//
//
//
// import React, { useState } from "react";
// import axios from "axios";
//
// const Register = () => {
//
//     const [formData, setFormData] = useState({
//         fullName: "",
//         registerNumber: "",
//         email: "",
//         phoneNumber: "",
//         password: "",
//         role: "STUDENT"
//     });
//
//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//
//     const handleChange = (e) => {
//
//         const { name, value } = e.target;
//
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//
//         // Clear field error while typing
//         if (errors[name]) {
//             setErrors({
//                 ...errors,
//                 [name]: ""
//             });
//         }
//     };
//
//
//     // =========================
//     // VALIDATION
//     // =========================
//
//     const validateForm = () => {
//
//         const newErrors = {};
//
//         // Full Name
//         const fullName = formData.fullName.trim();
//
//         if (!fullName) {
//
//             newErrors.fullName = "Full name is required.";
//
//         } else if (fullName.length < 2) {
//
//             newErrors.fullName =
//                 "Full name must contain at least 2 characters.";
//
//         } else if (fullName.length > 50) {
//
//             newErrors.fullName =
//                 "Full name must not exceed 50 characters.";
//
//         } else if (
//             !/^[A-Za-z]+(?:[\s.'-][A-Za-z]+)*$/.test(fullName)
//         ) {
//
//             newErrors.fullName =
//                 "Full name can contain only letters, spaces, apostrophes, dots and hyphens.";
//         }
//
//
//         // Register Number
//         const registerNumber =
//             formData.registerNumber.trim();
//
//         if (!registerNumber) {
//
//             newErrors.registerNumber =
//                 "Register number is required.";
//
//         } else if (registerNumber.length < 3) {
//
//             newErrors.registerNumber =
//                 "Register number must contain at least 3 characters.";
//
//         } else if (registerNumber.length > 30) {
//
//             newErrors.registerNumber =
//                 "Register number must not exceed 30 characters.";
//
//         } else if (
//             !/^[A-Za-z0-9/-]+$/.test(registerNumber)
//         ) {
//
//             newErrors.registerNumber =
//                 "Register number can contain only letters, numbers, / and -.";
//         }
//
//
//         // Email
//         const email = formData.email.trim();
//
//         if (!email) {
//
//             newErrors.email =
//                 "Email address is required.";
//
//         } else if (
//             !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
//         ) {
//
//             newErrors.email =
//                 "Please enter a valid email address.";
//         }
//
//
//         // Phone Number
//         const phone = formData.phoneNumber.trim();
//
//         if (!phone) {
//
//             newErrors.phoneNumber =
//                 "Phone number is required.";
//
//         } else {
//
//             const cleanedPhone =
//                 phone.replace(/[\s()-]/g, "");
//
//             if (
//                 !/^(?:\+91|91)?[6-9]\d{9}$/.test(cleanedPhone)
//             ) {
//
//                 newErrors.phoneNumber =
//                     "Enter a valid 10-digit Indian mobile number.";
//             }
//         }
//
//
//         // Password
//         const password = formData.password;
//
//         if (!password) {
//
//             newErrors.password =
//                 "Password is required.";
//
//         } else if (password.length < 8) {
//
//             newErrors.password =
//                 "Password must contain at least 8 characters.";
//
//         } else if (password.length > 64) {
//
//             newErrors.password =
//                 "Password must not exceed 64 characters.";
//
//         } else if (!/[A-Z]/.test(password)) {
//
//             newErrors.password =
//                 "Password must contain at least one uppercase letter.";
//
//         } else if (!/[a-z]/.test(password)) {
//
//             newErrors.password =
//                 "Password must contain at least one lowercase letter.";
//
//         } else if (!/[0-9]/.test(password)) {
//
//             newErrors.password =
//                 "Password must contain at least one number.";
//
//         } else if (
//             !/[!@#$%^&*(),.?":{}|<>_\-\\[\]/;'+=~`]/.test(password)
//         ) {
//
//             newErrors.password =
//                 "Password must contain at least one special character.";
//         }
//
//
//         setErrors(newErrors);
//
//         return Object.keys(newErrors).length === 0;
//     };
//
//
//     // =========================
//     // REGISTER
//     // =========================
//
//     const handleRegister = async (e) => {
//
//         e.preventDefault();
//
//         if (!validateForm()) {
//             return;
//         }
//
//         setIsSubmitting(true);
//
//         try {
//
//             // Role is ALWAYS STUDENT
//             const registrationData = {
//                 fullName: formData.fullName.trim(),
//                 registerNumber: formData.registerNumber.trim(),
//                 email: formData.email.trim().toLowerCase(),
//                 phoneNumber: formData.phoneNumber.trim(),
//                 password: formData.password,
//                 role: "STUDENT"
//             };
//
//             const response = await axios.post(
//                 "http://localhost:8080/api/auth/register",
//                 registrationData
//             );
//
//             alert(
//                 response.data ||
//                 "Registration successful!"
//             );
//
//             window.location.href = "/login";
//
//         } catch (error) {
//
//             console.error(error);
//
//             const backendMessage =
//                 error.response?.data?.message ||
//                 error.response?.data;
//
//             alert(
//                 backendMessage ||
//                 "Registration failed. Please try again."
//             );
//
//         } finally {
//
//             setIsSubmitting(false);
//         }
//     };
//
//
//     return (
//
//         <div className="reg-page">
//
//             <style>{`
//
//                 @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
//
//                 * {
//                     box-sizing: border-box;
//                 }
//
//                 .reg-page {
//
//                     --navy: #0e1a2b;
//                     --navy-raised: #16273d;
//                     --blue: #1d4ed8;
//                     --blue-soft: rgba(29, 78, 216, 0.07);
//                     --ink: #101828;
//                     --muted: #667085;
//                     --border: #e4e7ec;
//                     --error: #d92d20;
//                     --error-bg: #fef3f2;
//                     --bg: #ffffff;
//
//                     min-height: 100vh;
//                     width: 100%;
//
//                     display: grid;
//                     grid-template-columns: 1fr 1fr;
//
//                     font-family: 'Inter', sans-serif;
//
//                     color: var(--ink);
//                     background: var(--bg);
//                 }
//
//
//                 /* =========================
//                    LEFT SIDE
//                 ========================= */
//
//                 .reg-aside {
//
//                     background: var(--navy);
//                     color: #eef1f6;
//
//                     padding: 56px 52px;
//
//                     display: flex;
//                     flex-direction: column;
//                     justify-content: space-between;
//
//                     position: relative;
//                     overflow: hidden;
//                 }
//
//
//                 .reg-aside::before {
//
//                     content: "";
//
//                     position: absolute;
//                     inset: 0;
//
//                     background:
//                         radial-gradient(
//                             700px 420px at 100% 0%,
//                             rgba(29,78,216,0.22),
//                             transparent 60%
//                         );
//
//                     pointer-events: none;
//                 }
//
//
//                 .reg-mark {
//
//                     position: relative;
//
//                     width: 44px;
//                     height: 44px;
//
//                     border-radius: 8px;
//
//                     background: var(--navy-raised);
//
//                     border:
//                         1px solid rgba(255,255,255,0.12);
//
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//
//                     font-family: 'Source Serif 4', serif;
//
//                     font-weight: 600;
//                     font-size: 17px;
//
//                     letter-spacing: 0.5px;
//                 }
//
//
//                 .reg-aside-body {
//
//                     position: relative;
//
//                     max-width: 380px;
//
//                     margin-top: 40px;
//                 }
//
//
//                 .reg-aside-eyebrow {
//
//                     font-family: 'IBM Plex Mono', monospace;
//
//                     font-size: 11px;
//
//                     letter-spacing: 2px;
//
//                     text-transform: uppercase;
//
//                     color: #7d95c4;
//
//                     margin-bottom: 16px;
//                 }
//
//
//                 .reg-aside-title {
//
//                     font-family: 'Source Serif 4', serif;
//
//                     font-weight: 600;
//
//                     font-size: 30px;
//
//                     line-height: 1.3;
//
//                     margin: 0 0 14px;
//                 }
//
//
//                 .reg-aside-copy {
//
//                     font-size: 14.5px;
//
//                     line-height: 1.7;
//
//                     color: #aab6cc;
//
//                     margin: 0;
//                 }
//
//
//                 .reg-aside-footer {
//
//                     position: relative;
//
//                     display: flex;
//
//                     gap: 28px;
//
//                     padding-top: 24px;
//
//                     border-top:
//                         1px solid rgba(255,255,255,0.1);
//                 }
//
//
//                 .reg-stat-value {
//
//                     font-family: 'Source Serif 4', serif;
//
//                     font-size: 20px;
//
//                     font-weight: 600;
//                 }
//
//
//                 .reg-stat-label {
//
//                     font-size: 11.5px;
//
//                     color: #8a96ab;
//
//                     margin-top: 2px;
//                 }
//
//
//                 /* =========================
//                    FORM SIDE
//                 ========================= */
//
//                 .reg-form-side {
//
//                     display: flex;
//
//                     align-items: center;
//                     justify-content: center;
//
//                     padding: 40px 24px;
//                 }
//
//
//                 .reg-form-wrap {
//
//                     width: 100%;
//
//                     max-width: 380px;
//                 }
//
//
//                 .reg-title {
//
//                     font-size: 22px;
//
//                     font-weight: 600;
//
//                     margin: 0 0 6px;
//
//                     letter-spacing: -0.2px;
//                 }
//
//
//                 .reg-subtitle {
//
//                     font-size: 14px;
//
//                     color: var(--muted);
//
//                     margin: 0 0 30px;
//                 }
//
//
//                 .reg-form {
//
//                     display: flex;
//
//                     flex-direction: column;
//
//                     gap: 16px;
//                 }
//
//
//                 .reg-row {
//
//                     display: grid;
//
//                     grid-template-columns: 1fr 1fr;
//
//                     gap: 12px;
//                 }
//
//
//                 .reg-field {
//
//                     display: flex;
//
//                     flex-direction: column;
//
//                     gap: 6px;
//                 }
//
//
//                 .reg-label {
//
//                     font-size: 13px;
//
//                     font-weight: 500;
//
//                     color: var(--ink);
//                 }
//
//
//                 .reg-input {
//
//                     width: 100%;
//
//                     background: #fff;
//
//                     border:
//                         1px solid var(--border);
//
//                     border-radius: 6px;
//
//                     padding: 10px 12px;
//
//                     font-size: 14px;
//
//                     font-family: 'Inter', sans-serif;
//
//                     color: var(--ink);
//
//                     outline: none;
//
//                     transition:
//                         border-color 0.15s ease,
//                         box-shadow 0.15s ease;
//                 }
//
//
//                 .reg-input::placeholder {
//
//                     color: #98a2b3;
//                 }
//
//
//                 .reg-input:focus {
//
//                     border-color: var(--blue);
//
//                     box-shadow:
//                         0 0 0 3px var(--blue-soft);
//                 }
//
//
//                 .reg-input--error {
//
//                     border-color: var(--error);
//
//                     background: var(--error-bg);
//                 }
//
//
//                 .reg-input--error:focus {
//
//                     border-color: var(--error);
//
//                     box-shadow:
//                         0 0 0 3px rgba(217,45,32,0.08);
//                 }
//
//
//                 .reg-error {
//
//                     color: var(--error);
//
//                     font-size: 11.5px;
//
//                     line-height: 1.4;
//
//                     margin-top: 1px;
//                 }
//
//
//                 /* =========================
//                    BUTTON
//                 ========================= */
//
//                 .reg-submit {
//
//                     margin-top: 8px;
//
//                     background: var(--blue);
//
//                     color: #fff;
//
//                     border: none;
//
//                     border-radius: 6px;
//
//                     padding: 12px 0;
//
//                     font-family: 'Inter', sans-serif;
//
//                     font-weight: 600;
//
//                     font-size: 14px;
//
//                     cursor: pointer;
//
//                     transition:
//                         background 0.15s ease,
//                         transform 0.05s ease;
//                 }
//
//
//                 .reg-submit:hover:not(:disabled) {
//
//                     background: #1740b8;
//                 }
//
//
//                 .reg-submit:active:not(:disabled) {
//
//                     transform: translateY(1px);
//                 }
//
//
//                 .reg-submit:disabled {
//
//                     opacity: 0.65;
//
//                     cursor: not-allowed;
//                 }
//
//
//                 /* =========================
//                    LOGIN LINK
//                 ========================= */
//
//                 .reg-footnote {
//
//                     font-size: 13.5px;
//
//                     color: var(--muted);
//
//                     text-align: center;
//
//                     margin-top: 22px;
//                 }
//
//
//                 .reg-footnote a {
//
//                     color: var(--blue);
//
//                     font-weight: 500;
//
//                     text-decoration: none;
//                 }
//
//
//                 .reg-footnote a:hover {
//
//                     text-decoration: underline;
//                 }
//
//
//                 /* =========================
//                    RESPONSIVE
//                 ========================= */
//
//                 @media (max-width: 860px) {
//
//                     .reg-page {
//
//                         grid-template-columns: 1fr;
//                     }
//
//
//                     .reg-aside {
//
//                         display: none;
//                     }
//
//
//                     .reg-form-side {
//
//                         padding: 48px 20px;
//                     }
//                 }
//
//
//                 @media (max-width: 420px) {
//
//                     .reg-row {
//
//                         grid-template-columns: 1fr;
//                     }
//                 }
//
//             `}</style>
//
//
//             {/* =========================
//                 LEFT SIDE
//             ========================= */}
//
//             <aside className="reg-aside">
//
//                 <div className="reg-mark">
//                     UR
//                 </div>
//
//
//                 <div className="reg-aside-body">
//
//                     <div className="reg-aside-eyebrow">
//                         Registrar's Office
//                     </div>
//
//
//                     <h1 className="reg-aside-title">
//                         Manage your academic records in one place.
//                     </h1>
//
//
//                     <p className="reg-aside-copy">
//                         One account gives students secure access
//                         to enrollment, records and campus services.
//                     </p>
//
//                 </div>
//
//
//                 <div className="reg-aside-footer">
//
//                     <div>
//
//                         <div className="reg-stat-value">
//                             12,400+
//                         </div>
//
//                         <div className="reg-stat-label">
//                             Students registered
//                         </div>
//
//                     </div>
//
//
//                     <div>
//
//                         <div className="reg-stat-value">
//                             99.9%
//                         </div>
//
//                         <div className="reg-stat-label">
//                             Portal uptime
//                         </div>
//
//                     </div>
//
//
//                     <div>
//
//                         <div className="reg-stat-value">
//                             Secure
//                         </div>
//
//                         <div className="reg-stat-label">
//                             Data handling
//                         </div>
//
//                     </div>
//
//                 </div>
//
//             </aside>
//
//
//             {/* =========================
//                 FORM
//             ========================= */}
//
//             <div className="reg-form-side">
//
//                 <div className="reg-form-wrap">
//
//                     <h2 className="reg-title">
//                         Create your account
//                     </h2>
//
//
//                     <p className="reg-subtitle">
//                         Register as a student to get started.
//                     </p>
//
//
//                     <form
//                         className="reg-form"
//                         onSubmit={handleRegister}
//                         noValidate
//                     >
//
//
//                         {/* FULL NAME */}
//
//                         <div className="reg-field">
//
//                             <label
//                                 className="reg-label"
//                                 htmlFor="fullName"
//                             >
//                                 Full name
//                             </label>
//
//
//                             <input
//                                 id="fullName"
//                                 className={`reg-input ${
//                                     errors.fullName
//                                         ? "reg-input--error"
//                                         : ""
//                                 }`}
//                                 type="text"
//                                 name="fullName"
//                                 placeholder="Ananya Rao"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                             />
//
//
//                             {errors.fullName && (
//
//                                 <span className="reg-error">
//                                     {errors.fullName}
//                                 </span>
//
//                             )}
//
//                         </div>
//
//
//                         {/* REGISTER NUMBER + PHONE */}
//
//                         <div className="reg-row">
//
//
//                             <div className="reg-field">
//
//                                 <label
//                                     className="reg-label"
//                                     htmlFor="registerNumber"
//                                 >
//                                     Register number
//                                 </label>
//
//
//                                 <input
//                                     id="registerNumber"
//                                     className={`reg-input ${
//                                         errors.registerNumber
//                                             ? "reg-input--error"
//                                             : ""
//                                     }`}
//                                     type="text"
//                                     name="registerNumber"
//                                     placeholder="REG-0000"
//                                     value={formData.registerNumber}
//                                     onChange={handleChange}
//                                 />
//
//
//                                 {errors.registerNumber && (
//
//                                     <span className="reg-error">
//                                         {errors.registerNumber}
//                                     </span>
//
//                                 )}
//
//                             </div>
//
//
//                             <div className="reg-field">
//
//                                 <label
//                                     className="reg-label"
//                                     htmlFor="phoneNumber"
//                                 >
//                                     Phone number
//                                 </label>
//
//
//                                 <input
//                                     id="phoneNumber"
//                                     className={`reg-input ${
//                                         errors.phoneNumber
//                                             ? "reg-input--error"
//                                             : ""
//                                     }`}
//                                     type="tel"
//                                     name="phoneNumber"
//                                     placeholder="+91 00000 00000"
//                                     value={formData.phoneNumber}
//                                     onChange={handleChange}
//                                     maxLength={15}
//                                 />
//
//
//                                 {errors.phoneNumber && (
//
//                                     <span className="reg-error">
//                                         {errors.phoneNumber}
//                                     </span>
//
//                                 )}
//
//                             </div>
//
//                         </div>
//
//
//                         {/* EMAIL */}
//
//                         <div className="reg-field">
//
//                             <label
//                                 className="reg-label"
//                                 htmlFor="email"
//                             >
//                                 Email
//                             </label>
//
//
//                             <input
//                                 id="email"
//                                 className={`reg-input ${
//                                     errors.email
//                                         ? "reg-input--error"
//                                         : ""
//                                 }`}
//                                 type="email"
//                                 name="email"
//                                 placeholder="you@college.edu"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//
//
//                             {errors.email && (
//
//                                 <span className="reg-error">
//                                     {errors.email}
//                                 </span>
//
//                             )}
//
//                         </div>
//
//
//                         {/* PASSWORD */}
//
//                         <div className="reg-field">
//
//                             <label
//                                 className="reg-label"
//                                 htmlFor="password"
//                             >
//                                 Password
//                             </label>
//
//
//                             <input
//                                 id="password"
//                                 className={`reg-input ${
//                                     errors.password
//                                         ? "reg-input--error"
//                                         : ""
//                                 }`}
//                                 type="password"
//                                 name="password"
//                                 placeholder="••••••••"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                             />
//
//
//                             {errors.password && (
//
//                                 <span className="reg-error">
//                                     {errors.password}
//                                 </span>
//
//                             )}
//
//                         </div>
//
//
//                         {/* SUBMIT */}
//
//                         <button
//                             className="reg-submit"
//                             type="submit"
//                             disabled={isSubmitting}
//                         >
//
//                             {isSubmitting
//                                 ? "Creating account..."
//                                 : "Create account"}
//
//                         </button>
//
//                     </form>
//
//
//                     <p className="reg-footnote">
//
//                         Already have an account?{" "}
//
//                         <a href="/login">
//                             Sign in
//                         </a>
//
//                     </p>
//
//                 </div>
//
//             </div>
//
//         </div>
//     );
// };
//
//
// export default Register;

import React, { useState } from "react";
import axios from "axios";

const Register = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        registerNumber: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "STUDENT"
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear field error while typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };


    // =========================
    // VALIDATION
    // =========================

    const validateForm = () => {

        const newErrors = {};

        // =========================
        // FULL NAME
        // =========================

        const fullName = formData.fullName.trim();

        if (!fullName) {

            newErrors.fullName =
                "Full name is required.";

        } else if (fullName.length < 2) {

            newErrors.fullName =
                "Full name must contain at least 2 characters.";

        } else if (fullName.length > 50) {

            newErrors.fullName =
                "Full name must not exceed 50 characters.";

        } else if (
            !/^[A-Za-z]+(?:[\s.'-][A-Za-z]+)*$/.test(fullName)
        ) {

            newErrors.fullName =
                "Full name can contain only letters, spaces, apostrophes, dots and hyphens.";
        }


        // =========================
        // REGISTER NUMBER
        // =========================

        const registerNumber =
            formData.registerNumber.trim();

        if (!registerNumber) {

            newErrors.registerNumber =
                "Register number is required.";

        } else if (registerNumber.length < 3) {

            newErrors.registerNumber =
                "Register number must contain at least 3 characters.";

        } else if (registerNumber.length > 30) {

            newErrors.registerNumber =
                "Register number must not exceed 30 characters.";

        } else if (
            !/^[A-Za-z0-9/-]+$/.test(registerNumber)
        ) {

            newErrors.registerNumber =
                "Register number can contain only letters, numbers, / and -.";
        }


        // =========================
        // EMAIL
        // =========================

        const email =
            formData.email.trim();

        if (!email) {

            newErrors.email =
                "Email address is required.";

        } else if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
        ) {

            newErrors.email =
                "Please enter a valid email address.";
        }


        // =========================
        // PHONE NUMBER
        // =========================

        const phone =
            formData.phoneNumber.trim();

        if (!phone) {

            newErrors.phoneNumber =
                "Phone number is required.";

        } else {

            const cleanedPhone =
                phone.replace(/[\s()-]/g, "");

            if (
                !/^(?:\+91|91)?[6-9]\d{9}$/.test(cleanedPhone)
            ) {

                newErrors.phoneNumber =
                    "Enter a valid 10-digit Indian mobile number.";
            }
        }


        // =========================
        // PASSWORD
        // =========================

        const password =
            formData.password;

        if (!password) {

            newErrors.password =
                "Password is required.";

        } else if (password.length < 8) {

            newErrors.password =
                "Password must contain at least 8 characters.";

        } else if (password.length > 64) {

            newErrors.password =
                "Password must not exceed 64 characters.";

        } else if (!/[A-Z]/.test(password)) {

            newErrors.password =
                "Password must contain at least one uppercase letter.";

        } else if (!/[a-z]/.test(password)) {

            newErrors.password =
                "Password must contain at least one lowercase letter.";

        } else if (!/[0-9]/.test(password)) {

            newErrors.password =
                "Password must contain at least one number.";

        } else if (
            !/[!@#$%^&*(),.?":{}|<>_\-\\[\]/;'+=~`]/.test(password)
        ) {

            newErrors.password =
                "Password must contain at least one special character.";
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    // =========================
    // HANDLE BACKEND DUPLICATE
    // =========================

    const handleBackendError = (error) => {

        const responseData =
            error.response?.data;

        console.error(
            "Registration error:",
            responseData
        );


        // ---------------------------------
        // CASE 1:
        // Backend returns field-wise errors
        // ---------------------------------

        if (
            responseData &&
            typeof responseData === "object" &&
            !Array.isArray(responseData)
        ) {

            const backendErrors = {};

            if (responseData.email) {

                backendErrors.email =
                    responseData.email;
            }

            if (responseData.registerNumber) {

                backendErrors.registerNumber =
                    responseData.registerNumber;
            }

            if (responseData.phoneNumber) {

                backendErrors.phoneNumber =
                    responseData.phoneNumber;
            }

            if (responseData.fullName) {

                backendErrors.fullName =
                    responseData.fullName;
            }

            if (responseData.password) {

                backendErrors.password =
                    responseData.password;
            }

            if (Object.keys(backendErrors).length > 0) {

                setErrors((previousErrors) => ({
                    ...previousErrors,
                    ...backendErrors
                }));

                return;
            }
        }


        // ---------------------------------
        // CASE 2:
        // Backend returns a message
        // ---------------------------------

        let message =
            responseData?.message ||
            responseData?.error ||
            responseData;


        if (typeof message !== "string") {

            message =
                "Registration failed. Please try again.";
        }


        const lowerMessage =
            message.toLowerCase();


        // ---------------------------------
        // EMAIL EXISTS
        // ---------------------------------

        if (
            lowerMessage.includes("email") &&
            (
                lowerMessage.includes("exist") ||
                lowerMessage.includes("already") ||
                lowerMessage.includes("registered") ||
                lowerMessage.includes("duplicate")
            )
        ) {

            setErrors((previousErrors) => ({
                ...previousErrors,
                email: "This email is already registered."
            }));

            return;
        }


        // ---------------------------------
        // REGISTER NUMBER EXISTS
        // ---------------------------------

        if (
            (
                lowerMessage.includes("register number") ||
                lowerMessage.includes("registration number") ||
                lowerMessage.includes("registernumber")
            ) &&
            (
                lowerMessage.includes("exist") ||
                lowerMessage.includes("already") ||
                lowerMessage.includes("registered") ||
                lowerMessage.includes("duplicate")
            )
        ) {

            setErrors((previousErrors) => ({
                ...previousErrors,
                registerNumber:
                    "This register number is already registered."
            }));

            return;
        }


        // ---------------------------------
        // PHONE EXISTS
        // ---------------------------------

        if (
            (
                lowerMessage.includes("phone") ||
                lowerMessage.includes("mobile") ||
                lowerMessage.includes("phonenumber")
            ) &&
            (
                lowerMessage.includes("exist") ||
                lowerMessage.includes("already") ||
                lowerMessage.includes("registered") ||
                lowerMessage.includes("duplicate")
            )
        ) {

            setErrors((previousErrors) => ({
                ...previousErrors,
                phoneNumber:
                    "This phone number is already registered."
            }));

            return;
        }


        // ---------------------------------
        // DUPLICATE KEY / CONSTRAINT
        // ---------------------------------

        if (
            lowerMessage.includes("duplicate") ||
            lowerMessage.includes("unique constraint") ||
            lowerMessage.includes("unique key")
        ) {

            alert(
                "An account with the entered details already exists."
            );

            return;
        }


        // ---------------------------------
        // DEFAULT ERROR
        // ---------------------------------

        alert(message);
    };


    // =========================
    // REGISTER
    // =========================

    const handleRegister = async (e) => {

        e.preventDefault();

        // Frontend validation
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Clear old backend errors
        setErrors({});

        try {

            const registrationData = {
                fullName:
                    formData.fullName.trim(),

                registerNumber:
                    formData.registerNumber.trim(),

                email:
                    formData.email.trim().toLowerCase(),

                phoneNumber:
                    formData.phoneNumber.trim(),

                password:
                    formData.password,

                // ROLE IS ALWAYS STUDENT
                role: "STUDENT"
            };


            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                registrationData
            );


            alert(
                response.data ||
                "Registration successful!"
            );


            window.location.href =
                "/login";


        } catch (error) {

            handleBackendError(error);

        } finally {

            setIsSubmitting(false);
        }
    };


    return (

        <div className="reg-page">

            <style>{`

                @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

                * {
                    box-sizing: border-box;
                }

                .reg-page {

                    --navy: #0e1a2b;
                    --navy-raised: #16273d;
                    --blue: #1d4ed8;
                    --blue-soft: rgba(29, 78, 216, 0.07);
                    --ink: #101828;
                    --muted: #667085;
                    --border: #e4e7ec;
                    --error: #d92d20;
                    --error-bg: #fef3f2;
                    --bg: #ffffff;

                    min-height: 100vh;
                    width: 100%;

                    display: grid;
                    grid-template-columns: 1fr 1fr;

                    font-family: 'Inter', sans-serif;

                    color: var(--ink);
                    background: var(--bg);
                }


                .reg-aside {

                    background: var(--navy);
                    color: #eef1f6;

                    padding: 56px 52px;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    position: relative;
                    overflow: hidden;
                }


                .reg-aside::before {

                    content: "";

                    position: absolute;
                    inset: 0;

                    background:
                        radial-gradient(
                            700px 420px at 100% 0%,
                            rgba(29,78,216,0.22),
                            transparent 60%
                        );

                    pointer-events: none;
                }


                .reg-mark {

                    position: relative;

                    width: 44px;
                    height: 44px;

                    border-radius: 8px;

                    background: var(--navy-raised);

                    border:
                        1px solid rgba(255,255,255,0.12);

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    font-family: 'Source Serif 4', serif;

                    font-weight: 600;
                    font-size: 17px;

                    letter-spacing: 0.5px;
                }


                .reg-aside-body {

                    position: relative;

                    max-width: 380px;

                    margin-top: 40px;
                }


                .reg-aside-eyebrow {

                    font-family: 'IBM Plex Mono', monospace;

                    font-size: 11px;

                    letter-spacing: 2px;

                    text-transform: uppercase;

                    color: #7d95c4;

                    margin-bottom: 16px;
                }


                .reg-aside-title {

                    font-family: 'Source Serif 4', serif;

                    font-weight: 600;

                    font-size: 30px;

                    line-height: 1.3;

                    margin: 0 0 14px;
                }


                .reg-aside-copy {

                    font-size: 14.5px;

                    line-height: 1.7;

                    color: #aab6cc;

                    margin: 0;
                }


                .reg-aside-footer {

                    position: relative;

                    display: flex;

                    gap: 28px;

                    padding-top: 24px;

                    border-top:
                        1px solid rgba(255,255,255,0.1);
                }


                .reg-stat-value {

                    font-family: 'Source Serif 4', serif;

                    font-size: 20px;

                    font-weight: 600;
                }


                .reg-stat-label {

                    font-size: 11.5px;

                    color: #8a96ab;

                    margin-top: 2px;
                }


                .reg-form-side {

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    padding: 40px 24px;
                }


                .reg-form-wrap {

                    width: 100%;

                    max-width: 380px;
                }


                .reg-title {

                    font-size: 22px;

                    font-weight: 600;

                    margin: 0 0 6px;

                    letter-spacing: -0.2px;
                }


                .reg-subtitle {

                    font-size: 14px;

                    color: var(--muted);

                    margin: 0 0 30px;
                }


                .reg-form {

                    display: flex;

                    flex-direction: column;

                    gap: 16px;
                }


                .reg-row {

                    display: grid;

                    grid-template-columns: 1fr 1fr;

                    gap: 12px;
                }


                .reg-field {

                    display: flex;

                    flex-direction: column;

                    gap: 6px;
                }


                .reg-label {

                    font-size: 13px;

                    font-weight: 500;

                    color: var(--ink);
                }


                .reg-input {

                    width: 100%;

                    background: #fff;

                    border:
                        1px solid var(--border);

                    border-radius: 6px;

                    padding: 10px 12px;

                    font-size: 14px;

                    font-family: 'Inter', sans-serif;

                    color: var(--ink);

                    outline: none;

                    transition:
                        border-color 0.15s ease,
                        box-shadow 0.15s ease;
                }


                .reg-input::placeholder {

                    color: #98a2b3;
                }


                .reg-input:focus {

                    border-color: var(--blue);

                    box-shadow:
                        0 0 0 3px var(--blue-soft);
                }


                .reg-input--error {

                    border-color: var(--error);

                    background: var(--error-bg);
                }


                .reg-input--error:focus {

                    border-color: var(--error);

                    box-shadow:
                        0 0 0 3px rgba(217,45,32,0.08);
                }


                .reg-error {

                    color: var(--error);

                    font-size: 11.5px;

                    line-height: 1.4;

                    margin-top: 1px;
                }


                .reg-submit {

                    margin-top: 8px;

                    background: var(--blue);

                    color: #fff;

                    border: none;

                    border-radius: 6px;

                    padding: 12px 0;

                    font-family: 'Inter', sans-serif;

                    font-weight: 600;

                    font-size: 14px;

                    cursor: pointer;

                    transition:
                        background 0.15s ease,
                        transform 0.05s ease;
                }


                .reg-submit:hover:not(:disabled) {

                    background: #1740b8;
                }


                .reg-submit:active:not(:disabled) {

                    transform: translateY(1px);
                }


                .reg-submit:disabled {

                    opacity: 0.65;

                    cursor: not-allowed;
                }


                .reg-footnote {

                    font-size: 13.5px;

                    color: var(--muted);

                    text-align: center;

                    margin-top: 22px;
                }


                .reg-footnote a {

                    color: var(--blue);

                    font-weight: 500;

                    text-decoration: none;
                }


                .reg-footnote a:hover {

                    text-decoration: underline;
                }


                @media (max-width: 860px) {

                    .reg-page {

                        grid-template-columns: 1fr;
                    }


                    .reg-aside {

                        display: none;
                    }


                    .reg-form-side {

                        padding: 48px 20px;
                    }
                }


                @media (max-width: 420px) {

                    .reg-row {

                        grid-template-columns: 1fr;
                    }
                }

            `}</style>


            {/* =========================
                LEFT SIDE
            ========================= */}

            <aside className="reg-aside">

                <div className="reg-mark">
                    UR
                </div>


                <div className="reg-aside-body">

                    <div className="reg-aside-eyebrow">
                        Registrar's Office
                    </div>


                    <h1 className="reg-aside-title">
                        Manage your academic records in one place.
                    </h1>


                    <p className="reg-aside-copy">
                        One account gives students secure access
                        to enrollment, records and campus services.
                    </p>

                </div>


                <div className="reg-aside-footer">

                    <div>

                        <div className="reg-stat-value">
                            12,400+
                        </div>

                        <div className="reg-stat-label">
                            Students registered
                        </div>

                    </div>


                    <div>

                        <div className="reg-stat-value">
                            99.9%
                        </div>

                        <div className="reg-stat-label">
                            Portal uptime
                        </div>

                    </div>


                    <div>

                        <div className="reg-stat-value">
                            Secure
                        </div>

                        <div className="reg-stat-label">
                            Data handling
                        </div>

                    </div>

                </div>

            </aside>


            {/* =========================
                FORM
            ========================= */}

            <div className="reg-form-side">

                <div className="reg-form-wrap">

                    <h2 className="reg-title">
                        Create your account
                    </h2>


                    <p className="reg-subtitle">
                        Register as a student to get started.
                    </p>


                    <form
                        className="reg-form"
                        onSubmit={handleRegister}
                        noValidate
                    >


                        {/* FULL NAME */}

                        <div className="reg-field">

                            <label
                                className="reg-label"
                                htmlFor="fullName"
                            >
                                Full name
                            </label>


                            <input
                                id="fullName"
                                className={`reg-input ${
                                    errors.fullName
                                        ? "reg-input--error"
                                        : ""
                                }`}
                                type="text"
                                name="fullName"
                                placeholder="Ananya Rao"
                                value={formData.fullName}
                                onChange={handleChange}
                            />


                            {errors.fullName && (

                                <span className="reg-error">
                                    {errors.fullName}
                                </span>

                            )}

                        </div>


                        {/* REGISTER NUMBER + PHONE */}

                        <div className="reg-row">


                            <div className="reg-field">

                                <label
                                    className="reg-label"
                                    htmlFor="registerNumber"
                                >
                                    Register number
                                </label>


                                <input
                                    id="registerNumber"
                                    className={`reg-input ${
                                        errors.registerNumber
                                            ? "reg-input--error"
                                            : ""
                                    }`}
                                    type="text"
                                    name="registerNumber"
                                    placeholder="REG-0000"
                                    value={formData.registerNumber}
                                    onChange={handleChange}
                                />


                                {errors.registerNumber && (

                                    <span className="reg-error">
                                        {errors.registerNumber}
                                    </span>

                                )}

                            </div>


                            <div className="reg-field">

                                <label
                                    className="reg-label"
                                    htmlFor="phoneNumber"
                                >
                                    Phone number
                                </label>


                                <input
                                    id="phoneNumber"
                                    className={`reg-input ${
                                        errors.phoneNumber
                                            ? "reg-input--error"
                                            : ""
                                    }`}
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="+91 00000 00000"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    maxLength={15}
                                />


                                {errors.phoneNumber && (

                                    <span className="reg-error">
                                        {errors.phoneNumber}
                                    </span>

                                )}

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div className="reg-field">

                            <label
                                className="reg-label"
                                htmlFor="email"
                            >
                                Email
                            </label>


                            <input
                                id="email"
                                className={`reg-input ${
                                    errors.email
                                        ? "reg-input--error"
                                        : ""
                                }`}
                                type="email"
                                name="email"
                                placeholder="you@college.edu"
                                value={formData.email}
                                onChange={handleChange}
                            />


                            {errors.email && (

                                <span className="reg-error">
                                    {errors.email}
                                </span>

                            )}

                        </div>


                        {/* PASSWORD */}

                        <div className="reg-field">

                            <label
                                className="reg-label"
                                htmlFor="password"
                            >
                                Password
                            </label>


                            <input
                                id="password"
                                className={`reg-input ${
                                    errors.password
                                        ? "reg-input--error"
                                        : ""
                                }`}
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />


                            {errors.password && (

                                <span className="reg-error">
                                    {errors.password}
                                </span>

                            )}

                        </div>


                        {/* SUBMIT */}

                        <button
                            className="reg-submit"
                            type="submit"
                            disabled={isSubmitting}
                        >

                            {isSubmitting
                                ? "Creating account..."
                                : "Create account"}

                        </button>

                    </form>


                    <p className="reg-footnote">

                        Already have an account?{" "}

                        <a href="/login">
                            Sign in
                        </a>

                    </p>

                </div>

            </div>

        </div>
    );
};


export default Register;
