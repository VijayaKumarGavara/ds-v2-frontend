import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";

const BuyerFilters = ({
  searchText,
  setSearchText,
  selectedCrop,
  onCropChange,
  showCropFilter = false,
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
    <>
      <div className="relative my-2">
        <input
          type="text"
          name="searchText"
          placeholder="Search Farmer Name"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="
              w-full rounded-md px-2 py-2 pr-16
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text
              placeholder:text-light-text2 dark:placeholder:text-dark-text2
              font-body
            "
        />
        <button
          type="button"
          hidden={!searchText}
          title="clear"
          onClick={() => {
            setSearchText("");
          }}
          className="
              absolute right-2 top-1/2 -translate-y-1/2
               font-ui
              text-light-text2 dark:text-dark-text2
                font-medium px-4 text-xl
            ">
          X
        </button>
      </div>
      <div className="w-full mb-4 flex flex-col gap-3">
        {/* Crop + Agri-Year Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Crop Dropdown */}
          {showCropFilter && (
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
          )}

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
    </>
  );
};

export default BuyerFilters;
