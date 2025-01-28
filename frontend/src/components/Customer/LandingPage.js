import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">

      {/* Hero Section */}
      <div className="bg-gray-100 flex flex-1 flex-col md:flex-row items-center justify-between  py-20 px-6">
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover the Best Dishes in Town!
          </h2>
          <p className="text-gray-600 mb-6">
            Satisfy your cravings with our wide variety of cuisines, from local
            favorites to international delicacies. Order now or dine with us for
            an unforgettable experience.
          </p>
          <div className="space-x-4">
            <Link to="/scan">
              <button className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700">
                Explore
              </button>
            </Link>
            <Link to="/restaurant/details/123">
              <button className="border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-100">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-10 md:mt-0 md:w-1/2">
          <img
            src="/images/hero-dish.jpg"
            alt="Delicious Dishes"
            className="rounded-lg shadow-lg h-[400px] object-cover float-right"
          />
        </div>
      </div>

      {/* Featured Dishes */}
      <section className="bg-gray-950 bg-opacity-45 py-10">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-100 text-center mb-8">
            Featured Dishes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dish 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/images/pizza.jpg"
                alt="Pizza"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800">Pizza</h4>
                <p className="text-gray-600 mt-2">
                  A classic favorite with a crispy crust and delicious toppings.
                </p>
              </div>
            </div>
            {/* Dish 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/images/pasta.jpg"
                alt="Pasta"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800">Pasta</h4>
                <p className="text-gray-600 mt-2">
                  A creamy and savory treat made with fresh ingredients.
                </p>
              </div>
            </div>
            {/* Dish 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/images/burger.jpg"
                alt="Burger"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800">Burger</h4>
                <p className="text-gray-600 mt-2">
                  Juicy and satisfying, with all the toppings you love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 border-t-2 border-gray-400">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Foodies' Paradise. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
