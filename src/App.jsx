import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ExportData from "./pages/ExportData";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 dark:text-white">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            Toggle Dark Mode
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/export-data" element={<ExportData />} />
        </Routes>
      </main>
    </div>
  );
}
