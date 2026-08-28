
import React from "react";
import {
  LayoutGrid,
  ClipboardList,
  Code2,
  ShieldAlert,
  BarChart3,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    path: "/placement/dashboard",
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
];

function PlacementSidebar({ activeKey, onNavigate }) {
  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <aside
      className="
        hidden
        md:flex
        flex-col
        fixed
        left-0
        top-0
        bottom-0
        w-64
        bg-[#0B1D42]
        text-white
        px-5
        py-6
        z-50
        overflow-y-auto
      "
      aria-label="Placement navigation"
    >
      {/* =========================================================
          LOGO
      ========================================================= */}

      <div className="flex items-center gap-2.5 px-1 mb-9">
        <div
          className="
            w-8
            h-8
            rounded-lg
            bg-[#3D6EFF]
            flex
            items-center
            justify-center
            font-display
            font-bold
            text-white
            text-sm
            shrink-0
          "
        >
          P
        </div>

        <span
          className="
            font-display
            font-semibold
            text-[15px]
            tracking-tight
          "
        >
          Placement
          <span className="text-[#7DA2FF]">
            Cell
          </span>
        </span>
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}

      <nav
        className="
          flex-1
          flex
          flex-col
          gap-1
        "
        aria-label="Main navigation"
      >
        {NAV_ITEMS.map(
          ({
            key,
            label,
            icon: Icon,
            path,
          }) => {
            const isActive =
              activeKey === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() =>
                  handleNavigation(path)
                }
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
                className={`
                  group
                  w-full
                  flex
                  items-center
                  gap-3
                  px-3
                  py-2.5
                  rounded-lg
                  text-sm
                  transition-all
                  duration-200
                  text-left
                  ${
                    isActive
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-white/55 hover:text-white/90 hover:bg-white/5"
                  }
                `}
              >
                <Icon
                  size={17}
                  strokeWidth={2}
                  className={`
                    shrink-0
                    transition-colors
                    ${
                      isActive
                        ? "text-[#7DA2FF]"
                        : "text-white/40 group-hover:text-white/70"
                    }
                  `}
                />

                <span className="font-medium">
                  {label}
                </span>

                {isActive && (
                  <ChevronRight
                    size={14}
                    className="
                      ml-auto
                      text-white/40
                      shrink-0
                    "
                  />
                )}
              </button>
            );
          }
        )}
      </nav>

      {/* =========================================================
          THIS WEEK CARD
      ========================================================= */}

      <div
        className="
          mt-6
          rounded-xl
          bg-white/[0.06]
          border
          border-white/[0.05]
          p-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-[#7DA2FF]
            mb-1
          "
        >
          <BarChart3 size={15} />

          <span
            className="
              font-display
              font-semibold
              text-sm
            "
          >
            This week
          </span>
        </div>

        <p
          className="
            text-xs
            text-white/50
            leading-relaxed
          "
        >
          186 tests submitted, 24
          awaiting review.
        </p>
      </div>

      {/* =========================================================
          BOTTOM ACTIONS
      ========================================================= */}

      <div
        className="
          mt-5
          pt-5
          border-t
          border-white/10
          flex
          flex-col
          gap-1
        "
      >
        {/* Settings */}

        <button
          type="button"
          onClick={() =>
            handleNavigation(
              "/placement/settings"
            )
          }
          className="
            group
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-lg
            text-sm
            text-white/50
            hover:text-white/90
            hover:bg-white/5
            transition-colors
            text-left
          "
        >
          <Settings
            size={16}
            className="
              text-white/40
              group-hover:text-white/70
            "
          />

          <span>
            Settings
          </span>
        </button>

        {/* Sign out */}

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            handleNavigation("/login");
          }}
          className="
            group
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-lg
            text-sm
            text-white/50
            hover:text-red-300
            hover:bg-red-500/10
            transition-colors
            text-left
          "
        >
          <LogOut
            size={16}
            className="
              text-white/40
              group-hover:text-red-300
            "
          />

          <span>
            Sign out
          </span>
        </button>
      </div>
    </aside>
  );
}

export default PlacementSidebar;
