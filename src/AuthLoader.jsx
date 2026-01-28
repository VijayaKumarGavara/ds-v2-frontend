import { useEffect } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "./utils/constants";

const AuthLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("role", data.data.role);
        navigate(`/${data.data.role}`, { replace: true });
      })
      .catch((err) => {
        console.warn("Session invalid:", err.message);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/", { replace: true });
      });
  }, []);

  return null; // important: renders nothing
};

export default AuthLoader;
