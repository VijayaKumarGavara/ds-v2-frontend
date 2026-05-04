import { Routes, Route } from "react-router";
import FarmerLayout from "./FarmerLayout";
import Hero from "./components/Hero";
import ProcurementRequests from "./components/ProcurementRequests";
import Procurements from "./components/Procurements";
import PaymentDues from "./components/PaymentDues";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
import TractorWorks from "./components/TractorWorks";
import TractorWorkDues from "./components/TractoWorkDues";
import TractorWorkTransactions from "./components/TractorWorkTransactions";
import WeatherForecast from "./components/WeatherForecast";

const FarmerRoutes = ({ toggleTheme, theme }) => {
  return (
    <Routes>
      <Route element={<FarmerLayout toggleTheme={toggleTheme} theme={theme} />}>
        {/* default farmer dashboard */}
        <Route index element={<Hero />} />

        <Route path="procurement-requests" element={<ProcurementRequests />} />

        <Route path="finalized-procurements" element={<Procurements />} />

        <Route path="payment-dues" element={<PaymentDues />} />

        <Route path="transactions" element={<Transactions />} />

        <Route path="weather" element={<WeatherForecast />} />

        {/* Tractor Work related */}
        <Route path="tractor-works" element={<TractorWorks />} />

        <Route path="tractor-work-payment-dues" element={<TractorWorkDues />} />

        <Route path="tractor-work-transactions" element={<TractorWorkTransactions/>}/>
        
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default FarmerRoutes;
