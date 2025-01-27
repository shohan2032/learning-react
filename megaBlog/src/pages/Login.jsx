import React from "react";
import { Login as LoginComponent } from "../components";

function Login() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Login to Your Account
      </h2>
      <LoginComponent />
    </div>
  );
}

export default Login;
