import { Routes, Route } from "react-router";
import LandingLayout from "./LandingLayout";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";
const LandingRoutes = ({toggleTheme, theme}) => {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout toggleTheme={toggleTheme} theme={theme}/>}>
        <Route index element={<Hero/>}></Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgetPassword/>}></Route>
      </Route>
    </Routes>
  );
};

export default LandingRoutes;
