import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "./../../axios";
import Alert from "../Alert";

const SignIn = () => {
  const [useEmail, setUseEmail] = useState(true);
  const [formData, setFormData] = useState({ email: "", phone: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [searchParams] = useSearchParams();
  const nextUrl = searchParams.get("next") || "/profile";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      if (useEmail) {
        formData.phone = "";
      } else {
        formData.email = "";
      }

      const response = await axios.post("/api/user/login", formData);
      const { access_token } = response.data;

      localStorage.setItem("access_token", access_token);

      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage("");

      setTimeout(() => {
        window.location.href = nextUrl;
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6">
      {/* Alert Modals */}
      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
      {errorMessage && (
        <Alert
          type="danger"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      {/* Sign-In Form */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome Back!
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Email/Phone Input */}
          <div className="relative mb-6">
            <input
              type={useEmail ? "email" : "tel"}
              id={useEmail ? "email" : "phone"}
              name={useEmail ? "email" : "phone"}
              className="peer mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 focus:outline-none px-4 py-2 text-gray-900 bg-transparent placeholder-transparent"
              placeholder={useEmail ? "Email" : "Phone Number"}
              value={useEmail ? formData.email : formData.phone}
              onChange={handleInputChange}
            />
            <label
              htmlFor={useEmail ? "email" : "phone"}
              className="absolute left-4 -top-3 bg-white px-2 text-sm text-indigo-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-indigo-600 peer-focus:text-sm"
            >
              {useEmail ? "Email" : "Phone Number"}
            </label>
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              name="password"
              className="peer mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 focus:outline-none px-4 py-2 text-gray-900 bg-transparent placeholder-transparent"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-3 bg-white px-2 text-sm text-indigo-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-indigo-600 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white py-3 px-4 rounded-lg shadow-lg font-bold hover:opacity-90 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setUseEmail(!useEmail)}
            className="text-indigo-600 hover:underline text-sm font-medium focus:outline-none"
          >
            {useEmail ? "Use Phone Number Instead" : "Use Email Instead"}
          </button>
          <a
            href="/forgot-password"
            className="text-indigo-600 hover:underline text-sm font-medium focus:outline-none"
          >
            Forgot Password?
          </a>
        </div>
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 hover:underline font-medium focus:outline-none"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
