import { Routes, Route } from "react-router";
import BuyerLayout from "./BuyerLayout";

import FindFarmers from "./components/FindFarmers";
import ProcurementRequests from "./components/ProcurementRequests";
import ProcurementFinalize from "./components/ProcurementFinalize";
import FinalizedProcurements from "./components/FinalizedProcurements";
import PaymentDues from "./components/PaymentDues";
import MakePayment from "./components/MakePayment";
import Transactions from "./components/Transactions";
import Hero from "./components/Hero";
import RecentFarmers from "./components/RecentFarmers";
import MakeProcurement from "./components/MakeProcurement";
import Profile from "./components/Profile"
import Register from "./components/RegisterFarmer";
const BuyerRoutes = ({ toggleTheme, theme }) => {
  return (
    <Routes>
      <Route element={<BuyerLayout toggleTheme={toggleTheme} theme={theme} />}>
        {/* default buyer dashboard */}
        <Route index element={<Hero />} />

        <Route path="recent-farmers" element={<RecentFarmers />}></Route>

        <Route path="find-farmers" element={<FindFarmers />} />
        <Route path="make-procurement" element={<MakeProcurement />}></Route>
        <Route path="register-farmer" element={<Register/>}></Route>
        <Route path="procurement-requests" element={<ProcurementRequests />} />

        <Route path="procurement-finalize" element={<ProcurementFinalize />} />

        <Route
          path="finalized-procurements"
          element={<FinalizedProcurements />}
        />

        <Route path="payment-dues" element={<PaymentDues />} />

        <Route path="make-payment" element={<MakePayment />} />

        <Route path="transactions" element={<Transactions />} />

        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default BuyerRoutes;
