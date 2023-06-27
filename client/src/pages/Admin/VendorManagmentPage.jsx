import React from 'react'
import VendorList from'../../components/Admin/VendorTable'
import Dasboard from '../../components/Admin/Dashboard'
const UserManagmentPage = () => {
  return (
   
    <div style={{display:'flex'}}>
      <div style={{width:'20%'}}>
      <Dasboard /> 
      </div>
      <div style={{width:'80%'}}>
      <VendorList/>
      </div>
    </div>
  )
}

export default UserManagmentPage