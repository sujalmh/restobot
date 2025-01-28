import React, { useState } from 'react';
// import { QRCodeSVG } from 'qrcode.react';

const OrderPage = () => {
  const restaurantName = "Gourmet Restaurant";
  const orderDetails = [
    {
      name: 'Gourmet Burger',
      price: 12.99,
      quantity: 2
    },
    {
      name: 'Truffle Fries',
      price: 5.49,
      quantity: 3
    },
    {
      name: 'Caesar Salad',
      price: 8.99,
      quantity: 1
    }
  ];

  const totalAmount = orderDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'UPI'];

  // State to handle selected payment method and QR code visibility
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  // const [showQRCode, setShowQRCode] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    // setShowQRCode(false); // Hide QR code when changing method
  };

  const handleConfirmOrder = () => {
    if (selectedPaymentMethod) {
      // setShowQRCode(true);
    } else {
      alert("Please select a payment method before confirming the order.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">{restaurantName}</h1>
        
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        <div className="space-y-4 mb-6">
          {orderDetails.map((item, index) => (
            <div key={index} className="flex justify-between">
              <p>{item.name} (x{item.quantity})</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-600 pt-4">
          <div className="flex justify-between text-lg font-medium">
            <p>Total Amount:</p>
            <p className="text-2xl font-semibold">${totalAmount.toFixed(2)}</p>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Select Payment Method</h2>
          <select
            value={selectedPaymentMethod}
            onChange={handlePaymentMethodChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
          >
            <option value="">-- Select Payment Method --</option>
            {paymentMethods.map((method, index) => (
              <option key={index} value={method}>{method}</option>
            ))}
          </select>
        </div>

        {/* QR Code for Payment */}
        {/* {showQRCode && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">Scan to Pay</h2>
            <QRCodeSVG value={`https://paymentgateway.com/pay?amount=${totalAmount.toFixed(2)}`} size={256} />
          </div>
        )} */}

        {/* Confirm Order Button */}
        <div className="mt-6 text-center">
          <button 
            onClick={handleConfirmOrder}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
