import React from "react";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

function TaskItem({ task, onEdit, onDelete, onComplete }) {
  const statusColor = {
    pending: "warning",
    "in-progress": "info",
    completed: "success",
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text text-muted">
              {task.description
                ? task.description.length > 80
                  ? task.description.substring(0, 80) + "..."
                  : task.description
                : "No description"}
            </p>
            {task.dueDate && (
              <small className="text-muted">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </small>
            )}
          </div>
          <span className={`badge bg-${statusColor[task.status]} ms-2`}>
            {task.status}
          </span>
        </div>
        <div className="mt-3 d-flex gap-2">
          {task.status !== "completed" && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => onComplete(task._id)}
            >
              <FaCheckCircle className="me-1" /> Complete
            </button>
          )}
          <button
            className="btn btn-warning btn-sm"
            onClick={() => onEdit(task)}
          >
            <FaEdit className="me-1" /> Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(task._id)}
          >
            <FaTrash className="me-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;