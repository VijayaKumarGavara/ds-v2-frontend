import { Link, useLocation } from "react-router";
import HomeIcon from "@mui/icons-material/Home";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";

const DriverBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", to: "/driver", icon: <HomeIcon /> },
    
    {
      label: "Dues",
      to: "/driver/payment-dues",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      label: "History",
      to: "/driver/transactions",
      icon: <HistoryIcon />,
    },
  ];

  return (
    <nav
      className="
        fixed bottom-0 z-30 w-full
        md:hidden
        bg-light-card/95 dark:bg-dark-card/95
        backdrop-blur-md
        border-t border-light-border dark:border-dark-border
      "
    >
      <ul className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <li key={item.label}>
              <Link
                to={item.to}
                className={`
                  flex flex-col items-center gap-0.5
                  text-xs font-ui
                  ${
                    isActive
                      ? "text-brand-500"
                      : "text-light-text2 dark:text-dark-text2"
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DriverBottomNav;
