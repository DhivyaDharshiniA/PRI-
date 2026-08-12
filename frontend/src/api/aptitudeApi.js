// Swap this import for your project's existing configured axios instance
// (the one that already attaches your JWT Authorization header).
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080"
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // match your existing auth storage key
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const AdminAptitudeApi = {
  publishTest: (payload) =>
    axiosInstance.post("/api/admin/aptitude-tests/publish", payload || {}),
};

export const StudentAptitudeApi = {
  listAssignments: () => axiosInstance.get("/api/student/aptitude-tests"),

  start: (testId) =>
    axiosInstance.post(`/api/student/aptitude-tests/${testId}/start`),

  saveAnswer: (testId, questionId, selectedOption) =>
    axiosInstance.post(`/api/student/aptitude-tests/${testId}/answer`, {
      questionId,
      selectedOption,
    }),

  reportViolation: (testId, type, pendingAnswers) =>
    axiosInstance.post(`/api/student/aptitude-tests/${testId}/violation`, {
      type,
      pendingAnswers,
    }),

  submit: (testId, answers) =>
    axiosInstance.post(`/api/student/aptitude-tests/${testId}/submit`, {
      answers,
    }),

  getResult: (testId) =>
    axiosInstance.get(`/api/student/aptitude-tests/${testId}/result`),
};

export default axiosInstance;
