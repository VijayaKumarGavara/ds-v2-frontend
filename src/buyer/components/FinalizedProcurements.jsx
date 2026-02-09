import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL, CLOUDINARY_URL } from "../../utils/constants";

const FinalizedProcurements = () => {
  const [procurements, setProcurements] = useState([]);
  const buyer_id = useSelector((store) => store.user?.buyer?.buyer_id);
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/procurements?buyer_id=${buyer_id}`,
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
        setProcurements(json?.data || []);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <section className="max-w-md mx-auto min-h-screen">
      {/* Page Title */}
      <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Finalized Procurements
      </h2>

      {/* Empty State */}
      {procurements.length === 0 && (
        <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
          No finalized procurements yet.
        </div>
      )}

      {/* Procurement List */}
      <ul className="divide-y divide-light-border dark:divide-dark-border">
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
