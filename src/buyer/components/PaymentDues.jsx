import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { API_URL } from "../../utils/constants";

const PaymentDues = () => {
  const [paymentDues, setPaymentDues] = useState([]);
  const buyer_id = useSelector((store) => store.user?.buyer?.buyer_id);
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/payment-dues?buyer_id=${buyer_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error while fetching payment dues");
        }

        const json = await response.json();
        setPaymentDues(json?.data || []);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <section className="max-w-md mx-auto min-h-screen">
      {/* Title */}
      <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Payment Dues
      </h2>

      {/* Empty State */}
      {paymentDues.length === 0 && (
        <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
          No outstanding dues.
        </div>
      )}

      {/* Dues List */}
      <ul className="divide-y divide-light-border dark:divide-dark-border">
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
                  <span className="text-lg font-heading font-bold">
                    {p.farmer_name?.[0]}
                  </span>
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
