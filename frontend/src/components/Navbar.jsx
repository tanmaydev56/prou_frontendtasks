import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { MdOutlineAddTask } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
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
    `px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
      isActive(path)
        ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/tasks", label: "Tasks", icon: <FaTasks /> },
    ...(user.role === "admin"
      ? [
          { path: "/add-task", label: "Add Task", icon:<MdOutlineAddTask />  },
          { path: "/add-employee", label: "Add Employee", icon: <IoPeople />  },
        ]
      : []),
  ];

  return (
    <nav className=" shadow-lg sticky top-0 z-50 border-b border-gray-200 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TT</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TaskTracker</h1>
              <p className="text-xs text-gray-500 -mt-1">Management System</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 ${linkClasses(item.path)}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* User Role Switch */}
            <div className="ml-4 pl-4 border-l border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${user.role === 'admin' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>
                
                <div className="relative group">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
                    value={user.role}
                    onChange={(e) => switchUser(e.target.value)}
                  >
                    <option value="admin">Admin View</option>
                    <option value="user">User View</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      Switch between roles
                    </div>
                    <div className="w-2 h-2 bg-gray-900 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 ${linkClasses(item.path)} mx-1`}
              onClick={() => setOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {isActive(item.path) && (
                <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
              )}
            </Link>
          ))}
          
          {/* User Info & Role Switch for Mobile */}
          <div className="pt-4 mt-4 border-t border-gray-200">
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user.role === 'admin' ? 'bg-linear-to-br from-green-500 to-green-700' : 'bg-linear-to-br from-blue-500 to-blue-700'}`}>
                  <span className="text-white font-medium text-sm">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 px-3">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Switch Role
              </label>
              <select
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={user.role}
                onChange={(e) => switchUser(e.target.value)}
              >
                <option value="admin">Admin View</option>
                <option value="user">User View</option>
              </select>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Admin requires password verification
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;