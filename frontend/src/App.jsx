import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/login'
import Signup from './components/signup'
import Profile from './components/Profile'
import FrontPage from './components/frontPage'
import OtherUsers from './components/OtherUsers'
import UpdateProfile from './components/UpdateProfile'
import Settings from './components/Settings'
// import { setSocket } from './store/socketSlice'
import { setOnlineUsers } from './store/userSlice'
import { BASE_URL } from './utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { setSocket } from './store/soketSlice'
function App() {
  const { user } = useSelector(store => store.auth);
  // const [socket, setSocket] = useState(null);
  const { socket } = useSelector(store => store.socket);
  // console.log(socket);
  // const dispatch = useDispatch();
  // console.log(user);
  // console.log(BASE_URL);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // Connect to your backend server port (8000), not frontend port (5173)
      const socketio = io("http://localhost:8000", {
        query: {
          userId: user._id
        },
      });
      dispatch(setSocket(socketio));
      // Add connection listeners for debugging
      // socketio?.on('connect', () => {
      //   console.log('Socket connected successfully');
      // });

      // socketio.on('connect_error', (error) => {
      //   console.log('Socket connection error:', error);
      // });

      // Set up event listener before dispatching
      socketio?.on('getOnlineUsers', (onlineUsers) => {
        // console.log('Online users received:', onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Dispatch socket after setting up listeners

      return () => socketio.close();
  } else {
    if(socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }
  }, [user]);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/frontPage',
    element: <FrontPage />
  },
  {
    path: '/selectUser',
    element: <OtherUsers />
  },
  {
    path: '/updateProfile',
    element: <UpdateProfile />
  },
  {
    path: '/settings',
    element: <Settings />
  }
])
return (
  <div>
    <RouterProvider router={appRouter} />
  </div>
)
}

export default App
