import React from "react";

function ButtonComponent({ text, icon,onClick }) {
  return (
    <button
      onClick={onClick}
      className=" text-dark px-4 py-2 shadow-md bg-white rounded-md flex items-center space-x-2 active:bg-cyan-200 hover:bg-cyan-100 lg:text-sm"
    >
      {icon}
      <p>{text}</p>
    </button>
  );
}

export default ButtonComponent;
