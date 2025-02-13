import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout, setError } from "../../slices/authSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import conf from "../../conf/conf";
export default function LogoutBtn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logOutUser = async () => {
    try {
      const response = await fetch(`${conf.apiUrl}/user/logout`, {
        method: "POST",
        credentials: "include", // Add this to ensure cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json(); // Parse the response data
        console.log(data);
        if (data) {
          // Dispatch the login action with the received user data
          dispatch(logout());
        }
      } else {
        // If the response isn't ok (e.g., 400, 500 error), handle it here
        const errorData = await response.json();
        dispatch(setError({ error: errorData.message }));
      }
    } catch (error) {
      // Catch any unexpected errors (e.g., network issues, timeout)
      if (error instanceof Error) {
        dispatch(
          setError({
            error:
              error.message ||
              "An unexpected error occurred. Please try again.",
          })
        );
      } else {
        dispatch(
          setError({ error: "An unexpected error occurred. Please try again." })
        );
      }
    }
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logOutUser();
      navigate("/login");
      Swal.fire({
        title: "Logged Out",
        text: "You have been successfully logged out!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      setLoading(false);
    }, 1000);
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
