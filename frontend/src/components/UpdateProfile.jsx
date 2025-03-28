import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setAuthUser } from '../store/userSlice';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        bio: user?.Bio || '',
    });
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
f
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key]) formDataToSend.append(key, formData[key]);
            });
            if (avatar) formDataToSend.append('avatar', avatar);

            const response = await axios.post(
                `${USER_API_END_POINT}/updateProfile`,
                formDataToSend,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );
            // console.log(response.data);
            if (response.data.success) {
                dispatch(setAuthUser(response.data.user));
                setSuccess(true);
                setTimeout(() => navigate('/profile'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Update Profile</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Photo */}
                    <div className="flex justify-center">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500 ring-opacity-50">
                                <img
                                    src={avatar ? URL.createObjectURL(avatar) : user?.avatar || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute -top-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center 
                                         transform transition-all duration-300 hover:scale-110 hover:bg-blue-600 focus:outline-none"
                            >
                                <FaCamera className="text-white text-xl" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 gap-6 mt-8">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white"
                                placeholder="Leave blank to keep current password"
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                rows="4"
                                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white resize-none"
                                placeholder="Tell us about yourself..."
                            />
                            <p className="mt-1 text-sm text-gray-400">
                                {formData.bio.split(/\s+/).filter(word => word.length > 0).length}/200 words
                            </p>
                        </div>
                    </div>

                    {/* Error and Success Messages */}
                    {error && (
                        <div className="text-red-500 text-sm mt-2">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-500 text-sm mt-2">Profile updated successfully!</div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center mt-8">
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`
                                px-8 py-3 rounded-full text-white text-lg font-medium
                                transform transition-all duration-300
                                ${isLoading
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 hover:scale-105 hover:shadow-lg active:scale-95'
                                }
                            `}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </div>
                            ) : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;