import React from 'react'
import Dashboard from '../../components/Admin/Dashboard.jsx'
import DashbordSide from '../../components/Admin/DashPage.jsx'
const DashboardPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%' }}>
        <Dashboard />
      </div>
      <div style={{ width: '80%' }}>
        <DashbordSide />
      </div>
    </div>
  )
}

export default DashboardPage