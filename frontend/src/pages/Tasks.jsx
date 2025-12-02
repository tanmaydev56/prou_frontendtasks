import { useEffect, useState } from "react";
import { API } from "../services/api";
import toast from "react-hot-toast";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({ status: "", employeeId: "", search: "" });
  const [isFiltering, setIsFiltering] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Fetch tasks from API
  const fetchTasks = () => {
    setIsFiltering(true);
    API.get("/tasks", { params: filters })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Task fetch error:", err))
      .finally(() => setIsFiltering(false));
  };

  useEffect(() => {
    fetchTasks();
    API.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  useEffect(() => fetchTasks(), [filters]);

  const statusBadgeStyles = {
    "TODO": "bg-gray-100 text-gray-800 border border-gray-300",
    "IN_PROGRESS": "bg-yellow-100 text-yellow-800 border border-yellow-300",
    "DONE": "bg-green-100 text-green-800 border border-green-300"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600 mt-2">
            View, filter, and manage all team tasks in one place
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters & Search</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Tasks
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by title..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="">All Status</option>
                  <option value="TODO">Todo</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </div>

              {/* Employee Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned To
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  onChange={(e) => setFilters({ ...filters, employeeId: e.target.value })}
                >
                  <option value="">All Employees</option>
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="flex flex-col justify-end">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Showing</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-blue-700">{tasks.length}</span>
                    <span className="text-gray-600">task{tasks.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
          {tasks.length > 0 ? (
            <>
              {/* Table Header */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Task Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tasks.map((t) => (
                      <tr
                        key={t.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        {/* Task Details */}
                        <td className="px-6 py-5">
                          <div>
                            <h3 className="font-medium text-gray-900 text-base mb-1">
                              {t.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {t.description || (
                                <span className="text-gray-400 italic">No description provided</span>
                              )}
                            </p>
                          </div>
                        </td>

                        {/* Assigned Employee */}
                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {t.employee_name?.[0]?.toUpperCase() || "U"}
                              </span>
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {t.employee_name || "Unassigned"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {t.due_date ? `Due: ${new Date(t.due_date).toLocaleDateString()}` : "No deadline"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Status Column */}
                        <td className="px-6 py-5">
                          <div className="flex items-center space-x-4">
                            {/* Status Badge */}
                            <span
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusBadgeStyles[t.status] || "bg-gray-100 text-gray-800"}`}
                            >
                              {t.status.replace("_", " ")}
                            </span>

                            {/* Admin-only status update dropdown */}
                            {user?.role === "admin" && (
                              <div className="relative">
                                <select
                                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none pr-8"
                                  value={t.status}
                                  onChange={async (e) => {
                                    try {
                                      await API.put(`/tasks/${t.id}`, {
                                        status: e.target.value,
                                      });
                                      toast.success("Status updated successfully");
                                      fetchTasks();
                                    } catch (err) {
                                      toast.error("Failed to update status");
                                    }
                                  }}
                                >
                                  <option value="TODO">Todo</option>
                                  <option value="IN_PROGRESS">In Progress</option>
                                  <option value="DONE">Done</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            // Empty State
            <div className="py-16 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isFiltering ? "Searching..." : "No tasks found"}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {isFiltering
                  ? "Applying filters..."
                  : "Try adjusting your search or filter criteria to find what you're looking for."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;