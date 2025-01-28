import React, { useState, useEffect } from "react";
import axios from "../../axios"; // Adjust the path to match your setup
import Alert from "../Alert"; // Reusable Alert component

const AddToMenu = () => {
  const [menus, setMenus] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [selectedDishId, setSelectedDishId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch menus and dishes on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuResponse, dishResponse] = await Promise.all([
          axios.get("/api/get_menu", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("/api/get_all_dishes", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);
        setMenus(menuResponse.data.menu);
        setDishes(dishResponse.data.dishes);
        console.log(dishResponse.data.dishes);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMenuId || !selectedDishId) {
      setError("Please select a menu and a dish");
      return;
    }

    try {
      const response = await axios.post(
        "/api/add_to_menu",
        { menu_id: selectedMenuId, dish_id: selectedDishId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message);
      setError("");
      setSelectedMenuId("");
      setSelectedDishId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding dish to menu");
      setMessage("");
    }
  };

  const selectDish = (dishId) => {
    setSelectedDishId(dishId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      {/* Alerts */}
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

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Dish to Menu
        </h1>

        {/* Menu Selection */}
        <div className="mb-4">
          <label htmlFor="menu_id" className="block text-sm font-medium text-gray-700">
            Select Menu
          </label>
          <select
            id="menu_id"
            name="menu_id"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={selectedMenuId}
            onChange={(e) => setSelectedMenuId(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Select a Menu --
            </option>
            {menus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.menu_type}
              </option>
            ))}
          </select>
        </div>

        {/* Dish Selection (Cards) */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Select a Dish</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className={`cursor-pointer p-4 rounded-lg shadow-md transition-all duration-200 ${
                selectedDishId === dish.id
                  ? "border-4 border-indigo-500"
                  : "border border-gray-300"
              }`}
              onClick={() => selectDish(dish.id)}
            >
              <img
                src={dish.image}
                alt={dish.dish_name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-medium text-gray-700 mt-2">{dish.dish_name}</h3>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 mt-6"
          disabled={!selectedDishId || !selectedMenuId}
        >
          Add to Menu
        </button>
      </div>
    </div>
  );
};

export default AddToMenu;
