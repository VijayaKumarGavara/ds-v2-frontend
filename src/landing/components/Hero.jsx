import bgImage from "../../assets/maize.png";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

      <div className="relative z-10 flex min-h-screen justify-center items-center">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="max-w-3xl text-center md:text-left">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Bringing clarity and trust to agricultural procurement.
            </h1>

            <p className="mt-6 font-body text-lg md:text-xl text-white/85 leading-relaxed text-center">
              Dhanya Sethu helps buyers manage procurements, farmer dues, and
              payments through a structured and transparent system.
            </p>

            <div className="mt-10 flex flex-col items-center sm:flex-row gap-4 justify-center ">
              <Link
                to="/login"
                className="rounded-full bg-green-600 max-w-max px-8 py-3 text-base font-ui font-medium text-white transition hover:bg-green-700">
                Login to Platform
              </Link>

              <a
                href="#solutions"
                className="rounded-full border border-white/40 max-w-max px-8 py-3 text-base font-ui font-medium text-white transition hover:bg-white/10">
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
