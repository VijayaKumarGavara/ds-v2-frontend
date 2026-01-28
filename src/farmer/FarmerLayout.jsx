import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const FarmerLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default FarmerLayout;
