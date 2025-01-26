import React from "react";
import { useDispatch } from "react-router-dom";
import authService from "../../appwriteServices/auth";
import { logout } from "../../features/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      alert("Logged out successfully!");
    });
  };
  return (
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  )
}

export default LogoutBtn;
