// src/pages/POS/InventoryReport/ItemInventoryReport.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function ItemInventoryReport() {
  // UI states for filters
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [unit, setUnit] = useState("");
  const [mrpFrom, setMrpFrom] = useState("");
  const [mrpTo, setMrpTo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [hsnCode, setHsnCode] = useState("");

  // Data state
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data - adjust as needed
  const mockData = [
    {
      sno: 1, item: "Saof", unit: "Kg", itemDescription: "Null", mrp: 150, openingQty: 15, openingRate: 0, openingAmount: 0,
      inwardQty: 0, inwardRate: 0, inwardAmount: 0,
      outwardQty: 0, outwardRate: 0, outwardAmount: 0,
      closingQty: 15, closingRate: 0, closingAmount: 0
    },
    {
      sno: 2, item: "Hing Powder", unit: "Kg", itemDescription: "Null", mrp: 250, openingQty: 2, openingRate: 0, openingAmount: 0,
      inwardQty: 0, inwardRate: 0, inwardAmount: 0,
      outwardQty: 0, outwardRate: 0, outwardAmount: 0,
      closingQty: 2, closingRate: 0, closingAmount: 0
    },
    {
      sno: 3, item: "Black Salt", unit: "Kg", itemDescription: "Null", mrp: 30, openingQty: 6.5, openingRate: 0, openingAmount: 0,
      inwardQty: 0, inwardRate: 0, inwardAmount: 0,
      outwardQty: 0, outwardRate: 0, outwardAmount: 0,
      closingQty: 6.5, closingRate: 0, closingAmount: 0
    },
    {
      sno: 4, item: "Corn Flakes", unit: "Kg", itemDescription: "Null", mrp: 120, openingQty: 11, openingRate: 0, openingAmount: 0,
      inwardQty: 0, inwardRate: 0, inwardAmount: 0,
      outwardQty: 0, outwardRate: 0, outwardAmount: 0,
      closingQty: 11, closingRate: 0, closingAmount: 0
    },
    {
      sno: 5, item: "Anjeer", unit: "Kg", itemDescription: "Null", mrp: 380, openingQty: 3, openingRate: 350, openingAmount: 1050,
      inwardQty: 0, inwardRate: 350, inwardAmount: 0,
      outwardQty: 0, outwardRate: 350, outwardAmount: 0,
      closingQty: 3, closingRate: 350, closingAmount: 1050
    },
    {
      sno: 6, item: "MDH Biryani Masala", unit: "Kg", itemDescription: "Null", mrp: 80, openingQty: 6, openingRate: 60, openingAmount: 360,
      inwardQty: 0, inwardRate: 60, inwardAmount: 0,
      outwardQty: 0, outwardRate: 60, outwardAmount: 0,
      closingQty: 6, closingRate: 60, closingAmount: 360
    },
    {
      sno: 7, item: "PAPAD", unit: "Kg", itemDescription: "Null", mrp: 300, openingQty: 9, openingRate: 300, openingAmount: -2700,
      inwardQty: 0, inwardRate: 300, inwardAmount: 300,
      outwardQty: 0, outwardRate: 300, outwardAmount: 300,
      closingQty: -9, closingRate: 300, closingAmount: -2700
    },
    {
      sno: 8, item: "SHEV BHUJA", unit: "Kg", itemDescription: "Null", mrp: 70, openingQty: -9, openingRate: 70, openingAmount: -630,
      inwardQty: 0, inwardRate: 70, inwardAmount: 70,
      outwardQty: 0, outwardRate: 70, outwardAmount: 70,
      closingQty: -9, closingRate: 70, closingAmount: -630
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
      await new Promise(resolve => setTimeout(resolve, 500));
      setReportData(mockData);
      setFilteredData(mockData);
    } catch (error) {
      // log error
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic for search button
  const handleSearch = () => {
    let filtered = [...reportData];
    if (category) filtered = filtered.filter(r => r.category === category);
    if (item) filtered = filtered.filter(r => r.item === item);
    if (unit) filtered = filtered.filter(r => r.unit === unit);
    if (mrpFrom) filtered = filtered.filter(r => Number(r.mrp) >= Number(mrpFrom));
    if (mrpTo) filtered = filtered.filter(r => Number(r.mrp) <= Number(mrpTo));
    // You can add date/Hsn filtering as required
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Export logic placeholder
  const handleExport = () => {
    // Implement excel export logic or another export
    alert("Export functionality placeholder.");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
    filterPanel: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      background: '#fff',
      padding: '12px',
      marginBottom: '12px',
      borderRadius: '3px'
    },
    filterLabel: {
      fontSize: '14px', color: '#333', marginRight: '5px'
    },
    filterInput: {
      padding: '6px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px'
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
      overflow: 'auto'
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
              <div style={styles.pageIcon}>📊</div>
              <h2 style={styles.pageTitle}>Item Inventory Report</h2>
            </div>
            {/* <div style={styles.headerRight}>
              <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
              <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
              <span style={styles.headerInfo}>51341 Buser</span>
              <span style={styles.headerInfo}>Today: Oct 07 2025 13:59:37</span>
              <button style={styles.btnAudit}>Audit</button>
              <button style={styles.btnClose}>⚙</button>
            </div> */}
          </div>
          {/* Filters panel */}
          <div style={styles.filterPanel}>
            <label style={styles.filterLabel}>Category</label>
            <select style={styles.filterInput} value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select</option>
              {/* Add real options here */}
            </select>
            <label style={styles.filterLabel}>Item</label>
            <select style={styles.filterInput} value={item} onChange={e => setItem(e.target.value)}>
              <option value="">Select</option>
              {/* Map items here */}
            </select>
            <label style={styles.filterLabel}>Unit</label>
            <select style={styles.filterInput} value={unit} onChange={e => setUnit(e.target.value)}>
              <option value="">Select</option>
              <option value="Kg">Kg</option>
            </select>
            <label style={styles.filterLabel}>MRP</label>
            <input type="number" style={styles.filterInput} placeholder="0" value={mrpFrom} onChange={e => setMrpFrom(e.target.value)} />
            <input type="number" style={styles.filterInput} placeholder="0" value={mrpTo} onChange={e => setMrpTo(e.target.value)} />

            <label style={styles.filterLabel}>To Date</label>
            <input type="date" style={styles.filterInput} value={toDate} onChange={e => setToDate(e.target.value)} />

            <label style={styles.filterLabel}>HsnCode</label>
            <input type="text" style={styles.filterInput} placeholder="Item Code, Bar Code, HSN Code..." value={hsnCode} onChange={e => setHsnCode(e.target.value)} />

            <button style={styles.btnSearch} onClick={handleSearch}>Search</button>
            <button style={styles.btnExport} onClick={handleExport}>⎙</button>
          </div>
          {/* Data Table */}
          <div style={styles.dataTableContainer}>
            {loading ? (
              <div style={styles.noData}>
                <div style={{ ...styles.spinner }}></div>
                <p>Loading...</p>
              </div>
            ) : (
              <table style={styles.dataTable}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={styles.th}>SNo.</th>
                    <th style={styles.th}>Item</th>
                    <th style={styles.th}>Unit</th>
                    <th style={styles.th}>Item Description</th>
                    <th style={styles.th}>MRP</th>
                    <th style={styles.th}>Opening Qty</th>
                    <th style={styles.th}>Opening Rate</th>
                    <th style={styles.th}>Opening Amount</th>
                    <th style={styles.th}>Inward Qty</th>
                    <th style={styles.th}>Inward Rate</th>
                    <th style={styles.th}>Inward Amount</th>
                    <th style={styles.th}>Outward Qty</th>
                    <th style={styles.th}>Outward Rate</th>
                    <th style={styles.th}>Outward Amount</th>
                    <th style={styles.th}>Closing Qty</th>
                    <th style={styles.th}>Closing Rate</th>
                    <th style={styles.th}>Closing Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((row, i) => (
                      <tr key={row.sno}>
                        <td style={styles.td}>{row.sno}</td>
                        <td style={styles.td}>{row.item}</td>
                        <td style={styles.td}>{row.unit}</td>
                        <td style={styles.td}>{row.itemDescription}</td>
                        <td style={styles.td}>₹{row.mrp?.toLocaleString()}</td>
                        <td style={styles.td}>{row.openingQty}</td>
                        <td style={styles.td}>₹{row.openingRate?.toLocaleString()}</td>
                        <td style={styles.td}>₹{row.openingAmount?.toLocaleString()}</td>
                        <td style={styles.td}>{row.inwardQty}</td>
                        <td style={styles.td}>₹{row.inwardRate?.toLocaleString()}</td>
                        <td style={styles.td}>₹{row.inwardAmount?.toLocaleString()}</td>
                        <td style={styles.td}>{row.outwardQty}</td>
                        <td style={styles.td}>₹{row.outwardRate?.toLocaleString()}</td>
                        <td style={styles.td}>₹{row.outwardAmount?.toLocaleString()}</td>
                        <td style={styles.td}>{row.closingQty}</td>
                        <td style={styles.td}>₹{row.closingRate?.toLocaleString()}</td>
                        <td style={styles.td}>₹{row.closingAmount?.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="17" style={styles.noData}>
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


// // src/pages/POS/InventoryReport/ItemInventoryReport.js
// import React, { useState, useEffect, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";

// export default function ItemInventoryReport() {
//   // UI states for filters
//   const [category, setCategory] = useState("");
//   const [item, setItem] = useState("");
//   const [unit, setUnit] = useState("");
//   const [mrpFrom, setMrpFrom] = useState("");
//   const [mrpTo, setMrpTo] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [hsnCode, setHsnCode] = useState("");

//   // Dropdown options
//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState([]);
//   const [units, setUnits] = useState([]);

//   // Data state
//   const [reportData, setReportData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [exporting, setExporting] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Fetch categories, items, and units for dropdowns
//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const [categoriesRes, itemsRes, unitsRes] = await Promise.all([
//           apiFetch("/api/inventory/categories", { method: "GET" }),
//           apiFetch("/api/inventory/items", { method: "GET" }),
//           apiFetch("/api/inventory/units", { method: "GET" }),
//         ]);

//         if (categoriesRes.success) setCategories(categoriesRes.data || []);
//         if (itemsRes.success) setItems(itemsRes.data || []);
//         if (unitsRes.success) setUnits(unitsRes.data || []);
//       } catch (err) {
//         console.error("Failed to load dropdown data:", err);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   // Fetch inventory report data
//   const fetchReportData = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: itemsPerPage,
//         ...(category && { category }),
//         ...(item && { item }),
//         ...(unit && { unit }),
//         ...(mrpFrom && { mrpFrom }),
//         ...(mrpTo && { mrpTo }),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//         ...(hsnCode && { hsnCode }),
//       });

//       const response = await apiFetch(
//         `/api/inventory/reports/item-inventory?${queryParams}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.success) {
//         setReportData(response.data.items || []);
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
//     category,
//     item,
//     unit,
//     mrpFrom,
//     mrpTo,
//     fromDate,
//     toDate,
//     hsnCode,
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
//         ...(category && { category }),
//         ...(item && { item }),
//         ...(unit && { unit }),
//         ...(mrpFrom && { mrpFrom }),
//         ...(mrpTo && { mrpTo }),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//         ...(hsnCode && { hsnCode }),
//         export: "excel",
//       });

//       const response = await apiFetch(
//         `/api/inventory/reports/item-inventory/export?${queryParams}`,
//         {
//           method: "GET",
//           responseType: "blob",
//         }
//       );

//       // Create a blob from the response
//       const blob = new Blob([response], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       // Create download link
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute(
//         "download",
//         `Item_Inventory_Report_${new Date().toISOString().split("T")[0]}.xlsx`
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
//   }, [category, item, unit, mrpFrom, mrpTo, fromDate, toDate, hsnCode]);

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
//     filterPanel: {
//       display: "flex",
//       flexWrap: "wrap",
//       gap: "12px",
//       background: "#fff",
//       padding: "15px",
//       marginBottom: "20px",
//       borderRadius: "5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//       alignItems: "end",
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
//       outline: "none",
//       minWidth: "120px",
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
//     },
//     dataTable: {
//       width: "100%",
//       borderCollapse: "collapse",
//       minWidth: "1800px",
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
//                 <div style={styles.headerLeft}>
//                   <div style={styles.pageIcon}>📊</div>
//                   <h2 style={styles.pageTitle}>Item Inventory Report</h2>
//                 </div>
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
//             {/* Header Section */}
//             <div style={styles.pageHeader}>
//               <div style={styles.headerLeft}>
//                 <div style={styles.pageIcon}>📊</div>
//                 <h2 style={styles.pageTitle}>Item Inventory Report</h2>
//               </div>
//             </div>

//             {/* Filters panel */}
//             <div style={styles.filterPanel}>
//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>Category</label>
//                 <select
//                   style={styles.filterInput}
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
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
//                 <label style={styles.filterLabel}>Unit</label>
//                 <select
//                   style={styles.filterInput}
//                   value={unit}
//                   onChange={(e) => setUnit(e.target.value)}
//                 >
//                   <option value="">All Units</option>
//                   {units.map((u) => (
//                     <option key={u.id} value={u.id}>
//                       {u.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>MRP From</label>
//                 <input
//                   type="number"
//                   style={styles.filterInput}
//                   placeholder="0"
//                   value={mrpFrom}
//                   onChange={(e) => setMrpFrom(e.target.value)}
//                 />
//               </div>

//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>MRP To</label>
//                 <input
//                   type="number"
//                   style={styles.filterInput}
//                   placeholder="0"
//                   value={mrpTo}
//                   onChange={(e) => setMrpTo(e.target.value)}
//                 />
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
//                 <label style={styles.filterLabel}>HSN/Item Code</label>
//                 <input
//                   type="text"
//                   style={styles.filterInput}
//                   placeholder="HSN Code..."
//                   value={hsnCode}
//                   onChange={(e) => setHsnCode(e.target.value)}
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
//                 onClick={handleExport}
//                 disabled={exporting || loading}
//               >
//                 {exporting ? "Exporting..." : "⎙ Export"}
//               </button>
//             </div>

//             {/* Data Table */}
//             <div style={styles.dataTableContainer}>
//               {loading ? (
//                 <div style={styles.loadingContainer}>
//                   <div style={styles.spinner}></div>
//                   <p>Loading report data...</p>
//                 </div>
//               ) : (
//                 <table style={styles.dataTable}>
//                   <thead style={styles.tableHead}>
//                     <tr>
//                       <th style={styles.th}>SNo.</th>
//                       <th style={styles.th}>Item</th>
//                       <th style={styles.th}>Unit</th>
//                       <th style={styles.th}>Item Description</th>
//                       <th style={styles.th}>MRP</th>
//                       <th style={styles.th}>Opening Qty</th>
//                       <th style={styles.th}>Opening Rate</th>
//                       <th style={styles.th}>Opening Amount</th>
//                       <th style={styles.th}>Inward Qty</th>
//                       <th style={styles.th}>Inward Rate</th>
//                       <th style={styles.th}>Inward Amount</th>
//                       <th style={styles.th}>Outward Qty</th>
//                       <th style={styles.th}>Outward Rate</th>
//                       <th style={styles.th}>Outward Amount</th>
//                       <th style={styles.th}>Closing Qty</th>
//                       <th style={styles.th}>Closing Rate</th>
//                       <th style={styles.th}>Closing Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reportData.length > 0 ? (
//                       reportData.map((row, index) => (
//                         <tr key={row.id || index}>
//                           <td style={styles.td}>
//                             {(currentPage - 1) * itemsPerPage + index + 1}
//                           </td>
//                           <td style={styles.td}>{row.item}</td>
//                           <td style={styles.td}>{row.unit}</td>
//                           <td style={styles.td}>
//                             {row.itemDescription || "-"}
//                           </td>
//                           <td style={styles.td}>
//                             ₹{Number(row.mrp || 0).toLocaleString("en-IN")}
//                           </td>
//                           <td style={styles.td}>
//                             {Number(row.openingQty || 0).toFixed(2)}
//                           </td>
//                           <td style={styles.td}>
//                             ₹
//                             {Number(row.openingRate || 0).toLocaleString(
//                               "en-IN"
//                             )}
//                           </td>
//                           <td style={styles.td}>
//                             ₹
//                             {Number(row.openingAmount || 0).toLocaleString(
//                               "en-IN"
//                             )}
//                           </td>
//                           <td style={styles.td}>
//                             {Number(row.inwardQty || 0).toFixed(2)}
//                           </td>
//                           <td style={styles.td}>
//                             ₹
//                             {Number(row.inwardRate || 0).toLocaleString(
//                               "en-IN"
//                             )}
//                           </td>
//                           <td style={styles.td}>
//                             ₹
//                             {Number(row.inwardAmount || 0).toLocaleString(
//                               "en-IN"
//                             )}
//                           </td>
//                           <td style={styles.td}>
//                             {Number(row.outwardQty || 0).toFixed(2)}
//                           </td>
//                           <td style={styles.td}>
//                             ₹
//                             {Number(row.outwardRate || 0).toLocaleString(
//                               "en-IN"
//                             )}
//                           </td>
//                           <td style={styles.td}>
//                             ₹
//                             {Number(row.outwardAmount || 0).toLocaleString(
//                               "en-IN"
//                             )}
//                           </td>
//                           <td
//                             style={{
//                               ...styles.td,
//                               fontWeight: 600,
//                               color:
//                                 Number(row.closingQty) < 0 ? "#d32f2f" : "#666",
//                             }}
//                           >
//                             {Number(row.closingQty || 0).toFixed(2)}
//                           </td>
//                           <td style={styles.td}>
//                             ₹
//                             {Number(row.closingRate || 0).toLocaleString(
//                               "en-IN"
//                             )}
//                           </td>
//                           <td
//                             style={{
//                               ...styles.td,
//                               fontWeight: 600,
//                               color:
//                                 Number(row.closingAmount) < 0
//                                   ? "#d32f2f"
//                                   : "#666",
//                             }}
//                           >
//                             ₹
//                             {Number(row.closingAmount || 0).toLocaleString(
//                               "en-IN"
//                             )}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="17" style={styles.noData}>
//                           No inventory data available for the selected filters
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
