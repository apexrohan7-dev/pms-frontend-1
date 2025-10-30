// src/pages/POS/Inventory/InventoryIndent.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";
import { apiFetch } from "../../../lib/api";
import "../../../assets/css/commanPage.css";

export default function InventoryIndent() {
  // State declarations
  const [department, setDepartment] = useState("");
  const [fromDate, setFromDate] = useState("2025-10-07");
  const [toDate, setToDate] = useState("2025-10-07");
  const [indentNo, setIndentNo] = useState("");
  const [indentData, setIndentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load data from API on mount
  useEffect(() => {
    loadIndentData();
  }, []);

  // Sidebar collapse detection
  useEffect(() => {
    const handleSidebarChange = () => {
      const sidebar = document.querySelector(".rsb");
      setSidebarCollapsed(sidebar?.classList.contains("rsb--mini") || false);
    };
    handleSidebarChange();

    const observer = new MutationObserver(handleSidebarChange);
    const sidebar = document.querySelector(".rsb");
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
    }
    return () => observer.disconnect();
  }, []);

  // Data loading function using apiFetch
  const loadIndentData = async () => {
    setLoading(true);
    try {
      // Replace '/inventory/indents' with your actual API endpoint
      const response = await apiFetch("/inventory/indents");
      setIndentData(response);
      setFilteredData(response);
    } catch (error) {
      console.error("Failed to load indent data:", error);
      setIndentData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Search/filter logic
  const handleSearch = () => {
    let filtered = [...indentData];

    if (department) {
      filtered = filtered.filter(
        (item) => item.department.toLowerCase() === department.toLowerCase()
      );
    }

    if (indentNo) {
      filtered = filtered.filter((item) =>
        item.indentNo.toLowerCase().includes(indentNo.toLowerCase())
      );
    }

    if (fromDate) {
      const from = new Date(fromDate);
      filtered = filtered.filter((item) => new Date(item.date) >= from);
    }

    if (toDate) {
      const to = new Date(toDate);
      filtered = filtered.filter((item) => new Date(item.date) <= to);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Placeholder action handlers
  const handleShowReport = () => console.log("Show Report clicked");
  const handlePrintIndent = () => console.log("Print Indent clicked");
  const handleExportTo = () => console.log("Export To clicked");
  const handleAddIndent = () => console.log("Add Indent clicked");

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // Styles (as per your pattern)
  const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" },
    page: {
      flexGrow: 1,
      marginLeft: sidebarCollapsed ? "60px" : "240px",
      transition: "margin-left 0.3s ease",
      padding: 0,
    },
    container: { padding: 20, backgroundColor: "#f5f5f5", minHeight: "100vh" },
    pageHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "15px 20px",
      marginBottom: 20,
      borderRadius: 5,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    headerLeft: { display: "flex", alignItems: "center", gap: 15 },
    pageIcon: {
      width: 40,
      height: 40,
      backgroundColor: "#f0f0f0",
      borderRadius: 5,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
    },
    pageTitle: { margin: 0, fontSize: 20, fontWeight: 600, color: "#333" },
    headerRight: { display: "flex", alignItems: "center", gap: 15 },
    headerInfo: { fontSize: 12, color: "#666" },
    btnAudit: {
      padding: "6px 16px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 500,
    },
    btnClose: {
      width: 30,
      height: 30,
      background: "transparent",
      border: "none",
      fontSize: 18,
      color: "#666",
      cursor: "pointer",
      borderRadius: "50%",
    },
    actionBar: {
      marginBottom: 20,
      display: "flex",
      justifyContent: "flex-end",
    },
    btnAddIndent: {
      padding: "10px 20px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
    },
    searchFilters: {
      backgroundColor: "#fff",
      padding: 20,
      marginBottom: 20,
      borderRadius: 5,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    filterRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 0.8fr",
      gap: 15,
      alignItems: "end",
    },
    filterItem: { display: "flex", flexDirection: "column", gap: 5 },
    label: { fontSize: 13, fontWeight: 500, color: "#666", marginBottom: 5 },
    formInput: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: 4,
      fontSize: 14,
      outline: "none",
      width: "100%",
    },
    formSelect: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: 4,
      fontSize: 14,
      outline: "none",
      width: "100%",
    },
    btnShowReport: {
      padding: "8px 16px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 500,
    },
    btnPrint: {
      padding: "8px 16px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 500,
    },
    btnExport: {
      padding: "8px 16px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: 5,
    },
    dataTableContainer: {
      backgroundColor: "#fff",
      borderRadius: 5,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    dataTable: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHead: { backgroundColor: "#e0e0e0" },
    th: {
      padding: "12px 16px",
      textAlign: "left",
      fontSize: 14,
      fontWeight: 600,
      color: "#333",
      borderBottom: "2px solid #ccc",
    },
    td: {
      padding: "12px 16px",
      fontSize: 14,
      color: "#666",
      borderBottom: "1px solid #eee",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 60,
      color: "#666",
    },
    spinner: {
      width: 40,
      height: 40,
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #1976d2",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: 15,
    },
    noData: { textAlign: "center", padding: 40, color: "#999" },
    paginationContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "15px 20px",
      marginTop: 20,
      borderRadius: 5,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      flexWrap: "wrap",
      gap: 15,
    },
    paginationLeft: { display: "flex", alignItems: "center", gap: 10 },
    paginationSelect: {
      padding: "6px 10px",
      border: "1px solid #ddd",
      borderRadius: 4,
      fontSize: 13,
      outline: "none",
    },
    paginationCenter: { fontSize: 13, color: "#666" },
    paginationRight: { display: "flex", gap: 5 },
    paginationBtn: {
      padding: "6px 12px",
      backgroundColor: "#fff",
      color: "#666",
      border: "1px solid #ddd",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 13,
      minWidth: 35,
    },
    paginationBtnActive: {
      padding: "6px 12px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "1px solid #1976d2",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 13,
      minWidth: 35,
    },
    paginationBtnDisabled: {
      padding: "6px 12px",
      backgroundColor: "#fff",
      color: "#666",
      border: "1px solid #ddd",
      borderRadius: 4,
      cursor: "not-allowed",
      fontSize: 13,
      minWidth: 35,
      opacity: 0.5,
    },
  };

  return (
    <div className="container">
      <PosTopbar />
      <div style={styles.layout}>
        <PosSidebar />
        <div style={styles.page}>
          <div style={styles.container}>
            {/* Header */}
            <div style={styles.pageHeader}>
              <div style={styles.headerLeft}>
                <div style={styles.pageIcon}>📋</div>
                <h2 style={styles.pageTitle}>Indent Details</h2>
              </div>
              {/* <div style={styles.headerRight}>
                <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
                <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
                <span style={styles.headerInfo}>$1341 Buser</span>
                <span style={styles.headerInfo}>Today: Oct 07 2025 13:14:07</span>
                <button style={styles.btnAudit}>Audit</button>
                <button style={styles.btnClose}>⚙</button>
              </div> */}
            </div>

            {/* Add Button */}
            <div style={styles.actionBar}>
              <button style={styles.btnAddIndent} onClick={handleAddIndent}>
                Add Indent
              </button>
            </div>

            {/* Filters */}
            <div style={styles.searchFilters}>
              <div style={styles.filterRow}>
                <div style={styles.filterItem}>
                  <label style={styles.label}>Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    style={styles.formSelect}
                  >
                    <option value="">Select</option>
                    <option value="production">Production</option>
                    <option value="assembly">Assembly</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="storage">Storage</option>
                  </select>
                </div>

                <div style={styles.filterItem}>
                  <label style={styles.label}>From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.filterItem}>
                  <label style={styles.label}>To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.filterItem}>
                  <label style={styles.label}>Indent No</label>
                  <input
                    type="text"
                    value={indentNo}
                    onChange={(e) => setIndentNo(e.target.value)}
                    placeholder="Enter indent number"
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.filterItem}>
                  <button
                    style={styles.btnShowReport}
                    onClick={handleShowReport}
                    disabled={loading}
                  >
                    Show Report
                  </button>
                </div>

                <div style={styles.filterItem}>
                  <button
                    style={styles.btnPrint}
                    onClick={handlePrintIndent}
                    disabled={loading}
                  >
                    Print Indent
                  </button>
                </div>

                <div style={styles.filterItem}>
                  <button
                    style={styles.btnExport}
                    onClick={handleExportTo}
                    disabled={loading}
                  >
                    Export To 📊
                  </button>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div style={styles.dataTableContainer}>
              {loading ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.spinner}></div>
                  <p>Loading...</p>
                </div>
              ) : (
                <table style={styles.dataTable}>
                  <thead style={styles.tableHead}>
                    <tr>
                      <th style={styles.th}>Indent No</th>
                      <th style={styles.th}>Department</th>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Remark</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((row) => (
                        <tr key={row.id}>
                          <td style={styles.td}>{row.indentNo}</td>
                          <td style={styles.td}>{row.department}</td>
                          <td style={styles.td}>{row.date}</td>
                          <td style={styles.td}>{row.remark}</td>
                          <td style={styles.td}>
                            <span
                              style={{
                                padding: "4px 8px",
                                borderRadius: 4,
                                fontSize: 12,
                                backgroundColor:
                                  row.status === "Completed"
                                    ? "#d4edda"
                                    : row.status === "Approved"
                                    ? "#cfe2ff"
                                    : "#fff3cd",
                                color:
                                  row.status === "Completed"
                                    ? "#155724"
                                    : row.status === "Approved"
                                    ? "#084298"
                                    : "#856404",
                              }}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <button
                              style={{
                                padding: "6px 12px",
                                backgroundColor: "transparent",
                                color: "#1976d2",
                                border: "1px solid #1976d2",
                                borderRadius: 4,
                                cursor: "pointer",
                                fontSize: 13,
                              }}
                              onClick={() => console.log("View", row)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={styles.noData}>
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination Controls */}
            {filteredData.length > 0 && (
              <div style={styles.paginationContainer}>
                <div style={styles.paginationLeft}>
                  <label style={styles.label}>Items per page</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    style={styles.paginationSelect}
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                  </select>
                </div>

                <div style={styles.paginationCenter}>
                  <span>
                    Showing {indexOfFirstItem + 1} to{" "}
                    {Math.min(indexOfLastItem, filteredData.length)} of{" "}
                    {filteredData.length} entries
                  </span>
                </div>

                <div style={styles.paginationRight}>
                  <button
                    style={
                      currentPage === 1
                        ? styles.paginationBtnDisabled
                        : styles.paginationBtn
                    }
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    ««
                  </button>
                  <button
                    style={
                      currentPage === 1
                        ? styles.paginationBtnDisabled
                        : styles.paginationBtn
                    }
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      style={
                        currentPage === i + 1
                          ? styles.paginationBtnActive
                          : styles.paginationBtn
                      }
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    style={
                      currentPage === totalPages
                        ? styles.paginationBtnDisabled
                        : styles.paginationBtn
                    }
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </button>
                  <button
                    style={
                      currentPage === totalPages
                        ? styles.paginationBtnDisabled
                        : styles.paginationBtn
                    }
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    »»
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spinner animation */}
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
  );
}
