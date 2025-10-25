// src/pages/POS/Inventory/InventoryStockAdjust.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
export default function InventoryStockAdjust() {
  // State management
  const [selectedDate, setSelectedDate] = useState("10/07/2025");
  const [selectType, setSelectType] = useState("");
  const [adjustmentData, setAdjustmentData] = useState([]);
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
      date: "10/07/2025",
      transactionNo: "ADJ001",
      adjustmentName: "Stock In",
      amount: "5,000.00",
      createdBy: "Admin"
    },
    {
      id: 2,
      date: "10/06/2025",
      transactionNo: "ADJ002",
      adjustmentName: "Stock Out",
      amount: "2,500.00",
      createdBy: "Manager"
    },
    {
      id: 3,
      date: "10/05/2025",
      transactionNo: "ADJ003",
      adjustmentName: "Damage",
      amount: "1,200.00",
      createdBy: "Supervisor"
    },
    {
      id: 4,
      date: "10/04/2025",
      transactionNo: "ADJ004",
      adjustmentName: "Adjustment",
      amount: "3,800.00",
      createdBy: "Admin"
    },
    {
      id: 5,
      date: "10/03/2025",
      transactionNo: "ADJ005",
      adjustmentName: "Stock In",
      amount: "7,500.00",
      createdBy: "Manager"
    },
    {
      id: 6,
      date: "10/02/2025",
      transactionNo: "ADJ006",
      adjustmentName: "Stock Out",
      amount: "4,200.00",
      createdBy: "Supervisor"
    },
    {
      id: 7,
      date: "10/01/2025",
      transactionNo: "ADJ007",
      adjustmentName: "Damage",
      amount: "800.00",
      createdBy: "Admin"
    },
    {
      id: 8,
      date: "09/30/2025",
      transactionNo: "ADJ008",
      adjustmentName: "Adjustment",
      amount: "2,100.00",
      createdBy: "Manager"
    }
  ];

  // Adjustment types for dropdown
  const adjustmentTypes = [
    "Stock In",
    "Stock Out",
    "Damage",
    "Adjustment",
    "Return",
    "Transfer"
  ];

  // Load data on mount
  useEffect(() => {
    loadAdjustmentData();
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

  const loadAdjustmentData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAdjustmentData(mockData);
      setFilteredData(mockData);
    } catch (error) {
      console.error("Failed to load adjustment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = [...adjustmentData];

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(item => item.date === selectedDate);
    }

    // Filter by type
    if (selectType) {
      filtered = filtered.filter(item => item.adjustmentName === selectType);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleAddStockAdjustment = () => {
    console.log("Add Stock Adjustment clicked");
    // Navigate to add page or open modal
  };

  const handleAction = (row, actionType) => {
    console.log(`${actionType} action for:`, row);
    // Implement view, edit, delete actions
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
    searchFilters: {
      backgroundColor: '#fff',
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    filterRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 0.8fr',
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
      width: '100%',
      backgroundColor: '#fff'
    },
    selectWithClear: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    clearBtn: {
      position: 'absolute',
      right: '30px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#999',
      padding: '0 5px'
    },
    btnSearch: {
      padding: '8px 20px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      width: '100%',
      marginTop: '20px'
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
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    actionBtn: {
      padding: '6px 12px',
      backgroundColor: 'transparent',
      border: '1px solid #1976d2',
      color: '#1976d2',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px'
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
              <h2 style={styles.pageTitle}>Stock Adjustment Details</h2>
            </div>
            <div style={styles.headerRight}>
              <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
              <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
              <span style={styles.headerInfo}>$1341 Buser</span>
              <span style={styles.headerInfo}>Today: Oct 07 2025 13:27:19</span>
              <button style={styles.btnAudit}>Audit</button>
              <button style={styles.btnClose}>⚙</button>
            </div>
          </div>

          {/* Add Button */}
          <div style={styles.actionBar}>
            <button style={styles.btnAdd} onClick={handleAddStockAdjustment}>
              Add Stock Adjustment
            </button>
          </div>

          {/* Search Filters */}
          <div style={styles.searchFilters}>
            <div style={styles.filterRow}>
              <div style={styles.filterItem}>
                <label style={styles.label}>Date</label>
                <input 
                  type="text" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={styles.formInput}
                  placeholder="10/07/2025"
                />
              </div>
              
              <div style={styles.filterItem}>
                <label style={styles.label}>Select</label>
                <div style={styles.selectWithClear}>
                  <select 
                    value={selectType}
                    onChange={(e) => setSelectType(e.target.value)}
                    style={styles.formSelect}
                  >
                    <option value="">Select</option>
                    {adjustmentTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                  {selectType && (
                    <button 
                      style={styles.clearBtn}
                      onClick={() => setSelectType("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
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
                    <th style={styles.th}>Transaction No.</th>
                    <th style={styles.th}>AdjustmentName</th>
                    <th style={styles.th}>Amount</th>
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
                        <td style={styles.td}>{row.adjustmentName}</td>
                        <td style={styles.td}>{row.amount}</td>
                        <td style={styles.td}>{row.createdBy}</td>
                        <td style={styles.td}>
                          <div style={styles.actionButtons}>
                            <button 
                              style={styles.actionBtn}
                              onClick={() => handleAction(row, 'view')}
                              title="View"
                            >
                              👁️
                            </button>
                            <button 
                              style={styles.actionBtn}
                              onClick={() => handleAction(row, 'edit')}
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button 
                              style={styles.actionBtn}
                              onClick={() => handleAction(row, 'delete')}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
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
