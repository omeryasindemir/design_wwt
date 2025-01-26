import React from 'react'
import Siderbar from '../components/Siderbar'
const Dashboard = () => {
  return (
    <div style={{display: "flex"}}>
      <Siderbar selectedItem="dashboard" />
      <div>Dashboard</div>
    </div>
  )
}

export default Dashboard