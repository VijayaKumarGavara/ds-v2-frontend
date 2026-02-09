import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";
const ProcurementRequests = () => {
  const [procurementRequests, setProcurementRequests] = useState([]);
  const farmer_id = useSelector((store) => store.user?.farmer?.farmer_id);
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/farmer/sales?farmer_id=${farmer_id}`,
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
        setProcurementRequests(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <section className="max-w-md mx-auto py-6">
      {/* Section title */}
      <h2 className="mb-6 text-center text-xl md:text-2xl font-heading font-bold text-light-text dark:text-dark-text">
        Procurement Requests
      </h2>

      {/* Empty state */}
      {procurementRequests.length === 0 && (
        <div className="text-light-text2 dark:text-dark-text2 font-body">
          No procurement requests available.
        </div>
      )}

      {/* Requests list */}
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
              {/* Top row */}
              <div className="flex justify-between items-start">
                <div className="font-ui font-medium text-light-text dark:text-dark-text">
                  {r.buyer_name}
                </div>
                <div className="text-sm font-ui text-light-text2 dark:text-dark-text2">
                  {date}
                </div>
              </div>

              {/* Crop + status */}
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
