import { StudentAptitudeApi } from "./aptitudeApi";

/**
 * ============================================================
 * API CONTRACT (for when the real backend lands)
 * ============================================================
 * GET /api/student/dashboard/summary  ->
 * {
 *   student: { name, department, branch, year, semester },
 *   pri: { score: number(0-100), level: "PLACEMENT_READY"|"ON_TRACK"|"NEEDS_WORK" },
 *   quickStats: {
 *     assessmentsCompleted: number,
 *     rank: { position: number, total: number },
 *     certificates: number
 *   },
 *   skills: [ { name: string, score: number(0-100) } ],
 *   companies: [
 *     { name: string, readiness: number(0-100), status: "READY"|"IN_PROGRESS", gapNote: string }
 *   ]
 * }
 *
 * Upcoming assessments are NOT mocked -- they're pulled live from the
 * existing aptitude module (GET /api/student/aptitude-tests) and normalized
 * below, so this dashboard already reflects real assigned tests today.
 * ============================================================
 */

const MOCK_DELAY_MS = 400;

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY_MS));
}

// TODO: replace with `axiosInstance.get("/api/student/dashboard/summary")`
// once the backend for PRI / skills / company-readiness exists.
function fetchMockSummary() {
  return delay({
    student: {
      name: "Catherine",
      department: "Computer Science",
      branch: "CSE",
      year: "3rd Year",
      semester: "Sem 6",
    },
    pri: {
      score: 82.5,
      level: "PLACEMENT_READY",
    },
    quickStats: {
      assessmentsCompleted: 14,
      rank: { position: 12, total: 250 },
      certificates: 6,
    },
    skills: [
      { name: "Aptitude", score: 90 },
      { name: "Coding", score: 74 },
      { name: "Technical", score: 81 },
      { name: "Communication", score: 68 },
      { name: "Resume", score: 75 },
      { name: "Certifications", score: 50 },
    ],
    companies: [
      { name: "Amazon", readiness: 76, status: "IN_PROGRESS", gapNote: "Improve DSA" },
      { name: "Microsoft", readiness: 72, status: "IN_PROGRESS", gapNote: "Improve OS" },
      { name: "Google", readiness: 69, status: "IN_PROGRESS", gapNote: "Improve Algorithms" },
      { name: "Zoho", readiness: 91, status: "READY", gapNote: "Ready" },
      { name: "TCS Prime", readiness: 95, status: "READY", gapNote: "Eligible" },
    ],
  });
}

async function fetchUpcomingAssessments() {
  try {
    const { data } = await StudentAptitudeApi.listAssignments();
    return data
      .filter((a) => a.status === "ASSIGNED")
      .map((a) => ({
        id: a.assignmentId,
        testId: a.testId,
        title: a.title,
        category: "Aptitude",
        questions: a.totalQuestions,
        durationMinutes: a.durationMinutes,
        due: "Available now",
      }));
  } catch (e) {
    // Dashboard should never hard-fail just because one widget's data source is down.
    return [];
  }
}

export const StudentDashboardApi = {
  async getSummary() {
    const [summary, upcoming] = await Promise.all([
      fetchMockSummary(),
      fetchUpcomingAssessments(),
    ]);
    return { ...summary, upcomingAssessments: upcoming };
  },
};
