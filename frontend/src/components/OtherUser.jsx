import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUsers } from '../store/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((store) => store.auth);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUsers(user));
  };

  return (
    <div
      onClick={() => selectedUserHandler(user)}
      className="group flex items-center rounded-lg p-4 cursor-pointer shadow-md hover:shadow-lg hover:bg-blue-500 hover:text-white transition duration-300 w-full"
    >
      {/* User Avatar */}
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          src={user?.profilePhoto || 'https://archive.org/download/whatsapp-smiling-guy-i-accidentally-made/whatsapp%20generic%20person%20dark.jpg'}
          alt="user-profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Details */}
      <div className="ml-4 flex-1">
        <p className="text-sm font-bold">{user?.name || 'Unknown User'}</p>
      </div>

      {/* Expand on Hover */}
      <div className="hidden group-hover:block bg-blue-500 text-white rounded-lg px-4 py-2 absolute right-0">
        <p className="text-xs">Full Width</p>
      </div>
    </div>
  );
};

export default OtherUser;