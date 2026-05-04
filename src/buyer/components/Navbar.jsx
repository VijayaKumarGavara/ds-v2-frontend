import { Link } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


export default function Navbar() {
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

        {/* Profile Icon */}
        <div className="md:flex items-center font-medium text-light-text dark:text-dark-text">
          <Link
            to="/buyer/profile"
            className="p-2 rounded-lg hover:bg-light-card dark:hover:bg-dark-card transition-colors">
            <AccountCircleIcon fontSize="large" />
          </Link>
        </div>
      </div>
    </header>
  );
}
