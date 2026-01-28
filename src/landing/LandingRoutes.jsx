import { Routes, Route } from "react-router";
import LandingLayout from "./LandingLayout";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Register from "./components/Register";

const LandingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Hero/>}></Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default LandingRoutes;
