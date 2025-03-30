import React, { useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

const Message = ({ message, isDarkMode }) => {
    const scroll = useRef();
    const { user, selectedUsers } = useSelector(store => store.auth);
    const isOwnMessage = message.sender === user._id;

    const theme = {
        dark: {
            ownMessage: 'bg-blue-600 text-white',
            otherMessage: 'bg-gray-700 text-white',
            timestamp: 'text-gray-400'
        },
        light: {
            ownMessage: 'bg-blue-500 text-white',
            otherMessage: 'bg-gray-200 text-gray-800',
            timestamp: 'text-gray-500'
        }
    };

    const currentTheme = isDarkMode ? theme.dark : theme.light;

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return (
        <div ref={scroll} className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={isOwnMessage ? user?.avatar : selectedUsers?.avatar} />
                </div>
            </div>
            <div className="chat-header">
                <time className={`text-xs ${currentTheme.timestamp} text-white`}>{new Date(message.createdAt).toLocaleTimeString()}</time>
            </div>
            <div className={`chat-bubble ${isOwnMessage ? currentTheme.ownMessage : currentTheme.otherMessage} `}>{message.content}</div>
        </div>
    )
}

export default Message