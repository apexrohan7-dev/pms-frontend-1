// src/pages/POS/Inventory/InventoryIssue.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";
import { apiFetch } from "../../../lib/api";
import "../../../assets/css/commanPage.css";


export default function InventoryIssue() {
  // State management
  const [fromDate, setFromDate] = useState("2025-10-07");
  const [toDate, setToDate] = useState("2025-10-07");
  const [orderNo, setOrderNo] = useState("");
  const [department, setDepartment] = useState("");
  const [issueData, setIssueData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  // Sidebar collapsed state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadIssueData();
  }, []);

  // Sidebar mutation observer
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

  // Function to load issue data from API
  const loadIssueData = async () => {
    setLoading(true);
    try {
      // Replace "/inventory/issues" with your actual API endpoint
      const response = await apiFetch("/inventory/issues");
      setIssueData(response);
      setFilteredData(response);
    } catch (error) {
      console.error("Failed to load issue data:", error);
      setIssueData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Search handler with filtering by orderNo, department, and date range
  const handleSearch = () => {
    let filtered = [...issueData];

    if (orderNo) {
      filtered = filtered.filter(item =>
        item.orderNo.toLowerCase().includes(orderNo.toLowerCase())
      );
    }

    if (department) {
      filtered = filtered.filter(item =>
        item.departmentName.toLowerCase() === department.toLowerCase()
      );
    }

    if (fromDate) {
      const from = new Date(fromDate);
      filtered = filtered.filter(item => new Date(item.date) >= from);
    }

    if (toDate) {
      const to = new Date(toDate);
      filtered = filtered.filter(item => new Date(item.date) <= to);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleAddIssue = () => {
    console.log("Add new issue material");
  };

  const handleView = (row) => {
    console.log("View:", row);
  };

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Inline styles (keep as is from your code or move to CSS as preferred)
  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
    },
    page: {
      flexGrow: 1,
      marginLeft: sidebarCollapsed ? "60px" : "240px",
      transition: "margin-left 0.3s ease",
      padding: 0,
    },
    container: {
      padding: "20px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    pageHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "15px 20px",
      marginBottom: "20px",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    pageIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "#f0f0f0",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
    },
    pageTitle: {
      margin: 0,
      fontSize: "20px",
      fontWeight: 600,
      color: "#333",
    },
    actionBar: {
      marginBottom: "20px",
    },
    btnAddIssue: {
      padding: "10px 20px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 500,
    },
    searchFilters: {
      backgroundColor: "#fff",
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    filterRow: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "15px",
      alignItems: "end",
    },
    filterItem: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    label: {
      fontSize: "13px",
      fontWeight: 500,
      color: "#666",
      marginBottom: "5px",
    },
    formInput: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      outline: "none",
      width: "100%",
    },
    formSelect: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      outline: "none",
      width: "100%",
    },
    btnSearch: {
      padding: "8px 20px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 500,
      width: "100%",
      marginTop: "20px",
    },
    dataTableContainer: {
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    dataTable: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHead: {
      backgroundColor: "#f5f5f5",
    },
    th: {
      padding: "12px 16px",
      textAlign: "left",
      fontSize: "14px",
      fontWeight: 600,
      color: "#333",
      borderBottom: "2px solid #ddd",
    },
    td: {
      padding: "12px 16px",
      fontSize: "14px",
      color: "#666",
      borderBottom: "1px solid #eee",
    },
    btnView: {
      padding: "6px 12px",
      backgroundColor: "transparent",
      color: "#1976d2",
      border: "1px solid #1976d2",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "13px",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px",
      color: "#666",
    },
    spinner: {
      width: "40px",
      height: "40px",
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #1976d2",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: "15px",
    },
    noData: {
      textAlign: "center",
      padding: "40px",
      color: "#999",
    },
    paginationContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "15px 20px",
      marginTop: "20px",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      flexWrap: "wrap",
      gap: "15px",
    },
    paginationLeft: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    paginationSelect: {
      padding: "6px 10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "13px",
      outline: "none",
    },
    paginationCenter: {
      fontSize: "13px",
      color: "#666",
    },
    paginationRight: {
      display: "flex",
      gap: "5px",
    },
    paginationBtn: {
      padding: "6px 12px",
      backgroundColor: "#fff",
      color: "#666",
      border: "1px solid #ddd",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "13px",
      minWidth: "35px",
    },
    paginationBtnActive: {
      padding: "6px 12px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "1px solid #1976d2",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "13px",
      minWidth: "35px",
    },
    paginationBtnDisabled: {
      padding: "6px 12px",
      backgroundColor: "#fff",
      color: "#666",
      border: "1px solid #ddd",
      borderRadius: "4px",
      cursor: "not-allowed",
      fontSize: "13px",
      minWidth: "35px",
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
            {/* Header Section */}
            <div style={styles.pageHeader}>
              <div style={styles.headerLeft}>
                <div style={styles.pageIcon}>📋</div>
                <h2 style={styles.pageTitle}>Issue Material Details</h2>
              </div>
            </div>

            {/* Add Button */}
            <div style={styles.actionBar}>
              <button style={styles.btnAddIssue} onClick={handleAddIssue}>
                Add Issue Material
              </button>
            </div>

            {/* Search Filters */}
            <div style={styles.searchFilters}>
              <div style={styles.filterRow}>
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
                  <label style={styles.label}>Order No</label>
                  <input
                    type="text"
                    value={orderNo}
                    onChange={(e) => setOrderNo(e.target.value)}
                    style={styles.formInput}
                    placeholder="Enter order number"
                  />
                </div>

                <div style={styles.filterItem}>
                  <label style={styles.label}>Department To</label>
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
                  <button
                    style={styles.btnSearch}
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    Search
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
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Order No.</th>
                      <th style={styles.th}>DepartmentName</th>
                      <th style={styles.th}>FromDepartmentName</th>
                      <th style={styles.th}>Created By</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((row) => (
                        <tr key={row.id}>
                          <td style={styles.td}>{row.date}</td>
                          <td style={styles.td}>{row.orderNo}</td>
                          <td style={styles.td}>{row.departmentName}</td>
                          <td style={styles.td}>{row.fromDepartmentName}</td>
                          <td style={styles.td}>{row.createdBy}</td>
                          <td style={styles.td}>
                            <button
                              style={styles.btnView}
                              onClick={() => handleView(row)}
                            >
                              👁 View
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

      {/* Add spinner animation */}
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
