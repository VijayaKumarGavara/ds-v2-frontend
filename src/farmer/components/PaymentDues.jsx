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
  }, []);
  return (
    <>
      <div>PaymentDues</div>
      {paymentDues.map((p, index) => {
        return (
          <div key={index}>
            <div>{p.buyer_name}-</div>
            <div>
            <span className="text-green-500 font-medium ">
              Total Paid Amount: {p.total_paid_amount}
            </span>
            <span className="text-red-500 font-medium ">Balance Amount: {p.balance_amount}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PaymentDues;
