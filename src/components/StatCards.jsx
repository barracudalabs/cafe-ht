export default function StatCards({ data }) {
  // Basic stats
  const totalVisitors = data.length;
  const maleCount = data.filter((d) => d.gender === "Male").length;
  const femaleCount = data.filter((d) => d.gender === "Female").length;

  const averageAge = (data.reduce((sum, d) => sum + Number(d.age), 0) / totalVisitors).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">👥 Total Visitors</p>
        <h2 className="text-2xl font-bold">{totalVisitors}</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">👨 Male / 👩 Female</p>
        <h2 className="text-2xl font-bold">{maleCount} / {femaleCount}</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">🧓 Average Age</p>
        <h2 className="text-2xl font-bold">{averageAge}</h2>
      </div>
    </div>
  );
}
