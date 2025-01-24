import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = () => {
    try {
      if (isRegisterMode) {
        dispatch(register({ username, password }));
        alert("Registration successful. Logged in!");
      } else {
        dispatch(login({ username, password }));
        alert("Logged in successfully!");
      }
      setUsername("");
      setPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        {isRegisterMode ? "Register" : "Login"}
      </h2>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={handleAuth}
        className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
      >
        {isRegisterMode ? "Register" : "Login"}
      </button>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsRegisterMode((prev) => !prev)}
          className="text-blue-500 hover:underline"
        >
          {isRegisterMode
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>

      {user && (
        <p className="mt-4 text-green-500 text-center">
          Logged in as: <strong>{user}</strong>
        </p>
      )}
    </div>
  );
};

export default Login;
