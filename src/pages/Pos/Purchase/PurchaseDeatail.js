// src/pages/POS/Purchase/PurchaseDetail.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function PurchaseDetail() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    party: "",
    from: "10/07/2025",
    to: "10/07/2025",
    pvNo: "",
    invoiceNo: "",
    status: "All"
  });

  // Example: No purchase data so empty list
  const purchases = [];

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
      padding: '16px 18px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    pageHeader: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '12px 18px',
      marginBottom: '16px',
      borderRadius: '5px 5px 0 0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
    },
    pageIcon: {
      width: '34px',
      height: '34px',
      backgroundColor: '#f0f0f0',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      marginRight: '11px'
    },
    pageTitle: {
      margin: 0,
      fontSize: '19px',
      fontWeight: 600,
      color: '#333'
    },
    actionBtnsTop: {
      marginLeft: 'auto',
      display: 'flex',
      gap: '8px'
    },
    btnAdd: {
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 500,
      padding: '6px 14px'
    },
    topButtons: {
      background: 'none',
      color: '#4CAF50',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      marginLeft: '2px'
    },
    filterRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '9px 14px',
      alignItems: 'center',
      background: '#fff',
      borderRadius: '0 0 5px 5px',
      padding: '11px 18px 9px 6px',
      marginBottom: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.07)'
    },
    filterLabel: {
      minWidth: '68px',
      fontSize: '12px',
      color: '#333'
    },
    filterInput: {
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      background: '#fff',
      minWidth: '160px'
    },
    filterMiniInput: {
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '120px',
      background: '#fff',
      fontSize: '13px'
    },
    filterBtn: {
      background: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "7px 28px",
      fontWeight: 500,
      fontSize: "14px",
      cursor: "pointer"
    },
    dataTableContainer: {
      backgroundColor: '#fff',
      borderRadius: '0 0 5px 5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
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
      fontSize: '13px',
      fontWeight: 600,
      color: '#333',
      borderBottom: '2px solid #ccc',
      whiteSpace: 'nowrap'
    },
    td: {
      padding: '8px 10px',
      fontSize: '13px',
      color: '#666',
      borderBottom: '1px solid #eee',
      whiteSpace: 'nowrap'
    },
    paginationRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '11px 10px',
      background: '#fff',
      fontSize: '14px'
    },
    paginationBtn: {
      background: '#eee',
      border: 'none',
      padding: '4px 10px',
      borderRadius: '3px',
      color: '#222',
      cursor: 'pointer',
      margin: '0 1px'
    },
    paginationBtnActive: {
      background: '#1976d2',
      color: '#fff',
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
            <div style={styles.pageIcon}>🧾</div>
            <span style={styles.pageTitle}>Purchase</span>
            <div style={styles.actionBtnsTop}>
              <button style={styles.btnAdd}>Add Purchase</button>
              <button style={styles.topButtons} title="Excel">
                <span role="img" aria-label="export">🟩</span>
              </button>
              <button style={styles.topButtons} title="Delete">
                <span role="img" aria-label="delete">🟥</span>
              </button>
            </div>
          </div>
          {/* Filter Search Row */}
          <div style={styles.filterRow}>
            <label style={styles.filterLabel}>Party Name</label>
            <select
              style={styles.filterInput}
              value={filters.party}
              onChange={e => setFilters({ ...filters, party: e.target.value })}
            >
              <option value="">Select Party Name</option>
            </select>
            <label style={styles.filterLabel}>From</label>
            <input
              style={styles.filterMiniInput}
              type="text"
              value={filters.from}
              onChange={e => setFilters({ ...filters, from: e.target.value })}
            />
            <label style={styles.filterLabel}>To</label>
            <input
              style={styles.filterMiniInput}
              type="text"
              value={filters.to}
              onChange={e => setFilters({ ...filters, to: e.target.value })}
            />
            <label style={styles.filterLabel}>PV No</label>
            <input
              style={styles.filterMiniInput}
              value={filters.pvNo}
              onChange={e => setFilters({ ...filters, pvNo: e.target.value })}
            />
            <label style={styles.filterLabel}>Invoice No</label>
            <input
              style={styles.filterMiniInput}
              value={filters.invoiceNo}
              onChange={e => setFilters({ ...filters, invoiceNo: e.target.value })}
            />
            <label style={styles.filterLabel}>Status</label>
            <select
              style={styles.filterInput}
              value={filters.status}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="All">All</option>
              {/* More status options */}
            </select>
            <button style={styles.filterBtn}>Search</button>
          </div>
          {/* Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Select</th>
                  <th style={styles.th}>Vendor</th>
                  <th style={styles.th}>P.V.No./Date</th>
                  <th style={styles.th}>Party Bill No/Date</th>
                  <th style={styles.th}>Qty</th>
                  <th style={styles.th}>Dis</th>
                  <th style={styles.th}>Taxable Amt</th>
                  <th style={styles.th}>Tax Amt</th>
                  <th style={styles.th}>Bill Amt</th>
                  <th style={styles.th}>Created By</th>
                  <th style={styles.th}>Remark</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* No data by default */}
              </tbody>
            </table>
          </div>
          {/* Pagination & Total */}
          <div style={styles.paginationRow}>
            <span>Total Count : 0</span>
            <button style={styles.paginationBtn}>First</button>
            <button style={styles.paginationBtn}>Previous</button>
            <button style={{ ...styles.paginationBtn, ...styles.paginationBtnActive }}>1</button>
            <button style={styles.paginationBtn}>Next</button>
            <button style={styles.paginationBtn}>Last</button>
          </div>
        </div>
        <style>{`
          table tbody tr:hover {
            background-color: #f9f9f9;
          }
          button:hover:not(:disabled) {
            opacity: 0.88;
          }
        `}</style>
      </div>
    </div>
    </div>
  );
}
