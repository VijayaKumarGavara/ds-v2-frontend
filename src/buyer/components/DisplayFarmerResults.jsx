import { Link } from "react-router";
const DisplayFarmerResults = ({ farmerResults }) => {
  return (
    <>
      <div>
        {farmerResults.map((farmer) => {
          return (
            <Link key={farmer.farmer_id} to="/">
              <div className="border rounded-md m-2 px-4 max-w-max">
                <div>
                  {farmer.farmer_name}-{farmer.farmer_village}
                </div>
                <div>{farmer.farmer_mobile}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default DisplayFarmerResults;
