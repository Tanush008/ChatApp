import React from 'react';
import MessageContainer from './MessageContainer';
// import Sidebars from './ChatSideBar';
import Sidebar from './Sidebar';
import ChatSideBar from './ChatSideBar';

const FrontPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Sidebar */}
      <div className="w-1/9 text-black shadow-lg p-4">
        <Sidebar />
      </div>

      {/* Sidebars (Middle Section) */}
      <div className="w-1/4 text-black shadow-lg p-4 mx-4 rounded-lg">
        <ChatSideBar/>
      </div>

      {/* Message Container (Main Content) */}
      <div className="flex-1 text-black shadow-lg p-6 rounded-lg">
        <MessageContainer />
      </div>
    </div>
  );
};

export default FrontPage;