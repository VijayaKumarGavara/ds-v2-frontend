import { Link } from "react-router";
import { useSelector } from "react-redux";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import PaymentsIcon from "@mui/icons-material/Payments";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
const Hero = () => {
  const driver_name = useSelector((store) => store.user?.driver?.driver_name);
  return (
    <section
      className="relative w-full min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-80px)]
    lg:min-h-[calc(100vh-80px)]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-6">
          <h1 className="text-lg font-heading font-semibold text-light-text dark:text-dark-text">
            Hello, {driver_name}
          </h1>
          <p className="text-sm font-body text-light-text2 dark:text-dark-text2">
            Ready to add your Tractor Works?
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {/* Add Tractor Work (Primary) */}
          <Link
            to="/driver/find-farmers"
            className="
            col-span-2 sm:col-span-3
            rounded-2xl
            bg-brand-500
            text-white
            px-5 py-6
            flex items-center gap-4
            shadow-sm
            hover:bg-brand-600
            transition
          ">
            <AddCircleOutlineIcon fontSize="large" />
            <div>
              <div className="font-ui font-semibold text-base">
                Add Tractor Work
              </div>
              <div className="text-sm opacity-90">
                Find farmers & add works
              </div>
            </div>
          </Link>

          {/* Find Farmers */}
          <Link
            to="/driver/find-farmers"
            className="
            rounded-xl
            bg-light-bg dark:bg-dark-bg
            border border-light-border dark:border-dark-border
            px-4 py-5
            flex flex-col gap-2
            hover:shadow-sm
            transition
          ">
            <SearchIcon className="text-brand-500" />
            <div className="font-ui font-medium text-light-text dark:text-dark-text">
              Find Farmers
            </div>
            <div className="hidden sm:block text-sm text-light-text2 dark:text-dark-text2">
              Search nearby farmers
            </div>
          </Link>

          {/* Recent Farmers */}
          <Link
            to="/driver/recent-farmers"
            className="
            rounded-xl
            bg-light-bg dark:bg-dark-bg
            border border-light-border dark:border-dark-border
            px-4 py-5
            flex flex-col gap-2
            hover:shadow-sm
            transition
          ">
            <HistoryIcon className="text-brand-500" />
            <div className="font-ui font-medium text-light-text dark:text-dark-text">
              Recent Farmers
            </div>
            <div className="hidden sm:block text-sm text-light-text2 dark:text-dark-text2">
              Quickly repeat procurements
            </div>
          </Link>
          <Link
            to="/driver/register-farmer"
            state={{ from: "home" }}
            className="rounded-xl
            bg-light-bg dark:bg-dark-bg
            border border-light-border dark:border-dark-border
            px-4 py-5
            flex flex-col gap-2
            hover:shadow-sm
            transition">
            <PersonAddAltTwoToneIcon className="text-brand-500" />

            <div className="font-ui font-medium text-light-text dark:text-dark-text">
              Add New Farmer
            </div>
            <div className="hidden sm:block text-sm text-light-text2 dark:text-dark-text2">
              Register a new Farmer to Buy from them.
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
