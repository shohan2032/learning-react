import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwriteServices/auth";
import { login, logout } from "./features/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log(userData);
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        console.error("Failed to fetch user data");
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>main</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
