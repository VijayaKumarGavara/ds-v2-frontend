import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";

const PaymentDues = () => {
  const [paymentDues, setPaymentDues] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const farmer_id = useSelector((store) => store.user?.farmer?.farmer_id);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!farmer_id) return;
    (async () => {
      try {
        const response = await fetch(`${API_URL}/api/farmer/payment-dues`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error while fetching the payment dues.");
        }
        const jsonResponse = await response.json();
        setPaymentDues(jsonResponse?.data);
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
    <>
      <section className="max-w-md mx-auto py-6">
        {/* Section title */}
        <h2 className="mb-6 text-center text-xl md:text-2xl font-heading font-bold text-light-text dark:text-dark-text">
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

        {/* Empty state */}
        {!isLoading && status?.type != "error" && paymentDues.length === 0 && (
          <div className="text-light-text2 dark:text-dark-text2 font-body">
            No payment dues available.
          </div>
        )}

        {/* Dues list */}
        <div className="space-y-4">
          {paymentDues.map((p, index) => {
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
                {/* Buyer name */}
                <div className="font-ui font-medium text-light-text dark:text-dark-text">
                  {p.buyer_name}
                </div>

                {/* Amounts */}
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <span
                    className="
                    text-sm font-ui font-medium
                    px-3 py-1 rounded-full
                    bg-brand-500/10 text-brand-500
                  ">
                    Paid: ₹{p.total_paid_amount.toLocaleString()}
                  </span>

                  <span
                    className="
                    text-sm font-ui font-medium
                    px-3 py-1 rounded-full
                    bg-accent/10 text-accent
                  ">
                    Balance: ₹{p.balance_amount.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default PaymentDues;
