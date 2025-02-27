import React from "react";

const Input = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>
      <input
        type="text"
        name={name}
        value={value} // Controlled input
        onChange={onChange} // Ensure onChange is passed
        placeholder={placeholder}
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
