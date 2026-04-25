import { useSelector } from "react-redux";
import { Link } from "react-router";
const Hero = () => {
  const farmer = useSelector((store) => store?.user?.farmer);

  return (
    <section className="w-full bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            Namaste, <span className="text-brand-500">{farmer?.farmer_name}</span>
          </h1>
          <p className="text-sm text-light-text2">
            Manage your farming activities
          </p>
        </div>

        {/* 🔹 PROCUREMENT SECTION */}
        <div className="mb-6">
          <h3 className="text-sm mb-2 text-light-text2">Procurement</h3>

          <div className="grid grid-cols-2 gap-3">
            <Link to="/farmer/procurement-requests" className="bg-light-card dark:bg-dark-card rounded-xl p-4 border hover:shadow-md transition text-sm font-medium">
              Pending Requests
            </Link>

            <Link to="/farmer/finalized-procurements" className="bg-light-card dark:bg-dark-card rounded-xl p-4 border hover:shadow-md transition text-sm font-medium">
              Sales
            </Link>

            <Link to="/farmer/payment-dues" className="bg-light-card dark:bg-dark-card rounded-xl p-4 border hover:shadow-md transition text-sm font-medium">
              Buyer Dues
            </Link>

            <Link to="/farmer/transactions" className="bg-light-card dark:bg-dark-card rounded-xl p-4 border hover:shadow-md transition text-sm font-medium">
              Transactions
            </Link>
          </div>
        </div>

        {/* 🔹 TRACTOR SECTION */}
        <div>
          <h3 className="text-sm mb-2 text-light-text2">Tractor Services</h3>

          <div className="grid grid-cols-2 gap-3">
            <Link to="/farmer/tractor-works" className="bg-light-card dark:bg-dark-card rounded-xl p-4 border hover:shadow-md transition text-sm font-medium">
              Work Records
            </Link>

            <Link to="/farmer/tractor-work-payment-dues" className="bg-light-card dark:bg-dark-card rounded-xl p-4 border hover:shadow-md transition text-sm font-medium">
              Tractor Dues
            </Link>

            <Link to="/farmer/tractor-work-transactions" className="bg-light-card dark:bg-dark-card rounded-xl p-4 border hover:shadow-md transition text-sm font-medium">
              Tractor Work Transactions
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
};
export default Hero;