import React, { useState } from "react";

const Payment = () => {
  const [cart] = useState([
    { id: 1, name: "Pizza", price: 10, quantity: 2 },
    { id: 2, name: "Pasta", price: 8, quantity: 1 },
  ]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment processed successfully!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 items-stretch">
      {/* Order Summary */}
      <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-4">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr className="border-gray-300 mb-4" />
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Form */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Payment Details
          </h2>
          <form onSubmit={handlePayment} className="space-y-4">
            {/* Cardholder Name */}
            <div>
              <label
                htmlFor="cardholderName"
                className="block text-sm font-medium text-gray-700"
              >
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                required
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline outline-2 outline-gray-500 py-2 px-4"
                placeholder="Enter cardholder name"
              />
            </div>
            {/* Card Number */}
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700 "
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline outline-2 outline-gray-500 py-2 px-4"
                placeholder="XXXX XXXX XXXX XXXX"
              />
            </div>
            {/* Expiration Date and CVV */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="expirationDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiration Date
                </label>
                <input
                  type="text"
                  id="expirationDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline outline-2 outline-gray-500 py-2 px-4"
                  placeholder="MM/YY"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline outline-2 outline-gray-500 py-2 px-4"
                  placeholder="***"
                />
              </div>
            </div>
          </form>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Pay ${totalAmount.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Payment;
