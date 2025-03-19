import React from 'react';
import { useSelector } from "react-redux";
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import OtherUser from './OtherUser';

const OtherUsers = () => {
    // Custom hook to fetch other users
    useGetOtherUsers();

    // Fetch otherUsers from Redux store
    const { otherUsers } = useSelector(store => store.auth);
    console.log(otherUsers);

    // Early return if otherUsers is not an array or is empty
    if (!Array.isArray(otherUsers) || otherUsers.length === 0) {
        return <p className="text-center text-gray-500">No users found.</p>;
    }

    return (
        <div className='overflow-auto flex-1 p-4'>
            {
                otherUsers.map((users) => (
                    <OtherUser key={users._id} user={users} />
                ))
            }
        </div>
    );
};

export default OtherUsers;