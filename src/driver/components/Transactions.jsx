import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";

import SouthWestIcon from "@mui/icons-material/SouthWest";
import DriverFilters from "./DriverFilters";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [originalTransactions, setOriginalTransactions] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const [searchText, setSearchText] = useState("");

  const driver_id = useSelector((store) => store.user?.driver?.driver_id);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!driver_id) return;
    (async () => {
      try {
        const response = await fetch(`${API_URL}/api/driver/transactions`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error while fetching your transactions");
        }

        const json = await response.json();
        setTransactions(json?.data || []);
        setOriginalTransactions(json?.data || []);
      } catch (error) {
        setStatus({
          type: "error",
          message: error.message || "Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [driver_id, refetchIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredPaymentDues = originalTransactions.filter((r) =>
        searchText.trim()
          ? r.farmer_name
              .toLowerCase()
              .includes(searchText.trim().toLowerCase())
          : true,
      );

      setTransactions(filteredPaymentDues);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, originalTransactions]);
  return (
    <section className="max-w-md mx-auto min-h-screen mb-16">
      {/* Title */}
      <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
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

      <DriverFilters searchText={searchText} setSearchText={setSearchText} />

      {/* Empty state */}
      {!isLoading && !status && transactions.length === 0 && (
        <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
          No transactions found.
        </div>
      )}

      {/* Transaction List */}
      <ul className="divide-y divide-light-border dark:divide-dark-border mb-16">
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
                <SouthWestIcon className="text-green-600" />
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
