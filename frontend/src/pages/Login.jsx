import React, { useState } from "react";
import axios from "axios";


const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleLogin = async (e) => {

        e.preventDefault();


        try {

            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    email,
                    password
                }
            );


            const data = response.data;


            // Store JWT token
            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "role",
                data.role
            );


            localStorage.setItem(
                "userId",
                data.id
            );


            localStorage.setItem(
                "email",
                data.email
            );


            alert("Login successful");


            if (data.role === "STUDENT") {
                window.location.href = "/student-dashboard";
            }
            else if (data.role === "ADMIN") {
                window.location.href = "/admin-dashboard";
            }
            else if (data.role === "PLACEMENT_CELL") {
                window.location.href = "/placement-dashboard";
            }


        }
        catch (error) {

            console.log(error);

            alert("Invalid login");

        }

    };



    return (

        <div className="login-page">

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

                * { box-sizing: border-box; }

                .login-page {
                    --navy: #0e1a2b;
                    --navy-raised: #16273d;
                    --blue: #1d4ed8;
                    --blue-soft: rgba(29, 78, 216, 0.07);
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

                .login-aside {
                    background: var(--navy);
                    color: #eef1f6;
                    padding: 56px 52px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    overflow: hidden;
                }

                .login-aside::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(700px 420px at 100% 0%, rgba(29,78,216,0.22), transparent 60%);
                    pointer-events: none;
                }

                .login-mark {
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

                .login-aside-body {
                    position: relative;
                    max-width: 380px;
                    margin-top: 40px;
                }

                .login-aside-eyebrow {
                    font-family: 'IBM Plex Mono', monospace;
                    font-size: 11px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #7d95c4;
                    margin-bottom: 16px;
                }

                .login-aside-title {
                    font-family: 'Source Serif 4', serif;
                    font-weight: 600;
                    font-size: 30px;
                    line-height: 1.3;
                    margin: 0 0 14px;
                }

                .login-aside-copy {
                    font-size: 14.5px;
                    line-height: 1.7;
                    color: #aab6cc;
                    margin: 0;
                }

                .login-aside-footer {
                    position: relative;
                    display: flex;
                    gap: 28px;
                    padding-top: 24px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }

                .login-stat-value {
                    font-family: 'Source Serif 4', serif;
                    font-size: 20px;
                    font-weight: 600;
                }

                .login-stat-label {
                    font-size: 11.5px;
                    color: #8a96ab;
                    margin-top: 2px;
                }

                .login-form-side {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 24px;
                }

                .login-form-wrap {
                    width: 100%;
                    max-width: 380px;
                }

                .login-title {
                    font-size: 22px;
                    font-weight: 600;
                    margin: 0 0 6px;
                    letter-spacing: -0.2px;
                }

                .login-subtitle {
                    font-size: 14px;
                    color: var(--muted);
                    margin: 0 0 30px;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .login-field {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .login-label {
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--ink);
                }

                .login-input {
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

                .login-input::placeholder {
                    color: #98a2b3;
                }

                .login-input:focus {
                    border-color: var(--blue);
                    box-shadow: 0 0 0 3px var(--blue-soft);
                }

                .login-row-between {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: -6px;
                }

                .login-forgot {
                    font-size: 12.5px;
                    color: var(--blue);
                    text-decoration: none;
                    font-weight: 500;
                }

                .login-forgot:hover {
                    text-decoration: underline;
                }

                .login-submit {
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

                .login-submit:hover {
                    background: #1740b8;
                }

                .login-submit:active {
                    transform: translateY(1px);
                }

                .login-footnote {
                    font-size: 13.5px;
                    color: var(--muted);
                    text-align: center;
                    margin-top: 22px;
                }

                .login-footnote a {
                    color: var(--blue);
                    font-weight: 500;
                    text-decoration: none;
                }

                .login-footnote a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 860px) {
                    .login-page {
                        grid-template-columns: 1fr;
                    }

                    .login-aside {
                        display: none;
                    }

                    .login-form-side {
                        padding: 48px 20px;
                    }
                }
            `}</style>

            <aside className="login-aside">

                <div className="login-mark">UR</div>

                <div className="login-aside-body">
                    <div className="login-aside-eyebrow">Registrar's Office</div>
                    <h1 className="login-aside-title">Welcome back to your academic portal.</h1>
                    <p className="login-aside-copy">
                        Sign in to pick up where you left off — enrollment,
                        records and campus services, all in one place.
                    </p>
                </div>

                <div className="login-aside-footer">
                    <div>
                        <div className="login-stat-value">12,400+</div>
                        <div className="login-stat-label">Students registered</div>
                    </div>
                    <div>
                        <div className="login-stat-value">99.9%</div>
                        <div className="login-stat-label">Portal uptime</div>
                    </div>
                    <div>
                        <div className="login-stat-value">SOC 2</div>
                        <div className="login-stat-label">Data handling</div>
                    </div>
                </div>

            </aside>

            <div className="login-form-side">
                <div className="login-form-wrap">

                    <h2 className="login-title">Sign in</h2>
                    <p className="login-subtitle">Enter your credentials to continue.</p>

                    <form className="login-form" onSubmit={handleLogin}>

                        <div className="login-field">
                            <label className="login-label" htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="login-input"
                                type="email"
                                placeholder="you@college.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="login-field">
                            <label className="login-label" htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="login-input"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="login-row-between">
                            <a className="login-forgot" href="/forgot-password">Forgot password?</a>
                        </div>

                        <button className="login-submit" type="submit">
                            Login
                        </button>

                    </form>

                    <p className="login-footnote">
                        Don't have an account? <a href="/register">Create one</a>
                    </p>

                </div>
            </div>

        </div>

    );


};


export default Login;