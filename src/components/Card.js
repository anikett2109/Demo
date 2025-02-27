import React from "react";

const Card = ({ title, description, children }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white w-80">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default Card;
