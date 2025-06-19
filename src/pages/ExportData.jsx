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
      Object.keys(data[0]).join(","), // headers
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold"> DOWNLOAD CENTER</h1>
      <p className="text-gray-600 mb-6">
        Logging, Camera-Based Visitors Analytics for Smart Cafe
      </p>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Data Source
          </label>
          <select className="mt-1 block w-full p-2 border rounded" disabled>
            <option value="visitors">Visitors</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date & Time (UTC+8)
            </label>
            <input
              type="datetime-local"
              className="mt-1 block w-full p-2 border rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date & Time (UTC+8)
            </label>
            <input
              type="datetime-local"
              className="mt-1 block w-full p-2 border rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={fetchData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      {/* Display fetched results */}
      <div className="mt-10">
        {data.length === 0 ? (
          <p className="text-gray-500 text-center">No data to display.</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm text-left mt-4 border">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="p-2 border">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="p-2 border">
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
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
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
