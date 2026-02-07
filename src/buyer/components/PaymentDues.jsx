// import { useState, useEffect } from "react";
// import { API_URL } from "../../utils/constants";
// import { Link } from "react-router";

// const PaymentDues = () => {
//   const [paymentDues, setPaymentDues] = useState([]);
//   const buyer_id = "B123";
//   useEffect(() => {
//     async function fetchProcurements() {
//       try {
//         const response = await fetch(
//           `${API_URL}/api/buyer/payment-dues?buyer_id=${buyer_id}`,
//           { method: "GET", headers: { "Content-Type": "application/json" } },
//         );
//         if (!response.ok) {
//           throw new Error("Error while fetching the procurements");
//         }
//         const jsonResponse = await response.json();
//         setPaymentDues(jsonResponse?.data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//     fetchProcurements();
//   }, []);
//   return (
//     <>
//       <h1>Payment Dues</h1>
//       {paymentDues?.map((p) => {
//         return (
//           <div key={p.due_id}>
//             <div>{p.farmer_name}</div>
//             <div>{`Balance: ${p.balance_amount} - Paid: ${p.total_paid_amount}`}</div>
//             <Link to="/buyer/make-payment" state={{ p }}>
//               Pay Now
//             </Link>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default PaymentDues;

import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";
import { Link } from "react-router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const PaymentDues = () => {
  const [paymentDues, setPaymentDues] = useState([]);
  const buyer_id = "B123";

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/payment-dues?buyer_id=${buyer_id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
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
