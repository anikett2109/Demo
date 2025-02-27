import React from "react";

const Button = ({ label, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
