import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext"; // Import AuthContext

function Login() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const { user, error, signUpSuccess } = state;

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpSuccessMessage, setShowSignUpSuccessMessage] =
    useState(false);

  useEffect(() => {
    if (signUpSuccess) {
      dispatch({ type: "RESET_SIGNUP" });
      setShowSignUpSuccessMessage(true);
    }
  }, [signUpSuccess, dispatch]);

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch({ type: "LOGIN", payload: { username, password } });
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {showSignUpSuccessMessage && (
          <div className="mb-4 bg-green-50 border border-green-400 text-green-600 text-sm rounded-md p-3">
            Account created successfully! Please login with your credentials.
          </div>
        )}
        <div className="text-center">
          <Link to="/">
            <img
              src="https://images-platform.99static.com/v84irzbNBd5aawXGKXfH4SEjcn0=/0x0:960x960/500x500/top/smart/99designs-contests-attachments/117/117132/attachment_117132760"
              alt="Logo"
              className="h-16 w-16 mx-auto mb-4"
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Welcome!!!</h1>
          <p className="text-sm text-gray-600 mt-2">
            Sign in to continue to{" "}
            <span className="font-semibold">Blog Hub</span>
          </p>
        </div>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base py-3 px-4 sm:text-lg"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base py-3 px-4 sm:text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white rounded-md font-medium text-lg ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300"
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            onClick={() => dispatch(clearError())}
            className="text-blue-500 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
