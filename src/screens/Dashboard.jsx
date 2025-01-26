import React from 'react'
import Siderbar from '../components/Siderbar'
const Dashboard = ({isAdmin}) => {
  return (
    <div style={{display: "flex"}}>
      <Siderbar isAdmin={isAdmin} selectedItem="dashboard" />
      <div>Dashboard</div>
    </div>
  )
}

export default Dashboard