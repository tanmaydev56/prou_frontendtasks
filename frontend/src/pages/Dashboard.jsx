import { useEffect, useState } from "react";
import { API } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard error:", err));
  }, []);

  if (!stats) return <h2 className="text-center text-xl font-semibold mt-10">Loading...</h2>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">
          Total Tasks: <span className="text-blue-600">{stats.totalTasks}</span>
        </h2>

        <h3 className="text-xl font-medium mb-3">Status Breakdown:</h3>

        <ul className="space-y-2">
          {stats.byStatus.map((s) => (
            <li
              key={s.status}
              className="flex justify-between bg-gray-100 px-4 py-2 rounded-lg text-lg"
            >
              <span className="font-semibold capitalize">{s.status}</span>
              <span className="text-blue-700 font-bold">{s.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
