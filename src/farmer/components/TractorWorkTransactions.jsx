import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";
const TractorWorkTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const farmer_id = useSelector((store) => store.user?.farmer?.farmer_id);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!farmer_id) return;
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/farmer/tractor-work-transactions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the transactions.");
        }
        const jsonResponse = await response.json();
        setTransactions(jsonResponse?.data);
      } catch (error) {
        setStatus({
          type: "error",
          message: error.message || "Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [farmer_id, refetchIndex]);
  return (
    <section className="max-w-md mx-auto py-6">
      {/* Section title */}
      <h2 className="mb-6 text-center text-xl md:text-2xl font-heading font-bold text-light-text dark:text-dark-text">
        Transactions
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

      {/* Empty state */}
      {!isLoading && status?.type != "error" && transactions.length === 0 && (
        <div className="text-light-text2 dark:text-dark-text2 font-body">
          No transactions available.
        </div>
      )}

      {/* Transactions list */}
      <div className="space-y-4 mb-16">
        {transactions.map((t) => {
          const date = new Date(t.createdAt).toLocaleDateString("en-GB");

          return (
            <div
              key={t.transaction_id}
              className="
          rounded-xl
          bg-light-card dark:bg-dark-card
          border border-light-border dark:border-dark-border
          px-4 py-4
          space-y-2
        ">
              {/* Top Row */}
              <div className="flex justify-between items-center">
                <span className="font-ui font-medium text-light-text">
                  {t.driver_name}
                </span>

                <div className="text-right">
                  {t.amount > 0 && (
                    <div className="text-green-600 font-semibold">
                      ₹{t.amount.toLocaleString()}
                    </div>
                  )}
                  {t.discount > 0 && (
                    <div className="text-orange-500 text-sm">
                      Discount ₹{t.discount.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Balance Flow */}
              <div className="text-xs text-light-text2">
                Balance: ₹{t.balance_before.toLocaleString()} → ₹
                {t.balance_after.toLocaleString()}
              </div>

              {/* Meta */}
              <div className="flex justify-between text-xs text-light-text2">
                <span>{date}</span>
                <span className="capitalize">{t.payment_mode}</span>
              </div>

              {/* Remarks */}
              {t.remarks && (
                <div className="text-xs italic text-light-text2">
                  {t.remarks}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TractorWorkTransactions;
