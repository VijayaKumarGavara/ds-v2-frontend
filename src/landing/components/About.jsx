import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const About = () => {
  return (
    <section
      id="about"
      className="
        
        bg-light-bg dark:bg-dark-bg
        py-20 md:py-28
      "
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div>
          <h2
            className="
              font-heading
              text-3xl sm:text-4xl md:text-5xl
              font-bold
              tracking-tight
              text-light-text dark:text-dark-text
            "
          >
            Why Dhanya Sethu Exists
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
            Agricultural procurement often lacks structured tracking and
            transparency, leading to operational inefficiencies and
            payment confusion.
          </p>

          <p
            className="
              mt-6
              font-ui
              text-lg
              font-semibold
              text-brand-600
            "
          >
            Dhanya Sethu was built to simplify and structure this entire workflow.
          </p>
        </div>

        {/* Right Cards */}
        <div className="grid gap-6">
          {[
            {
              title: "Lack of Transparency",
              desc: "Unclear cost assignment and pricing visibility.",
            },
            {
              title: "Unstructured Records",
              desc: "Manual tracking leads to confusion and errors.",
            },
            {
              title: "Delayed Payment Tracking",
              desc: "No centralized system for monitoring dues.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="
                p-6
                rounded-2xl
                bg-light-card dark:bg-dark-card
                border border-light-border dark:border-dark-border
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-light-text2 dark:text-dark-text2"
                >
                  <ErrorOutlineIcon fontSize="small" />
                </span>

                <h3
                  className="
                    font-ui
                    text-lg
                    font-semibold
                    text-light-text dark:text-dark-text
                  "
                >
                  {item.title}
                </h3>
              </div>

              <p
                className="
                  mt-4
                  font-body
                  text-sm sm:text-base
                  leading-relaxed
                  text-light-text2 dark:text-dark-text2
                "
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;