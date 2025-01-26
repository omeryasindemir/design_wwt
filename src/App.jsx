import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Settings from './screens/Settings'
import Tender from './screens/Tender'

const App = () => {

  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/tender" element={<Tender />} />
    </Routes>
  )
}

export default App