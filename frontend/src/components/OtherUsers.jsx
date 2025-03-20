import React from 'react';
import { useSelector } from 'react-redux';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';

const OtherUsers = () => {
    useGetOtherUsers();
    const { otherUsers } = useSelector((store) => store.auth);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 shadow-lg p-6">
            <div className="flex flex-col gap-4">
                {Array.isArray(otherUsers.user) && otherUsers.user.length > 0 ? (
                    otherUsers.user.map((user) => (
                        <OtherUser key={user._id} user={user} />
                    ))
                ) : (
                    <p className="text-gray-200">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default OtherUsers;