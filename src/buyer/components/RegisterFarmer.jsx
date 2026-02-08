import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const buyer_id = useSelector((store) => store.user?.buyer?.buyer_id);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    village: "",
    mobile: "",
    password: "",
  });
  const [status, setStatus] = useState(null);
  // { type: "success" | "error", message: string }

  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const location = useLocation();
  const cameFromFindFarmers = location.state?.from === "find-farmers";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    const url = `${API_URL}/api/farmer/register`;

    const payload = {
      farmer_name: formData.name,
      farmer_village: formData.village,
      farmer_mobile: formData.mobile,
      farmer_password: formData.password,
      registered_by: "buyer",
      registered_by_buyer_id: buyer_id,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      const newlyCreatedFarmer = data?.data;
      setStatus({
        type: "success",
        message: data.message || "Registration successful",
      });
      if (cameFromFindFarmers) {
        navigate("/buyer/make-procurement", {
          state: { farmer: newlyCreatedFarmer },
          replace: true,
        });
      } else {
        navigate(-1); // or stay, or show success
      }
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
      <div className="w-full flex flex-col pt-20 pb-6">
        {/* Form */}
        <form
          className="mx-auto
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
            Register New Farmer
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
            {loading ? "Loading..." : "Register"}
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
      </div>
    </>
  );
};

export default Register;
