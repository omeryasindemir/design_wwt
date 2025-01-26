import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Settings from './screens/Settings'
import Tender from './screens/Tender'
import { authMe } from './server/request'
import { lsToken } from './data/lsToken'
import NewKey from './screens/Admin/NewKey'
const App = () => {

  const [isAuth, setisAuth] = useState(false)
  const [userData, setuserData] = useState(null)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const me = await authMe(localStorage.getItem(lsToken))
        setuserData(me)
        setisAuth(true)
        console.log(me)
      } catch (error) {
        setisAuth(false)
        console.log(error)
      }
    }
    fetchMe()
  }, [])

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Dashboard /> : <Login />} />
      {!isAuth && <Route path="/login" element={<Login />} />}
      {isAuth && <Route path="/dashboard" element={<Dashboard isAdmin={userData?.isAdmin} />} />}
      {isAuth && <Route path="/settings" element={<Settings userData={userData} isAdmin={userData?.isAdmin} />} />}
      {isAuth && <Route path="/tender" element={<Tender isAdmin={userData?.isAdmin} />} />}
      {isAuth && userData?.isAdmin && <Route path="/admin/key" element={<NewKey isAdmin={userData?.isAdmin} />} />}

      <Route path="*" element={<div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>Böyle bir sayfa yok!</div>} />
    </Routes>
  )
}

export default App