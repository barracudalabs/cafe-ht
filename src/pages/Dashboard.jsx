import { useEffect, useState } from "react";
import { format, isSameDay } from "date-fns";
import StatCards from "../components/StatCards";
import VisitorsTable from "../components/VisitorsTable";
import VisitorsCharts from "../components/VisitorsCharts";

export default function Dashboard() {
  const [visitorData, setVisitorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // Fetch data from Supabase REST API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://rnsuovshoakmtyrlvmjd.supabase.co/rest/v1/visitors", {
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuc3VvdnNob2FrbXR5cmx2bWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTcyMjAsImV4cCI6MjA2NTg5MzIyMH0.SvYKq30vIUEeFntBjUwtgthnB7NfNgRwwBFIlaqdYu0",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuc3VvdnNob2FrbXR5cmx2bWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTcyMjAsImV4cCI6MjA2NTg5MzIyMH0.SvYKq30vIUEeFntBjUwtgthnB7NfNgRwwBFIlaqdYu0",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data from Supabase REST API.");
        }

        const data = await res.json();
        console.log("Fetched via REST API:", data);
        setVisitorData(data);
      } catch (error) {
        console.error("Error fetching from Supabase REST:", error.message);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter visitor data by selected date
  useEffect(() => {
    const filtered = visitorData.filter((item) => {
      const rawTime = item.timestamp || item.timestamp || item.createdat || item.created_at;
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
    <div className="p-4">
      {/* Header with date picker */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">📊 Dashboard Overview</h1>
        <input
          type="date"
          className="border p-2 rounded shadow"
          value={format(selectedDate, "yyyy-MM-dd")}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>

      {/* Data components */}
      <StatCards data={filteredData} />
      <VisitorsTable data={filteredData} />
      <VisitorsCharts data={filteredData} />
    </div>
  );
}
