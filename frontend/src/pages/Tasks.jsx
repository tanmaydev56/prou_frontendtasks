import { useEffect, useState } from "react";
import { API } from "../services/api";
import toast from "react-hot-toast";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({ status: "", employeeId: "" });

  const fetchTasks = () => {
    API.get("/tasks", { params: filters })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Task fetch error:", err));
  };

  useEffect(() => {
    fetchTasks();
    API.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  useEffect(() => fetchTasks(), [filters]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Tasks</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-6 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200 max-w-3xl">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All</option>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Employee</label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setFilters({ ...filters, employeeId: e.target.value })
            }
          >
            <option value="">All</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-xl shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Description</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Assigned To</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{t.title}</td>
                <td className="px-6 py-3">{t.description}</td>
                <td className="px-6 py-3">{t.employee_name}</td>

                {/* Status Dropdown */}
                <td className="px-6 py-3">
                  <select
                    className={`border rounded-lg px-2 py-1 cursor-pointer focus:ring-2 transition ${
                      t.status === "DONE"
                        ? "bg-green-100 text-green-700 border-green-400 focus:ring-green-300"
                        : t.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-400 focus:ring-yellow-300"
                        : "bg-gray-100 text-gray-700 border-gray-400 focus:ring-blue-300"
                    }`}
                    value={t.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      API.put(`/tasks/${t.id}`, { status: newStatus })
                        .then(() => {
                          toast.success("Task status updated 🔄");
                          fetchTasks(); // refresh without triggering filters state hack
                        })
                        .catch(() => toast.error("Failed to update status ❌"));
                    }}
                  >
                    <option value="TODO" className="bg-white text-gray-700">
                      Todo
                    </option>
                    <option value="IN_PROGRESS" className="bg-white text-yellow-700">
                      In Progress
                    </option>
                    <option value="DONE" className="bg-white text-green-700">
                      Done
                    </option>
                  </select>
                </td>
              </tr>
            ))}

            {/* No Results */}
            {tasks.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 text-lg"
                >
                  No tasks found 🔍
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasks;
