import React from 'react'
import { useNavigate } from 'react-router-dom';

const Siderbar = ({selectedItem}) => {

    const navigate = useNavigate();

    return (
        <div style={{
            height: "100vh",
            width: "240px",
            minWidth: "240px",
            backgroundColor: "var(--white-color)",
            borderRight: "1px solid var(--border-color)"
        }}>
            <div style={{ padding: "32px", textAlign: "center" }}>
                <div style={{
                    color: "var(--primary-color-light)",
                    fontSize: "16px",
                    fontWeight: "400"
                }}>WinWith<span style={{
                    color: "var(--primary-color)",
                    fontSize: "16px",
                    fontWeight: "400"
                }}>That</span></div>
            </div>

            <div style={{ paddingLeft: "8px", paddingRight: "8px" }}>
                <div onClick={() => navigate("/dashboard")} className={selectedItem === "dashboard" ? "sidebar_item_selected" : "sidebar_item click"}>
                    <div><i className="bi bi-clipboard-data"></i></div>
                    <div style={{marginTop: "2px"}}>Kontrol Paneli</div>
                </div>

                <div style={{marginTop: "8px"}} onClick={() => navigate("/tender")} className={selectedItem === "tender" ? "sidebar_item_selected" : "sidebar_item click"}>
                    <div><i className="bi bi-bank"></i></div>
                    <div style={{marginTop: "2px"}}>İhaleler</div>
                </div>

                <div style={{marginTop: "8px"}} onClick={() => navigate("/settings")} className={selectedItem === "settings" ? "sidebar_item_selected" : "sidebar_item click"}>
                    <div><i className="bi bi-gear"></i></div>
                    <div style={{marginTop: "2px"}}>Ayarlar</div>
                </div>

            </div>

        </div>
    )
}

export default Siderbar