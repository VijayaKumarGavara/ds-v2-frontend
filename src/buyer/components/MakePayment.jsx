import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";
import PaymentsIcon from "@mui/icons-material/Payments";

const MakePayment = () => {
  const buyer_id = useSelector((store) => store.user?.buyer?.buyer_id);
  const location = useLocation();
  const navigate = useNavigate();

  const due = location.state?.p;
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    remarks: "",
  });

  const [status, setStatus] = useState({
    type: "", // success | error
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!due) {
    navigate(-1);
    return null;
  }

  const { farmer_name, farmer_id, due_id, balance_amount, total_paid_amount } =
    due;

  async function handleMakePayment() {
    if (!paymentForm.amount) return;

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
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/payment/record-payment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      });

      if (!response.ok) {
        throw new Error("Error while making the payment.");
      }

      await response.json();

      setStatus({
        type: "success",
        message: `Payment of ₹${paymentForm.amount} recorded successfully.`,
      });

      setPaymentForm({ amount: "", remarks: "" });

      setTimeout(() => {
        navigate(-1);
      }, 5000);
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
    <section className="max-w-md min-h-[calc(100vh-80px)] mx-auto pt-6 px-4">
      {/* Header */}
      <h2 className="mb-1 text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Make Payment
      </h2>
      <p className="mb-5 text-sm text-light-text2 dark:text-dark-text2">
        Record a payment for the farmer
      </p>

      {/* Card */}
      <div
        className="
          rounded-2xl
          bg-light-card dark:bg-dark-card
          border border-light-border dark:border-dark-border
          px-5 py-5
          space-y-5
        ">
        {/* Farmer Info */}
        <div className="flex items-center gap-3">
          <div
            className="
              h-10 w-10
              rounded-full
              bg-brand-500/10
              text-brand-500
              flex items-center justify-center
            ">
            <PaymentsIcon />
          </div>

          <div>
            <div className="font-ui font-medium text-light-text dark:text-dark-text">
              {farmer_name}
            </div>
          </div>
        </div>

        {/* Amount Summary */}
        <div
          className="
            rounded-xl
            bg-light-bg dark:bg-dark-bg
            border border-light-border dark:border-dark-border
            px-4 py-3
            text-sm
          ">
          <div className="flex justify-between">
            <span className="text-light-text2 dark:text-dark-text2">
              Balance
            </span>
            <span className="font-medium text-red-600">₹{balance_amount}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-light-text2 dark:text-dark-text2">
              Total Paid
            </span>
            <span className="font-medium text-green-600">
              ₹{total_paid_amount}
            </span>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter payment amount"
            value={paymentForm.amount}
            onChange={(e) =>
              setPaymentForm({ ...paymentForm, amount: e.target.value })
            }
            disabled={isSubmitting}
            className="
              w-full rounded-md
              px-3 py-2
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text
              placeholder:text-light-text2 dark:placeholder:text-dark-text2
              font-ui
            "
          />

          <input
            type="text"
            placeholder="Remarks (optional)"
            value={paymentForm.remarks}
            onChange={(e) =>
              setPaymentForm({ ...paymentForm, remarks: e.target.value })
            }
            disabled={isSubmitting}
            className="
              w-full rounded-md
              px-3 py-2
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text
              placeholder:text-light-text2 dark:placeholder:text-dark-text2
              font-ui
            "
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleMakePayment}
            disabled={isSubmitting}
            className="
              flex-1 rounded-full
              bg-brand-500 hover:bg-brand-600
              py-2
              text-white font-ui font-medium
              disabled:opacity-60
            ">
            {isSubmitting ? "Processing..." : "Pay Now"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
            className="
              flex-1 rounded-full
              border border-light-border dark:border-dark-border
              py-2
              font-ui
              text-light-text dark:text-dark-text
            ">
            Cancel
          </button>
        </div>

        {/* Status */}
        {status.message && (
          <div
            className={`
              rounded-md px-3 py-2 text-sm font-body
              ${
                status.type === "success"
                  ? "bg-brand-500/10 text-brand-500 border border-brand-500/30"
                  : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30"
              }
            `}>
            {status.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default MakePayment;
