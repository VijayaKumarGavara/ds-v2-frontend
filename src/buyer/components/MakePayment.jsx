import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { API_URL } from "../../utils/constants";

const MakePayment = () => {
  const buyer_id = "B123";
  const location = useLocation();
  const navigate = useNavigate();

  const due = location.state?.p;
  const { farmer_name, farmer_id, due_id, balance_amount, total_paid_amount } =
    due;

  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    remarks: "",
  });

  const [status, setStatus] = useState({
    type: "", // "success" | "error"
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleMakePayment() {
    const paymentInfo = {
      due_id,
      farmer_id,
      buyer_id,
      amount: Number(paymentForm.amount),
      remarks: paymentForm.remarks,
    };

    try {
      setIsSubmitting(true);
      setStatus({ type: "", message: "" });

      const response = await fetch(`${API_URL}/api/payment/record-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentInfo),
      });

      if (!response.ok) {
        throw new Error("Error while making the payment.");
      }

      const jsonResponse = await response.json();
      const { updatedDue } = jsonResponse.data;

      setStatus({
        type: "success",
        message: `Payment of ₹${paymentForm.amount} recorded successfully.`,
      });

      // reset local form
      setPaymentForm({ amount: "", remarks: "" });

      // ⏳ delayed navigation (UX consistency)
      setTimeout(() => {
        navigate(-1); // or navigate("/buyer/payments")
      }, 6000);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to record the payment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h1>Make Payment</h1>

      <div className="border rounded-md p-4 max-w-md">
        <div className="font-medium">{farmer_name}</div>
        <div className="text-sm text-gray-600">
          Balance: ₹{balance_amount} | Total Paid: ₹{total_paid_amount}
        </div>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={paymentForm.amount}
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, amount: e.target.value })
          }
          className="border px-2 py-1 mt-3 w-full"
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="remarks"
          placeholder="Remarks (optional)"
          value={paymentForm.remarks}
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, remarks: e.target.value })
          }
          className="border px-2 py-1 mt-2 w-full"
          disabled={isSubmitting}
        />

        <div className="flex gap-3 mt-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={(e) => {
              e.preventDefault();
              handleMakePayment();
            }}
            className="border px-3 py-1 rounded-md"
          >
            {isSubmitting ? "Processing..." : "Pay"}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => navigate(-1)}
            className="border px-3 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>

        {/* STATUS MESSAGE */}
        {status.message && (
          <div
            className={`mt-3 p-2 rounded ${
              status.type === "success"
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </>
  );
};

export default MakePayment;
