import React from 'react'
import CarPage from '../../components/Vendor/CarLists'
import Home from '../../components/Vendor/Home'
const VendorCarlistpage = () => {
  return (
    // <div>
    //   <Carlist/>
    // </div>
    <div style={{display:'flex'}}>
      <div style={{width:'20%'}}>
      <Home /> 
      </div>
      <div style={{width:'80%'}}>
      <CarPage/>
      </div>
    </div>
  )
}

export default VendorCarlistpage
