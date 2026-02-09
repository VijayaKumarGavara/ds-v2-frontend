import { Link } from "react-router";
import { useSelector } from "react-redux";

const Hero = () => {
  const farmer = useSelector((store) => store?.user?.farmer);

  return (
    <section className="w-full bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold font-body text-light-text dark:text-dark-text">
            Namaste, <span className="text-primary">{farmer?.farmer_name}</span> 
          </h1>
          <p className="mt-2 text-sm sm:text-base text-light-text2 dark:text-dark-text2">
            Heres what's happening with your crops today
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <Link
            to="/farmer/procurement-requests"
            className="group bg-light-card dark:bg-dark-card rounded-xl p-4 
                       border border-light-border dark:border-dark-border
                       hover:shadow-md transition"
          >
            <p className="text-sm text-light-text2 dark:text-dark-text2">
              Pending
            </p>
            <h3 className="mt-1 text-lg font-semibold text-light-text dark:text-dark-text">
              Procurements
            </h3>
          </Link>

          <Link
            to="/farmer/finalized-procurements"
            className="group bg-light-card dark:bg-dark-card rounded-xl p-4 
                       border border-light-border dark:border-dark-border
                       hover:shadow-md transition"
          >
            <p className="text-sm text-light-text2 dark:text-dark-text2">
              Finalized
            </p>
            <h3 className="mt-1 text-lg font-semibold text-light-text dark:text-dark-text">
              Sales
            </h3>
          </Link>

          <Link
            to="/farmer/payment-dues"
            className="group bg-light-card dark:bg-dark-card rounded-xl p-4 
                       border border-light-border dark:border-dark-border
                       hover:shadow-md transition"
          >
            <p className="text-sm text-light-text2 dark:text-dark-text2">
              Payment
            </p>
            <h3 className="mt-1 text-lg font-semibold text-light-text dark:text-dark-text">
              Dues (₹)
            </h3>
          </Link>

          <Link
            to="/farmer/transactions"
            className="group bg-light-card dark:bg-dark-card rounded-xl p-4 
                       border border-light-border dark:border-dark-border
                       hover:shadow-md transition"
          >
            <p className="text-sm text-light-text2 dark:text-dark-text2">
              Last
            </p>
            <h3 className="mt-1 text-lg font-semibold text-light-text dark:text-dark-text">
              Payment
            </h3>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Hero;
