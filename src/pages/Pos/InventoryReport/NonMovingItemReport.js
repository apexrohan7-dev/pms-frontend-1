// src/pages/POS/InventoryReport/NonMovingItemReport.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function NonMovingItemReport() {
  // Filters and controls
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [item, setItem] = useState("");
  const [lastDayIssueNo, setLastDayIssueNo] = useState("2");
  const [movementType, setMovementType] = useState("slow");
  
  // Data
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Example/mock data extracted from the screenshot
  const mockData = [
    { categoryName: "Food", subCategoryName: "Food", unitName: "Kg", itemName: "PAPAD", qty: 10 },
    { categoryName: "Food", subCategoryName: "Food", unitName: "Kg", itemName: "POHA", qty: 10 },
    { categoryName: "Food", subCategoryName: "Food", unitName: "Kg", itemName: "SHEV BHUJA", qty: 10 },
    { categoryName: "Food", subCategoryName: "Food", unitName: "Kg", itemName: "Toor Dal", qty: 15 },
    { categoryName: "Food", subCategoryName: "GROCERY", unitName: "Kg", itemName: "Anjeer", qty: 6 },
    { categoryName: "Food", subCategoryName: "GROCERY", unitName: "Kg", itemName: "Black Salt", qty: 5.5 },
    { categoryName: "Food", subCategoryName: "GROCERY", unitName: "Kg", itemName: "Corn Flakes", qty: 2 },
    { categoryName: "Food", subCategoryName: "GROCERY", unitName: "Kg", itemName: "MDH Biryani Masala", qty: 4 },
    { categoryName: "Food", subCategoryName: "GROCERY", unitName: "Kg", itemName: "Saof", qty: 15 }
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
      await new Promise(resolve => setTimeout(resolve, 200));
      setReportData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // For now, just reloads mock data; implement filter logic as needed
    setReportData(mockData);
  };

  const handleExport = () => {
    alert("Export to Excel placeholder");
  };

  // Styles match your other reports
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
      gap: '14px 16px',
      alignItems: 'center',
      margin: '16px 0 10px 0',
      background: '#fff',
      borderRadius: '4px',
      padding: '16px'
    },
    filterLabel: { minWidth: '85px', fontSize: '14px', color: '#333' },
    filterInput: {
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      minWidth: '140px'
    },
    radioGroup: { display: 'flex', alignItems: 'center', gap: '11px', marginLeft: '15px', marginRight: '15px' },
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
      cursor: 'pointer'
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
      borderBottom: '2px solid #ccc'
    },
    td: {
      padding: '8px 10px',
      fontSize: '14px',
      color: '#666',
      borderBottom: '1px solid #eee'
    },
    noData: {
      textAlign: 'center',
      padding: '40px',
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
            <div style={styles.pageIcon}>⏸️</div>
            <span style={styles.pageTitle}>Non Moving Item Report</span>
            <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
            <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
            <span style={styles.headerInfo}>51341 Buser</span>
            <span style={styles.headerInfo}>Today: Oct 07 2025 14:15:04</span>
            <button style={styles.btnAudit}>Audit</button>
            <button style={styles.btnClose}>⚙</button>
          </div>
          {/* Filter/Search Panel */}
          <div style={styles.filterPanel}>
            <label style={styles.filterLabel}>Category</label>
            <select style={styles.filterInput} value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select Category</option>
            </select>
            <label style={styles.filterLabel}>Sub Category</label>
            <select style={styles.filterInput} value={subCategory} onChange={e => setSubCategory(e.target.value)}>
              <option value="">Select Sub Category</option>
            </select>
            <label style={styles.filterLabel}>Item</label>
            <select style={styles.filterInput} value={item} onChange={e => setItem(e.target.value)}>
              <option value="">Select Item</option>
            </select>
            <label style={styles.filterLabel}>Last DayIssueNo</label>
            <input type="text" style={styles.filterInput} value={lastDayIssueNo} onChange={e => setLastDayIssueNo(e.target.value)} />
            <div style={styles.radioGroup}>
              <label>
                <input type="radio" checked={movementType === "slow"} onChange={() => setMovementType("slow")} />
                Slow Moving
              </label>
              <label>
                <input type="radio" checked={movementType === "fast"} onChange={() => setMovementType("fast")} />
                Fast Moving
              </label>
              <label>
                <input type="radio" checked={movementType === "no"} onChange={() => setMovementType("no")} />
                No Moving
              </label>
            </div>
            <button style={styles.btnSearch} onClick={handleSearch}>Search</button>
            <button style={styles.btnExport} onClick={handleExport}>⎙</button>
          </div>
          {/* Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Category Name</th>
                  <th style={styles.th}>Sub Category Name</th>
                  <th style={styles.th}>Unit Name</th>
                  <th style={styles.th}>Item Name</th>
                  <th style={styles.th}>Qty</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5}><div style={styles.noData}>Loading...</div></td></tr>
                ) : reportData.length > 0 ? (
                  reportData.map((row, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{row.categoryName}</td>
                      <td style={styles.td}>{row.subCategoryName}</td>
                      <td style={styles.td}>{row.unitName}</td>
                      <td style={styles.td}>{row.itemName}</td>
                      <td style={styles.td}>{row.qty}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
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
