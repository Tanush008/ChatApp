import React from 'react';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import SendMessage from './SendMessage';

const MessageContainer = () => {
    const { selectedUsers, user } = useSelector((store) => store.auth);

    return (
        <>
            {selectedUsers !== null ? (
                <div className="relative md:min-w-[550px] flex flex-col h-full">
                    {/* Header Section */}
                    <div className="flex gap-2 items-center bg-black text-white px-4 py-2 mb-2">
                        <div>
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img
                                    src={selectedUsers?.profilePhoto || 'https://via.placeholder.com/150'}
                                    alt="user-profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="flex justify-between gap-2">
                                <p className="text-lg font-bold">{selectedUsers?.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages Section */}
                    <div className="flex-1 overflow-y-auto">
                        <Messages />
                    </div>

                    {/* SendMessage Section */}
                    <SendMessage />
                </div>
            ) : (
                <div className="md:min-w-[550px] flex flex-col justify-center items-center">
                    <h1 className="text-4xl text-white font-bold">Hi, {user?.name}</h1>
                    <h1 className="text-2xl text-white">Let's start a conversation</h1>
                </div>
            )}
        </>
    );
};

export default MessageContainer;