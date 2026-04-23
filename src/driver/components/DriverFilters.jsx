const DriverFilters = ({
  searchText,
  onSearchChange,
  selectedWorkType,
  onWorkTypeChange,
  showWorkTypeFilter = false,
  selectedAgriYear,
  onAgriYearChange,
  workOptions = [],
  showAgriYear = false,
}) => {
  const agriYears = ["2025-2026", "2024-2025", "2023-2024"];

  return (
    <div className="w-full mb-4 flex flex-col gap-3">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by farmer name"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        className="
          w-full rounded-lg px-3 py-2
          bg-light-bg dark:bg-dark-bg
          border border-light-border dark:border-dark-border
          text-light-text dark:text-dark-text text-sm
        "
      />

      {/* Filters Row */}
      <div className="flex flex-row gap-3">
        {/* Work Type */}
        {showWorkTypeFilter && (
          <select
            value={selectedWorkType}
            onChange={(e) => onWorkTypeChange(e.target.value)}
            className="
            flex-1 rounded-lg px-3 py-2
            bg-light-bg dark:bg-dark-bg
            border border-light-border dark:border-dark-border
            text-light-text dark:text-dark-text text-sm
          ">
            <option value="all">All Work Types</option>

            {workOptions.map((opt) => (
              <option key={opt.type} value={opt.type}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Agri Year */}
        {showAgriYear && (
          <select
            value={selectedAgriYear}
            onChange={(e) => onAgriYearChange(e.target.value)}
            className="
              flex-1 rounded-lg px-3 py-2
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text text-sm
            ">
            {agriYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default DriverFilters;
