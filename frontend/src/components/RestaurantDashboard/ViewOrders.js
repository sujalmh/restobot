import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios"; // Import your Axios instance

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders for the restaurant
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/api/restaurant/orders");
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/api/restaurant/orders/${id}`, { status: newStatus });
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert("Failed to update order status. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-white text-center">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-white mb-6">View Orders</h1>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-800 outline outline-2 outline-gray-700 p-6 rounded-lg shadow-lg"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Order ID: {order.id}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === true
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {order.status === true ? "Pending" : "Delivered"}
              </span>
            </div>

            {/* Order Details */}
            <div className="mb-4">
              <p className="text-white">
                <strong>Customer ID:</strong> {order.user_id}
              </p>
              <ul className="mt-2 text-white">
                <strong>Items:</strong>
                {order.items.map((item, index) => (
                  <li key={index} className="ml-4">
                    - Dish ID: {item.dish_id} x {item.quantity} (${item.price.toFixed(2)})
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-white">
                <strong>Total:</strong> ${order.total_cost.toFixed(2)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              {order.status === true && (
                <button
                  onClick={() => handleStatusUpdate(order.id, false)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOrders;
