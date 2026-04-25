import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { API_URL } from "../../utils/constants";
import DriverFilters from "./DriverFilters";
import getCurrentAgriYear from "../../utils/getCurrentAgriYear";
import formatHours from "../../utils/formatHours";

const WorkRecords = () => {
  const navigate = useNavigate();
  const driver_id = useSelector((store) => store.user?.driver?.driver_id);

  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);

  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);

  // Filters
  const [searchText, setSearchText] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState("all");
  const [agriYear, setAgriYear] = useState(getCurrentAgriYear());

  useEffect(() => {
    if (!driver_id) return;

    setStatus(null);

    (async () => {
      try {
        const params = new URLSearchParams();
        params.append("agri_year", agriYear);

        const token = localStorage.getItem("token");
        const res = await fetch(
          `${API_URL}/api/driver/work-records?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [driver_id, agriYear, refetchIndex]);

  useEffect(() => {
    let filtered = works;

    if (searchText.trim()) {
      const s = searchText.toLowerCase();
      filtered = filtered.filter((w) =>
        w.farmer_name.toLowerCase().includes(s),
      );
    }

    if (selectedWorkType !== "all") {
      filtered = filtered.filter((w) => w.work?.type === selectedWorkType);
    }

    setFilteredWorks(filtered);
  }, [searchText, selectedWorkType, works]);

  // Extract work options dynamically
  const workOptions = [
    ...new Map(works.map((w) => [w.work?.type, w.work])).values(),
  ];
  function handleEdit(work) {
    navigate("/driver/add-work", {
      state: { work, isEdit: true },
    });
  }

  async function handleDelete(work) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this work?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/tractor-work/delete-work?work_id=${work.work_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();

      if (!json.success) throw new Error(json.message);

      // Refresh list
      setRefetchIndex((prev) => prev + 1);
    } catch (err) {
      alert(err.message || "Failed to delete work");
    }
  }
  return (
    <section className="max-w-md mx-auto py-6">
      {/* Title */}
      <h2 className="text-center mb-6 text-xl font-heading font-bold text-light-text dark:text-dark-text">
        Work Records
      </h2>

      {/* Filters */}
      <DriverFilters
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedWorkType={selectedWorkType}
        onWorkTypeChange={setSelectedWorkType}
        selectedAgriYear={agriYear}
        onAgriYearChange={setAgriYear}
        workOptions={workOptions}
        showAgriYear={true}
        showWorkTypeFilter={true}
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
                <div className="font-medium">{work.farmer_name}</div>
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
                  {work.work?.unit === "hour"
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
            <div className="flex justify-end gap-4 mt-3">
              <button
                onClick={() => handleEdit(work)}
                className="px-3 py-1 bg-blue-600/80 text-white rounded-md">
                Edit
              </button>
              <button
                onClick={() => handleDelete(work)}
                className="px-3 py-1 bg-red-500/70 text-slate-900 rounded-md">
                Delete
              </button>
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

export default WorkRecords;
