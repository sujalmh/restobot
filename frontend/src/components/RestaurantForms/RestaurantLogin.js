import React, { useState } from 'react';
import axiosInstance from '../../axios';
import Alert from '../Alert';

const RestaurantLogin = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request for login
    axiosInstance
      .post("/api/restaurant/login", formData)
      .then((response) => {
          localStorage.setItem('access_token', response.data.access_token);
          setMessage("Login successful! Redirecting...");
          setTimeout(() => { window.location.href = "/restaurant/dashboard"; }, 1500);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.response?.data?.message || "An error occurred during login.");
      });
  };

  return (
    <div className="w-full py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-950 bg-opacity-5 rounded-lg text-white shadow-md p-6 w-3/5 mx-auto outline outline-2 outline-white"
        style={{ backdropFilter: 'blur(2px)' }}
      >
        <h2 className="text-3xl font-semibold text-white mb-8 text-center">
          Restaurant Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-900 text-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-900 text-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
        
        {/* Success and Error Alerts */}
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
    </div>
  );
};

export default RestaurantLogin;
