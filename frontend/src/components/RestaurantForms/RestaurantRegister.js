import React, { useState } from 'react';
import axiosInstance from '../../axios';
import Alert from '../Alert';

const RestaurantRegister = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    cuisine: "",
    is_vegan: false,
    is_vegetarian: false,
    is_halal: false,
    description: "",
    banner: null, // For file upload
    profile_picture: null, // For file upload
  });

  const [previews, setPreviews] = useState({
    banner: null,
    profile_picture: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData({
          ...formData,
          [name]: file,
        });
        setPreviews((prev) => ({
          ...prev,
          [name]: URL.createObjectURL(file),
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the formData to JSON and append other files for multipart form submission
    const jsonData = JSON.stringify({
      password: formData.password,
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      cuisine: formData.cuisine,
      is_vegan: formData.is_vegan,
      is_vegetarian: formData.is_vegetarian,
      is_halal: formData.is_halal,
      description: formData.description,
    });

    // Create a FormData object for multipart request
    const payload = new FormData();
    payload.append("json_data", jsonData);
    if (formData.banner) {
      payload.append("banner", formData.banner);
    }
    if (formData.profile_picture) {
      payload.append("profile_picture", formData.profile_picture);
    }
    for (let pair of payload.entries()) {
      console.log(pair[0], pair[1]);
    }
    
    console.log(payload);
    // Send POST request
    axiosInstance
      .post("/api/restaurant/register", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.message) {
          setMessage(response.data.message);
          setTimeout(() => {
            window.location.href = "/restaurant/login";
          }, 2000);
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || "An error occurred during registration.");
      });
  };


  return (
    <div className='w-full py-10'>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-950 bg-opacity-5 rounded-lg text-white shadow-md p-6 w-3/5 mx-auto outline outline-2 outline-white"
        style={{ backdropFilter: 'blur(2px)' }}
      >
        <h2 className="text-3xl font-semibold text-white mb-8 text-center">
          Register Your Restaurant
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-medium mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="bg-gray-900 text-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-medium mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-gray-900 text-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

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

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-medium mb-2" htmlFor="profile_picture">
            Profile Picture
          </label>
          <input
            type="file"
            id="profile_picture"
            name="profile_picture"
            onChange={handleChange}
            accept="image/*"
            className="bg-gray-900 text-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {previews.profile_picture && (
            <img
              src={previews.profile_picture}
              alt="Profile Preview"
              className="mt-4 max-h-40 object-cover rounded-md"
            />
          )}
        </div>

        {/* Banner */}
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-medium mb-2" htmlFor="banner">
            Banner
          </label>
          <input
            type="file"
            id="banner"
            name="banner"
            onChange={handleChange}
            accept="image/*"
            className="bg-gray-900 text-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {previews.banner && (
            <img
              src={previews.banner}
              alt="Banner Preview"
              className="mt-4 max-h-40 object-cover rounded-md"
            />
          )}
        </div>

        {/* Cuisine */}
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-medium mb-2" htmlFor="cuisine">
            Cuisine
          </label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="bg-gray-900 text-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Dietary Preferences */}
        <div className="mb-4">
          <span className="block text-gray-100 text-sm font-medium mb-2">Dietary Preferences</span>
          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center">
              <input type="checkbox" name="is_vegan" checked={formData.is_vegan} onChange={handleChange} />
              <span className="ml-2">Vegan</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="is_vegetarian" checked={formData.is_vegetarian} onChange={handleChange} />
              <span className="ml-2">Vegetarian</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="is_halal" checked={formData.is_halal} onChange={handleChange} />
              <span className="ml-2">Halal</span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="bg-gray-900 text-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Register Restaurant
        </button>
      </form>
      {message && <Alert type="success" message={message} onClose={() => setError("")} />}
      {error && <Alert type="danger" message={error} onClose={() => setError("")} />}
    </div>
  );
};

export default RestaurantRegister;
