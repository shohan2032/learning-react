import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  disabled = false,
  ...props
}) {
  // Disabled state styles
  const disabledStyles = disabled
    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
    : `${bgColor} ${textColor}`;

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${disabledStyles} ${className} duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
