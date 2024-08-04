import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router , Routes , Route , Navigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Chat from './pages/chat/Chat'
import Profile from './pages/profile/Profile'
import { useAppStore } from './store'
import { axiosObj } from './lib/api-client'
import { GET_USER__INFO_ROUTE } from './utils/constants'
import { toast } from 'sonner'


// if user not logged in
const ProtectedRoutes = ({children}) => {
  const {userInfo} = useAppStore()
  return userInfo ? children : <Navigate to="/auth" />
}


// if user already logged in
const AuthRoutes = ({children}) => {
  const {userInfo} = useAppStore()
  return userInfo ? <Navigate to="/chat" /> : children 
}





const App = () => {

  const {userInfo , setUserInfo} = useAppStore()
  const [isLoading ,setIsLoding] = useState(false)


  useEffect(() => {

    const getUserData = async () => {
      try {
        const response = await axiosObj.get(GET_USER__INFO_ROUTE)
        setUserInfo(response.data)
      } catch (error) {
        setUserInfo(undefined)
        toast.error(error.response.data.msg)
      }finally {
        setIsLoding(false)
      }
    }

    if(!userInfo){
      getUserData()
    }else{ 
      setIsLoding(false)
    }

  } , [userInfo , setUserInfo])




  if(isLoading){
    return <div>Loading ...</div>
  }



  return (
    <Router>

      <Routes>

        <Route path='/auth' element={<AuthRoutes><Auth/></AuthRoutes> } />
        <Route path='/chat' element={<ProtectedRoutes><Chat/></ProtectedRoutes>} />
        <Route path='/profile' element={<ProtectedRoutes><Profile/></ProtectedRoutes>} />


        {/* if user entered any unmatch route (undefiened in our routes) direct him to auth page */}
        <Route path='*' element={<Navigate to="/auth" />} />

      </Routes>

    </Router>
  )
}

export default App