import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { FaSmile, FaPaperclip } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE_API_END_POINT } from '../utils/constant';
import { setMessages } from '../store/messageSlice';

const SendMessage = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUsers } = useSelector(store => store.auth);
    // console.log(selectedUsers);
    const { messages } = useSelector(store => store.message);
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Theme configuration
    const theme = {
        dark: {
            container: 'bg-gray-800',
            input: {
                bg: 'bg-gray-700',
                text: 'text-white',
                placeholder: 'placeholder-gray-400',
                border: 'border-gray-600 focus:border-gray-500',
                shadow: 'shadow-lg shadow-gray-900/50'
            },
            button: {
                default: 'text-gray-400',
                hover: 'hover:text-blue-500',
                active: 'active:text-blue-600'
            }
        },
        light: {
            container: 'bg-white',
            input: {
                bg: 'bg-gray-50',
                text: 'text-gray-900',
                placeholder: 'placeholder-gray-500',
                border: 'border-gray-300 focus:border-blue-500',
                shadow: 'shadow-md shadow-gray-200/50'
            },
            button: {
                default: 'text-gray-500',
                hover: 'hover:text-blue-600',
                active: 'active:text-blue-700'
            }
        }
    };

    const currentTheme = isDarkMode ? theme.dark : theme.light;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            const res = await axios.post(
                `${MESSAGE_API_END_POINT}/send/${selectedUsers?._id}`,
                { message },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(res.data);
            dispatch(setMessages([...messages, res?.data?.newMessage]));
        } catch (error) {
            console.log(error);
        }
        setMessage("");
    };

    return (
        <div className={`
            w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
            ${currentTheme.container} transition-colors duration-300
        `}>
            <form onSubmit={onSubmitHandler} className="p-4">
                <div className="relative flex items-center">
                    {/* Attachment Button */}
                    <button
                        type="button"
                        className={`
                            p-2 rounded-full transition-colors duration-300
                            ${currentTheme.button.default}
                            ${currentTheme.button.hover}
                            ${currentTheme.button.active}
                        `}
                    >
                        <FaPaperclip className="text-xl" />
                    </button>

                    {/* Message Input */}
                    <div className="flex-1 mx-2">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            placeholder="Type a message..."
                            className={`
                                w-full px-4 py-2 rounded-full outline-none
                                transition-all duration-300
                                ${currentTheme.input.bg}
                                ${currentTheme.input.text}
                                ${currentTheme.input.placeholder}
                                ${currentTheme.input.border}
                                ${currentTheme.input.shadow}
                                focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                            `}
                        />
                    </div>

                    {/* Emoji Button */}
                    <button
                        type="button"
                        className={`
                            p-2 rounded-full transition-colors duration-300
                            ${currentTheme.button.default}
                            ${currentTheme.button.hover}
                            ${currentTheme.button.active}
                        `}
                    >
                        <FaSmile className="text-xl" />
                    </button>

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className={`
                            p-2 rounded-full ml-1 transition-all duration-300
                            ${message.trim()
                                ? 'text-blue-500 hover:text-blue-600 active:text-blue-700'
                                : currentTheme.button.default}
                            transform hover:scale-110 active:scale-95
                        `}
                    >
                        <IoSend className="text-xl" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendMessage;
