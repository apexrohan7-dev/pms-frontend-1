// src/pages/POS/Purchase/AddSupplier.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";

export default function AddSupplier() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    supplier: "",
    from: "10/07/2025",
    to: "10/07/2025",
    category: "",
    itemSearch: ""
  });

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
      fontSize: "18px",
      fontWeight: 600,
      color: "#333"
    },
    filterRow: {
      display: "flex",
      alignItems: "center",
      background: "#fff",
      borderRadius: "0 0 5px 5px",
      padding: "13px 18px 1px 10px",
      marginBottom: "4px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07)"
    },
    filterColumn: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      marginRight: "15px"
    },
    filterLabel: {
      fontSize: "13px",
      color: "#333",
      marginBottom: "4px"
    },
    filterInput: {
      padding: "6px 10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      background: "#fff",
      fontSize: "14px"
    },
    itemSearchInput: {
      padding: "6px 10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      background: "#fff",
      minWidth: "200px",
      fontSize: "14px"
    },
    saveBtn: {
      background: "#64a7eb",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "8px 28px",
      fontWeight: 500,
      fontSize: "16px",
      cursor: "pointer",
      float: "right",
      margin: '8px 22px 0 0'
    },
    tableContainer: {
      backgroundColor: "#fff",
      borderRadius: "0 0 5px 5px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse"
    },
    tableHead: {
      backgroundColor: "#e0e0e0"
    },
    th: {
      padding: "8px 10px",
      textAlign: "left",
      fontSize: "14px",
      fontWeight: 600,
      color: "#333",
      borderBottom: "2px solid #ccc",
      whiteSpace: "nowrap"
    },
    td: {
      padding: "8px 10px",
      fontSize: "14px",
      color: "#666",
      borderBottom: "1px solid #eee",
      whiteSpace: "nowrap"
    }
  };

  return (
    <div style={styles.layout}>
      <PosSidebar />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Page header */}
          <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>📦</div>
            <span style={styles.pageTitle}>Add Supplier</span>
          </div>
          {/* Filter/Search Row */}
          <div style={styles.filterRow}>
            <div style={styles.filterColumn}>
              <span style={styles.filterLabel}>Supplier Name</span>
              <select
                style={styles.filterInput}
                value={filters.supplier}
                onChange={e => setFilters({ ...filters, supplier: e.target.value })}
              >
                <option value="">Select</option>
              </select>
            </div>
            <div style={styles.filterColumn}>
              <span style={styles.filterLabel}>From Date</span>
              <input
                style={styles.filterInput}
                type="text"
                value={filters.from}
                onChange={e => setFilters({ ...filters, from: e.target.value })}
              />
            </div>
            <div style={styles.filterColumn}>
              <span style={styles.filterLabel}>To Date</span>
              <input
                style={styles.filterInput}
                type="text"
                value={filters.to}
                onChange={e => setFilters({ ...filters, to: e.target.value })}
              />
            </div>
            <div style={styles.filterColumn}>
              <span style={styles.filterLabel}>Category</span>
              <select
                style={styles.filterInput}
                value={filters.category}
                onChange={e => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">Select</option>
              </select>
            </div>
            <div style={styles.filterColumn}>
              <input
                style={styles.itemSearchInput}
                type="text"
                value={filters.itemSearch}
                onChange={e => setFilters({ ...filters, itemSearch: e.target.value })}
                placeholder="SearchItem"
              />
            </div>
          </div>
          {/* Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Select</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Subcategory</th>
                  <th style={styles.th}>Item Name</th>
                  <th style={styles.th}>Unit Name</th>
                  <th style={styles.th}>Rate</th>
                  <th style={styles.th}>Show</th>
                </tr>
              </thead>
              <tbody>
                {/* No data shown on first load */}
              </tbody>
            </table>
          </div>
          <button style={styles.saveBtn}>Save</button>
        </div>
      </div>
    </div>
  );
}
