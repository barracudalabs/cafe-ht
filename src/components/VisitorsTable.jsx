export default function VisitorsTable({ data }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 dark:text-white">
        Visitor Log
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full w-full text-sm sm:text-base text-left border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
            <tr>
              <th className="p-3 whitespace-nowrap">id</th>
              <th className="p-3 whitespace-nowrap">age</th>
              <th className="p-3 whitespace-nowrap">gender</th>
              <th className="p-3 whitespace-nowrap">timestamp</th>
            </tr>
          </thead>
          <tbody>
            {[...data]
              .sort((a, b) => Number(a.id) - Number(b.id))
              .map((row) => (
                <tr
                  key={row.id}
                  className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="p-3 font-mono text-xs sm:text-sm">
                    {row.id}
                  </td>
                  <td className="p-3">{row.age}</td>
                  <td className="p-3">{row.gender}</td>
                  <td className="p-3 text-sm sm:text-base">
                    {row.timestamp || row.createdat}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
