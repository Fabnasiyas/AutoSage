import React from 'react'
import UserListPage from '../../components/Admin/UserTable'
import Dasboard from '../../components/Admin/Dashboard'
const UserManagmentPage = () => {
  return (
   
    <div style={{display:'flex'}}>
      <div style={{width:'20%'}}>
      <Dasboard /> 
      </div>
      <div style={{width:'80%'}}>
      <UserListPage/>
      </div>
    </div>
  )
}

export default UserManagmentPage