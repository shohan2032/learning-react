import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthProtection({ children, authentication = true }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication state on initial render
    const checkAuth = () => {
      if (authentication && !isLoggedIn) {
        navigate("/login");
      } else if (!authentication && isLoggedIn) {
        navigate("/");
      }
      setLoading(false);
    };

    checkAuth();
  }, [isLoggedIn, authentication, navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}

export default AuthProtection;
