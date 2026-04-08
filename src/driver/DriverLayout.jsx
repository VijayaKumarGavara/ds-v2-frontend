import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import DriverBottomNav from "./components/DriverBottomNav";
const DriverLayout = ({ toggleTheme, theme }) => {
  return (
    <>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <Navbar/>

        {/* Content area */}
        <main className="pt-20 px-4 md:px-8">
          <Outlet context={{ theme, toggleTheme }}/>
        </main>

        <DriverBottomNav/>
      </div>
    </>
  );
};

export default DriverLayout;
