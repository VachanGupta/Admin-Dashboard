import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import { FiUsers, FiDollarSign, FiShoppingCart, FiActivity } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Sample data for stat cards
  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,000',
      icon: <FiDollarSign className="h-6 w-6 text-white" />,
      change: '12%',
      changeType: 'increase'
    },
    {
      title: 'Total Users',
      value: '1,200',
      icon: <FiUsers className="h-6 w-6 text-white" />,
      change: '10%',
      changeType: 'increase'
    },
    {
      title: 'Total Orders',
      value: '450',
      icon: <FiShoppingCart className="h-6 w-6 text-white" />,
      change: '5%',
      changeType: 'decrease'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      icon: <FiActivity className="h-6 w-6 text-white" />,
      change: '2%',
      changeType: 'increase'
    }
  ];

  // Sample data for chart
  const chartData = [
    { name: 'Jan', revenue: 4000, users: 240 },
    { name: 'Feb', revenue: 3000, users: 198 },
    { name: 'Mar', revenue: 5000, users: 300 },
    { name: 'Apr', revenue: 8000, users: 400 },
    { name: 'May', revenue: 7000, users: 380 },
    { name: 'Jun', revenue: 9000, users: 410 },
    { name: 'Jul', revenue: 10000, users: 490 },
  ];

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

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary-color)" fill="var(--primary-color)" fillOpacity={0.2} />
              <Area type="monotone" dataKey="users" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <FiUsers className="h-5 w-5 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">New user registered</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">1 hour ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;