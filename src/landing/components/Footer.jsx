import { Link, useNavigate } from "react-router";

const Footer = () => {
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
    <footer
      className="
        bg-light-card dark:bg-dark-card
        border-t border-light-border dark:border-dark-border
        py-16
      ">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        {/* Left */}
        <div>
          <h3 className="font-heading text-2xl font-bold text-light-text dark:text-dark-text">
            Dhanya Sethu
          </h3>

          <p className="mt-4 font-body text-sm leading-relaxed text-light-text2 dark:text-dark-text2">
            A structured digital procurement platform connecting farmers and
            buyers with transparency and clarity.
          </p>
        </div>

        {/* Middle */}
        <div>
          <h4 className="font-ui font-semibold text-light-text dark:text-dark-text">
            Quick Links
          </h4>

          <ul className="mt-4 space-y-3 flex flex-col font-body text-sm">
            {[
              { label: "Home", to: "home" },
              { label: "About", to: "about" },
              { label: "How it Works", to: "howitworks" },
              { label: "Features", to: "features" },
            ].map((item) => {
              return (
                <button
                  onClick={() => {
                    handleScroll(item.to);
                  }}
                  className="transition text-light-text dark:text-dark-text hover:text-light-text2 hover:dark:text-dark-text2 max-w-max">
                  {item.label}
                </button>
              );
            })}
          </ul>
        </div>

        {/* Right */}
        <div className="flex flex-col">
          <h4 className="font-ui font-semibold text-light-text dark:text-dark-text">
            Contact
          </h4>

          <a
            href="mailto:"
            className="mt-4 font-body text-sm text-light-text2 dark:text-dark-text2">
            support@dhanyasethu.com
          </a>
          <a
            href="tel:+916303479435"
            className="mt-2 font-body text-sm text-light-text2 dark:text-dark-text2">
            +91 63034 79435
          </a>
        </div>
      </div>

      <div className="mt-12 text-center font-body text-xs text-light-text2 dark:text-dark-text2">
        © {new Date().getFullYear()} Dhanya Sethu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
