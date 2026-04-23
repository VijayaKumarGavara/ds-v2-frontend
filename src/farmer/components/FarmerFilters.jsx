import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";

const FarmerFilters = ({
  selectedFilter,
  onFilterChange,
  selectedAgriYear,
  onAgriYearChange,
  showAgriYear = false,
  type = "crop",
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        if (type === "crop") {
          const res = await fetch(`${API_URL}/api/crop/all-crops`);
          const json = await res.json();
          setOptions(json.data || []);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchOptions();
  }, [type]);

  const agriYears = ["2025-2026", "2024-2025", "2023-2024"];

  return (
    <div className="w-full mb-4 flex flex-col gap-3">

      <div className="flex flex-row gap-3">

        {/* Dynamic Filter */}
        <select
          value={selectedFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="
            flex-1 rounded-lg px-3 py-2
            bg-light-bg dark:bg-dark-bg
            border border-light-border dark:border-dark-border
            text-light-text dark:text-dark-text text-sm
          "
        >
          <option value="all">
            {type === "crop" ? "All Crops" : "All Work Types"}
          </option>

          {type === "crop" &&
            options.map((opt) => (
              <option key={opt.crop_id} value={opt.crop_id}>
                {opt.crop_name.toUpperCase()}
              </option>
            ))}

          {type === "work" &&
            options.map((opt) => (
              <option key={opt.type} value={opt.type}>
                {opt.label}
              </option>
            ))}
        </select>

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
            "
          >
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

export default FarmerFilters;