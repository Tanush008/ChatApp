// import { useEffect } from 'react';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import { setOtherUsers } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
const useGetOtherUsers = () => {
    const dispatch = useDispatch ();
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${USER_API_END_POINT}/profile`);
                // console.log("other users -> ", res.data);
                dispatch(setOtherUsers(res.data)); // Dispatch the data to Redux
            } catch (error) {
                console.error("Error fetching other users:", error);
            }
        };

        fetchOtherUsers();
    }, []); // Add dispatch as a dependency
};

export default useGetOtherUsers;