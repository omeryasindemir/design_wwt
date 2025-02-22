import React, { useEffect, useState } from "react";
import Siderbar from "../components/Siderbar";
import NewTender from "../components/PopUp/NewTender";
import { auctionTenderList, auctionMaxBidEdit } from "../server/request";
import { lsToken } from "../data/lsToken";
const Tender = ({isAdmin}) => {

  const [showNewTender, setShowNewTender] = useState(false);

  const [uData, setuData] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const fetchData = async () => {
    const data = await auctionTenderList(localStorage.getItem(lsToken));
    setuData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "İhale Adı",
      dataIndex: "tenderName",
      key: "tenderName",
    },
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

  const handleEditClick = (id, currentMaxBid) => {
    // Remove currency formatting and trailing zeros after decimal
    const numericValue = currentMaxBid
      .replace(/[^0-9,]/g, '') // Remove all non-numeric characters except comma
      .replace(',', '.'); // Replace comma with dot for decimal
    setEditingId(id);
    setEditValue(parseFloat(numericValue).toString()); // Convert to number and back to string to remove trailing zeros
  };

  const handleSaveEdit = async (id) => {
    try {
      const numericValue = parseFloat(editValue); // Convert string to number
      await auctionMaxBidEdit({ maxBid: numericValue }, localStorage.getItem(lsToken), id);
      // Refresh the data
      const newData = await auctionTenderList(localStorage.getItem(lsToken));
      setuData(newData);
      setEditingId(null);
      setEditValue("");
    } catch (error) {
      console.error("Error updating maxBid:", error);
    }
  };

  const MaxBidCell = ({ item }) => {
    if (editingId === item._id) {
      return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="number"
            value={editValue}
            onChange={(e) => {
              e.preventDefault();
              const value = e.target.value;
              if (!isNaN(value)) {
                setEditValue(value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveEdit(item._id);
              } else if (e.key === 'Escape') {
                setEditingId(null);
              }
            }}
            autoFocus
            style={{
              width: '100px',
              padding: '4px',
              borderRadius: '4px',
              border: '1px solid var(--border-color)'
            }}
          />
          <button
            onClick={() => handleSaveEdit(item._id)}
            style={{
              padding: '4px 8px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ✓
          </button>
          <button
            onClick={() => setEditingId(null)}
            style={{
              padding: '4px 8px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {formatPrice(item.maxBid)}
        <button
          onClick={() => handleEditClick(item._id, formatPrice(item.maxBid))}
          style={{
            padding: '4px 8px',
            backgroundColor: 'var(--border-color)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ✎
        </button>
      </div>
    );
  };

  const tableData = uData.map((item) => ({
    key: item._id,
    lastBid: formatPrice(item.lastBid),
    endTime: formatDate(item.endTime),
    isStopped: item.isStopped ? "Durduruldu" : "Devam Ediyor",
    maxBid: <MaxBidCell item={item} />,
    url: <a href={item.url} target="_blank" rel="noopener noreferrer" style={{color: 'blue', textDecoration: 'underline'}}>Görüntüle</a>,
    isWon: item.isStopped ? <StatusDot won={item.lastBid === item.userOffer} /> : "-",
    tenderName: item.name
  }));

  return (
    <div style={{ display: "flex" }}>

      {showNewTender && <NewTender setShowNewTender={setShowNewTender} fetchData={fetchData} />}

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
