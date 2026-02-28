import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";
import RequestCard from "./RequestCard";
import BuyerFilters from "./BuyerFilters";

const ProcurementRequests = () => {
  const [procurementRequests, setProcurementRequests] = useState([]);
  const [originalProcurementRequests, setOriginalProcurementRequests] =
    useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const buyer_id = useSelector((store) => store.user?.buyer?.buyer_id);

  // Filters:
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchProcurementRequests() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_URL}/api/buyer/procurement-requests`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the procurement requests");
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
    }
    fetchProcurementRequests();
  }, [buyer_id, refetchIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredRequests = originalProcurementRequests
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

      setProcurementRequests(filteredRequests);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedCrop, searchText, originalProcurementRequests]);

  return (
    <>
      <section className="max-w-md mx-auto px-4 min-h-screen mb-16">
        <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
          Procurement Requests
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
          showCropFilter={true}
        />
        
        {/* Empty state */}
        {!isLoading && !status && procurementRequests.length === 0 && (
          <div className="text-sm text-light-text2 dark:text-dark-text2">
            No pending procurement requests.
          </div>
        )}

        

        <ul className="divide-y divide-light-border dark:divide-dark-border mb-16">
          {procurementRequests.map((request) => (
            <RequestCard key={request.request_id} request={request} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default ProcurementRequests;
