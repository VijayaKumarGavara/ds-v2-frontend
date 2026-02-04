import { Outlet } from "react-router";
import Navbar from "./components/Navbar"; // or buyer-specific navbar

const BuyerLayout = ({toggleTheme, theme }) => {
  return (
    <>
      <Navbar toggleTheme={toggleTheme} theme={theme}/>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default BuyerLayout;
