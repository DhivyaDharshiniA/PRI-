import React, { useState } from "react";
import {
  Users,
  Building2,
  Layers,
  FileBarChart,
  UserCog,
  ShieldCheck,
  Scale,
  LineChart,
  Search,
  Bell,
  ChevronRight,
  LayoutGrid,
  Settings,
  LogOut,
  Menu,
  X,
  Download,
  Plus,
  MoreHorizontal,
} from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`;

const COLORS = {
  navy: "#0B2447",
  primary: "#1D4ED8",
  primaryLight: "#EAF1FE",
  border: "#DCE6F5",
  bg: "#EEF3FA",
  muted: "#64748B",
  faint: "#94A3B8",
};

const STATS = [
  { label: "Users", value: 2500, icon: Users },
  { label: "Companies", value: 150, icon: Building2 },
  { label: "Departments", value: 20, icon: Layers },
  { label: "Reports", value: 100, icon: FileBarChart },
];
const MAX_STAT = Math.max(...STATS.map((s) => s.value));

const CONTROLS = [
  { label: "Manage Users", desc: "Add, edit, or remove platform accounts", icon: UserCog, nav: "Users" },
  { label: "Manage Roles", desc: "Configure permissions and access levels", icon: ShieldCheck, nav: "Settings" },
  { label: "PRI Weightage", desc: "Adjust scoring weights across categories", icon: Scale, nav: "Reports" },
  { label: "Analytics", desc: "View platform-wide performance trends", icon: LineChart, nav: "Dashboard" },
];

const ACTIVITY = [
  { who: "Priya Menon", what: "updated PRI weightage for Manufacturing", when: "8 min ago" },
  { who: "System", what: "generated 4 new monthly reports", when: "1 hr ago" },
  { who: "Arjun Rao", what: "added a new company: Kestrel Industries", when: "3 hr ago" },
  { who: "System", what: "synced department records", when: "Yesterday" },
];

const USERS = [
  { name: "Priya Menon", email: "priya.menon@pri.io", role: "Super Admin", status: "Active" },
  { name: "Arjun Rao", email: "arjun.rao@pri.io", role: "Analyst", status: "Active" },
  { name: "Fatima Sheikh", email: "fatima.sheikh@pri.io", role: "Editor", status: "Active" },
  { name: "Daniel Kim", email: "daniel.kim@pri.io", role: "Viewer", status: "Invited" },
  { name: "Neha Kulkarni", email: "neha.kulkarni@pri.io", role: "Analyst", status: "Suspended" },
];

const COMPANIES = [
  { name: "Kestrel Industries", sector: "Manufacturing", departments: 6, priScore: 82 },
  { name: "Verdant Foods", sector: "Agriculture", departments: 4, priScore: 74 },
  { name: "Solace Health", sector: "Healthcare", departments: 9, priScore: 91 },
  { name: "Northgate Logistics", sector: "Transport", departments: 5, priScore: 68 },
];

const DEPARTMENTS = [
  { name: "Manufacturing", head: "Reema Iyer", employees: 420, avgScore: 78 },
  { name: "Human Resources", head: "Vikram Nair", employees: 65, avgScore: 88 },
  { name: "Finance", head: "Sana Qureshi", employees: 90, avgScore: 84 },
  { name: "Operations", head: "Karan Bhatt", employees: 310, avgScore: 72 },
];

const REPORTS = [
  { title: "Q2 Compliance Summary", type: "Quarterly", generated: "Aug 1, 2026" },
  { title: "Manufacturing PRI Breakdown", type: "Department", generated: "Jul 28, 2026" },
  { title: "Platform-wide Risk Index", type: "Monthly", generated: "Jul 15, 2026" },
  { title: "New Company Onboarding Audit", type: "Ad hoc", generated: "Jul 9, 2026" },
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Users", icon: Users },
  { label: "Companies", icon: Building2 },
  { label: "Departments", icon: Layers },
  { label: "Reports", icon: FileBarChart },
  { label: "Settings", icon: Settings },
];

const statusStyle = (status) => {
  if (status === "Active") return { bg: "#E7F6EC", color: "#16A34A" };
  if (status === "Invited") return { bg: COLORS.primaryLight, color: COLORS.primary };
  return { bg: "#FEE9E9", color: "#DC2626" };
};

const PageHeader = ({ title, subtitle, actionLabel }) => (
  <div className="flex items-center justify-between flex-wrap gap-3 p-6 pb-5">
    <div>
      <h2
        className="text-lg"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.navy }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm mt-0.5" style={{ color: COLORS.muted }}>
          {subtitle}
        </p>
      )}
    </div>
    {actionLabel && (
      <button
        className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg text-white"
        style={{ background: COLORS.primary, fontWeight: 600 }}
      >
        <Plus size={15} />
        {actionLabel}
      </button>
    )}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border bg-white ${className}`} style={{ borderColor: COLORS.border }}>
    {children}
  </div>
);

const Th = ({ children }) => (
  <th className="text-left text-xs uppercase tracking-wide px-5 py-3" style={{ color: COLORS.faint, fontWeight: 600 }}>
    {children}
  </th>
);
const Td = ({ children, className = "" }) => (
  <td className={`px-5 py-4 text-sm ${className}`} style={{ color: COLORS.navy }}>
    {children}
  </td>
);

const DashboardPage = ({ goTo }) => (
  <>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {STATS.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full" style={{ background: "linear-gradient(90deg,#1D4ED8,#4C8DFF)" }} />
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: COLORS.muted }}>
              {label}
            </span>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: COLORS.primaryLight }}>
              <Icon size={17} color={COLORS.primary} />
            </div>
          </div>
          <h2 className="mt-3 text-3xl" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.navy }}>
            {value.toLocaleString()}
          </h2>
          <div className="mt-3 h-1.5 rounded-full w-full" style={{ background: COLORS.bg }}>
            <div className="h-1.5 rounded-full" style={{ width: `${(value / MAX_STAT) * 100}%`, background: COLORS.primary }} />
          </div>
          <p className="mt-2 text-xs" style={{ color: COLORS.faint }}>
            {Math.round((value / MAX_STAT) * 100)}% of largest metric
          </p>
        </Card>
      ))}
    </div>

    <Card className="mt-8 p-6">
      <h2 className="text-lg mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.navy }}>
        Admin Controls
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CONTROLS.map(({ label, desc, icon: Icon, nav }) => (
          <button
            key={label}
            onClick={() => goTo(nav)}
            className="group text-left rounded-xl p-4 border transition-all hover:shadow-md"
            style={{ borderColor: COLORS.border, background: "#F9FBFF" }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: COLORS.primaryLight }}>
              <Icon size={18} color={COLORS.primary} />
            </div>
            <div className="flex items-center gap-1 text-sm" style={{ fontWeight: 600, color: COLORS.navy }}>
              {label}
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" color={COLORS.primary} />
            </div>
            <p className="text-xs mt-1" style={{ color: COLORS.muted }}>
              {desc}
            </p>
          </button>
        ))}
      </div>
    </Card>

    <Card className="mt-8 p-6">
      <h2 className="text-lg mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.navy }}>
        Recent Activity
      </h2>
      <ul className="flex flex-col">
        {ACTIVITY.map((item, i) => (
          <li key={i} className="flex items-center justify-between py-3" style={{ borderTop: i === 0 ? "none" : `1px solid ${COLORS.bg}` }}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.who === "System" ? COLORS.faint : COLORS.primary }} />
              <p className="text-sm" style={{ color: COLORS.navy }}>
                <span style={{ fontWeight: 600 }}>{item.who}</span> {item.what}
              </p>
            </div>
            <span className="text-xs shrink-0 ml-4" style={{ color: COLORS.faint }}>
              {item.when}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  </>
);

const UsersPage = () => (
  <Card>
    <PageHeader title="Users" subtitle="2,500 accounts across the platform" actionLabel="Invite user" />
    <div className="overflow-x-auto px-1 pb-6">
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {USERS.map((u, i) => {
            const s = statusStyle(u.status);
            return (
              <tr key={i} style={{ borderTop: `1px solid ${COLORS.bg}` }}>
                <Td className="font-semibold">{u.name}</Td>
                <Td style={{ color: COLORS.muted }}>{u.email}</Td>
                <Td>{u.role}</Td>
                <Td>
                  <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: s.bg, color: s.color, fontWeight: 600 }}>
                    {u.status}
                  </span>
                </Td>
                <Td>
                  <MoreHorizontal size={16} color={COLORS.faint} />
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </Card>
);

const CompaniesPage = () => (
  <Card>
    <PageHeader title="Companies" subtitle="150 companies onboarded" actionLabel="Add company" />
    <div className="grid sm:grid-cols-2 gap-4 px-6 pb-6">
      {COMPANIES.map((c, i) => (
        <div key={i} className="rounded-xl border p-4" style={{ borderColor: COLORS.border, background: "#F9FBFF" }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm" style={{ fontWeight: 600, color: COLORS.navy }}>
              {c.name}
            </h3>
            <span className="text-xs px-2 py-1 rounded-full" style={{ background: COLORS.primaryLight, color: COLORS.primary, fontWeight: 600 }}>
              PRI {c.priScore}
            </span>
          </div>
          <p className="text-xs mt-1" style={{ color: COLORS.muted }}>
            {c.sector} · {c.departments} departments
          </p>
        </div>
      ))}
    </div>
  </Card>
);

const DepartmentsPage = () => (
  <Card>
    <PageHeader title="Departments" subtitle="20 departments tracked across companies" />
    <div className="overflow-x-auto px-1 pb-6">
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
            <Th>Department</Th>
            <Th>Head</Th>
            <Th>Employees</Th>
            <Th>Avg. PRI Score</Th>
          </tr>
        </thead>
        <tbody>
          {DEPARTMENTS.map((d, i) => (
            <tr key={i} style={{ borderTop: `1px solid ${COLORS.bg}` }}>
              <Td className="font-semibold">{d.name}</Td>
              <Td style={{ color: COLORS.muted }}>{d.head}</Td>
              <Td>{d.employees}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 rounded-full" style={{ background: COLORS.bg }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${d.avgScore}%`, background: COLORS.primary }} />
                  </div>
                  <span className="text-xs" style={{ color: COLORS.muted }}>
                    {d.avgScore}
                  </span>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const ReportsPage = () => (
  <Card>
    <PageHeader title="Reports" subtitle="100 reports generated to date" actionLabel="New report" />
    <ul className="px-6 pb-6 flex flex-col">
      {REPORTS.map((r, i) => (
        <li key={i} className="flex items-center justify-between py-4" style={{ borderTop: i === 0 ? "none" : `1px solid ${COLORS.bg}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: COLORS.primaryLight }}>
              <FileBarChart size={16} color={COLORS.primary} />
            </div>
            <div>
              <p className="text-sm" style={{ fontWeight: 600, color: COLORS.navy }}>
                {r.title}
              </p>
              <p className="text-xs" style={{ color: COLORS.muted }}>
                {r.type} · Generated {r.generated}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border" style={{ borderColor: COLORS.border, color: COLORS.primary, fontWeight: 600 }}>
            <Download size={13} />
            Export
          </button>
        </li>
      ))}
    </ul>
  </Card>
);

const SettingsPage = () => (
  <Card className="p-6">
    <h2 className="text-lg mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.navy }}>
      Platform Settings
    </h2>
    <div className="flex flex-col">
      {[
        { label: "Two-factor authentication", desc: "Require 2FA for all admin accounts", on: true },
        { label: "Email notifications", desc: "Send digest emails for weekly reports", on: true },
        { label: "Public API access", desc: "Allow external services to query PRI scores", on: false },
      ].map((row, i) => (
        <div key={i} className="flex items-center justify-between py-4" style={{ borderTop: i === 0 ? "none" : `1px solid ${COLORS.bg}` }}>
          <div>
            <p className="text-sm" style={{ fontWeight: 600, color: COLORS.navy }}>
              {row.label}
            </p>
            <p className="text-xs mt-0.5" style={{ color: COLORS.muted }}>
              {row.desc}
            </p>
          </div>
          <div
            className="w-10 rounded-full flex items-center px-0.5 shrink-0"
            style={{ background: row.on ? COLORS.primary : "#CBD5E1", height: "1.375rem" }}
          >
            <div
              className="w-4 h-4 rounded-full bg-white transition-transform"
              style={{ transform: row.on ? "translateX(1.125rem)" : "translateX(0)" }}
            />
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const PAGES = {
  Dashboard: DashboardPage,
  Users: UsersPage,
  Companies: CompaniesPage,
  Departments: DepartmentsPage,
  Reports: ReportsPage,
  Settings: SettingsPage,
};

const PAGE_SUBTITLES = {
  Dashboard: "Manage the complete PRI platform",
  Users: "Accounts, roles, and access",
  Companies: "Every organization on the platform",
  Departments: "Departments tracked across companies",
  Reports: "Generated reports and exports",
  Settings: "Platform-wide configuration",
};

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const goTo = (label) => {
    setActiveNav(label);
    setMobileOpen(false);
  };

  const ActivePage = PAGES[activeNav];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-2 mb-10">
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm"
          style={{ background: COLORS.primary, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          P
        </div>
        <span className="text-white text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
          PRI Platform
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, icon: Icon }) => {
          const isActive = activeNav === label;
          return (
            <button
              key={label}
              onClick={() => goTo(label)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left"
              style={{
                background: isActive ? "rgba(29,78,216,0.35)" : "transparent",
                color: isActive ? "#fff" : "#93A6C9",
                fontWeight: isActive ? 600 : 500,
              }}
            >
              {isActive && (
                <span className="absolute left-[-20px] top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full" style={{ background: "#4C8DFF" }} />
              )}
              <Icon size={17} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full" style={{ color: "#93A6C9" }}>
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex" style={{ background: COLORS.bg, fontFamily: "'Inter', sans-serif", color: COLORS.navy }}>
      <style>{FONT_IMPORT}</style>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 py-8 px-5" style={{ background: COLORS.navy }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 flex flex-col py-8 px-5" style={{ background: COLORS.navy }}>
            <button onClick={() => setMobileOpen(false)} className="self-end mb-4 text-white" aria-label="Close menu">
              <X size={20} />
            </button>
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between gap-4 px-4 md:px-10 py-5 border-b" style={{ background: "#fff", borderColor: COLORS.border }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center border shrink-0"
              style={{ borderColor: COLORS.border }}
              aria-label="Open menu"
            >
              <Menu size={17} color={COLORS.navy} />
            </button>
            <div>
              <h1 className="text-xl md:text-[26px] leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.navy }}>
                {activeNav}
              </h1>
              <p className="text-sm mt-0.5 hidden sm:block" style={{ color: COLORS.muted }}>
                {PAGE_SUBTITLES[activeNav]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 border" style={{ borderColor: COLORS.border, background: COLORS.bg }}>
              <Search size={16} color={COLORS.muted} />
              <input placeholder="Search..." className="bg-transparent outline-none text-sm w-32 md:w-40" style={{ color: COLORS.navy }} />
            </div>
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center border shrink-0" style={{ borderColor: COLORS.border }}>
              <Bell size={16} color={COLORS.navy} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: COLORS.primary }} />
            </button>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
              style={{ background: COLORS.primary, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              A
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 md:p-10 flex-1">
          <ActivePage goTo={goTo} />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;