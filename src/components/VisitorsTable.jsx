export default function VisitorsTable({ data }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 dark:text-white"> Visitor Log</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
            <tr>
              <th className="p-3">id</th>
              <th className="p-3">age</th>
              <th className="p-3">gender</th>
              <th className="p-3">timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-3 font-mono text-sm">{row.id}</td>
                <td className="p-3">{row.age}</td>
                <td className="p-3">{row.gender}</td>
                <td className="p-3">
                  {new Date(row.timestamp || row.createdat).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
