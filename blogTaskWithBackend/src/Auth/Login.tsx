import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  setError,
  clearError,
  resetSignUpSuccess,
} from "../slices/authSlice";
import { Store } from "../interface/reduxInterface";
import conf from "../conf/conf";

const Login: React.FC = () => {
  // console.log("Login a ashce");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, error, signUpSuccess } = useSelector(
    (state: Store) => state.auth
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showSignUpSuccessMessage, setShowSignUpSuccessMessage] =
    useState<boolean>(false);

  useEffect(() => {
    if (signUpSuccess) {
      dispatch(resetSignUpSuccess());
      setShowSignUpSuccessMessage(true);
    }
  }, [signUpSuccess, dispatch]);

  const loginUser = async () => {
    const apiUrl = conf.apiUrl;

    // Create the request payload
    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        // for post method must include this, so that backend can get the data from body
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Add this
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data) {
          dispatch(setCurrentUser({ id: data.id, username: data.username }));
        }
      } else {
        const errorData = await response.json();
        // console.log(errorData);
        dispatch(setError({ error: errorData.message }));
      }
    } catch (error) {
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

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    loginUser();
    setLoading(false);
  };

  useEffect(() => {
    if (user.username !== "") {
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
};

export default Login;
