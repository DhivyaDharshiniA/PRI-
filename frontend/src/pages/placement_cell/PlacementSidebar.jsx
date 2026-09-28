// import React from "react";
// import {
//   LayoutGrid,
//   ClipboardList,
//   Code2,
//   ShieldAlert,
//   BarChart3,
//   ChevronRight,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
//
// const NAV_ITEMS = [
//   {
//     key: "dashboard",
//     label: "Dashboard",
//     icon: LayoutGrid,
//     path: "/placement-dashboard",
//   },
//   {
//     key: "aptitude",
//     label: "Aptitude Tests",
//     icon: ClipboardList,
//     path: "/placement/aptitude-tests/publish",
//   },
//   {
//     key: "coding",
//     label: "Coding Tests",
//     icon: Code2,
//     path: "/placement/coding-tests/publish",
//   },
//   {
//     key: "violations",
//     label: "Violations & Results",
//     icon: ShieldAlert,
//     path: "/placement/coding-tests/manage",
//   },
//   {
//     key: "stats",
//     label: "Tests",
//     icon: BarChart3,
//     path: "/placement/stats",
//   },
//   {
//     key: "reports",
//     label: "Reports",
//     icon: BarChart3,
//     path: "/placement/reports",
//   },
// ];
//
// export default function PlacementSidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("jwtToken");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");
//
//     navigate("/login", {
//       replace: true,
//     });
//   };
//
//   const isActive = (path) => {
//     return location.pathname === path;
//   };
//
//   return (
//     <aside
//       className="
//         fixed
//         left-0
//         top-0
//         bottom-0
//         z-50
//         hidden
//         w-64
//         flex-col
//         overflow-y-auto
//         bg-[#0B1D42]
//         px-5
//         py-6
//         text-white
//         md:flex
//       "
//     >
//       {/* LOGO */}
//
//       <div className="mb-9 flex items-center gap-2.5 px-1">
//         <div
//           className="
//             flex
//             h-8
//             w-8
//             shrink-0
//             items-center
//             justify-center
//             rounded-lg
//             bg-[#3D6EFF]
//             text-sm
//             font-bold
//             text-white
//           "
//         >
//           P
//         </div>
//
//         <span className="text-[15px] font-semibold tracking-tight">
//           Placement
//           <span className="text-[#7DA2FF]">
//             Cell
//           </span>
//         </span>
//       </div>
//
//       {/* NAVIGATION */}
//
//       <nav className="flex flex-1 flex-col gap-1">
//         {NAV_ITEMS.map(
//           ({
//             key,
//             label,
//             icon: Icon,
//             path,
//           }) => {
//             const active = isActive(path);
//
//             return (
//               <button
//                 key={key}
//                 type="button"
//                 onClick={() =>
//                   navigate(path)
//                 }
//                 className={`
//                   group
//                   flex
//                   w-full
//                   items-center
//                   gap-3
//                   rounded-lg
//                   px-3
//                   py-2.5
//                   text-left
//                   text-sm
//                   transition-all
//                   duration-200
//                   ${
//                     active
//                       ? "bg-white/10 text-white shadow-sm"
//                       : "text-white/55 hover:bg-white/5 hover:text-white/90"
//                   }
//                 `}
//               >
//                 <Icon
//                   size={17}
//                   strokeWidth={2}
//                   className={`
//                     shrink-0
//                     ${
//                       active
//                         ? "text-[#7DA2FF]"
//                         : "text-white/40 group-hover:text-white/70"
//                     }
//                   `}
//                 />
//
//                 <span className="font-medium">
//                   {label}
//                 </span>
//
//                 {active && (
//                   <ChevronRight
//                     size={14}
//                     className="ml-auto text-white/40"
//                   />
//                 )}
//               </button>
//             );
//           }
//         )}
//       </nav>
//
//       {/* THIS WEEK */}
//
//       <div className="mt-6 rounded-xl border border-white/[0.05] bg-white/[0.06] p-4">
//         <div className="mb-1 flex items-center gap-2 text-[#7DA2FF]">
//           <BarChart3 size={15} />
//
//           <span className="text-sm font-semibold">
//             This week
//           </span>
//         </div>
//
//         <p className="text-xs leading-relaxed text-white/50">
//           Monitor student tests,
//           readiness and placement
//           progress.
//         </p>
//       </div>
//
//       {/* BOTTOM */}
//
//       <div className="mt-5 flex flex-col gap-1 border-t border-white/10 pt-5">
//
//         <button
//           type="button"
//           onClick={() =>
//             alert(
//               "Placement settings are not available yet."
//             )
//           }
//           className="
//             group
//             flex
//             w-full
//             items-center
//             gap-3
//             rounded-lg
//             px-3
//             py-2.5
//             text-left
//             text-sm
//             text-white/50
//             transition-colors
//             hover:bg-white/5
//             hover:text-white/90
//           "
//         >
//           <Settings
//             size={16}
//             className="text-white/40 group-hover:text-white/70"
//           />
//
//           <span>
//             Settings
//           </span>
//         </button>
//
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="
//             group
//             flex
//             w-full
//             items-center
//             gap-3
//             rounded-lg
//             px-3
//             py-2.5
//             text-left
//             text-sm
//             text-white/50
//             transition-colors
//             hover:bg-red-500/10
//             hover:text-red-300
//           "
//         >
//           <LogOut
//             size={16}
//             className="text-white/40 group-hover:text-red-300"
//           />
//
//           <span>
//             Sign out
//           </span>
//         </button>
//
//       </div>
//     </aside>
//   );
// }

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  LayoutGrid,
  ClipboardList,
  Code2,
  MessageSquareText,
  ShieldAlert,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

// =============================================================================
// NAVIGATION ITEMS
// =============================================================================

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    path: "/placement-dashboard",
  },
  {
    key: "aptitude",
    label: "Aptitude tests",
    icon: ClipboardList,
    path: "/placement/aptitude-tests/publish",
  },
  {
    key: "coding",
    label: "Coding tests",
    icon: Code2,
    path: "/placement/coding-tests/publish",
  },
  {
    key: "communication",
    label: "Communication tests",
    icon: MessageSquareText,
    path: "/placement/communication-tests/publish",
  },
  {
    key: "violations",
    label: "Violations & results",
    icon: ShieldAlert,
    path: "/placement/coding-tests/manage",
  },
  {
    key: "stats",
    label: "Tests",
    icon: BarChart3,
    path: "/placement/stats",
  },
  {
    key: "reports",
    label: "Reports",
    icon: BarChart3,
    path: "/placement/reports",
  },
];

// =============================================================================
// SIDEBAR
// =============================================================================

export default function PlacementSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ---------------------------------------------------------------------------
  // Active navigation
  // ---------------------------------------------------------------------------

  const getActiveKey = () => {
    const currentPath = location.pathname;

    const activeItem = NAV_ITEMS.find((item) => {
      return (
        currentPath === item.path ||
        currentPath.startsWith(`${item.path}/`)
      );
    });

    return activeItem?.key || "dashboard";
  };

  const activeKey = getActiveKey();

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  const handleNavigate = (path) => {
    navigate(path);
  };

  // ---------------------------------------------------------------------------
  // Sign out
  // ---------------------------------------------------------------------------

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    localStorage.removeItem("studentId");

    window.location.href = "/login";
  };

  return (
    <aside
      className="
        hidden
        md:flex
        fixed
        left-0
        top-0
        bottom-0
        w-64
        flex-col
        bg-[#0B1D42]
        text-white
        px-5
        py-6
        z-50
        overflow-y-auto
      "
    >
      {/* =====================================================================
          LOGO
      ====================================================================== */}

      <div className="flex items-center gap-2.5 px-1 mb-9">
        {/* Logo */}
        <div
          className="
            w-9
            h-9
            rounded-xl
            bg-[#3D6EFF]
            flex
            items-center
            justify-center
            font-bold
            text-white
            shadow-lg
            shrink-0
          "
        >
          P
        </div>

        {/* Logo text */}
        <div className="min-w-0">
          <div className="font-display font-semibold text-[15px] whitespace-nowrap">
            Placement<span className="text-[#7DA2FF]">Cell</span>
          </div>

          <div className="text-[10px] text-white/35 uppercase tracking-wider mt-0.5 whitespace-nowrap">
            Placement Management
          </div>
        </div>
      </div>

      {/* =====================================================================
          NAVIGATION
      ====================================================================== */}

      <div className="mb-3 px-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">
          Workspace
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeKey === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleNavigate(item.path)}
              className={`
                group
                w-full
                flex
                items-center
                gap-3
                px-3
                py-3
                rounded-xl
                text-sm
                text-left
                transition-all
                duration-200
                ${
                  isActive
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                }
              `}
            >
              {/* Icon */}
              <Icon
                size={17}
                strokeWidth={isActive ? 2.2 : 1.8}
                className={`
                  shrink-0
                  transition-colors
                  ${
                    isActive
                      ? "text-[#7DA2FF]"
                      : "text-white/35 group-hover:text-white/70"
                  }
                `}
              />

              {/* Label */}
              <span
                className={`
                  font-medium
                  flex-1
                  ${
                    isActive
                      ? "text-white"
                      : "text-white/50 group-hover:text-white"
                  }
                `}
              >
                {item.label}
              </span>

              {/* Active arrow */}
              {isActive && (
                <ChevronRight
                  size={14}
                  className="text-white/40 shrink-0"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* =====================================================================
          COMMUNICATION MODULE INFO
      ====================================================================== */}

      <div
        className="
          mt-6
          rounded-xl
          bg-white/[0.06]
          border
          border-white/[0.06]
          p-4
        "
      >
        <div className="flex items-center gap-2 text-[#7DA2FF] mb-2">
          <MessageSquareText size={15} />

          <span className="font-semibold text-sm">
            Communication
          </span>
        </div>

        <p className="text-xs text-white/45 leading-relaxed">
          Create and manage communication assessments to measure
          students' verbal readiness.
        </p>
      </div>

      {/* =====================================================================
          BOTTOM ACTIONS
      ====================================================================== */}

      <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-1">
        {/* Settings */}
        <button
          type="button"
          onClick={() => {
            // Settings page can be connected later
          }}
          className="
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-lg
            text-sm
            text-white/45
            hover:text-white
            hover:bg-white/[0.05]
            transition-colors
          "
        >
          <Settings
            size={16}
            strokeWidth={1.8}
          />

          <span>Settings</span>
        </button>

        {/* Sign out */}
        <button
          type="button"
          onClick={handleSignOut}
          className="
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-lg
            text-sm
            text-white/45
            hover:text-white
            hover:bg-white/[0.05]
            transition-colors
          "
        >
          <LogOut
            size={16}
            strokeWidth={1.8}
          />

          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}