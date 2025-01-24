import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { logout } from "./slices/authSlice";
import Login from "./components/Auth/Login";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    alert("Logged out successfully!");
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-500 text-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Meal App</h1>
            <div>
              {user ? (
                <>
                  <span className="mr-4">Welcome, {user}!</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Navigate to="/login" />
              )}
            </div>
          </div>
        </header>

        <main className="container mx-auto py-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/favorites"
              element={
                user ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      {user}'s Favorite Meals
                    </h2>
                    <p>Feature coming soon!</p>
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
