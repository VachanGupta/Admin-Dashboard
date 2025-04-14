import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ThemeCustomizer from './ThemeCustomizer';

const Layout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode based on user preference or system preference
  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true' || 
        (!('darkMode' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar component */}
      <Sidebar isMobile={isMobileSidebarOpen} setIsMobile={setIsMobileSidebarOpen} />
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Theme Customizer */}
      <ThemeCustomizer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default Layout;