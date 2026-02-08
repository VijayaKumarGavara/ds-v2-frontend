import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";

import NorthEastIcon from "@mui/icons-material/NorthEast";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const buyer_id = useSelector((store) => store.user?.buyer?.buyer_id);
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/transactions?buyer_id=${buyer_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error while fetching your transactions");
        }

        const json = await response.json();
        setTransactions(json?.data || []);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <section className="max-w-md mx-auto min-h-screen">
      {/* Title */}
      <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Transactions
      </h2>

      {/* Empty State */}
      {transactions.length === 0 && (
        <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
          No transactions found.
        </div>
      )}

      {/* Transaction List */}
      <ul className="divide-y divide-light-border dark:divide-dark-border">
        {transactions.map((t) => {
          const date = new Date(t.createdAt).toLocaleDateString("en-GB");

          return (
            <li
              key={t.transaction_id || t.createdAt}
              className="
                flex items-center gap-4
                py-4
                hover:bg-light-bg dark:hover:bg-dark-bg
                transition
              ">
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                <NorthEastIcon className="text-green-600" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-3">
                  <div className="font-ui font-medium text-light-text dark:text-dark-text truncate">
                    {t.farmer_name}
                  </div>

                  <div className="font-ui font-semibold text-green-600 whitespace-nowrap">
                    ₹{t.amount}
                  </div>
                </div>

                <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
                  Paid on {date}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Transactions;
