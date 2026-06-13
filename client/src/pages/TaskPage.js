import React, { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editTask) {
        await updateTask(editTask._id, formData);
        showSuccess("Task updated successfully!");
      } else {
        await createTask(formData);
        showSuccess("Task created successfully!");
      }
      setShowForm(false);
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Error saving task", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        showSuccess("Task deleted!");
        fetchTasks();
      } catch (err) {
        console.error("Error deleting task", err);
      }
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateTask(id, { status: "completed" });
      showSuccess("Task marked as completed!");
      fetchTasks();
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  // Filter
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Tasks <span className="badge bg-secondary">{filteredTasks.length}</span></h2>
        <button
          className="btn btn-primary"
          onClick={() => { setShowForm(!showForm); setEditTask(null); }}
        >
          {showForm ? "✕ Cancel" : "+ Add Task"}
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="alert alert-success alert-dismissible">{successMsg}</div>
      )}

      {/* Task Form */}
      {showForm && (
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditTask(null); }}
          editTask={editTask}
        />
      )}

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search tasks by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter + Sort Row */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        {/* Filter Buttons */}
        <div className="d-flex gap-2 flex-wrap">
          {["all", "pending", "in-progress", "completed"].map((f) => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select
          className="form-select form-select-sm w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading tasks...</p>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="alert alert-info text-center">
          {search ? `No tasks found for "${search}"` : "No tasks found. Add one!"}
        </div>
      ) : (
        <div className="row">
          {sortedTasks.map((task) => (
            <div className="col-md-6 col-lg-4" key={task._id}>
              <TaskItem
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskPage;