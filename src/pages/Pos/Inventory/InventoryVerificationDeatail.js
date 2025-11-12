// src/pages/POS/Inventory/InventoryVerificationDetail.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function InventoryVerificationDetail() {
  // State management
  const [verificationData, setVerificationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for demo (fill/add as needed)
  const mockData = [
    {
      id: 1,
      date: "10/24/2025",
      transactionNo: "VERIFY101",
      departmentName: "STORE (JAIPUR)",
      departmentTypeName: "Department"
    },
    {
      id: 2,
      date: "10/23/2025",
      transactionNo: "VERIFY102",
      departmentName: "WAREHOUSE B",
      departmentTypeName: "Warehouse"
    }
  ];

  // Load all data initially
  useEffect(() => {
    loadVerificationData();
  }, []);

  // Listen for sidebar collapse state changes
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

  const loadVerificationData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setVerificationData(mockData);
      setFilteredData(mockData);
    } catch (error) {
      console.error("Failed to load verification data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Date filter search logic
  const handleSearch = () => {
    let filtered = verificationData;
    if (fromDate) {
      filtered = filtered.filter(row => new Date(row.date) >= new Date(fromDate));
    }
    if (toDate) {
      filtered = filtered.filter(row => new Date(row.date) <= new Date(toDate));
    }
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleAddVerification = () => {
    console.log("Add Stock Verification clicked");
    // Navigate or modal open logic here
  };

  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
    // Edit logic here
  };

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Styles (matches your theme)
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
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '15px 20px',
      marginBottom: '20px',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    pageIcon: {
      width: '40px',
      height: '40px',
      backgroundColor: '#f0f0f0',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px'
    },
    pageTitle: {
      margin: 0,
      fontSize: '20px',
      fontWeight: 600,
      color: '#333'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    headerInfo: {
      fontSize: '12px',
      color: '#666'
    },
    btnAudit: {
      padding: '6px 16px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 500
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
    actionBar: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    btnAdd: {
      padding: '10px 20px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '14px'
    },
    input: {
      padding: '6px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px'
    },
    btnSearch: {
      background: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '7px 22px',
      fontWeight: 500,
      cursor: 'pointer',
      fontSize: '14px'
    },
    dataTableContainer: {
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    dataTable: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHead: {
      backgroundColor: '#e0e0e0'
    },
    th: {
      padding: '12px 16px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: 600,
      color: '#333',
      borderBottom: '2px solid #ccc'
    },
    td: {
      padding: '12px 16px',
      fontSize: '14px',
      color: '#666',
      borderBottom: '1px solid #eee'
    },
    editBtn: {
      padding: '6px 12px',
      backgroundColor: 'transparent',
      border: '1px solid #1976d2',
      color: '#1976d2',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px',
      color: '#666'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #1976d2',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '15px'
    },
    noData: {
      textAlign: 'center',
      padding: '40px',
      color: '#999'
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '15px 20px',
      marginTop: '20px',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      flexWrap: 'wrap',
      gap: '15px'
    },
    paginationLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    paginationSelect: {
      padding: '6px 10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '13px',
      outline: 'none'
    },
    paginationCenter: {
      fontSize: '13px',
      color: '#666'
    },
    paginationRight: {
      display: 'flex',
      gap: '5px'
    },
    paginationBtn: {
      padding: '6px 12px',
      backgroundColor: '#fff',
      color: '#666',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      minWidth: '35px'
    },
    paginationBtnActive: {
      padding: '6px 12px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: '1px solid #1976d2',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      minWidth: '35px'
    },
    paginationBtnDisabled: {
      padding: '6px 12px',
      backgroundColor: '#fff',
      color: '#666',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'not-allowed',
      fontSize: '13px',
      minWidth: '35px',
      opacity: 0.5
    }
  };

  return (
    <div className="container">
      <PosTopbar/>
    <div style={styles.layout}>
      <PosSidebar />

      <div style={styles.page}>
        <div style={styles.container}>
          {/* Header Section */}
          <div style={styles.pageHeader}>
            <div style={styles.headerLeft}>
              <div style={styles.pageIcon}>📝</div>
              <h2 style={styles.pageTitle}>Stock Verification Details</h2>
            </div>
            {/* <div style={styles.headerRight}>
              <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
              <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
              <span style={styles.headerInfo}>$1341 Buser</span>
              <span style={styles.headerInfo}>Today: Oct 07 2025 13:50:12</span>
              <button style={styles.btnAudit}>Audit</button>
              <button style={styles.btnClose}>⚙</button>
            </div> */}
          </div>
          {/* Search Bar */}
          <div style={styles.searchBar}>
            <label>From Date</label>
            <input
              type="date"
              value={fromDate}
              style={styles.input}
              onChange={e => setFromDate(e.target.value)}
            />
            <label>To Date</label>
            <input
              type="date"
              value={toDate}
              style={styles.input}
              onChange={e => setToDate(e.target.value)}
            />
            <button style={styles.btnSearch} onClick={handleSearch}>Search</button>
          </div>
          {/* Add Button */}
          <div style={styles.actionBar}>
            <button style={styles.btnAdd} onClick={handleAddVerification}>
              Add Stock Verification
            </button>
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
                    <th style={styles.th}>Transaction No</th>
                    <th style={styles.th}>Department Name</th>
                    <th style={styles.th}>Department Type Name</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((row) => (
                      <tr key={row.id}>
                        <td style={styles.td}>{row.date}</td>
                        <td style={styles.td}>{row.transactionNo}</td>
                        <td style={styles.td}>{row.departmentName}</td>
                        <td style={styles.td}>{row.departmentTypeName}</td>
                        <td style={styles.td}>
                          <button
                            style={styles.editBtn}
                            onClick={() => handleEdit(row)}
                            title="Edit"
                          >
                            ✏️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={styles.noData}>
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
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#666' }}>
                  Items per page
                </label>
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
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
                </span>
              </div>
              <div style={styles.paginationRight}>
                <button
                  style={currentPage === 1 ? styles.paginationBtnDisabled : styles.paginationBtn}
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  ««
                </button>
                <button
                  style={currentPage === 1 ? styles.paginationBtnDisabled : styles.paginationBtn}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    style={currentPage === i + 1 ? styles.paginationBtnActive : styles.paginationBtn}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  style={currentPage === totalPages ? styles.paginationBtnDisabled : styles.paginationBtn}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
                <button
                  style={currentPage === totalPages ? styles.paginationBtnDisabled : styles.paginationBtn}
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



// // src/pages/POS/Inventory/InventoryVerificationDetail.js
// import React, { useState, useEffect, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";

// export default function InventoryVerificationDetail() {
//   // State management
//   const [verificationData, setVerificationData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Fetch stock verification data from API
//   const fetchVerificationData = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: itemsPerPage,
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//       });

//       const response = await apiFetch(
//         `/api/inventory/stock-verifications?${queryParams}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         setVerificationData(response.data.verifications || []);
//         setTotalRecords(response.data.total || 0);
//       } else {
//         throw new Error(response.message || "Failed to fetch data");
//       }
//     } catch (err) {
//       console.error("Failed to load verification data:", err);
//       setError(err.message || "Failed to load verification data");
//       setVerificationData([]);
//       setTotalRecords(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, fromDate, toDate]);

//   // Load data on mount and when dependencies change
//   useEffect(() => {
//     fetchVerificationData();
//   }, [fetchVerificationData]);

//   // Listen for sidebar collapse state changes
//   useEffect(() => {
//     const handleSidebarChange = () => {
//       const sidebar = document.querySelector(".rsb");
//       if (sidebar) {
//         setSidebarCollapsed(sidebar.classList.contains("rsb--mini"));
//       }
//     };
//     handleSidebarChange();
//     const observer = new MutationObserver(handleSidebarChange);
//     const sidebar = document.querySelector(".rsb");
//     if (sidebar) {
//       observer.observe(sidebar, {
//         attributes: true,
//         attributeFilter: ["class"],
//       });
//     }
//     return () => observer.disconnect();
//   }, []);

//   // Handle date filter search
//   const handleSearch = useCallback(() => {
//     setCurrentPage(1);
//     fetchVerificationData();
//   }, [fetchVerificationData]);

//   // Handle add verification
//   const handleAddVerification = useCallback(() => {
//     console.log("Add Stock Verification clicked");
//     // Navigate to add page or open modal
//     // Example: navigate("/inventory/stock-verification/add");
//   }, []);

//   // Handle edit action
//   const handleEdit = useCallback(async (row) => {
//     try {
//       const response = await apiFetch(
//         `/api/inventory/stock-verifications/${row.id}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         console.log("Edit verification data:", response.data);
//         // Navigate to edit page with data
//         // Example: navigate(`/inventory/stock-verification/edit/${row.id}`, { state: response.data });
//       }
//     } catch (err) {
//       console.error("Failed to fetch verification details for editing:", err);
//       alert("Failed to load verification details");
//     }
//   }, []);

//   // Handle view action
//   const handleView = useCallback(async (row) => {
//     try {
//       const response = await apiFetch(
//         `/api/inventory/stock-verifications/${row.id}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         console.log("View verification details:", response.data);
//         // Navigate to view page or open modal
//         // Example: navigate(`/inventory/stock-verification/view/${row.id}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch verification details:", err);
//       alert("Failed to load verification details");
//     }
//   }, []);

//   // Handle delete action
//   const handleDelete = useCallback(
//     async (row) => {
//       if (
//         !window.confirm(
//           `Are you sure you want to delete verification ${row.transactionNo}?`
//         )
//       ) {
//         return;
//       }

//       try {
//         const response = await apiFetch(
//           `/api/inventory/stock-verifications/${row.id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (response.success) {
//           alert("Stock verification deleted successfully");
//           // Refresh data
//           fetchVerificationData();
//         } else {
//           throw new Error(response.message || "Failed to delete verification");
//         }
//       } catch (err) {
//         console.error("Failed to delete verification:", err);
//         alert(err.message || "Failed to delete verification");
//       }
//     },
//     [fetchVerificationData]
//   );

//   // Handle page change
//   const handlePageChange = useCallback((page) => {
//     setCurrentPage(page);
//   }, []);

//   // Handle items per page change
//   const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
//     setItemsPerPage(newItemsPerPage);
//     setCurrentPage(1);
//   }, []);

//   // Retry handler
//   const handleRetry = useCallback(() => {
//     fetchVerificationData();
//   }, [fetchVerificationData]);

//   // Calculate pagination
//   const totalPages = Math.ceil(totalRecords / itemsPerPage);
//   const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
//   const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalRecords);

//   // Styles
//   const styles = {
//     layout: {
//       display: "flex",
//       minHeight: "100vh",
//       backgroundColor: "#f5f5f5",
//     },
//     page: {
//       flexGrow: 1,
//       marginLeft: sidebarCollapsed ? "60px" : "240px",
//       transition: "margin-left 0.3s ease",
//       padding: 0,
//     },
//     container: {
//       padding: "20px",
//       backgroundColor: "#f5f5f5",
//       minHeight: "100vh",
//     },
//     pageHeader: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       backgroundColor: "#fff",
//       padding: "15px 20px",
//       marginBottom: "20px",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     },
//     headerLeft: {
//       display: "flex",
//       alignItems: "center",
//       gap: "15px",
//     },
//     pageIcon: {
//       width: "40px",
//       height: "40px",
//       backgroundColor: "#f0f0f0",
//       borderRadius: "5px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: "20px",
//     },
//     pageTitle: {
//       margin: 0,
//       fontSize: "20px",
//       fontWeight: 600,
//       color: "#333",
//     },
//     actionBar: {
//       marginBottom: "20px",
//       display: "flex",
//       justifyContent: "flex-end",
//     },
//     btnAdd: {
//       padding: "10px 20px",
//       backgroundColor: "#1976d2",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: 500,
//     },
//     searchBar: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       marginBottom: "20px",
//       backgroundColor: "#fff",
//       padding: "15px 20px",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     },
//     label: {
//       fontSize: "14px",
//       fontWeight: 500,
//       color: "#666",
//     },
//     input: {
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//       fontSize: "14px",
//       outline: "none",
//     },
//     btnSearch: {
//       background: "#1976d2",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       padding: "8px 22px",
//       fontWeight: 500,
//       cursor: "pointer",
//       fontSize: "14px",
//     },
//     dataTableContainer: {
//       backgroundColor: "#fff",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     dataTable: {
//       width: "100%",
//       borderCollapse: "collapse",
//     },
//     tableHead: {
//       backgroundColor: "#e0e0e0",
//     },
//     th: {
//       padding: "12px 16px",
//       textAlign: "left",
//       fontSize: "14px",
//       fontWeight: 600,
//       color: "#333",
//       borderBottom: "2px solid #ccc",
//     },
//     td: {
//       padding: "12px 16px",
//       fontSize: "14px",
//       color: "#666",
//       borderBottom: "1px solid #eee",
//     },
//     actionButtons: {
//       display: "flex",
//       gap: "8px",
//     },
//     actionBtn: {
//       padding: "6px 12px",
//       backgroundColor: "transparent",
//       border: "1px solid #1976d2",
//       color: "#1976d2",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "13px",
//     },
//     editBtn: {
//       padding: "6px 12px",
//       backgroundColor: "transparent",
//       border: "1px solid #1976d2",
//       color: "#1976d2",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "18px",
//       display: "inline-flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     loadingContainer: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "60px",
//       color: "#666",
//     },
//     spinner: {
//       width: "40px",
//       height: "40px",
//       border: "4px solid #f3f3f3",
//       borderTop: "4px solid #1976d2",
//       borderRadius: "50%",
//       animation: "spin 1s linear infinite",
//       marginBottom: "15px",
//     },
//     noData: {
//       textAlign: "center",
//       padding: "40px",
//       color: "#999",
//     },
//     errorContainer: {
//       backgroundColor: "#fff",
//       borderRadius: "5px",
//       padding: "40px",
//       textAlign: "center",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//       marginBottom: "20px",
//     },
//     errorIcon: {
//       fontSize: "48px",
//       marginBottom: "15px",
//     },
//     errorTitle: {
//       fontSize: "20px",
//       fontWeight: 600,
//       color: "#d32f2f",
//       marginBottom: "10px",
//     },
//     errorMessage: {
//       fontSize: "14px",
//       color: "#666",
//       marginBottom: "20px",
//     },
//     btnRetry: {
//       padding: "10px 20px",
//       backgroundColor: "#1976d2",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: 500,
//     },
//     paginationContainer: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       backgroundColor: "#fff",
//       padding: "15px 20px",
//       marginTop: "20px",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//       flexWrap: "wrap",
//       gap: "15px",
//     },
//     paginationLeft: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     paginationSelect: {
//       padding: "6px 10px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//       fontSize: "13px",
//       outline: "none",
//     },
//     paginationCenter: {
//       fontSize: "13px",
//       color: "#666",
//     },
//     paginationRight: {
//       display: "flex",
//       gap: "5px",
//     },
//     paginationBtn: {
//       padding: "6px 12px",
//       backgroundColor: "#fff",
//       color: "#666",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "13px",
//       minWidth: "35px",
//     },
//     paginationBtnActive: {
//       padding: "6px 12px",
//       backgroundColor: "#1976d2",
//       color: "white",
//       border: "1px solid #1976d2",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "13px",
//       minWidth: "35px",
//     },
//     paginationBtnDisabled: {
//       padding: "6px 12px",
//       backgroundColor: "#fff",
//       color: "#666",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//       cursor: "not-allowed",
//       fontSize: "13px",
//       minWidth: "35px",
//       opacity: 0.5,
//     },
//   };

//   // Render error state
//   if (error && !loading) {
//     return (
//       <div className="container">
//         <PosTopbar />
//         <div style={styles.layout}>
//           <PosSidebar />
//           <div style={styles.page}>
//             <div style={styles.container}>
//               <div style={styles.pageHeader}>
//                 <div style={styles.headerLeft}>
//                   <div style={styles.pageIcon}>📝</div>
//                   <h2 style={styles.pageTitle}>Stock Verification Details</h2>
//                 </div>
//               </div>

//               <div style={styles.errorContainer}>
//                 <div style={styles.errorIcon}>⚠️</div>
//                 <h3 style={styles.errorTitle}>Error Loading Data</h3>
//                 <p style={styles.errorMessage}>{error}</p>
//                 <button style={styles.btnRetry} onClick={handleRetry}>
//                   Retry
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <PosTopbar />
//       <div style={styles.layout}>
//         <PosSidebar />

//         <div style={styles.page}>
//           <div style={styles.container}>
//             {/* Header Section */}
//             <div style={styles.pageHeader}>
//               <div style={styles.headerLeft}>
//                 <div style={styles.pageIcon}>📝</div>
//                 <h2 style={styles.pageTitle}>Stock Verification Details</h2>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div style={styles.searchBar}>
//               <label style={styles.label}>From Date</label>
//               <input
//                 type="date"
//                 value={fromDate}
//                 style={styles.input}
//                 onChange={(e) => setFromDate(e.target.value)}
//               />
//               <label style={styles.label}>To Date</label>
//               <input
//                 type="date"
//                 value={toDate}
//                 style={styles.input}
//                 onChange={(e) => setToDate(e.target.value)}
//               />
//               <button
//                 style={styles.btnSearch}
//                 onClick={handleSearch}
//                 disabled={loading}
//               >
//                 {loading ? "Searching..." : "Search"}
//               </button>
//             </div>

//             {/* Add Button */}
//             <div style={styles.actionBar}>
//               <button style={styles.btnAdd} onClick={handleAddVerification}>
//                 Add Stock Verification
//               </button>
//             </div>

//             {/* Data Table */}
//             <div style={styles.dataTableContainer}>
//               {loading ? (
//                 <div style={styles.loadingContainer}>
//                   <div style={styles.spinner}></div>
//                   <p>Loading verification data...</p>
//                 </div>
//               ) : (
//                 <table style={styles.dataTable}>
//                   <thead style={styles.tableHead}>
//                     <tr>
//                       <th style={styles.th}>Date</th>
//                       <th style={styles.th}>Transaction No</th>
//                       <th style={styles.th}>Department Name</th>
//                       <th style={styles.th}>Department Type Name</th>
//                       <th style={styles.th}>Status</th>
//                       <th style={styles.th}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {verificationData.length > 0 ? (
//                       verificationData.map((row) => (
//                         <tr key={row.id}>
//                           <td style={styles.td}>{row.date}</td>
//                           <td style={styles.td}>{row.transactionNo}</td>
//                           <td style={styles.td}>{row.departmentName}</td>
//                           <td style={styles.td}>{row.departmentTypeName}</td>
//                           <td style={styles.td}>
//                             <span
//                               style={{
//                                 padding: "4px 8px",
//                                 borderRadius: "4px",
//                                 fontSize: "12px",
//                                 fontWeight: 500,
//                                 backgroundColor:
//                                   row.status === "Completed"
//                                     ? "#e8f5e9"
//                                     : row.status === "In Progress"
//                                     ? "#fff3e0"
//                                     : "#f5f5f5",
//                                 color:
//                                   row.status === "Completed"
//                                     ? "#2e7d32"
//                                     : row.status === "In Progress"
//                                     ? "#ef6c00"
//                                     : "#666",
//                               }}
//                             >
//                               {row.status || "Pending"}
//                             </span>
//                           </td>
//                           <td style={styles.td}>
//                             <div style={styles.actionButtons}>
//                               <button
//                                 style={styles.actionBtn}
//                                 onClick={() => handleView(row)}
//                                 title="View"
//                               >
//                                 👁️
//                               </button>
//                               <button
//                                 style={styles.editBtn}
//                                 onClick={() => handleEdit(row)}
//                                 title="Edit"
//                               >
//                                 ✏️
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="6" style={styles.noData}>
//                           No stock verification records found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>

//             {/* Pagination Controls */}
//             {totalRecords > 0 && (
//               <div style={styles.paginationContainer}>
//                 <div style={styles.paginationLeft}>
//                   <label
//                     style={{ fontSize: "13px", fontWeight: 500, color: "#666" }}
//                   >
//                     Items per page
//                   </label>
//                   <select
//                     value={itemsPerPage}
//                     onChange={(e) =>
//                       handleItemsPerPageChange(Number(e.target.value))
//                     }
//                     style={styles.paginationSelect}
//                     disabled={loading}
//                   >
//                     <option value={5}>5 per page</option>
//                     <option value={10}>10 per page</option>
//                     <option value={25}>25 per page</option>
//                     <option value={50}>50 per page</option>
//                     <option value={100}>100 per page</option>
//                   </select>
//                 </div>

//                 <div style={styles.paginationCenter}>
//                   <span>
//                     Showing {indexOfFirstItem} to {indexOfLastItem} of{" "}
//                     {totalRecords} entries
//                   </span>
//                 </div>

//                 <div style={styles.paginationRight}>
//                   <button
//                     style={
//                       currentPage === 1
//                         ? styles.paginationBtnDisabled
//                         : styles.paginationBtn
//                     }
//                     onClick={() => handlePageChange(1)}
//                     disabled={currentPage === 1 || loading}
//                   >
//                     ««
//                   </button>
//                   <button
//                     style={
//                       currentPage === 1
//                         ? styles.paginationBtnDisabled
//                         : styles.paginationBtn
//                     }
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1 || loading}
//                   >
//                     ‹
//                   </button>

//                   {[...Array(totalPages)].map((_, i) => {
//                     const pageNum = i + 1;
//                     if (
//                       pageNum === 1 ||
//                       pageNum === totalPages ||
//                       (pageNum >= currentPage - 2 &&
//                         pageNum <= currentPage + 2)
//                     ) {
//                       return (
//                         <button
//                           key={pageNum}
//                           style={
//                             currentPage === pageNum
//                               ? styles.paginationBtnActive
//                               : styles.paginationBtn
//                           }
//                           onClick={() => handlePageChange(pageNum)}
//                           disabled={loading}
//                         >
//                           {pageNum}
//                         </button>
//                       );
//                     } else if (
//                       pageNum === currentPage - 3 ||
//                       pageNum === currentPage + 3
//                     ) {
//                       return <span key={pageNum}>...</span>;
//                     }
//                     return null;
//                   })}

//                   <button
//                     style={
//                       currentPage === totalPages
//                         ? styles.paginationBtnDisabled
//                         : styles.paginationBtn
//                     }
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages || loading}
//                   >
//                     ›
//                   </button>
//                   <button
//                     style={
//                       currentPage === totalPages
//                         ? styles.paginationBtnDisabled
//                         : styles.paginationBtn
//                     }
//                     onClick={() => handlePageChange(totalPages)}
//                     disabled={currentPage === totalPages || loading}
//                   >
//                     »»
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//           table tbody tr:hover {
//             background-color: #f9f9f9;
//           }
//           button:hover:not(:disabled) {
//             opacity: 0.9;
//           }
//           button:disabled {
//             cursor: not-allowed;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }
