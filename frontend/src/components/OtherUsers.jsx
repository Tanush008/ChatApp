import React from 'react';
import { useSelector } from 'react-redux';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';

const OtherUsers = () => {
    useGetOtherUsers();
    const { otherUsers } = useSelector(store => store.auth);
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Theme configuration
    const theme = {
        dark: {
            background: 'bg-gradient-to-b from-gray-900 to-gray-800',
            text: 'text-gray-300',
            noUsers: 'text-gray-400',
            container: 'bg-gray-800/50',
            shadow: 'shadow-lg shadow-gray-900/50',
            divider: 'border-gray-700',
            hover: 'hover:bg-gray-700'
        },
        light: {
            background: 'bg-gradient-to-b from-gray-50 to-white',
            text: 'text-gray-800',
            noUsers: 'text-gray-500',
            container: 'bg-white/50',
            shadow: 'shadow-lg shadow-gray-200/50',
            divider: 'border-gray-200',
            hover: 'hover:bg-gray-100'
        }
    };

    const currentTheme = isDarkMode ? theme.dark : theme.light;

    return (
        <div className={`
            min-h-screen transition-colors duration-300
            ${currentTheme.background} ${currentTheme.text}
        `}>
            <div className={`
                rounded-lg p-4 backdrop-blur-sm
                ${currentTheme.container} ${currentTheme.shadow}
            `}>
                <div className="flex flex-col gap-4">
                    {Array.isArray(otherUsers.user) && otherUsers.user.length > 0 ? (
                        otherUsers.user.map((user, index) => (
                            <React.Fragment key={user._id}>
                                <OtherUser
                                    user={user}
                                    isDarkMode={isDarkMode}
                                />
                                {/* Add divider between users except for the last one */}
                                {index < otherUsers.user.length - 1 && (
                                    <div className={`border-b ${currentTheme.divider}`}></div>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <div className={`
                            flex flex-col items-center justify-center p-8
                            ${currentTheme.container} rounded-lg
                            ${currentTheme.shadow}
                        `}>
                            <p className={`
                                text-center ${currentTheme.noUsers}
                                text-lg font-medium
                            `}>
                                No users found.
                            </p>
                            <p className={`
                                text-center ${currentTheme.noUsers}
                                text-sm mt-2
                            `}>
                                Try searching for other users or check back later.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Optional: Loading State */}
            {!otherUsers.user && (
                <div className={`
                    flex justify-center items-center p-4
                    ${currentTheme.text}
                `}>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
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

export default OtherUsers;