import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { API_URL } from "./utils/constants";
import {
  setLoggedInUserRole,
  setLoggedInBuyer,
  setLoggedInFarmer,
} from "./store/userSlice";
const AuthLoader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        localStorage.setItem("role", data?.data?.role);
        dispatch(setLoggedInUserRole(data?.data?.role));
        if (data?.data?.role === "buyer") {
          dispatch(setLoggedInBuyer(data?.data?.user));
        } else {
          dispatch(setLoggedInFarmer(data?.data?.user));
        }
        // navigate(`/${data.data.role}`, { replace: true });
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
