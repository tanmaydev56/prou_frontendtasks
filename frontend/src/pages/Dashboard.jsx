import { useEffect, useState } from "react";
import { API } from "../services/api";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Dashboard error:", err));
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const statusChart = {
    labels: ["Done", "In Progress", "Todo"],
    datasets: [
      {
        data: [
          data.completedTasks,
          data.totalTasks - data.completedTasks - data.overdueTasks,
          data.totalTasks - data.completedTasks
        ],
        backgroundColor: ["#4ade80", "#facc15", "#d1d5db"]
      }
    ]
  };

  const employeeChart = {
    labels: data.tasksPerEmployee.map((e) => e.name),
    datasets: [
      {
        label: "Tasks Assigned",
        data: data.tasksPerEmployee.map((e) => e.taskCount),
        backgroundColor: "#60a5fa"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Project Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Overview of tasks, progress, and team distribution
        </p>
      </header>

      {/* KPI Cards */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Key Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6 transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Tasks</p>
                <p className="text-3xl font-bold mt-2">{data.totalTasks}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-blue-600 text-xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completion Rate</p>
                <p className="text-3xl font-bold mt-2">{data.completionRate}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Overdue Tasks</p>
                <p className="text-3xl font-bold mt-2 text-red-600">
                  {data.overdueTasks}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Visual Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Distribution Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Task Status Distribution
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Breakdown of tasks by current status
              </p>
            </div>
            <div className="h-64 flex items-center justify-center">
              <Pie data={statusChart} options={{ responsive: true }} />
            </div>
            <div className="mt-6 flex justify-center gap-4">
              {["Done", "In Progress", "Todo"].map((label, idx) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: statusChart.datasets[0].backgroundColor[idx]
                    }}
                  />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Employee Distribution Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Tasks Per Employee
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Workload distribution across team members
              </p>
            </div>
            <div className="h-64">
              <Bar
                data={employeeChart}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}