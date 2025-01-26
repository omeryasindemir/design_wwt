import React, { useState } from 'react'
import Siderbar from '../components/Siderbar'
import { lsToken } from '../data/lsToken'
import { userCredSave } from '../server/request'
const Settings = ({userData, isAdmin}) => {

  const [tckn, settckn] = useState(userData?.tckn)
  const [password, setpassword] = useState(userData?.password)


  const handleSave = async () => {
    try {
      const res = await userCredSave({
        tckn: tckn,
        password: password
      }, localStorage.getItem(lsToken))
      window.location.reload()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <Siderbar isAdmin={isAdmin} selectedItem="settings" />
      <div style={{ width: "100%", padding: "32px" }}>
        <div style={{
          fontSize: "20px",
          fontWeight: "500",
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "8px"
        }}>Ayarlar</div>
        <div style={{ marginTop: "24px", border: "1px solid var(--border-color)", borderRadius: "12px", backgroundColor: "var(--white-color)", width: "100%", maxWidth: "480px" }}>
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
              <input onChange={(e) => settckn(e.target.value)} value={tckn} className='tInput' type="number" name="tckn" id="tckn" placeholder="T.C. Kimlik No" />
            </div>
            <div style={{marginTop: "16px"}}>
              <input onChange={(e) => setpassword(e.target.value)} value={password} className='tInput' type="text" name="password" id="password" placeholder="Parola" />
            </div>
          </div>
          <div style={{padding: "16px"}}>
            <button onClick={handleSave} className='tButton'>Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings