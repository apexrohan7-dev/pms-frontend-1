// src/pages/POS/Purchase/PurchaseTransactionReport.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function PurchaseTransactionReport() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    item: "",
    vendor: "",
    from: "10/07/2025",
    to: "10/07/2025",
    invoiceNo: ""
  });

  // Table is empty (matching screenshot)
  const reportRows = [];

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
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5"
    },
    page: {
      flexGrow: 1,
      marginLeft: sidebarCollapsed ? "60px" : "240px",
      transition: "margin-left 0.3s ease",
      padding: 0
    },
    container: {
      padding: "16px 18px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    },
    pageHeader: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "12px 18px",
      marginBottom: "16px",
      borderRadius: "5px 5px 0 0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
    },
    pageIcon: {
      width: "32px",
      height: "32px",
      backgroundColor: "#f0f0f0",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "17px",
      marginRight: "11px"
    },
    pageTitle: {
      margin: 0,
      fontSize: "20px",
      fontWeight: 600,
      color: "#333"
    },
    filterRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "9px 14px",
      alignItems: "center",
      background: "#fff",
      borderRadius: "0 0 5px 5px",
      padding: "13px 18px 9px 10px",
      marginBottom: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07)"
    },
    filterLabel: {
      minWidth: "65px",
      fontSize: "13px",
      color: "#333"
    },
    filterInput: {
      padding: "6px 10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      background: "#fff",
      minWidth: "140px"
    },
    filterMiniInput: {
      padding: "6px 10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "130px",
      background: "#fff",
      fontSize: "13px"
    },
    searchBtn: {
      background: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "7px 25px",
      fontWeight: 500,
      fontSize: "14px",
      cursor: "pointer"
    },
    dataTableContainer: {
      backgroundColor: "#fff",
      borderRadius: "0 0 5px 5px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
    },
    dataTable: {
      width: "100%",
      borderCollapse: "collapse"
    },
    tableHead: {
      backgroundColor: "#e0e0e0"
    },
    th: {
      padding: "8px 10px",
      textAlign: "left",
      fontSize: "13px",
      fontWeight: 600,
      color: "#333",
      borderBottom: "2px solid #ccc",
      whiteSpace: "nowrap"
    },
    td: {
      padding: "8px 10px",
      fontSize: "13px",
      color: "#666",
      borderBottom: "1px solid #eee",
      whiteSpace: "nowrap"
    },
    tableInput: {
      width: "72px",
      padding: "2px 8px",
      borderRadius: "4px",
      border: "1px solid #e0e0e0",
      fontSize: "13px",
      background: "#f6f7f8"
    },
    paginationRow: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: "11px 10px",
      background: "#fff",
      fontSize: "14px"
    },
    paginationBtn: {
      background: "#eee",
      border: "none",
      padding: "4px 10px",
      borderRadius: "3px",
      color: "#222",
      cursor: "pointer",
      margin: "0 1px"
    },
    paginationBtnActive: {
      background: "#1976d2",
      color: "#fff"
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
            <div style={styles.pageIcon}>📊</div>
            <span style={styles.pageTitle}>Purchase Transaction Report</span>
          </div>
          {/* Filter/Search Row */}
          <div style={styles.filterRow}>
            <label style={styles.filterLabel}>Category</label>
            <select
              style={styles.filterInput}
              value={filters.category}
              onChange={e => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Sub Category</label>
            <select
              style={styles.filterInput}
              value={filters.subCategory}
              onChange={e => setFilters({ ...filters, subCategory: e.target.value })}
            >
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Item</label>
            <select
              style={styles.filterInput}
              value={filters.item}
              onChange={e => setFilters({ ...filters, item: e.target.value })}
            >
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Vendor</label>
            <select
              style={styles.filterInput}
              value={filters.vendor}
              onChange={e => setFilters({ ...filters, vendor: e.target.value })}
            >
              <option value="">Select</option>
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
          </div>
          {/* Invoice No */}
          <div style={styles.filterRow}>
            <label style={styles.filterLabel}>Invoice No</label>
            <input
              style={styles.filterInput}
              value={filters.invoiceNo}
              onChange={e => setFilters({ ...filters, invoiceNo: e.target.value })}
              placeholder="Invoice No"
            />
            <button style={styles.searchBtn}>Search</button>
          </div>
          {/* Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Invoice No</th>
                  <th style={styles.th}>Invoice Date</th>
                  <th style={styles.th}>Party Name</th>
                  <th style={styles.th}>SubCategory Name</th>
                  <th style={styles.th}>Hsn Code</th>
                  <th style={styles.th}>Item Name</th>
                  <th style={styles.th}>Qty</th>
                  <th style={styles.th}>Unit Name</th>
                  <th style={styles.th}>Rate</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Discount</th>
                  <th style={styles.th}>Tax</th>
                  <th style={styles.th}>TaxPer</th>
                  <th style={styles.th}>Exp Amount</th>
                  <th style={styles.th}>Cess Amt</th>
                  <th style={styles.th}>Total Amt</th>
                  <th style={styles.th}>Party GST</th>
                  <th style={styles.th}>Login Name</th>
                </tr>
              </thead>
              <tbody>
                {reportRows.length === 0 && (
                  <tr>
                    <td style={styles.td} colSpan={18}>
                      <div style={{ textAlign: "center", color: "#aaa" }}>(No data)</div>
                    </td>
                  </tr>
                )}
                {/* Sample row for reference:
                <tr>
                  <td style={styles.td}>ABC123</td>
                  <td style={styles.td}>03/05/2025</td>
                  <td style={styles.td}>TrustifyEdge</td>
                  <td style={styles.td}>Food</td>
                  <td style={styles.td}>HS9042</td>
                  <td style={styles.td}>Chilly Powder</td>
                  <td style={styles.td}><input style={styles.tableInput} value="0.00" readOnly /></td>
                  <td style={styles.td}>Kg</td>
                  <td style={styles.td}><input style={styles.tableInput} value="₹0.00" readOnly /></td>
                  <td style={styles.td}><input style={styles.tableInput} value="₹0.00" readOnly /></td>
                  <td style={styles.td}><input style={styles.tableInput} value="₹0.00" readOnly /></td>
                  <td style={styles.td}><input style={styles.tableInput} value="0" readOnly /></td>
                  <td style={styles.td}><input style={styles.tableInput} value="0" readOnly /></td>
                  <td style={styles.td}><input style={styles.tableInput} value="₹0.00" readOnly /></td>
                  <td style={styles.td}><input style={styles.tableInput} value="₹0.00" readOnly /></td>
                  <td style={styles.td}><input style={styles.tableInput} value="₹0.00" readOnly /></td>
                  <td style={styles.td}>08AXXXXXXXZ1Z9</td>
                  <td style={styles.td}>Admin</td>
                </tr>
                */}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
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
