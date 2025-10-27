// src/pages/POS/Banquet/BanquetTallyReport.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";

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
    <div style={styles.layout}>
      <PosSidebar />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>📊</div>
            <span style={styles.pageTitle}>Banquet Tally Report</span>
            <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
            <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
            <span style={styles.headerInfo}>51341 Buser</span>
            <span style={styles.headerInfo}>Today: Oct 07 2025 15:40:09</span>
            <button style={styles.btnAudit}>Audit</button>
            <button style={styles.btnClose}>⚙</button>
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
  );
}
