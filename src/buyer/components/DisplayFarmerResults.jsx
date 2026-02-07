import { useNavigate } from "react-router";
import PersonIcon from "@mui/icons-material/Person";

const DisplayFarmerResults = ({ farmerResults }) => {
  const navigate = useNavigate();

  function handleSelect(farmer) {
    navigate("/buyer/make-procurement", {
      state: { farmer },
    });
  }

  return (
    <div className="mt-4 space-y-3">
      {farmerResults.map((farmer) => (
        <button
          key={farmer.farmer_id}
          type="button"
          onClick={() => handleSelect(farmer)}
          className="
            w-full
            flex items-center gap-4
            rounded-xl
            bg-light-card dark:bg-dark-card
            border border-light-border dark:border-dark-border
            px-4 py-3
            text-left
            hover:bg-light-bg dark:hover:bg-dark-bg
            transition
          "
        >
          {/* Avatar */}
          <div
            className="
              h-10 w-10
              rounded-full
              bg-brand-500/10
              text-brand-500
              flex items-center justify-center
              shrink-0
            "
          >
            <PersonIcon />
          </div>

          {/* Farmer Info */}
          <div className="flex-1">
            <div className="font-ui font-medium text-light-text dark:text-dark-text">
              {farmer.farmer_name}
            </div>
            <div className="text-sm text-light-text2 dark:text-dark-text2">
              {farmer.farmer_village} • {farmer.farmer_mobile}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default DisplayFarmerResults;
