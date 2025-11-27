import { useEffect, useState } from "react";
import { API } from "../services/api";
import toast from "react-hot-toast";

function AddTask() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    employee_id: "",
  });

  useEffect(() => {
    API.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/tasks", form)
      .then(() => {
        setForm({ title: "", description: "", employee_id: "" });
        toast.success("Task created successfully");
      })
      .catch((err) => toast.error("Task creation error:", err));
  };

  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6">Add Task</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description (optional)"
            />
          </div>

          {/* Employee Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Assign to</label>
            <select
              value={form.employee_id}
              onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
