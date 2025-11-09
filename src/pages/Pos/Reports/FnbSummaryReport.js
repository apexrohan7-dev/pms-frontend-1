// src/pages/POS/Reports/FnbSummaryReport.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function FnbSummaryReport() {
  const [department, setDepartment] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [outlet, setOutlet] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchType, setSearchType] = useState("");
  const [tab, setTab] = useState("summary");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Add this function to resolve the error
  const loadReportData = async () => {
    setLoading(true);
    try {
      // Simulate API delay and load initial data
      await new Promise((res) => setTimeout(res, 200));
      setReportData([]); // Use your real/mock data here if needed
    } finally {
      setLoading(false);
    }
  };

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

  const handleSearch = () => {
    setReportData([]);
  };

  const handleExportExcel = () => {
    alert("Excel export placeholder");
  };

  const handleExportPdf = () => {
    alert("PDF export placeholder");
  };

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
      padding: '10px 10px 2px 10px'
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
    tabControl: {
      display: 'inline-block',
      marginLeft: '8px',
      marginRight: '12px'
    },
    tab: isActive => ({
      border: 'none',
      outline: 'none',
      padding: '6px 18px',
      marginRight: '5px',
      borderRadius: '4px',
      background: isActive ? '#1976d2' : '#e3e3e3',
      color: isActive ? '#fff' : '#1976d2',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer'
    }),
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
    },
    exportBar: {
      display: 'flex',
      gap: '10px',
      margin: '12px 0'
    },
    btnPdf: {
      backgroundColor: '#c62828',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 16px',
      fontSize: '15px',
      fontWeight: 500,
      cursor: 'pointer'
    },
    btnExport: {
      backgroundColor: '#43a047',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 16px',
      fontSize: '15px',
      fontWeight: 500,
      cursor: 'pointer'
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
            <div style={styles.pageIcon}>🍽️</div>
            <span style={styles.pageTitle}>FNB Summary Report</span>
            {/* <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
            <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
            <span style={styles.headerInfo}>51341 Buser</span>
            <span style={styles.headerInfo}>Today: Oct 07 2025 14:56:12</span>
            <button style={styles.btnAudit}>Audit</button>
            <button style={styles.btnClose}>⚙</button> */}
          </div>
          {/* Filters */}
          <div style={styles.filterPanel}>
            <label style={styles.filterLabel}>Department Name</label>
            <select style={styles.filterInput} value={department} onChange={e => setDepartment(e.target.value)}>
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Sub Department Name</label>
            <select style={styles.filterInput} value={subDepartment} onChange={e => setSubDepartment(e.target.value)}>
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Outlet Name</label>
            <select style={styles.filterInput} value={outlet} onChange={e => setOutlet(e.target.value)}>
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>From</label>
            <input type="date" style={styles.filterInput} value={fromDate} onChange={e => setFromDate(e.target.value)} />
            <label style={styles.filterLabel}>To</label>
            <input type="date" style={styles.filterInput} value={toDate} onChange={e => setToDate(e.target.value)} />
            <label style={styles.filterLabel}>Search Type</label>
            <select className="searchType" style={styles.filterInput} value={searchType} onChange={e => setSearchType(e.target.value)}>
              <option value="">All</option>
            </select>
            <div style={styles.tabControl}>
              <button style={styles.tab(tab === "summary")} onClick={() => setTab("summary")}>FNB Summary</button>
              <button style={styles.tab(tab === "detail")} onClick={() => setTab("detail")}>FNB Summary Details</button>
            </div>
          </div>
          {/* FNB Summary Table */}
          <div>
            <h3 style={{ padding: "12px 0 4px 2px", color: "#1976d2" }}>FNB Summary</h3>
          </div>
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Kot Details</th>
                  <th style={styles.th}>Table No/Room No</th>
                  <th style={styles.th}>Pax</th>
                  <th style={styles.th}>QTY</th>
                  <th style={styles.th}>Val.</th>
                  <th style={styles.th}>Discount</th>
                  <th style={styles.th}>Tax</th>
                  <th style={styles.th}>Round Off</th>
                  <th style={styles.th}>Bill Amount</th>
                  <th style={styles.th}>User Name</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={12}><div style={styles.noData}>Loading...</div></td></tr>
                ) : reportData.length > 0 ? (
                  reportData.map((row, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{row.date}</td>
                      <td style={styles.td}>{row.kotDetails}</td>
                      <td style={styles.td}>{row.tableNo}</td>
                      <td style={styles.td}>{row.pax}</td>
                      <td style={styles.td}>{row.qty}</td>
                      <td style={styles.td}>{row.val}</td>
                      <td style={styles.td}>{row.discount}</td>
                      <td style={styles.td}>{row.tax}</td>
                      <td style={styles.td}>{row.roundOff}</td>
                      <td style={styles.td}>{row.billAmount}</td>
                      <td style={styles.td}>{row.userName}</td>
                      <td style={styles.td}>{row.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12}>
                      <div style={styles.noData}>No data available</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Export Options */}
          <div style={styles.exportBar}>
            <button style={styles.btnExport} onClick={handleExportExcel}>Export</button>
            <button style={styles.btnPdf} onClick={handleExportPdf}>pdf</button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
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
