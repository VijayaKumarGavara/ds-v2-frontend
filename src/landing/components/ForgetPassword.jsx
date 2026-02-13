import { useState } from "react";
import { Link } from "react-router";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { API_URL } from "../../utils/constants";

const ForgetPassword = () => {
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);
  // { type: "success" | "error", message: string }

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      if (
        !formData.mobile.trim() ||
        !formData.password.trim() ||
        !formData.confirmPassword.trim()
      ) {
        throw new Error("Missing required fileds");
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords should be matched.");
      }
      const url =
        role === "buyer"
          ? `${API_URL}/api/buyer/forget-password`
          : `${API_URL}/api/farmer/forget-password`;

      const payload =
        role === "buyer"
          ? {
              buyer_mobile: formData.mobile,
              buyer_new_password: formData.password,
              buyer_confirm_password: formData.confirmPassword,
            }
          : {
              farmer_mobile: formData.mobile,
              farmer_new_password: formData.password,
              farmer_confirm_password: formData.confirmPassword,
            };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Password updation failed");
      }
      setStatus({
        type: "success",
        message: data.message || "Password updation successful",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong",
      });

      setTimeout(() => {
        setStatus(null);
      }, 8000);
    } finally {
      setLoading(false);
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
          Forget Password
        </h1>
        {status && (
          <div
            className={`
      rounded-md px-3 py-2 text-sm font-body
      ${
        status.type === "success"
          ? "bg-brand-500/10 text-brand-500 border border-brand-500/30"
          : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30"
      }
    `}>
            {status.message}
          </div>
        )}
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

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
              w-full rounded-md px-2 py-2 pr-16
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text
              placeholder:text-light-text2 dark:placeholder:text-dark-text2
              font-body
            "
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              text-sm font-ui
              text-light-text2 dark:text-dark-text2
              hover:underline
            ">
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="
              w-full rounded-md px-2 py-2 pr-16
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text
              placeholder:text-light-text2 dark:placeholder:text-dark-text2
              font-body
            "
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              text-sm font-ui
              text-light-text2 dark:text-dark-text2
              hover:underline
            ">
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
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
      "
          disabled={loading}>
          {loading ? "Loading.." : "Forget Password"}
        </button>

        {/* Back to login */}
        <p className="text-sm text-center text-light-text2 dark:text-dark-text2 mt-2">
          Back to{" "}
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

export default ForgetPassword;
