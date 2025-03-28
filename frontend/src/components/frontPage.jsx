import React from 'react';
import MessageContainer from './MessageContainer';
// import Sidebars from './ChatSideBar';
import Sidebar from './Sidebar';
import ChatSideBar from './ChatSideBar';

const FrontPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
      {/* Sidebar */}
      <div className="w-1/9 text-white p-4 bg-opacity-20 backdrop-blur-sm">
        <Sidebar />
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-white/20"></div>

      {/* Chat Sidebar (Middle Section) */}
      <div className="w-1/4 text-white p-4 mx-4 bg-opacity-20 backdrop-blur-sm">
        <ChatSideBar/>
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-white/20"></div>

      {/* Message Container (Main Content) */}
      <div className="flex-1 text-white p-6 bg-opacity-20 backdrop-blur-sm">
        <MessageContainer />
      </div>
    </div>
  );
};

export default FrontPage;