import React from 'react'
import Siderbar from '../components/Siderbar'
const Settings = () => {
  return (
    <div style={{display: "flex"}}>
        <Siderbar selectedItem="settings" />
        <div>Ayarlar</div>
    </div>
  )
}

export default Settings