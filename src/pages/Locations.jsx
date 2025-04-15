import React, { useState, useEffect } from 'react';
import { FiMapPin, FiFilter } from 'react-icons/fi';
import { restaurantsData, getLocations, getRestaurantsByLocation } from '../data/restaurantsData';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Coordinates for New Delhi (center of the map)
const DEFAULT_CENTER = [28.6139, 77.2090];

// Dummy coordinates for restaurants (in real app, these would come from the API)
const getRestaurantCoordinates = (restaurant) => {
  // In a real application, these coordinates would come from your database
  // This is just a simulation to spread restaurants around Delhi
  const locationCoords = {
    'Khan Market': [28.6006, 77.2273],
    'Lodhi Road': [28.5882, 77.2321],
    'Jama Masjid': [28.6507, 77.2334],
    'Connaught Place': [28.6304, 77.2177],
    'Chandni Chowk': [28.6505, 77.2303],
    'Anand Lok': [28.5576, 77.2180],
    'Sector 29': [28.4691, 77.0602],
    'GK 2': [28.5439, 77.2467],
    'Cyber Hub': [28.4957, 77.0881],
    'Hauz Khas': [28.5494, 77.2001],
    'GTB Nagar': [28.6981, 77.2055]
  };
  
  return locationCoords[restaurant.location] || [28.6139 + (Math.random() * 0.05), 77.2090 + (Math.random() * 0.05)];
};

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    // Get all unique locations
    const locationsList = getLocations();
    setLocations(['All', ...locationsList]);
    
    // Initialize with all restaurants
    setFilteredRestaurants(restaurantsData);
  }, []);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    
    if (location === 'All') {
      setFilteredRestaurants(restaurantsData);
    } else {
      const filtered = getRestaurantsByLocation(location);
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Swiggy Restaurant Locations</h1>
      
      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div className="flex items-center mb-4">
          <FiFilter className="mr-2 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filter by Location</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => handleLocationChange(location)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedLocation === location
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <div className="flex items-center mb-4">
          <FiMapPin className="mr-2 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Swiggy Delivery Partners</h2>
        </div>
        <div className="h-80 rounded-lg overflow-hidden">
          <MapContainer 
            center={DEFAULT_CENTER} 
            zoom={12} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredRestaurants.map((restaurant) => {
              const position = getRestaurantCoordinates(restaurant);
              return (
                <Marker key={restaurant.Id} position={position}>
                  <Popup>
                    <div>
                      <h3 className="font-bold">{restaurant.Resturant_Name}</h3>
                      <p>{restaurant.Address}</p>
                      <p>Rating: {restaurant.star_rating} ⭐</p>
                      {restaurant.offer && <p className="text-green-600">{restaurant.offer}</p>}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Restaurants List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {selectedLocation === 'All' ? 'All Swiggy Partner Restaurants' : `Swiggy Partners in ${selectedLocation}`}
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({filteredRestaurants.length})</span>
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Restaurant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cuisines</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {filteredRestaurants.map((restaurant) => (
                <tr key={restaurant.Id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{restaurant.Resturant_Name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{restaurant.Address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{restaurant.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{restaurant.star_rating}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{restaurant.Cuisines}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Locations;