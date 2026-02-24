import { Routes, Route } from "react-router";
import LandingLayout from "./LandingLayout";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";
const LandingRoutes = ({toggleTheme, theme}) => {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout toggleTheme={toggleTheme} theme={theme}/>}>
        <Route index element={<HomePage/>}></Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgetPassword/>}></Route>
      </Route>
    </Routes>
  );
};

export default LandingRoutes;
