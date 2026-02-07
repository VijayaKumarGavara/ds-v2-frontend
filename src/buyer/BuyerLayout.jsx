import { Outlet } from "react-router";
import Navbar from "./components/Navbar"; // or buyer-specific navbar
import BuyerBottomNav from "./components/BuyerBottomNav";

const BuyerLayout = ({ toggleTheme, theme }) => {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-4 md:px-8 bg-light-card dark:bg-dark-card">
        <Outlet context={{ theme, toggleTheme }} />
      </div>
      <BuyerBottomNav />
    </>
  );
};

export default BuyerLayout;
