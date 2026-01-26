import { useState } from "react";
import { API_URL } from "../../utils/constants";

const MakeProcurement = ({ farmerSelected, unSelectFarmer }) => {
  const { farmer_id, farmer_name, farmer_village } = farmerSelected;
  const buyer_id = "B123";
  const [selectedCropName, setSelectedCropName] = useState("");
  const [cropDetails, setCropDetails] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleProcurementSubmit(e) {
    e.preventDefault();
    const procurementRequestInfo = {
      farmer_id,
      buyer_id,
      crop_id: cropDetails?.crop_id,
      quantity,
    };
    try {
      const response = await fetch(`${API_URL}/api/procurement-request/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(procurementRequestInfo),
      });

      if (!response.ok) {
        throw new Error("Error while adding the procurement.!");
      }
      const jsonResponse = await response.json();
      setStatusMessage(
        `Procurement added: ${cropDetails.crop_name} (${quantity} ${cropDetails.crop_units})`,
      );

      setSelectedCropName("");
      setCropDetails(null);
      setQuantity("");

      setTimeout(() => {
        setStatusMessage("");
        unSelectFarmer(); 
      }, 10000); 
    } catch (error) {
      console.log(error.message);
    }
  }
  async function fetchUnits(crop_name) {
    try {
      const response = await fetch(
        `${API_URL}/api/crop/get-units?crop_name=${crop_name}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        throw new Error("Error while getting the units.");
      }

      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setCropDetails(jsonResponse.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div>MakeProcurement</div>
      <div>
        {farmer_name}-{farmer_village}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            unSelectFarmer();
          }}>
          Edit
        </button>
      </div>

      <div>
        <form method="post" onSubmit={handleProcurementSubmit}>
          <label htmlFor="crop_name">Select</label>
          <select
            name="crop_name"
            value={selectedCropName}
            onChange={(e) => {
              const crop = e.target.value;
              setSelectedCropName(crop);
              fetchUnits(crop);
            }}>
            <option value="">Crop Name</option>
            <option value="maize">Mokka Jonna</option>
            <option value="groundnut">Veru Senaga</option>
            <option value="paddy">Vari</option>
            <option value="chilli">Mirapa</option>
          </select>

          {cropDetails && (
            <>
              <div>
                {cropDetails.crop_name} - {cropDetails.crop_units}
              </div>

              <div>
                <input
                  type="text"
                  name="quantity"
                  value={quantity}
                  placeholder={`No. of ${cropDetails.crop_units}`}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <button type="submit">Add Procurement</button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCropName("");
                  setCropDetails(null);
                  setQuantity("");
                }}>
                Clear
              </button>
            </>
          )}
        </form>
      </div>

      {statusMessage && (
        <div className="text-green-600 mt-2">{statusMessage}</div>
      )}
    </>
  );
};

export default MakeProcurement;
