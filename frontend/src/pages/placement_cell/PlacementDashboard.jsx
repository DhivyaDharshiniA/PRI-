// import React from "react";
// import { useNavigate } from "react-router-dom";
//
// const PlacementDashboard = () => {
//
//     const navigate = useNavigate();
//     return (
//
//         <div className="min-h-screen bg-gray-100 p-8">
//             <h1 className="text-3xl font-bold text-gray-800">
//                 Placement Cell Dashboard
//             </h1>
//
//             <p className="text-gray-600 mt-2">
//                 Monitor student placement preparation and manage placement activities.
//             </p>
//
//             {/* Statistics Cards */}
//             <div className="grid md:grid-cols-4 gap-6 mt-8">
//                 <div className="bg-white rounded-xl shadow p-6">
//                     <h3 className="text-gray-500">
//                         Total Students
//                     </h3>
//
//                     <h2 className="text-3xl font-bold text-blue-600 mt-2">
//                         2500
//                     </h2>
//
//                     <p className="text-sm text-gray-500 mt-2">
//                         Registered students
//                     </p>
//
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-6">
//
//                     <h3 className="text-gray-500">
//                         Average PRI Score
//                     </h3>
//
//                     <h2 className="text-3xl font-bold text-green-600 mt-2">
//                         72%
//                     </h2>
//
//                     <p className="text-sm text-gray-500 mt-2">
//                         Student readiness
//                     </p>
//
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-6">
//                     <h3 className="text-gray-500">
//                         Training Required
//                     </h3>
//
//                     <h2 className="text-3xl font-bold text-red-600 mt-2">
//                         340
//                     </h2>
//
//                     <p className="text-sm text-gray-500 mt-2">
//                         Students need improvement
//                     </p>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-6">
//                     <h3 className="text-gray-500">
//                         Placement Reports
//                     </h3>
//
//                     <h2 className="text-3xl font-bold text-purple-600 mt-2">
//                         50
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-2">
//                         Reports generated
//                     </p>
//                 </div>
//             </div>
//
//             {/* Placement Controls */}
//             <div className="bg-white rounded-xl shadow p-6 mt-10">
//
//                 <h2 className="text-xl font-bold text-gray-800 mb-5">
//                     Placement Cell Controls
//                 </h2>
//
//                 <div className="flex flex-wrap gap-4">
//                     <button
//                         className="
//                         bg-blue-600
//                         text-white
//                         px-6
//                         py-3
//                         rounded-lg
//                         hover:bg-blue-700
//                         "
//                         onClick={() => navigate("/placement/aptitude-tests/publish")}
//                     >
//                         Create Aptitude Assessment
//                     </button>
//
//                     <button
//                         className="
//                         bg-indigo-600
//                         text-white
//                         px-6
//                         py-3
//                         rounded-lg
//                         hover:bg-indigo-700
//                         "
//                         onClick={() => navigate("/placement/coding-tests/publish")}
//                     >
//                         Create Coding Assessment
//                     </button>
//
//                     <button
//                         className="
//                         bg-green-600
//                         text-white
//                         px-6
//                         py-3
//                         rounded-lg
//                         hover:bg-green-700
//                         "
//                         onClick={() => navigate("/placement/coding-tests/manage")}
//                     >
//                         Review Violations &amp; Results
//                     </button>
//
//                     <button
//                         className="
//                         bg-purple-600
//                         text-white
//                         px-6
//                         py-3
//                         rounded-lg
//                         hover:bg-purple-700
//                         "
//                     >
//                         Department Statistics
//                     </button>
//
//                     <button
//                         className="
//                         bg-gray-800
//                         text-white
//                         px-6
//                         py-3
//                         rounded-lg
//                         hover:bg-gray-900
//                         "
//                     >
//                         Generate Reports
//                     </button>
//                 </div>
//             </div>
//
//             {/* Student Performance Section */}
//             <div className="grid md:grid-cols-3 gap-6 mt-10">
//
//                 <div
//                     className="bg-white shadow rounded-xl p-6 cursor-pointer hover:shadow-lg"
//                     onClick={() => navigate("/placement/coding-tests/publish")}
//                 >
//                     <h3 className="font-bold text-lg">
//                         Technical Assessment
//                     </h3>
//
//                     <p className="text-gray-600 mt-2">
//                         Create and evaluate coding and technical tests.
//                     </p>
//                 </div>
//
//                 <div className="bg-white shadow rounded-xl p-6">
//                     <h3 className="font-bold text-lg">
//                         Aptitude Training
//                     </h3>
//
//                     <p className="text-gray-600 mt-2">
//                         Track aptitude improvement and performance.
//                     </p>
//                 </div>
//
//                 <div className="bg-white shadow rounded-xl p-6">
//                     <h3 className="font-bold text-lg">
//                         Resume Review
//                     </h3>
//
//                     <p className="text-gray-600 mt-2">
//                         Review resumes and provide feedback.
//                     </p>
//                 </div>
//             </div>
//
//         </div>
//     );
// };
//
// export default PlacementDashboard;



import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  Code2,
  ShieldAlert,
  BarChart3,
  FileText,
  Search,
  Bell,
  ChevronRight,
  ArrowUpRight,
  Settings,
  LogOut,
  FileSearch,
  GraduationCap,
} from "lucide-react";

// =============================================================================
// Static data — swap for real API data. Kept at the top so the component
// bodies stay readable.
// =============================================================================

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid, path: "/placement/dashboard" },
  { key: "aptitude", label: "Aptitude tests", icon: ClipboardList, path: "/placement/aptitude-tests/publish" },
  { key: "coding", label: "Coding tests", icon: Code2, path: "/placement/coding-tests/publish" },
  { key: "violations", label: "Violations & results", icon: ShieldAlert, path: "/placement/coding-tests/manage" },
  { key: "stats", label: "Tests", icon: BarChart3, path: "/placement/stats" },
//   { key: "reports", label: "Reports", icon: FileText, path: "/placement/reports" },
];

const STATS = [
  { label: "Total students", value: "2", note: "Registered students", tone: "blue" },
  { label: "Average PRI score", value: "7%", note: "Student readiness", tone: "blue" },
  { label: "Training required", value: "3", note: "Need improvement", tone: "red" },
  { label: "Placement reports", value: "5", note: "Reports generated", tone: "blue" },
];

const CONTROLS = [
  { key: "create-aptitude", label: "Create aptitude assessment", desc: "Publish a new test to students", icon: ClipboardList, path: "/placement/aptitude-tests/publish" },
  { key: "create-coding", label: "Create coding assessment", desc: "Set up problems and constraints", icon: Code2, path: "/placement/coding-tests/publish" },
  { key: "violations", label: "Review violations & results", desc: "12 flagged submissions", icon: ShieldAlert, path: "/placement/coding-tests/manage" },
  { key: "dept-stats", label: "Department statistics", desc: "Breakdown by branch & batch", icon: BarChart3, path: "/placement/stats" },
  { key: "reports", label: "Generate reports", desc: "Export placement-ready cohorts", icon: FileText, path: "/placement/reports" },
];

const PERFORMANCE_SECTIONS = [
  {
    key: "technical",
    title: "Technical assessment",
    desc: "Create and evaluate coding and technical tests.",
    icon: Code2,
    path: "/placement/coding-tests/publish",
  },
  {
    key: "aptitude",
    title: "Aptitude training",
    desc: "Track aptitude improvement and performance.",
    icon: GraduationCap,
    path: "/placement/aptitude-training",
  },
  {
    key: "resume",
    title: "Resume review",
    desc: "Review resumes and provide feedback.",
    icon: FileSearch,
    path: "/placement/resume-review",
  },
];

const TONE_CLASSES = {
  blue: { value: "text-[#1D4ED8]", note: "text-[#2563EB]" },
  red: { value: "text-[#DC2626]", note: "text-[#DC2626]" },
};

// =============================================================================
// Presentational subcomponents
// =============================================================================

/** Fonts + custom utility classes shared across the dashboard. */
function GlobalFontStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
      .font-display { font-family: 'Space Grotesk', sans-serif; }
      .font-mono { font-family: 'IBM Plex Mono', monospace; }
    `}</style>
  );
}

function Sidebar({ activeKey, onNavigate }) {
  return (
    <aside
      className="hidden md:flex flex-col w-64 shrink-0 bg-[#0B1D42] text-white px-5 py-6"
      aria-label="Primary navigation"
    >
      <div className="flex items-center gap-2.5 px-1 mb-9">
        <div className="w-8 h-8 rounded-lg bg-[#3D6EFF] flex items-center justify-center font-display font-bold text-white text-sm">
          P
        </div>
        <span className="font-display font-semibold text-[15px] tracking-tight">
          Placement<span className="text-[#7DA2FF]">Cell</span>
        </span>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map(({ key, label, icon: Icon, path }) => {
          const isActive = activeKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(path)}
              aria-current={isActive ? "page" : undefined}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:text-white/90 hover:bg-white/5"
              }`}
            >
              <Icon
                size={17}
                strokeWidth={2}
                className={isActive ? "text-[#7DA2FF]" : "text-white/40 group-hover:text-white/70"}
              />
              <span className="font-medium">{label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto text-white/40" />}
            </button>
          );
        })}
      </nav>

      <div className="mt-6 rounded-xl bg-white/[0.06] p-4">
        <div className="flex items-center gap-2 text-[#7DA2FF] mb-1">
          <BarChart3 size={15} />
          <span className="font-display font-semibold text-sm">This week</span>
        </div>
        <p className="text-xs text-white/50 leading-relaxed">
          186 tests submitted, 24 awaiting review.
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-1">
        <button
          type="button"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/85 hover:bg-white/5 transition-colors"
        >
          <Settings size={16} />
          <span>Settings</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/85 hover:bg-white/5 transition-colors"
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

function Topbar({ searchValue, onSearchChange }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-[26px] font-semibold tracking-tight text-[#0B1D42]">
          Placement cell dashboard
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Monitor student placement preparation and manage placement activities.
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <label className="flex items-center gap-2 bg-white border border-[#DCE3F5] rounded-lg px-3 py-2 w-56">
          <Search size={15} className="text-[#9CA3AF]" aria-hidden="true" />
          <span className="sr-only">Search students or batches</span>
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search students, batches..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-[#9CA3AF]"
          />
        </label>

        <button
          type="button"
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-lg bg-white border border-[#DCE3F5] flex items-center justify-center"
        >
          <Bell size={16} className="text-[#4B5563]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#3D6EFF]" />
        </button>

        <div
          className="w-9 h-9 rounded-full bg-[#3D6EFF] text-white flex items-center justify-center font-display text-sm font-semibold"
          aria-hidden="true"
        >
          PC
        </div>
      </div>
    </div>
  );
}

function StatsGrid({ stats }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-2xl border border-[#DCE3F5] p-5">
          <p className="text-xs text-[#6B7280] mb-2">{s.label}</p>
          <p className={`font-display text-3xl font-semibold ${TONE_CLASSES[s.tone].value}`}>
            {s.value}
          </p>
          <p className={`text-xs mt-1.5 ${TONE_CLASSES[s.tone].note}`}>{s.note}</p>
        </div>
      ))}
    </div>
  );
}

function ActionCard({ label, desc, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-start gap-3 p-4 rounded-xl border border-[#DCE3F5] hover:border-[#3D6EFF] hover:bg-[#F5F8FF] transition-colors text-left"
    >
      <div className="w-9 h-9 rounded-lg bg-[#E8EEFF] flex items-center justify-center shrink-0 group-hover:bg-[#3D6EFF] transition-colors">
        <Icon size={16} className="text-[#3D6EFF] group-hover:text-white transition-colors" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#0B1D42]">{label}</p>
        <p className="text-xs text-[#6B7280] mt-0.5">{desc}</p>
      </div>
    </button>
  );
}

function ControlsPanel({ controls, onNavigate }) {
  return (
    <section className="bg-white rounded-2xl border border-[#DCE3F5] p-6 mb-6">
      <h2 className="font-display font-semibold text-base text-[#0B1D42] mb-5">
        Placement cell controls
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {controls.map(({ key, label, desc, icon, path }) => (
          <ActionCard
            key={key}
            label={label}
            desc={desc}
            icon={icon}
            onClick={() => onNavigate(path)}
          />
        ))}
      </div>
    </section>
  );
}

function PerformanceCard({ title, desc, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left rounded-xl border border-[#DCE3F5] p-5 hover:border-[#3D6EFF] hover:bg-[#F5F8FF] transition-colors"
    >
      <div className="w-9 h-9 rounded-lg bg-[#E8EEFF] flex items-center justify-center mb-3 group-hover:bg-[#3D6EFF] transition-colors">
        <Icon size={16} className="text-[#3D6EFF] group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-display font-semibold text-sm text-[#0B1D42]">{title}</h3>
      <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">{desc}</p>
    </button>
  );
}

function PerformanceSection({ sections, onNavigate, onViewAll }) {
  return (
    <section className="bg-white rounded-2xl border border-[#DCE3F5] p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-semibold text-base text-[#0B1D42]">
          Student performance
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs text-[#3D6EFF] font-medium flex items-center gap-1 hover:underline"
        >
          View all <ArrowUpRight size={13} />
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {sections.map(({ key, title, desc, icon, path }) => (
          <PerformanceCard
            key={key}
            title={title}
            desc={desc}
            icon={icon}
            onClick={() => onNavigate(path)}
          />
        ))}
      </div>
    </section>
  );
}

// =============================================================================
// Root component
// =============================================================================

const PlacementDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const activeKey = useMemo(
    () => NAV_ITEMS.find((item) => location.pathname.startsWith(item.path))?.key ?? "dashboard",
    [location.pathname]
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen flex bg-[#F4F6FB] text-[#111827]">
      <GlobalFontStyles />

      <Sidebar activeKey={activeKey} onNavigate={navigate} />

      <main className="flex-1 min-w-0 px-6 md:px-10 py-8">
        <Topbar searchValue={search} onSearchChange={setSearch} />
        <StatsGrid stats={STATS} />
        <ControlsPanel controls={CONTROLS} onNavigate={navigate} />
        <PerformanceSection
          sections={PERFORMANCE_SECTIONS}
          onNavigate={navigate}
          onViewAll={() => navigate("/placement/stats")}
        />
      </main>
    </div>
  );
};

export default PlacementDashboard;