import { useLocation } from "react-router";
import { useState } from "react";
import { API_URL } from "../../utils/constants";
const ProcurementFinalize = () => {
  const [cost_per_unit, setCost] = useState(0);
  const [procurementUpdate, setProcurementUpdate] = useState({
    procurement: null,
    due: null,
  });
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
      const response = await fetch(`${API_URL}/api/procurement/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request_id,
          cost_per_unit: Number(cost_per_unit),
        }),
      });
      if (!response.ok) {
        throw new Error("Error while finalizing the procurement..");
      }
      const jsonResponse = await response.json();
      setProcurementUpdate({
        ...procurementUpdate,
        procurement: jsonResponse?.data[0],
        due: jsonResponse?.data[1],
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <h1>Procurement Finalization</h1>
      <div>
        <div>
          {farmer_name}-{new Date(createdAt).toISOString().split("T")[0]}
        </div>
        <div>
          {crop_name}- {`${quantity} ${crop_units}`}
        </div>

        <input
          type="text"
          name="cost_per_unit"
          placeholder="0"
          onChange={(e) => setCost(e.target.value)}
          className="border "
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleCostAdd(request_id);
          }}>
          Finalize
        </button>
      </div>
    </>
  );
};

export default ProcurementFinalize;
