//import axios from "axios";
//
//const axiosInstance = axios.create({
//  baseURL: "http://localhost:8080",
//});
//
//axiosInstance.interceptors.request.use((config) => {
//  const token = localStorage.getItem("token");
//  if (token) config.headers.Authorization = `Bearer ${token}`;
//  return config;
//});
//
//export const PlacementCodingApi = {
//  publishTest: (payload) =>
//    axiosInstance.post("/api/placement/coding-tests/publish", payload),
//
//  listPendingViolations: (testId) =>
//    axiosInstance.get("/api/placement/coding-tests/violations", {
//      params: testId ? { testId } : {},
//    }),
//
//  decideResume: (assignmentId, approve) =>
//    axiosInstance.post(
//      `/api/placement/coding-tests/assignments/${assignmentId}/resume-decision`,
//      { approve }
//    ),
//
//  listResults: (testId) =>
//    axiosInstance.get(`/api/placement/coding-tests/${testId}/results`),
//
//  publishResults: (testId) =>
//    axiosInstance.post(`/api/placement/coding-tests/${testId}/publish-results`),
//
//  unpublishResults: (testId) =>
//    axiosInstance.post(`/api/placement/coding-tests/${testId}/unpublish-results`),
//};
//
//export const StudentCodingApi = {
//  listAssignments: () => axiosInstance.get("/api/student/coding-tests"),
//
//  start: (testId) => axiosInstance.post(`/api/student/coding-tests/${testId}/start`),
//
//  autosaveCode: (testId, questionId, language, code) =>
//    axiosInstance.put(`/api/student/coding-tests/${testId}/questions/${questionId}/code`, {
//      language,
//      code,
//    }),
//
//  runCode: (testId, questionId, language, code) =>
//    axiosInstance.post(`/api/student/coding-tests/${testId}/questions/${questionId}/run`, {
//      language,
//      code,
//    }),
//
//  submitQuestion: (testId, questionId, language, code) =>
//    axiosInstance.post(`/api/student/coding-tests/${testId}/questions/${questionId}/submit`, {
//      language,
//      code,
//    }),
//
//  reportViolation: (testId, type, screenshotBase64, pendingCode) =>
//    axiosInstance.post(`/api/student/coding-tests/${testId}/violation`, {
//      type,
//      screenshotBase64,
//      pendingCode,
//    }),
//
//  submit: (testId, pendingCode) =>
//    axiosInstance.post(`/api/student/coding-tests/${testId}/submit`, { pendingCode }),
//
//  getResult: (testId) => axiosInstance.get(`/api/student/coding-tests/${testId}/result`),
//};
//
//export default axiosInstance;


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const PlacementCodingApi = {
  publishTest: (payload) =>
    axiosInstance.post("/api/placement/coding-tests/publish", payload),

  listAllTests: () => axiosInstance.get("/api/placement/coding-tests"),

  listQuestions: (testId) =>
    axiosInstance.get(`/api/placement/coding-tests/${testId}/questions`),

  listPendingViolations: (testId) =>
    axiosInstance.get("/api/placement/coding-tests/violations", {
      params: testId ? { testId } : {},
    }),

  decideResume: (assignmentId, approve) =>
    axiosInstance.post(
      `/api/placement/coding-tests/assignments/${assignmentId}/resume-decision`,
      { approve }
    ),

  listResults: (testId) =>
    axiosInstance.get(`/api/placement/coding-tests/${testId}/results`),

  publishResults: (testId) =>
    axiosInstance.post(`/api/placement/coding-tests/${testId}/publish-results`),

  unpublishResults: (testId) =>
    axiosInstance.post(`/api/placement/coding-tests/${testId}/unpublish-results`),
};

export const StudentCodingApi = {
  listAssignments: () => axiosInstance.get("/api/student/coding-tests"),

  start: (testId) => axiosInstance.post(`/api/student/coding-tests/${testId}/start`),

  autosaveCode: (testId, questionId, language, code) =>
    axiosInstance.put(`/api/student/coding-tests/${testId}/questions/${questionId}/code`, {
      language,
      code,
    }),

  runCode: (testId, questionId, language, code) =>
    axiosInstance.post(`/api/student/coding-tests/${testId}/questions/${questionId}/run`, {
      language,
      code,
    }),

  submitQuestion: (testId, questionId, language, code) =>
    axiosInstance.post(`/api/student/coding-tests/${testId}/questions/${questionId}/submit`, {
      language,
      code,
    }),

  reportViolation: (testId, type, screenshotBase64, pendingCode) =>
    axiosInstance.post(`/api/student/coding-tests/${testId}/violation`, {
      type,
      screenshotBase64,
      pendingCode,
    }),

  submit: (testId, pendingCode) =>
    axiosInstance.post(`/api/student/coding-tests/${testId}/submit`, { pendingCode }),

  getResult: (testId) => axiosInstance.get(`/api/student/coding-tests/${testId}/result`),
};

export default axiosInstance;