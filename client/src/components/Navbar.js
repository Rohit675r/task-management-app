import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, isAuthenticated, getUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const user = getUser();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logoutUser();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/">Task Manager</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          {authenticated ? (
            <>
              <li className="nav-item">
                <span className="nav-link text-light">
                  👋 {user?.name}
                </span>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tasks">Tasks</Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;