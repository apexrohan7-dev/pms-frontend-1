// src/pages/POS/Inventory/InventoryIndent.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
export default function InventoryIndent() {
  // State management
  const [department, setDepartment] = useState("");
  const [fromDate, setFromDate] = useState("10/07/2025");
  const [toDate, setToDate] = useState("10/07/2025");
  const [indentNo, setIndentNo] = useState("");
  const [indentData, setIndentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  
  // Sidebar state - automatically syncs with PosSidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data
  const mockData = [
    {
      id: 1,
      indentNo: "IND001",
      department: "Production",
      date: "10/07/2025",
      remark: "Urgent requirement",
      status: "Pending"
    },
    {
      id: 2,
      indentNo: "IND002",
      department: "Assembly",
      date: "10/07/2025",
      remark: "Regular stock",
      status: "Approved"
    },
    {
      id: 3,
      indentNo: "IND003",
      department: "Warehouse",
      date: "10/08/2025",
      remark: "Maintenance items",
      status: "Pending"
    },
    {
      id: 4,
      indentNo: "IND004",
      department: "Production",
      date: "10/08/2025",
      remark: "Production supplies",
      status: "Completed"
    },
    {
      id: 5,
      indentNo: "IND005",
      department: "Assembly",
      date: "10/09/2025",
      remark: "Assembly parts",
      status: "Pending"
    },
    {
      id: 6,
      indentNo: "IND006",
      department: "Storage",
      date: "10/09/2025",
      remark: "Storage materials",
      status: "Approved"
    },
    {
      id: 7,
      indentNo: "IND007",
      department: "Production",
      date: "10/10/2025",
      remark: "Emergency indent",
      status: "Pending"
    },
    {
      id: 8,
      indentNo: "IND008",
      department: "Warehouse",
      date: "10/10/2025",
      remark: "Stock replenishment",
      status: "Completed"
    }
  ];

  // Load data on mount
  useEffect(() => {
    loadIndentData();
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

  const loadIndentData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIndentData(mockData);
      setFilteredData(mockData);
    } catch (error) {
      console.error("Failed to load indent data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = [...indentData];

    if (department) {
      filtered = filtered.filter(item => 
        item.department.toLowerCase() === department.toLowerCase()
      );
    }

    if (indentNo) {
      filtered = filtered.filter(item => 
        item.indentNo.toLowerCase().includes(indentNo.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleShowReport = () => {
    console.log("Show Report clicked");
  };

  const handlePrintIndent = () => {
    console.log("Print Indent clicked");
  };

  const handleExportTo = () => {
    console.log("Export To clicked");
  };

  const handleAddIndent = () => {
    console.log("Add Indent clicked");
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    btnAddIndent: {
      padding: '10px 20px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500
    },
    searchFilters: {
      backgroundColor: '#fff',
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    filterRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 0.8fr',
      gap: '15px',
      alignItems: 'end'
    },
    filterItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
    label: {
      fontSize: '13px',
      fontWeight: 500,
      color: '#666',
      marginBottom: '5px'
    },
    formInput: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      outline: 'none',
      width: '100%'
    },
    formSelect: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      outline: 'none',
      width: '100%'
    },
    btnGroup: {
      display: 'flex',
      gap: '10px'
    },
    btnShowReport: {
      padding: '8px 16px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 500
    },
    btnPrint: {
      padding: '8px 16px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 500
    },
    btnExport: {
      padding: '8px 16px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
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
    <div style={styles.layout}>
      <PosSidebar />

      <div style={styles.page}>
        <div style={styles.container}>
          {/* Header Section */}
          <div style={styles.pageHeader}>
            <div style={styles.headerLeft}>
              <div style={styles.pageIcon}>📋</div>
              <h2 style={styles.pageTitle}>Indent Details</h2>
            </div>
            <div style={styles.headerRight}>
              <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
              <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
              <span style={styles.headerInfo}>$1341 Buser</span>
              <span style={styles.headerInfo}>Today: Oct 07 2025 13:14:07</span>
              <button style={styles.btnAudit}>Audit</button>
              <button style={styles.btnClose}>⚙</button>
            </div>
          </div>

          {/* Add Button */}
          <div style={styles.actionBar}>
            <button style={styles.btnAddIndent} onClick={handleAddIndent}>
              Add Indent
            </button>
          </div>

          {/* Search Filters */}
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
                  type="text" 
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={styles.formInput}
                />
              </div>
              
              <div style={styles.filterItem}>
                <label style={styles.label}>To Date</label>
                <input 
                  type="text" 
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
                  style={styles.formInput}
                  placeholder="Enter indent number"
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
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            backgroundColor: row.status === 'Completed' ? '#d4edda' : 
                                            row.status === 'Approved' ? '#cfe2ff' : '#fff3cd',
                            color: row.status === 'Completed' ? '#155724' : 
                                   row.status === 'Approved' ? '#084298' : '#856404'
                          }}>
                            {row.status}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <button 
                            style={{
                              padding: '6px 12px',
                              backgroundColor: 'transparent',
                              color: '#1976d2',
                              border: '1px solid #1976d2',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '13px'
                            }}
                            onClick={() => console.log('View', row)}
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
  );
}
