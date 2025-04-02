import React, { useEffect } from 'react'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import { setMessages } from '../redux/messageSlice';
import { MESSAGE_API_END_POINT } from '../utils/constant';
import { setMessages } from '../store/messageSlice';


const useGetMessages = () => {
    const { selectedUsers } = useSelector(store => store.auth);
    // console.log(selectedUsers);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${MESSAGE_API_END_POINT}/get/${selectedUsers?._id}`);
                console.log(res.data);
                dispatch(setMessages(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUsers?._id, setMessages]);
}

export default useGetMessages