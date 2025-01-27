import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    dispatch(logout());
    navigate("/login");
    Swal.fire("Successfully Logged Out!")
  };

  return (
    <button 
        onClick={handleLogout}
        disabled={loading}
    >
        {loading ? "Logging Out..." : "Logout"}
    </button>
  );
}
