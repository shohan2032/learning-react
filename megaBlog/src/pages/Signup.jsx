import React from "react";
import { SignUp as SignUpComponent } from "../components";

function Signup() {
  return (
    <div className="py-8">
      {/* SignUpComponent can be further optimized to handle loading states and form validation */}
      <SignUpComponent />
    </div>
  );
}

export default Signup;
