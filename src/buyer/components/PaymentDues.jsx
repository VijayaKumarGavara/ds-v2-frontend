import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { API_URL, CLOUDINARY_URL } from "../../utils/constants";
import BuyerFilters from "./BuyerFilters";

const PaymentDues = () => {
  const [paymentDues, setPaymentDues] = useState([]);
  const [originalPaymentDues, setOriginalPaymentDues] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const buyer_id = useSelector((store) => store.user?.buyer?.buyer_id);
  const token = localStorage.getItem("token");

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!buyer_id) return;
    (async () => {
      try {
        const response = await fetch(`${API_URL}/api/buyer/payment-dues`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error while fetching payment dues");
        }

        const json = await response.json();
        setPaymentDues(json?.data || []);
        setOriginalPaymentDues(json?.data || []);
      } catch (error) {
        setStatus({
          type: "error",
          message: error.message || "Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [buyer_id, refetchIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredPaymentDues = originalPaymentDues.filter((r) =>
        searchText.trim()
          ? r.farmer_name
              .toLowerCase()
              .includes(searchText.trim().toLowerCase())
          : true,
      );

      setPaymentDues(filteredPaymentDues);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, originalPaymentDues]);
  return (
    <section className="max-w-md mx-auto min-h-screen mb-16">
      {/* Title */}
      <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Payment Dues
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

      <BuyerFilters searchText={searchText} setSearchText={setSearchText} />

      {/* Empty state */}
      {!isLoading && !status && paymentDues.length === 0 && (
        <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
          No outstanding dues.
        </div>
      )}

      {/* Dues List */}
      <ul className="divide-y divide-light-border dark:divide-dark-border mb-16">
        {paymentDues.map((p) => {
          const hasDue = Number(p.balance_amount) > 0;

          return (
            <li key={p.due_id}>
              <Link
                to="/buyer/make-payment"
                state={{
                  p,
                }}
                className="
                  flex items-center gap-4 py-4
                  hover:bg-light-bg dark:hover:bg-dark-bg
                  transition
                ">
                {/* Avatar */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center shrink-0
                    ${
                      hasDue
                        ? "bg-red-500/10 text-red-600"
                        : "bg-green-500/10 text-green-600"
                    }
                  `}>
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

                    <div
                      className={`font-ui font-semibold whitespace-nowrap ${
                        hasDue ? "text-red-600" : "text-green-600"
                      }`}>
                      ₹{p.balance_amount}
                    </div>
                  </div>

                  <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
                    Paid: ₹{p.total_paid_amount}
                  </div>
                </div>

                {/* Chevron */}
                <ChevronRightIcon className="text-light-text2 dark:text-dark-text2 shrink-0" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PaymentDues;
