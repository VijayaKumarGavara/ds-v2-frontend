import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const farmer_id = useSelector((store) => store.user?.farmer?.farmer_id);
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/farmer/transactions?farmer_id=${farmer_id}`,
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
  }, [refetchIndex]);
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
      {status&& !transactions && (
        <div className="flex ">
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
          <button
          className="border px-2 py-1 rounded-md"
            type="button"
            onClick={() => setRefetchIndex((prev) => prev + 1)}>
            Refresh Now
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && status?.type != "error" && transactions.length === 0 && (
        <div className="text-light-text2 dark:text-dark-text2 font-body">
          No payment dues available.
        </div>
      )}

      {/* Transactions list */}
      <div className="space-y-4">
        {transactions.map((t, index) => {
          const date = new Date(t.createdAt).toLocaleDateString("en-GB");

          return (
            <div
              key={index}
              className="
                rounded-xl
                bg-light-card dark:bg-dark-card
                border border-light-border dark:border-dark-border
                px-4 py-4
                flex justify-between items-center
              ">
              {/* Buyer + date */}
              <div className="flex flex-col">
                <span className="font-ui font-medium text-light-text dark:text-dark-text">
                  {t.buyer_name}
                </span>
                <span className="text-sm font-ui text-light-text2 dark:text-dark-text2">
                  {date}
                </span>
              </div>

              {/* Amount */}
              <span
                className="
                  text-sm font-ui font-medium
                  px-3 py-1 rounded-full
                  bg-brand-500/10 text-brand-500
                ">
                ₹{t.amount}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Transactions;
