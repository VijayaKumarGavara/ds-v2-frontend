import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
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
          throw new Error("Error while fetching the procurement requests");
        }
        const jsonResponse = await response.json();
        setTransactions(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <section className="max-w-md mx-auto py-6">
      {/* Section title */}
      <h2 className="mb-6 text-center text-xl md:text-2xl font-heading font-bold text-light-text dark:text-dark-text">
        Transactions
      </h2>

      {/* Empty state */}
      {transactions.length === 0 && (
        <div className="text-light-text2 dark:text-dark-text2 font-body">
          No transactions available.
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
