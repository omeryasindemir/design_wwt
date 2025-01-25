import React from 'react'

const Siderbar = () => {
    return (
        <div style={{
            height: "100vh",
            width: "240px",
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
                <div className='sidebar_item_selected click'>
                    <div><i className="bi bi-clipboard-data"></i></div>
                    <div style={{marginTop: "2px"}}>Kontrol Paneli</div>
                </div>

                <div style={{marginTop: "8px"}} className='sidebar_item click'>
                    <div><i className="bi bi-patch-exclamation"></i></div>
                    <div style={{marginTop: "2px"}}>Yakında!</div>
                </div>
                <div style={{marginTop: "8px"}} className='sidebar_item click'>
                    <div><i className="bi bi-patch-exclamation"></i></div>
                    <div style={{marginTop: "2px"}}>Yakında!</div>
                </div>
                <div style={{marginTop: "8px"}} className='sidebar_item click'>
                    <div><i className="bi bi-patch-exclamation"></i></div>
                    <div style={{marginTop: "2px"}}>Yakında!</div>
                </div>
                <div style={{marginTop: "8px"}} className='sidebar_item click'>
                    <div><i className="bi bi-patch-exclamation"></i></div>
                    <div style={{marginTop: "2px"}}>Yakında!</div>
                </div>

            </div>

        </div>
    )
}

export default Siderbar