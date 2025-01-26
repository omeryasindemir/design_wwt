import React from 'react'
import Siderbar from '../components/Siderbar'
import { lsToken } from '../data/lsToken'
import { useNavigate } from 'react-router-dom';
const Dashboard = ({isAdmin}) => {
  
  const navigate = useNavigate();
  
  return (
    <div style={{display: "flex"}}>
      <Siderbar isAdmin={isAdmin} selectedItem="dashboard" />
      <div style={{padding: "16px"}}>
        <button onClick={() => {
          localStorage.removeItem(lsToken);
          navigate("/login");
          window.location.reload();
        }} style={{minWidth: "100px"}} className='tButton'>Çıkış Yap</button>
      </div>
    </div>
  )
}

export default Dashboard