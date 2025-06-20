import { useState } from "react";

export default function ExportData() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!startDate || !endDate) return alert("Please select both dates.");

    setLoading(true);

    try {
      const res = await fetch(
        `https://rnsuovshoakmtyrlvmjd.supabase.co/rest/v1/visitors?timestamp=gte.${startDate}&timestamp=lte.${endDate}`,
        {
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuc3VvdnNob2FrbXR5cmx2bWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTcyMjAsImV4cCI6MjA2NTg5MzIyMH0.SvYKq30vIUEeFntBjUwtgthnB7NfNgRwwBFIlaqdYu0",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuc3VvdnNob2FrbXR5cmx2bWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTcyMjAsImV4cCI6MjA2NTg5MzIyMH0.SvYKq30vIUEeFntBjUwtgthnB7NfNgRwwBFIlaqdYu0",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch from Supabase REST API");

      const fetched = await res.json();
      setData(fetched);
    } catch (err) {
      console.error("Fetch error:", err.message);
      alert("Error fetching data.");
    }

    setLoading(false);
  };

  const downloadCSV = () => {
    if (!data.length) return alert("No data to download.");

    const csv = [
      Object.keys(data[0]).join(","),
      ...data.map((row) =>
        Object.values(row)
          .map((val) => `"${val}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `visitors_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen dark:text-white">
      <h1 className="text-xl sm:text-2xl font-bold">Download Center</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
        Logging, Camera-Based Visitors Analytics for Smart Cafe
      </p>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 max-w-4xl w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Data Source
          </label>
          <select
            className="mt-1 block w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled
          >
            <option value="visitors">Visitors</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date & Time (UTC+8)
            </label>
            <input
              type="datetime-local"
              className="mt-1 block w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date & Time (UTC+8)
            </label>
            <input
              type="datetime-local"
              className="mt-1 block w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={fetchData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm sm:text-base"
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      {/* Results */}
      <div className="mt-10">
        {data.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm sm:text-base">
            No data to display.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left mt-4 border dark:border-gray-700 dark:text-white">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="p-2 border dark:border-gray-600">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b dark:border-gray-700"
                  >
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="p-2 border dark:border-gray-700">
                        {val?.toString()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <button
                onClick={downloadCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm sm:text-base"
              >
                Export as CSV
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
