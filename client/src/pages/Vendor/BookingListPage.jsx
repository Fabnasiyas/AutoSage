import React from 'react'
import Home from '../../components/Vendor/Home'
import BookingPage from '../../components/Vendor/bookingList'
const BookingListPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%' }}>
        <Home />
      </div>
      <div style={{ width: '80%' }}>
        <BookingPage />
      </div>
    </div>
  )
}

export default BookingListPage
