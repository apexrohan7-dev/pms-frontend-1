import React, { useState, useEffect, useMemo, useCallback } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";
import { apiFetch } from "../../../lib/api";
import "../../../assets/css/commanPage.css";

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  page: (sidebarCollapsed) => ({
    flexGrow: 1,
    marginLeft: sidebarCollapsed ? "60px" : "240px",
    transition: "margin-left 0.3s ease",
    padding: 0,
  }),
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
    display: "flex",
    justifyContent: "flex-end",
  },
  btnAdd: {
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
    gridTemplateColumns: "1fr 2fr 0.8fr",
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
    backgroundColor: "#fff",
  },
  selectWithClear: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  clearBtn: {
    position: "absolute",
    right: "30px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#999",
    padding: "0 5px",
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
    backgroundColor: "#e0e0e0",
  },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: 600,
    color: "#333",
    borderBottom: "2px solid #ccc",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#666",
    borderBottom: "1px solid #eee",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  actionBtn: {
    padding: "6px 12px",
    backgroundColor: "transparent",
    border: "1px solid #1976d2",
    color: "#1976d2",
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

const mockData = [
  { id: 1, date: "2025-10-07", transactionNo: "ADJ001", adjustmentName: "Stock In", amount: "5,000.00", createdBy: "Admin" },
  { id: 2, date: "2025-10-06", transactionNo: "ADJ002", adjustmentName: "Stock Out", amount: "2,500.00", createdBy: "Manager" },
  { id: 3, date: "2025-10-05", transactionNo: "ADJ003", adjustmentName: "Damage", amount: "1,200.00", createdBy: "Supervisor" },
  { id: 4, date: "2025-10-04", transactionNo: "ADJ004", adjustmentName: "Adjustment", amount: "3,800.00", createdBy: "Admin" },
  { id: 5, date: "2025-10-03", transactionNo: "ADJ005", adjustmentName: "Stock In", amount: "7,500.00", createdBy: "Manager" },
  { id: 6, date: "2025-10-02", transactionNo: "ADJ006", adjustmentName: "Stock Out", amount: "4,200.00", createdBy: "Supervisor" },
  { id: 7, date: "2025-10-01", transactionNo: "ADJ007", adjustmentName: "Damage", amount: "800.00", createdBy: "Admin" },
  { id: 8, date: "2025-09-30", transactionNo: "ADJ008", adjustmentName: "Adjustment", amount: "2,100.00", createdBy: "Manager" },
];

const adjustmentTypes = ["Stock In", "Stock Out", "Damage", "Adjustment", "Return", "Transfer"];

export default function InventoryStockAdjust() {
  const [selectedDate, setSelectedDate] = useState("2025-10-07");
  const [selectType, setSelectType] = useState("");
  const [adjustmentData, setAdjustmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadAdjustmentData = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setAdjustmentData(mockData);
      } catch (error) {
        console.error("Failed to load adjustment data:", error);
        setAdjustmentData([]);
      } finally {
        setLoading(false);
      }
    };
    loadAdjustmentData();
  }, []);

  // Sync sidebar collapse
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
      observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
    }
    return () => observer.disconnect();
  }, []);

  // Memoized filtered data based on selectedDate and selectType
  const filteredData = useMemo(() => {
    return adjustmentData.filter((item) => {
      return (
        (!selectedDate || item.date === selectedDate) &&
        (!selectType || item.adjustmentName === selectType)
      );
    });
  }, [adjustmentData, selectedDate, selectType]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleAddStockAdjustment = useCallback(() => {
    console.log("Add Stock Adjustment clicked");
    // Implement navigation or modal here
  }, []);

  const handleAction = useCallback((row, actionType) => {
    console.log(`${actionType} action for:`, row);
    // Implement view/edit/delete actions here
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <div style={styles.layout}>
      <PosSidebar />
      <div style={styles.page(sidebarCollapsed)}>
        <PosTopbar />
        <div style={styles.container}>
          {/* Header Section */}
          <div style={styles.pageHeader}>
            <div style={styles.headerLeft}>
              <div style={styles.pageIcon}>📋</div>
              <h2 style={styles.pageTitle}>Stock Adjustment Details</h2>
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
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={styles.formInput}
                  placeholder="2025-10-07"
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
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {selectType && (
                    <button
                      style={styles.clearBtn}
                      onClick={() => setSelectType("")}
                      aria-label="Clear selection"
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
                    <th style={styles.th}>Adjustment Name</th>
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
                              onClick={() => handleAction(row, "view")}
                              title="View"
                            >
                              👁️
                            </button>
                            <button
                              style={styles.actionBtn}
                              onClick={() => handleAction(row, "edit")}
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              style={styles.actionBtn}
                              onClick={() => handleAction(row, "delete")}
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
                  {[5, 10, 25, 50, 100].map((count) => (
                    <option key={count} value={count}>
                      {count} per page
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.paginationCenter}>
                <span>
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
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


// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";
// import "../../../assets/css/commanPage.css";

// const styles = {
//   layout: {
//     display: "flex",
//     minHeight: "100vh",
//     backgroundColor: "#f5f5f5",
//   },
//   page: (sidebarCollapsed) => ({
//     flexGrow: 1,
//     marginLeft: sidebarCollapsed ? "60px" : "240px",
//     transition: "margin-left 0.3s ease",
//     padding: 0,
//   }),
//   container: {
//     padding: "20px",
//     backgroundColor: "#f5f5f5",
//     minHeight: "100vh",
//   },
//   pageHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: "15px 20px",
//     marginBottom: "20px",
//     borderRadius: "5px",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//   },
//   headerLeft: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//   },
//   pageIcon: {
//     width: "40px",
//     height: "40px",
//     backgroundColor: "#f0f0f0",
//     borderRadius: "5px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "20px",
//   },
//   pageTitle: {
//     margin: 0,
//     fontSize: "20px",
//     fontWeight: 600,
//     color: "#333",
//   },
//   actionBar: {
//     marginBottom: "20px",
//     display: "flex",
//     justifyContent: "flex-end",
//   },
//   btnAdd: {
//     padding: "10px 20px",
//     backgroundColor: "#1976d2",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: 500,
//   },
//   searchFilters: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     marginBottom: "20px",
//     borderRadius: "5px",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//   },
//   filterRow: {
//     display: "grid",
//     gridTemplateColumns: "1fr 2fr 0.8fr",
//     gap: "15px",
//     alignItems: "end",
//   },
//   filterItem: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "5px",
//   },
//   label: {
//     fontSize: "13px",
//     fontWeight: 500,
//     color: "#666",
//     marginBottom: "5px",
//   },
//   formInput: {
//     padding: "8px 12px",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     fontSize: "14px",
//     outline: "none",
//     width: "100%",
//   },
//   formSelect: {
//     padding: "8px 12px",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     fontSize: "14px",
//     outline: "none",
//     width: "100%",
//     backgroundColor: "#fff",
//   },
//   selectWithClear: {
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//   },
//   clearBtn: {
//     position: "absolute",
//     right: "30px",
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "14px",
//     color: "#999",
//     padding: "0 5px",
//   },
//   btnSearch: {
//     padding: "8px 20px",
//     backgroundColor: "#1976d2",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: 500,
//     width: "100%",
//     marginTop: "20px",
//   },
//   dataTableContainer: {
//     backgroundColor: "#fff",
//     borderRadius: "5px",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     overflow: "hidden",
//   },
//   dataTable: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   tableHead: {
//     backgroundColor: "#e0e0e0",
//   },
//   th: {
//     padding: "12px 16px",
//     textAlign: "left",
//     fontSize: "14px",
//     fontWeight: 600,
//     color: "#333",
//     borderBottom: "2px solid #ccc",
//   },
//   td: {
//     padding: "12px 16px",
//     fontSize: "14px",
//     color: "#666",
//     borderBottom: "1px solid #eee",
//   },
//   actionButtons: {
//     display: "flex",
//     gap: "8px",
//   },
//   actionBtn: {
//     padding: "6px 12px",
//     backgroundColor: "transparent",
//     border: "1px solid #1976d2",
//     color: "#1976d2",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "13px",
//   },
//   loadingContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "60px",
//     color: "#666",
//   },
//   spinner: {
//     width: "40px",
//     height: "40px",
//     border: "4px solid #f3f3f3",
//     borderTop: "4px solid #1976d2",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//     marginBottom: "15px",
//   },
//   noData: {
//     textAlign: "center",
//     padding: "40px",
//     color: "#999",
//   },
//   errorContainer: {
//     backgroundColor: "#fff",
//     borderRadius: "5px",
//     padding: "40px",
//     textAlign: "center",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     marginBottom: "20px",
//   },
//   errorIcon: {
//     fontSize: "48px",
//     marginBottom: "15px",
//   },
//   errorTitle: {
//     fontSize: "20px",
//     fontWeight: 600,
//     color: "#d32f2f",
//     marginBottom: "10px",
//   },
//   errorMessage: {
//     fontSize: "14px",
//     color: "#666",
//     marginBottom: "20px",
//   },
//   btnRetry: {
//     padding: "10px 20px",
//     backgroundColor: "#1976d2",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: 500,
//   },
//   paginationContainer: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: "15px 20px",
//     marginTop: "20px",
//     borderRadius: "5px",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     flexWrap: "wrap",
//     gap: "15px",
//   },
//   paginationLeft: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//   },
//   paginationSelect: {
//     padding: "6px 10px",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     fontSize: "13px",
//     outline: "none",
//   },
//   paginationCenter: {
//     fontSize: "13px",
//     color: "#666",
//   },
//   paginationRight: {
//     display: "flex",
//     gap: "5px",
//   },
//   paginationBtn: {
//     padding: "6px 12px",
//     backgroundColor: "#fff",
//     color: "#666",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "13px",
//     minWidth: "35px",
//   },
//   paginationBtnActive: {
//     padding: "6px 12px",
//     backgroundColor: "#1976d2",
//     color: "white",
//     border: "1px solid #1976d2",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "13px",
//     minWidth: "35px",
//   },
//   paginationBtnDisabled: {
//     padding: "6px 12px",
//     backgroundColor: "#fff",
//     color: "#666",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     cursor: "not-allowed",
//     fontSize: "13px",
//     minWidth: "35px",
//     opacity: 0.5,
//   },
// };

// export default function InventoryStockAdjust() {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectType, setSelectType] = useState("");
//   const [adjustmentData, setAdjustmentData] = useState([]);
//   const [adjustmentTypes, setAdjustmentTypes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Fetch adjustment types on mount
//   useEffect(() => {
//     const fetchAdjustmentTypes = async () => {
//       try {
//         const response = await apiFetch("/api/inventory/adjustment-types", {
//           method: "GET",
//         });

//         if (response.success) {
//           setAdjustmentTypes(response.data || []);
//         }
//       } catch (err) {
//         console.error("Failed to load adjustment types:", err);
//         // Fallback to default types
//         setAdjustmentTypes([
//           "Stock In",
//           "Stock Out",
//           "Damage",
//           "Adjustment",
//           "Return",
//           "Transfer",
//         ]);
//       }
//     };

//     fetchAdjustmentTypes();
//   }, []);

//   // Fetch adjustment data from API
//   const fetchAdjustmentData = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: itemsPerPage,
//         ...(selectedDate && { date: selectedDate }),
//         ...(selectType && { type: selectType }),
//       });

//       const response = await apiFetch(
//         `/api/inventory/stock-adjustments?${queryParams}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         setAdjustmentData(response.data.adjustments || []);
//         setTotalRecords(response.data.total || 0);
//       } else {
//         throw new Error(response.message || "Failed to fetch data");
//       }
//     } catch (err) {
//       console.error("Failed to load adjustment data:", err);
//       setError(err.message || "Failed to load adjustment data");
//       setAdjustmentData([]);
//       setTotalRecords(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, selectedDate, selectType]);

//   // Load initial data
//   useEffect(() => {
//     fetchAdjustmentData();
//   }, [fetchAdjustmentData]);

//   // Sync sidebar collapse
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
//     fetchAdjustmentData();
//   }, [fetchAdjustmentData]);

//   // Handle add stock adjustment
//   const handleAddStockAdjustment = useCallback(() => {
//     // Navigate to add page or open modal
//     console.log("Add Stock Adjustment clicked");
//     // Example: navigate("/inventory/stock-adjustment/add");
//   }, []);

//   // Handle view action
//   const handleView = useCallback(async (row) => {
//     try {
//       const response = await apiFetch(
//         `/api/inventory/stock-adjustments/${row.id}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         console.log("View details:", response.data);
//         // Navigate to view page or open modal with details
//         // Example: navigate(`/inventory/stock-adjustment/view/${row.id}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch adjustment details:", err);
//       alert("Failed to load adjustment details");
//     }
//   }, []);

//   // Handle edit action
//   const handleEdit = useCallback(async (row) => {
//     try {
//       const response = await apiFetch(
//         `/api/inventory/stock-adjustments/${row.id}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         console.log("Edit data:", response.data);
//         // Navigate to edit page with data
//         // Example: navigate(`/inventory/stock-adjustment/edit/${row.id}`, { state: response.data });
//       }
//     } catch (err) {
//       console.error("Failed to fetch adjustment for editing:", err);
//       alert("Failed to load adjustment data");
//     }
//   }, []);

//   // Handle delete action
//   const handleDelete = useCallback(
//     async (row) => {
//       if (
//         !window.confirm(
//           `Are you sure you want to delete adjustment ${row.transactionNo}?`
//         )
//       ) {
//         return;
//       }

//       try {
//         const response = await apiFetch(
//           `/api/inventory/stock-adjustments/${row.id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (response.success) {
//           alert("Adjustment deleted successfully");
//           // Refresh data
//           fetchAdjustmentData();
//         } else {
//           throw new Error(response.message || "Failed to delete adjustment");
//         }
//       } catch (err) {
//         console.error("Failed to delete adjustment:", err);
//         alert(err.message || "Failed to delete adjustment");
//       }
//     },
//     [fetchAdjustmentData]
//   );

//   // Handle action
//   const handleAction = useCallback(
//     (row, actionType) => {
//       switch (actionType) {
//         case "view":
//           handleView(row);
//           break;
//         case "edit":
//           handleEdit(row);
//           break;
//         case "delete":
//           handleDelete(row);
//           break;
//         default:
//           console.log(`Unknown action: ${actionType}`);
//       }
//     },
//     [handleView, handleEdit, handleDelete]
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

//   // Pagination calculations
//   const totalPages = Math.ceil(totalRecords / itemsPerPage);

//   // Retry handler
//   const handleRetry = useCallback(() => {
//     fetchAdjustmentData();
//   }, [fetchAdjustmentData]);

//   // Render error state
//   if (error && !loading) {
//     return (
//       <div style={styles.layout}>
//         <PosSidebar />
//         <div style={styles.page(sidebarCollapsed)}>
//           <PosTopbar />
//           <div style={styles.container}>
//             <div style={styles.pageHeader}>
//               <div style={styles.headerLeft}>
//                 <div style={styles.pageIcon}>📋</div>
//                 <h2 style={styles.pageTitle}>Stock Adjustment Details</h2>
//               </div>
//             </div>

//             <div style={styles.errorContainer}>
//               <div style={styles.errorIcon}>⚠️</div>
//               <h3 style={styles.errorTitle}>Error Loading Data</h3>
//               <p style={styles.errorMessage}>{error}</p>
//               <button style={styles.btnRetry} onClick={handleRetry}>
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.layout}>
//       <PosSidebar />
//       <div style={styles.page(sidebarCollapsed)}>
//         <PosTopbar />
//         <div style={styles.container}>
//           {/* Header Section */}
//           <div style={styles.pageHeader}>
//             <div style={styles.headerLeft}>
//               <div style={styles.pageIcon}>📋</div>
//               <h2 style={styles.pageTitle}>Stock Adjustment Details</h2>
//             </div>
//           </div>

//           {/* Add Button */}
//           <div style={styles.actionBar}>
//             <button style={styles.btnAdd} onClick={handleAddStockAdjustment}>
//               Add Stock Adjustment
//             </button>
//           </div>

//           {/* Search Filters */}
//           <div style={styles.searchFilters}>
//             <div style={styles.filterRow}>
//               <div style={styles.filterItem}>
//                 <label style={styles.label}>Date</label>
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   style={styles.formInput}
//                 />
//               </div>

//               <div style={styles.filterItem}>
//                 <label style={styles.label}>Adjustment Type</label>
//                 <div style={styles.selectWithClear}>
//                   <select
//                     value={selectType}
//                     onChange={(e) => setSelectType(e.target.value)}
//                     style={styles.formSelect}
//                   >
//                     <option value="">All Types</option>
//                     {adjustmentTypes.map((type, index) => (
//                       <option key={index} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </select>
//                   {selectType && (
//                     <button
//                       style={styles.clearBtn}
//                       onClick={() => setSelectType("")}
//                       aria-label="Clear selection"
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div style={styles.filterItem}>
//                 <button
//                   style={styles.btnSearch}
//                   onClick={handleSearch}
//                   disabled={loading}
//                 >
//                   {loading ? "Searching..." : "Search"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Data Table */}
//           <div style={styles.dataTableContainer}>
//             {loading ? (
//               <div style={styles.loadingContainer}>
//                 <div style={styles.spinner}></div>
//                 <p>Loading adjustment data...</p>
//               </div>
//             ) : (
//               <table style={styles.dataTable}>
//                 <thead style={styles.tableHead}>
//                   <tr>
//                     <th style={styles.th}>Date</th>
//                     <th style={styles.th}>Transaction No.</th>
//                     <th style={styles.th}>Adjustment Name</th>
//                     <th style={styles.th}>Amount</th>
//                     <th style={styles.th}>Created By</th>
//                     <th style={styles.th}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {adjustmentData.length > 0 ? (
//                     adjustmentData.map((row) => (
//                       <tr key={row.id}>
//                         <td style={styles.td}>{row.date}</td>
//                         <td style={styles.td}>{row.transactionNo}</td>
//                         <td style={styles.td}>{row.adjustmentName}</td>
//                         <td style={styles.td}>
//                           {typeof row.amount === "number"
//                             ? `₹${row.amount.toFixed(2)}`
//                             : row.amount}
//                         </td>
//                         <td style={styles.td}>{row.createdBy}</td>
//                         <td style={styles.td}>
//                           <div style={styles.actionButtons}>
//                             <button
//                               style={styles.actionBtn}
//                               onClick={() => handleAction(row, "view")}
//                               title="View"
//                             >
//                               👁️
//                             </button>
//                             <button
//                               style={styles.actionBtn}
//                               onClick={() => handleAction(row, "edit")}
//                               title="Edit"
//                             >
//                               ✏️
//                             </button>
//                             <button
//                               style={styles.actionBtn}
//                               onClick={() => handleAction(row, "delete")}
//                               title="Delete"
//                             >
//                               🗑️
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" style={styles.noData}>
//                         No adjustment records found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             )}
//           </div>

//           {/* Pagination Controls */}
//           {totalRecords > 0 && (
//             <div style={styles.paginationContainer}>
//               <div style={styles.paginationLeft}>
//                 <label style={styles.label}>Items per page</label>
//                 <select
//                   value={itemsPerPage}
//                   onChange={(e) =>
//                     handleItemsPerPageChange(Number(e.target.value))
//                   }
//                   style={styles.paginationSelect}
//                   disabled={loading}
//                 >
//                   {[5, 10, 25, 50, 100].map((count) => (
//                     <option key={count} value={count}>
//                       {count} per page
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.paginationCenter}>
//                 <span>
//                   Showing{" "}
//                   {Math.min((currentPage - 1) * itemsPerPage + 1, totalRecords)}{" "}
//                   to {Math.min(currentPage * itemsPerPage, totalRecords)} of{" "}
//                   {totalRecords} entries
//                 </span>
//               </div>

//               <div style={styles.paginationRight}>
//                 <button
//                   style={
//                     currentPage === 1
//                       ? styles.paginationBtnDisabled
//                       : styles.paginationBtn
//                   }
//                   onClick={() => handlePageChange(1)}
//                   disabled={currentPage === 1 || loading}
//                 >
//                   ««
//                 </button>
//                 <button
//                   style={
//                     currentPage === 1
//                       ? styles.paginationBtnDisabled
//                       : styles.paginationBtn
//                   }
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1 || loading}
//                 >
//                   ‹
//                 </button>

//                 {[...Array(totalPages)].map((_, i) => {
//                   const pageNum = i + 1;
//                   // Show first, last, current, and 2 pages around current
//                   if (
//                     pageNum === 1 ||
//                     pageNum === totalPages ||
//                     (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
//                   ) {
//                     return (
//                       <button
//                         key={pageNum}
//                         style={
//                           currentPage === pageNum
//                             ? styles.paginationBtnActive
//                             : styles.paginationBtn
//                         }
//                         onClick={() => handlePageChange(pageNum)}
//                         disabled={loading}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   } else if (
//                     pageNum === currentPage - 3 ||
//                     pageNum === currentPage + 3
//                   ) {
//                     return <span key={pageNum}>...</span>;
//                   }
//                   return null;
//                 })}

//                 <button
//                   style={
//                     currentPage === totalPages
//                       ? styles.paginationBtnDisabled
//                       : styles.paginationBtn
//                   }
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages || loading}
//                 >
//                   ›
//                 </button>
//                 <button
//                   style={
//                     currentPage === totalPages
//                       ? styles.paginationBtnDisabled
//                       : styles.paginationBtn
//                   }
//                   onClick={() => handlePageChange(totalPages)}
//                   disabled={currentPage === totalPages || loading}
//                 >
//                   »»
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         table tbody tr:hover {
//           background-color: #f9f9f9;
//         }
//         button:hover:not(:disabled) {
//           opacity: 0.9;
//         }
//         button:disabled {
//           cursor: not-allowed;
//         }
//       `}</style>
//     </div>
//   );
// }
