// src/pages/POS/Reports/OrderSummaryReport.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function OrderSummaryReport() {
  const [department, setDepartment] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tab, setTab] = useState("all");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Example/mock data for the table
  const mockData = [
    // {
    //   order: "ORD001",
    //   time: "15:00",
    //   receiptNo: "RCPT123",
    //   rtNo: "RT12",
    //   orderType: "Dine-In",
    //   guestName: "John Doe",
    //   status: "Settled",
    //   amount: 1200,
    //   userName: "Buser"
    // }
  ];

  useEffect(() => {
    loadReportData();
  }, []);

  useEffect(() => {
    const handleSidebarChange = () => {
      const sidebar = document.querySelector(".rsb");
      if (sidebar) {
        setSidebarCollapsed(sidebar.classList.contains("rsb--mini"));
      }
    };
    handleSidebarChange();
    const observer = new MutationObserver(handleSidebarChange);
    const sidebar = document.querySelector(".rsb");
    if (sidebar) {
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ["class"]
      });
    }
    return () => observer.disconnect();
  }, []);

  const loadReportData = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 200));
      setReportData([]); // Use your mockData or real data here
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setReportData([]); // Would apply filter logic here
  };

  const handleExportExcel = () => {
    alert("Export to Excel placeholder");
  };

  const handleExportPdf = () => {
    alert("Export to PDF placeholder");
  };

  // Styles
  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    },
    page: {
      flexGrow: 1,
      marginLeft: sidebarCollapsed ? '60px' : '240px',
      transition: 'margin-left 0.3s ease',
      padding: 0
    },
    container: {
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    pageHeader: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '15px 20px',
      marginBottom: '20px',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    pageIcon: {
      width: '40px',
      height: '40px',
      backgroundColor: '#f0f0f0',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      marginRight: '15px'
    },
    pageTitle: {
      margin: 0,
      fontSize: '20px',
      fontWeight: 600,
      color: '#333'
    },
    headerInfo: {
      fontSize: '12px',
      color: '#666',
      marginLeft: '26px'
    },
    btnAudit: {
      padding: '6px 16px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 500,
      marginLeft: '10px'
    },
    btnClose: {
      width: '30px',
      height: '30px',
      background: 'transparent',
      border: 'none',
      fontSize: '18px',
      color: '#666',
      cursor: 'pointer',
      borderRadius: '50%'
    },
    filterPanel: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px 14px',
      alignItems: 'center',
      margin: '16px 0 8px 0',
      background: '#fff',
      borderRadius: '4px',
      padding: '10px'
    },
    filterLabel: { minWidth: '120px', fontSize: '14px', color: '#333' },
    filterInput: {
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      minWidth: '135px'
    },
    btnSearch: {
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '7px 22px',
      fontWeight: 500,
      fontSize: '14px',
      cursor: 'pointer'
    },
    btnExport: {
      backgroundColor: '#43a047',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '7px 12px',
      fontSize: '16px',
      fontWeight: 500,
      cursor: 'pointer',
      marginLeft: 4
    },
    btnPdf: {
      backgroundColor: '#c62828',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '7px 12px',
      fontSize: '16px',
      fontWeight: 500,
      cursor: 'pointer',
      marginLeft: 4
    },
    tabsBar: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0 10px 0',
      fontSize: '16px'
    },
    tab: isActive => ({
      background: 'none',
      border: 'none',
      borderBottom: isActive ? '3px solid #1976d2' : 'none',
      color: isActive ? '#1976d2' : '#444',
      fontWeight: isActive ? 700 : 400,
      padding: '0 10px 7px 10px',
      fontSize: '16px',
      outline: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'border-bottom 0.2s'
    }),
    badge: {
      background: '#e0e0e0',
      borderRadius: '50%',
      fontSize: '11px',
      padding: '2px 7px',
      marginLeft: 4
    },
    badgeActive: {
      background: '#1976d2',
      color: '#fff',
      borderRadius: '50%',
      fontSize: '11px',
      padding: '2px 7px',
      marginLeft: 4
    },
    dataTableContainer: {
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'auto',
      marginTop: '12px'
    },
    dataTable: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHead: {
      backgroundColor: '#e0e0e0'
    },
    th: {
      padding: '8px 10px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: 600,
      color: '#333',
      borderBottom: '2px solid #ccc',
      whiteSpace: 'nowrap'
    },
    td: {
      padding: '8px 10px',
      fontSize: '14px',
      color: '#666',
      borderBottom: '1px solid #eee',
      whiteSpace: 'nowrap'
    },
    noData: {
      textAlign: 'center',
      padding: '34px',
      color: '#999'
    }
  };

  return (
    <div className="container">
    <PosTopbar/>
    <div style={styles.layout}>
      <PosSidebar />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>📝</div>
            <span style={styles.pageTitle}>Order Summary Report</span>
            <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
            <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
            <span style={styles.headerInfo}>51341 Buser</span>
            <span style={styles.headerInfo}>Today: Oct 07 2025 15:06:21</span>
            <button style={styles.btnAudit}>Audit</button>
            <button style={styles.btnClose}>⚙</button>
          </div>
          {/* Filter Panel */}
          <div style={styles.filterPanel}>
            <label style={styles.filterLabel}>Department Name</label>
            <select style={styles.filterInput} value={department} onChange={e => setDepartment(e.target.value)}>
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>From Date</label>
            <input type="date" style={styles.filterInput} value={fromDate} onChange={e => setFromDate(e.target.value)} />
            <label style={styles.filterLabel}>To Date</label>
            <input type="date" style={styles.filterInput} value={toDate} onChange={e => setToDate(e.target.value)} />
            <button style={styles.btnSearch} onClick={handleSearch}>Search</button>
            <button style={styles.btnExport} onClick={handleExportExcel}><span role="img" aria-label="excel">📊</span></button>
            <button style={styles.btnPdf} onClick={handleExportPdf}><span role="img" aria-label="pdf">📄</span></button>
          </div>
          {/* Tabs */}
          <div style={styles.tabsBar}>
            <button style={styles.tab(tab === "all")} onClick={() => setTab("all")}>All
              <span style={tab === "all" ? styles.badgeActive : styles.badge}>0</span>
            </button>
            <button style={styles.tab(tab === "running")} onClick={() => setTab("running")}>Running
              <span style={tab === "running" ? styles.badgeActive : styles.badge}>0</span>
            </button>
            <button style={styles.tab(tab === "settled")} onClick={() => setTab("settled")}>Settled
              <span style={tab === "settled" ? styles.badgeActive : styles.badge}>0</span>
            </button>
            <button style={styles.tab(tab === "voided")} onClick={() => setTab("voided")}>Voided
              <span style={tab === "voided" ? styles.badgeActive : styles.badge}>0</span>
            </button>
          </div>
          {/* Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Order</th>
                  <th style={styles.th}>Time</th>
                  <th style={styles.th}>Receipt No</th>
                  <th style={styles.th}>R/T No</th>
                  <th style={styles.th}>Order Type</th>
                  <th style={styles.th}>Guest Name</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>User Name</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={9}><div style={styles.noData}>Loading...</div></td></tr>
                ) : reportData.length > 0 ? (
                  reportData.map((row, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{row.order}</td>
                      <td style={styles.td}>{row.time}</td>
                      <td style={styles.td}>{row.receiptNo}</td>
                      <td style={styles.td}>{row.rtNo}</td>
                      <td style={styles.td}>{row.orderType}</td>
                      <td style={styles.td}>{row.guestName}</td>
                      <td style={styles.td}>{row.status}</td>
                      <td style={styles.td}>{row.amount}</td>
                      <td style={styles.td}>{row.userName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>
                      <div style={styles.noData}>No data available</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`
        table tbody tr:hover {
          background-color: #f9f9f9;
        }
        button:hover:not(:disabled) {
          opacity: 0.9;
        }
      `}</style>
    </div>
    </div>
  );
}
