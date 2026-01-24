import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";

const FinalizedProcurements = () => {
  const [procurements, setProcurements] = useState([]);
  const buyer_id = "B123";
  useEffect(() => {
    async function fetchProcurements() {
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/procurements?buyer_id=${buyer_id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the procurements");
        }
        const jsonResponse = await response.json();
        setProcurements(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProcurements();
  }, []);
  return (
    <>
      <h1>FinalizedProcurements</h1>
      {procurements?.map((p) => {
        return (
            <div key={p.procurement_id}>
                <div>{p.farmer_name}-{p.total_amount}</div>
                <div>{p.crop_name}-{`${p.quantity}${p.crop_units} - @${p.cost_per_unit}/${p.crop_units}`}</div>
            </div>
        )
      })}
    </>
  );
};

export default FinalizedProcurements;
