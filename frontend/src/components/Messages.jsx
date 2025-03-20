import React from 'react';
import Message from './Message';
import { useSelector } from 'react-redux';
import useGetMessages from '../hooks/useGetMessage';

const Messages = () => {
    useGetMessages();
    const { messages } = useSelector((store) => store.message);

    return (
        <div className="px-4 flex-1 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 overflow-y-auto">
            {messages && messages?.length > 0 ? (
                messages.map((message) => (
                    <Message key={message._id} message={message} />
                ))
            ) : (
                <p className="text-gray-500 text-center mt-4">No messages found.</p>
            )}
        </div>
    );
};

export default Messages;
