import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://task-management-app-sf68.onrender.com",
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    if (!error.response) {
      alert("Server unavailable. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export default API;