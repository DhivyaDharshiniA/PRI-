import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Code2,
  Brain,
  Map,
  LogOut,
  X,
} from "lucide-react";
//
// const NAV_ITEMS = [
//   {
//     label: "Dashboard",
//     path: "/student-dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "Aptitude Tests",
//     path: "/student/aptitude-tests",
//     icon: ClipboardList,
//   },
//   {
//     label: "Coding Tests",
//     path: "/student/coding-tests",
//     icon: Code2,
//   },
//   {
//     label: "My Skills",
//     path: "/student/skills",
//     icon: Brain,
//   },
//   {
//     label: "Career Roadmap",
//     path: "/student/roadmap",
//     icon: Map,
//   },
//   {
//         key: "profiles",
//         label: "Coding Profiles",
//         icon: Code2,
//         path: "/student/external-profiles",
//     }
// ];

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/student-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Aptitude Tests",
    path: "/student/aptitude-tests",
    icon: ClipboardList,
  },
  {
    label: "Coding Tests",
    path: "/student/coding-tests",
    icon: Code2,
  },
  {
    label: "My Skills",
    path: "/student/skills",
    icon: Brain,
  },
  {
    label: "Coding Profiles",
    path: "/student/external-profiles",
    icon: Code2,
  },
  {
    label: "Career Roadmap",
    path: "/student/roadmap",
    icon: Map,
  },
];

export default function StudentSidebar({
  mobileOpen = false,
  onClose,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/student-dashboard") {
      return location.pathname === path;
    }

    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path) => {
    navigate(path);

    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("studentId");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

        .apt-sidebar {
          --navy: #0e1a2b;
          --navy-raised: #16273d;
          --blue: #1d4ed8;
          --blue-soft: rgba(29, 78, 216, 0.16);
          --ink: #101828;
          --muted: #667085;
          --border: #e4e7ec;
          --bg: #ffffff;
        }

        .apt-sidebar-overlay {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(14, 26, 43, 0.55);
        }

        .apt-sidebar-aside {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 50;
          display: flex;
          height: 100vh;
          width: 270px;
          flex-direction: column;
          background: var(--navy);
          color: #eef1f6;
          font-family: 'Inter', sans-serif;
          transition: transform 0.3s ease;
          overflow: hidden;
        }

        .apt-sidebar-aside::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(600px 360px at 100% 0%, rgba(29, 78, 216, 0.24), transparent 60%);
          pointer-events: none;
        }

        .apt-sidebar-aside.closed {
          transform: translateX(-100%);
        }

        @media (min-width: 1024px) {
          .apt-sidebar-aside {
            transform: translateX(0) !important;
          }
        }

        .apt-sidebar-logo-row {
          position: relative;
          display: flex;
          height: 76px;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0 20px;
          flex-shrink: 0;
        }

        .apt-sidebar-logo-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: inherit;
          text-align: left;
        }

        .apt-sidebar-mark {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: var(--navy-raised);
          border: 1px solid rgba(255, 255, 255, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 16px;
        }

        .apt-sidebar-brand-name {
          margin: 0;
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: -0.2px;
        }

        .apt-sidebar-brand-sub {
          margin: 2px 0 0;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9.5px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #7d95c4;
        }

        .apt-sidebar-close {
          background: none;
          border: none;
          color: #aab6cc;
          padding: 6px;
          border-radius: 6px;
          cursor: pointer;
        }

        @media (min-width: 1024px) {
          .apt-sidebar-close {
            display: none;
          }
        }

        .apt-sidebar-nav-wrap {
          position: relative;
          flex: 1;
          overflow-y: auto;
          padding: 24px 16px;
        }

        .apt-sidebar-nav-label {
          margin: 0 0 12px;
          padding: 0 10px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #7d95c4;
        }

        .apt-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .apt-sidebar-nav-btn {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 12px;
          border-radius: 7px;
          border: none;
          padding: 11px 12px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #c2cbdc;
          background: transparent;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .apt-sidebar-nav-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .apt-sidebar-nav-btn.active {
          background: var(--blue);
          color: #ffffff;
        }

        .apt-sidebar-nav-icon {
          display: flex;
          height: 32px;
          width: 32px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          color: #8a96ab;
        }

        .apt-sidebar-nav-btn.active .apt-sidebar-nav-icon {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
        }

        .apt-sidebar-nav-btn:hover .apt-sidebar-nav-icon {
          color: #dbe2f0;
        }

        .apt-sidebar-profile-wrap {
          position: relative;
          padding: 0 16px 12px;
        }

        .apt-sidebar-profile-card {
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: var(--navy-raised);
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .apt-sidebar-avatar {
          display: flex;
          height: 36px;
          width: 36px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: var(--blue);
          font-family: 'Source Serif 4', serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }

        .apt-sidebar-profile-name {
          margin: 0;
          font-size: 13.5px;
          font-weight: 600;
          color: #eef1f6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .apt-sidebar-profile-sub {
          margin: 1px 0 0;
          font-size: 11.5px;
          color: #8a96ab;
        }

        .apt-sidebar-logout-wrap {
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 14px 16px;
        }

        .apt-sidebar-logout-btn {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 12px;
          border-radius: 7px;
          border: none;
          background: transparent;
          padding: 10px 12px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #c2cbdc;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .apt-sidebar-logout-btn:hover {
          background: rgba(180, 35, 24, 0.18);
          color: #ff9c8f;
        }

        .apt-sidebar-logout-icon {
          display: flex;
          height: 32px;
          width: 32px;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
        }
      `}</style>

      <div className="apt-sidebar">
        {mobileOpen && (
          <div
            className="apt-sidebar-overlay"
            onClick={onClose}
          />
        )}

        <aside
          className={`apt-sidebar-aside ${
            mobileOpen ? "open" : "closed"
          }`}
        >
          <div className="apt-sidebar-logo-row">
            <button
              onClick={() =>
                navigate("/student-dashboard")
              }
              className="apt-sidebar-logo-btn"
            >
              <div className="apt-sidebar-mark">P</div>

              <div>
                <p className="apt-sidebar-brand-name">
                  PRI
                </p>
                <p className="apt-sidebar-brand-sub">
                  Placement Readiness
                </p>
              </div>
            </button>

            <button
              onClick={onClose}
              className="apt-sidebar-close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="apt-sidebar-nav-wrap">
            <p className="apt-sidebar-nav-label">
              Student Menu
            </p>

            <nav className="apt-sidebar-nav">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <button
                    key={item.path}
                    onClick={() =>
                      handleNavigation(item.path)
                    }
                    className={`apt-sidebar-nav-btn ${
                      active ? "active" : ""
                    }`}
                  >
                    <span className="apt-sidebar-nav-icon">
                      <Icon size={17} />
                    </span>

                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="apt-sidebar-profile-wrap">
            <div className="apt-sidebar-profile-card">
              <div className="apt-sidebar-avatar">S</div>

              <div style={{ minWidth: 0 }}>
                <p className="apt-sidebar-profile-name">
                  Student
                </p>
                <p className="apt-sidebar-profile-sub">
                  Placement Portal
                </p>
              </div>
            </div>
          </div>

          <div className="apt-sidebar-logout-wrap">
            <button
              onClick={handleLogout}
              className="apt-sidebar-logout-btn"
            >
              <span className="apt-sidebar-logout-icon">
                <LogOut size={16} />
              </span>

              Sign Out
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}