import { Link } from "react-router";

const FinalCTA = () => {
  return (
    <section
      className="
        py-24
        bg-gradient-to-r
        from-brand-600
        to-brand-700
        text-white
      "
    >
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2
          className="
            font-heading
            text-3xl sm:text-4xl md:text-5xl
            font-bold
            tracking-tight
          "
        >
          Ready to Simplify Agricultural Procurement?
        </h2>

        <p
          className="
            mt-6
            font-body
            text-base sm:text-lg
            leading-relaxed
            text-white/80
          "
        >
          Start managing procurements, dues, and transactions
          through a structured and transparent digital system.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="
              rounded-full
              bg-white
              text-brand-700
              px-8 py-3
              font-ui font-semibold
              hover:bg-gray-100
              transition
            "
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="
              rounded-full
              border border-white/60
              px-8 py-3
              font-ui font-medium
              text-white
              hover:bg-white/10
              transition
            "
          >
            Login
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;