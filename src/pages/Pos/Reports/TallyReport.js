// src/pages/POS/Reports/TallyReport.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTapbar from "../../../components/layout/postopbar";

export default function TallyReport() {
  const [department, setDepartment] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [outlet, setOutlet] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchType, setSearchType] = useState("All");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Example/mock row for column structure
  const mockData = [
    {
      sno: 1,
      billNo: "B001",
      billDate: "10/07/2025",
      billStatus: "Paid",
      departmentName: "Bar",
      departmentTypeName: "F&B",
      outletName: "Main",
      orderTableNo: "A12",
      guestName: "John Doe",
      guestAddress: "123 MG Road",
      guestState: "RJ",
      guestPhone: "9876543210",
      billToPartyName: "Acme Corp",
      partyAddress: "Somewhere, Jaipur",
      partyState: "RJ",
      partyGSTIN: "08XXXXX1234X1Z5",
      discount: 50,
      billAmount: 1450
    }
    // Add more mock rows as needed
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
    setReportData(mockData);
    setCurrentPage(1);
  };

  const handleExport = () => {
    alert("Export Excel placeholder");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reportData.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

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
      margin: '16px 0',
      background: '#fff',
      borderRadius: '4px',
      padding: '16px'
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
      padding: '40px',
      color: '#999'
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '15px 20px',
      marginTop: '12px',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.09)'
    },
    paginationBtn: {
      padding: '6px 12px',
      backgroundColor: '#fff',
      color: '#666',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      minWidth: '35px',
      margin: '0 2px'
    },
    paginationBtnActive: {
      padding: '6px 12px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: '1px solid #1976d2',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      minWidth: '35px',
      margin: '0 2px'
    },
    paginationBtnDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  };

  return (
    <div className="container">
      <PosTapbar/>
    <div style={styles.layout}>
      <PosSidebar />

      <div style={styles.page}>
        <div style={styles.container}>
          {/* Header */}
           <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>🧾</div>
            <span style={styles.pageTitle}>Tally Report</span>
            {/* <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
            <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
            <span style={styles.headerInfo}>51341 Buser</span>
            <span style={styles.headerInfo}>Today: Oct 07 2025 14:33:20</span>
            <button style={styles.btnAudit}>Audit</button>
            <button style={styles.btnClose}>⚙</button> */}
          </div> 
          {/* Filter/Search Panel */}
          <div style={styles.filterPanel}>
            <label style={styles.filterLabel}>Department Name</label>
            <select style={styles.filterInput} value={department} onChange={e => setDepartment(e.target.value)}>
              <option value="">Select</option>
              {/* Add options dynamically */}
            </select>
            <label style={styles.filterLabel}>Sub Department Name</label>
            <select style={styles.filterInput} value={subDepartment} onChange={e => setSubDepartment(e.target.value)}>
              <option value="">Select</option>
              {/* Add options dynamically */}
            </select>
            <label style={styles.filterLabel}>Outlet Name</label>
            <select style={styles.filterInput} value={outlet} onChange={e => setOutlet(e.target.value)}>
              <option value="">Select</option>
              {/* Add options dynamically */}
            </select>
            <label style={styles.filterLabel}>From Date</label>
            <input type="date" style={styles.filterInput} value={fromDate} onChange={e => setFromDate(e.target.value)} />
            <label style={styles.filterLabel}>To Date</label>
            <input type="date" style={styles.filterInput} value={toDate} onChange={e => setToDate(e.target.value)} />
            <label style={styles.filterLabel}>Search</label>
            <select style={styles.filterInput} value={searchType} onChange={e => setSearchType(e.target.value)}>
              <option value="All">All</option>
              {/* Custom filter types */}
            </select>
            <button style={styles.btnSearch} onClick={handleSearch}>Search</button>
            <button style={styles.btnExport} onClick={handleExport}>⎙</button>
          </div>
          {/* Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>SNo.</th>
                  <th style={styles.th}>Bill No.</th>
                  <th style={styles.th}>BillDate</th>
                  <th style={styles.th}>Bill Status</th>
                  <th style={styles.th}>DepartmentName</th>
                  <th style={styles.th}>DepartmentTypeName</th>
                  <th style={styles.th}>OutletName</th>
                  <th style={styles.th}>OrderTableNo</th>
                  <th style={styles.th}>GuestName</th>
                  <th style={styles.th}>GuestAddress</th>
                  <th style={styles.th}>GuestState</th>
                  <th style={styles.th}>GuestPhone</th>
                  <th style={styles.th}>BillToPartyName</th>
                  <th style={styles.th}>PartyAddress</th>
                  <th style={styles.th}>PartyState</th>
                  <th style={styles.th}>PartyGSTIN</th>
                  <th style={styles.th}>Discount</th>
                  <th style={styles.th}>BillAmount</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={18}><div style={styles.noData}>Loading...</div></td>
                  </tr>
                ) : currentItems.length > 0 ? (
                  currentItems.map((row, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{row.sno}</td>
                      <td style={styles.td}>{row.billNo}</td>
                      <td style={styles.td}>{row.billDate}</td>
                      <td style={styles.td}>{row.billStatus}</td>
                      <td style={styles.td}>{row.departmentName}</td>
                      <td style={styles.td}>{row.departmentTypeName}</td>
                      <td style={styles.td}>{row.outletName}</td>
                      <td style={styles.td}>{row.orderTableNo}</td>
                      <td style={styles.td}>{row.guestName}</td>
                      <td style={styles.td}>{row.guestAddress}</td>
                      <td style={styles.td}>{row.guestState}</td>
                      <td style={styles.td}>{row.guestPhone}</td>
                      <td style={styles.td}>{row.billToPartyName}</td>
                      <td style={styles.td}>{row.partyAddress}</td>
                      <td style={styles.td}>{row.partyState}</td>
                      <td style={styles.td}>{row.partyGSTIN}</td>
                      <td style={styles.td}>₹{row.discount}</td>
                      <td style={styles.td}>₹{row.billAmount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={18}>
                      <div style={styles.noData}>No data available</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {reportData.length > itemsPerPage && (
            <div style={styles.paginationContainer}>
              <button
                style={{
                  ...styles.paginationBtn,
                  ...(currentPage === 1 ? styles.paginationBtnDisabled : {})
                }}
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >First</button>
              <button
                style={{
                  ...styles.paginationBtn,
                  ...(currentPage === 1 ? styles.paginationBtnDisabled : {})
                }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >Previous</button>
              <span style={styles.paginationBtnActive}>{currentPage}</span>
              <button
                style={{
                  ...styles.paginationBtn,
                  ...(currentPage === totalPages ? styles.paginationBtnDisabled : {})
                }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >Next</button>
              <button
                style={{
                  ...styles.paginationBtn,
                  ...(currentPage === totalPages ? styles.paginationBtnDisabled : {})
                }}
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >Last</button>
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

// // src/pages/POS/Reports/TallyReport.js
// import React, { useState, useEffect, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";

// export default function TallyReport() {
//   const [department, setDepartment] = useState("");
//   const [subDepartment, setSubDepartment] = useState("");
//   const [outlet, setOutlet] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [searchType, setSearchType] = useState("All");

//   // Dropdown options
//   const [departments, setDepartments] = useState([]);
//   const [subDepartments, setSubDepartments] = useState([]);
//   const [outlets, setOutlets] = useState([]);
//   const [searchTypes, setSearchTypes] = useState([]);

//   // Data
//   const [reportData, setReportData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [exporting, setExporting] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Summary data
//   const [summary, setSummary] = useState({
//     totalBills: 0,
//     totalDiscount: 0,
//     totalAmount: 0,
//     gstAmount: 0,
//   });

//   // Fetch dropdown data
//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const [deptRes, outletsRes, searchTypesRes] = await Promise.all([
//           apiFetch("/api/pos/departments", { method: "GET" }),
//           apiFetch("/api/pos/outlets", { method: "GET" }),
//           apiFetch("/api/pos/search-types", { method: "GET" }),
//         ]);

//         if (deptRes.success) setDepartments(deptRes.data || []);
//         if (outletsRes.success) setOutlets(outletsRes.data || []);
//         if (searchTypesRes.success) setSearchTypes(searchTypesRes.data || []);
//       } catch (err) {
//         console.error("Failed to load dropdown data:", err);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   // Fetch subdepartments when department changes
//   useEffect(() => {
//     const fetchSubDepartments = async () => {
//       if (!department) {
//         setSubDepartments([]);
//         return;
//       }

//       try {
//         const response = await apiFetch(
//           `/api/pos/departments/${department}/subdepartments`,
//           { method: "GET" }
//         );

//         if (response.success) {
//           setSubDepartments(response.data || []);
//         }
//       } catch (err) {
//         console.error("Failed to load subdepartments:", err);
//         setSubDepartments([]);
//       }
//     };

//     fetchSubDepartments();
//   }, [department]);

//   // Fetch tally report data
//   const fetchReportData = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: itemsPerPage,
//         ...(department && { department }),
//         ...(subDepartment && { subDepartment }),
//         ...(outlet && { outlet }),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//         ...(searchType && searchType !== "All" && { searchType }),
//       });

//       const response = await apiFetch(
//         `/api/pos/reports/tally?${queryParams}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         setReportData(response.data.bills || []);
//         setTotalRecords(response.data.total || 0);
//         setSummary(
//           response.data.summary || {
//             totalBills: 0,
//             totalDiscount: 0,
//             totalAmount: 0,
//             gstAmount: 0,
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
//       setSummary({
//         totalBills: 0,
//         totalDiscount: 0,
//         totalAmount: 0,
//         gstAmount: 0,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     currentPage,
//     itemsPerPage,
//     department,
//     subDepartment,
//     outlet,
//     fromDate,
//     toDate,
//     searchType,
//   ]);

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

//   // Export to Excel (Tally format)
//   const handleExport = useCallback(async () => {
//     setExporting(true);
//     try {
//       const queryParams = new URLSearchParams({
//         ...(department && { department }),
//         ...(subDepartment && { subDepartment }),
//         ...(outlet && { outlet }),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//         ...(searchType && searchType !== "All" && { searchType }),
//         export: "tally",
//       });

//       const response = await apiFetch(
//         `/api/pos/reports/tally/export?${queryParams}`,
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
//         `Tally_Report_${new Date().toISOString().split("T")[0]}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       alert("Tally report exported successfully!");
//     } catch (err) {
//       console.error("Failed to export report:", err);
//       alert("Failed to export report. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   }, [department, subDepartment, outlet, fromDate, toDate, searchType]);

//   // Sync to Tally ERP
//   const handleSyncToTally = useCallback(async () => {
//     if (!window.confirm("Sync selected data to Tally ERP?")) return;

//     setExporting(true);
//     try {
//       const queryParams = new URLSearchParams({
//         ...(department && { department }),
//         ...(subDepartment && { subDepartment }),
//         ...(outlet && { outlet }),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//         ...(searchType && searchType !== "All" && { searchType }),
//       });

//       const response = await apiFetch(
//         `/api/pos/reports/tally/sync?${queryParams}`,
//         {
//           method: "POST",
//         }
//       );

//       if (response.success) {
//         alert(
//           `Successfully synced ${response.data.syncedCount} records to Tally ERP!`
//         );
//       } else {
//         throw new Error(response.message || "Failed to sync to Tally");
//       }
//     } catch (err) {
//       console.error("Failed to sync to Tally:", err);
//       alert(err.message || "Failed to sync to Tally. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   }, [department, subDepartment, outlet, fromDate, toDate, searchType]);

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
//       case "paid":
//       case "synced":
//         return {
//           ...baseStyle,
//           backgroundColor: "#e8f5e9",
//           color: "#2e7d32",
//         };
//       case "pending":
//         return {
//           ...baseStyle,
//           backgroundColor: "#fff3e0",
//           color: "#ef6c00",
//         };
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
//       margin: "16px 0",
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
//     btnSync: {
//       backgroundColor: "#f57c00",
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
//       minWidth: "2000px",
//     },
//     tableHead: {
//       backgroundColor: "#e0e0e0",
//     },
//     th: {
//       padding: "10px 12px",
//       textAlign: "left",
//       fontSize: "12px",
//       fontWeight: 600,
//       color: "#333",
//       borderBottom: "2px solid #ccc",
//       whiteSpace: "nowrap",
//     },
//     td: {
//       padding: "10px 12px",
//       fontSize: "12px",
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
//                 <div style={styles.pageIcon}>🧾</div>
//                 <span style={styles.pageTitle}>Tally Report</span>
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
//               <div style={styles.pageIcon}>🧾</div>
//               <span style={styles.pageTitle}>Tally Report</span>
//             </div>

//             {/* Filter/Search Panel */}
//             <div style={styles.filterPanel}>
//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>Department Name</label>
//                 <select
//                   style={styles.filterInput}
//                   value={department}
//                   onChange={(e) => {
//                     setDepartment(e.target.value);
//                     setSubDepartment("");
//                   }}
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
//                 <label style={styles.filterLabel}>Sub Department Name</label>
//                 <select
//                   style={styles.filterInput}
//                   value={subDepartment}
//                   onChange={(e) => setSubDepartment(e.target.value)}
//                   disabled={!department}
//                 >
//                   <option value="">All Sub Departments</option>
//                   {subDepartments.map((sub) => (
//                     <option key={sub.id} value={sub.id}>
//                       {sub.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>Outlet Name</label>
//                 <select
//                   style={styles.filterInput}
//                   value={outlet}
//                   onChange={(e) => setOutlet(e.target.value)}
//                 >
//                   <option value="">All Outlets</option>
//                   {outlets.map((out) => (
//                     <option key={out.id} value={out.id}>
//                       {out.name}
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

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>Search</label>
//                 <select
//                   style={styles.filterInput}
//                   value={searchType}
//                   onChange={(e) => setSearchType(e.target.value)}
//                 >
//                   <option value="All">All</option>
//                   {searchTypes.map((type) => (
//                     <option key={type.id} value={type.id}>
//                       {type.name}
//                     </option>
//                   ))}
//                 </select>
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
//                 onClick={handleExport}
//                 disabled={exporting || loading}
//               >
//                 {exporting ? "Exporting..." : "📊 Export"}
//               </button>

//               <button
//                 style={styles.btnSync}
//                 onClick={handleSyncToTally}
//                 disabled={exporting || loading}
//               >
//                 {exporting ? "Syncing..." : "🔄 Sync to Tally"}
//               </button>
//             </div>

//             {/* Summary Panel */}
//             {!loading && totalRecords > 0 && (
//               <div style={styles.summaryPanel}>
//                 <div style={styles.summaryItem}>
//                   <div style={styles.summaryLabel}>Total Bills</div>
//                   <div style={styles.summaryValue}>{summary.totalBills}</div>
//                 </div>
//                 <div style={styles.summaryItem}>
//                   <div style={styles.summaryLabel}>Total Discount</div>
//                   <div style={styles.summaryValue}>
//                     ₹{Number(summary.totalDiscount).toLocaleString("en-IN")}
//                   </div>
//                 </div>
//                 <div style={styles.summaryItem}>
//                   <div style={styles.summaryLabel}>GST Amount</div>
//                   <div style={styles.summaryValue}>
//                     ₹{Number(summary.gstAmount).toLocaleString("en-IN")}
//                   </div>
//                 </div>
//                 <div style={styles.summaryItem}>
//                   <div style={styles.summaryLabel}>Total Amount</div>
//                   <div style={styles.summaryValue}>
//                     ₹{Number(summary.totalAmount).toLocaleString("en-IN")}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Table */}
//             <div style={styles.dataTableContainer}>
//               {loading ? (
//                 <div style={styles.loadingContainer}>
//                   <div style={styles.spinner}></div>
//                   <p>Loading Tally data...</p>
//                 </div>
//               ) : (
//                 <table style={styles.dataTable}>
//                   <thead style={styles.tableHead}>
//                     <tr>
//                       <th style={styles.th}>SNo.</th>
//                       <th style={styles.th}>Bill No.</th>
//                       <th style={styles.th}>BillDate</th>
//                       <th style={styles.th}>Bill Status</th>
//                       <th style={styles.th}>DepartmentName</th>
//                       <th style={styles.th}>DepartmentTypeName</th>
//                       <th style={styles.th}>OutletName</th>
//                       <th style={styles.th}>OrderTableNo</th>
//                       <th style={styles.th}>GuestName</th>
//                       <th style={styles.th}>GuestAddress</th>
//                       <th style={styles.th}>GuestState</th>
//                       <th style={styles.th}>GuestPhone</th>
//                       <th style={styles.th}>BillToPartyName</th>
//                       <th style={styles.th}>PartyAddress</th>
//                       <th style={styles.th}>PartyState</th>
//                       <th style={styles.th}>PartyGSTIN</th>
//                       <th style={styles.th}>Discount</th>
//                       <th style={styles.th}>BillAmount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reportData.length > 0 ? (
//                       reportData.map((row, idx) => (
//                         <tr key={row.id || idx}>
//                           <td style={styles.td}>
//                             {(currentPage - 1) * itemsPerPage + idx + 1}
//                           </td>
//                           <td style={styles.td}>{row.billNo || "-"}</td>
//                           <td style={styles.td}>{row.billDate || "-"}</td>
//                           <td style={styles.td}>
//                             <span style={getStatusBadgeStyle(row.billStatus)}>
//                               {row.billStatus}
//                             </span>
//                           </td>
//                           <td style={styles.td}>{row.departmentName || "-"}</td>
//                           <td style={styles.td}>
//                             {row.departmentTypeName || "-"}
//                           </td>
//                           <td style={styles.td}>{row.outletName || "-"}</td>
//                           <td style={styles.td}>{row.orderTableNo || "-"}</td>
//                           <td style={styles.td}>{row.guestName || "-"}</td>
//                           <td style={styles.td}>{row.guestAddress || "-"}</td>
//                           <td style={styles.td}>{row.guestState || "-"}</td>
//                           <td style={styles.td}>{row.guestPhone || "-"}</td>
//                           <td style={styles.td}>
//                             {row.billToPartyName || "-"}
//                           </td>
//                           <td style={styles.td}>{row.partyAddress || "-"}</td>
//                           <td style={styles.td}>{row.partyState || "-"}</td>
//                           <td style={styles.td}>{row.partyGSTIN || "-"}</td>
//                           <td style={styles.td}>
//                             ₹{Number(row.discount || 0).toLocaleString("en-IN")}
//                           </td>
//                           <td style={styles.td}>
//                             <strong>
//                               ₹
//                               {Number(row.billAmount || 0).toLocaleString(
//                                 "en-IN"
//                               )}
//                             </strong>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={18}>
//                           <div style={styles.noData}>
//                             No billing data available for selected filters
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
