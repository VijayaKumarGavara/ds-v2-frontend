import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL, CLOUDINARY_URL } from "../../utils/constants";
import BuyerFilters from "./BuyerFilters";
import getCurrentAgriYear from "../../utils/getCurrentAgriYear";

const FinalizedProcurements = () => {
  const [procurements, setProcurements] = useState([]);
  const [originalProcurements, setOriginalProcurements] = useState([]);

  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const buyer_id = useSelector((store) => store.user?.buyer?.buyer_id);

  // Filters:
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [agriYear, setAgriYear] = useState(getCurrentAgriYear());

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!buyer_id) return;
    (async () => {
      const params = new URLSearchParams();
      params.append("agri_year", agriYear);
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/procurements?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error while fetching procurements");
        }

        const json = await response.json();
        setOriginalProcurements(json?.data || []);
        setProcurements(json?.data || []);
      } catch (error) {
        setStatus({
          type: "error",
          message: error.message || "Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [buyer_id, agriYear, refetchIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredProcurements = originalProcurements
        .filter((r) =>
          selectedCrop === "all" ? true : r.crop_id === selectedCrop,
        )
        .filter((r) =>
          searchText.trim()
            ? r.farmer_name
                .toLowerCase()
                .includes(searchText.trim().toLowerCase())
            : true,
        );

      setProcurements(filteredProcurements);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedCrop, searchText, originalProcurements]);

  return (
    <section className="max-w-md mx-auto min-h-screen mb-16">
      {/* Page Title */}
      <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Finalized Procurements
      </h2>

      {/* Loading Message */}
      {isLoading && (
        <div
          className={`
            mb-4 rounded-md px-3 py-2 text-sm font-body
            text-light-text dark:text-dark-text
          `}>
          Loading...
        </div>
      )}

      {/* Status Message */}
      {status?.type === "error" && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          <span>{status.message}</span>
          <button
            type="button"
            onClick={() => setRefetchIndex((prev) => prev + 1)}
            className="text-xs font-medium underline hover:opacity-80">
            Retry
          </button>
        </div>
      )}

      <BuyerFilters
        searchText={searchText}
        setSearchText={setSearchText}
        selectedCrop={selectedCrop}
        onCropChange={setSelectedCrop}
        selectedAgriYear={agriYear}
        onAgriYearChange={setAgriYear}
        showAgriYear={true}
        showCropFilter={true}
      />

      {/* Empty state */}
      {!isLoading && !status && procurements.length === 0 && (
        <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
          No finalized procurements yet.
        </div>
      )}

      {/* Procurement List */}
      <ul className="divide-y divide-light-border dark:divide-dark-border mb-40">
        {procurements.map((p) => {
          const date = p.finalizedAt
            ? new Date(p.finalizedAt).toLocaleDateString()
            : "";

          return (
            <li
              key={p.procurement_id}
              className="
                flex items-center gap-4
                py-4
                cursor-pointer
                hover:bg-light-bg dark:hover:bg-dark-bg
                transition
              ">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                {p.farmer_image_path ? (
                  <img
                    src={`${CLOUDINARY_URL}${p.farmer_image_path}`}
                    alt={p.farmer_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-heading font-bold text-brand-500">
                    {p.farmer_name?.[0]}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-3">
                  <div className="font-ui font-medium text-light-text dark:text-dark-text truncate">
                    {p.farmer_name}
                  </div>

                  <div className="font-ui font-semibold text-green-600 whitespace-nowrap">
                    ₹{p.total_amount}
                  </div>
                </div>

                <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
                  {p.crop_name} • {p.quantity} {p.crop_units} @ ₹
                  {p.cost_per_unit}/{p.crop_units}
                </div>

                {date && (
                  <div className="text-xs font-body text-light-text2 dark:text-dark-text2 mt-0.5">
                    Finalized on {date}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FinalizedProcurements;
