import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { API_URL } from "../../utils/constants";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("buyer");

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const url =
      role === "buyer"
        ? `${API_URL}/api/buyer/login`
        : `${API_URL}/api/farmer/login`;

    const payload =
      role === "buyer"
        ? {
            buyer_mobile: formData.mobile,
            buyer_password: formData.password,
          }
        : {
            farmer_mobile: formData.mobile,
            farmer_password: formData.password,
          };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      navigate(`/${data.role}`, { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    // <form className="mt-20 flex flex-col mx-auto gap-4 max-w-60" onSubmit={handleSubmit}>
    //   <h1 className="text-center text-xl font-heading font-bold text-gray-800">Login</h1>

    //   <select
    //     value={role}
    //     onChange={(e) => setRole(e.target.value)}
    //     className="border border-gray-300 px-2 py-1 rounded">
    //     <option value="buyer">Buyer</option>
    //     <option value="farmer">Farmer</option>
    //   </select>

    //   <input
    //     type="text"
    //     name="mobile"
    //     placeholder="Mobile"
    //     value={formData.mobile}
    //     onChange={handleChange}
    //     className="border border-gray-300 px-2 py-1 rounded"
    //     required
    //   />

    //   <input
    //     type="password"
    //     name="password"
    //     placeholder="Password"
    //     value={formData.password}
    //     onChange={handleChange}
    //     className="border border-gray-300 px-2 py-1 rounded"
    //     required
    //   />

    //   <div className="text-right">
    //     <Link
    //       to="/forgot-password"
    //       className="text-sm font-ui text-green-600 hover:underline">
    //       Forgot password?
    //     </Link>
    //   </div>

    //   <button
    //     type="submit"
    //     className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-ui font-medium">
    //     Login
    //   </button>

    //   <p className="text-sm text-center text-gray-600 mt-2">
    //     Don't have an account?{" "}
    //     <Link
    //       to="/register"
    //       className="text-green-600 font-medium hover:underline">
    //       Register
    //     </Link>
    //   </p>
    // </form>
    <>
      {/* Background gradient layer */}
      <div
        className="
      absolute inset-0
      bg-gradient-to-b
      from-light-bg/40 via-light-bg/30 to-brand-700/30
      dark:from-dark-bg/80 dark:via-dark-bg/60 dark:to-dark-bg/70
      blur-sm
    "
      />

      {/* Form */}
      <form
        className="
      relative z-10 mt-24 mx-auto
      flex flex-col gap-4
      max-w-xs
      rounded-xl
      bg-light-card/90 dark:bg-dark-card/90
      backdrop-blur-md
      border border-light-border dark:border-dark-border
      px-6 py-6
    "
        onSubmit={handleSubmit}>
        <h1 className="text-xl text-center font-heading font-bold text-light-text dark:text-dark-text">
          Login
        </h1>

        {/* ROLE SELECT */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="
        rounded-md px-2 py-2
        bg-light-bg dark:bg-dark-bg
        border border-light-border dark:border-dark-border
        text-light-text dark:text-dark-text
        font-body
      ">
          <option value="buyer">Buyer</option>
          <option value="farmer">Farmer</option>
        </select>

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="
        rounded-md px-2 py-2
        bg-light-bg dark:bg-dark-bg
        border border-light-border dark:border-dark-border
        text-light-text dark:text-dark-text
        placeholder:text-light-text2 dark:placeholder:text-dark-text2
        font-body
      "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="
        rounded-md px-2 py-2
        bg-light-bg dark:bg-dark-bg
        border border-light-border dark:border-dark-border
        text-light-text dark:text-dark-text
        placeholder:text-light-text2 dark:placeholder:text-dark-text2
        font-body
      "
        />

        {/* Forgot password */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm font-ui text-brand-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="
        mt-2 rounded-full
        bg-brand-500 hover:bg-brand-600
        px-4 py-2
        text-white
        font-ui font-medium
        transition
      ">
          Login
        </button>

        {/* Bottom helper text */}
        <p className="text-sm text-center text-light-text2 dark:text-dark-text2 mt-2">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-brand-500 font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
