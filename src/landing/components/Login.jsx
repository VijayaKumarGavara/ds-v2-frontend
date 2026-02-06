import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { API_URL } from "../../utils/constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);
  // { type: "success" | "error", message: string }

  const [loading, setLoading] = useState(false);

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
    setStatus(null);
    setLoading(true);
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

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      setStatus({
        type: "success",
        message: data.message || "Login successful",
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      navigate(`/${data.role}`, { replace: true });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong",
      });

      // Clear error after 10 seconds
      setTimeout(() => {
        setStatus(null);
      }, 10000);
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
          Login
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
            placeholder="Password"
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
      "
          disabled={loading}>
          {loading ? "Logging In.." : "Login"}
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
