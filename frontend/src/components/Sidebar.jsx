import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaEnvelope, FaCog, FaSignOutAlt} from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="h-screen w-30 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center py-6 shadow-lg">
            {/* Logo */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">ChatApp</h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-6 w-full">
                <Link
                    to="/"
                    className="flex items-center space-x-4 px-4 py-2 hover:bg-blue-600 rounded-lg transition duration-300"
                >
                    <FaHome className="text-xl" />
                    <span className="text-lg">Home</span>
                </Link>
                <Link
                    to="/friends"
                    className="flex items-center space-x-4 px-4 py-2 hover:bg-blue-600 rounded-lg transition duration-300"
                >
                    <FaUserFriends className="text-xl" />
                    <span className="text-lg">Friends</span>
                </Link>
                <Link
                    to="/messages"
                    className="flex items-center space-x-4 px-4 py-2 hover:bg-blue-600 rounded-lg transition duration-300"
                >
                    <FaEnvelope className="text-xl" />
                    <span className="text-lg">Messages</span>
                </Link>
                <Link
                    to="/settings"
                    className="flex items-center space-x-4 px-4 py-2 hover:bg-blue-600 rounded-lg transition duration-300"
                >
                    <FaCog className="text-xl" />
                    <span className="text-lg">Settings</span>
                </Link>
                <Link
                    to="/logout"
                    className="flex items-center space-x-4 px-4 py-2 hover:bg-blue-600 rounded-lg transition duration-300"
                >
                    <FaSignOutAlt className="text-xl" />
                    <span className="text-lg">Logout</span>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;