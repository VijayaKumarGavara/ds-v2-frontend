import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProcurementRequests from "../buyer/components/ProcurementRequests";
import ProcurementFinalize from "../buyer/components/ProcurementFinalize";
import FinalizedProcurements from "../buyer/components/FinalizedProcurements";
import PaymentDues from "../buyer/components/PaymentDues";
import MakePayment from "../buyer/components/MakePayment";

function LandingLayout() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function LandingPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayout />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/procurement-requests"
            element={<ProcurementRequests />}></Route>
          <Route
            path="/procurement-finalize"
            element={<ProcurementFinalize />}></Route>
          <Route
            path="/finalized-procurements"
            element={<FinalizedProcurements />}></Route>
          <Route path="/payment-dues" element={<PaymentDues />}></Route>
          <Route path="/make-payment" element={<MakePayment />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
