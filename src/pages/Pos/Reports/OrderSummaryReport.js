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

// // src/pages/POS/Reports/OrderSummaryReport.js
// import React, { useState, useEffect, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";

// export default function OrderSummaryReport() {
//   const [department, setDepartment] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [tab, setTab] = useState("all");

//   // Dropdown options
//   const [departments, setDepartments] = useState([]);

//   // Data
//   const [reportData, setReportData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [exporting, setExporting] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Tab counts
//   const [tabCounts, setTabCounts] = useState({
//     all: 0,
//     running: 0,
//     settled: 0,
//     voided: 0,
//   });

//   // Summary data
//   const [summary, setSummary] = useState({
//     totalOrders: 0,
//     totalAmount: 0,
//     avgOrderValue: 0,
//   });

//   // Fetch departments for dropdown
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await apiFetch("/api/pos/departments", {
//           method: "GET",
//         });

//         if (response.success) {
//           setDepartments(response.data || []);
//         }
//       } catch (err) {
//         console.error("Failed to load departments:", err);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch order summary report data
//   const fetchReportData = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: itemsPerPage,
//         status: tab,
//         ...(department && { department }),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//       });

//       const response = await apiFetch(
//         `/api/pos/reports/order-summary?${queryParams}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         setReportData(response.data.orders || []);
//         setTotalRecords(response.data.total || 0);
//         setTabCounts(
//           response.data.tabCounts || {
//             all: 0,
//             running: 0,
//             settled: 0,
//             voided: 0,
//           }
//         );
//         setSummary(
//           response.data.summary || {
//             totalOrders: 0,
//             totalAmount: 0,
//             avgOrderValue: 0,
//           }
//         );
//       } else {
//         throw new Error(response.message || "Failed to fetch report data");
//       }
//     } catch (err) {
//       console.error("Failed to load report data:", err);
//       setError(err.message || "Failed to load report data");
//       setReportData([]);
//       setTotalRecords(0);
//       setTabCounts({ all: 0, running: 0, settled: 0, voided: 0 });
//       setSummary({ totalOrders: 0, totalAmount: 0, avgOrderValue: 0 });
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, tab, department, fromDate, toDate]);

//   // Load data on mount and when dependencies change
//   useEffect(() => {
//     fetchReportData();
//   }, [fetchReportData]);

//   // Sidebar collapse detection
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

//   // Handle search
//   const handleSearch = useCallback(() => {
//     setCurrentPage(1);
//     fetchReportData();
//   }, [fetchReportData]);

//   // Export to Excel
//   const handleExportExcel = useCallback(async () => {
//     setExporting(true);
//     try {
//       const queryParams = new URLSearchParams({
//         status: tab,
//         ...(department && { department }),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//         export: "excel",
//       });

//       const response = await apiFetch(
//         `/api/pos/reports/order-summary/export?${queryParams}`,
//         {
//           method: "GET",
//           responseType: "blob",
//         }
//       );

//       const blob = new Blob([response], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute(
//         "download",
//         `Order_Summary_Report_${new Date().toISOString().split("T")[0]}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       alert("Report exported successfully!");
//     } catch (err) {
//       console.error("Failed to export report:", err);
//       alert("Failed to export report. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   }, [tab, department, fromDate, toDate]);

//   // Export to PDF
//   const handleExportPdf = useCallback(async () => {
//     setExporting(true);
//     try {
//       const queryParams = new URLSearchParams({
//         status: tab,
//         ...(department && { department }),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//         export: "pdf",
//       });

//       const response = await apiFetch(
//         `/api/pos/reports/order-summary/export?${queryParams}`,
//         {
//           method: "GET",
//           responseType: "blob",
//         }
//       );

//       const blob = new Blob([response], {
//         type: "application/pdf",
//       });

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute(
//         "download",
//         `Order_Summary_Report_${new Date().toISOString().split("T")[0]}.pdf`
//       );
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       alert("PDF exported successfully!");
//     } catch (err) {
//       console.error("Failed to export PDF:", err);
//       alert("Failed to export PDF. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   }, [tab, department, fromDate, toDate]);

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
//     fetchReportData();
//   }, [fetchReportData]);

//   // Pagination calculations
//   const totalPages = Math.ceil(totalRecords / itemsPerPage);
//   const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
//   const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalRecords);

//   // Helper function to get status badge style
//   const getStatusBadgeStyle = (status) => {
//     const baseStyle = {
//       padding: "4px 8px",
//       borderRadius: "4px",
//       fontSize: "12px",
//       fontWeight: 500,
//     };

//     switch (status?.toLowerCase()) {
//       case "settled":
//       case "completed":
//         return {
//           ...baseStyle,
//           backgroundColor: "#e8f5e9",
//           color: "#2e7d32",
//         };
//       case "running":
//       case "in progress":
//         return {
//           ...baseStyle,
//           backgroundColor: "#fff3e0",
//           color: "#ef6c00",
//         };
//       case "voided":
//       case "cancelled":
//         return {
//           ...baseStyle,
//           backgroundColor: "#ffebee",
//           color: "#c62828",
//         };
//       default:
//         return {
//           ...baseStyle,
//           backgroundColor: "#f5f5f5",
//           color: "#666",
//         };
//     }
//   };

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
//       alignItems: "center",
//       backgroundColor: "#fff",
//       padding: "15px 20px",
//       marginBottom: "20px",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
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
//       marginRight: "15px",
//     },
//     pageTitle: {
//       margin: 0,
//       fontSize: "20px",
//       fontWeight: 600,
//       color: "#333",
//     },
//     filterPanel: {
//       display: "flex",
//       flexWrap: "wrap",
//       gap: "12px 14px",
//       alignItems: "end",
//       margin: "16px 0 8px 0",
//       background: "#fff",
//       borderRadius: "5px",
//       padding: "16px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     },
//     filterGroup: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "5px",
//     },
//     filterLabel: {
//       fontSize: "13px",
//       fontWeight: 500,
//       color: "#666",
//     },
//     filterInput: {
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//       fontSize: "14px",
//       minWidth: "135px",
//       outline: "none",
//     },
//     btnSearch: {
//       backgroundColor: "#1976d2",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       padding: "8px 22px",
//       fontWeight: 500,
//       fontSize: "14px",
//       cursor: "pointer",
//       marginTop: "20px",
//     },
//     btnExport: {
//       backgroundColor: "#43a047",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       padding: "8px 16px",
//       fontSize: "14px",
//       fontWeight: 500,
//       cursor: "pointer",
//       marginTop: "20px",
//       display: "flex",
//       alignItems: "center",
//       gap: "5px",
//     },
//     btnPdf: {
//       backgroundColor: "#c62828",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       padding: "8px 16px",
//       fontSize: "14px",
//       fontWeight: 500,
//       cursor: "pointer",
//       marginTop: "20px",
//       display: "flex",
//       alignItems: "center",
//       gap: "5px",
//     },
//     summaryPanel: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//       gap: "15px",
//       backgroundColor: "#fff",
//       padding: "15px 20px",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//       marginBottom: "15px",
//     },
//     summaryItem: {
//       textAlign: "center",
//       padding: "10px",
//       borderRadius: "4px",
//       backgroundColor: "#f5f5f5",
//     },
//     summaryLabel: {
//       fontSize: "12px",
//       color: "#666",
//       marginBottom: "5px",
//       textTransform: "uppercase",
//     },
//     summaryValue: {
//       fontSize: "18px",
//       fontWeight: 600,
//       color: "#1976d2",
//     },
//     tabsBar: {
//       display: "flex",
//       alignItems: "center",
//       margin: "10px 0 10px 0",
//       fontSize: "16px",
//       gap: "5px",
//       backgroundColor: "#fff",
//       padding: "10px 15px",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     },
//     tab: (isActive) => ({
//       background: "none",
//       border: "none",
//       borderBottom: isActive ? "3px solid #1976d2" : "none",
//       color: isActive ? "#1976d2" : "#444",
//       fontWeight: isActive ? 700 : 400,
//       padding: "0 10px 7px 10px",
//       fontSize: "15px",
//       outline: "none",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       transition: "border-bottom 0.2s",
//     }),
//     badge: {
//       background: "#e0e0e0",
//       borderRadius: "12px",
//       fontSize: "11px",
//       padding: "2px 8px",
//       marginLeft: 6,
//       minWidth: "24px",
//       textAlign: "center",
//     },
//     badgeActive: {
//       background: "#1976d2",
//       color: "#fff",
//       borderRadius: "12px",
//       fontSize: "11px",
//       padding: "2px 8px",
//       marginLeft: 6,
//       minWidth: "24px",
//       textAlign: "center",
//     },
//     dataTableContainer: {
//       backgroundColor: "#fff",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//       overflow: "auto",
//       marginTop: "12px",
//     },
//     dataTable: {
//       width: "100%",
//       borderCollapse: "collapse",
//       minWidth: "1200px",
//     },
//     tableHead: {
//       backgroundColor: "#e0e0e0",
//     },
//     th: {
//       padding: "10px 12px",
//       textAlign: "left",
//       fontSize: "13px",
//       fontWeight: 600,
//       color: "#333",
//       borderBottom: "2px solid #ccc",
//       whiteSpace: "nowrap",
//     },
//     td: {
//       padding: "10px 12px",
//       fontSize: "13px",
//       color: "#666",
//       borderBottom: "1px solid #eee",
//       whiteSpace: "nowrap",
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
//                 <div style={styles.pageIcon}>📝</div>
//                 <span style={styles.pageTitle}>Order Summary Report</span>
//               </div>

//               <div style={styles.errorContainer}>
//                 <div style={styles.errorIcon}>⚠️</div>
//                 <h3 style={styles.errorTitle}>Error Loading Report</h3>
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
//             {/* Header */}
//             <div style={styles.pageHeader}>
//               <div style={styles.pageIcon}>📝</div>
//               <span style={styles.pageTitle}>Order Summary Report</span>
//             </div>

//             {/* Filter Panel */}
//             <div style={styles.filterPanel}>
//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>Department Name</label>
//                 <select
//                   style={styles.filterInput}
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                 >
//                   <option value="">All Departments</option>
//                   {departments.map((dept) => (
//                     <option key={dept.id} value={dept.id}>
//                       {dept.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>From Date</label>
//                 <input
//                   type="date"
//                   style={styles.filterInput}
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                 />
//               </div>

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>To Date</label>
//                 <input
//                   type="date"
//                   style={styles.filterInput}
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                 />
//               </div>

//               <button
//                 style={styles.btnSearch}
//                 onClick={handleSearch}
//                 disabled={loading}
//               >
//                 {loading ? "Searching..." : "Search"}
//               </button>

//               <button
//                 style={styles.btnExport}
//                 onClick={handleExportExcel}
//                 disabled={exporting || loading}
//               >
//                 {exporting ? "Exporting..." : "📊 Excel"}
//               </button>

//               <button
//                 style={styles.btnPdf}
//                 onClick={handleExportPdf}
//                 disabled={exporting || loading}
//               >
//                 {exporting ? "Generating..." : "📄 PDF"}
//               </button>
//             </div>

//             {/* Summary Panel */}
//             {!loading && totalRecords > 0 && (
//               <div style={styles.summaryPanel}>
//                 <div style={styles.summaryItem}>
//                   <div style={styles.summaryLabel}>Total Orders</div>
//                   <div style={styles.summaryValue}>{summary.totalOrders}</div>
//                 </div>
//                 <div style={styles.summaryItem}>
//                   <div style={styles.summaryLabel}>Total Amount</div>
//                   <div style={styles.summaryValue}>
//                     ₹{Number(summary.totalAmount).toLocaleString("en-IN")}
//                   </div>
//                 </div>
//                 <div style={styles.summaryItem}>
//                   <div style={styles.summaryLabel}>Avg Order Value</div>
//                   <div style={styles.summaryValue}>
//                     ₹{Number(summary.avgOrderValue).toLocaleString("en-IN")}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Tabs */}
//             <div style={styles.tabsBar}>
//               <button
//                 style={styles.tab(tab === "all")}
//                 onClick={() => setTab("all")}
//               >
//                 All
//                 <span
//                   style={tab === "all" ? styles.badgeActive : styles.badge}
//                 >
//                   {tabCounts.all}
//                 </span>
//               </button>
//               <button
//                 style={styles.tab(tab === "running")}
//                 onClick={() => setTab("running")}
//               >
//                 Running
//                 <span
//                   style={tab === "running" ? styles.badgeActive : styles.badge}
//                 >
//                   {tabCounts.running}
//                 </span>
//               </button>
//               <button
//                 style={styles.tab(tab === "settled")}
//                 onClick={() => setTab("settled")}
//               >
//                 Settled
//                 <span
//                   style={tab === "settled" ? styles.badgeActive : styles.badge}
//                 >
//                   {tabCounts.settled}
//                 </span>
//               </button>
//               <button
//                 style={styles.tab(tab === "voided")}
//                 onClick={() => setTab("voided")}
//               >
//                 Voided
//                 <span
//                   style={tab === "voided" ? styles.badgeActive : styles.badge}
//                 >
//                   {tabCounts.voided}
//                 </span>
//               </button>
//             </div>

//             {/* Table */}
//             <div style={styles.dataTableContainer}>
//               {loading ? (
//                 <div style={styles.loadingContainer}>
//                   <div style={styles.spinner}></div>
//                   <p>Loading order data...</p>
//                 </div>
//               ) : (
//                 <table style={styles.dataTable}>
//                   <thead style={styles.tableHead}>
//                     <tr>
//                       <th style={styles.th}>Order</th>
//                       <th style={styles.th}>Time</th>
//                       <th style={styles.th}>Receipt No</th>
//                       <th style={styles.th}>R/T No</th>
//                       <th style={styles.th}>Order Type</th>
//                       <th style={styles.th}>Guest Name</th>
//                       <th style={styles.th}>Status</th>
//                       <th style={styles.th}>Amount</th>
//                       <th style={styles.th}>User Name</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reportData.length > 0 ? (
//                       reportData.map((row, idx) => (
//                         <tr key={row.id || idx}>
//                           <td style={styles.td}>{row.order || "-"}</td>
//                           <td style={styles.td}>{row.time || "-"}</td>
//                           <td style={styles.td}>{row.receiptNo || "-"}</td>
//                           <td style={styles.td}>{row.rtNo || "-"}</td>
//                           <td style={styles.td}>{row.orderType || "-"}</td>
//                           <td style={styles.td}>{row.guestName || "-"}</td>
//                           <td style={styles.td}>
//                             <span style={getStatusBadgeStyle(row.status)}>
//                               {row.status}
//                             </span>
//                           </td>
//                           <td style={styles.td}>
//                             <strong>
//                               ₹{Number(row.amount || 0).toLocaleString("en-IN")}
//                             </strong>
//                           </td>
//                           <td style={styles.td}>{row.userName || "-"}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={9}>
//                           <div style={styles.noData}>
//                             No order data available for selected filters
//                           </div>
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
//                       (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
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
