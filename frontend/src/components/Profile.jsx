import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAuthUser } from '../store/userSlice';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState(null);
    const [bio, setBio] = useState('');
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

    const handleBioChange = (e) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        if (words.length <= 200) {
            setBio(text);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!avatar && !bio) {
            navigate('/frontPage');
            return;
        }

        try {
            setIsLoading(true);
            const formData = new FormData();
            if (avatar) formData.append('avatar', avatar);
            if (bio) formData.append('Bio', bio);

            const response = await axios.post(
                `${USER_API_END_POINT}/setProfile`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                dispatch(setAuthUser(response.data.user));
                navigate('/frontPage');
            }
        } catch (error) {
            setError('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate word count
    const wordCount = bio.trim().split(/\s+/).filter(word => word.length > 0).length;

    return (
        <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
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
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        >
                            <FaCamera className="text-white text-2xl" />
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="w-full max-w-xl mb-6">
                        <label className="block text-gray-700 text-lg font-bold mb-2">
                            Bio
                        </label>
                        <div className="relative">
                            <textarea
                                value={bio}
                                onChange={handleBioChange}
                                placeholder="Tell us about yourself..."
                                className="w-full h-48 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none
                                         bg-gray-50 text-gray-900"
                                style={{ lineHeight: '1.5' }}
                            />
                            <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                                {wordCount}/200 words
                            </div>
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
                        className={`px-8 py-3 rounded-full text-white text-lg transition duration-300 ease-in-out ${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isLoading ? 'Updating...' : (avatar || bio) ? 'Confirm' : 'Skip'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Profile;