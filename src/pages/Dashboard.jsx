import { useEffect, useState } from "react";
import { format, isSameDay } from "date-fns";
import StatCards from "../components/StatCards";
import VisitorsTable from "../components/VisitorsTable";
import VisitorsCharts from "../components/VisitorsCharts";
import Clock from "../components/Clock";

export default function Dashboard() {
  const [visitorData, setVisitorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://rnsuovshoakmtyrlvmjd.supabase.co/rest/v1/visitors", {
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuc3VvdnNob2FrbXR5cmx2bWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTcyMjAsImV4cCI6MjA2NTg5MzIyMH0.SvYKq30vIUEeFntBjUwtgthnB7NfNgRwwBFIlaqdYu0",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuc3VvdnNob2FrbXR5cmx2bWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTcyMjAsImV4cCI6MjA2NTg5MzIyMH0.SvYKq30vIUEeFntBjUwtgthnB7NfNgRwwBFIlaqdYu0",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch data from Supabase REST API.");

        const data = await res.json();
        setVisitorData(data);
      } catch (error) {
        console.error("Error fetching from Supabase REST:", error.message);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = visitorData.filter((item) => {
      const rawTime = item.timestamp || item.createdat || item.created_at;
      if (!rawTime) return false;

      try {
        const parsed = new Date(rawTime);
        return isSameDay(parsed, selectedDate);
      } catch {
        console.warn("Invalid date format:", rawTime);
        return false;
      }
    });

    setFilteredData(filtered);
  }, [visitorData, selectedDate]);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900 min-h-screen dark:text-white">
      {/* Header with Clock and Date Picker */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Clock />
          <input
            type="date"
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white p-2 rounded shadow text-sm sm:text-base"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        </div>
      </div>

      {/* Responsive Data Sections */}
      <section className="mb-8">
        <StatCards data={filteredData} />
      </section>

      <section className="mb-8">
        <VisitorsTable data={filteredData} />
      </section>

      <section>
        <VisitorsCharts data={filteredData} />
      </section>
    </div>
  );
}
