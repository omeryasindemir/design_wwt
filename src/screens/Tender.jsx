import React from 'react'
import Siderbar from '../components/Siderbar'

const Tender = () => {
  return (
    <div style={{display: "flex"}}>
        <Siderbar selectedItem="tender" />
        <div>İhaleler</div>
    </div>
  )
}

export default Tender