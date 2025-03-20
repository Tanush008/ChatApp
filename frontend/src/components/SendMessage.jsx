import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE_API_END_POINT } from '../utils/constant';
import { setMessages } from '../store/messageSlice';

const SendMessage = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.auth);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${MESSAGE_API_END_POINT}/api/v1/messages/send/${selectedUser?._id}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            dispatch(setMessages([...messages, res?.data?.newMessage]));
        } catch (error) {
            console.log(error);
        }
        setMessage("");
    };

    return (
        <form onSubmit={onSubmitHandler} className="absolute bottom-0 left-0 w-full bg-gray-800 p-3">
            <div className="w-full relative">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Send a message..."
                    className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
                />
                <button type="submit" className="absolute flex inset-y-0 right-0 items-center pr-4 text-white">
                    <IoSend className="text-xl" />
                </button>
            </div>
        </form>
    );
};

export default SendMessage;
