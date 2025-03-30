import React from 'react';
import Message from './Message';
import { useSelector } from 'react-redux';
import useGetMessages from '../hooks/useGetMessage';

const Messages = () => {
    useGetMessages();
    const { messages } = useSelector((store) => store.message);
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Theme configuration
    const theme = {
        dark: {
            background: 'bg-gradient-to-b from-gray-900 to-gray-800',
            text: 'text-gray-300',
            noMessages: 'text-gray-500',
            divider: 'border-gray-700',
            shadow: 'shadow-lg shadow-gray-900/50'
        },
        light: {
            background: 'bg-gradient-to-b from-gray-50 to-white',
            text: 'text-gray-800',
            noMessages: 'text-gray-400',
            divider: 'border-gray-200',
            shadow: 'shadow-md shadow-gray-200/50'
        }
    };

    const currentTheme = isDarkMode ? theme.dark : theme.light;

    return (
        <div className={`
            px-4 flex-1 h-full overflow-y-auto
            ${currentTheme.background} ${currentTheme.text}
            transition-colors duration-300
        `}>
            {messages && messages?.length > 0 ? (
                <div className="space-y-4 py-4">
                    {messages.map((message, index) => (
                        <React.Fragment key={message._id}>
                            <Message 
                                message={message} 
                                isDarkMode={isDarkMode}
                            />
                            {/* Add time separator if messages are from different days */}
                            {index < messages.length - 1 && 
                             new Date(message.createdAt).toDateString() !== 
                             new Date(messages[index + 1].createdAt).toDateString() && (
                                <div className={`
                                    flex items-center justify-center my-6
                                    ${currentTheme.text}
                                `}>
                                    <div className={`border-t ${currentTheme.divider} flex-grow`}></div>
                                    <span className="px-4 text-sm">
                                        {new Date(message.createdAt).toLocaleDateString()}
                                    </span>
                                    <div className={`border-t ${currentTheme.divider} flex-grow`}></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                <div className={`
                    flex flex-col items-center justify-center
                    min-h-[200px] p-8 rounded-lg mt-4
                    ${currentTheme.background} ${currentTheme.shadow}
                `}>
                    <div className={`
                        w-16 h-16 mb-4 rounded-full
                        flex items-center justify-center
                        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}
                    `}>
                        <svg 
                            className={`w-8 h-8 ${currentTheme.noMessages}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                            />
                        </svg>
                    </div>
                    <p className={`text-lg font-medium ${currentTheme.noMessages}`}>
                        No messages yet
                    </p>
                    <p className={`text-sm ${currentTheme.noMessages} text-center mt-2`}>
                        Start the conversation by sending your first message!
                    </p>
                </div>
            )}

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
    );
};

export default Messages;
