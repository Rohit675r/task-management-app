import API from "./api";

export const registerUser = (data) => API.post("/api/auth/register", data);
export const loginUser = (data) => API.post("/api/auth/login", data);

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = () => localStorage.getItem("token");
export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const isAuthenticated = () => !!localStorage.getItem("token");