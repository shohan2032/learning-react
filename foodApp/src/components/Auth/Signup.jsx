import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signup,clearError } from "../../slices/authSlice"
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, error } = useSelector((state) => state.auth);

  const handleSignup = (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch(signup({ username, password }));
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <Link to="/">
          <img
            src="https://images-platform.99static.com/v84irzbNBd5aawXGKXfH4SEjcn0=/0x0:960x960/500x500/top/smart/99designs-contests-attachments/117/117132/attachment_117132760"
            alt="Logo"
            className="h-16 w-16 mx-auto mb-6"
          />
        </Link>
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            onClick={() => dispatch(clearError())}
            className="text-blue-500 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-400 text-red-600 text-sm rounded-md p-3">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSignup}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base py-3 px-4 sm:text-lg"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base py-3 px-4 sm:text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white rounded-lg font-medium text-lg transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300"
            }`}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
