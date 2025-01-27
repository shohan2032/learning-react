import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function AuthProtection({ children, authentication = true }) {
  const navigate = useNavigate();
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication && authentication !== isLoggedIn) {
      navigate("/login");
    } else if(!authentication && isLoggedIn !== authentication) {
        navigate("/");
    }
    setLoading(false);
  },[isLoggedIn, navigate, authentication]);
  return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthProtection;
