import React, { useState } from "react";
import {API_URL} from "../../utils/constants";
const Login = () => {
  const [user, setUser] = useState({
    buyer_mobile: "8247649582",
    buyer_password: "GSN123",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/buyer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form className="flex flex-col max-w-60 gap-8" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          name="buyer_mobile"
          placeholder="mobile"
          value={user.buyer_mobile}
          onChange={handleChange}
          className="border border-black rounded-md px-2"></input>
        <input
          type="text"
          name="buyer_password"
          placeholder="password"
          value={user.buyer_password}
          onChange={handleChange}
          className="border border-black rounded-md px-2"></input>
        <button
          type="submit"
          className="border rounded-md px-4 py-2 max-w-max bg-green-400 text-stone-700">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
