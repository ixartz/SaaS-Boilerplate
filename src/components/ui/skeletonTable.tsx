type SkeletonTableProps = {
  /** Column headers to render */
  columns: string[];
  /** Number of skeleton rows */
  rows?: number;
  /** Optional custom className for wrapper */
  className?: string;
};

export default function SkeletonTable({
  columns,
  rows = 6,
  className = "",
}: SkeletonTableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
