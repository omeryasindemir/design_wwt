import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Settings from './screens/Settings'
import Tender from './screens/Tender'
import { authMe } from './server/request'
import { lsToken } from './data/lsToken'

const App = () => {

  const [isAuth, setisAuth] = useState(false)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const me = await authMe(localStorage.getItem(lsToken))
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
      {isAuth && <Route path="/dashboard" element={<Dashboard />} />}
      {isAuth && <Route path="/settings" element={<Settings />} />}
      {isAuth && <Route path="/tender" element={<Tender />} />}

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