import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import SecurityIcon from "@mui/icons-material/Security";
import HistoryIcon from "@mui/icons-material/History";
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
const features = [
  {
    icon: <DashboardIcon fontSize="small" />,
    title: "Role-Based Dashboards",
    desc: "Separate structured dashboards for buyers and farmers.",
  },
  {
    icon: <ReceiptLongIcon fontSize="small" />,
    title: "Structured Procurement Records",
    desc: "Create and maintain organized digital procurement entries.",
  },
  {
    icon: <PaymentsIcon fontSize="small" />,
    title: "Farmer Dues Management",
    desc: "Track pending dues and update payments systematically.",
  },
  {
    icon: <HistoryIcon fontSize="small" />,
    title: "Transaction Reports",
    desc: "Access detailed procurement and transaction history anytime.",
  },
  {
    icon: <SecurityIcon fontSize="small" />,
    title: "Secure Authentication",
    desc: "Protected login system with structured user roles.",
  },
  {
    icon: <StorageRoundedIcon fontSize="small" />,
    title: "Structured Data Management",
    desc: "Maintain organized procurement, dues, and transaction records with relational consistency.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="
        py-20 md:py-28
        bg-light-bg dark:bg-dark-bg
      ">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className="
              font-heading
              text-3xl sm:text-4xl md:text-5xl
              font-bold
              tracking-tight
              text-light-text dark:text-dark-text
            ">
            Platform Features
          </h2>

          <p
            className="
              mt-6
              font-body
              text-base sm:text-lg
              leading-relaxed
              text-light-text2 dark:text-dark-text2
            ">
            Designed to simplify procurement management through structured
            digital workflows and transparent record keeping.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                flex gap-5
                p-6
                rounded-2xl
                bg-light-card dark:bg-dark-card
                border border-light-border dark:border-dark-border
                hover:shadow-sm
                transition
              ">
              <div
                className="
                  flex-shrink-0
                  h-10 w-10
                  flex items-center justify-center
                  rounded-xl
                  bg-brand-500/10
                  text-brand-600
                ">
                {feature.icon}
              </div>

              <div>
                <h3
                  className="
                    font-ui
                    text-lg
                    font-semibold
                    text-light-text dark:text-dark-text
                  ">
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-2
                    font-body
                    text-sm sm:text-base
                    leading-relaxed
                    text-light-text2 dark:text-dark-text2
                  ">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
