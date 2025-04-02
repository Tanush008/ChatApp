import React, { useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { user, selectedUsers } = useSelector(store => store.auth);
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Theme configuration
    const theme = {
        dark: {
            time: 'text-gray-400',
            ownMessage: 'bg-blue-600 text-white',
            otherMessage: 'bg-gray-700 text-white',
            avatar: 'ring-2 ring-gray-700'
        },
        light: {
            time: 'text-gray-500',
            ownMessage: 'bg-blue-500 text-white',
            otherMessage: 'bg-gray-200 text-gray-800',
            avatar: 'ring-2 ring-gray-200'
        }
    };

    const currentTheme = isDarkMode ? theme.dark : theme.light;

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const isOwnMessage = message?.senderId === user?._id;

    return (
        <div 
            ref={scroll} 
            className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'} transition-colors duration-300`}
        >
            <div className="chat-image avatar">
                <div className={`w-10 rounded-full overflow-hidden ${currentTheme.avatar}`}>
                    <img 
                        alt="Chat avatar" 
                        src={isOwnMessage ? user?.profilePhoto : selectedUsers?.profilePhoto}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            
            <div className="chat-header">
                <time className={`text-xs opacity-50 ${currentTheme.time} transition-colors duration-300`}>
                    {new Date(message?.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}
                </time>
            </div>

            <div className={`
                chat-bubble transition-colors duration-300
                ${isOwnMessage ? currentTheme.ownMessage : currentTheme.otherMessage}
            `}>
                {message?.message}
            </div>
        </div>
    );
};

export default Message;