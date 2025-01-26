import React from 'react'
import Siderbar from '../../components/Siderbar'
const NewKey = ({isAdmin}) => {
  return (
    <div style={{ display: "flex" }}>
      <Siderbar isAdmin={isAdmin} selectedItem="op-key" />
      <div>admin key</div>
    </div>
  )
}

export default NewKey