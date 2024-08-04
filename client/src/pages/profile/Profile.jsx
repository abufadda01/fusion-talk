import React from 'react'
import { useAppStore } from '@/store'


const Profile = () => {

  const {userInfo} = useAppStore()

  console.log(userInfo._id)
  return (
    <div>Profile</div>
  )
}

export default Profile