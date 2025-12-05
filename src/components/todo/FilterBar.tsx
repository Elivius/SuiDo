import { FilterType } from '@/types/models';
import { FilterBarProps } from '@/types/models';

export function FilterBar({
  currentFilter,
  onFilterChange,
  stats,
  onClearCompleted,
}: FilterBarProps) {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="mb-6 relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 
                      py-4 px-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl">
        <div className="flex flex-wrap gap-2">
          {filters.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative overflow-hidden 
              focus:outline-none focus:ring-0 active:ring-0 active:outline-none
              ${currentFilter === key
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50 hover:border-gray-500/50'
                }`}
            >
              {currentFilter === key && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-20 animate-pulse"></div>
              )}
              <span className="relative">
                {label}{' '}
                {count > 0 && (
                  <span
                    className={`ml-1 ${currentFilter === key ? 'text-cyan-100' : 'text-gray-400'
                      }`}
                  >
                    ({count})
                  </span>
                )}
              </span>
            </button>

          ))}
        </div>

        {stats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            disabled={stats.completed === 0}
            className={`
            px-4 py-2 rounded-lg font-medium border transition-all duration-300
            ${stats.completed === 0
                ? "text-gray-400 border-gray-300 cursor-not-allowed opacity-50"
                : "text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10"}
          `}
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}