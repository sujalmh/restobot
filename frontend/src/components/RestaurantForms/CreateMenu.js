import React, { useState } from "react";
import axios from "../../axios"; // Adjust the path to match your project structure
import Alert from "../Alert"; // Assuming you have an Alert component

const CreateMenu = () => {
  const [menuType, setMenuType] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setMenuType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/create_menu",
        { menu_type: menuType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token
          },
        }
      );
      setMessage(response.data.message);
      setError("");
      setMenuType(""); // Clear input after success
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      {/* Alerts */}
      {message && (
        <Alert
          type="success"
          message={message}
          onClose={() => setMessage("")}
        />
      )}
      {error && (
        <Alert
          type="danger"
          message={error}
          onClose={() => setError("")}
        />
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Menu
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="menu_type" className="block text-sm font-medium text-gray-700">
              Menu Type
            </label>
            <input
              type="text"
              id="menu_type"
              name="menu_type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter Menu Type"
              value={menuType}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 mt-4"
          >
            Create Menu
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMenu;
