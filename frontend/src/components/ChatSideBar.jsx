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
import { setMessages } from '../store/messageSlice';
import { USER_API_END_POINT } from '../utils/constant';

const ChatSideBar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.auth);
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // Theme styles
    const theme = {
        dark: {
            background: 'bg-gradient-to-b from-gray-900 to-gray-800',
            text: 'text-gray-300',
            border: 'border-gray-700',
            input: 'bg-gray-700 border-gray-600 text-white placeholder-gray-400',
            button: 'bg-gray-700 hover:bg-gray-600',
            divider: 'bg-gray-700'
        },
        light: {
            background: 'bg-gradient-to-b from-gray-100 to-white',
            text: 'text-gray-800',
            border: 'border-gray-200',
            input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
            button: 'bg-gray-100 hover:bg-gray-200',
            divider: 'bg-gray-200'
        }
    };

    const currentTheme = isDarkMode ? theme.dark : theme.light;
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            console.error("User not found!");
        }
    }
    return (
        <div className={`
            border-r p-4 flex flex-col transition-colors duration-300
            ${currentTheme.background} ${currentTheme.text} ${currentTheme.border}
        `}>
            <form onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`
                        input input-bordered rounded-md w-full
                        transition-colors duration-300
                        ${currentTheme.input}
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    `}
                    type="text"
                    placeholder='Search...'
                />
                <button
                    type='submit'
                    className={`
                        btn transition-colors duration-300
                        ${currentTheme.button}
                        hover:shadow-md
                    `}
                >
                    <BiSearchAlt2 className={`w-6 h-6 outline-none ${currentTheme.text}`} />
                </button>
            </form>
            <div className={`
                my-4 h-px
                ${currentTheme.divider}
                transition-colors duration-300
            `}></div>
            <div className="flex-1 overflow-y-auto">
                <OtherUsers isDarkMode={isDarkMode} />
            </div>

            <style jsx>{`
                /* Custom scrollbar styles */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 6px;
                }

                .overflow-y-auto::-webkit-scrollbar-track {
                    background: ${isDarkMode ? '#374151' : '#f3f4f6'};
                    border-radius: 3px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: ${isDarkMode ? '#4b5563' : '#d1d5db'};
                    border-radius: 3px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: ${isDarkMode ? '#6b7280' : '#9ca3af'};
                }
            `}</style>
        </div>
    )
}

export default ChatSideBar