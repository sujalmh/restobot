import React, { useEffect, useState } from "react";

const Alert = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in when component mounts
    setVisible(true);

    // Fade out and call `onClose` after 5 seconds
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Delay onClose to allow fade-out animation
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  const typeColors = {
    success: "bg-green-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      } ${typeColors[type] || "bg-gray-500"}`}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium">{message}</p>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 500);
          }}
          className="ml-4 text-xl font-bold leading-none focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
