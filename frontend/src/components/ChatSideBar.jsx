import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
// import toast from "react-hot-toast";/
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
// import { setMessages } from '../redux/messageSlice';
// import { BASE_URL } from '..';
import { setAuthUser, setOtherUsers, setSelectedUsers } from '../store/userSlice';
const ChatSideBar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-zinc-700 text-white'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none' />
                </button>
            </form>
            <div className="divider px-3"></div>
            <OtherUsers />
        </div>
    )
}

export default ChatSideBar