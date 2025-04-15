import React, { useState, useEffect } from 'react';
import { FiStar, FiFilter } from 'react-icons/fi';
import { restaurantsData, getRestaurantsByRating } from '../data/restaurantsData';

const Reviews = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filterRating, setFilterRating] = useState(0);
  
  useEffect(() => {
    // Initialize with all restaurants
    setRestaurants(restaurantsData);
  }, []);

  const handleRatingFilter = (rating) => {
    setFilterRating(rating);
    if (rating === 0) {
      setRestaurants(restaurantsData);
    } else {
      const filtered = getRestaurantsByRating(rating);
      setRestaurants(filtered);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const ratingNum = parseFloat(rating);
    
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingNum) {
        stars.push(<FiStar key={i} className="text-yellow-400 fill-current" />);
      } else if (i - 0.5 <= ratingNum) {
        stars.push(<FiStar key={i} className="text-yellow-400 fill-current" />);
      } else {
        stars.push(<FiStar key={i} className="text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-gray-600 dark:text-gray-400">({rating})</span>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Swiggy Restaurant Reviews</h1>
      
      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div className="flex items-center mb-4">
          <FiFilter className="mr-2 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filter by Rating</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[0, 3, 3.5, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingFilter(rating)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${filterRating === rating
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {rating === 0 ? 'All' : `${rating}+ ⭐`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div key={restaurant.Id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{restaurant.Resturant_Name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{restaurant.location}, {restaurant.City}</p>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-2">
                {renderStars(restaurant.star_rating)}
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">Cuisines:</span> {restaurant.Cuisines}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1"><span className="font-medium">Cost for two:</span> {restaurant.Cost_for_two}</p>
                {restaurant.Restaurant_Type && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1"><span className="font-medium">Type:</span> {restaurant.Restaurant_Type}</p>
                )}
                {restaurant.offer && (
                  <p className="text-sm text-green-600 font-medium mt-2">{restaurant.offer}</p>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <a 
                  href={restaurant.URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                >
                  Order on Swiggy
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;