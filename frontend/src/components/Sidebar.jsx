import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserFriends, FaEnvelope, FaCog } from 'react-icons/fa';
import SmallPartition from './SmallPartition';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Theme configuration
    const theme = {
        dark: {
            background: 'bg-gradient-to-b from-gray-900 to-gray-800',
            text: 'text-gray-300',
            hover: 'hover:bg-gray-700',
            tooltip: 'bg-gray-700 text-gray-100',
            iconHover: 'hover:text-white',
            border: 'border-gray-700',
            shadow: 'shadow-lg shadow-gray-900/50'
        },
        light: {
            background: 'bg-gradient-to-b from-gray-100 to-white',
            text: 'text-gray-600',
            hover: 'hover:bg-gray-200',
            tooltip: 'bg-gray-200 text-gray-800',
            iconHover: 'hover:text-gray-900',
            border: 'border-gray-200',
            shadow: 'shadow-lg shadow-gray-200/50'
        }
    };

    const currentTheme = isDarkMode ? theme.dark : theme.light;

    const NavLink = ({ to, icon: Icon, label }) => (
        <Link
            to={to}
            className={`
                relative group flex items-center justify-between px-5 py-2 rounded-lg 
                ${currentTheme.hover} transition-all duration-300
                transform hover:scale-105
            `}
        >
            <Icon className={`text-xl ${currentTheme.text} ${currentTheme.iconHover} transition-colors duration-300`} />
            <span className={`
                absolute left-7 bottom-5 text-xs opacity-0 group-hover:opacity-100 
                ${currentTheme.tooltip} rounded-md px-2 py-3 
                transition-all duration-300 transform scale-95 group-hover:scale-100
                whitespace-nowrap z-50
            `}>
                {label}
            </span>
        </Link>
    );

    return (
        <div className={`
            h-screen w-25 flex flex-col justify-between py-6 
            ${currentTheme.background} ${currentTheme.shadow}
            transition-colors duration-300 rounded-lg
        `}>
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-6 w-full">
                <NavLink to="/" icon={FaHome} label="Home" />
                <NavLink to="/friends" icon={FaUserFriends} label="Friends" />
                <NavLink to="/messages" icon={FaEnvelope} label="Messages" />
            </nav>

            {/* Bottom NavBar */}
            <div className="w-full mt-auto">
                <div className="flex flex-col items-center gap-4 px-4 py-2">
                    {/* Profile Photo */}
                    <div className="flex flex-col items-center">
                        <div className={`
                            w-10 h-10 rounded-full overflow-hidden 
                            ring-2 ring-opacity-50 ring-blue-500
                            transition-transform duration-300 hover:scale-110
                        `}>
                            <img
                                src={user?.avatar || 'https://archive.org/download/whatsapp-smiling-guy-i-accidentally-made/whatsapp%20generic%20person%20dark.jpg'}
                                alt="user-profile"
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => navigate('/updateProfile')}
                            />
                        </div>
                    </div>

                    <SmallPartition isDarkMode={isDarkMode} />

                    {/* Settings Icon */}
                    <Link
                        to="/settings"
                        className={`
                            relative group flex items-center justify-center p-2 rounded-lg 
                            ${currentTheme.hover} transition-all duration-300
                            transform hover:scale-105
                        `}
                    >
                        <FaCog className={`
                            text-xl ${currentTheme.text} ${currentTheme.iconHover}
                            transition-transform duration-300 group-hover:rotate-90
                        `} />
                        <span className={`
                            absolute left-14 text-xs opacity-0 group-hover:opacity-100 
                            ${currentTheme.tooltip} rounded-md px-2 py-1 
                            transition-all duration-300 transform scale-95 group-hover:scale-100
                            whitespace-nowrap z-50
                        `}>
                            Settings
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;