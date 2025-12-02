import { useEffect, useState } from "react";
import { API } from "../services/api";
import toast from "react-hot-toast";

function AddTask() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    employee_id: "",
    due_date: "",
  });

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    API.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  const validateForm = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.employee_id) return "Please select an employee";

    if (form.due_date) {
      const today = new Date().toISOString().split("T")[0];
      if (form.due_date < today) return "Due date cannot be in the past";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }
    
    setLoading(true);
    
    try {
      await API.post("/tasks", form);
      toast.success("Task created successfully");

      setForm({
        title: "",
        description: "",
        employee_id: "",
        due_date: "",
      });
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("You are not allowed to perform this action.");
      } else {
        toast.error("Failed to create task.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
          <p className="text-gray-600 mt-2">
            Assign tasks to team members with clear deadlines and descriptions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Enter task title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={4}
                placeholder="Describe the task details, requirements, and expectations..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Assignment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign to
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={form.employee_id}
                  onChange={(e) =>
                    setForm({ ...form, employee_id: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
                >
                  <option value="" disabled>Select team member</option>
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} • {e.designation}
                    </option>
                  ))}
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={form.due_date}
                  onChange={(e) =>
                    setForm({ ...form, due_date: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Submit Button (Admin Only) */}
            {user?.role === "admin" && (
              <div className="pt-4">
                <button
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating Task...
                    </>
                  ) : (
                    "Create Task"
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Only administrators can create new tasks
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;