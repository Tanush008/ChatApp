import React from 'react';
import Message from './Message';
import { useSelector } from 'react-redux';
import useGetMessages from '../hooks/useGetMessage';
import useGetRealTimeMessage from '../hooks/UseGetRealTimeMessage';

const Messages = () => {
    // useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);
    // console.log(messages);

    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Theme configuration
    const theme = {
        dark: {
            background: 'bg-gradient-to-b from-gray-900 to-gray-800',
            text: 'text-gray-300',
            noMessages: 'text-gray-500',
            scrollbar: {
                thumb: 'rgba(75, 85, 99, 0.8)',
                track: 'rgba(31, 41, 55, 0.2)'
            }
        },
        light: {
            background: 'bg-gradient-to-b from-gray-50 to-white',
            text: 'text-gray-800',
            noMessages: 'text-gray-400',
            scrollbar: {
                thumb: 'rgba(156, 163, 175, 0.8)',
                track: 'rgba(243, 244, 246, 0.2)'
            }
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
                    {messages.map((message) => (
                        <Message
                            key={message._id}
                            message={message}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className={`${currentTheme.noMessages} text-center`}>
                        No messages found.
                    </p>
                </div>
            )}

            <style jsx>{`
                /* Custom scrollbar styles */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 6px;
                }

                .overflow-y-auto::-webkit-scrollbar-track {
                    background: ${currentTheme.scrollbar.track};
                    border-radius: 3px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: ${currentTheme.scrollbar.thumb};
                    border-radius: 3px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: ${currentTheme.scrollbar.thumb};
                    opacity: 1;
                }

                /* Firefox scrollbar */
                .overflow-y-auto {
                    scrollbar-width: thin;
                    scrollbar-color: ${currentTheme.scrollbar.thumb} ${currentTheme.scrollbar.track};
                }
            `}</style>
        </div>
    );
};

export default Messages;
