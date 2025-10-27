// src/pages/POS/Banquet/BanquetBookingDeatail.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";

export default function BanquetBookingDeatail() {
  const [venue, setVenue] = useState("");
  const [functionFrom, setFunctionFrom] = useState("");
  const [functionTo, setFunctionTo] = useState("");
  const [handledBy, setHandledBy] = useState("");
  const [status, setStatus] = useState("All");
  const [fpNo, setFpNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Example/mock data for visual
  const mockData = [
    // {
    //   select: false,
    //   fpNo: "FP001",
    //   customerName: "John Smith",
    //   mobileNo: "9876543210",
    //   fromDate: "10/07/2025",
    //   toDate: "10/07/2025",
    //   toTime: "23:00",
    //   pax: 100,
    //   rate: 400,
    //   taxAmount: 5000,
    //   netAmount: 45000,
    //   billNo: "BNK0100",
    //   type: "Wedding",
    //   action: ""
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
      setReportData([]); // use mockData (with real rows) as needed
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setReportData([]); // filter logic can be added here
    setCurrentPage(1);
  };

  const handleNewBooking = () => {
    alert("New Booking function (placeholder)");
  };

  // Pagination calculation
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
      padding: '12px 12px 6px 12px',
      marginBottom: '8px'
    },
    filterRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px 16px",
      alignItems: "center",
      marginBottom: "8px"
    },
    filterInput: {
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      minWidth: '160px'
    },
    btn: {
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '7px 17px',
      fontWeight: 500,
      fontSize: '14px',
      cursor: 'pointer',
      marginLeft: 6
    },
    btnNewBooking: {
      backgroundColor: '#43a047',
      marginLeft: 10,
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '7px 17px',
      fontWeight: 500,
      fontSize: '14px',
      cursor: 'pointer'
    },
    dataTableContainer: {
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'auto',
      marginTop: '12px',
      minHeight: '280px'
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
    <div style={styles.layout}>
      <PosSidebar />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>🏢</div>
            <span style={styles.pageTitle}>Banquet Booking Report</span>
            <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
            <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
            <span style={styles.headerInfo}>51341 Buser</span>
            <span style={styles.headerInfo}>Today: Oct 07 2025 15:15:31</span>
            <button style={styles.btnAudit}>Audit</button>
            <button style={styles.btnClose}>⚙</button>
          </div>
          {/* Filter Form */}
          <div style={styles.filterPanel}>
            <div style={styles.filterRow}>
              <select style={styles.filterInput} value={venue} onChange={e => setVenue(e.target.value)}>
                <option value="">select option</option>
              </select>
              <input type="date" style={styles.filterInput} value={functionFrom} onChange={e => setFunctionFrom(e.target.value)} />
              <input type="date" style={styles.filterInput} value={functionTo} onChange={e => setFunctionTo(e.target.value)} />
              <select style={styles.filterInput} value={handledBy} onChange={e => setHandledBy(e.target.value)}>
                <option value="">select option</option>
              </select>
              <select style={styles.filterInput} value={status} onChange={e => setStatus(e.target.value)}>
                <option value="All">All</option>
                {/* Add other statuses here */}
              </select>
              <input
                type="text"
                placeholder="FP No/Bill No"
                style={styles.filterInput}
                value={fpNo}
                onChange={e => setFpNo(e.target.value)}
              />
            </div>
            <div style={styles.filterRow}>
              <input
                type="text"
                style={styles.filterInput}
                placeholder="Customer Name"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
              />
              <input
                type="text"
                style={styles.filterInput}
                placeholder="Mobile No."
                value={mobileNo}
                onChange={e => setMobileNo(e.target.value)}
              />
              <button style={styles.btn} onClick={handleSearch}>Show</button>
              <button style={styles.btnNewBooking} onClick={handleNewBooking}>New Booking</button>
            </div>
          </div>
          {/* Data Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Select</th>
                  <th style={styles.th}>FP No</th>
                  <th style={styles.th}>Customer Name</th>
                  <th style={styles.th}>Mobile No</th>
                  <th style={styles.th}>From Date</th>
                  <th style={styles.th}>To Date</th>
                  <th style={styles.th}>To Time</th>
                  <th style={styles.th}>Pax(A/C)</th>
                  <th style={styles.th}>Rate(A/C)</th>
                  <th style={styles.th}>Tax Amount</th>
                  <th style={styles.th}>Net Amount</th>
                  <th style={styles.th}>Bill No</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={14}><div style={styles.noData}>Loading...</div></td></tr>
                ) : currentItems.length > 0 ? (
                  currentItems.map((row, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}><input type="checkbox" checked={row.select} readOnly /></td>
                      <td style={styles.td}>{row.fpNo}</td>
                      <td style={styles.td}>{row.customerName}</td>
                      <td style={styles.td}>{row.mobileNo}</td>
                      <td style={styles.td}>{row.fromDate}</td>
                      <td style={styles.td}>{row.toDate}</td>
                      <td style={styles.td}>{row.toTime}</td>
                      <td style={styles.td}>{row.pax}</td>
                      <td style={styles.td}>{row.rate}</td>
                      <td style={styles.td}>{row.taxAmount}</td>
                      <td style={styles.td}>{row.netAmount}</td>
                      <td style={styles.td}>{row.billNo}</td>
                      <td style={styles.td}>{row.type}</td>
                      <td style={styles.td}>{row.action}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={14}>
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
  );
}
