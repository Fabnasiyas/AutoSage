import React from 'react'
import CarListPage from '../../components/Admin/carList'
import Dasboard from '../../components/Admin/Dashboard'
const UserManagmentPage = () => {
  return (
   
    <div style={{display:'flex'}}>
      <div style={{width:'20%'}}>
      <Dasboard /> 
      </div>
      <div style={{width:'80%'}}>
      <CarListPage/>
      </div>
    </div>
  )
}

export default UserManagmentPage