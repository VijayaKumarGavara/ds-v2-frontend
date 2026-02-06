import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import FarmerBottomNav from "./components/FarmerBottomNav";
const FarmerLayout = ({ toggleTheme, theme }) => {
  return (
    <>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <Navbar/>

        {/* Content area */}
        <main className="pt-20 px-4 md:px-8">
          <Outlet context={{ theme, toggleTheme }}/>
        </main>

        <FarmerBottomNav/>
      </div>
    </>
  );
};

export default FarmerLayout;
