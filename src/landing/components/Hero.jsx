import bgImage from "/hero-bg.jpg";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Gradient overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-light-bg/10 via-light-bg/10 to-brand-700/40 blur-sm
          dark:from-dark-bg/80 dark:via-dark-bg/60 dark:to-dark-bg/70
        "
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="max-w-3xl text-center md:text-left">
            {/* Heading */}
            <h1 className="
              font-heading
              text-4xl md:text-5xl lg:text-6xl
              font-bold tracking-tight leading-tight
              text-light-text dark:text-dark-text
            ">
              Bringing clarity and trust to agricultural procurement.
            </h1>

            {/* Sub text */}
            <p className="
              mt-6 font-body text-center font-medium
              text-lg md:text-xl leading-relaxed
              text-light-text dark:text-dark-text
            ">
              Dhanya Sethu helps buyers manage procurements, farmer dues, and
              payments through a structured and transparent system.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-center sm:flex-row gap-4 justify-center ">
              <Link
                to="/login"
                className="
                  rounded-full max-w-max
                  bg-brand-500 hover:bg-brand-600
                  px-8 py-3
                  text-base font-ui font-medium
                  text-white
                  transition
                "
              >
                Login
              </Link>

              <a
                href="#solutions"
                className="
                  rounded-full max-w-max
                  border border-light-border 
                  px-8 py-3
                  text-base font-ui font-medium
                  text-light-text dark:text-dark-text
                  transition hover:bg-light-card/40 dark:hover:bg-dark-card/40
                "
              >
                Our Solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
