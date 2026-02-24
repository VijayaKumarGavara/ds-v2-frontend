// const steps = [
//   {
//     title: "Select or Register Farmer",
//     desc: "Buyers search existing farmers or instantly register new ones within the system.",
//   },
//   {
//     title: "Add Crop & Assign Cost",
//     desc: "Enter crop details, quantity, and finalize pricing per unit.",
//   },
//   {
//     title: "Finalize Procurement",
//     desc: "Structured procurement records are created or updated automatically.",
//   },
//   {
//     title: "Track Payments",
//     desc: "Manage dues, update payments, and maintain full transparency.",
//   },
//   {
//     title: "View Transaction Reports",
//     desc: "Access detailed procurement and transaction history anytime.",
//   },
// ];

const steps = [
  {
    title: "Access the Platform",
    desc: "Login or register to securely access your role-based dashboard.",
  },
  {
    title: "Select or Register Farmer",
    desc: "Search existing farmers or instantly add new ones to the system.",
  },
  {
    title: "Add Crop & Assign Cost",
    desc: "Enter crop details, quantity, and finalize pricing per unit.",
  },
  {
    title: "Finalize Procurement",
    desc: "Structured procurement records are created or updated automatically.",
  },
  {
    title: "Track Payments",
    desc: "Manage dues, update payments, and maintain full transparency.",
  },
  {
    title: "View Transaction Reports",
    desc: "Access detailed procurement and transaction history anytime.",
  },
];
const HowItWorks = () => {
  return (
    <section
      id="howitworks"
      className="
        py-16 md:py-20
        bg-light-card dark:bg-dark-card
      "
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className="
              font-heading
              text-3xl sm:text-4xl md:text-5xl
              font-bold
              tracking-tight
              text-light-text dark:text-dark-text
            "
          >
            How Procurement Works
          </h2>

          <p
            className="
              mt-6
              font-body
              text-base sm:text-lg
              leading-relaxed
              text-light-text2 dark:text-dark-text2
            "
          >
            A structured five-step digital process designed to bring clarity,
            organization, and transparency to agricultural procurement.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="
                relative
                p-8
                rounded-2xl
                border border-light-border dark:border-dark-border
                bg-light-bg dark:bg-dark-bg
                hover:shadow-md
                transition
              "
            >
              {/* Large Background Number */}
              <span
                className="
                  absolute
                  top-6 right-8
                  text-6xl
                  font-bold
                  opacity-5
                  text-light-text dark:text-dark-text
                  select-none
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3
                className="
                  font-ui
                  text-lg
                  font-semibold
                  text-light-text dark:text-dark-text
                "
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="
                  mt-4
                  font-body
                  text-sm sm:text-base
                  leading-relaxed
                  text-light-text2 dark:text-dark-text2
                "
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;