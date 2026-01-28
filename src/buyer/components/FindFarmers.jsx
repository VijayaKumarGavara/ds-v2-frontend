import { useState } from "react";
import { API_URL } from "../../utils/constants";
import DisplayFarmerResults from "./DisplayFarmerResults";
import MakeProcurement from "./MakeProcurement";

const FindFarmers = () => {
  const [formType, setFormType] = useState("mobile");
  const [formData, setFormData] = useState({
    farmer_name: "",
    farmer_mobile: "",
    farmer_village: "",
    farmer_id: "",
  });

  const [farmerResults, setFarmerResults] = useState([]);

  let [farmerSelected, setFarmerSelected] = useState(null);

  async function handleSearch() {
    const response = await fetch(`${API_URL}/api/buyer/find-farmers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error while searching farmers.");
    }
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    setFarmerResults(jsonResponse.data);
  }

  function selectFarmer(farmerDetails) {
    setFarmerSelected(farmerDetails);
  }
  function unSelectFarmer() {
    setFarmerSelected(null);
    setFarmerResults([]); 
    setFormData({
      farmer_name: "",
      farmer_mobile: "",
      farmer_village: "",
      farmer_id: "",
    });
  }

  return (
    <>
      {!farmerSelected && (
        <div>
          <h1>FindFarmers</h1>
          <div>
            <input
              type="radio"
              name="formType"
              value="name+village"
              checked={formType === "name+village"}
              onChange={(e) => setFormType(e.target.value)}
            />
            <label>Name + Village</label>

            <input
              type="radio"
              name="formType"
              value="mobile"
              checked={formType === "mobile"}
              onChange={(e) => setFormType(e.target.value)}
            />
            <label>Mobile</label>

            <input
              type="radio"
              name="formType"
              value="farmer_id"
              checked={formType === "farmer_id"}
              onChange={(e) => setFormType(e.target.value)}
            />
            <label>Farmer Id</label>
          </div>

          <form
            method="post"
            className="flex flex-col gap-4 mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}>
            {formType === "name+village" && (
              <div className="flex flex-col w-52 gap-4">
                <input
                  type="text"
                  name="farmer_name"
                  value={formData.farmer_name}
                  placeholder="Farmer Name"
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="border rounded-md px-2"
                />
                <input
                  type="text"
                  name="farmer_village"
                  value={formData.farmer_village}
                  placeholder="Farmer Village"
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="border rounded-md px-2"
                />
              </div>
            )}
            {formType === "mobile" && (
              <input
                type="text"
                name="farmer_mobile"
                value={formData.farmer_mobile}
                placeholder="Farmer Mobile"
                required
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="border rounded-md px-2 w-52"
              />
            )}
            {formType === "farmer_id" && (
              <input
                type="text"
                name="farmer_id"
                value={formData.farmer_id}
                placeholder="Farmer Id"
                required
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="border rounded-md px-2 w-52"
              />
            )}

            <button
              type="submit"
              className="border rounded-md px-2 py-1 max-w-min">
              Search
            </button>
          </form>
        </div>
      )}

      {!farmerSelected && farmerResults.length > 0 && (
        <DisplayFarmerResults
          farmerResults={farmerResults}
          selectFarmer={selectFarmer}
        />
      )}

      {farmerSelected && (
        <MakeProcurement
          farmerSelected={farmerSelected}
          unSelectFarmer={unSelectFarmer}
        />
      )}
    </>
  );
};

export default FindFarmers;
