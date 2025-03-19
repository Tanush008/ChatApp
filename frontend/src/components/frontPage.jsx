import React from 'react';
import Sidebar from './Sidebar';

const FrontPage = () => {
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="bg-white text-black shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-4">Welcome to ChatApp</h1>
                    <p className="text-lg mb-6">
                        Start chatting with your friends and family. Explore the features of ChatApp and stay connected!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow-md transition duration-300">
                            <h2 className="text-xl font-bold">Messages</h2>
                            <p>View and manage your conversations.</p>
                        </div>
                        <div className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg shadow-md transition duration-300">
                            <h2 className="text-xl font-bold">Friends</h2>
                            <p>Connect with your friends and add new ones.</p>
                        </div>
                        <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg shadow-md transition duration-300">
                            <h2 className="text-xl font-bold">Profile</h2>
                            <p>Update your profile and account settings.</p>
                        </div>
                        <div className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg shadow-md transition duration-300">
                            <h2 className="text-xl font-bold">Settings</h2>
                            <p>Customize your ChatApp experience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;