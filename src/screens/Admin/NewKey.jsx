import React, { useEffect, useState } from "react";
import Siderbar from "../../components/Siderbar";
import NewTender from "../../components/PopUp/NewTender";
import { adminActiveKeys, adminCreateKey } from "../../server/request";
import { lsToken } from "../../data/lsToken";
import NewKeySet from "../../components/PopUp/NewKeySet";

const NewKey = ({ isAdmin }) => {

  const [showNewTender, setShowNewTender] = useState(false);
  const [newKeyState, setnewKeyState] = useState(null)

  const [columns, setColumns] = useState([
    {
      title: "T.C. Kimlik No",
      dataIndex: "data1",
      key: "data1",
    },
    {
      title: "Parola",
      dataIndex: "data2",
      key: "data2",
    },
    {
      title: "Kredi",
      dataIndex: "data3",
      key: "data3",
    }
  ]);

  const [data, setData] = useState([]);

  const handleNewKey = async () => {
    try {
      const newKeyRes = await adminCreateKey(localStorage.getItem(lsToken))

      const res = await adminActiveKeys(localStorage.getItem(lsToken))
      console.log(res)

      const formattedData = res.map((item, index) => ({
        key: index.toString(),
        data1: item.tckn,
        data2: item.password,
        data3: item.credit
      }));

      setData(formattedData);

      setnewKeyState(newKeyRes.key)
      setShowNewTender(true)
      console.log(newKeyRes)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const fetchActiveKeys = async () => {
      try {
        const res = await adminActiveKeys(localStorage.getItem(lsToken))
        console.log(res)

        const formattedData = res.map((item, index) => ({
          key: index.toString(),
          data1: item.tckn,
          data2: item.password,
          data3: item.credit
        }));

        setData(formattedData);

      } catch (error) {
        console.log(error)
      }
    }
    fetchActiveKeys()
  }, [])

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
          <div style={{ marginTop: "16px", backgroundColor: "var(--white-color)", borderRadius: "8px", border: "1px solid var(--border-color)", maxHeight: "calc(100vh - 192px)", overflowY: "auto" }}>
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
