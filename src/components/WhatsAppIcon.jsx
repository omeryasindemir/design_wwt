import React from 'react'

const WhatsAppIcon = () => {
  return (
    <a className='click' href="https://wa.me/905431702114" target="_blank" style={{
        height: "64px",
        width: "64px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "fixed",
        bottom: "32px",
        right: "32px",
    }}>
        <img style={{height: "100%", width: "100%", objectFit: "contain"}} src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt="WhatsApp Icon" />
    </a>
  )
}

export default WhatsAppIcon