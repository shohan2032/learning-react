import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext"; 

function AuthProtection({ children, authentication = true }) {
  const { state } = useContext(AuthContext);
  const isLoggedIn = state.user !== null;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication && !isLoggedIn) {
      navigate("/login");
      return;
    }
    setLoading(false);
  }, [isLoggedIn, authentication, navigate]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthProtection;
