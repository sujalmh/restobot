import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const RestaurantDetails = () => {
  const restaurant = {
    name: "Delicious Bites",
    address: "123 Foodie Lane, Gourmet City, FC 56789",
    phone: "+1 (123) 456-7890",
    id: "1",
  };

  const qrValue = restaurant.id;

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Restaurant Details */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{restaurant.name}</h1>
        <p className="text-gray-600 mb-2">
          <strong>Address:</strong> {restaurant.address}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Phone:</strong> {restaurant.phone}
        </p>
        <p className="text-gray-600 mb-6">
          <strong>ID:</strong>{" "}
            {restaurant.id}
        </p>

        {/* QR Code */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Scan QR Code</h2>
          <QRCodeCanvas
            value={qrValue}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
            className="shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
