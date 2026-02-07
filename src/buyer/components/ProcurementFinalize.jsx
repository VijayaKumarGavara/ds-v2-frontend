// import { useLocation, useNavigate } from "react-router";
// import { useState } from "react";
// import { API_URL } from "../../utils/constants";

// const ProcurementFinalize = () => {
//   const [cost_per_unit, setCost] = useState(0);

//   const [procurementUpdate, setProcurementUpdate] = useState({
//     procurement: null,
//     due: null,
//   });

//   const [status, setStatus] = useState({
//     type: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const request = location.state?.request;

//   const {
//     request_id,
//     farmer_name,
//     crop_name,
//     crop_units,
//     quantity,
//     createdAt,
//   } = request;

//   async function handleCostAdd(request_id) {
//     try {
//       setIsSubmitting(true);
//       setStatus({ type: "", message: "" });

//       const response = await fetch(`${API_URL}/api/procurement/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           request_id,
//           cost_per_unit: Number(cost_per_unit),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Error while finalizing the procurement.");
//       }

//       const jsonResponse = await response.json();

//       setProcurementUpdate({
//         procurement: jsonResponse?.data[0],
//         due: jsonResponse?.data[1],
//       });

//       setStatus({
//         type: "success",
//         message:
//           "Procurement finalized successfully. Payment due has been updated.",
//       });

//       setTimeout(() => {
//         navigate(-1);
//       }, 6000);
//     } catch (error) {
//       setStatus({
//         type: "error",
//         message: error.message || "Failed to finalize procurement.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <>
//       <h1>Procurement Finalization</h1>

//       <div className="border rounded-md p-4 max-w-md">
//         <div>
//           <strong>{farmer_name}</strong> –{" "}
//           {new Date(createdAt).toISOString().split("T")[0]}
//         </div>

//         <div className="mt-1">
//           {crop_name} – {quantity} {crop_units}
//         </div>

//         <input
//           type="text"
//           name="cost_per_unit"
//           placeholder="Cost per unit"
//           value={cost_per_unit}
//           onChange={(e) => setCost(e.target.value)}
//           className="border px-2 py-1 mt-3 w-full"
//           disabled={isSubmitting}
//         />

//         <div className="flex gap-3 mt-3">
//           <button
//             type="button"
//             disabled={isSubmitting}
//             onClick={(e) => {
//               e.preventDefault();
//               handleCostAdd(request_id);
//             }}
//             className="border px-3 py-1 rounded-md"
//           >
//             {isSubmitting ? "Finalizing..." : "Finalize"}
//           </button>

//           <button
//             type="button"
//             disabled={isSubmitting}
//             onClick={(e) => {
//               e.preventDefault();
//               navigate(-1);
//             }}
//             className="border px-3 py-1 rounded-md"
//           >
//             Cancel
//           </button>
//         </div>

//         {status.message && (
//           <div
//             className={`mt-3 p-2 rounded ${
//               status.type === "success"
//                 ? "text-green-700 bg-green-100"
//                 : "text-red-700 bg-red-100"
//             }`}
//           >
//             {status.message}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProcurementFinalize;

import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { API_URL } from "../../utils/constants";

const ProcurementFinalize = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const request = location.state?.request;
  const [costPerUnit, setCostPerUnit] = useState("");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!request) {
    navigate(-1);
    return null;
  }

  const {
    request_id,
    farmer_name,
    crop_name,
    crop_units,
    quantity,
    createdAt,
  } = request;

  async function handleFinalize() {
    if (!costPerUnit || Number(costPerUnit) <= 0) {
      setStatus({
        type: "error",
        message: "Please enter a valid cost per unit.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus(null);

      const response = await fetch(`${API_URL}/api/procurement/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request_id,
          cost_per_unit: Number(costPerUnit),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to finalize procurement.");
      }

      await response.json();

      setStatus({
        type: "success",
        message:
          "Procurement finalized successfully. Payment due has been updated.",
      });

      setTimeout(() => {
        navigate(-1);
      }, 5000);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="max-w-md mx-auto min-h-screen">
      {/* Title */}
      <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Finalize Procurement
      </h2>

      {/* Context Card */}
      <div
        className="
          rounded-xl
          bg-light-card dark:bg-dark-card
          border border-light-border dark:border-dark-border
          px-5 py-4
          mb-4
        ">
        <div className="font-ui font-semibold text-light-text dark:text-dark-text">
          {farmer_name}
        </div>

        <div className="text-sm text-light-text2 dark:text-dark-text2">
          {crop_name} • {quantity} {crop_units}
        </div>

        <div className="text-xs text-light-text2 dark:text-dark-text2 mt-1">
          Requested on {new Date(createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Cost Input */}
      <div className="mb-4">
        <label className="block text-sm font-body text-light-text2 dark:text-dark-text2 mb-1">
          Cost per {crop_units}
        </label>
        <input
          type="text"
          value={costPerUnit}
          onChange={(e) => setCostPerUnit(e.target.value)}
          disabled={isSubmitting}
          placeholder="Enter cost"
          className="
            w-full rounded-md px-3 py-2
            bg-light-bg dark:bg-dark-bg
            border border-light-border dark:border-dark-border
            text-light-text dark:text-dark-text
            focus:outline-none focus:ring-2 focus:ring-brand-500/40
          "
        />
      </div>

      {/* Status Message */}
      {status && (
        <div
          className={`
            mb-4 rounded-md px-3 py-2 text-sm font-body
            ${
              status.type === "success"
                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                : "bg-red-500/10 text-red-600 border border-red-500/20"
            }
          `}>
          {status.message}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleFinalize}
          disabled={isSubmitting}
          className="
            flex-1 rounded-full
            bg-brand-500 hover:bg-brand-600
            text-white
            py-2
            font-ui font-medium
            transition
            disabled:opacity-60
          ">
          {isSubmitting ? "Finalizing..." : "Finalize"}
        </button>

        <button
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
          className="
            flex-1 rounded-full
            border border-light-border dark:border-dark-border
            py-2
            font-ui font-medium
            text-light-text dark:text-dark-text
          ">
          Cancel
        </button>
      </div>
    </section>
  );
};

export default ProcurementFinalize;
