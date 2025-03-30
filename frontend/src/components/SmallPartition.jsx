import React from 'react';

const SmallPartition = ({ isDarkMode }) => {
  return (
    <div className={`w-full h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} transition-colors duration-300`} />
  );
};

export default SmallPartition;