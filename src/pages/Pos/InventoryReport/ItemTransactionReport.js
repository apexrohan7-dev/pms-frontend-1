// src/pages/POS/InventoryReport/ItemTransactionReport.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function ItemTransactionReport() {
  // Filters and controls
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [department, setDepartment] = useState("");
  const [item, setItem] = useState("");
  const [issueNo, setIssueNo] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [userName, setUserName] = useState("");
  const [reportType, setReportType] = useState("detail");
  
  // Data
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data structure
  const mockData = [
    {
      date: "10/07/2025",
      department: "Kitchen",
      category: "Food",
      subCategory: "Masala",
      hsnCode: "0909",
      item: "Hing Powder",
      unit: "Kg",
      qty: 2,
      rate: 250,
      amount: 500,
      itemRemark: "Std Issue",
      userName: "Buser"
    },
    {
      date: "10/07/2025",
      department: "Food Court",
      category: "Snacks",
      subCategory: "Namkeen",
      hsnCode: "1007",
      item: "SHEV BHUJA",
      unit: "Kg",
      qty: 3,
      rate: 70,
      amount: 210,
      itemRemark: "",
      userName: "Buser"
    }
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
      await new Promise(resolve => setTimeout(resolve, 300));
      setReportData(mockData);
      setFilteredData(mockData);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  // Table column list (you can update as per API response)
  const columns = [
    { key: "date", label: "Date" },
    { key: "department", label: "Department" },
    { key: "category", label: "Category" },
    { key: "subCategory", label: "Sub Category" },
    { key: "hsnCode", label: "HSN Code" },
    { key: "item", label: "Item" },
    { key: "unit", label: "Unit" },
    { key: "qty", label: "Qty" },
    { key: "rate", label: "Rate(Avg.)" },
    { key: "amount", label: "Amount" },
    { key: "itemRemark", label: "Item Remark" },
    { key: "userName", label: "User Name" }
  ];

  // Filter/search logic
  const handleSearch = () => {
    let filtered = [...reportData];
    if (fromDate) filtered = filtered.filter(r => r.date === fromDate);
    if (department) filtered = filtered.filter(r => r.department === department);
    if (item) filtered = filtered.filter(r => r.item === item);
    if (category) filtered = filtered.filter(r => r.category === category);
    if (subCategory) filtered = filtered.filter(r => r.subCategory === subCategory);
    if (hsnCode) filtered = filtered.filter(r => r.hsnCode === hsnCode);
    if (userName) filtered = filtered.filter(r => r.userName === userName);
    // Add issueNo and summary type logic as needed
    setFilteredData(filtered);
  };

  const handleExport = () => {
    // Place export logic here
    alert("Excel export placeholder");
  };

  // Styles consistent with your other pages
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
      gap: '14px 16px',
      alignItems: 'center',
      margin: '16px 0',
      background: '#fff',
      borderRadius: '4px',
      padding: '16px'
    },
    filterLabel: { minWidth: '85px', fontSize: '14px', color: '#333' },
    filterInput: {
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      minWidth: '120px'
    },
    radioGroup: { display: 'flex', alignItems: 'center', gap: '9px', marginLeft: '12px' },
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
      marginTop: '16px'
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
      borderBottom: '2px solid #ccc'
    },
    td: {
      padding: '8px 10px',
      fontSize: '14px',
      color: '#666',
      borderBottom: '1px solid #eee'
    },
    noData: {
      textAlign: 'center',
      padding: '40px',
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
          {/* <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>📄</div>
            <span style={styles.pageTitle}>Issue Transaction Report</span>
            <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
            <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
            <span style={styles.headerInfo}>51341 Buser</span>
            <span style={styles.headerInfo}>Today: Oct 07 2025 14:09:10</span>
            <button style={styles.btnAudit}>Audit</button>
            <button style={styles.btnClose}>⚙</button>
          </div> */}
          {/* Filter/Search Panel */}
          <div style={styles.filterPanel}>
            <label style={styles.filterLabel}>Date</label>
            <input type="date" style={styles.filterInput} value={fromDate} onChange={e => setFromDate(e.target.value)} />
            <label style={styles.filterLabel}>To</label>
            <input type="date" style={styles.filterInput} value={toDate} onChange={e => setToDate(e.target.value)} />
            <label style={styles.filterLabel}>Department</label>
            <select style={styles.filterInput} value={department} onChange={e => setDepartment(e.target.value)}>
              <option value="">Select</option>
              {/* more options */}
            </select>
            <label style={styles.filterLabel}>Item</label>
            <select style={styles.filterInput} value={item} onChange={e => setItem(e.target.value)}>
              <option value="">Select</option>
              {/* more items */}
            </select>
            <label style={styles.filterLabel}>Issue No</label>
            <input type="text" style={styles.filterInput} value={issueNo} onChange={e => setIssueNo(e.target.value)} />
            <div style={styles.radioGroup}>
              <label>
                <input type="radio" checked={reportType === "detail"} onChange={() => setReportType("detail")} />
                Detail Transaction
              </label>
              <label>
                <input type="radio" checked={reportType === "summary"} onChange={() => setReportType("summary")} />
                Summary
              </label>
              <label>
                <input type="radio" checked={reportType === "summaryNoDate"} onChange={() => setReportType("summaryNoDate")} />
                Summary Without Date
              </label>
            </div>
            <button style={styles.btnSearch} onClick={handleSearch}>Search</button>
            <button style={styles.btnExport} onClick={handleExport}>⎙</button>
          </div>
          {/* Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  {columns.map(col => (
                    <th style={styles.th} key={col.key}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={columns.length}><div style={styles.noData}>Loading...</div></td></tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr key={idx}>
                      {columns.map(col => (
                        <td style={styles.td} key={col.key}>
                          {col.key === "rate" || col.key === "amount" ? "₹" + (row[col.key] ?? 0) : (row[col.key] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length}>
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


// // src/pages/POS/InventoryReport/ItemTransactionReport.js
// import React, { useState, useEffect, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";

// export default function ItemTransactionReport() {
//   // Filters and controls
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [department, setDepartment] = useState("");
//   const [item, setItem] = useState("");
//   const [issueNo, setIssueNo] = useState("");
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [hsnCode, setHsnCode] = useState("");
//   const [userName, setUserName] = useState("");
//   const [reportType, setReportType] = useState("detail");

//   // Dropdown options
//   const [departments, setDepartments] = useState([]);
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [users, setUsers] = useState([]);

//   // Data
//   const [reportData, setReportData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [exporting, setExporting] = useState(false);

//   // Fetch dropdown data
//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const [deptRes, itemsRes, catRes, usersRes] = await Promise.all([
//           apiFetch("/api/inventory/departments", { method: "GET" }),
//           apiFetch("/api/inventory/items", { method: "GET" }),
//           apiFetch("/api/inventory/categories", { method: "GET" }),
//           apiFetch("/api/users", { method: "GET" }),
//         ]);

//         if (deptRes.success) setDepartments(deptRes.data || []);
//         if (itemsRes.success) setItems(itemsRes.data || []);
//         if (catRes.success) setCategories(catRes.data || []);
//         if (usersRes.success) setUsers(usersRes.data || []);
//       } catch (err) {
//         console.error("Failed to load dropdown data:", err);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   // Fetch subcategories when category changes
//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       if (!category) {
//         setSubCategories([]);
//         return;
//       }

//       try {
//         const response = await apiFetch(
//           `/api/inventory/categories/${category}/subcategories`,
//           { method: "GET" }
//         );

//         if (response.success) {
//           setSubCategories(response.data || []);
//         }
//       } catch (err) {
//         console.error("Failed to load subcategories:", err);
//         setSubCategories([]);
//       }
//     };

//     fetchSubCategories();
//   }, [category]);

//   // Fetch transaction report data
//   const fetchReportData = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: itemsPerPage,
//         reportType,
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//         ...(department && { department }),
//         ...(item && { item }),
//         ...(issueNo && { issueNo }),
//         ...(category && { category }),
//         ...(subCategory && { subCategory }),
//         ...(hsnCode && { hsnCode }),
//         ...(userName && { userName }),
//       });

//       const response = await apiFetch(
//         `/api/inventory/reports/item-transactions?${queryParams}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         setReportData(response.data.transactions || []);
//         setTotalRecords(response.data.total || 0);
//       } else {
//         throw new Error(response.message || "Failed to fetch report data");
//       }
//     } catch (err) {
//       console.error("Failed to load report data:", err);
//       setError(err.message || "Failed to load report data");
//       setReportData([]);
//       setTotalRecords(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     currentPage,
//     itemsPerPage,
//     reportType,
//     fromDate,
//     toDate,
//     department,
//     item,
//     issueNo,
//     category,
//     subCategory,
//     hsnCode,
//     userName,
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

//   // Export to Excel
//   const handleExport = useCallback(async () => {
//     setExporting(true);
//     try {
//       const queryParams = new URLSearchParams({
//         reportType,
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//         ...(department && { department }),
//         ...(item && { item }),
//         ...(issueNo && { issueNo }),
//         ...(category && { category }),
//         ...(subCategory && { subCategory }),
//         ...(hsnCode && { hsnCode }),
//         ...(userName && { userName }),
//         export: "excel",
//       });

//       const response = await apiFetch(
//         `/api/inventory/reports/item-transactions/export?${queryParams}`,
//         {
//           method: "GET",
//           responseType: "blob",
//         }
//       );

//       // Create blob and download
//       const blob = new Blob([response], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute(
//         "download",
//         `Item_Transaction_Report_${new Date().toISOString().split("T")[0]}.xlsx`
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
//   }, [
//     reportType,
//     fromDate,
//     toDate,
//     department,
//     item,
//     issueNo,
//     category,
//     subCategory,
//     hsnCode,
//     userName,
//   ]);

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

//   // Table column list
//   const columns = [
//     { key: "date", label: "Date" },
//     { key: "transactionNo", label: "Transaction No" },
//     { key: "department", label: "Department" },
//     { key: "category", label: "Category" },
//     { key: "subCategory", label: "Sub Category" },
//     { key: "hsnCode", label: "HSN Code" },
//     { key: "item", label: "Item" },
//     { key: "unit", label: "Unit" },
//     { key: "qty", label: "Qty" },
//     { key: "rate", label: "Rate(Avg.)" },
//     { key: "amount", label: "Amount" },
//     { key: "itemRemark", label: "Item Remark" },
//     { key: "userName", label: "User Name" },
//   ];

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
//       gap: "14px 16px",
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
//       minWidth: "140px",
//       outline: "none",
//     },
//     radioGroup: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "8px",
//       marginTop: "20px",
//     },
//     radioLabel: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       fontSize: "14px",
//       color: "#333",
//       cursor: "pointer",
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
//     dataTableContainer: {
//       backgroundColor: "#fff",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//       overflow: "auto",
//       marginTop: "16px",
//     },
//     dataTable: {
//       width: "100%",
//       borderCollapse: "collapse",
//       minWidth: "1600px",
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
//                 <div style={styles.pageIcon}>📄</div>
//                 <span style={styles.pageTitle}>Issue Transaction Report</span>
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
//               <div style={styles.pageIcon}>📄</div>
//               <span style={styles.pageTitle}>Issue Transaction Report</span>
//             </div>

//             {/* Filter/Search Panel */}
//             <div style={styles.filterPanel}>
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
//                 <label style={styles.filterLabel}>Department</label>
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
//                 <label style={styles.filterLabel}>Item</label>
//                 <select
//                   style={styles.filterInput}
//                   value={item}
//                   onChange={(e) => setItem(e.target.value)}
//                 >
//                   <option value="">All Items</option>
//                   {items.map((itm) => (
//                     <option key={itm.id} value={itm.id}>
//                       {itm.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>Category</label>
//                 <select
//                   style={styles.filterInput}
//                   value={category}
//                   onChange={(e) => {
//                     setCategory(e.target.value);
//                     setSubCategory("");
//                   }}
//                 >
//                   <option value="">All Categories</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>Sub Category</label>
//                 <select
//                   style={styles.filterInput}
//                   value={subCategory}
//                   onChange={(e) => setSubCategory(e.target.value)}
//                   disabled={!category}
//                 >
//                   <option value="">All Sub Categories</option>
//                   {subCategories.map((sub) => (
//                     <option key={sub.id} value={sub.id}>
//                       {sub.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>Issue No</label>
//                 <input
//                   type="text"
//                   style={styles.filterInput}
//                   placeholder="Transaction No..."
//                   value={issueNo}
//                   onChange={(e) => setIssueNo(e.target.value)}
//                 />
//               </div>

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>HSN Code</label>
//                 <input
//                   type="text"
//                   style={styles.filterInput}
//                   placeholder="HSN Code..."
//                   value={hsnCode}
//                   onChange={(e) => setHsnCode(e.target.value)}
//                 />
//               </div>

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>User Name</label>
//                 <select
//                   style={styles.filterInput}
//                   value={userName}
//                   onChange={(e) => setUserName(e.target.value)}
//                 >
//                   <option value="">All Users</option>
//                   {users.map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {user.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.radioGroup}>
//                 <label style={styles.filterLabel}>Report Type</label>
//                 <label style={styles.radioLabel}>
//                   <input
//                     type="radio"
//                     checked={reportType === "detail"}
//                     onChange={() => setReportType("detail")}
//                   />
//                   Detail Transaction
//                 </label>
//                 <label style={styles.radioLabel}>
//                   <input
//                     type="radio"
//                     checked={reportType === "summary"}
//                     onChange={() => setReportType("summary")}
//                   />
//                   Summary
//                 </label>
//                 <label style={styles.radioLabel}>
//                   <input
//                     type="radio"
//                     checked={reportType === "summaryNoDate"}
//                     onChange={() => setReportType("summaryNoDate")}
//                   />
//                   Summary Without Date
//                 </label>
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
//                 {exporting ? "Exporting..." : "⎙ Export"}
//               </button>
//             </div>

//             {/* Table */}
//             <div style={styles.dataTableContainer}>
//               {loading ? (
//                 <div style={styles.loadingContainer}>
//                   <div style={styles.spinner}></div>
//                   <p>Loading transaction data...</p>
//                 </div>
//               ) : (
//                 <table style={styles.dataTable}>
//                   <thead style={styles.tableHead}>
//                     <tr>
//                       {columns.map((col) => (
//                         <th style={styles.th} key={col.key}>
//                           {col.label}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reportData.length > 0 ? (
//                       reportData.map((row, idx) => (
//                         <tr key={row.id || idx}>
//                           {columns.map((col) => (
//                             <td style={styles.td} key={col.key}>
//                               {col.key === "rate" || col.key === "amount"
//                                 ? "₹" +
//                                   Number(row[col.key] || 0).toLocaleString(
//                                     "en-IN"
//                                   )
//                                 : col.key === "qty"
//                                 ? Number(row[col.key] || 0).toFixed(2)
//                                 : row[col.key] || "-"}
//                             </td>
//                           ))}
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={columns.length}>
//                           <div style={styles.noData}>
//                             No transaction data available for selected filters
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
