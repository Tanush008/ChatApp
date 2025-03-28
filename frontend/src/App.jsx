import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/login'
import Signup from './components/signup'
import Profile from './components/Profile'
import FrontPage from './components/frontPage'
// import TestFrontPage from './components/TestFrontPage'
import OtherUsers from './components/OtherUsers'
// import Message from './components/Message'
import UpdateProfile from './components/UpdateProfile'
import Settings from './components/Settings'

function App() {
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
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
