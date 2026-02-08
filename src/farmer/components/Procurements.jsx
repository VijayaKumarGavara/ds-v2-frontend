import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";
const Procurements = () => {
  const [procurements, setProcurements] = useState([]);
  const farmer_id = useSelector((store) => store.user?.farmer?.farmer_id);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_URL}/api/farmer/sales/finalized?farmer_id=${farmer_id}`,
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
        setProcurements(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <>
      <section className="max-w-md mx-auto py-6">
        {/* Section title */}
        <h2 className="text-center mb-6 text-xl md:text-2xl font-heading font-bold text-light-text dark:text-dark-text">
          Procurements
        </h2>

        {/* Empty state */}
        {procurements.length === 0 && (
          <div className="text-light-text2 dark:text-dark-text2 font-body">
            No finalized procurements available.
          </div>
        )}

        {/* Procurements list */}
        <div className="space-y-4">
          {procurements.map((p, index) => {
            const date = new Date(p.finalizedAt).toISOString().split("T")[0];

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
                {/* Top row: Buyer + Date */}
                <div className="flex justify-between items-start">
                  <div className="font-ui font-medium text-light-text dark:text-dark-text">
                    {p.buyer_name}
                  </div>
                  <div className="text-sm font-ui text-light-text2 dark:text-dark-text2">
                    {date}
                  </div>
                </div>

                {/* Crop + rate */}
                <div className="flex justify-between items-center font-body text-light-text dark:text-dark-text">
                  <div>
                    {p.crop_name}
                    <span className="text-light-text2 dark:text-dark-text2">
                      {" "}
                      — {p.quantity} {p.crop_units}
                    </span>
                    <div className="text-sm text-light-text2 dark:text-dark-text2 mt-1">
                      @ {p.cost_per_unit} / {p.crop_units}
                    </div>
                  </div>
                  {/* Total amount */}
                  <div className="">
                    <span
                      className="
                    text-sm font-ui font-medium
                    px-3 py-1 rounded-full
                    bg-brand-500/10 text-brand-500
                  ">
                      Total: ₹{p.total_amount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Procurements;
