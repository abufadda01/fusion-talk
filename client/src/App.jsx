import React from 'react'
import { BrowserRouter as Router , Routes , Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Chat from './pages/chat/Chat'
import Profile from './pages/profile/Profile'



const App = () => {
  return (
    <Router>

      <Routes>

        <Route path='/auth' element={<Auth/>} />
        <Route path='/chat' element={<Chat/>} />
        <Route path='/profile' element={<Profile/>} />


        {/* if user entered any unmatch route (undefiened in our routes) direct him to auth page */}
        <Route path='*' element={<Navigate to="/auth" />} />

      </Routes>

    </Router>
  )
}

export default App