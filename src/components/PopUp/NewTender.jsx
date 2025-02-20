import React, { useState } from 'react'
import { userNewTender } from '../../server/request'
import { lsToken } from '../../data/lsToken'

const NewTender = ({setShowNewTender, fetchData}) => {

    const [tenderUrl, setTenderUrl] = useState("")
    const [maxBalance, setMaxBalance] = useState(0)

    const handleNewTender = async () => {
        try {
            const res = await userNewTender({url: tenderUrl, maxBid: maxBalance}, localStorage.getItem(lsToken))
            console.log(res)
            setShowNewTender(false)
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "fixed", top: "0", left: "0", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
            <div style={{ border: "1px solid var(--border-color)", borderRadius: "12px", backgroundColor: "var(--white-color)", width: "100%", maxWidth: "480px" }}>
                <div style={{
                    height: "48px",
                    padding: "16px",
                    borderBottom: "1px solid var(--border-color)",
                    backgroundColor: "var(--bg-color-light)",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div style={{fontWeight: "400", marginTop: "4px"}}>Yeni İhale</div>
                    <div onClick={() => setShowNewTender(false)} style={{height: "24px", width: "24px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "50%", cursor: "pointer", backgroundColor: "var(--white-color)"}}>
                        <i style={{ fontSize: "16px", color: "var(--border-color)" }} className="bi bi-x"></i>
                    </div>
                </div>
                <div style={{ padding: "16px" }}>
                    <div>
                        <input onChange={(e) => setTenderUrl(e.target.value)} className='tInput' type="text" name="tender_url" id="tender_url" placeholder="İhale Linki" />
                    </div>
                    <div style={{ marginTop: "16px" }}>
                        <input onChange={(e) => setMaxBalance(e.target.value)} className='tInput' type="number" name="max_balance" id="max_balance" placeholder="Maksimum Bakiye" />
                    </div>
                </div>
                <div style={{ padding: "16px" }}>
                    <button className='tButton' onClick={handleNewTender}>Başlat</button>
                </div>
            </div>
        </div>
    )
}

export default NewTender