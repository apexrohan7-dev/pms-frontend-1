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
