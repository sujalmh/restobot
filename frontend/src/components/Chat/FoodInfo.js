import React, { useState, useEffect, useCallback } from 'react';
import './css/ModalAnimation.css';
import axiosInstance from '../../axios';

export default function FoodInfoModal({ dish, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [foodInfo, setFoodInfo] = useState({});

  const handleClose = useCallback(() => {
    setIsExiting(true);  // Trigger fade-out animation
    setTimeout(() => {
      setIsVisible(false);  // Set visibility to false after fade-out completes
      onClose();            // Call onClose after fade-out animation
    }, 300);                // Match this duration with the CSS fade-out time
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchFoodInfo = async () => {
      try {
        const response = await axiosInstance.get(`/api/get_dish/${dish.dish_id}`);
        console.log("dish id: "+response.data);
        setFoodInfo(response.data);
      } catch (error) {
        console.error('Error fetching food info:', error);
      }
    };
    fetchFoodInfo();
  }, []);

  if (!isVisible) return null; // Do not render component after it becomes invisible

  return (

    <div
  className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-overlay ${isExiting ? 'fade-out' : 'fade-in'}`}
  onClick={handleClose}
>
      <div className="w-full max-w-4xl bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 relative modal-content">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
        >
          &times;
        </button>

        {/* Title and Highlight */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-100">{foodInfo.dish_name}</h1>
          {foodInfo.chefSpecial && (
            <span className="text-sm font-semibold text-yellow-400 bg-yellow-800 py-1 px-3 rounded-full">
              Chef's Special
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-8">{foodInfo.description}</p>

        {/* Food Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Ingredients</h2>
            { (foodInfo.ingredients) ? (  
              <p className="text-gray-300">{foodInfo.ingredients.join(', ')}</p>
            ) : (
              <p className="text-gray-300">No ingredients listed</p>
            )}
          </div>

          {/* Nutritional Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Nutritional Information</h2>
            <ul className="text-gray-300 space-y-2">
              <li>Protein: {foodInfo.protein}g</li>
              <li>Fat: {foodInfo.fat}g</li>
              <li>Energy: {foodInfo.energy} kcal</li>
              <li>Carbs: {foodInfo.carbs}g</li>
            </ul>
          </div>
        </div>

        {/* Dietary Information - Only show if true */}
        <div className="flex flex-wrap gap-4 mb-8">
          {foodInfo.isLactoseFree && (
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-semibold text-sm">Lactose-Free</div>
          )}
          {foodInfo.isHalal && (
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-semibold text-sm">Halal</div>
          )}
          {foodInfo.isVegan && (
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-semibold text-sm">Vegan</div>
          )}
          {foodInfo.isVegetarian && (
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-semibold text-sm">Vegetarian</div>
          )}
          {foodInfo.isGlutenFree && (
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-semibold text-sm">Gluten-Free</div>
          )}
          {foodInfo.isJain && (
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-semibold text-sm">Jain</div>
          )}
          {foodInfo.isSoyFree && (
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-semibold text-sm">Soy-Free</div>
          )}
          {foodInfo.isAvailable && (
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-semibold text-sm">Available</div>
          )}
        </div>

        {/* Price and Order Button */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
          <p className="text-3xl font-bold text-green-400">₹ {foodInfo.price}</p>
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-150">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
