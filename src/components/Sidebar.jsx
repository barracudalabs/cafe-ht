import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-8">SMART CAFE WEB</h1>
      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className={`hover:text-yellow-400 ${
            location.pathname === "/dashboard" ? "text-yellow-400 font-semibold" : ""
          }`}
        >
           Dashboard
        </Link>

        <Link
          to="/export-data"
          className={`hover:text-yellow-400 ${
            location.pathname === "/export-data" ? "text-yellow-400 font-semibold" : ""
          }`}
        >
           Export Data
        </Link>
      </nav>
    </aside>
  );
}
