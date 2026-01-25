import { useLocation } from "react-router";
import { useState } from "react";
import { API_URL } from "../../utils/constants";
const MakePayment = () => {
  const buyer_id = "B123";
  const location = useLocation();
  const due = location.state.p;
  const { farmer_name, farmer_id, due_id, balance_amount, total_paid_amount } =
    due;
  const [paymentForm, setPaymentForm] = useState({ amount: 0, remarks: null });

  async function handleMakePayment(due_id, farmer_id, buyer_id) {
    const paymentInfo = {
      due_id,
      farmer_id,
      buyer_id,
      amount: Number(paymentForm.amount),
      remarks: paymentForm.remarks,
    };
    try {
      const response = await fetch(`${API_URL}/api/payment/record-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentInfo),
      });
      if (!response.ok) {
        throw new Error("Error while making the payment.");
      }
      const jsonResponse = await response.json();
      const { updatedDue, transactionResponse } = jsonResponse.data;

      console.log({ updatedDue, transactionResponse });
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <h1>MakePayment</h1>
      <div>
        <div>{farmer_name}</div>
        <div>
          {`Balance: ${balance_amount} Total Paid: ${total_paid_amount}`}
        </div>

        <input
          type="text"
          name="amount"
          placeholder="0"
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
          }
          className="border "
        />
        <input
          type="text"
          name="remarks"
          placeholder="description"
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
          }
          className="border "
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleMakePayment(due_id, farmer_id, buyer_id);
          }}
          className="border">
          Pay
        </button>
      </div>
    </>
  );
};

export default MakePayment;
