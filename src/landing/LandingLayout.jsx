import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const LandingLayout = ({toggleTheme, theme }) => {
  return (
    <>
      <Navbar toggleTheme={toggleTheme} theme={theme}/>
      <Outlet />
    </>
  );
};

export default LandingLayout;
