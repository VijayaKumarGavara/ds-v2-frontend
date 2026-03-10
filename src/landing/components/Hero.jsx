import bgImage from "/hero-bg.jpg";
import { Link } from "react-router";
import {  useNavigate } from "react-router";
const Hero = () => {

  

  const navigate = useNavigate();

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Gradient overlay */}
      <div
        className="
    absolute inset-0
    bg-gradient-to-b
    from-light-bg/70 via-light-bg/40 to-transparent
    dark:from-dark-bg/90 dark:via-dark-bg/70 dark:to-transparent
  "
      />
      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="max-w-3xl text-center md:text-left">
            {/* Heading */}
            <h1
              className="
              font-heading text-center mt-6 sm:mt-10
              text-2xl md:text-3xl lg:text-5xl
              font-bold tracking-tight leading-tight
              text-light-text dark:text-dark-text
            ">
              Bringing trust and transprency to agricultural procurement.
            </h1>

            {/* Sub text */}
            <p
              className="
              mt-6 px-2 font-body text-center font-medium
              text-sm md:text-xl leading-relaxed
              text-light-text dark:text-dark-text
            ">
              Dhanya Sethu helps buyers & farmers, to manage procurements, dues,
              and payment records through a structured and transparent system.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-center sm:flex-row gap-4 justify-center ">
              <Link
                to="/register"
                className="
                  rounded-full max-w-max
                  bg-brand-500 hover:bg-brand-600
                  px-8 py-3
                  text-base font-ui font-medium
                  text-white
                  transition
                ">
                Get Started
              </Link>

              <button
                onClick={() => {
                  handleScroll("about");
                }}
                className="
                  rounded-full max-w-max
                  border border-light-border 
                  px-8 py-3
                  text-base font-ui font-medium
                  text-light-text dark:text-dark-text
                  bg-light-bg/80 dark:bg-dark-bg/50
                  transition hover:bg-light-card/40 dark:hover:bg-dark-card/40
                ">
                Our Solutions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
