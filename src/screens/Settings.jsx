import React from 'react'
import Siderbar from '../components/Siderbar'
const Settings = () => {
  return (
    <div style={{ display: "flex" }}>
      <Siderbar selectedItem="settings" />
      <div style={{ width: "100%", padding: "32px" }}>
        <div style={{
          fontSize: "20px",
          fontWeight: "500",
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "8px"
        }}>Ayarlar</div>
        <div style={{ marginTop: "24px", border: "1px solid var(--border-color)", borderRadius: "12px", backgroundColor: "var(--white-color)", boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "480px" }}>
          <div style={{
            height: "48px",
            padding: "16px",
            borderBottom: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-color-light)",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            fontWeight: "400"
          }}>İhale Sistemi Ayarları</div>
          <div style={{padding: "16px"}}>
            <div>
              <input className='tInput' type="text" name="tckn" id="tckn" placeholder="T.C. Kimlik No" />
            </div>
            <div style={{marginTop: "16px"}}>
              <input className='tInput' type="text" name="password" id="password" placeholder="Parola" />
            </div>
          </div>
          <div style={{padding: "16px"}}>
            <button className='tButton'>Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings