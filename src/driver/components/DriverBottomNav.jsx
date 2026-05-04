import { Link, useLocation } from "react-router";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const DriverBottomNav = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Primary nav items (always visible on mobile, prominent on desktop)
  const primaryNavItems = [
    { label: "Home", to: "/driver", icon: <HomeIcon /> },
    {
      label: "Add Work",
      to: "/driver/find-farmers",
      icon: <AgricultureIcon />,
    },
    { label: "Records", to: "/driver/work-records", icon: <InventoryIcon /> },
    {
      label: "Dues",
      to: "/driver/payment-dues",
      icon: <AccountBalanceWalletIcon />,
    },
  ];

  // Secondary items in "More" menu/sidebar
  const moreNavItems = [
    {
      label: "Recent Farmers",
      to: "/driver/recent-farmers",
      icon: <HistoryIcon />,
    },
    { label: "History", to: "/driver/transactions", icon: <HistoryIcon /> },
    { label: "Find Farmers", to: "/driver/find-farmers", icon: <SearchIcon /> },
    {
      label: "Add New Farmer",
      to: "/driver/register-farmer",
      icon: <PersonAddIcon />,
    },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation - Hidden on md+ */}
      <nav
        className="
          fixed bottom-0 z-30 w-full
          md:hidden
          bg-light-card/95 dark:bg-dark-card/95
          backdrop-blur-md
          border-t border-light-border dark:border-dark-border
        ">
        <ul className="flex justify-around items-center py-2">
          {primaryNavItems.map((item) => {
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
                  `}>
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
          {/* Mobile More Button */}
          <li>
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col items-center gap-0.5 text-xs font-ui text-light-text2 dark:text-dark-text2">
              <span className="text-xl">
                <MenuIcon />
              </span>
              More
            </button>
          </li>
        </ul>
      </nav>

      {/* Desktop Sidebar Navigation - Fixed left side */}
      <nav
        className="
          hidden md:flex
          fixed left-0 top-16 bottom-0 w-64
          flex-col
          bg-light-card/95 dark:bg-dark-card/95
          backdrop-blur-md
          border-r border-light-border dark:border-dark-border
          overflow-y-auto
        ">
        <div className="p-4">
          <h3 className="text-xs font-semibold text-light-text2 dark:text-dark-text2 uppercase tracking-wider mb-3">
            Main Menu
          </h3>
          <ul className="space-y-1">
            {primaryNavItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "bg-brand-500/10 text-brand-500"
                          : "text-light-text2 dark:text-dark-text2 hover:bg-light-bg dark:hover:bg-dark-bg"
                      }
                    `}>
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-4 pt-0">
          <h3 className="text-xs font-semibold text-light-text2 dark:text-dark-text2 uppercase tracking-wider mb-3">
            More Services
          </h3>
          <ul className="space-y-1">
            {moreNavItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "bg-brand-500/10 text-brand-500"
                          : "text-light-text2 dark:text-dark-text2 hover:bg-light-bg dark:hover:bg-dark-bg"
                      }
                    `}>
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Slide-in Sidebar Overlay */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Slide-in Sidebar */}
          <div className="fixed top-0 right-0 bottom-0 w-72 bg-light-card dark:bg-dark-card z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
              <h3 className="text-lg font-semibold">More Menu</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg">
                <CloseIcon />
              </button>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {moreNavItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-light-text2 dark:text-dark-text2 hover:bg-light-bg dark:hover:bg-dark-bg transition-colors">
                      <span className="text-xl">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DriverBottomNav;
