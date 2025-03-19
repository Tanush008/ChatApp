import React from 'react';
import { useSelector } from 'react-redux';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import OtherUser from './OtherUser';
// import useGetOtherUsers from '../hooks/useGetOtherUsers';

const TestUser = () => {
    // Use the custom hook to fetch other users
    useGetOtherUsers();
    // Get the list of other users from the Redux store
    const { otherUsers } = useSelector(store => store.auth);
    console.log(otherUsers.user.length);
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Other Users</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(otherUsers.user) && otherUsers.user.length > 0 ? (
                    otherUsers.user.map((user) => (
                        <OtherUser key={user._id} user={user} />
                    ))
                ) : (
                    <p className="text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default TestUser;