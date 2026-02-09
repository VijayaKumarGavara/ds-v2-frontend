import { useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../../utils/constants";
import DisplayFarmerResults from "./DisplayFarmerResults";

const FindFarmers = () => {
  const navigate = useNavigate();

  const [formType, setFormType] = useState("mobile");
  const [hasSearched, setHasSearched] = useState(false);

  const [formData, setFormData] = useState({
    farmer_name: "",
    farmer_mobile: "",
    farmer_village: "",
    farmer_id: "",
  });

  const [farmerResults, setFarmerResults] = useState([]);

  async function handleSearch() {
    setHasSearched(true);
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/buyer/find-farmers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error while searching farmers.");
    }

    const json = await response.json();
    setFarmerResults(json.data || []);
  }

  function selectFarmer(farmer) {
    navigate("/buyer/make-procurement", {
      state: { farmer },
    });
  }

  return (
    <section
      className="max-w-md mx-auto
    min-h-[calc(100vh-80px)]
    px-4
    flex flex-col">
      {/* Title */}
      <h2 className="mt-2 mb-1 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Find Farmers
      </h2>
      <p className="mb-4 text-sm font-body text-light-text2 dark:text-dark-text2">
        Search and select a farmer to start procurement
      </p>

      {/* Search Card */}
      <div
        className="
          rounded-xl
          bg-light-card dark:bg-dark-card
          border border-light-border dark:border-dark-border
          px-4 py-4
          mb-6
        ">
        {/* Search Type */}
        <div className="flex gap-2 mb-4">
          {[
            { label: "Mobile", value: "mobile" },
            { label: "Name + Village", value: "name+village" },
            { label: "Farmer ID", value: "farmer_id" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setFormType(item.value);
                setHasSearched(false);
                setFarmerResults([]);
              }}
              className={`
                flex-1 rounded-full px-3 py-1.5 text-sm font-ui
                border
                ${
                  formType === item.value
                    ? "bg-brand-500 text-white border-brand-500"
                    : "border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                }
              `}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Search Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col gap-3 h-full">
          {formType === "name+village" && (
            <>
              <input
                type="text"
                name="farmer_name"
                placeholder="Farmer name"
                required
                value={formData.farmer_name}
                onChange={(e) =>
                  setFormData({ ...formData, farmer_name: e.target.value })
                }
                className="input-base"
              />
              <input
                type="text"
                name="farmer_village"
                placeholder="Village"
                required
                value={formData.farmer_village}
                onChange={(e) =>
                  setFormData({ ...formData, farmer_village: e.target.value })
                }
                className="input-base"
              />
            </>
          )}

          {formType === "mobile" && (
            <input
              type="text"
              name="farmer_mobile"
              placeholder="Mobile number"
              required
              value={formData.farmer_mobile}
              onChange={(e) =>
                setFormData({ ...formData, farmer_mobile: e.target.value })
              }
              className="input-base"
            />
          )}

          {formType === "farmer_id" && (
            <input
              type="text"
              name="farmer_id"
              placeholder="Farmer ID"
              required
              value={formData.farmer_id}
              onChange={(e) =>
                setFormData({ ...formData, farmer_id: e.target.value })
              }
              className="input-base border rounded-md px-2 py-1"
            />
          )}

          <button
            type="submit"
            className="
              mt-2 rounded-full
              bg-brand-500 hover:bg-brand-600
              py-2
              text-white font-ui font-medium
            ">
            Search Farmers
          </button>
        </form>
      </div>

      {/* Results */}
      {hasSearched && farmerResults.length > 0 && (
        <>
          <DisplayFarmerResults
            farmerResults={farmerResults}
            selectFarmer={selectFarmer}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-light-text2 dark:text-dark-text2">
              Can't find the farmer you're looking for?
            </p>
            <button
              onClick={() =>
                navigate("/buyer/register-farmer", {
                  state: { from: "find-farmers" },
                })
              }
              className="
                mt-2 rounded-full text-light-text dark:text-dark-text font-medium
                bg-brand-500 hover:bg-brand-600
                px-4 py-2 font-ui
              ">
              + Add Farmer & Continue
            </button>
          </div>
        </>
      )}

      {/* Empty State */}
      {hasSearched && farmerResults.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-light-text2 dark:text-dark-text2">
            No matching farmers found.
          </p>
          <button
            onClick={() =>
              navigate("/buyer/register-farmer", {
                state: { from: "find-farmers", searchPayload: formData },
              })
            }
            className="
              mt-3 rounded-full
              bg-brand-500 hover:bg-brand-600
              px-4 py-2 text-white font-ui
            ">
            + Add Farmer & Continue
          </button>
        </div>
      )}
    </section>
  );
};

export default FindFarmers;
