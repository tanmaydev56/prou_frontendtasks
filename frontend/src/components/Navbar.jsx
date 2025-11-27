import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-md text-lg transition-all duration-200 ${
      isActive(path)
        ? "text-white bg-blue-600 shadow-md"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Branding / Logo */}
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
          TaskTracker
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className={linkClasses("/")}>
            Dashboard
          </Link>

          <Link to="/tasks" className={linkClasses("/tasks")}>
            Tasks
          </Link>

          <Link to="/add-task" className={linkClasses("/add-task")}>
            Add Task
          </Link>
          <Link to="/add-employee" className={linkClasses("/add-employee")}>
            Add Employee
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className={linkClasses("/")} onClick={() => setOpen(false)}>
            Dashboard
          </Link>

          <Link to="/tasks" className={linkClasses("/tasks")} onClick={() => setOpen(false)}>
            Tasks
          </Link>

          <Link to="/add-task" className={linkClasses("/add-task")} onClick={() => setOpen(false)}>
            Add Task
          </Link>

          <Link to="/add-employee" className={linkClasses("/add-employee")} onClick={() => setOpen(false)}>
            Add Employee
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
