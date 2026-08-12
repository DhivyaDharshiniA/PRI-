import { useNavigate } from "react-router-dom";

/**
 * Small "← Back" bar shown above a page's main card. Deliberately not used
 * inside the exam runner while a test is in progress -- letting someone
 * navigate away mid-test would be a proctoring hole, not a convenience.
 */
export default function BackHeader({ to, label = "Back", eyebrow }) {
  const navigate = useNavigate();

  return (
    <div className="cd-topbar">
      <button className="cd-back-btn" onClick={() => navigate(to)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {label}
      </button>
      {eyebrow && <span className="cd-topbar-title">{eyebrow}</span>}
    </div>
  );
}