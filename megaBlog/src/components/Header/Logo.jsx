import React from "react";

function Logo({ width = "100px", text = "Logo" }) {
  return (
    <div
      className="flex items-center justify-center font-bold text-blue-600"
      style={{ width }}
    >
      {text}
    </div>
  );
}

export default Logo;
