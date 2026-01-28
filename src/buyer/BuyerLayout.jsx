import { Outlet } from "react-router";
import Navbar from "./components/Navbar"; // or buyer-specific navbar

const BuyerLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default BuyerLayout;
