export default function StatCards({ data }) {
  // Basic stats
  const totalVisitors = data.length;
  const maleCount = data.filter((d) => d.gender === "Male").length;
  const femaleCount = data.filter((d) => d.gender === "Female").length;

  const averageAge = (
    data.reduce((sum, d) => sum + Number(d.age), 0) / totalVisitors || 0
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4">
      {/* Total Visitors */}
      <div className="bg-white dark:bg-gray-800 dark:text-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-full">
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-300">
          Total Visitors
        </p>
        <h2 className="text-xl md:text-2xl font-bold">{totalVisitors}</h2>
      </div>

      {/* Male / Female */}
      <div className="bg-white dark:bg-gray-800 dark:text-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-full">
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-300">
          Male / Female
        </p>
        <h2 className="text-xl md:text-2xl font-bold">
          {maleCount} / {femaleCount}
        </h2>
      </div>

      {/* Average Age */}
      <div className="bg-white dark:bg-gray-800 dark:text-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-full">
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-300">
          Average Age
        </p>
        <h2 className="text-xl md:text-2xl font-bold">{averageAge}</h2>
      </div>
    </div>
  );
}
