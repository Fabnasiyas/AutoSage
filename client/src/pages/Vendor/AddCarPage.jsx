import React from 'react'
import AddCar from '../../components/Vendor/AddcarForm'
import Home from '../../components/Vendor/Home'
const AddCarPage = () => {
  return (
    <>
    
    <div style={{display:'flex'}}>
      <div style={{width:'20%'}}>
      <Home/>
      </div>
      <div style={{width:'80%'}}>
      <AddCar/>
      </div>
    </div>
    </>
  )
}

export default AddCarPage