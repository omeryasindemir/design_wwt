import React, { useState } from "react";
import Siderbar from "../../components/Siderbar";
import NewTender from "../../components/PopUp/NewTender";
import { adminCreateKey } from "../../server/request";
import { lsToken } from "../../data/lsToken";
import NewKeySet from "../../components/PopUp/NewKeySet";

const NewKey = ({isAdmin}) => {

  const [showNewTender, setShowNewTender] = useState(false);
  const [newKeyState, setnewKeyState] = useState(null)

  const columns = [
    {
      title: "First Data",
      dataIndex: "data1",
      key: "data1",
    },
    {
      title: "Second Data",
      dataIndex: "data2",
      key: "data2",
    },
    {
      title: "Third Data",
      dataIndex: "data3",
      key: "data3",
    },
    {
      title: "Fourth Data",
      dataIndex: "data4",
      key: "data4",
    },
  ];

  const data = [
    {
      key: "1",
      data1: "Row 1 Data 1",
      data2: "Row 1 Data 2",
      data3: "Row 1 Data 3",
      data4: "Row 1 Data 4",
    },
    {
      key: "2",
      data1: "Row 2 Data 1",
      data2: "Row 2 Data 2",
      data3: "Row 2 Data 3",
      data4: "Row 2 Data 4",
    },
  ];

  const handleNewKey = async () => {
    try {
      const newKeyRes = await adminCreateKey(localStorage.getItem(lsToken))
      setnewKeyState(newKeyRes.key)
      setShowNewTender(true)
      console.log(newKeyRes)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ display: "flex" }}>

      {showNewTender && <NewKeySet setShowNewTender={setShowNewTender} newKeyState={newKeyState} />}

      <Siderbar isAdmin={isAdmin} selectedItem="op-key" />
      <div style={{ width: "100%", padding: "32px" }}>
        <div
          style={{
            borderBottom: "1px solid var(--border-color)",
            paddingBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "500" }}>Kullanıcılar</div>
          <div>
            <button
              onClick={() => handleNewKey()}
              style={{
                minWidth: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              className="tButton"
            >
              <i style={{ fontSize: "16px", fontWeight: "500" }} className="bi bi-plus"></i>{" "}
              <div style={{ fontWeight: "500" }}>Yeni Key</div>
            </button>
          </div>
        </div>
        <div style={{ marginTop: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              backgroundColor: "var(--border-color)",
              borderRadius: "8px",
              height: "40px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <div className="click" style={{
              height: "16px",
              width: "16px",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              backgroundColor: "var(--white-color)",
              cursor: "pointer",
              marginRight: "8px"
            }}></div>
            {columns.map((item) => (
              <div
                key={item.key}
                style={{
                  flex: "1",
                  padding: "8px",
                  color: "var(--text-color-light)",
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "16px", backgroundColor: "var(--white-color)", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
            {data.map((row, index) => (
              <div
                key={row.key}
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  height: "40px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  borderBottom: index !== data.length - 1 ? "1px solid var(--border-color)" : "none"
                }}
              >
                <div className="click" style={{
                  height: "16px",
                  width: "16px",
                  border: "1px solid var(--border-color)",
                  borderRadius: "4px",
                  backgroundColor: "var(--white-color)",
                  cursor: "pointer",
                  marginRight: "8px"
                }}></div>
                {columns.map((col) => (
                  <div
                    key={col.key}
                    style={{
                      flex: "1",
                      padding: "8px",
                      color: "var(--text-color)",
                    }}
                  >
                    {row[col.dataIndex]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewKey;
