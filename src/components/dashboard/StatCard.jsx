import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatCard = ({ title, value, icon, change, changeType }) => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-primary rounded-md p-3">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
        <div className="text-sm">
          <div className="flex items-center">
            {changeType === 'increase' ? (
              <FiTrendingUp className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" />
            ) : (
              <FiTrendingDown className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400" />
            )}
            <span
              className={`font-medium ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}
            >
              {change}
            </span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">from previous period</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;