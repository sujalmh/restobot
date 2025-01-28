import React,  {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate for redirection
import axiosInstance from '../../axios'; // Import axios instance
import '../css/ScrollBar.css';
import Alert from '../Alert';

const RestaurantProfile = () => {
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [error, setError] = useState('');
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axiosInstance.get(`/api/restaurant/landing/${id}`);
        setInfo(response.data);
        setDishes(response.data.menu);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } 
    };

    fetchInfo();
    
  }, [id]);

  const navigate = useNavigate();

  const restaurantInfo = {
    name: "The Grand Gourmet",
    tagline: "Exquisite Dining Experience",
    description:
      "Nestled in the heart of the city, The Grand Gourmet is an elegant sanctuary offering a blend of modern and classic cuisine. Our chefs use only the finest ingredients, crafted to perfection with flavors that tantalize the senses.",
    image: "https://secure.s.forbestravelguide.com/img/properties/palazzo-parigi-hotel-grand-spa-milano/extra-large/palazzo-parigi-hotel-grand-spa-milano-gastronomic-restaurant.jpg", // Replace with actual image URL
    highlights: ["Award-Winning Chefs", "World-Class Service", "Luxurious Ambiance", "Exclusive Wine Selection"],
    menu: [
      { name: "Truffle Risotto", price: "$39.99" },
      { name: "Wagyu Beef Steak", price: "$59.99" },
      { name: "Caviar & Blinis", price: "$29.99" },
      { name: "Saffron Seafood Paella", price: "$45.99" },
      { name: "Decadent Chocolate Fondant", price: "$19.99" },
    ],
  };

  const handleStartOrdering = async () => {
    const restId = id; // Replace with the actual restaurant ID

    try {
      // Make API call to start an order and get the session_id
      const response = await axiosInstance.post(`/api/start_order/${restId}`);
      const { session_id } = response.data;

      // Store session_id in sessionStorage
      sessionStorage.setItem('session_id', session_id);

      navigate(`/chat/${id}`);
    } catch (error) {
      console.error('Error starting order:', error);
      alert('Unable to start an order. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100" id="rest-info">
      {/* Header Section */}
      <header className="relative">
        <img src={info.banner} alt="Restaurant" className="w-full h-96 object-cover brightness-75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
          <h1 className="text-5xl font-bold text-white">{info.name}</h1>
          <p className="text-lg text-gray-300 italic mt-2">{info.address}</p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 mt-4"
            onClick={handleStartOrdering} // Call handleStartOrdering on click
          >
            Start ordering
          </button>
        </div>
      </header>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-semibold text-center mb-6">About Us</h2>
        <p className="text-gray-300 text-lg text-center mb-8">{info.description}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {restaurantInfo.highlights.map((highlight, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-100 font-semibold">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section className="bg-gray-800 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center mb-6">Our Menu</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dishes.map((item) => (
              <div key={item.id} className="p-6 bg-gray-700 rounded-lg flex justify-between items-center">
                <img src={item.image} alt={item.dish_name} className="w-24 h-24 object-cover rounded-md" />
                <h3 className="text-xl font-medium">{item.dish_name}</h3>
                <span className="text-lg text-green-400">₹ {item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservations Section */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-semibold text-center mb-6">Reserve Your Table</h2>
        <p className="text-gray-300 text-center mb-8">Experience luxury dining with us. Reserve a table to ensure a memorable evening.</p>
        <div className="flex justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200">
            Book Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 mt-10">
        <p className="text-center text-gray-500">&copy; 2024 The Grand Gourmet. All Rights Reserved.</p>
      </footer>
      {error && <Alert type="danger" message={error} onClose={() => setError("")} />}
    </div>
  );
};

export default RestaurantProfile;