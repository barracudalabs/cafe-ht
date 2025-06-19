import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d"];

export default function VisitorsCharts({ data }) {
  // Visitors by Hour
  const hourlyCounts = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 9;
    const label = `${hour}:00`;
    const count = data.filter((d) => {
      const time = new Date(d.timestamp || d.createdat);
      return time.getHours() === hour;
    }).length;
    return { hour: label, count };
  });

  // Gender Pie
  const genderData = [
    { name: "Male", value: data.filter((d) => d.gender === "Male").length },
    { name: "Female", value: data.filter((d) => d.gender === "Female").length },
  ];

  // Age Group
  const ageRanges = [
    { name: "0–10", min: 0, max: 10 },
    { name: "11–20", min: 11, max: 20 },
    { name: "21–30", min: 21, max: 30 },
    { name: "31–40", min: 31, max: 40 },
    { name: "41–50", min: 41, max: 50 },
    { name: "51+", min: 51, max: 120 },
  ];

  const ageData = ageRanges.map((range) => ({
    name: range.name,
    count: data.filter((d) => d.age >= range.min && d.age <= range.max).length,
  }));

  // Customer Every 2 Hours (Line Graph)
  const intervals = [
    { label: "09–11", start: 9, end: 11 },
    { label: "11–13", start: 11, end: 13 },
    { label: "13–15", start: 13, end: 15 },
    { label: "15–17", start: 15, end: 17 },
    { label: "17–19", start: 17, end: 19 },
    { label: "19–21", start: 19, end: 21 },
    { label: "21–23", start: 21, end: 23 },
  ];

  const twoHourData = intervals.map((range) => ({
    label: range.label,
    count: data.filter((d) => {
      const time = new Date(d.timestamp || d.createdat);
      const hour = time.getHours();
      return hour >= range.start && hour < range.end;
    }).length,
  }));

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-10">
      {/* Visitors by Hour */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">⏰ Visitors by Hour (9AM–11PM)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={hourlyCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gender Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">⚧️ Gender Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {genderData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Age Group Bar Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">🧓 Age Group Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ffc658" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Every 2 Hours (Line Chart) */}
      <div className="bg-white p-4 rounded-xl shadow-md md:col-span-3">
        <h3 className="text-lg font-semibold mb-2">📈 Customers Every 2 Hours</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={twoHourData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#00bcd4"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
