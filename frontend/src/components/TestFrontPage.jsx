import React, { useEffect } from 'react'
// import Sidebar from './Sidebar'
// import MessageContainer from './MessageContainer'
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

const TestFrontPage = () => {
    // const { authUser } = useSelector(store => store.user);
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (!authUser) {
    //         navigate("/login");
    //     }
    // }, []);
    return (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white bg-clip-padding'>
            {/* <Sidebar /> */}
            <MessageContainer />
        </div>
    )
}

export default TestFrontPage