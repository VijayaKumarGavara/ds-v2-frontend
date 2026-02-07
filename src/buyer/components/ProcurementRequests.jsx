import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";
import RequestCard from "./RequestCard";

const ProcurementRequests = () => {
  const [procurementRequests, setProcurementRequests] = useState([]);
  const buyer_id = "B123";
  useEffect(() => {
    async function fetchProcurementRequests() {
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/procurement-requests?buyer_id=${buyer_id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the procurement requests");
        }
        const jsonResponse = await response.json();
        setProcurementRequests(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProcurementRequests();
  }, []);
  return (
    <>
      <section className="max-w-md mx-auto px-4 min-h-screen">
        <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
          Procurement Requests
        </h2>

        {procurementRequests.length === 0 && (
          <div className="text-sm text-light-text2 dark:text-dark-text2">
            No pending procurement requests.
          </div>
        )}

        <ul className="divide-y divide-light-border dark:divide-dark-border">
          {procurementRequests.map((request) => (
            <RequestCard key={request.request_id} request={request} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default ProcurementRequests;
