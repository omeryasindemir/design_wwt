import React from 'react'
import Siderbar from '../components/Siderbar'

const Tender = () => {
  return (
    <div style={{ display: "flex" }}>
      <Siderbar selectedItem="tender" />
      <div style={{ width: "100%", padding: "32px" }}>
        <div style={{
          fontSize: "20px",
          fontWeight: "500",
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "8px"
        }}>İhaleler</div>
        <div>test</div>
      </div>
    </div>
  )
}

export default Tender