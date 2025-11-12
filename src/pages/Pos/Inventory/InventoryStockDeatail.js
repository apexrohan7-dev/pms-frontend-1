// src/pages/POS/Inventory/InventoryStockDetail.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function InventoryStockDetail() {
  // State management
  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  // Sidebar state - automatically syncs with PosSidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data matching "Department Op Stock Details"
  const mockData = [
    {
      id: 1,
      date: "08/08/2025",
      transactionNo: "STOCKOP1",
      departmentName: "",
      createdBy: "Buser"
    }
    // Add more objects as necessary
  ];

  // Load data on mount
  useEffect(() => {
    loadStockData();
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

  const loadStockData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setStockData(mockData);
      setFilteredData(mockData);
    } catch (error) {
      console.error("Failed to load stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStock = () => {
    console.log("Add Department OP Stock clicked");
    // Navigate to add page or open modal
  };

  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
    // Navigate to edit page or open edit modal
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // --- Styles (reuse from your transfer page) ---
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
              <div style={styles.pageIcon}>📦</div>
              <h2 style={styles.pageTitle}>Department OP Stock Details</h2>
            </div>
            {/* <div style={styles.headerRight}>
              <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
              <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
              <span style={styles.headerInfo}>$1341 Buser</span>
              <span style={styles.headerInfo}>Today: Oct 07 2025 13:37:05</span>
              <button style={styles.btnAudit}>Audit</button>
              <button style={styles.btnClose}>⚙</button>
            </div> */}
          </div>

          {/* Add Button */}
          <div style={styles.actionBar}>
            <button style={styles.btnAdd} onClick={handleAddStock}>
              Add Department OP Stock
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
                    <th style={styles.th}>Transaction No.</th>
                    <th style={styles.th}>Department Name</th>
                    <th style={styles.th}>Created By</th>
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
                        <td style={styles.td}>{row.createdBy}</td>
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



// // src/pages/POS/Inventory/InventoryStockDetail.js
// import React, { useState, useEffect, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";

// export default function InventoryStockDetail() {
//   // State management
//   const [stockData, setStockData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Fetch department opening stock data
//   const fetchStockData = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: itemsPerPage,
//       });

//       const response = await apiFetch(
//         `/api/inventory/department-opening-stock?${queryParams}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         setStockData(response.data.stocks || []);
//         setTotalRecords(response.data.total || 0);
//       } else {
//         throw new Error(response.message || "Failed to fetch data");
//       }
//     } catch (err) {
//       console.error("Failed to load stock data:", err);
//       setError(err.message || "Failed to load stock data");
//       setStockData([]);
//       setTotalRecords(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage]);

//   // Load data on mount and when dependencies change
//   useEffect(() => {
//     fetchStockData();
//   }, [fetchStockData]);

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

//   // Handle add department opening stock
//   const handleAddStock = useCallback(() => {
//     console.log("Add Department OP Stock clicked");
//     // Navigate to add page or open modal
//     // Example: navigate("/inventory/department-opening-stock/add");
//   }, []);

//   // Handle edit action
//   const handleEdit = useCallback(async (row) => {
//     try {
//       const response = await apiFetch(
//         `/api/inventory/department-opening-stock/${row.id}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         console.log("Edit stock data:", response.data);
//         // Navigate to edit page with data
//         // Example: navigate(`/inventory/department-opening-stock/edit/${row.id}`, { state: response.data });
//       }
//     } catch (err) {
//       console.error("Failed to fetch stock details for editing:", err);
//       alert("Failed to load stock details");
//     }
//   }, []);

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
//     fetchStockData();
//   }, [fetchStockData]);

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
//                   <div style={styles.pageIcon}>📦</div>
//                   <h2 style={styles.pageTitle}>Department OP Stock Details</h2>
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
//                 <div style={styles.pageIcon}>📦</div>
//                 <h2 style={styles.pageTitle}>Department OP Stock Details</h2>
//               </div>
//             </div>

//             {/* Add Button */}
//             <div style={styles.actionBar}>
//               <button style={styles.btnAdd} onClick={handleAddStock}>
//                 Add Department OP Stock
//               </button>
//             </div>

//             {/* Data Table */}
//             <div style={styles.dataTableContainer}>
//               {loading ? (
//                 <div style={styles.loadingContainer}>
//                   <div style={styles.spinner}></div>
//                   <p>Loading stock data...</p>
//                 </div>
//               ) : (
//                 <table style={styles.dataTable}>
//                   <thead style={styles.tableHead}>
//                     <tr>
//                       <th style={styles.th}>Date</th>
//                       <th style={styles.th}>Transaction No.</th>
//                       <th style={styles.th}>Department Name</th>
//                       <th style={styles.th}>Created By</th>
//                       <th style={styles.th}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {stockData.length > 0 ? (
//                       stockData.map((row) => (
//                         <tr key={row.id}>
//                           <td style={styles.td}>{row.date}</td>
//                           <td style={styles.td}>{row.transactionNo}</td>
//                           <td style={styles.td}>
//                             {row.departmentName || "-"}
//                           </td>
//                           <td style={styles.td}>{row.createdBy}</td>
//                           <td style={styles.td}>
//                             <button
//                               style={styles.editBtn}
//                               onClick={() => handleEdit(row)}
//                               title="Edit"
//                             >
//                               ✏️
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="5" style={styles.noData}>
//                           No department opening stock records found
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
//                     // Show first, last, current, and 2 pages around current
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
