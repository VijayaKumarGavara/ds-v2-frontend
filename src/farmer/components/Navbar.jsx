import { Link } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";



export default function Navbar() {
  const menuItems = [
    { label: "Home", to: "/farmer" },
    { label: "Procurement Requests", to: "/farmer/procurement-requests" },
    { label: "Procurements", to: "/farmer/finalized-procurements" },
    { label: "Payment Dues", to: "/farmer/payment-dues" },
    { label: "History", to: "/farmer/transactions" },
  ];

  return (
    <header
      className="
        fixed top-0 z-30 w-full
        backdrop-blur-md
        bg-light-bg/80 dark:bg-dark-bg/80
        border-b border-light-border dark:border-dark-border
      ">
      <div className="flex items-center justify-between px-6 md:px-10 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 rounded-md bg-brand-500">
            <img src="/DS_new.png" alt="Dhanya Sethu Logo" />
          </div>
          <span className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-light-text dark:text-dark-text">
            Dhanya Sethu
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-body font-medium text-light-text dark:text-dark-text">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="transition hover:text-light-text2 hover:dark:text-dark-text2">
              {" "}
              {item.label}{" "}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className=" md:flex items-center font-medium text-light-text dark:text-dark-text">
          <Link to="/farmer/profile">
            <AccountCircleIcon fontSize="large" />
          </Link>
        </div>
      </div>
    </header>
  );
}
