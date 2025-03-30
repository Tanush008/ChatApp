import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUsers } from '../store/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((store) => store.auth);
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  const isSelected = selectedUsers?._id === user?._id;

  // Theme styles configuration
  const theme = {
    dark: {
      base: 'bg-gray-800 text-gray-200',
      hover: 'hover:bg-gray-700',
      selected: 'bg-gray-700',
      shadow: 'shadow-lg shadow-gray-900/50',
      hoverShadow: 'hover:shadow-lg hover:shadow-gray-900/50',
      expandBg: 'bg-gray-700'
    },
    light: {
      base: 'bg-white text-gray-800',
      hover: 'hover:bg-gray-100',
      selected: 'bg-gray-100',
      shadow: 'shadow-md shadow-gray-200/50',
      hoverShadow: 'hover:shadow-lg hover:shadow-gray-300/50',
      expandBg: 'bg-gray-100'
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUsers(user));
  };

  return (
    <div
      onClick={() => selectedUserHandler(user)}
      className={`
        group flex items-center rounded-lg p-4 cursor-pointer
        transition-all duration-300 w-full relative
        ${currentTheme.base}
        ${currentTheme.shadow}
        ${isSelected ? currentTheme.selected : currentTheme.hover}
        ${currentTheme.hoverShadow}
        transform hover:scale-[1.02]
      `}
    >
      {/* User Avatar */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-opacity-50 ring-blue-500">
        <img
          src={user?.profilePhoto || 'https://archive.org/download/whatsapp-smiling-guy-i-accidentally-made/whatsapp%20generic%20person%20dark.jpg'}
          alt="user-profile"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Online Status Indicator - if you have online status */}
        {user?.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>

      {/* User Details */}
      <div className="ml-4 flex-1">
        <p className={`text-sm font-bold transition-colors duration-300
          ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
          group-hover:text-opacity-90
        `}>
          {user?.name || 'Unknown User'}
        </p>
        {/* Optional: Last message or status */}
        <p className={`text-xs mt-1 transition-colors duration-300
          ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          group-hover:text-opacity-90
        `}>
          {user?.status || 'Hey there! I\'m using ChatApp'}
        </p>
      </div>

      {/* Expand on Hover */}
      <div className={`
        absolute right-4 transform transition-all duration-300
        opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100
        ${currentTheme.expandBg} rounded-lg px-3 py-1
      `}>
        <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {isSelected ? 'Selected' : 'Click to chat'}
        </p>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"></div>
      )}
    </div>
  );
};

export default OtherUser;