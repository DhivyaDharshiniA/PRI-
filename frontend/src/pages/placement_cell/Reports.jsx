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
  Plus,
  Download,
  Settings,
  LogOut,
} from "lucide-react";

// =============================================================================
// Static data — swap for real API data.
// =============================================================================

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid, path: "/placement/dashboard" },
  { key: "aptitude", label: "Aptitude tests", icon: ClipboardList, path: "/placement/aptitude-tests" },
  { key: "coding", label: "Coding tests", icon: Code2, path: "/placement/coding-tests/publish" },
  { key: "violations", label: "Violations & results", icon: ShieldAlert, path: "/placement/coding-tests/manage" },
  { key: "stats", label: "Department stats", icon: BarChart3, path: "/placement/stats" },
  { key: "reports", label: "Reports", icon: FileText, path: "/placement/reports" },
];

const REPORTS = [
  { id: "RPT-2026-08", title: "Placement Readiness — August 2026", scope: "All departments", generatedOn: "Aug 10, 2026", size: "1.2 MB", type: "PDF" },
  { id: "RPT-2026-07", title: "Coding Assessment Summary — Batch 2026", scope: "CSE, ECE", generatedOn: "Jul 28, 2026", size: "860 KB", type: "XLSX" },
  { id: "RPT-2026-06", title: "Aptitude Performance — Batch 2027", scope: "All departments", generatedOn: "Jul 12, 2026", size: "640 KB", type: "PDF" },
  { id: "RPT-2026-05", title: "Violations Log — Q2 2026", scope: "Coding tests", generatedOn: "Jun 30, 2026", size: "410 KB", type: "PDF" },
  { id: "RPT-2026-04", title: "Department-wise Readiness Breakdown", scope: "MECH, CIVIL", generatedOn: "Jun 15, 2026", size: "980 KB", type: "XLSX" },
];

const TYPE_STYLES = {
  PDF: "bg-[#FEEBEE] text-[#C0392B]",
  XLSX: "bg-[#E7F8EF] text-[#15803D]",
};

// =============================================================================
// Shared shell (sidebar + topbar) — kept local to this file so it's a
// standalone, drop-in page.
// =============================================================================

function GlobalFontStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
      .font-display { font-family: 'Space Grotesk', sans-serif; }
    `}</style>
  );
}

function Sidebar({ activeKey, onNavigate }) {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-[#0B1D42] text-white px-5 py-6" aria-label="Primary navigation">
      <div className="flex items-center gap-2.5 px-1 mb-9">
        <div className="w-8 h-8 rounded-lg bg-[#3D6EFF] flex items-center justify-center font-display font-bold text-white text-sm">P</div>
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
                isActive ? "bg-white/10 text-white" : "text-white/55 hover:text-white/90 hover:bg-white/5"
              }`}
            >
              <Icon size={17} strokeWidth={2} className={isActive ? "text-[#7DA2FF]" : "text-white/40 group-hover:text-white/70"} />
              <span className="font-medium">{label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto text-white/40" />}
            </button>
          );
        })}
      </nav>

      <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-1">
        <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/85 hover:bg-white/5 transition-colors">
          <Settings size={16} />
          <span>Settings</span>
        </button>
        <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/85 hover:bg-white/5 transition-colors">
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

function Topbar({ title, subtitle, searchValue, onSearchChange, onCreate }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
      <div>
        <h1 className="font-display text-[26px] font-semibold tracking-tight text-[#0B1D42]">{title}</h1>
        <p className="text-sm text-[#6B7280] mt-1">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <label className="hidden sm:flex items-center gap-2 bg-white border border-[#DCE3F5] rounded-lg px-3 py-2 w-56">
          <Search size={15} className="text-[#9CA3AF]" aria-hidden="true" />
          <span className="sr-only">Search reports</span>
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search reports..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-[#9CA3AF]"
          />
        </label>

        <button type="button" aria-label="Notifications" className="relative w-9 h-9 rounded-lg bg-white border border-[#DCE3F5] flex items-center justify-center">
          <Bell size={16} className="text-[#4B5563]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#3D6EFF]" />
        </button>

        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="flex items-center gap-2 bg-[#3D6EFF] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#2F58E0] transition-colors"
          >
            <Plus size={16} />
            Generate report
          </button>
        )}
      </div>
    </div>
  );
}

function TypeBadge({ type }) {
  const className = TYPE_STYLES[type] ?? "bg-[#F1F2F4] text-[#4B5563]";
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>{type}</span>;
}

// =============================================================================
// Page
// =============================================================================

const ReportsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const activeKey = useMemo(
    () => NAV_ITEMS.find((item) => location.pathname.startsWith(item.path))?.key ?? "reports",
    [location.pathname]
  );

  const filteredReports = useMemo(() => {
    if (!search.trim()) return REPORTS;
    const q = search.toLowerCase();
    return REPORTS.filter((r) => r.title.toLowerCase().includes(q) || r.scope.toLowerCase().includes(q));
  }, [search]);

  const handleDownload = (report) => {
    // Wire this up to your real download/export endpoint.
    console.log("Downloading report:", report.id);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen flex bg-[#F4F6FB] text-[#111827]">
      <GlobalFontStyles />
      <Sidebar activeKey={activeKey} onNavigate={navigate} />

      <main className="flex-1 min-w-0 px-6 md:px-10 py-8">
        <Topbar
          title="Reports"
          subtitle="Generate and download placement-ready reports."
          searchValue={search}
          onSearchChange={setSearch}
          onCreate={() => console.log("Open generate-report flow")}
        />

        <div className="bg-white rounded-2xl border border-[#DCE3F5] overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#DCE3F5] text-xs font-medium text-[#6B7280]">
            <span className="col-span-5">Report</span>
            <span className="col-span-2">Generated on</span>
            <span className="col-span-2">Size</span>
            <span className="col-span-1">Type</span>
            <span className="col-span-2 text-right">Action</span>
          </div>

          {filteredReports.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-[#6B7280]">No reports match your search.</p>
          ) : (
            filteredReports.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b last:border-b-0 border-[#F0F2F8] hover:bg-[#F5F8FF] transition-colors"
              >
                <span className="col-span-5 min-w-0">
                  <p className="text-sm font-semibold text-[#0B1D42] truncate">{r.title}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{r.scope}</p>
                </span>
                <span className="col-span-2 text-sm text-[#374151]">{r.generatedOn}</span>
                <span className="col-span-2 text-sm text-[#374151]">{r.size}</span>
                <span className="col-span-1">
                  <TypeBadge type={r.type} />
                </span>
                <span className="col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDownload(r)}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#3D6EFF] hover:underline"
                  >
                    <Download size={13} />
                    Download
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;