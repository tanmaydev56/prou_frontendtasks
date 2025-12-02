import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || {
      name: "Admin",
      role: "admin",
    };
  });

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-md text-lg transition-all duration-200 ${
      isActive(path)
        ? "text-white bg-blue-600 shadow-md"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  const switchUser = async (role) => {
  if (role === "admin") {
    const pass = prompt("Enter admin password:");

    if (pass !== "admin123") {
      alert("Incorrect password. Access denied.");
      return;
    }
  }

  const newUser =
    role === "admin"
      ? { name: "Admin", role: "admin" }
      : { name: "Employee", role: "user" };

  localStorage.setItem("currentUser", JSON.stringify(newUser));
  setUser(newUser);
  window.location.reload();
};


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Branding */}
        <h1 className="text-2xl font-bold text-gray-800">TaskTracker</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className={linkClasses("/")}>
            Dashboard
          </Link>

          <Link to="/tasks" className={linkClasses("/tasks")}>
            Tasks
          </Link>

          {user.role === "admin" && (
            <>
              <Link to="/add-task" className={linkClasses("/add-task")}>
                Add Task
              </Link>

              <Link to="/add-employee" className={linkClasses("/add-employee")}>
                Add Employee
              </Link>
            </>
          )}

          {/* Role Switch */}
          <select
            className="bg-gray-200 px-3 py-1 rounded-md"
            value={user.role}
            onChange={(e) => switchUser(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className={linkClasses("/")} onClick={() => setOpen(false)}>
            Dashboard
          </Link>

          <Link to="/tasks" className={linkClasses("/tasks")} onClick={() => setOpen(false)}>
            Tasks
          </Link>

          {user.role === "admin" && (
            <>
              <Link to="/add-task" className={linkClasses("/add-task")} onClick={() => setOpen(false)}>
                Add Task
              </Link>

              <Link
                to="/add-employee"
                className={linkClasses("/add-employee")}
                onClick={() => setOpen(false)}
              >
                Add Employee
              </Link>
            </>
          )}

          <select
            className="bg-gray-200 px-3 py-1 rounded-md mt-3"
            value={user.role}
            onChange={(e) => switchUser(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
