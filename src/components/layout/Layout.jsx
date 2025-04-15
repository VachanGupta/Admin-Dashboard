import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ThemeCustomizer from './ThemeCustomizer';

// This is the main layout component that wraps around all pages
const Layout = ({ children }) => {
  // State to control if sidebar is open on mobile
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // State to track if dark mode is on or off
  const [isDarkMode, setIsDarkMode] = useState(false);

  // When the page loads, check if user prefers dark mode
  useEffect(() => {
    // Check if dark mode setting exists in browser storage
    const savedDarkMode = localStorage.getItem('darkMode');
    
    // If user has saved a preference, use that
    // Otherwise check their system preference
    if (savedDarkMode === 'true' || 
        (!savedDarkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Function to switch between dark and light mode
  const toggleDarkMode = () => {
    // Flip the current mode
    setIsDarkMode(!isDarkMode);
    
    if (!isDarkMode) {
      // Switching to dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      // Switching to light mode
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar for navigation */}
      <Sidebar isMobile={isMobileSidebarOpen} setIsMobile={setIsMobileSidebarOpen} />
      
      {/* Main content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation bar */}
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        
        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Theme customizer panel */}
      <ThemeCustomizer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default Layout;