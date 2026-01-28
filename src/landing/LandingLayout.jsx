import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const LandingLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default LandingLayout;
