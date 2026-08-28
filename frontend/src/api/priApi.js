import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const authConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: token
        ? `Bearer ${token}`
        : "",
      "Content-Type": "application/json",
    },
  };
};

export const StudentPriApi = {
  getPRI: () =>
    axios.get(
      `${API_BASE_URL}/api/student/pri`,
      authConfig()
    ),
};