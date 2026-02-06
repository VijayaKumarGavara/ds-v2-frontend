import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";

const PaymentDues = () => {
  const [paymentDues, setPaymentDues] = useState([]);
  const farmer_id = "F1769576873058";
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/farmer/payment-dues?farmer_id=${farmer_id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the procurement requests");
        }
        const jsonResponse = await response.json();
        setPaymentDues(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [farmer_id]);
  return (
    // <>
    //   <div>PaymentDues</div>
    //   {paymentDues.map((p, index) => {
    //     return (
    //       <div key={index}>
    //         <div>{p.buyer_name}-</div>
    //         <div>
    //           <span className="text-green-500 font-medium ">
    //             Total Paid Amount: {p.total_paid_amount}
    //           </span>
    //           <span className="text-red-500 font-medium ">
    //             Balance Amount: {p.balance_amount}
    //           </span>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </>
    <>
      <section className="max-w-md mx-auto py-6">
        {/* Section title */}
        <h2 className="mb-6 text-center text-xl md:text-2xl font-heading font-bold text-light-text dark:text-dark-text">
          Payment Dues
        </h2>

        {/* Empty state */}
        {paymentDues.length === 0 && (
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
                    Paid: ₹{p.total_paid_amount}
                  </span>

                  <span
                    className="
                    text-sm font-ui font-medium
                    px-3 py-1 rounded-full
                    bg-accent/10 text-accent
                  ">
                    Balance: ₹{p.balance_amount}
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
