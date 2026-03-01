import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";

const FarmerFilters = ({
  selectedCrop,
  onCropChange,
  selectedAgriYear,
  onAgriYearChange,
  showAgriYear = false,
}) => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    async function getCropDetails() {
      try {
        const response = await fetch(`${API_URL}/api/crop/all-crops`, {
          method: "GET",
        });

        const json = await response.json();
        if (!response.ok)
          throw new Error(
            json.message || "Something went wrong while fetching crops.",
          );
        setCrops(json.data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
    getCropDetails();
  }, []);
  const agriYears = ["2025-2026", "2024-2025", "2023-2024"];

  return (
    <div className="w-full mb-4 flex flex-col gap-3">
      {/* Crop + Agri-Year Row */}
      <div className="flex flex-row gap-3">
        {/* Crop Dropdown */}
        <select
          value={selectedCrop}
          onChange={(e) => onCropChange(e.target.value)}
          className="
            flex-1 rounded-lg px-3 py-2
            bg-light-bg dark:bg-dark-bg
            border border-light-border dark:border-dark-border
            text-light-text dark:text-dark-text
            text-sm
          ">
          <option value="all">All Crops</option>
          {crops.map((crop) => {
            return (
              <option key={crop.crop_id} value={crop.crop_id}>
                {crop.crop_name.toUpperCase()}
              </option>
            );
          })}
        </select>

        {/* Agri-Year Dropdown (Optional) */}
        {showAgriYear && (
          <select
            value={selectedAgriYear}
            onChange={(e) => onAgriYearChange(e.target.value)}
            className="
              flex-1 rounded-lg px-3 py-2
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text
              text-sm
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

export default FarmerFilters;
