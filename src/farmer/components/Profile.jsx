import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { useSelector } from "react-redux";

import { API_URL, CLOUDINARY_URL } from "../../utils/constants";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Profile = () => {
  const navigate = useNavigate();
  const { toggleTheme, theme } = useOutletContext();
  const farmer_id = useSelector((store) => store.user?.farmer?.farmer_id);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/farmer/profile?farmer_id=${farmer_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const json = await res.json();
        setProfile(json?.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/farmer");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="text-light-text2 dark:text-dark-text2 font-body">
        Loading profile…
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-light-text2 dark:text-dark-text2 font-body">
        Unable to load profile.
      </div>
    );
  }

  return (
    <section className="max-w-md mx-auto ">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-lg text-center font-heading font-bold text-light-text dark:text-dark-text">
          Profile
        </h1>
      </div>

      {/* Card */}
      <div
        className="
          rounded-2xl
          bg-light-card dark:bg-dark-card
          border border-light-border dark:border-dark-border
          px-6 py-8
          flex flex-col items-center gap-6
        ">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center overflow-hidden">
          {profile.farmer_image_path ? (
            <img
              src={`${CLOUDINARY_URL}${profile.farmer_image_path}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-heading font-bold text-brand-500">
              {profile.farmer_name?.[0]}
            </span>
          )}
        </div>

        {/* Name */}
        <h2 className="text-xl font-heading font-bold text-light-text dark:text-dark-text">
          {profile.farmer_name}
        </h2>

        {/* Details */}
        <div className="w-full space-y-3 text-center">
          <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
            Village:{" "}
            <span className="font-ui text-light-text dark:text-dark-text">
              {profile.farmer_village}
            </span>
          </div>

          <div className="text-sm font-body text-light-text2 dark:text-dark-text2">
            Mobile:{" "}
            <span className="font-ui text-light-text dark:text-dark-text">
              {profile.farmer_mobile}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            max-w-max mt-2
            rounded-full
            bg-brand-500 hover:bg-brand-600
            px-4 py-2
            font-ui font-medium
            text-white
            transition
          ">
          Logout
        </button>

        <div className=" w-full flex flex-col gap-2 items-start border-t-2 border-light-border dark:border-dark-border">
          <button
            onClick={handleBack}
            className="px-3 py-2 rounded-full text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg"
            aria-label="Go back">
            <ArrowBackIcon />
            Back
          </button>
          <button
            onClick={toggleTheme}
            className="
              max-w-max flex items-center justify-center gap-2
              rounded-full
              border border-light-border dark:border-dark-border
              px-4 py-2
              font-ui text-sm
              text-light-text dark:text-dark-text
            ">
            {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
