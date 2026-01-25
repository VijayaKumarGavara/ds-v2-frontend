import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";
import { Link } from "react-router";

const PaymentDues = () => {
  const [paymentDues, setPaymentDues] = useState([]);
  const buyer_id = "B123";
  useEffect(() => {
    async function fetchProcurements() {
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/payment-dues?buyer_id=${buyer_id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the procurements");
        }
        const jsonResponse = await response.json();
        setPaymentDues(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProcurements();
  }, []);
  return (
    <>
      <h1>Payment Dues</h1>
      {paymentDues?.map((p) => {
        return (
          <div key={p.due_id}>
            <div>{p.farmer_name}</div>
            <div>{`Balance: ${p.balance_amount} - Paid: ${p.total_paid_amount}`}</div>
            <Link to="/make-payment" state={{ p }}>
              Pay Now
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default PaymentDues;
