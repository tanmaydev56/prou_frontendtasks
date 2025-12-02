import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTasks";
import Navbar from "./components/Navbar";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;