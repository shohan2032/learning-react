import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwriteServices/auth";
import { logout } from "../../features/authSlice";

function LogoutBtn() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    setLoading(true);
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        alert("Logged out successfully!");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        alert("Failed to log out.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`${
        loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
      } text-white font-bold py-2 px-4 rounded transition duration-200`}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

export default LogoutBtn;
