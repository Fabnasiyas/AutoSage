import React from 'react'
import Dasboard from '../../components/Admin/Dashboard'
import BookingPage from '../../components/Admin/BookingTable'
const BookingManagment = () => {
  return (
    <div style={{display:'flex'}}>
    <div style={{width:'20%'}}>
    <Dasboard /> 
    </div>
    <div style={{width:'80%'}}>
    <BookingPage/>
    </div>
  </div>
  )
}

export default BookingManagment
