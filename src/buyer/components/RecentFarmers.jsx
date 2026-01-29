import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../../utils/constants";
const RecentFarmers = () => {
  const [recentFarmers, setRecentFarmers] = useState([]);
  const buyer_id = "B123";
  const navigate = useNavigate();

  function handleSelect(farmer) {
    navigate("/buyer/make-procurement", {
      state: { farmer },
    });
  }
  useEffect(() => {
    async function fetchRecentFarmers() {
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/recent-farmers?buyer_id=${buyer_id}`,
          {
            method: "GET",
            headers: { "Content-Type": "appication/json" },
          },
        );

        if (!response.ok) {
          throw new Error("Error while fetching your recent farmers.");
        }
        const jsonResponse = await response.json();
        setRecentFarmers(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
        console.error(error);
      }
    }
    fetchRecentFarmers();
  }, []);
  return (
    <>
      <div>RecentFarmers</div>
      <div>
        {recentFarmers.map((rf) => {
          return (
            <div
              key={rf.farmer_id}
              onClick={() => handleSelect(rf)}
              className="border rounded-md px-4 py-2 m-2 max-w-max cursor-pointer">
              <div>
                {rf.farmer_name} - {rf.farmer_mobile}
              </div>
              <div>
                {new Date(rf.lastPurchaseAt).toISOString().split("T")[0]}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentFarmers;
