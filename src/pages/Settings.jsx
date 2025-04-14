import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: document.documentElement.classList.contains('dark'),
    language: 'english',
    compactView: false,
    autoSave: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic would go here
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">User Preferences</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Customize your dashboard experience</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Theme Settings */}
            <div className="sm:col-span-6">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Theme Settings</h4>
              <div className="mt-2 space-y-4">
                <div className="flex items-center">
                  <input
                    id="darkMode"
                    name="darkMode"
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="darkMode" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dark Mode
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="compactView"
                    name="compactView"
                    type="checkbox"
                    checked={settings.compactView}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="compactView" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Compact View
                  </label>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="sm:col-span-6">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Notification Settings</h4>
              <div className="mt-2 space-y-4">
                <div className="flex items-center">
                  <input
                    id="notifications"
                    name="notifications"
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="notifications" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="autoSave"
                    name="autoSave"
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="autoSave" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Auto-save Changes
                  </label>
                </div>
              </div>
            </div>

            {/* Language Settings */}
            <div className="sm:col-span-3">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Language
              </label>
              <div className="mt-1">
                <select
                  id="language"
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset to Default
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <FiSave className="mr-2 h-5 w-5" />
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;