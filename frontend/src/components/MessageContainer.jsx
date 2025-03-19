import React, { useEffect } from 'react'
// import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUsers } from '../store/userSlice';
import SendMessage from './SendMessage';
// import { setSelectedUser } from '../redux/userSlice';

const MessageContainer = () => {
    const { selectedUsers, user } = useSelector(store => store.auth);
    // const dispatch = useDispatch();

    // const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {
                selectedUsers !== null ? (
                    <div className='md:min-w-[550px] flex flex-col'>
                        <div className='flex gap-2 items-center bg-black text-white px-4 py-2 mb-2'>
                            {/* <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full'>
                                    <img src={setSelectedUsers?.profilePhoto} alt="user-profile" />
                                </div>
                            </div> */}
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUsers?.name}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendMessage />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                        <h1 className='text-4xl text-white font-bold'>Hi,{user?.name} </h1>
                        <h1 className='text-2xl text-white'>Let's start conversation</h1>

                    </div>
                )
            }
        </>

    )
}

export default MessageContainer