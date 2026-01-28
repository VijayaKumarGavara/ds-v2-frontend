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

const BuyerRoutes = () => {
  return (
    <Routes>
      <Route element={<BuyerLayout />}>
        {/* default buyer dashboard */}
        <Route index element={<Hero />} />
        <Route path="make-procurement" element={<FindFarmers />} />
        <Route
          path="procurement-requests"
          element={<ProcurementRequests />}
        />

        <Route
          path="procurement-finalize"
          element={<ProcurementFinalize />}
        />

        <Route
          path="finalized-procurements"
          element={<FinalizedProcurements />}
        />

        <Route path="payment-dues" element={<PaymentDues />} />

        <Route path="make-payment" element={<MakePayment />} />

        <Route path="transactions" element={<Transactions />} />
      </Route>
    </Routes>
  );
};

export default BuyerRoutes;
