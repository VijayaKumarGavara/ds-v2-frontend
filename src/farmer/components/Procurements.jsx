import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";
const Procurements = () => {
  const [procurements, setProcurements] = useState([]);
  const farmer_id = "F1769576873058";
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/farmer/sales/finalized?farmer_id=${farmer_id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the procurement requests");
        }
        const jsonResponse = await response.json();
        setProcurements(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <>
      <div>Procurements</div>
      {procurements.map((p, index) => {
        return (
          <div key={index}>
            <div>
              {p.buyer_name}-
              {new Date(p.finalizedAt).toISOString().split("T")[0]}
            </div>
            <div>
              {p.crop_name}-
              {`${p.quantity} ${p.crop_units}  @${p.cost_per_unit}/${p.crop_units}`}
            </div>
            <div className="text-green-500 font-medium ">Total Amount: {p.total_amount}</div>
          </div>
        );
      })}
    </>
  );
};

export default Procurements;
