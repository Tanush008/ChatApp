import React from 'react';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import SendMessage from './SendMessage';

const MessageContainer = () => {
    const { selectedUsers, user } = useSelector(store => store.auth);
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Theme configuration
    const theme = {
        dark: {
            background: 'bg-gray-900',
            header: 'bg-gray-800',
            text: 'text-gray-100',
            subText: 'text-gray-400',
            border: 'border-gray-700',
            shadow: 'shadow-lg shadow-gray-900/50',
            hover: 'hover:bg-gray-700',
            welcomeBg: 'bg-gray-800/50',
            welcomeText: 'text-gray-300'
        },
        light: {
            background: 'bg-white',
            header: 'bg-gray-100',
            text: 'text-gray-800',
            subText: 'text-gray-600',
            border: 'border-gray-200',
            shadow: 'shadow-lg shadow-gray-200/50',
            hover: 'hover:bg-gray-100',
            welcomeBg: 'bg-gray-100/50',
            welcomeText: 'text-gray-600'
        }
    };

    const currentTheme = isDarkMode ? theme.dark : theme.light;

    return (
        <>
            {selectedUsers !== null ? (
                <div className={`
                    relative md:min-w-[550px] flex flex-col h-full
                    ${currentTheme.background} transition-colors duration-300
                    ${currentTheme.shadow} rounded-lg
                `}>
                    {/* Header Section */}
                    <div className={`
                        flex gap-2 items-center px-4 py-3
                        ${currentTheme.header} ${currentTheme.text}
                        border-b ${currentTheme.border}
                        transition-colors duration-300
                    `}>
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500 ring-opacity-50">
                                <img
                                    src={selectedUsers?.avatar || 'https://via.placeholder.com/150'}
                                    alt="user-profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Online Status Indicator - if you have online status */}
                            {selectedUsers?.isOnline && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="flex justify-between gap-2">
                                <p className="text-lg font-bold">{selectedUsers?.name}</p>
                                <span className={`text-sm ${currentTheme.subText}`}>
                                    {selectedUsers?.isOnline ? 'Online' : 'Offline'}
                                </span>
                            </div>
                            <p className={`text-sm ${currentTheme.subText}`}>
                                {selectedUsers?.status || 'No status'}
                            </p>
                        </div>
                    </div>

                    {/* Messages Section */}
                    <div className={`
                        flex-1 overflow-y-auto
                        ${currentTheme.background}
                    `}>
                        <Messages isDarkMode={isDarkMode} />
                    </div>

                    {/* SendMessage Section */}
                    <SendMessage isDarkMode={isDarkMode} />
                </div>
            ) : (
                <div className={`
                    md:min-w-[550px] h-full flex flex-col justify-center items-center
                    ${currentTheme.welcomeBg} rounded-lg backdrop-blur-sm
                    p-8 transition-all duration-300 ${currentTheme.shadow}
                `}>
                    <div className="text-center space-y-4">
                        <h1 className={`text-4xl font-bold ${currentTheme.text} mb-2`}>
                            Hi, {user?.name}! 👋
                        </h1>
                        <h2 className={`text-2xl ${currentTheme.welcomeText}`}>
                            Let's start a conversation
                        </h2>
                        <p className={`text-sm ${currentTheme.subText}`}>
                            Select a user from the sidebar to begin chatting
                        </p>
                    </div>
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
        </>
    );
};

export default MessageContainer;