import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";

const MakeProcurement = () => {
  const buyer_id = useSelector((store) => store.user?.buyer?.buyer_id);

  const navigate = useNavigate();
  const location = useLocation();

  const farmerSelected = location.state?.farmer;

  const [procurementMode, setProcurementMode] = useState("later"); // later | spot
  const [selectedCropName, setSelectedCropName] = useState("");
  const [cropDetails, setCropDetails] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!farmerSelected) {
      navigate("/buyer/find-farmers", { replace: true });
    }
  }, [farmerSelected, navigate]);

  if (!farmerSelected) return null;

  const { farmer_id, farmer_name, farmer_village } = farmerSelected;

  async function fetchUnits(crop_name) {
    try {
      const res = await fetch(
        `${API_URL}/api/crop/get-units?crop_name=${crop_name}`,
      );
      const json = await res.json();
      setCropDetails(json.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cropDetails || !quantity) {
      setStatus({ type: "error", message: "Please complete all fields" });
      return;
    }

    if (procurementMode === "spot" && !costPerUnit) {
      setStatus({
        type: "error",
        message: "Cost per unit is required for spot finalization",
      });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    const token = localStorage.getItem("token");

    try {
      if (procurementMode === "later") {
        // FINALIZE LATER
        const res = await fetch(`${API_URL}/api/procurement-request/add`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            farmer_id,
            buyer_id,
            crop_id: cropDetails.crop_id,
            crop_units: cropDetails.crop_units,
            quantity: Number(quantity),
          }),
        });

        if (!res.ok) throw new Error("Failed to add procurement request");

        setStatus({
          type: "success",
          message: "Procurement request added successfully",
        });
      } else {
        // SPOT FINALIZE
        const res = await fetch(
          `${API_URL}/api/procurement/add-finalized-procurement`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              farmer_id,
              buyer_id,
              crop_id: cropDetails.crop_id,
              crop_units: cropDetails.crop_units,
              quantity: Number(quantity),
              cost_per_unit: Number(costPerUnit),
            }),
          },
        );

        if (!res.ok) throw new Error("Failed to finalize procurement");

        setStatus({
          type: "success",
          message: "Procurement finalized and payment due updated",
        });
      }

      // reset form
      setSelectedCropName("");
      setCropDetails(null);
      setQuantity("");
      setCostPerUnit("");

      setTimeout(() => setStatus(null), 6000);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-md mx-auto min-h-[calc(100vh-80px)]">
      {/* Farmer Info */}
      <h2 className="text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Make Procurement
      </h2>
      <div className="mt-8 mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading font-semibold text-lg text-light-text dark:text-dark-text">
            {farmer_name}
          </h2>
          <p className="text-sm text-light-text2 dark:text-dark-text2">
            {farmer_village}
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-brand-500 mt-1">
          Change farmer
        </button>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        {[
          { label: "Finalize Later", value: "later" },
          { label: "Spot Finalize", value: "spot" },
        ].map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => setProcurementMode(m.value)}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-ui border
              ${
                procurementMode === m.value
                  ? "bg-brand-500 text-white border-brand-500"
                  : "border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
              }`}>
            {m.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={selectedCropName}
          onChange={(e) => {
            setSelectedCropName(e.target.value);
            fetchUnits(e.target.value);
          }}
          className="w-full rounded-md border px-3 py-2">
          <option value="">Select crop</option>
          <option value="maize">Mokka Jonna</option>
          <option value="groundnut">Veru Senaga</option>
          <option value="paddy">Vari</option>
          <option value="chillis">Mirapa</option>
        </select>

        {cropDetails && (
          <>
            <input
              type="text"
              placeholder={`Quantity (${cropDetails.crop_units})`}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />

            {procurementMode === "spot" && (
              <input
                type="text"
                placeholder={`Cost per ${cropDetails.crop_units}`}
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />
            )}
          </>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-500 py-2 text-white font-ui">
          {submitting
            ? "Processing..."
            : procurementMode === "spot"
              ? "Finalize Procurement"
              : "Add Procurement"}
        </button>
      </form>

      {status && (
        <div
          className={`mt-4 rounded-md px-3 py-2 text-sm
            ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
          {status.message}
        </div>
      )}
    </section>
  );
};

export default MakeProcurement;
