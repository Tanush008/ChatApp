import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/login'
import Signup from './components/signup'
import Profile from './components/Profile'
import FrontPage from './components/frontPage'
import TestFrontPage from './components/TestFrontPage'
import OtherUsers from './components/OtherUsers'
// import Message from './components/Message'
import Messages from './components/Messages'
import OtherUser from './components/OtherUser'
import TestUser from './components/TestUser'

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
      path: '/TestFrontPage',
      element: <TestFrontPage />
    },
    {
      path: '/selectUser',
      element: <OtherUsers />
    }
  ])
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
