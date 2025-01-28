import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHamburger } from "react-icons/fa";
import Sidebar from './Sidebar';
import axios from '../../axios';
import { FiShoppingCart } from "react-icons/fi";
import { emitter } from '../events'; // Import the event emitter

const Navbar = () => {
  const [bgColor, setBgColor] = useState('linear-gradient(to right, #D84315, #6d28d9)'); // Default gradient
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState('user'); // Default role (user)
  const [cartItems, setCartItems] = useState(0);
  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getCartQuantity = async () => {
    const sessionId = sessionStorage.getItem('session_id');
    if (sessionId) {
      try {
        console.log('Fetching cart quantity... session_id:', sessionId);
        const response = await axios.get(`/api/get_cart_quantity/${sessionId}`);
        setCartItems(response.data.quantity || 0);
      } catch (error) {
        console.error('Error fetching cart quantity:', error);
      }
    } else {
      setCartItems(0);
    }
  };

  useEffect(() => {
    // Fetch the navbar color from the backend
    const fetchNavbarColor = async () => {
      try {
        const response = await fetch('/api/navbar-color'); // Replace with your actual API endpoint
        const data = await response.json();
        setBgColor(data.color); // Assume backend returns an object like { color: "#ff7e5f" or gradient string }
      } catch (error) {
        console.error('Error fetching navbar color:', error);
      }
    };

    // Fetch the user role from the backend
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('/api/role'); // Replace with your actual API endpoint
        console.log(response.data);
        setRole(response.data.role); // Assume backend returns an object like { role: "user" or "restaurant" }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    // Fetch initial cart quantity
    fetchNavbarColor();
    fetchUserRole();
    getCartQuantity();

    // Listen for cart updates
    const updateListener = () => getCartQuantity();
    emitter.on('updateCartQuantity', updateListener);

    // Cleanup listener on unmount
    return () => {
      emitter.off('updateCartQuantity', updateListener);
    };
  }, []);

  useEffect(() => {
    // Set the CSS variable for navbar background color
    document.documentElement.style.setProperty('--navbar-bg-color', bgColor);
  }, [bgColor]); // Update when bgColor changes

  return (
    <>
      <div
        className="flex z-10 justify-between items-center px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 shadow-lg"
      >
        <button
          onClick={toggleSidebar}
          className="p-3 ml-3 mr-3 rounded-full bg-blue-800 hover:bg-blue-900 focus:outline-none border border-black border-opacity-10"
        >
          <FaHamburger className='text-lg text-white'/>
        </button>
        <Link to="/">
          <h1 className="text-lg font-bold text-white">Restobot</h1>
        </Link>
        <Link to="/cart">
          <button className="relative flex items-center ml-auto">
            <FiShoppingCart className='text-3xl text-white' />
            <span className="text-white ml-3 font-bold">
              Go to Cart
            </span>
            <span className="absolute top-0 left-3.5 inline-flex items-center justify-center h-3 w-3 bg-yellow-500 p-3 rounded-full text-white font-bold">{cartItems}</span>
          </button>
        </Link>
      </div>
      {/* Pass role dynamically to Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} type={role} />
    </>
  );
};

export default Navbar;