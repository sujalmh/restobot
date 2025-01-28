import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "../../axios";
import Alert from "../Alert"; // Assuming you have the Alert component
import { IoCloudUploadSharp } from "react-icons/io5";
import { useNavigate  } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    preference: "",
    is_lactose_intolerant: false,
    is_halal: false,
    is_vegan: false,
    is_vegetarian: false,
    is_allergic_to_gluten: false,
    is_jain: false,
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    console.log("Uploaded: "+acceptedFiles);
    if (acceptedFiles.length) {
      setProfilePhoto(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
        setProfilePhoto(file);
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (profilePhoto) {
      console.log("Appending file:", profilePhoto);
      data.append("profile_photo", profilePhoto);
    }
    data.append("json_data", JSON.stringify(formData));

    try {
      console.log("Data:", formData);
      const response = await axios.post("/api/user/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
      setError("");
      setTimeout(() => navigate("/signin"), 1000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className="w-full py-10">
    <div className="h-full flex items-center justify-center">
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

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          {[
            { label: "Name", id: "name", type: "text", placeholder: "Enter your name" },
            { label: "Email", id: "email", type: "email", placeholder: "Enter your email" },
            { label: "Phone", id: "phone", type: "tel", placeholder: "Enter your phone number" },
            { label: "Password", id: "password", type: "password", placeholder: "Enter your password" },
            { label: "Preference", id: "preference", type: "text", placeholder: "Enter your preference" },
          ].map(({ label, id, type, placeholder }) => (
            <div className="relative mb-6" key={id}>
              <input
                type={type}
                id={id}
                name={id}
                className="peer mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 focus:outline-none px-4 py-2 text-gray-900 bg-transparent placeholder-transparent"
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleInputChange}
              />
              <label
                htmlFor={id}
                className="absolute left-4 -top-3 bg-white px-2 text-sm text-indigo-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-indigo-600 peer-focus:text-sm"
              >
                {label}
              </label>
            </div>
          ))}

          {/* Profile Photo Dropzone */}
          <div className="relative mb-6">
            <div
              {...getRootProps()}
              className={`border-2 rounded-lg p-4 text-center transition-all ${
                isDragActive
                  ? "border-indigo-600 bg-indigo-100"
                  : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {profilePhoto ? (
                <p className="text-gray-700">Selected: {profilePhoto.name}</p>
              ) : isDragActive ? (
                <p className="text-indigo-600">Drop the file here...</p>
              ) : (
                <>
                  <IoCloudUploadSharp className='text-gray-300 text-[50px] mx-auto'/>
                  <p className="text-gray-300">Drag & drop an image here, or click to select one</p>
                </>
              )}
              {imagePreview && (
              <div className="flex justify-center mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-50 h-40 object-cover rounded-md shadow-md border-2 border-gray-600"
                />
              </div>
            )}
            </div>
          </div>

          {/* Checkbox Preferences */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: "Lactose Intolerant", name: "is_lactose_intolerant" },
              { label: "Halal", name: "is_halal" },
              { label: "Vegan", name: "is_vegan" },
              { label: "Vegetarian", name: "is_vegetarian" },
              { label: "Allergic to Gluten", name: "is_allergic_to_gluten" },
              { label: "Jain", name: "is_jain" },
            ].map(({ label, name }) => (
              <label key={name} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={name}
                  className="rounded text-indigo-600 focus:ring-indigo-600"
                  checked={formData[name]}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white py-3 px-4 rounded-lg shadow-lg font-bold hover:opacity-90 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-indigo-600 hover:underline font-medium focus:outline-none"
          >
            Signin
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
