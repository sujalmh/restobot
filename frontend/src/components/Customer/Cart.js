import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import axios from '../../axios';
import { emitter } from '../events';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const sessionId = sessionStorage.getItem('session_id');
  const navigate = useNavigate();
  
  const goBack = async () => {
    console.error("Hello");
    if (!sessionId) {
      console.error("Session ID not found in sessionStorage.");
      setError("Session ID is missing.");
      return;
    }
  
    try {
      console.log("Fetching restaurant ID for session:", sessionId);
      const response = await axios.get(`/api/get_restId_from_sessionId/${sessionId}`);
      console.log("Restaurant ID retrieved:", response.data.rest_id);
      navigate(`/chat/${response.data.rest_id}`);
    } catch (err) {
      console.error("Error fetching restaurant ID:", err.response || err);
      setError(err.response?.data?.message || "Failed to fetch restaurant ID");
    }
  };
    
  const fetchCart = async () => {
    try {
       // Retrieve session ID from local storage
      const response = await axios.get(`/api/${sessionId}/get_cart`);
      console.log(response.data.cart.items);
      setCart(response.data.cart.items || []);
      calculateTotal(response.data.cart.items || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalAmount);
  };

  const handleIncrease = async (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    calculateTotal(updatedCart);
    
    try {
      await axios.post(`/api/${sessionId}/update_cart`, { id, operation: 'increase' });
      await fetchCart();
      emitter.emit('updateCartQuantity');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update cart");
    }
  };

  const handleDecrease = async (id) => {
    const item = cart.find(item => item.dish_id === id);
    if (item.quantity > 1) {
      const updatedCart = cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
      calculateTotal(updatedCart);

      try {
        await axios.post(`/api/${sessionId}/update_cart`, { id, operation: 'decrease' });
        await fetchCart();
        emitter.emit('updateCartQuantity');
      } catch (err) {
        setError(err.response?.data?.message || "Failed to update cart");
      }
    } else {
      handleDelete(id);
    }
  };
  
  const handleDelete = async (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    calculateTotal(updatedCart);

    try {
      await axios.post(`/api/${sessionId}/delete_cart_item`, { id });
      await fetchCart();
      emitter.emit('updateCartQuantity');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete item from cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left: Cart Items */}
      <div className="flex-1 bg-gray-800 bg-opacity-45 outline outline-2 outline-gray-700 rounded-lg shadow-xl shadow-gray-900 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-white mb-4">Cart Items</h2>
          <p className="text-md text-gray-100">Price</p>
        </div>

        {cart.length > 0 ? (
          cart.map(item => (
            <div
              key={item.dish_id}
              className="flex justify-between border-b border-gray-400 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
            >
              {/* Item Image */}
              <img
                src={item.image}
                alt={item.dish_name}
                className="w-28 h-28 rounded-lg object-cover mr-4"
              />
              {/* Item Details */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl text-gray-100">{item.dish_name}</h3>
                  <p className="text-lg text-gray-100">₹ {item.price.toFixed(2)}</p>
                </div>
                {/* Quantity Box */}
                <div className="flex items-center mt-4 bottom-0">
                  <div className="flex items-center justify-between border-2 border-yellow-200 rounded-lg bg-gray-800 text-white w-[5.5rem] px-2 py-0.5">
                    <button
                      onClick={() => handleDecrease(item.dish_id)}
                      className="text-gray-200 hover:text-red-500"
                    >
                      {item.quantity > 1 ? (
                        <span><FaMinus className='text-sm'/></span>
                      ) : (
                        <span><FaTrash className='text-sm'/></span>
                      )}
                    </button>
                    <span className="text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.dish_id)}
                      className="text-gray-200 hover:text-blue-500"
                    >
                      <span><FaPlus className='text-sm'/></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
          <button
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            onClick={goBack}
          >
            Add More Items
          </button>
      </div>

      {/* Right: Total */}
      <div className="w-full h-48 lg:w-1/3 bg-gray-800 bg-opacity-45 outline outline-2 outline-gray-700 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl text-white mb-4">Order Summary</h2>
        <p className="text-gray-100">
          Total: <span className="font-bold text-lg text-white">₹ {total.toFixed(2)}</span>
        </p>
        <Link to={'/payment'}>
          <button
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;