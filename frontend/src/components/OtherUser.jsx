import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUsers } from '../store/userSlice';
// import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    console.log(user);
    const dispatch = useDispatch();
    const { selectedUsers } = useSelector(store => store.auth);
    // const isOnline = onlineUsers?.includes(users._id);
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUsers(user));
    }
    console.log(selectedUsers);
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUsers?._id === user?._id ? 'bg-red-200 text-black' : 'text-black'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
                {/* <div className={`avatar ${isOnline ? 'online' : ''}`}> */}
                <div className='w-12 rounded-full'>
                    <img src={user?.profilePhoto} alt="user-profile" />
                    {/* </div> */}
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>{user?.name}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherUser