import { Routes, Route } from "react-router";
import DriverLayout from "./DriverLayout";
import Hero from "./components/Hero"

import PaymentDues from "./components/PaymentDues";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";

const DriverRoutes = ({toggleTheme, theme}) => {
  return (
    <Routes>
      <Route element={<DriverLayout toggleTheme={toggleTheme} theme={theme}/>}>
        {/* default farmer dashboard */}
        <Route index element={<Hero />} />


        <Route path="payment-dues" element={<PaymentDues />} />

        <Route path="transactions" element={<Transactions />} />

        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default DriverRoutes;
