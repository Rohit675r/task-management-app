import API from "./api";

export const getTasks = () => API.get("/api/tasks");
export const createTask = (data) => API.post("/api/tasks", data);
export const updateTask = (id, data) => API.put(`/api/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/api/tasks/${id}`);