import React, { useEffect, useState } from "react";
import axios from "../axios";
import Alert from "./Alert";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/get");
        setUserData(response.data);
        console.log(response.data); 
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert type="danger" message={error} onClose={() => setError("")}/>;
  }

  const { user, preferences, other_preferences, orders, favorites, conversations } = userData;

  return (
    <div className="py-8 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-gray-900 text-gray-200 shadow-sm shadow-gray-500 rounded-lg overflow-hidden">
        {/* User Info */}
        <div className="flex items-center p-6 border-b border-gray-700">
          <img
            src={user.profile_photo}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-600"
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-400">{user.user_description}</p>
            <p className="mt-2 text-sm text-gray-400">Phone: {user.phone}</p>
            <p className="mt-1 text-sm text-gray-400">Email: {user.email}</p>
          </div>
        </div>

        {/* Preferences */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-bold mb-4">Dietary Preferences</h2>
          <div className="flex flex-wrap gap-2  mb-4">
            {Object.entries(preferences).map(([key, value]) => (
              <span
                key={key}
                className={`px-4 py-2 rounded-full text-sm ${
                  value ? "bg-purple-800 text-white" : "bg-gray-700 text-gray-300"
                }`}
              >
                {key.replace(/_/g, " ")}
              </span>
            ))}
          </div>
          <p className="text-md font-bold mb-4">Other Preferences</p>
          <p>{other_preferences.preference}</p>
        </div>

        {/* Orders */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold">{order.restaurant_name}</h3>
                <p className="text-sm text-gray-400">{order.timestamp}</p>
                <p className="font-bold">₹{order.total_cost}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Favorites */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-bold mb-4">Favorites</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold">Restaurants</h3>
              <ul className="mt-2">
                {favorites.restaurants.map((rest) => (
                  <li key={rest.id} className="mt-1 text-sm">
                    {rest.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Dishes</h3>
              <ul className="mt-2">
                {favorites.dishes.map((dish) => (
                  <li key={dish.id} className="mt-1 text-sm">
                    {dish.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Conversations */}
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Recent Conversations</h2>
          <ul className="space-y-4">
            {conversations.map((convo) => (
              <li key={convo.id} className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold">{convo.restaurant_name}</h3>
                <p className="text-sm text-gray-300">{convo.content}</p>
                <p className="text-sm text-gray-400">{convo.created_at}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
