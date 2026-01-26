const DisplayFarmerResults = ({ farmerResults, selectFarmer }) => {
  return (
    <>
      <div>
        {farmerResults.map((farmer) => {
          return (
            <div
              key={farmer.farmer_id}
              onClick={(e) => {
                e.preventDefault();
                selectFarmer(farmer);
              }}>
              <div className="border rounded-md m-2 px-4 max-w-max cursor-pointer">
                <div>
                  {farmer.farmer_name}-{farmer.farmer_village}
                </div>
                <div>{farmer.farmer_mobile}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DisplayFarmerResults;
