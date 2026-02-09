import { useNavigate } from "react-router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { API_URL, CLOUDINARY_URL } from "../../utils/constants";
const RequestCard = ({ request }) => {
  const navigate = useNavigate();
  const { farmer_name, farmer_id, crop_name, crop_units, quantity, createdAt } =
    request;

  const date = new Date(createdAt).toLocaleDateString("en-GB");

  function handleFinalize() {
    navigate("/buyer/procurement-finalize", {
      state: { request },
    });
  }

  return (
    <li
      onClick={handleFinalize}
      className="
        flex items-center gap-4
        py-4
        cursor-pointer
        hover:bg-light-bg dark:hover:bg-dark-bg
        transition
      ">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center">
        {request.farmer_image_path ? (
          <img
            src={`${CLOUDINARY_URL}${request.farmer_image_path}`}
            alt={request.farmer_name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-lg font-heading font-bold text-brand-500">
            {request.farmer_name?.[0]}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="font-ui font-medium text-light-text dark:text-dark-text truncate">
          {farmer_name}
        </div>

        <div className="text-sm text-light-text2 dark:text-dark-text2">
          {crop_name} • {quantity} {crop_units}
        </div>

        <div className="text-xs text-light-text2 dark:text-dark-text2 mt-0.5">
          Requested on {date}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleFinalize();
        }}
        className="
          text-sm font-ui font-medium
          text-brand-500
          hover:underline
        ">
        Finalize
      </button>

      <ChevronRightIcon className="text-light-text2 dark:text-dark-text2" />
    </li>
  );
};

export default RequestCard;
