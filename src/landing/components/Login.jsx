import { useState } from "react";
import { useNavigate } from "react-router";
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
    <form className="flex flex-col gap-4 max-w-60" onSubmit={handleSubmit}>
      <h1>Login</h1>

      {/* ROLE SELECT */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border px-2"
      >
        <option value="buyer">Buyer</option>
        <option value="farmer">Farmer</option>
      </select>

      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        value={formData.mobile}
        onChange={handleChange}
        className="border px-2"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border px-2"
        required
      />

      <button className="bg-green-400 px-4 py-2">Login</button>
    </form>
  );
};

export default Login;
