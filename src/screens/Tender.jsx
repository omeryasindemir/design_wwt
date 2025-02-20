import React, { useEffect, useState } from "react";
import Siderbar from "../components/Siderbar";
import NewTender from "../components/PopUp/NewTender";
import { auctionTenderList } from "../server/request";
import { lsToken } from "../data/lsToken";
const Tender = ({isAdmin}) => {

  const [showNewTender, setShowNewTender] = useState(false);

  const [uData, setuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await auctionTenderList(localStorage.getItem(lsToken));
      setuData(data);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Son Teklif",
      dataIndex: "lastBid",
      key: "lastBid",
    },
    {
      title: "Bitiş Tarihi",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Durum",
      dataIndex: "isStopped",
      key: "isStopped",
    },
    {
      title: "Maksimum Teklif",
      dataIndex: "maxBid",
      key: "maxBid",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Kazanıldı mı?",
      dataIndex: "isWon",
      key: "isWon",
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const StatusDot = ({ won }) => (
    <div style={{
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: won ? '#4CAF50' : '#f44336',
      margin: 'auto'
    }} />
  );

  const tableData = uData.map((item, index) => ({
    key: item._id,
    lastBid: formatPrice(item.lastBid),
    endTime: formatDate(item.endTime),
    isStopped: item.isStopped ? "Durduruldu" : "Devam Ediyor",
    maxBid: formatPrice(item.maxBid),
    url: <a href={item.url} target="_blank" rel="noopener noreferrer" style={{color: 'blue', textDecoration: 'underline'}}>Görüntüle</a>,
    isWon: item.isStopped ? <StatusDot won={item.lastBid === item.userOffer} /> : "-"
  }));

  return (
    <div style={{ display: "flex" }}>

      {showNewTender && <NewTender setShowNewTender={setShowNewTender} />}

      <Siderbar isAdmin={isAdmin} selectedItem="tender" />
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
          <div style={{ fontSize: "20px", fontWeight: "500" }}>İhaleler</div>
          <div>
            <button
              onClick={() => setShowNewTender(true)}
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
              <div style={{ fontWeight: "500" }}>Yeni İhale</div>
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
            {tableData.map((row, index) => (
              <div
                key={row.key}
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  height: "40px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  borderBottom: index !== tableData.length - 1 ? "1px solid var(--border-color)" : "none"
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

export default Tender;
