import { Link } from "react-router";

const RequestCard = ({ request }) => {
  const {
    farmer_name,
    crop_name,
    crop_units,
    quantity,
    createdAt,
  } = request;
  return (
    <>
      <div>
        <div>
          {farmer_name}-{new Date(createdAt).toISOString().split("T")[0]}
        </div>
        <div>
          {crop_name}- {`${quantity} ${crop_units}`}
        </div>
        <Link to="/buyer/procurement-finalize" state={{request}}>
          Finalize
        </Link>
      </div>
    </>
  );
};

export default RequestCard;
