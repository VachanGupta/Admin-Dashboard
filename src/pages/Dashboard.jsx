import React, { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import { FiUsers, FiDollarSign, FiShoppingCart, FiActivity, FiStar, FiMapPin } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { restaurantsData } from '../data/restaurantsData';

const Dashboard = () => {
  // Process restaurant data for dashboard metrics
  const totalRestaurants = restaurantsData.length;
  const avgRating = (restaurantsData.reduce((sum, restaurant) => sum + parseFloat(restaurant.star_rating), 0) / totalRestaurants).toFixed(1);
  
  // Calculate average order value from Cost_for_two
  const avgOrderValue = (restaurantsData.reduce((sum, restaurant) => {
    const cost = parseInt(restaurant.Cost_for_two.replace('₹', '').replace(',', ''));
    return sum + cost;
  }, 0) / totalRestaurants / 2).toFixed(0);
  
  // Count restaurants by type
  const restaurantTypes = {};
  restaurantsData.forEach(restaurant => {
    if (restaurant.Restaurant_Type) {
      restaurantTypes[restaurant.Restaurant_Type] = (restaurantTypes[restaurant.Restaurant_Type] || 0) + 1;
    }
  });
  
  // Restaurant stat cards
  const stats = [
    {
      title: 'Total Restaurants',
      value: totalRestaurants,
      icon: <FiShoppingCart className="h-6 w-6 text-white" />,
      change: '8%',
      changeType: 'increase'
    },
    {
      title: 'Average Rating',
      value: avgRating,
      icon: <FiStar className="h-6 w-6 text-white" />,
      change: '0.3',
      changeType: 'increase'
    },
    {
      title: 'Average Order Value',
      value: `₹${avgOrderValue}`,
      icon: <FiDollarSign className="h-6 w-6 text-white" />,
      change: '5%',
      changeType: 'increase'
    },
    {
      title: 'Active Locations',
      value: '12',
      icon: <FiMapPin className="h-6 w-6 text-white" />,
      change: '2',
      changeType: 'increase'
    }
  ];

  // Monthly order data
  const orderData = [
    { name: 'Jan', orders: 4000, revenue: 2400000 },
    { name: 'Feb', orders: 3500, revenue: 2100000 },
    { name: 'Mar', orders: 5000, revenue: 3000000 },
    { name: 'Apr', orders: 5500, revenue: 3300000 },
    { name: 'May', orders: 6000, revenue: 3600000 },
    { name: 'Jun', orders: 6500, revenue: 3900000 },
    { name: 'Jul', orders: 7000, revenue: 4200000 },
  ];
  
  // Process cuisine data for pie chart
  const cuisineCount = {};
  restaurantsData.forEach(restaurant => {
    const cuisines = restaurant.Cuisines.split(', ');
    cuisines.forEach(cuisine => {
      cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
    });
  });
  
  // Convert to array and take top 5 cuisines
  const cuisineData = Object.entries(cuisineCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Restaurant types for bar chart
  const restaurantTypeData = Object.entries(restaurantTypes)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Dashboard</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>

      {/* Orders & Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Orders & Revenue Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={orderData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis yAxisId="left" stroke="#6B7280" />
              <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="orders" name="Total Orders" stroke="var(--primary-color)" fill="var(--primary-color)" fillOpacity={0.2} />
              <Area yAxisId="right" type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#F97316" fill="#F97316" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Restaurant Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Popular Cuisines */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Popular Cuisines</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cuisineData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {cuisineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Restaurant Types */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Restaurant Types</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={restaurantTypeData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Number of Restaurants" fill="#F97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Restaurant Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Restaurant Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
              <FiStar className="h-5 w-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">New 5-star review for Indian Accent</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">30 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <FiShoppingCart className="h-5 w-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Smoke House Deli completed 100 orders today</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
              <FiMapPin className="h-5 w-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">New restaurant onboarded in Khan Market</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;