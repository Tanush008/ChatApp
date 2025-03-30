import React from 'react';
import MessageContainer from './MessageContainer';
// import Sidebars from './ChatSideBar';
import Sidebar from './Sidebar';
import ChatSideBar from './ChatSideBar';
import { useSelector } from 'react-redux';

// Add this CSS to your global styles or create a new style tag
const styles = {
  hideScrollbar: `
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  `
};

const FrontPage = () => {
  // Get theme state from Redux or localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Define theme-specific styles
  const themeStyles = {
    dark: {
      background: 'bg-gradient-to-r from-gray-900 to-gray-800',
      text: 'text-white',
      divider: 'bg-white/20',
      container: 'bg-opacity-20 backdrop-blur-sm'
    },
    light: {
      background: 'bg-gradient-to-r from-gray-100 to-white',
      text: 'text-gray-800',
      divider: 'bg-gray-300',
      container: 'bg-white/70 backdrop-blur-sm'
    }
  };

  const theme = isDarkMode ? themeStyles.dark : themeStyles.light;

  return (
    <div className={`flex h-screen overflow-hidden ${theme.background} transition-colors duration-300`}>
      {/* Sidebar */}
      <div className="h-screen overflow-y-auto" style={{ width: '97px' }}>
        <div className={`${theme.text} p-4 ${theme.container} h-full`}>
          <Sidebar />
        </div>
      </div>

      {/* Vertical Divider */}
      <div className={`w-px ${theme.divider} h-screen`}></div>

      {/* Chat Sidebar (Middle Section) */}
      <div className="h-screen overflow-y-auto" style={{ width: '25%' }}>
        <div className={`${theme.text} p-4 ${theme.container} h-full`}>
          <ChatSideBar />
        </div>
      </div>

      {/* Vertical Divider */}
      <div className={`w-px ${theme.divider} h-screen`}></div>

      {/* Message Container (Main Content) */}
      <div className="flex-1 h-screen overflow-y-auto">
        <div className={`${theme.text} p-6 ${theme.container} h-full`}>
          <MessageContainer />
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        * {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default FrontPage; 