import { Link, useNavigate } from "react-router";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
export default function Navbar({ toggleTheme, theme }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  }
  return (
    <header className="flex px-10 items-center">
      <div className="flex px-10 py-2 items-center gap-4">
        <div className="w-10 rounded-md bg-slate-300">
          <img src="/DS_new.png" alt="Dhanya Sethu Logo" />
        </div>
        <div className="text-4xl font-medium">Dhanya Sethu</div>
      </div>

      <nav className="flex list-none gap-8">
        <Link to="/buyer">Home</Link>
        <Link to="/buyer/recent-farmers">Recent Farmers</Link>
        <Link to="/buyer/find-farmers">Make Procurement</Link>
        <Link to="/buyer/procurement-requests">
          <li>Procurement Requests</li>
        </Link>

        <Link to="/buyer/finalized-procurements">
          <li>Procurements</li>
        </Link>

        <Link to="/buyer/payment-dues">
          <li>Payment Dues</li>
        </Link>

        <Link to="/buyer/transactions">
          <li>History</li>
        </Link>

        <button onClick={handleLogout} className="text-red-600 font-medium">
          Logout
        </button>

        <button
          onClick={toggleTheme}
          className="rounded-full text-light-text dark:text-dark-text px-3 py-1 text-sm font-ui"
          aria-label="Toggle theme">
          {theme !== "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
      </nav>
    </header>
  );
}
