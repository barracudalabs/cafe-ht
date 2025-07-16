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
  const hourlyCounts = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 9;
    const label = `${hour}:00`;
    const count = data.filter((d) => {
      const time = new Date(d.timestamp || d.createdat);
      return time.getHours() === hour;
    }).length;
    return { hour: label, count };
  });

  const genderData = [
    { name: "Male", value: data.filter((d) => d.gender === "Male").length },
    { name: "Female", value: data.filter((d) => d.gender === "Female").length },
  ];

  // 👇 Updated for string-based age groups
  const ageGroups = ["10-19", "20-29", "30-39", "40-49", "50-59"];
  const ageData = ageGroups.map((group) => ({
    name: group,
    count: data.filter((d) => d.age === group).length,
  }));

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {/* Visitors by Hour */}
      <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-xl shadow-md w-full max-w-full">
        <h3 className="text-sm md:text-base font-semibold mb-2">
          Visitors by Hour (9AM–11PM)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={hourlyCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gender Distribution */}
      <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-xl shadow-md w-full max-w-full">
        <h3 className="text-sm md:text-base font-semibold mb-2">
          Gender Distribution
        </h3>
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

      {/* Age Group Distribution (Updated) */}
      <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-xl shadow-md w-full max-w-full">
        <h3 className="text-sm md:text-base font-semibold mb-2">
          Age Group Distribution
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="count" fill="#ffc658" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customers Every 2 Hours */}
      <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-xl shadow-md col-span-1 sm:col-span-2 md:col-span-3 w-full max-w-full">
        <h3 className="text-sm md:text-base font-semibold mb-2">
          Customers Every 2 Hours
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={twoHourData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="#ccc" />
            <YAxis stroke="#ccc" />
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
