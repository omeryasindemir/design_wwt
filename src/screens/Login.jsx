import React, { useState } from 'react'
import LoginBg from "../assets/login-bg.jpg"
import WhatsAppIcon from "../components/WhatsAppIcon"
import { authLogin, userBindKey } from "../server/request"
import { lsToken } from "../data/lsToken"
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [key, setkey] = useState("")

  const [tcknState, settcknState] = useState(null)
  const [passwordState, setpasswordState] = useState(null)

  const [isSecondStep, setisSecondStep] = useState(false)

  const handleLogin = async () => {

    if (isSecondStep) {
      try {
        const response = await userBindKey({
          tckn: tcknState,
          password: passwordState
        }, localStorage.getItem(lsToken))
        console.log(response)
        navigate("/dashboard")
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }else{
      try {
        const response = await authLogin({
          key: key
        }, setisSecondStep)
        console.log(response) 

        if (response.status === 301) {
          const token = await response.json()
          localStorage.setItem(lsToken, token.csrfToken)
          setisSecondStep(true)
        }else{
          localStorage.setItem(lsToken, response.csrfToken)
          navigate("/dashboard")
          window.location.reload()
        }

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    

  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "start",
      alignItems: "start"
    }}>

      <WhatsAppIcon />

      <div style={{
        flex: 1,
        height: "100%",
        backgroundImage: `url(${LoginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }} className="LoginLeft"></div>
      <div style={{
        flex: 1,
        height: "100%",
        backgroundColor: "white"
      }} className="LoginRight">
        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", padding: "32px" }}>
          <div>
            <div style={{ fontSize: "24px", fontWeight: "600" }}>Giriş Yap!</div>
            <div style={{ color: "var(--text-color-light)", fontWeight: "400", fontSize: "14px", marginTop: "8px" }}>Hoşgeldin! Devam etmek için yöneticiden aldığın Lisans Kodunu gir.</div>
          </div>
          <div style={{
            height: "32px",
            width: "32px",
            minHeight: "32px",
            minWidth: "32px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}>
            <img style={{ width: "32px", height: "32px" }} src="https://static.vecteezy.com/system/resources/previews/013/783/245/non_2x/flag-of-turkey-in-the-form-of-a-round-button-with-a-light-glare-and-a-shadow-the-symbol-of-independence-day-a-souvenir-a-button-for-switching-the-language-on-the-site-an-icon-vector.jpg" alt="" />
          </div>
        </div>

        <div style={{padding: "32px"}}>
          {!isSecondStep && <input onChange={(e) => setkey(e.target.value)} className='tInput' type="text" name="" id="" placeholder="Lisans Kodu" />}
          {isSecondStep && <input onChange={(e) => settcknState(e.target.value)} className='tInput' type="text" name="" id="" placeholder="T.C. Kimlik No" />}
          {isSecondStep && <input style={{marginTop: "16px"}} onChange={(e) => setpasswordState(e.target.value)} className='tInput' type="text" name="" id="" placeholder="Parola" />}
        </div>

        <div style={{paddingLeft: "32px", paddingRight: "32px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div className="tLink">Lisans Kodun yok mu? <span style={{fontWeight: "500", color: "var(--text-color)", textDecoration: "underline", marginLeft: "4px"}}>Talep Et!</span></div>
          <button onClick={handleLogin} disabled={key.length > 0 ? false : true} style={{maxWidth: "96px"}} className='tButton'>Giriş Yap</button>
        </div>


        <div>

        </div>

      </div>
    </div>
  )
}

export default Login