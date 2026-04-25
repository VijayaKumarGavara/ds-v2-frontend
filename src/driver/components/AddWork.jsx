import { useLocation, useNavigate } from "react-router";
import { useState, useEffect, useMemo } from "react";
import { workOptions } from "../../utils/workOptions";
import { API_URL } from "../../utils/constants";
import { useSelector } from "react-redux";

const AddWork = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const isEdit = state?.isEdit;
  const existingWork = state?.work;

  const farmer = state?.farmer || {
    farmer_mobile: existingWork?.farmer_mobile,
    farmer_name: existingWork?.farmer_name,
    farmer_village: existingWork?.farmer_village,
  };

  const driver_id = useSelector((store) => store.user?.driver?.driver_id);
  const [selectedWorkId, setSelectedWorkId] = useState("");
  const [units, setUnits] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [status, setStatus] = useState(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && existingWork) {
      setSelectedWorkId(existingWork.work.type);
      setCostPerUnit(existingWork.cost_per_unit);
      setNotes(existingWork.notes || "");

      if (existingWork.work.unit === "hour") {
        const hrs = Math.floor(existingWork.quantity);
        const mins = Math.round((existingWork.quantity - hrs) * 60);

        setHours(hrs);
        setMinutes(mins);
      } else {
        setUnits(existingWork.quantity);
      }
    }
  }, [isEdit, existingWork]);

  const token = localStorage.getItem("token");

  const selectedWork = workOptions.find((w) => w.id === selectedWorkId);

  const totalUnits = useMemo(() => {
    if (!selectedWork) return 0;

    if (selectedWork.unit === "hour") {
      return (Number(hours) || 0) + (Number(minutes) || 0) / 60;
    }

    return Number(units) || 0;
  }, [hours, minutes, units, selectedWork]);

  const totalAmount = useMemo(() => {
    return Math.round(totalUnits * (Number(costPerUnit) || 0));
  }, [totalUnits, costPerUnit]);

  if (!farmer) return null;

 

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedWork || !costPerUnit) {
      setStatus({ type: "error", message: "Please fill all fields" });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const url = isEdit
        ? `${API_URL}/api/tractor-work/update-work?work_id=${existingWork.work_id}`
        : `${API_URL}/api/tractor-work/add-work`;

      const method = isEdit ? "PATCH" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farmer_id: farmer.farmer_id,
          driver_id,
          work: {
            type: selectedWork.id,
            label: selectedWork.label,
            unit: selectedWork.unit,
          },
          quantity: totalUnits,
          cost_per_unit: Number(costPerUnit),
          notes,
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      setStatus({
        type: "success",
        message: isEdit
          ? "Work updated successfully"
          : "Work added successfully",
      });

      setTimeout(() => {
        navigate("/driver/work-records");
      }, 1000);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-md mx-auto min-h-screen px-4 pb-52">
      {/* Title */}
      <h2 className="text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        {isEdit ? "Edit Work" : "Add Work"}
      </h2>

      {/* Farmer Info */}
      <div className="mt-8 mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading font-semibold text-lg text-light-text dark:text-dark-text">
            {farmer.farmer_name}
          </h2>
          <p className="text-sm text-light-text2 dark:text-dark-text2">
            {farmer.farmer_village} • {farmer.farmer_mobile}
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-brand-500 mt-1">
          Change farmer
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Work Selection */}
        <select
          value={selectedWorkId}
          onChange={(e) => setSelectedWorkId(e.target.value)}
          className="w-full rounded-md border px-3 py-2">
          <option value="">Select work</option>
          {workOptions.map((work) => (
            <option key={work.id} value={work.id}>
              {work.label}
            </option>
          ))}
        </select>

        {/* Unit Info */}
        {selectedWork && (
          <div className="text-sm text-light-text2 dark:text-dark-text2">
            Unit: {selectedWork.unit}
          </div>
        )}

        {/* Units */}
        {selectedWork?.unit === "hour" ? (
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-1/2 border px-3 py-2 rounded"
            />

            <input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-1/2 border px-3 py-2 rounded"
            />
          </div>
        ) : (
          <input
            type="number"
            placeholder={`Enter Number of ${selectedWork?.unit || "unit"}s`}
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
        )}

        {/* Cost */}
        <input
          type="number"
          placeholder={`Cost per ${selectedWork?.unit || "unit"}`}
          value={costPerUnit}
          onChange={(e) => setCostPerUnit(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />

        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />

        {/* Total */}
        <div className="font-semibold text-center text-light-text dark:text-dark-text">
          Total: ₹{totalAmount}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-500 py-2 text-white font-ui">
          {isEdit
            ? `${submitting ? "Updating" : "Update Work"}`
            : `${submitting ? "Adding" : "Add Work"}`}
        </button>
      </form>

      {/* Status */}
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

export default AddWork;
