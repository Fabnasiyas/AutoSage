import React from 'react'
import Profile from '../../components/Vendor/Profile'
import Home from '../../components/Vendor/Home'
const ProfilePage = () => {
  return (
    <div style={{display:'flex'}}>
    <div style={{width:'20%'}}>
    <Home /> 
    </div>
    <div style={{width:'80%'}}>
    <Profile/>
    </div>
  </div>
  )
}

export default ProfilePage