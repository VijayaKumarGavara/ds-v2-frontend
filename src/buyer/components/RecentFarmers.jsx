import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../../utils/constants";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const RecentFarmers = () => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);
  const buyer_id = "B123"; // replace later

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/buyer/recent-farmers?buyer_id=${buyer_id}`,
        );
        const json = await res.json();
        setFarmers(json?.data || []);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  function handleSelectFarmer(farmer) {
    navigate("/buyer/make-procurement", {
      state: { farmer },
    });
  }

  return (
    <section className="max-w-md mx-auto px-4 min-h-screen">
      <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Recent Farmers
      </h2>

      {farmers.length === 0 && (
        <div className="text-sm text-light-text2 dark:text-dark-text2">
          No recent farmers yet.
        </div>
      )}

      <ul className="divide-y divide-light-border dark:divide-dark-border">
        {farmers.map((farmer) => (
          <li
            key={farmer.farmer_id}
            onClick={() => handleSelectFarmer(farmer)}
            className="
              flex items-center gap-4
              py-4
              cursor-pointer
              hover:bg-light-bg dark:hover:bg-dark-bg
              transition
            ">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center">
              {farmer.farmer_image_path ? (
                <img
                  src={farmer.farmer_image_path}
                  alt={farmer.farmer_name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-lg font-heading font-bold text-brand-500">
                  {farmer.farmer_name?.[0]}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="font-ui font-medium text-light-text dark:text-dark-text truncate">
                {farmer.farmer_name}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-light-text2 dark:text-dark-text2">
                  {farmer.farmer_village}
                </div>

                {farmer.lastPurchaseAt && (
                  <div className="text-xs text-light-text2 dark:text-dark-text2 mt-0.5">
                    {new Date(farmer.lastPurchaseAt).toLocaleDateString(
                      "en-GB",
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Chevron */}
            <ChevronRightIcon className="text-light-text2 dark:text-dark-text2" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentFarmers;
