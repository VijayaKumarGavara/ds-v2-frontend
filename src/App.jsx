import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import LandingRoutes from "./landing/LandingRoutes";
import BuyerRoutes from "./buyer/BuyerRoutes";
import FarmerRoutes from "./farmer/FarmerRoutes";
import AuthLoader from "./AuthLoader";
import appStore from "./store/appStore";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Read theme from localStorage on app load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme || "light";

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <AuthLoader />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route
              path="/*"
              element={
                <LandingRoutes toggleTheme={toggleTheme} theme={theme} />
              }
            />
          </Route>

          <Route element={<ProtectedRoute allowedRole="buyer" />}>
            <Route
              path="/buyer/*"
              element={<BuyerRoutes toggleTheme={toggleTheme} theme={theme} />}
            />
          </Route>

          <Route element={<ProtectedRoute allowedRole="farmer" />}>
            <Route
              path="/farmer/*"
              element={<FarmerRoutes toggleTheme={toggleTheme} theme={theme} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
