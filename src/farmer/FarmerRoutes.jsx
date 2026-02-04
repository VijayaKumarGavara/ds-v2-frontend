import { Routes, Route } from "react-router";
import FarmerLayout from "./FarmerLayout";
import Hero from "./components/Hero"
import ProcurementRequests from "./components/ProcurementRequests";
import Procurements from "./components/Procurements";
import PaymentDues from "./components/PaymentDues";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";

const FarmerRoutes = ({toggleTheme, theme}) => {
  return (
    <Routes>
      <Route element={<FarmerLayout toggleTheme={toggleTheme} theme={theme}/>}>
        {/* default farmer dashboard */}
        <Route index element={<Hero />} />

        <Route
          path="procurement-requests"
          element={<ProcurementRequests />}
        />

        <Route
          path="finalized-procurements"
          element={<Procurements />}
        />

        <Route path="payment-dues" element={<PaymentDues />} />

        <Route path="transactions" element={<Transactions />} />

        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default FarmerRoutes;
