import React, { useState } from 'react'
import { adminManageKey } from '../../server/request'
import { lsToken } from '../../data/lsToken'
const NewKeySet = ({setShowNewTender, newKeyState}) => {


    const [credit, setcredit] = useState(null)

    const handleSetKeySettings = async () => {
        try {
            const res = await adminManageKey({
                key: newKeyState,
                credit: Number(credit),
                tckn: null,
                password: null
            }, localStorage.getItem(lsToken))
            console.log(res)
            setShowNewTender(false)
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
                    <div style={{fontWeight: "400", marginTop: "4px"}}>{newKeyState}</div>
                    <div onClick={() => setShowNewTender(false)} style={{height: "24px", width: "24px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "50%", cursor: "pointer", backgroundColor: "var(--white-color)"}}>
                        <i style={{ fontSize: "16px", color: "var(--border-color)" }} className="bi bi-x"></i>
                    </div>
                </div>
                <div style={{ padding: "16px" }}>
                    <div>
                        <input onChange={(e) => setcredit(e.target.value)} className='tInput' type="number" name="max_balance" id="max_balance" placeholder="Kredi Miktarı" />
                    </div>
                </div>
                <div style={{ padding: "16px" }}>
                    <button className='tButton' onClick={() => handleSetKeySettings()}>Onayla</button>
                </div>
            </div>
        </div>
    )
}

export default NewKeySet