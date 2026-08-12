import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="pri-home">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600;8..60,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');

        * { box-sizing: border-box; }

        .pri-home {
          --navy: #0e1a2b;
          --navy-raised: #16273d;
          --blue: #1d4ed8;
          --blue-soft: rgba(29, 78, 216, 0.07);
          --ink: #101828;
          --muted: #667085;
          --border: #e4e7ec;
          --bg: #ffffff;
          --gold: #c98a2c;

          min-height: 100vh;
          width: 100%;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          background: var(--bg);
        }

        /* ---------- Nav ---------- */

        .pri-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 52px;
          border-bottom: 1px solid var(--border);
        }

        .pri-nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pri-mark {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--navy);
          color: #eef1f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.5px;
        }

        .pri-nav-name {
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: -0.1px;
        }

        .pri-nav-sub {
          font-size: 11.5px;
          color: var(--muted);
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.5px;
        }

        .pri-nav-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .pri-link-login {
          font-size: 14px;
          font-weight: 500;
          color: var(--ink);
          text-decoration: none;
        }

        .pri-link-login:hover {
          color: var(--blue);
        }

        .pri-btn-register {
          background: var(--blue);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 13.5px;
          text-decoration: none;
          transition: background 0.15s ease, transform 0.05s ease;
        }

        .pri-btn-register:hover {
          background: #1740b8;
        }

        .pri-btn-register:active {
          transform: translateY(1px);
        }

        /* ---------- Hero ---------- */

        .pri-hero {
          position: relative;
          background: var(--navy);
          color: #eef1f6;
          padding: 88px 52px 96px;
          overflow: hidden;
        }

        .pri-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(760px 460px at 85% 0%, rgba(29,78,216,0.24), transparent 62%);
          pointer-events: none;
        }

        .pri-hero-inner {
          position: relative;
          max-width: 620px;
        }

        .pri-hero-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #7d95c4;
          margin-bottom: 18px;
        }

        .pri-hero-title {
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 44px;
          line-height: 1.2;
          margin: 0 0 18px;
        }

        .pri-hero-title em {
          font-style: normal;
          color: #8fb0ff;
        }

        .pri-hero-copy {
          font-size: 15.5px;
          line-height: 1.7;
          color: #aab6cc;
          margin: 0 0 32px;
          max-width: 480px;
        }

        .pri-hero-actions {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .pri-btn-primary {
          background: var(--blue);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 13px 26px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: background 0.15s ease, transform 0.05s ease;
        }

        .pri-btn-primary:hover {
          background: #1740b8;
        }

        .pri-btn-primary:active {
          transform: translateY(1px);
        }

        .pri-btn-ghost {
          color: #eef1f6;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 6px;
          padding: 13px 24px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .pri-btn-ghost:hover {
          border-color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.04);
        }

        .pri-hero-footer {
          position: relative;
          display: flex;
          gap: 40px;
          margin-top: 56px;
          padding-top: 26px;
          border-top: 1px solid rgba(255,255,255,0.1);
          max-width: 560px;
        }

        .pri-stat-value {
          font-family: 'Source Serif 4', serif;
          font-size: 22px;
          font-weight: 600;
        }

        .pri-stat-label {
          font-size: 11.5px;
          color: #8a96ab;
          margin-top: 2px;
        }

        /* Score dial, the signature element */

        .pri-dial-wrap {
          position: absolute;
          right: 64px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .pri-dial-caption {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 1px;
          color: #7d95c4;
          text-transform: uppercase;
        }

        @media (max-width: 980px) {
          .pri-dial-wrap { display: none; }
        }

        /* ---------- Pillars ---------- */

        .pri-section {
          padding: 72px 52px;
          max-width: 1080px;
          margin: 0 auto;
        }

        .pri-section-head {
          max-width: 560px;
          margin-bottom: 44px;
        }

        .pri-section-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 12px;
        }

        .pri-section-title {
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 27px;
          margin: 0 0 10px;
        }

        .pri-section-copy {
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--muted);
          margin: 0;
        }

        .pri-pillars {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
        }

        .pri-pillar {
          background: #fff;
          padding: 26px 22px;
        }

        .pri-pillar-weight {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--blue);
          letter-spacing: 0.5px;
          margin-bottom: 14px;
        }

        .pri-pillar-name {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .pri-pillar-desc {
          font-size: 13px;
          line-height: 1.6;
          color: var(--muted);
        }

        @media (max-width: 860px) {
          .pri-pillars { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 560px) {
          .pri-pillars { grid-template-columns: 1fr; }
        }

        /* ---------- Path ---------- */

        .pri-path {
          display: flex;
          gap: 0;
          counter-reset: step;
        }

        .pri-step {
          flex: 1;
          position: relative;
          padding: 0 24px 0 0;
        }

        .pri-step:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 17px;
          right: -8px;
          width: 16px;
          height: 1px;
          background: var(--border);
        }

        .pri-step-num {
          counter-increment: step;
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 15px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: var(--blue);
        }

        .pri-step-title {
          font-size: 14.5px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .pri-step-desc {
          font-size: 13px;
          line-height: 1.6;
          color: var(--muted);
        }

        @media (max-width: 760px) {
          .pri-path { flex-direction: column; gap: 28px; }
          .pri-step:not(:last-child)::after { display: none; }
        }

        /* ---------- Closing CTA ---------- */

        .pri-cta {
          background: var(--navy-raised);
          margin: 0 52px 72px;
          border-radius: 14px;
          padding: 48px 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          color: #eef1f6;
        }

        .pri-cta-title {
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 22px;
          margin: 0 0 8px;
        }

        .pri-cta-copy {
          font-size: 13.5px;
          color: #aab6cc;
          margin: 0;
          max-width: 420px;
        }

        .pri-cta-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        @media (max-width: 760px) {
          .pri-cta { flex-direction: column; align-items: flex-start; }
        }

        /* ---------- Footer ---------- */

        .pri-footer {
          text-align: center;
          font-size: 13px;
          color: var(--muted);
          padding: 0 24px 40px;
        }

        .pri-footer a {
          color: var(--blue);
          font-weight: 500;
          text-decoration: none;
        }

        .pri-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 980px) {
          .pri-hero-title { font-size: 34px; }
          .pri-nav, .pri-hero, .pri-section { padding-left: 24px; padding-right: 24px; }
        }
      `}</style>

      <nav className="pri-nav">
        <div className="pri-nav-brand">
          <div className="pri-mark">PRI</div>
          <div>
            <div className="pri-nav-name">Placement Readiness Index</div>
            <div className="pri-nav-sub">Campus Career Services</div>
          </div>
        </div>

        <div className="pri-nav-actions">
          <Link to="/login" className="pri-link-login">Log in</Link>
          <Link to="/register" className="pri-btn-register">Register</Link>
        </div>
      </nav>

      <header className="pri-hero">
        <div className="pri-hero-inner">
          <div className="pri-hero-eyebrow">Your placement, quantified</div>
          <h1 className="pri-hero-title">
            One score for how ready you<br />actually are for placements — <em>not just your CGPA.</em>
          </h1>
          <p className="pri-hero-copy">
            The Placement Readiness Index pulls together your resume strength, aptitude
            scores, mock interview performance, and skill certifications into a single,
            trackable number — so you know exactly what to fix before recruiters show up.
          </p>

          <div className="pri-hero-actions">
            <Link to="/register" className="pri-btn-primary">Check your PRI score</Link>
            <Link to="/login" className="pri-btn-ghost">Log in</Link>
          </div>

          <div className="pri-hero-footer">
            <div>
              <div className="pri-stat-value">12,400+</div>
              <div className="pri-stat-label">Students tracked</div>
            </div>
            <div>
              <div className="pri-stat-value">340+</div>
              <div className="pri-stat-label">Recruiters partnered</div>
            </div>
            <div>
              <div className="pri-stat-value">4.2×</div>
              <div className="pri-stat-label">Faster to interview-ready</div>
            </div>
          </div>
        </div>

        <div className="pri-dial-wrap">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="78" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
            <circle
              cx="90" cy="90" r="78" fill="none"
              stroke="#1d4ed8" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 78}
              strokeDashoffset={2 * Math.PI * 78 * (1 - 0.78)}
              transform="rotate(-90 90 90)"
            />
            <text x="90" y="84" textAnchor="middle" fontFamily="Source Serif 4, serif" fontWeight="600" fontSize="34" fill="#eef1f6">78</text>
            <text x="90" y="106" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#8a96ab">out of 100</text>
          </svg>
          <div className="pri-dial-caption">Sample readiness score</div>
        </div>
      </header>

      <section className="pri-section">
        <div className="pri-section-head">
          <div className="pri-section-eyebrow">How it's calculated</div>
          <h2 className="pri-section-title">Four pillars, one index</h2>
          <p className="pri-section-copy">
            Each pillar is scored independently and weighted into your overall PRI,
            so you can see precisely where the gaps are.
          </p>
        </div>

        <div className="pri-pillars">
          <div className="pri-pillar">
            <div className="pri-pillar-weight">30% weight</div>
            <div className="pri-pillar-name">Resume Strength</div>
            <div className="pri-pillar-desc">ATS parsing, keyword match, and formatting checks against real job descriptions.</div>
          </div>
          <div className="pri-pillar">
            <div className="pri-pillar-weight">25% weight</div>
            <div className="pri-pillar-name">Aptitude &amp; Coding</div>
            <div className="pri-pillar-desc">Timed quantitative, logical, and coding rounds modeled on actual recruiter tests.</div>
          </div>
          <div className="pri-pillar">
            <div className="pri-pillar-weight">25% weight</div>
            <div className="pri-pillar-name">Mock Interviews</div>
            <div className="pri-pillar-desc">Recorded HR and technical rounds, scored on clarity, structure, and confidence.</div>
          </div>
          <div className="pri-pillar">
            <div className="pri-pillar-weight">20% weight</div>
            <div className="pri-pillar-name">Certifications</div>
            <div className="pri-pillar-desc">Verified courses and projects that match your target role's skill profile.</div>
          </div>
        </div>
      </section>

      <section className="pri-section">
        <div className="pri-section-head">
          <div className="pri-section-eyebrow">Getting started</div>
          <h2 className="pri-section-title">From sign-up to interview-ready</h2>
        </div>

        <div className="pri-path">
          <div className="pri-step">
            <div className="pri-step-num">1</div>
            <div className="pri-step-title">Register &amp; assess</div>
            <div className="pri-step-desc">Create your profile and complete the baseline assessment across all four pillars.</div>
          </div>
          <div className="pri-step">
            <div className="pri-step-num">2</div>
            <div className="pri-step-title">Get your PRI</div>
            <div className="pri-step-desc">Receive your score with a breakdown of exactly which pillars are pulling it down.</div>
          </div>
          <div className="pri-step">
            <div className="pri-step-num">3</div>
            <div className="pri-step-title">Close the gaps</div>
            <div className="pri-step-desc">Follow a personalized plan of drills, mock rounds, and resume fixes.</div>
          </div>
          <div className="pri-step">
            <div className="pri-step-num">4</div>
            <div className="pri-step-title">Get placement-ready</div>
            <div className="pri-step-desc">Track your score climb in real time as recruiters open their drives.</div>
          </div>
        </div>
      </section>

      <div className="pri-cta">
        <div>
          <div className="pri-cta-title">Know your number before recruiters do.</div>
          <p className="pri-cta-copy">It takes about 20 minutes to get your first Placement Readiness Index.</p>
        </div>
        <div className="pri-cta-actions">
          <Link to="/register" className="pri-btn-primary">Register</Link>
          <Link to="/login" className="pri-btn-ghost">Log in</Link>
        </div>
      </div>

      <p className="pri-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Home;