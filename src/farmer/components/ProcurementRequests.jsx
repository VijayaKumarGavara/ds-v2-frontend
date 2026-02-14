import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";
import FarmerFilters from "./FarmerFilters";
const ProcurementRequests = () => {
  const [procurementRequests, setProcurementRequests] = useState([]);
  const [originalProcurementRequests, setOriginalProcurementRequests] =
    useState([]);

  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const farmer_id = useSelector((store) => store.user?.farmer?.farmer_id);

  // Filters:
  const [selectedCrop, setSelectedCrop] = useState("all");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!farmer_id) return;
    setStatus(null);
    const fetchRequests = async () => {
      try {
        const params = new URLSearchParams();
        params.append("farmer_id", farmer_id);

        const response = await fetch(
          `${API_URL}/api/farmer/sales?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error while fetching procurement requests");
        }

        const jsonResponse = await response.json();
        setOriginalProcurementRequests(jsonResponse?.data || []);
        setProcurementRequests(jsonResponse?.data || []);
      } catch (error) {
        setStatus({
          type: "error",
          message: error.message || "Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [farmer_id, refetchIndex]);

  useEffect(() => {
    const filteredRequests =
      selectedCrop === "all"
        ? originalProcurementRequests
        : originalProcurementRequests.filter((r) => r.crop_id === selectedCrop);
    setProcurementRequests(filteredRequests);
  }, [selectedCrop, originalProcurementRequests]);
  return (
    <section className="max-w-md mx-auto py-6">
      {/* Section title */}
      <h2 className="mb-6 text-center text-xl md:text-2xl font-heading font-bold text-light-text dark:text-dark-text">
        Procurement Requests
      </h2>

      {/* Requests list */}
      <FarmerFilters
        selectedCrop={selectedCrop}
        onCropChange={setSelectedCrop}
        showAgriYear={false}
      />

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

      {/* Empty state */}
      {!isLoading && !status &&  procurementRequests.length === 0 && (
        <div className="text-light-text2 dark:text-dark-text2 font-body">
          No procurement requests available.
        </div>
      )}

      <div className="space-y-4">
        {procurementRequests.map((r, index) => {
          const date = new Date(r.createdAt).toLocaleDateString("en-GB");

          return (
            <div
              key={index}
              className="
                rounded-xl
                bg-light-card dark:bg-dark-card
                border border-light-border dark:border-dark-border
                px-4 py-4
                flex flex-col gap-3
              ">
              <div className="flex justify-between items-start">
                <div className="font-ui font-medium text-light-text dark:text-dark-text">
                  {r.buyer_name}
                </div>
                <div className="text-sm font-ui text-light-text2 dark:text-dark-text2">
                  {date}
                </div>
              </div>

              <div className="flex justify-between items-center font-body text-light-text dark:text-dark-text">
                <div>
                  {r.crop_name}
                  <span className="text-light-text2 dark:text-dark-text2">
                    {" "}
                    — {r.quantity} {r.crop_units}
                  </span>
                </div>

                <span
                  className={`
                    text-sm font-ui font-medium
                    px-3 py-1 rounded-full
                    ${
                      r.status === "pending"
                        ? "bg-accent/10 text-accent"
                        : r.status === "approved"
                          ? "bg-brand-500/10 text-brand-500"
                          : "bg-light-border text-light-text2 dark:bg-dark-border dark:text-dark-text2"
                    }
                  `}>
                  {r.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProcurementRequests;
