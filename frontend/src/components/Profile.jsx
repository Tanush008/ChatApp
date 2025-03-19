import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Profile = () => {
    // const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4">
                        <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                    <p className="text-gray-600 mb-4">@johndoe</p>
                    <div className="flex space-x-4 mb-6">
                        <button className="btn btn-primary">Edit Profile</button>
                        <button className="btn btn-secondary">Logout</button>
                    </div>
                    <div className="w-full">
                        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input type="text" className="input input-bordered w-full" value="John Doe" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Username</label>
                                <input type="text" className="input input-bordered w-full" value="@johndoe" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" className="input input-bordered w-full" value="john.doe@example.com" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Gender</label>
                                <input type="text" className="input input-bordered w-full" value="Male" readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;