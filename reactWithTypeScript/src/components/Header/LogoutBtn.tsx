import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
      navigate("/login");
      Swal.fire({
        title: "Logged Out",
        text: "You have been successfully logged out!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`px-5 py-2 font-semibold text-white rounded-lg transition duration-300 ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {loading ? (
        <span className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            ></path>
          </svg>
          <span>Logging Out...</span>
        </span>
      ) : (
        "Logout"
      )}
    </button>
  );
}
