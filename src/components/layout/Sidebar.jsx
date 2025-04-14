import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiSettings, FiPieChart, FiMenu, FiX } from 'react-icons/fi';

const Sidebar = ({ isMobile, setIsMobile }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobile(!isMobile);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const navItems = [
    { title: 'Dashboard', icon: <FiHome className="w-5 h-5" />, path: '/' },
    { title: 'Users', icon: <FiUsers className="w-5 h-5" />, path: '/users' },
    { title: 'Analytics', icon: <FiPieChart className="w-5 h-5" />, path: '/analytics' },
    { title: 'Settings', icon: <FiSettings className="w-5 h-5" />, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        onClick={toggleSidebar}
      >
        {isMobile ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {/* Sidebar for mobile */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transition-opacity ${isMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out transform ${isMobile ? 'translate-x-0' : '-translate-x-full'}">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-6 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h2>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsMobile(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobile(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <aside
        className={`hidden md:flex flex-col h-screen ${isOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between px-4 py-6 border-b dark:border-gray-700">
          {isOpen ? (
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h2>
          ) : null}
          <button
            type="button"
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <span className="mr-3">{item.icon}</span>
              {isOpen && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;