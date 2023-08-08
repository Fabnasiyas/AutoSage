import React from 'react'
import Home from '../../components/Vendor/Home'
import DashPage from '../../components/Vendor/Dashbord'
const HomePage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%' }}>
        <Home />
      </div>
      <div style={{ width: '80%' }}>
        <DashPage />
      </div>
    </div>
  )
}

export default HomePage