import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiMoon, FiSun, FiLogOut } from 'react-icons/fi';
import { MdColorLens } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthUser } from '../store/userSlice';
import { USER_API_END_POINT } from '../utils/constant';

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Theme colors - you can add more
    const themeColors = [
        { name: 'Default', primary: 'from-gray-900 to-gray-800', accent: 'blue' },
        { name: 'Ocean', primary: 'from-blue-900 to-blue-800', accent: 'teal' },
        { name: 'Forest', primary: 'from-green-900 to-green-800', accent: 'emerald' },
        { name: 'Sunset', primary: 'from-orange-900 to-orange-800', accent: 'red' },
        { name: 'Purple', primary: 'from-purple-900 to-purple-800', accent: 'violet' }
    ];

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });
            console.log(res.data);
            if (res.data) {
                dispatch(setAuthUser(null))
                navigate('/');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Settings</h1>

                {/* Theme Mode Toggle */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <FiSun className="mr-2" /> Display
                    </h2>
                    <div className="flex items-center justify-between">
                        <span>Dark Mode</span>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
                                ${isDarkMode ? 'bg-blue-600' : 'bg-gray-600'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                                    ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Theme Colors */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <MdColorLens className="mr-2" /> Theme Colors
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {themeColors.map((theme, index) => (
                            <button
                                key={index}
                                className={`p-4 rounded-lg bg-gradient-to-r ${theme.primary} 
                                    hover:opacity-90 transition-opacity duration-300
                                    flex items-center justify-between`}
                            >
                                <span>{theme.name}</span>
                                <div className={`w-4 h-4 rounded-full bg-${theme.accent}-500`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Settings */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Chat Settings</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Send messages on Enter</span>
                            <input type="checkbox" className="toggle toggle-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Show read receipts</span>
                            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Desktop notifications</span>
                            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-gray-600" />

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg
                        transition-colors duration-300 flex items-center justify-center space-x-2
                        hover:shadow-lg active:transform active:scale-95"
                >
                    <FiLogOut className="text-xl" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Settings;