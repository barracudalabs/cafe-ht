import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ExportData from "./pages/ExportData";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/export-data" element={<ExportData />} />
        </Routes>
      </main>
    </div>
  );
}
