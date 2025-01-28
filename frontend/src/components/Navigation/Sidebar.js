import React, { useEffect, useRef } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, type }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform border border-l-0 border-t-0 border-b-0 border-r-1 border-gray-600 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center px-4 py-4 bg-blue-700">
        <h2 className="text-lg font-bold">{type === 'restaurant' ? 'Restaurant Menu' : 'User Menu'}</h2>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col p-4">
        {type === 'restaurant' ? (
          <>
            <Link to="/restaurant/dashboard" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              Dashboard
            </Link>
            <Link to="/restaurant/manage/menu" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              Menu Management
            </Link>
            <a href="#" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              Reservations
            </a>
            <a href="#" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              Inventory
            </a>
            <Link to="/restaurant/details" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              Details
            </Link>
            <a href="#" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              Report
            </a>
          </>
        ) : (
          <>
            <Link to="/user/home" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              Home
            </Link>
            <Link to="/user/orders" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              My Orders
            </Link>
            <Link to="/user/favorites" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              Favorites
            </Link>
            <Link to="/user/profile" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              Profile
            </Link>
            <Link to="/user/help" className="hover:bg-gray-700 px-3 py-3 rounded-md text-gray-300 font-bold">
              Help & Support
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
