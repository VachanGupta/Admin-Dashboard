import React, { useState } from 'react';
import { FiSettings, FiX } from 'react-icons/fi';

const ThemeCustomizer = ({ isDarkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');

  const colors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Pink', value: '#EC4899' },
  ];

  const handleColorChange = (color) => {
    setPrimaryColor(color);
    document.documentElement.style.setProperty('--primary-color', color);
    
    const lighterColor = color + '33';
    document.documentElement.style.setProperty('--primary-color-light', lighterColor);
    
    const darkerColor = adjustColorBrightness(color, -20);
    document.documentElement.style.setProperty('--primary-color-dark', darkerColor);
  };
  
  const adjustColorBrightness = (hex, percent) => {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    
    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));
    
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <FiSettings className="h-6 w-6" />
      </button>


      <div className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col py-6 overflow-y-auto">
          <div className="px-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Theme Settings</h2>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 px-4 space-y-6">

            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Mode</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Dark Mode</span>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isDarkMode ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <span className="sr-only">Toggle dark mode</span>
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </div>


            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Primary Color</h3>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${primaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorChange(color.value)}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>


            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Font Size</h3>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  Small
                </button>
                <button className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700">
                  Medium
                </button>
                <button className="p-2 text-base border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  Large
                </button>
              </div>
            </div>


            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Layout Density</h3>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  Compact
                </button>
                <button className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700">
                  Default
                </button>
                <button className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  Comfortable
                </button>
              </div>
            </div>


            <div className="pt-4">
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => {
                  handleColorChange('#3B82F6');

                }}
              >
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;