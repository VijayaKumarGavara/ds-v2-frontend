import { BrowserRouter, Routes, Route } from "react-router";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import LandingRoutes from "./landing/LandingRoutes";
import BuyerRoutes from "./buyer/BuyerRoutes";
import FarmerRoutes from "./farmer/FarmerRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/*" element={<LandingRoutes />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="buyer" />}>
          <Route path="/buyer/*" element={<BuyerRoutes />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="farmer" />}>
          <Route path="/farmer/*" element={<FarmerRoutes />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
