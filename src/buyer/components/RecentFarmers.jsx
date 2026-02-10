import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { API_URL, CLOUDINARY_URL } from "../../utils/constants";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const RecentFarmers = () => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);
  const [originalFarmersList, setOriginalFarmersList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const buyer_id = useSelector((store) => store.user?.buyer?.buyer_id);
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/buyer/recent-farmers?buyer_id=${buyer_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const json = await res.json();
        const list = json?.data || [];
        setOriginalFarmersList(list);
        setFarmers(list);
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
  function getSearchResults(searchText) {
    let s = searchText.trim().toLowerCase();
    let filtered = farmers.filter((farmer) => {
      return (
        farmer.farmer_name.toLowerCase().includes(s) ||
        farmer.farmer_village.toLowerCase().includes(s) ||
        farmer.farmer_mobile.includes(s)
      );
    });
    return filtered;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchText.trim()) {
        setFarmers(originalFarmersList);
        return;
      }

      setFarmers(getSearchResults(searchText));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, originalFarmersList]);

  return (
    <section className="max-w-md mx-auto px-4 min-h-screen">
      <h2 className="mb-4 text-center text-lg font-heading font-semibold text-light-text dark:text-dark-text">
        Recent Farmers
      </h2>

      {originalFarmersList.length === 0 && (
        <div className="text-sm text-light-text2 dark:text-dark-text2">
          No recent farmers yet.
        </div>
      )}
      {farmers.length >= 0 && (
        <div className="relative">
          <input
            type="text"
            name="searchText"
            placeholder="Search Farmer Name, Mobile, Village"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="
              w-full rounded-md px-2 py-2 pr-16
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text
              placeholder:text-light-text2 dark:placeholder:text-dark-text2
              font-body
            "
          />
          <button
            type="button"
            hidden={!searchText}
            title="clear"
            onClick={() => {
              setSearchText("");
              setFarmers(originalFarmersList);
            }}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
               font-ui
              text-light-text2 dark:text-dark-text2
                font-medium px-4 text-xl
            ">
            X
          </button>
        </div>
      )}

      {originalFarmersList.length > 0 && farmers.length === 0 && (
        <div>No farmers match your search.</div>
      )}
      <ul className="mt-5 divide-y divide-light-border dark:divide-dark-border">
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
                  src={`${CLOUDINARY_URL}${farmer.farmer_image_path}`}
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
                    Last: {new Date(farmer.lastPurchaseAt).toLocaleDateString(
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
