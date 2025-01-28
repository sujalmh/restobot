import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuManagement = () => {
  const [menu, setMenu] = useState({
    Starters: [
      { id: 1, name: "Spring Rolls", price: 5.99 },
      { id: 2, name: "Garlic Bread", price: 3.99 },
    ],
    Mains: [
      { id: 3, name: "Margherita Pizza", price: 9.99 },
      { id: 4, name: "Pasta Carbonara", price: 12.99 },
    ],
    Desserts: [
      { id: 5, name: "Tiramisu", price: 6.99 },
      { id: 6, name: "Cheesecake", price: 7.99 },
    ],
  });

  const handleEdit = (category, id) => {
    alert(`Edit dish ID ${id} from ${category}`);
  };


  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Menu Management</h1>
        <Link to={`/restaurant/adddish`}>
            <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600"
            >
            Add Dish
            </button>
        </Link>
      </div>

      {/* Menu Categories */}
      <div className="space-y-8">
        {Object.keys(menu).map((category) => (
          <div key={category} className="bg-gray-800 outline outline-2 outline-gray-700 p-6 rounded-lg shadow-lg">
            {/* Category Title */}
            <h2 className="text-2xl font-semibold text-white mb-4">
              {category}
            </h2>
            {/* Dishes List */}
            <div className="space-y-4">
              {menu[category].map((dish) => (
                <div
                  key={dish.id}
                  className="flex justify-between items-center border-b pb-2 last:border-b-0"
                >
                  {/* Dish Details */}
                  <div>
                    <h3 className="text-lg text-white">{dish.name}</h3>
                    <p className="text-gray-200">${dish.price.toFixed(2)}</p>
                  </div>
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(category, dish.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
