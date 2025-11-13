// src/pages/POS/Banquet/BanquetTallyReport.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function BanquetTallyReport() {
  const [outlet, setOutlet] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Example/mock data structure for table (put real data here)
  const mockData = [
    // {
    //   sno: 1,
    //   billNo: "BNQ001",
    //   checkOutDate: "10/07/2025",
    //   banquetId: "BQ101",
    //   billStatus: "Paid",
    //   department: "Banquet",
    //   outlet: "Main",
    //   fpNumberNo: "FP1001",
    //   contactNo: "9876543210",
    //   guestName: "John Doe",
    //   guestAddress: "Address",
    //   billToPartyName: "Company Ltd.",
    //   partyAddress: "Jaipur",
    //   partyState: "RJ",
    //   partyGSTIN: "GSTIN001"
    // }
  ];

  useEffect(() => {
    loadReportData();
  }, []);

  useEffect(() => {
    const handleSidebarChange = () => {
      const sidebar = document.querySelector(".rsb");
      if (sidebar) setSidebarCollapsed(sidebar.classList.contains("rsb--mini"));
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
      setReportData([]); // Use mockData or API here
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setReportData([]); // Add filter logic if needed
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reportData.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

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
      background: '#fff',
      borderRadius: '4px',
      padding: '14px 16px 8px 16px',
      marginBottom: '8px',
      display: 'flex',
      gap: '18px',
      alignItems: "end"
    },
    filterLabel: { minWidth: '120px', fontSize: '14px', color: '#333' },
    filterInput: {
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      minWidth: '155px'
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
      marginTop: '8px',
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
      <PosTopbar/>
    <div style={styles.layout}>
      <PosSidebar />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>📊</div>
            <span style={styles.pageTitle}>Banquet Tally Report</span>
            {/* <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
            <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
            <span style={styles.headerInfo}>51341 Buser</span>
            <span style={styles.headerInfo}>Today: Oct 07 2025 15:40:09</span>
            <button style={styles.btnAudit}>Audit</button>
            <button style={styles.btnClose}>⚙</button> */}
          </div>
          {/* Filter Panel */}
          <div style={styles.filterPanel}>
            <div>
              <label style={styles.filterLabel}>Outlet Name</label>
              <select style={styles.filterInput} value={outlet} onChange={e => setOutlet(e.target.value)}>
                <option value="">Select</option>
              </select>
            </div>
            <div>
              <label style={styles.filterLabel}>From Date</label>
              <input type="date" style={styles.filterInput} value={fromDate} onChange={e => setFromDate(e.target.value)} />
            </div>
            <div>
              <label style={styles.filterLabel}>To Date</label>
              <input type="date" style={styles.filterInput} value={toDate} onChange={e => setToDate(e.target.value)} />
            </div>
            <button style={styles.btnSearch} onClick={handleSearch}>Search</button>
            <button style={styles.btnSearch}><span role="img" aria-label="excel">📊</span></button>
          </div>
          {/* Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>SNo.</th>
                  <th style={styles.th}>Bill No.</th>
                  <th style={styles.th}>CheckOutDate</th>
                  <th style={styles.th}>Banquetid</th>
                  <th style={styles.th}>Bill Status</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Outlet</th>
                  <th style={styles.th}>FPNumberNo</th>
                  <th style={styles.th}>ContactNo</th>
                  <th style={styles.th}>GuestName</th>
                  <th style={styles.th}>GuestAddress</th>
                  <th style={styles.th}>BillToPartyName</th>
                  <th style={styles.th}>PartyAddress</th>
                  <th style={styles.th}>PartyState</th>
                  <th style={styles.th}>PartyGSTIN</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={15}><div style={styles.noData}>Loading...</div></td>
                  </tr>
                ) : currentItems.length > 0 ? (
                  currentItems.map((row, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{row.sno}</td>
                      <td style={styles.td}>{row.billNo}</td>
                      <td style={styles.td}>{row.checkOutDate}</td>
                      <td style={styles.td}>{row.banquetId}</td>
                      <td style={styles.td}>{row.billStatus}</td>
                      <td style={styles.td}>{row.department}</td>
                      <td style={styles.td}>{row.outlet}</td>
                      <td style={styles.td}>{row.fpNumberNo}</td>
                      <td style={styles.td}>{row.contactNo}</td>
                      <td style={styles.td}>{row.guestName}</td>
                      <td style={styles.td}>{row.guestAddress}</td>
                      <td style={styles.td}>{row.billToPartyName}</td>
                      <td style={styles.td}>{row.partyAddress}</td>
                      <td style={styles.td}>{row.partyState}</td>
                      <td style={styles.td}>{row.partyGSTIN}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={15}>
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
                style={{ ...styles.paginationBtn, ...(currentPage === 1 ? styles.paginationBtnDisabled : {}) }}
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >First</button>
              <button
                style={{ ...styles.paginationBtn, ...(currentPage === 1 ? styles.paginationBtnDisabled : {}) }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >Previous</button>
              <span style={styles.paginationBtnActive}>{currentPage}</span>
              <button
                style={{ ...styles.paginationBtn, ...(currentPage === totalPages ? styles.paginationBtnDisabled : {}) }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >Next</button>
              <button
                style={{ ...styles.paginationBtn, ...(currentPage === totalPages ? styles.paginationBtnDisabled : {}) }}
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >Last</button>
            </div>
          )}
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

// // src/pages/POS/Banquet/BanquetTallyReport.js
// import React, { useState, useEffect, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";

// export default function BanquetTallyReport() {
//   const [outlet, setOutlet] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [totalRecords, setTotalRecords] = useState(0);

//   // Dropdown options
//   const [outlets, setOutlets] = useState([]);

//   // Fetch outlets for dropdown
//   useEffect(() => {
//     const fetchOutlets = async () => {
//       try {
//         const response = await apiFetch("/api/pos/outlets", { method: "GET" });
//         if (response.success) {
//           setOutlets(response.data || []);
//         }
//       } catch (err) {
//         console.error("Failed to load outlets:", err);
//       }
//     };

//     fetchOutlets();
//   }, []);

//   // Sidebar collapse detection
//   useEffect(() => {
//     const handleSidebarChange = () => {
//       const sidebar = document.querySelector(".rsb");
//       if (sidebar) setSidebarCollapsed(sidebar.classList.contains("rsb--mini"));
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

//   // Fetch report data
//   const fetchReportData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: itemsPerPage,
//         ...(outlet && { outlet }),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//       });

//       const response = await apiFetch(
//         `/api/pos/reports/banquet-tally?${queryParams}`,
//         { method: "GET" }
//       );

//       if (response.success) {
//         setReportData(response.data.records || []);
//         setTotalRecords(response.data.total || 0);
//       } else {
//         throw new Error(response.message || "Failed to fetch banquet tally");
//       }
//     } catch (err) {
//       console.error("Banquet tally fetch error:", err);
//       setReportData([]);
//       setTotalRecords(0);
//       alert(err.message || "Failed to load banquet tally data.");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, outlet, fromDate, toDate]);

//   useEffect(() => {
//     fetchReportData();
//   }, [fetchReportData]);

//   const handleSearch = () => {
//     setCurrentPage(1);
//     fetchReportData();
//   };

//   const handleExport = async () => {
//     try {
//       const queryParams = new URLSearchParams({
//         ...(outlet && { outlet }),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//         export: "excel",
//       });

//       const response = await apiFetch(
//         `/api/pos/reports/banquet-tally/export?${queryParams}`,
//         { method: "GET", responseType: "blob" }
//       );

//       const blob = new Blob([response], {
//         type:
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute(
//         "download",
//         `Banquet_Tally_Report_${new Date().toISOString().split("T")[0]}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       alert("Banquet tally report exported successfully!");
//     } catch (error) {
//       console.error("Export error:", error);
//       alert("Failed to export banquet tally report. Please try again.");
//     }
//   };

//   const handlePageChange = (page) => {
//     if (page < 1 || page > Math.ceil(totalRecords / itemsPerPage)) return;
//     setCurrentPage(page);
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(totalRecords / itemsPerPage);

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
//       background: "#fff",
//       borderRadius: "4px",
//       padding: "14px 16px 8px 16px",
//       marginBottom: "8px",
//       display: "flex",
//       gap: "18px",
//       alignItems: "end",
//     },
//     filterLabel: {
//       minWidth: "120px",
//       fontSize: "14px",
//       color: "#333",
//     },
//     filterInput: {
//       padding: "6px 10px",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//       fontSize: "14px",
//       minWidth: "155px",
//     },
//     btnSearch: {
//       backgroundColor: "#1976d2",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       padding: "7px 22px",
//       fontWeight: 500,
//       fontSize: "14px",
//       cursor: "pointer",
//     },
//     btnExport: {
//       backgroundColor: "#43a047",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       padding: "7px 12px",
//       fontSize: "16px",
//       fontWeight: 500,
//       cursor: "pointer",
//       marginLeft: 8,
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
//     },
//     tableHead: {
//       backgroundColor: "#e0e0e0",
//     },
//     th: {
//       padding: "8px 10px",
//       textAlign: "left",
//       fontSize: "14px",
//       fontWeight: 600,
//       color: "#333",
//       borderBottom: "2px solid #ccc",
//       whiteSpace: "nowrap",
//     },
//     td: {
//       padding: "8px 10px",
//       fontSize: "14px",
//       color: "#666",
//       borderBottom: "1px solid #eee",
//       whiteSpace: "nowrap",
//     },
//     noData: {
//       textAlign: "center",
//       padding: "40px",
//       color: "#999",
//     },
//     paginationContainer: {
//       display: "flex",
//       justifyContent: "flex-end",
//       alignItems: "center",
//       backgroundColor: "#fff",
//       padding: "15px 20px",
//       marginTop: "8px",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.09)",
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
//       margin: "0 2px",
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
//       margin: "0 2px",
//     },
//     paginationBtnDisabled: {
//       opacity: 0.5,
//       cursor: "not-allowed",
//     },
//   };

//   return (
//     <div className="container">
//       <PosTopbar />
//       <div style={styles.layout}>
//         <PosSidebar />

//         <div style={styles.page}>
//           <div style={styles.container}>
//             {/* Header */}
//             <div style={styles.pageHeader}>
//               <div style={styles.pageIcon}>📊</div>
//               <span style={styles.pageTitle}>Banquet Tally Report</span>
//             </div>

//             {/* Filter Panel */}
//             <div style={styles.filterPanel}>
//               <div>
//                 <label style={styles.filterLabel}>Outlet Name</label>
//                 <select
//                   style={styles.filterInput}
//                   value={outlet}
//                   onChange={(e) => setOutlet(e.target.value)}
//                 >
//                   <option value="">All Outlets</option>
//                   {outlets.map((o) => (
//                     <option key={o.id} value={o.id}>
//                       {o.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label style={styles.filterLabel}>From Date</label>
//                 <input
//                   type="date"
//                   style={styles.filterInput}
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label style={styles.filterLabel}>To Date</label>
//                 <input
//                   type="date"
//                   style={styles.filterInput}
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                 />
//               </div>

//               <button style={styles.btnSearch} onClick={handleSearch}>
//                 Search
//               </button>
//               <button style={styles.btnExport} onClick={handleExport}>
//                 ⎙ Export
//               </button>
//             </div>

//             {/* Table */}
//             <div style={styles.dataTableContainer}>
//               {loading ? (
//                 <tr>
//                   <td colSpan={15}>
//                     <div style={styles.noData}>Loading...</div>
//                   </td>
//                 </tr>
//               ) : currentItems.length > 0 ? (
//                 <table style={styles.dataTable}>
//                   <thead style={styles.tableHead}>
//                     <tr>
//                       <th style={styles.th}>SNo.</th>
//                       <th style={styles.th}>Bill No.</th>
//                       <th style={styles.th}>CheckOutDate</th>
//                       <th style={styles.th}>BanquetId</th>
//                       <th style={styles.th}>Bill Status</th>
//                       <th style={styles.th}>Department</th>
//                       <th style={styles.th}>Outlet</th>
//                       <th style={styles.th}>FP Number No</th>
//                       <th style={styles.th}>Contact No</th>
//                       <th style={styles.th}>Guest Name</th>
//                       <th style={styles.th}>Guest Address</th>
//                       <th style={styles.th}>Bill To Party Name</th>
//                       <th style={styles.th}>Party Address</th>
//                       <th style={styles.th}>Party State</th>
//                       <th style={styles.th}>Party GSTIN</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems.map((row, idx) => (
//                       <tr key={row.id || idx}>
//                         <td style={styles.td}>
//                           {(currentPage - 1) * itemsPerPage + idx + 1}
//                         </td>
//                         <td style={styles.td}>{row.billNo || "-"}</td>
//                         <td style={styles.td}>{row.checkOutDate || "-"}</td>
//                         <td style={styles.td}>{row.banquetId || "-"}</td>
//                         <td style={styles.td}>{row.billStatus || "-"}</td>
//                         <td style={styles.td}>{row.department || "-"}</td>
//                         <td style={styles.td}>{row.outlet || "-"}</td>
//                         <td style={styles.td}>{row.fpNumberNo || "-"}</td>
//                         <td style={styles.td}>{row.contactNo || "-"}</td>
//                         <td style={styles.td}>{row.guestName || "-"}</td>
//                         <td style={styles.td}>{row.guestAddress || "-"}</td>
//                         <td style={styles.td}>{row.billToPartyName || "-"}</td>
//                         <td style={styles.td}>{row.partyAddress || "-"}</td>
//                         <td style={styles.td}>{row.partyState || "-"}</td>
//                         <td style={styles.td}>{row.partyGSTIN || "-"}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <table style={styles.dataTable}>
//                   <tbody>
//                     <tr>
//                       <td colSpan={15}>
//                         <div style={styles.noData}>No data available</div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               )}
//             </div>

//             {/* Pagination Controls */}
//             {totalRecords > itemsPerPage && (
//               <div style={styles.paginationContainer}>
//                 <button
//                   style={{
//                     ...styles.paginationBtn,
//                     ...(currentPage === 1 ? styles.paginationBtnDisabled : {}),
//                   }}
//                   onClick={() => handlePageChange(1)}
//                   disabled={currentPage === 1}
//                 >
//                   First
//                 </button>
//                 <button
//                   style={{
//                     ...styles.paginationBtn,
//                     ...(currentPage === 1 ? styles.paginationBtnDisabled : {}),
//                   }}
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 >
//                   Previous
//                 </button>
//                 <span style={styles.paginationBtnActive}>{currentPage}</span>
//                 <button
//                   style={{
//                     ...styles.paginationBtn,
//                     ...(currentPage === totalPages
//                       ? styles.paginationBtnDisabled
//                       : {}),
//                   }}
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </button>
//                 <button
//                   style={{
//                     ...styles.paginationBtn,
//                     ...(currentPage === totalPages
//                       ? styles.paginationBtnDisabled
//                       : {}),
//                   }}
//                   onClick={() => handlePageChange(totalPages)}
//                   disabled={currentPage === totalPages}
//                 >
//                   Last
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
