import { useState } from "react";
import { API } from "../services/api";
import toast from "react-hot-toast";

const AddEmployee = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    designation: "",
  });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";

    // Basic email check
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format";

    if (!form.designation.trim()) return "Designation is required";

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
      await API.post("/employees", form);
      toast.success("Employee added successfully");

      setForm({ name: "", email: "", designation: "" });
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("You are not allowed to perform this action.");
      } else {
        toast.error("Failed to add employee.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Employee</h1>
          <p className="text-gray-600 mt-2">
            Register a new team member to the system
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Enter employee's full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="employee@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Designation Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation / Role
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={form.designation}
                onChange={(e) =>
                  setForm({ ...form, designation: e.target.value })
                }
                required
                placeholder="e.g., Frontend Developer, Project Manager"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Submit Button (Admin Only) */}
            {user?.role === "admin" && (
              <div className="pt-4">
                <button
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:from-green-700 hover:to-green-800 hover:shadow-lg active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Adding Employee...
                    </>
                  ) : (
                    "Add Employee"
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Only administrators can add new employees
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;