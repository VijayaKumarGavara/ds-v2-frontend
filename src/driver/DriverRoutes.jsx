import { Routes, Route } from "react-router";
import DriverLayout from "./DriverLayout";
import Hero from "./components/Hero";

import PaymentDues from "./components/PaymentDues";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
import RecentFarmers from "./components/RecentFarmers";
import AddWork from "./components/AddWork";
import WorkRecords from "./components/WorkRecords";
import FindFarmers from "./components/FindFarmers";
import Register from "./components/RegisterFarmer";
import MakePayment from "./components/MakePayment";

const DriverRoutes = ({ toggleTheme, theme }) => {
  return (
    <Routes>
      <Route element={<DriverLayout toggleTheme={toggleTheme} theme={theme} />}>
        {/* default farmer dashboard */}
        <Route index element={<Hero />} />

        <Route path="recent-farmers" element={<RecentFarmers />} />

        <Route path="find-farmers" element={<FindFarmers />} />

        <Route path="add-work" element={<AddWork />} />

        <Route path="register-farmer" element={<Register />} />

        <Route path="work-records" element={<WorkRecords />} />

        <Route path="payment-dues" element={<PaymentDues />} />

        <Route path="make-payment" element={<MakePayment />} />

        <Route path="transactions" element={<Transactions />} />

        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default DriverRoutes;
