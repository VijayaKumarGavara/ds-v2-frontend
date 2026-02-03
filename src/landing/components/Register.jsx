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
    // <form className="flex flex-col gap-4 max-w-60" onSubmit={handleSubmit}>
    //   <h1>Register</h1>

    //   <select
    //     value={role}
    //     onChange={(e) => setRole(e.target.value)}
    //     className="border px-2"
    //   >
    //     <option value="buyer">Buyer</option>
    //     <option value="farmer">Farmer</option>
    //   </select>

    //   <input
    //     type="text"
    //     name="name"
    //     placeholder="Name"
    //     value={formData.name}
    //     onChange={handleChange}
    //     required
    //     className="border px-2"
    //   />

    //   <input
    //     type="text"
    //     name="village"
    //     placeholder="Village"
    //     value={formData.village}
    //     onChange={handleChange}
    //     required
    //     className="border px-2"
    //   />

    //   <input
    //     type="text"
    //     name="mobile"
    //     placeholder="Mobile"
    //     value={formData.mobile}
    //     onChange={handleChange}
    //     required
    //     className="border px-2"
    //   />

    //   <input
    //     type="password"
    //     name="password"
    //     placeholder="Password"
    //     value={formData.password}
    //     onChange={handleChange}
    //     required
    //     className="border px-2"
    //   />

    //   <button className="bg-green-400 px-4 py-2">Register</button>
    // </form>

    <form className="mt-20 mx-auto flex flex-col gap-4 max-w-60" onSubmit={handleSubmit}>
      <h1 className="text-xl text-center font-heading font-bold text-gray-800">Register</h1>

      {/* ROLE SELECT */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border border-gray-300  px-2 py-1 rounded">
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
        className="border border-gray-300 px-2 py-1 rounded"
      />

      <input
        type="text"
        name="village"
        placeholder="Village"
        value={formData.village}
        onChange={handleChange}
        required
        className="border border-gray-300 px-2 py-1 rounded"
      />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
        className="border border-gray-300 px-2 py-1 rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="border border-gray-300 px-2 py-1 rounded"
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-ui font-medium">
        Register
      </button>

      {/* Bottom helper text */}
      <p className="text-sm text-center text-gray-600 mt-2">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
