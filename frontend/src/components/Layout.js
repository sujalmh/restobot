// Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navigation/Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavbarRoutes = ['/signin', '/signup'];

  return (
    <div className="App bg-gray-900">
      <div className='absolute bottom-0 h-full chat-background'></div>
      {/* Conditionally render the Navbar */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar/>}
      <main className="content z-10">{children}</main>
    </div>
  );
};

export default Layout;
