import React from 'react';
import './HomePage.css'; // Import the custom CSS file
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const HomePage = () => {
    return (
        <div>
            {/* <Sidebar /> */}
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4 relative">
                <div className="absolute inset-0 opacity-10 watermark"></div>
                <div className="max-w-md w-full shadow-lg bg-white text-black rounded-lg p-6 relative z-10">
                    <h1 className="text-3xl font-bold text-center mb-4">Welcome to ChatApp</h1>
                    <p className="text-center mb-6">Connect with your friends and family instantly.</p>
                    <div className="flex flex-col space-y-4">
                        <Link to='/login'>
                            <button className="btn btn-primary w-full">Sign In</button>
                        </Link>
                        <Link to='/signup'>
                            <button className="btn btn-secondary w-full">Sign Up</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomePage;