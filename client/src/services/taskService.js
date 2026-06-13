import axios from "axios";

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const handle401 = (err) => {
  if (err.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
  throw err;
};

export const getTasks = () => axios.get("/api/tasks");

export const createTask = (data) =>
  axios.post("/api/tasks", data, getAuthHeader()).catch(handle401);

export const updateTask = (id, data) =>
  axios.put(`/api/tasks/${id}`, data, getAuthHeader()).catch(handle401);

export const deleteTask = (id) =>
  axios.delete(`/api/tasks/${id}`, getAuthHeader()).catch(handle401);