import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Download,
  RefreshCw,
  Users,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Eye,
  X,
  FileText,
  Target,
} from "lucide-react";

import PlacementSidebar from "./PlacementSidebar";

const API_BASE_URL = "http://localhost:8080";

export default function Reports() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("jwtToken") ||
      localStorage.getItem("accessToken") ||
      ""
    );
  };

  // ============================================================
  // LOAD LIVE PRI REPORT
  // ============================================================

  const loadReport = async () => {
    try {
      setError("");

      const token = getToken();

      const response = await fetch(
        `${API_BASE_URL}/api/placement/students/pri`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

            ...(token
              ? {
                  Authorization:
                    `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to load placement report. Status: ${response.status}`
        );
      }

      const data =
        await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid report response from server."
        );
      }

      const formatted =
        data.map((student) => {
          const pri = Number(
            student.priScore ??
              student.overallScore ??
              student.pri ??
              student.score ??
              0
          );

          return {
            studentId:
              student.studentId ??
              student.id ??
              "",

            studentName:
              student.studentName ??
              student.fullName ??
              student.name ??
              "Student",

            registerNumber:
              student.registerNumber ??
              student.regNo ??
              student.registrationNumber ??
              "-",

            email:
              student.email ??
              "-",

            priScore: pri,

            level:
              student.level ??
              getPriLevel(pri),

            placementReady:
              student.placementReady === true ||
              pri >= 70,

            totalTests: Number(
              student.totalTests ?? 0
            ),

            aptitudeTests: Number(
              student.aptitudeTests ?? 0
            ),

            codingTests: Number(
              student.codingTests ?? 0
            ),
          };
        });

      setStudents(formatted);
    } catch (err) {
      console.error(
        "Placement Reports Error:",
        err
      );

      setError(
        err.message ||
          "Unable to load placement report."
      );

      setStudents([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  // ============================================================
  // REFRESH
  // ============================================================

  const handleRefresh = () => {
    setRefreshing(true);
    loadReport();
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredStudents =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return students;
      }

      return students.filter(
        (student) =>
          String(
            student.studentName
          )
            .toLowerCase()
            .includes(query) ||
          String(
            student.registerNumber
          )
            .toLowerCase()
            .includes(query) ||
          String(
            student.email
          )
            .toLowerCase()
            .includes(query) ||
          String(
            student.studentId
          )
            .toLowerCase()
            .includes(query)
      );
    }, [students, search]);

  // ============================================================
  // STATISTICS
  // ============================================================

  const statistics =
    useMemo(() => {
      const total =
        students.length;

      const ready =
        students.filter(
          (student) =>
            student.placementReady
        ).length;

      const improvement =
        total - ready;

      const average =
        total === 0
          ? 0
          : students.reduce(
              (sum, student) =>
                sum +
                Number(
                  student.priScore || 0
                ),
              0
            ) / total;

      const strong =
        students.filter(
          (student) =>
            Number(
              student.priScore
            ) >= 80
        ).length;

      return {
        total,
        ready,
        improvement,
        average,
        strong,
      };
    }, [students]);

  // ============================================================
  // DOWNLOAD COMPLETE REPORT
  // ============================================================

  const downloadReport = () => {
    if (!students.length) {
      alert(
        "No student PRI data available."
      );
      return;
    }

    const headers = [
      "Student ID",
      "Student Name",
      "Register Number",
      "Email",
      "PRI Score",
      "PRI Level",
      "Placement Ready",
      "Total Tests",
      "Aptitude Tests",
      "Coding Tests",
    ];

    const rows =
      students.map(
        (student) => [
          student.studentId,
          student.studentName,
          student.registerNumber,
          student.email,
          Number(
            student.priScore || 0
          ).toFixed(1),
          student.level,
          student.placementReady
            ? "Yes"
            : "No",
          student.totalTests,
          student.aptitudeTests,
          student.codingTests,
        ]
      );

    const csv =
      createCSV(
        headers,
        rows
      );

    downloadFile(
      csv,
      `Placement_PRI_Report_${getDateString()}.csv`
    );
  };

  // ============================================================
  // DOWNLOAD SINGLE STUDENT
  // ============================================================

  const downloadStudentReport =
    (student) => {
      const headers = [
        "Student ID",
        "Student Name",
        "Register Number",
        "Email",
        "PRI Score",
        "PRI Level",
        "Placement Ready",
        "Total Tests",
        "Aptitude Tests",
        "Coding Tests",
      ];

      const rows = [
        [
          student.studentId,
          student.studentName,
          student.registerNumber,
          student.email,
          Number(
            student.priScore || 0
          ).toFixed(1),
          student.level,
          student.placementReady
            ? "Yes"
            : "No",
          student.totalTests,
          student.aptitudeTests,
          student.codingTests,
        ],
      ];

      const csv =
        createCSV(
          headers,
          rows
        );

      const safeName =
        String(
          student.studentName
        )
          .replace(
            /[^a-z0-9]/gi,
            "_"
          )
          .toLowerCase();

      downloadFile(
        csv,
        `${safeName}_PRI_Report.csv`
      );
    };

  return (
    <div className="min-h-screen bg-[#F4F6FB]">

      <PlacementSidebar />

      <main className="min-h-screen md:ml-64">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <header className="border-b border-slate-200 bg-white">
          <div className="px-6 py-6 lg:px-8">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <FileText size={16} />
                  Placement Reports
                </div>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0B1D42]">
                  Student Readiness Report
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View and export the live Placement
                  Readiness Index of students.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={
                    handleRefresh
                  }
                  disabled={
                    refreshing
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                  <RefreshCw
                    size={17}
                    className={
                      refreshing
                        ? "animate-spin"
                        : ""
                    }
                  />

                  {refreshing
                    ? "Refreshing..."
                    : "Refresh"}
                </button>

                <button
                  onClick={
                    downloadReport
                  }
                  disabled={
                    students.length ===
                    0
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-[#3D6EFF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2F58E0] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download
                    size={17}
                  />
                  Export Report
                </button>

              </div>

            </div>

          </div>
        </header>

        <div className="p-6 lg:p-8">

          {/* ====================================================
              ERROR
          ==================================================== */}

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

              <AlertCircle
                size={20}
                className="mt-0.5"
              />

              <div>
                <p className="font-semibold">
                  Unable to load report
                </p>

                <p className="mt-1 text-sm">
                  {error}
                </p>
              </div>

            </div>
          )}

          {/* ====================================================
              SUMMARY
          ==================================================== */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">

            <SummaryCard
              icon={
                <Users size={20} />
              }
              title="Students"
              value={
                statistics.total
              }
              description="Evaluated"
            />

            <SummaryCard
              icon={
                <CheckCircle2
                  size={20}
                />
              }
              title="Placement Ready"
              value={
                statistics.ready
              }
              description="PRI ≥ 70"
            />

            <SummaryCard
              icon={
                <AlertCircle
                  size={20}
                />
              }
              title="Needs Improvement"
              value={
                statistics.improvement
              }
              description="PRI below 70"
            />

            <SummaryCard
              icon={
                <TrendingUp
                  size={20}
                />
              }
              title="Average PRI"
              value={statistics.average.toFixed(
                1
              )}
              description="Current average"
            />

            <SummaryCard
              icon={
                <Target size={20} />
              }
              title="Strong"
              value={
                statistics.strong
              }
              description="PRI ≥ 80"
            />

          </div>

          {/* ====================================================
              REPORT INFORMATION
          ==================================================== */}

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">

            <div className="flex items-start gap-3">

              <Target
                size={19}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <div>

                <p className="font-semibold text-blue-900">
                  Live PRI Report
                </p>

                <p className="mt-1 text-sm leading-6 text-blue-700">
                  Every PRI shown in this report
                  comes directly from the same
                  StudentPriService used by the
                  student's Skills page. The
                  Placement Cell does not maintain
                  a separate PRI score.
                </p>

              </div>

            </div>

          </div>

          {/* ====================================================
              SEARCH
          ==================================================== */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="relative w-full lg:max-w-lg">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search student, register number, email or ID..."
                  className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <p className="text-sm text-slate-500">
                Showing{" "}
                <strong className="text-slate-800">
                  {
                    filteredStudents.length
                  }
                </strong>{" "}
                of{" "}
                <strong className="text-slate-800">
                  {students.length}
                </strong>{" "}
                students
              </p>

            </div>

          </div>

          {/* ====================================================
              REPORT TABLE
          ==================================================== */}

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-6 py-4">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Placement Readiness
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Live student-wise PRI report
                  </p>
                </div>

                <FileText
                  size={20}
                  className="text-slate-400"
                />

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1050px]">

                <thead className="bg-slate-50">

                  <tr className="border-b border-slate-200">

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Student
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Register No.
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      PRI
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Level
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Readiness
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tests
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {loading ? (
                    <LoadingRows />
                  ) : filteredStudents.length ===
                    0 ? (
                    <tr>

                      <td
                        colSpan="8"
                        className="px-6 py-16 text-center"
                      >

                        <FileText
                          size={42}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-4 font-semibold text-slate-700">
                          No students found
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          There is no PRI data
                          matching your search.
                        </p>

                      </td>

                    </tr>
                  ) : (
                    filteredStudents.map(
                      (student) => (
                        <StudentRow
                          key={
                            student.studentId ||
                            student.registerNumber
                          }
                          student={
                            student
                          }
                          onView={() =>
                            setSelectedStudent(
                              student
                            )
                          }
                          onDownload={() =>
                            downloadStudentReport(
                              student
                            )
                          }
                        />
                      )
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

      {/* ========================================================
          DETAILS MODAL
      ======================================================== */}

      {selectedStudent && (
        <StudentDetailsModal
          student={
            selectedStudent
          }
          onClose={() =>
            setSelectedStudent(null)
          }
          onDownload={() =>
            downloadStudentReport(
              selectedStudent
            )
          }
        />
      )}

    </div>
  );
}

/* ==============================================================
   SUMMARY CARD
============================================================== */

function SummaryCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

/* ==============================================================
   STUDENT ROW
============================================================== */

function StudentRow({
  student,
  onView,
  onDownload,
}) {
  const score =
    Number(
      student.priScore || 0
    );

  return (
    <tr className="transition hover:bg-slate-50">

      <td className="px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {getInitials(
              student.studentName
            )}
          </div>

          <div className="min-w-0">

            <p className="truncate font-semibold text-slate-800">
              {student.studentName}
            </p>

            <p className="text-xs text-slate-400">
              ID:{" "}
              {student.studentId ||
                "-"}
            </p>

          </div>

        </div>

      </td>

      <td className="px-5 py-4 text-sm font-medium text-slate-700">
        {student.registerNumber}
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {student.email}
      </td>

      <td className="px-5 py-4 text-center">

        <div className="inline-flex flex-col items-center">

          <span
            className={`text-lg font-bold ${getPriTextColor(
              score
            )}`}
          >
            {score.toFixed(1)}
          </span>

          <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">

            <div
              className={`h-full rounded-full ${getPriBarColor(
                score
              )}`}
              style={{
                width: `${Math.min(
                  Math.max(
                    score,
                    0
                  ),
                  100
                )}%`,
              }}
            />

          </div>

        </div>

      </td>

      <td className="px-5 py-4 text-center">

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getLevelBadge(
            student.level
          )}`}
        >
          {student.level}
        </span>

      </td>

      <td className="px-5 py-4 text-center">

        {student.placementReady ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">

            <CheckCircle2
              size={14}
            />

            Ready

          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">

            <AlertCircle
              size={14}
            />

            Improve

          </span>
        )}

      </td>

      <td className="px-5 py-4 text-center text-sm font-semibold text-slate-700">
        {student.totalTests}
      </td>

      <td className="px-5 py-4">

        <div className="flex justify-end gap-2">

          <button
            onClick={onView}
            title="View report"
            className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100"
          >
            <Eye size={16} />
          </button>

          <button
            onClick={onDownload}
            title="Download report"
            className="rounded-lg bg-[#3D6EFF] p-2 text-white hover:bg-[#2F58E0]"
          >
            <Download
              size={16}
            />
          </button>

        </div>

      </td>

    </tr>
  );
}

/* ==============================================================
   DETAILS MODAL
============================================================== */

function StudentDetailsModal({
  student,
  onClose,
  onDownload,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">

      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Student Report
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {student.studentName}
            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        <div className="p-6">

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            <InfoBox
              label="Student ID"
              value={
                student.studentId
              }
            />

            <InfoBox
              label="Register No."
              value={
                student.registerNumber
              }
            />

            <InfoBox
              label="Email"
              value={
                student.email
              }
            />

          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 p-6 text-center">

            <p className="text-sm font-medium text-slate-500">
              Placement Readiness Index
            </p>

            <p
              className={`mt-2 text-5xl font-bold ${getPriTextColor(
                student.priScore
              )}`}
            >
              {Number(
                student.priScore || 0
              ).toFixed(1)}
            </p>

            <span
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getLevelBadge(
                student.level
              )}`}
            >
              {student.level}
            </span>

          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">

            <InfoBox
              label="Total Tests"
              value={
                student.totalTests
              }
            />

            <InfoBox
              label="Aptitude"
              value={
                student.aptitudeTests
              }
            />

            <InfoBox
              label="Coding"
              value={
                student.codingTests
              }
            />

          </div>

          <div className="mt-5 rounded-lg border border-slate-200 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Placement Status
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {student.placementReady
                ? "Ready for placement"
                : "Needs improvement"}
            </p>

          </div>

          <div className="mt-6 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>

            <button
              onClick={onDownload}
              className="inline-flex items-center gap-2 rounded-lg bg-[#3D6EFF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2F58E0]"
            >
              <Download
                size={17}
              />
              Download
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

/* ==============================================================
   INFO BOX
============================================================== */

function InfoBox({
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">

      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
        {value || "-"}
      </p>

    </div>
  );
}

/* ==============================================================
   LOADING
============================================================== */

function LoadingRows() {
  return (
    <>
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <tr key={index}>
          <td
            colSpan="8"
            className="px-5 py-4"
          >
            <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
          </td>
        </tr>
      ))}
    </>
  );
}

/* ==============================================================
   CSV
============================================================== */

function createCSV(
  headers,
  rows
) {
  const escapeCSV =
    (value) => {
      const text =
        value === null ||
        value === undefined
          ? ""
          : String(value);

      return `"${text.replace(
        /"/g,
        '""'
      )}"`;
    };

  return (
    "\uFEFF" +
    [
      headers
        .map(escapeCSV)
        .join(","),
      ...rows.map(
        (row) =>
          row
            .map(
              escapeCSV
            )
            .join(",")
      ),
    ].join("\n")
  );
}

function downloadFile(
  content,
  fileName
) {
  const blob =
    new Blob(
      [content],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;
  link.download =
    fileName;

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );

  URL.revokeObjectURL(url);
}

function getDateString() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

/* ==============================================================
   HELPERS
============================================================== */

function getInitials(name) {
  if (!name) return "S";

  const parts =
    String(name)
      .trim()
      .split(/\s+/);

  if (parts.length === 1) {
    return parts[0]
      .substring(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[
      parts.length - 1
    ][0]
  ).toUpperCase();
}

function getPriLevel(score) {
  const value =
    Number(score || 0);

  if (value >= 80)
    return "Strong";

  if (value >= 70)
    return "Good";

  if (value >= 50)
    return "Developing";

  return "Needs Improvement";
}

function getPriTextColor(score) {
  const value =
    Number(score || 0);

  if (value >= 80)
    return "text-emerald-600";

  if (value >= 70)
    return "text-blue-600";

  if (value >= 50)
    return "text-amber-600";

  return "text-red-600";
}

function getPriBarColor(score) {
  const value =
    Number(score || 0);

  if (value >= 80)
    return "bg-emerald-500";

  if (value >= 70)
    return "bg-blue-500";

  if (value >= 50)
    return "bg-amber-500";

  return "bg-red-500";
}

function getLevelBadge(level) {
  const value =
    String(
      level || ""
    ).toLowerCase();

  if (
    value.includes("strong")
  ) {
    return "bg-emerald-50 text-emerald-700";
  }

  if (
    value.includes("good")
  ) {
    return "bg-blue-50 text-blue-700";
  }

  if (
    value.includes("develop")
  ) {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-red-50 text-red-700";
}