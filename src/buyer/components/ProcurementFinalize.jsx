import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { API_URL } from "../../utils/constants";

const ProcurementFinalize = () => {
  const [cost_per_unit, setCost] = useState(0);

  const [procurementUpdate, setProcurementUpdate] = useState({
    procurement: null,
    due: null,
  });

  const [status, setStatus] = useState({
    type: "", 
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const request = location.state?.request;

  const {
    request_id,
    farmer_name,
    crop_name,
    crop_units,
    quantity,
    createdAt,
  } = request;

  async function handleCostAdd(request_id) {
    try {
      setIsSubmitting(true);
      setStatus({ type: "", message: "" });

      const response = await fetch(`${API_URL}/api/procurement/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request_id,
          cost_per_unit: Number(cost_per_unit),
        }),
      });

      if (!response.ok) {
        throw new Error("Error while finalizing the procurement.");
      }

      const jsonResponse = await response.json();

      setProcurementUpdate({
        procurement: jsonResponse?.data[0],
        due: jsonResponse?.data[1],
      });

      setStatus({
        type: "success",
        message:
          "Procurement finalized successfully. Payment due has been updated.",
      });

      setTimeout(() => {
        navigate(-1); 
      }, 6000);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to finalize procurement.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h1>Procurement Finalization</h1>

      <div className="border rounded-md p-4 max-w-md">
        <div>
          <strong>{farmer_name}</strong> –{" "}
          {new Date(createdAt).toISOString().split("T")[0]}
        </div>

        <div className="mt-1">
          {crop_name} – {quantity} {crop_units}
        </div>

        <input
          type="text"
          name="cost_per_unit"
          placeholder="Cost per unit"
          value={cost_per_unit}
          onChange={(e) => setCost(e.target.value)}
          className="border px-2 py-1 mt-3 w-full"
          disabled={isSubmitting}
        />

        <div className="flex gap-3 mt-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={(e) => {
              e.preventDefault();
              handleCostAdd(request_id);
            }}
            className="border px-3 py-1 rounded-md"
          >
            {isSubmitting ? "Finalizing..." : "Finalize"}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="border px-3 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>

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

export default ProcurementFinalize;
