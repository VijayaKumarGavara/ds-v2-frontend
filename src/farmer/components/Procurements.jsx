import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";
import FarmerFilters from "./FarmerFilters";
import getCurrentAgriYear from "../../utils/getCurrentAgriYear";
const Procurements = () => {
  const farmer_id = useSelector((store) => store.user?.farmer?.farmer_id);
  const [groupedData, setGroupedData] = useState([]);
  const [agriYearTotal, setAgriYearTotal] = useState(0);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters:
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [agriYear, setAgriYear] = useState(getCurrentAgriYear());
  useEffect(() => {
    if (!farmer_id) return;
    setStatus(null);
    (async () => {
      try {
        const params = new URLSearchParams();
        params.append("farmer_id", farmer_id);
        params.append("agri_year", agriYear);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_URL}/api/farmer/sales/finalized?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the procurements.");
        }
        const jsonResponse = await response.json();

        const procurements = jsonResponse?.data || [];
        const filteredData =
          selectedCrop === "all"
            ? procurements
            : procurements.filter((p) => p.crop_id === selectedCrop);

        const gd = filteredData.reduce((acc, item) => {
          const { crop_name, crop_units, buyer_name, quantity, total_amount } =
            item;

          if (!acc[crop_name]) {
            acc[crop_name] = {
              crop_units,
              grandTotalQty: 0,
              grandTotalAmount: 0,
              buyers: {},
            };
          }

          acc[crop_name].grandTotalQty += quantity;
          acc[crop_name].grandTotalAmount += total_amount;

          if (!acc[crop_name].buyers[buyer_name]) {
            acc[crop_name].buyers[buyer_name] = {
              totalQty: 0,
              totalAmount: 0,
              entries: [],
            };
          }

          acc[crop_name].buyers[buyer_name].totalQty += quantity;
          acc[crop_name].buyers[buyer_name].totalAmount += total_amount;
          acc[crop_name].buyers[buyer_name].entries.push(item);

          return acc;
        }, {});

        setGroupedData(gd);

        const aYT = filteredData.reduce(
          (sum, item) => sum + item.total_amount,
          0,
        );
        setAgriYearTotal(aYT);
      } catch (error) {
        setStatus({
          type: "error",
          message: error.message || "Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [farmer_id, agriYear]);

  return (
    <>
      <section className="max-w-md mx-auto py-6">
        {/* Section title */}
        <h2 className="text-center mb-6 text-xl md:text-2xl font-heading font-bold text-light-text dark:text-dark-text">
          Procurements
        </h2>

        {/* Procurements list */}
        <FarmerFilters
          selectedCrop={selectedCrop}
          onCropChange={setSelectedCrop}
          selectedAgriYear={agriYear}
          onAgriYearChange={setAgriYear}
          showAgriYear={true}
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
        {status && (
          <div
            className={`
            mb-4 rounded-md px-3 py-2 text-sm font-body
            ${
              status.type === "success"
                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                : "bg-red-500/10 text-red-600 border border-red-500/20"
            }
          `}>
            {status.message}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !groupedData && (
          <div className="text-light-text2 dark:text-dark-text2 font-body">
            No finalized procurements available.
          </div>
        )}

        {groupedData && (
          <div className="space-y-4">
            {/* Agri-Year Summary */}
            {status?.type !== "error" && (
              <div className="mb-6 rounded-xl bg-light-bg dark:bg-dark-bg p-4 border border-light-border dark:border-dark-border">
                <div className="font-heading font-semibold text-light-text dark:text-dark-text">
                  Agri-Year: {agriYear}
                </div>
                <div className="text-brand-500 font-medium mt-1">
                  Total Sold: ₹{agriYearTotal}
                </div>
              </div>
            )}

            {/* Crop Sections */}
            {Object.entries(groupedData).map(([cropName, cropData]) => (
              <div
                key={cropName}
                className="mb-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-4 space-y-4">
                {/* Crop Header */}
                <div className="flex justify-between items-center">
                  <div className="font-heading font-semibold text-lg text-light-text dark:text-dark-text">
                    {cropName}
                  </div>
                  <div className="text-sm text-light-text2 dark:text-dark-text2 mt-1">
                    Total Qty: {cropData.grandTotalQty} {cropData.crop_units}
                  </div>
                  <div className="text-sm text-brand-500">
                    Total Amount: ₹{cropData.grandTotalAmount}
                  </div>
                </div>

                {/* Buyers */}
                {Object.entries(cropData.buyers).map(
                  ([buyerName, buyerData]) => (
                    <div
                      key={buyerName}
                      className="rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border p-3 space-y-2">
                      <div className="font-ui font-medium text-light-text dark:text-dark-text">
                        {buyerName}
                      </div>
                      <div className="flex justify-between text-sm text-light-text dark:text-dark-text">
                        <span>Date</span>
                        <span className="pl-10">Quantity</span>
                        <span>Amount</span>
                      </div>
                      {buyerData.entries.map((entry, idx) => {
                        const date = new Date(
                          entry.finalizedAt,
                        ).toLocaleDateString("en-GB");
                        buyerData.entries.sort(
                          (a, b) =>
                            new Date(b.finalizedAt) - new Date(a.finalizedAt),
                        );
                        return (
                          <div
                            key={idx}
                            className="flex justify-between text-sm text-light-text dark:text-dark-text">
                            <span>{date}</span>
                            <span>
                              {entry.quantity} {cropData.crop_units}
                            </span>
                            <span>₹{entry.total_amount}</span>
                          </div>
                        );
                      })}

                      <div className="mt-2 text-sm font-medium text-brand-500">
                        Buyer Total: {buyerData.totalQty} {cropData.crop_units}{" "}
                        | ₹{buyerData.totalAmount}
                      </div>
                    </div>
                  ),
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Procurements;
