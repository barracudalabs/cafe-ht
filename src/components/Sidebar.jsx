import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo Hidrokinetik.jpg"; // Sesuaikan path dengan projek anda

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden sm:block w-60 bg-gray-800 dark:bg-gray-900 text-white p-4">
      <div className="mb-8">
        <img
          src={logo}
          alt="Smart Cafe Logo"
          className="h-12 w-auto mx-auto" // Responsive height
        />
      </div>

      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className={`hover:text-yellow-400 transition ${
            location.pathname === "/dashboard"
              ? "text-yellow-400 font-semibold"
              : "text-white dark:text-gray-300"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/export-data"
          className={`hover:text-yellow-400 transition ${
            location.pathname === "/export-data"
              ? "text-yellow-400 font-semibold"
              : "text-white dark:text-gray-300"
          }`}
        >
          Export Data
        </Link>
      </nav>
    </aside>
  );
}
