import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../utils/constant';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = React.useRef(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!avatar) {
            navigate('/frontPage');
            return;
        }

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('avatar', avatar);

            const response = await axios.post(
                `${USER_API_END_POINT}/setProfile`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                navigate('/frontPage');
            }
        } catch (error) {
            setError('Failed to update profile picture');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col items-center">
                    {/* Profile Photo Section */}
                    <div className="relative w-32 h-32 mb-6">
                        <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                            <img 
                                src={avatar ? URL.createObjectURL(avatar) : "https://via.placeholder.com/150"} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Hidden File Input */}
                        <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            className="hidden"
                        />
                        {/* Camera Icon Overlay */}
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        >
                            <FaCamera className="text-white text-2xl" />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-2 rounded-full text-white transition duration-300 ease-in-out ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isLoading ? 'Uploading...' : avatar ? 'Confirm' : 'Skip'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Profile;