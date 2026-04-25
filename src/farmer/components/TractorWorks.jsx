import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";

import FarmerFilters from "./FarmerFilters";
import getCurrentAgriYear from "../../utils/getCurrentAgriYear";
import formatHours from "../../utils/formatHours";

const TractorWorks = () => {
  const farmer_id = useSelector((store) => store.user?.farmer?.farmer_id);

  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);

  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);

  // Filters
  const [selectedWorkType, setSelectedWorkType] = useState("all");
  const [agriYear, setAgriYear] = useState(getCurrentAgriYear());

  // Fetch data (same style as Procurements)
  useEffect(() => {
    if (!farmer_id) return;

    setStatus(null);

    (async () => {
      try {
        const params = new URLSearchParams();
        params.append("agri_year", agriYear);

        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API_URL}/api/farmer/tractor-works?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!res.ok) {
          throw new Error("Error while fetching tractor works.");
        }

        const json = await res.json();

        setWorks(json.data || []);
      } catch (err) {
        setStatus({
          type: "error",
          message: err.message || "Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [farmer_id, agriYear, refetchIndex]);

  useEffect(() => {
    const filtered =
      selectedWorkType === "all"
        ? works
        : works.filter((w) => w.work?.type === selectedWorkType);

    setFilteredWorks(filtered);
  }, [selectedWorkType, works]);

  // Extract work types dynamically
  const workOptions = [
    ...new Map(works.map((w) => [w.work?.type, w.work])).values(),
  ];

  return (
    <section className="max-w-md mx-auto py-6">
      {/* Title */}
      <h2 className="text-center mb-6 text-xl font-heading font-bold text-light-text dark:text-dark-text">
        Tractor Works
      </h2>

      {/* Filters */}
      <FarmerFilters
        selectedFilter={selectedWorkType}
        onFilterChange={setSelectedWorkType}
        selectedAgriYear={agriYear}
        onAgriYearChange={setAgriYear}
        showAgriYear={true}
        type="work"
        options={workOptions}
      />

      {/* Loading */}
      {isLoading && <div className="mb-4 text-sm">Loading...</div>}

      {/* Error */}
      {status?.type === "error" && (
        <div className="mb-4 flex justify-between rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          <span>{status.message}</span>
          <button
            onClick={() => setRefetchIndex((p) => p + 1)}
            className="text-xs underline">
            Retry
          </button>
        </div>
      )}

      {/* Cards */}
      <div className="space-y-4 mb-16">
        {filteredWorks.map((work) => (
          <div
            key={work.work_id}
            className="rounded-2xl bg-light-card dark:bg-dark-card border p-4">
            {/* Header */}
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{work.driver_name}</div>
                <div className="text-sm text-light-text2">
                  {new Date(work.createdAt).toLocaleDateString("en-GB")}
                </div>
              </div>

              <div className="text-sm text-light-text2">{work.work?.label}</div>
            </div>

            {/* Details */}
            <div className="mt-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span>
                  Qty:{" "}
                  {work.work?.unit === "hours"
                    ? formatHours(work.quantity)
                    : `${work.quantity}  ${work.work?.unit}`}
                </span>
                <span>
                  ₹{work.cost_per_unit}/{work.work?.unit}
                </span>
              </div>

              <div className="font-semibold text-brand-500">
                ₹{work.total_amount}
              </div>

              {work.notes && (
                <div className="text-xs text-light-text2">{work.notes}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty */}
      {!isLoading && filteredWorks.length === 0 && (
        <div className="text-light-text2">No tractor works found.</div>
      )}
    </section>
  );
};

export default TractorWorks;
