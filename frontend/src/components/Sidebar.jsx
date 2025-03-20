import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaEnvelope, FaCog } from 'react-icons/fa';
import SmallPartition from './SmallPartition';

const Sidebar = ({ user }) => {
    return (
        <div className="h-screen w-25 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 flex flex-col justify-between py-6 shadow-lg rounded-lg">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-6 w-full">
                <Link
                    to="/"
                    className="relative group flex items-center justify-between px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    <FaHome className="text-xl" />
                    <span className="absolute bottom-10 text-xs opacity-0 group-hover:opacity-100 bg-gray-700 text-gray-100 rounded-md px-2 py-1 transition duration-300">
                        Home
                    </span>
                </Link>
                <Link
                    to="/friends"
                    className="relative group flex items-center justify-between px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    <FaUserFriends className="text-xl" />
                    <span className="absolute bottom-10 text-xs opacity-0 group-hover:opacity-100 bg-gray-700 text-gray-100 rounded-md px-2 py-1 transition duration-300">
                        Friends
                    </span>
                </Link>
                <Link
                    to="/messages"
                    className="relative group flex items-center justify-between px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    <FaEnvelope className="text-xl" />
                    <span className="absolute bottom-10 text-xs opacity-0 group-hover:opacity-100 bg-gray-700 text-gray-100 rounded-md px-2 py-1 transition duration-300">
                        Messages
                    </span>
                </Link>
            </nav>

            {/* Bottom NavBar */}
            <div className="w-full mt-auto">
                <div className="flex flex-col items-center gap-4 px-4 py-2">
                    {/* Profile Photo */}
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                                src={user?.profilePhoto || 'https://archive.org/download/whatsapp-smiling-guy-i-accidentally-made/whatsapp%20generic%20person%20dark.jpg'}
                                alt="user-profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <SmallPartition />

                    {/* Settings Icon */}
                    <Link
                        to="/settings"
                        className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-700 transition duration-300"
                    >
                        <FaCog className="text-xl text-gray-300" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;