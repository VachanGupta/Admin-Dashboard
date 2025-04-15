import React from 'react';
import { FiBell, FiMoon, FiSun } from 'react-icons/fi';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">Swiggy</span>
            <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded ml-2">Admin</span>
          </div>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <FiBell className="h-6 w-6" />
            </button>
            
            <button 
              onClick={toggleDarkMode}
              className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {isDarkMode ? <FiSun className="h-6 w-6" /> : <FiMoon className="h-6 w-6" />}
            </button>
            
            <div>
              <button className="flex text-sm rounded-full">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="User"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;