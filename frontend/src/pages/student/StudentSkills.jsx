import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  Code2,
  Sparkles,
  Building2,
  Map,
  ChevronRight,
  Flame,
  Settings,
  LogOut,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    path: "/student-dashboard",
  },
  {
    key: "aptitude",
    label: "Assessments",
    icon: ClipboardList,
    path: "/student/aptitude-tests",
  },
  {
    key: "coding",
    label: "Coding Tests",
    icon: Code2,
    path: "/student/coding-tests",
  },
  {
    key: "skills",
    label: "Skills",
    icon: Sparkles,
    path: "/student/skills",
  },
//   {
//     key: "companies",
//     label: "Companies",
//     icon: Building2,
//     path: "/student/companies",
//   },
  {
    key: "roadmap",
    label: "Roadmap",
    icon: Map,
    path: "/student/roadmap",
  },
];

const SKILLS = [
  {
    name: "Java",
    category: "Programming",
    score: 86,
    level: "Strong",
  },
  {
    name: "Python",
    category: "Programming",
    score: 78,
    level: "Good",
  },
  {
    name: "Data Structures",
    category: "Computer Science",
    score: 72,
    level: "Good",
  },
  {
    name: "SQL",
    category: "Database",
    score: 81,
    level: "Strong",
  },
  {
    name: "Problem Solving",
    category: "Core Skill",
    score: 69,
    level: "Improve",
  },
  {
    name: "Communication",
    category: "Soft Skill",
    score: 80,
    level: "Strong",
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    score: 74,
    level: "Good",
  },
  {
    name: "OOP",
    category: "Computer Science",
    score: 88,
    level: "Strong",
  },
];

export default function StudentSkills() {
  const navigate = useNavigate();
  const location = useLocation();

  const active =
    NAV_ITEMS.find((item) =>
      location.pathname.startsWith(item.path)
    )?.key || "skills";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("studentId");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-[#101828]">
      {/* SIDEBAR */}
      <aside className="w-[260px] min-w-[260px] min-h-screen bg-[#0E1A2B] text-white p-5 flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-1 mb-10">
          <div className="w-11 h-11 rounded-lg bg-[#16273D] border border-white/10 flex items-center justify-center font-serif font-semibold">
            PP
          </div>

          <div>
            <div className="text-[15px] font-semibold">
              Placement<span className="text-[#6B8DE3]">Path</span>
            </div>

            <div className="text-[9px] tracking-[1.4px] uppercase text-white/40 mt-1">
              Student Portal
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-sm transition ${
                  isActive
                    ? "bg-[#1D4ED8] text-white shadow-lg"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} />

                <span>{item.label}</span>

                {isActive && (
                  <ChevronRight
                    size={14}
                    className="ml-auto"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 rounded-xl bg-[#16273D] border border-white/10 mb-5">
          <div className="flex items-center gap-2 text-[#8DA7E5] font-semibold text-sm">
            <Flame size={15} />
            7-day streak
          </div>

          <p className="text-[11px] leading-5 text-white/40 mt-2">
            Keep testing daily to improve your Placement Readiness Index.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-1">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white/55 hover:bg-white/5 hover:text-white text-sm"
          >
            <Settings size={16} />
            Settings
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white/55 hover:bg-white/5 hover:text-white text-sm"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0">
        <div className="p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[1.8px] font-semibold text-[#7D95C4] mb-2">
              Student Profile
            </p>

            <h1 className="text-3xl font-semibold text-[#0E1A2B]">
              My Skills
            </h1>

            <p className="text-sm text-[#667085] mt-2">
              Review your current skill performance and identify areas
              that need improvement.
            </p>
          </div>

          {/* SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5">
              <p className="text-xs text-[#667085]">
                Skills evaluated
              </p>

              <p className="text-3xl font-semibold text-[#0E1A2B] mt-2">
                8
              </p>

              <p className="text-xs text-[#1F9D6E] mt-2">
                All categories covered
              </p>
            </div>

            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5">
              <p className="text-xs text-[#667085]">
                Average score
              </p>

              <p className="text-3xl font-semibold text-[#0E1A2B] mt-2">
                79%
              </p>

              <p className="text-xs text-[#1F9D6E] mt-2 flex items-center gap-1">
                <TrendingUp size={13} />
                Improving
              </p>
            </div>

            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5">
              <p className="text-xs text-[#667085]">
                Strong skills
              </p>

              <p className="text-3xl font-semibold text-[#0E1A2B] mt-2">
                4
              </p>

              <p className="text-xs text-[#1F9D6E] mt-2">
                Placement ready
              </p>
            </div>
          </div>

          {/* SKILLS */}
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-[#0E1A2B]">
                  Skill assessment
                </h2>

                <p className="text-xs text-[#667085] mt-1">
                  Your current performance by skill
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="border border-[#E4E7EC] rounded-xl p-5 hover:border-[#B8C8F5] transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[#101828]">
                        {skill.name}
                      </h3>

                      <p className="text-xs text-[#98A2B3] mt-1">
                        {skill.category}
                      </p>
                    </div>

                    <div
                      className={`flex items-center gap-1 text-xs font-semibold ${
                        skill.level === "Strong"
                          ? "text-[#15803D]"
                          : skill.level === "Improve"
                          ? "text-[#DC2626]"
                          : "text-[#1D4ED8]"
                      }`}
                    >
                      {skill.level === "Improve" ? (
                        <AlertCircle size={14} />
                      ) : (
                        <CheckCircle2 size={14} />
                      )}

                      {skill.level}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-5">
                    <div className="flex-1 h-2 bg-[#EEF1F7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1D4ED8] rounded-full"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>

                    <span className="text-sm font-semibold text-[#1D4ED8] w-10 text-right">
                      {skill.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}