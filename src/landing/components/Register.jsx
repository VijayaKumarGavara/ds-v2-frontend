import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { API_URL } from "../../utils/constants";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("buyer");

  const [formData, setFormData] = useState({
    name: "",
    village: "",
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
        ? `${API_URL}/api/buyer/register`
        : `${API_URL}/api/farmer/register`;

    const payload =
      role === "buyer"
        ? {
            buyer_name: formData.name,
            buyer_village: formData.village,
            buyer_mobile: formData.mobile,
            buyer_password: formData.password,
          }
        : {
            farmer_name: formData.name,
            farmer_village: formData.village,
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
        throw new Error("Registration failed");
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
          Register
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
          name="name"
          placeholder="Name"
          value={formData.name}
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
          type="text"
          name="village"
          placeholder="Village"
          value={formData.village}
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
          Register
        </button>

        {/* Bottom helper text */}
        <p className="text-sm text-center text-light-text2 dark:text-dark-text2 mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-brand-500 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
