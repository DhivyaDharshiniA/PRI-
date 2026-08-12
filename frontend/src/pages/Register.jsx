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


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // Same effect as handleChange, just triggered from the segmented
    // control instead of a <select> — role still lands in formData.role
    // exactly the same way, so submission logic is untouched.
    const handleRoleSelect = (role) => {

        setFormData({
            ...formData,
            role
        });

    };


    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                formData
            );


            alert(response.data);

            window.location.href = "/login";


        } catch(error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Registration failed"
            );

        }

    };


    return (

        <div className="reg-page">

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

                * { box-sizing: border-box; }

                .reg-page {
                    --navy: #0e1a2b;
                    --navy-raised: #16273d;
                    --blue: #1d4ed8;
                    --blue-soft: rgba(29, 78, 216, 0.07);
                    --blue-soft-strong: rgba(29, 78, 216, 0.12);
                    --ink: #101828;
                    --muted: #667085;
                    --border: #e4e7ec;
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
                    background: radial-gradient(700px 420px at 100% 0%, rgba(29,78,216,0.22), transparent 60%);
                    pointer-events: none;
                }

                .reg-mark {
                    position: relative;
                    width: 44px;
                    height: 44px;
                    border-radius: 8px;
                    background: var(--navy-raised);
                    border: 1px solid rgba(255,255,255,0.12);
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
                    border-top: 1px solid rgba(255,255,255,0.1);
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
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 6px;
                    padding: 10px 12px;
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                    color: var(--ink);
                    outline: none;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease;
                }

                .reg-input::placeholder {
                    color: #98a2b3;
                }

                .reg-input:focus {
                    border-color: var(--blue);
                    box-shadow: 0 0 0 3px var(--blue-soft);
                }

                .reg-role-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .reg-role-tabs {
                    display: flex;
                    background: #f9fafb;
                    border: 1px solid var(--border);
                    border-radius: 6px;
                    padding: 3px;
                    gap: 3px;
                }

                .reg-role-tab {
                    flex: 1;
                    border: none;
                    background: transparent;
                    color: var(--muted);
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    padding: 9px 0;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
                }

                .reg-role-tab:hover {
                    color: var(--ink);
                }

                .reg-role-tab--active {
                    background: #fff;
                    color: var(--blue);
                    box-shadow: 0 1px 2px rgba(16,24,40,0.08);
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
                    transition: background 0.15s ease, transform 0.05s ease;
                }

                .reg-submit:hover {
                    background: #1740b8;
                }

                .reg-submit:active {
                    transform: translateY(1px);
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

            <aside className="reg-aside">

                <div className="reg-mark">UR</div>

                <div className="reg-aside-body">
                    <div className="reg-aside-eyebrow">Registrar's Office</div>
                    <h1 className="reg-aside-title">Manage your academic records in one place.</h1>
                    <p className="reg-aside-copy">
                        One account gives students and administrators secure access
                        to enrollment, records and campus services.
                    </p>
                </div>

                <div className="reg-aside-footer">
                    <div>
                        <div className="reg-stat-value">12,400+</div>
                        <div className="reg-stat-label">Students registered</div>
                    </div>
                    <div>
                        <div className="reg-stat-value">99.9%</div>
                        <div className="reg-stat-label">Portal uptime</div>
                    </div>
                    <div>
                        <div className="reg-stat-value">SOC 2</div>
                        <div className="reg-stat-label">Data handling</div>
                    </div>
                </div>

            </aside>

            <div className="reg-form-side">
                <div className="reg-form-wrap">

                    <h2 className="reg-title">Create your account</h2>
                    <p className="reg-subtitle">Enrollment takes less than a minute.</p>

                    <form className="reg-form" onSubmit={handleRegister}>

                        <div className="reg-field">
                            <label className="reg-label" htmlFor="fullName">Full name</label>
                            <input
                                id="fullName"
                                className="reg-input"
                                type="text"
                                name="fullName"
                                placeholder="Ananya Rao"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="reg-row">
                            <div className="reg-field">
                                <label className="reg-label" htmlFor="registerNumber">Register number</label>
                                <input
                                    id="registerNumber"
                                    className="reg-input"
                                    type="text"
                                    name="registerNumber"
                                    placeholder="REG-0000"
                                    value={formData.registerNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="reg-field">
                                <label className="reg-label" htmlFor="phoneNumber">Phone number</label>
                                <input
                                    id="phoneNumber"
                                    className="reg-input"
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="+91 00000 00000"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="reg-field">
                            <label className="reg-label" htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="reg-input"
                                type="email"
                                name="email"
                                placeholder="you@college.edu"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="reg-field">
                            <label className="reg-label" htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="reg-input"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="reg-role-group">
                            <label className="reg-label">Role</label>
                            <div className="reg-role-tabs">
                                <button
                                    type="button"
                                    className={`reg-role-tab ${formData.role === "STUDENT" ? "reg-role-tab--active" : ""}`}
                                    onClick={() => handleRoleSelect("STUDENT")}
                                >
                                    Student
                                </button>
{/*                                 <button */}
{/*                                     type="button" */}
{/*                                     className={`reg-role-tab ${formData.role === "ADMIN" ? "reg-role-tab--active" : ""}`} */}
{/*                                     onClick={() => handleRoleSelect("ADMIN")} */}
{/*                                 > */}
{/*                                     Admin */}
{/*                                 </button> */}
                                <button
                                type="button"
                                className={`reg-role-tab ${
                                formData.role==="PLACEMENT_CELL"
                                ?"reg-role-tab--active":""
                                }`}
                                onClick={()=>handleRoleSelect("PLACEMENT_CELL")}
                                >
                                Placement Cell
                                </button>




                            </div>
                        </div>

                        <button className="reg-submit" type="submit">
                            Create account
                        </button>

                    </form>

                    <p className="reg-footnote">
                        Already have an account? <a href="/login">Sign in</a>
                    </p>

                </div>
            </div>

        </div>

    );

};


export default Register;