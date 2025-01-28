import React from 'react';
import ReviewBox from './ReviewBox';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const RestaurantDashboard = () => {
  return (
    <div className='py-10'>
      <Link to="/restaurant/view/orders">
        <div className="bg-gray-800 min-h-64 w-11/12 mx-auto flex text-white outline outline-2 outline-gray-700 shadow-lg rounded-lg overflow-hidden">
          {/* Total Orders */}
          <div className="flex-1 flex flex-col justify-center items-center p-4 hover:bg-blue-950 transition duration-300 ease-in-out">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">Total Orders</h2>
            <p className="text-lg md:text-xl lg:text-2xl mt-2">120</p>
          </div>

          {/* Pending Orders */}
          <div className="flex-1 flex flex-col justify-center items-center p-4 hover:bg-yellow-950 border-l-2 border-yellow-700 transition duration-300 ease-in-out">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-600">Pending Orders</h2>
            <p className="text-lg md:text-xl lg:text-2xl mt-2">15</p>
          </div>

          {/* Completed Orders */}
          <div className="flex-1 flex flex-col justify-center items-center p-4 hover:bg-green-950 border-l-2 border-green-700 transition duration-300 ease-in-out">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600">Completed Orders</h2>
            <p className="text-lg md:text-xl lg:text-2xl mt-2">105</p>
          </div>

          {/* Cancelled Orders */}
          <div className="flex-1 flex flex-col justify-center items-center p-4 hover:bg-red-950 border-l-2 border-red-700 transition duration-300 ease-in-out">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-red-600">Cancelled Orders</h2>
            <p className="text-lg md:text-xl lg:text-2xl mt-2">105</p>
          </div>
        </div>
      </Link>
      
    
      {/* Main Dashboard Area */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 w-11/12 mx-auto mt-10">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md outline outline-2 outline-gray-700">
          <ReviewBox />
        </div>

        {/* Sales Summary Widget */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md outline outline-2 outline-gray-700">
          <h2 className="text-xl font-semibold mb-4">Sales Summary</h2>
          <p>Total Revenue: $2500</p>
          <p>Most Popular Dish: Margherita Pizza (10 orders)</p>
          <p>Orders Completed: 20</p>
          <p>Average Order Time: 12 mins</p>
        </div>

        {/* Inventory Alerts Widget */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md outline outline-2 outline-gray-700">
          <h2 className="text-xl font-semibold mb-4">Inventory Alerts</h2>
          <ul>
            <li>Tomatoes: Low Stock</li>
            <li>Cheese: Critical</li>
          </ul>
        </div>

        {/* Reservation Summary Widget */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md outline outline-2 outline-gray-700">
          <h2 className="text-xl font-semibold mb-4">Today’s Reservations</h2>
          <ul>
            <li>Table 3 - 6:30 PM - John Doe (4 guests)</li>
            <li>Table 5 - 7:00 PM - Jane Smith (2 guests)</li>
          </ul>
        </div>
      </main>
      <Link to="/restaurant/adddish">
        <button className="absolute bottom-0 right-0 mr-10 mb-5 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg mt-8 hover:bg-green-700 transition duration-300 flex items-center">
          <FaPlus className="mr-2" /> Add a New Dish
        </button>
      </Link>
    </div>
  );
};

export default RestaurantDashboard;
