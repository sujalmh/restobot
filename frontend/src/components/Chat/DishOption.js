import React, { useState } from 'react';
import axios from '../../axios'; // Adjust the import path if necessary
import { FaTimes, FaMinus, FaPlus, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { BiFoodTag } from "react-icons/bi";
import FoodInfoModal from './FoodInfo';
import './css/ModalAnimation.css';
import Alert from "../Alert";
import { emitter } from '../events';

const DishOption = ({ dish }) => {
  const [flipped, setFlipped] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setFlipped(false);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      const sessionId = sessionStorage.getItem('session_id');
      const items = [{ dish_id: dish.dish_id, quantity }];
      const response = await axios.post(
        `/api/${sessionId}/add_to_cart`,
        { items },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage(response.data.message);
      setError("");
      emitter.emit('updateCartQuantity');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add to cart");
      setMessage("");
    }
  };

  return (
    <>
      <div
        className="w-[120px] h-52 xs:w-32 sm:w-32 md:w-36 lg:w-40 perspective fadeIn pointer"
        onClick={!flipped ? handleFlip : undefined}
        style={{ perspective: '1000px' }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform ${
            flipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
        >
          {/* Front Side */}
          <div
            className="absolute w-full h-full bg-gray-700 rounded-xl shadow-lg text-center backface-hidden"
            style={{
              transform: 'rotateY(0deg)',
            }}
          > 
            {dish.is_vegetarian === false ? (          
              <button className="absolute top-2 right-2 text-red-400 bg-black hover:bg-black transition">
                <BiFoodTag className='text-lg'/>
              </button>
            ) : (
              <button className="absolute top-2 right-2 text-green-400 bg-black hover:bg-black transition">
                <BiFoodTag className='text-lg'/>
              </button>
            )}
            
            <img src={dish.image} alt={dish.name} className="w-full h-2/3 object-cover rounded-md mb-2" />
            <p className="text-gray-200">{dish.name}</p>
          </div>

          {/* Back Side */}
          <div
            className="absolute w-full h-full bg-gray-700 rounded-xl shadow-lg text-center backface-hidden"
            style={{
              transform: 'rotateY(180deg)',
            }}
          >
            <button className="absolute top-2 right-2 text-red-400 hover:text-white transition" onClick={handleCancel}>
              <FaTimes className='text-sm'/>
            </button>

            <div className='h-39 sm:h-3/5 flex flex-col items-center mb-2'>
              <div className='flex justify-center items-center'>
                <p 
                  className="h-12 flex items-center justify-center text-gray-200 mt-3 overflow-hidden"
                  title={dish.name} // Tooltip to show the full name on hover
                >
                  {dish.name}
                </p>
              </div>
              <div className="flex justify-center mt-1">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex bg-blue-600 text-white hover:bg-blue-800 hover:text-gray-300 rounded-full items-center"
                  title="More Info" 
                >
                  <FaInfoCircle />
                </button>
              </div>
              
              {/* Quantity Selector */}
              <div className="inline-flex rounded justify-center items-center gap-2 mt-2 shadow-sm bg-gray-600 p-1">
                <button
                  className="text-gray-200 px-2 py-1 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseQuantity();
                  }}
                >
                  <FaMinus />
                </button>
                <span className="text-gray-200">{quantity}</span>
                <button
                  className="text-gray-200 px-2 py-1 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseQuantity();
                  }}
                >
                  <FaPlus />
                </button>
              </div>
              <div className='m-0 text-yellow-500'>Price: ₹{dish.price}</div>
            </div>
            <div className='h-13 sm:h-2/5 flex flex-col'>
              <div className="flex justify-center gap-2 mt-4">
                <button
                  className="flex items-center bg-green-600 hover:bg-green-700 transition text-white px-3 py-1 rounded-md"
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart className="mr-2" /> 
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && <FoodInfoModal dish={dish} onClose={() => setShowModal(false)} />}

      {/* Alert for Success/Error */}
      {message && <Alert type="success" message={message} onClose={() => setMessage("")} />}
      {error && <Alert type="danger" message={error} onClose={() => setError("")} />}
    </>
  );
};

export default DishOption;