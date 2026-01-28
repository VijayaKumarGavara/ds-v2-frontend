import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";
const ProcurementRequests = () => {
  const [procurementRequests, setProcurementRequests] = useState([]);
  const farmer_id = "F1769576873058";
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/farmer/sales?farmer_id=${farmer_id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the procurement requests");
        }
        const jsonResponse = await response.json();
        setProcurementRequests(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <>
      <div>ProcurementRequests</div>
      {procurementRequests.map((r, index) => {
        return (
          <div key={index}>
            <div>
              {r.buyer_name}-{new Date(r.createdAt).toISOString().split("T")[0]}
            </div>
            <div>
              {r.crop_name}-{`${r.quantity} ${r.crop_units}`}
            </div>
            <div className="text-red-500 font-medium ">{r.status}</div>
          </div>
        );
      })}
    </>
  );
};

export default ProcurementRequests;
