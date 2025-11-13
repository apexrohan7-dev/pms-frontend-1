// src/pages/POS/Purchase/PurchaseRequisition.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function PurchaseRequisition() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    from: "10/07/2025",
    to: "10/07/2025",
    department: "STORE (MMS)",
    category: ""
  });

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

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5"
    },
    page: {
      flexGrow: 1,
      marginLeft: sidebarCollapsed ? "60px" : "240px",
      transition: "margin-left 0.3s ease",
      padding: 0
    },
    container: {
      padding: "16px 18px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    },
    pageHeader: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "12px 18px",
      marginBottom: "16px",
      borderRadius: "5px 5px 0 0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
    },
    pageIcon: {
      width: "32px",
      height: "32px",
      backgroundColor: "#f0f0f0",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "17px",
      marginRight: "11px"
    },
    pageTitle: {
      margin: 0,
      fontSize: "18px",
      fontWeight: 600,
      color: "#333"
    },
    actionBtn: {
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: 500,
      padding: "6px 18px",
      marginLeft: "auto"
    },
    filterRow: {
      display: "flex",
      alignItems: "center",
      background: "#fff",
      borderRadius: "0 0 5px 5px",
      padding: "13px 18px 1px 10px",
      marginBottom: "4px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07)"
    },
    filterInput: {
      padding: "6px 10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      background: "#fff",
      fontSize: "14px",
      marginLeft: "9px",
      marginRight: "15px"
    },
    searchBtn: {
      background: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "7px 22px",
      fontWeight: 500,
      fontSize: "14px",
      cursor: "pointer"
    },
    tableContainer: {
      backgroundColor: "#fff",
      borderRadius: "0 0 5px 5px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse"
    },
    tableHead: {
      backgroundColor: "#e0e0e0"
    },
    th: {
      padding: "8px 10px",
      textAlign: "left",
      fontSize: "14px",
      fontWeight: 600,
      color: "#333",
      borderBottom: "2px solid #ccc",
      whiteSpace: "nowrap"
    },
    td: {
      padding: "8px 10px",
      fontSize: "14px",
      color: "#666",
      borderBottom: "1px solid #eee",
      whiteSpace: "nowrap"
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
            <div style={styles.pageIcon}>📋</div>
            <span style={styles.pageTitle}>Purchase Requisition Detail</span>
            <button style={styles.actionBtn}>Add Purchase Requisition</button>
          </div>
          {/* Filter/Search Row */}
          <div style={styles.filterRow}>
            <input
              style={styles.filterInput}
              type="text"
              value={filters.from}
              onChange={e => setFilters({ ...filters, from: e.target.value })}
              placeholder="From Date"
            />
            <input
              style={styles.filterInput}
              type="text"
              value={filters.to}
              onChange={e => setFilters({ ...filters, to: e.target.value })}
              placeholder="To Date"
            />
            <select
              style={styles.filterInput}
              value={filters.department}
              onChange={e => setFilters({ ...filters, department: e.target.value })}
            >
              <option value="STORE (MMS)">STORE (MMS)</option>
              {/* Add more departments as needed */}
            </select>
            <select
              style={styles.filterInput}
              value={filters.category}
              onChange={e => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {/* Add more categories as needed */}
            </select>
            <button style={styles.searchBtn}>Search</button>
          </div>
          {/* Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Req No</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Department Type Name</th>
                  <th style={styles.th}>Remark</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* No data */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}


// import React, { useState, useEffect, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";

// export default function PurchaseRequisition() {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [filters, setFilters] = useState({
//     from: "2025-07-10",
//     to: "2025-07-10",
//     department: "STORE (MMS)",
//     category: ""
//   });

//   const [departments, setDepartments] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [requisitions, setRequisitions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Sidebar collapse detection
//   useEffect(() => {
//     const handleSidebarChange = () => {
//       const sidebar = document.querySelector(".rsb");
//       if (sidebar) setSidebarCollapsed(sidebar.classList.contains("rsb--mini"));
//     };
//     handleSidebarChange();
//     const observer = new MutationObserver(handleSidebarChange);
//     const sidebar = document.querySelector(".rsb");
//     if (sidebar) observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
//     return () => observer.disconnect();
//   }, []);

//   // Load departments and categories on mount
//   useEffect(() => {
//     async function loadFilters() {
//       try {
//         const [deptRes, catRes] = await Promise.all([
//           apiFetch("/api/settings/departments"),
//           apiFetch("/api/settings/categories")
//         ]);
//         if (deptRes.success) setDepartments(deptRes.data || []);
//         if (catRes.success) setCategories(catRes.data || []);
//       } catch (err) {
//         console.error("Failed to load filter lists", err);
//       }
//     }
//     loadFilters();
//   }, []);

//   // Fetch requisitions when filters change
//   const fetchRequisitions = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams({
//         from: filters.from,
//         to: filters.to,
//         department: filters.department,
//         category: filters.category
//       });
//       const res = await apiFetch(`/api/purchase/requisitions?${params.toString()}`);
//       if (res.success) {
//         setRequisitions(res.data || []);
//       } else {
//         setRequisitions([]);
//       }
//     } catch (err) {
//       console.error("Error loading requisitions:", err);
//       setRequisitions([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   // Fetch requisitions reactively
//   useEffect(() => {
//     fetchRequisitions();
//   }, [fetchRequisitions]);

//   const styles = {
//     layout: {
//       display: "flex",
//       minHeight: "100vh",
//       backgroundColor: "#f5f5f5"
//     },
//     page: {
//       flexGrow: 1,
//       marginLeft: sidebarCollapsed ? "60px" : "240px",
//       transition: "margin-left 0.3s ease",
//       padding: 0
//     },
//     container: {
//       padding: "16px 18px",
//       backgroundColor: "#f5f5f5",
//       minHeight: "100vh"
//     },
//     pageHeader: {
//       display: "flex",
//       alignItems: "center",
//       backgroundColor: "#fff",
//       padding: "12px 18px",
//       marginBottom: "16px",
//       borderRadius: "5px 5px 0 0",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
//     },
//     pageIcon: {
//       width: "32px",
//       height: "32px",
//       backgroundColor: "#f0f0f0",
//       borderRadius: "5px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: "17px",
//       marginRight: "11px"
//     },
//     pageTitle: {
//       margin: 0,
//       fontSize: "18px",
//       fontWeight: 600,
//       color: "#333"
//     },
//     actionBtn: {
//       backgroundColor: "#1976d2",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "13px",
//       fontWeight: 500,
//       padding: "6px 18px",
//       marginLeft: "auto"
//     },
//     filterRow: {
//       display: "flex",
//       alignItems: "center",
//       background: "#fff",
//       borderRadius: "0 0 5px 5px",
//       padding: "13px 18px 1px 10px",
//       marginBottom: "4px",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.07)"
//     },
//     filterInput: {
//       padding: "6px 10px",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//       background: "#fff",
//       fontSize: "14px",
//       marginLeft: "9px",
//       marginRight: "15px"
//     },
//     searchBtn: {
//       background: "#1976d2",
//       color: "#fff",
//       border: "none",
//       borderRadius: "4px",
//       padding: "7px 22px",
//       fontWeight: 500,
//       fontSize: "14px",
//       cursor: "pointer"
//     },
//     tableContainer: {
//       backgroundColor: "#fff",
//       borderRadius: "0 0 5px 5px",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse"
//     },
//     tableHead: {
//       backgroundColor: "#e0e0e0"
//     },
//     th: {
//       padding: "8px 10px",
//       textAlign: "left",
//       fontSize: "14px",
//       fontWeight: 600,
//       color: "#333",
//       borderBottom: "2px solid #ccc",
//       whiteSpace: "nowrap"
//     },
//     td: {
//       padding: "8px 10px",
//       fontSize: "14px",
//       color: "#666",
//       borderBottom: "1px solid #eee",
//       whiteSpace: "nowrap"
//     }
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
//               <div style={styles.pageIcon}>📋</div>
//               <span style={styles.pageTitle}>Purchase Requisition Detail</span>
//               <button style={styles.actionBtn}>Add Purchase Requisition</button>
//             </div>
//             {/* Filters */}
//             <div style={styles.filterRow}>
//               <input
//                 style={styles.filterInput}
//                 type="date"
//                 value={filters.from}
//                 onChange={e => setFilters({ ...filters, from: e.target.value })}
//                 placeholder="From Date"
//               />
//               <input
//                 style={styles.filterInput}
//                 type="date"
//                 value={filters.to}
//                 onChange={e => setFilters({ ...filters, to: e.target.value })}
//                 placeholder="To Date"
//               />
//               <select
//                 style={styles.filterInput}
//                 value={filters.department}
//                 onChange={e => setFilters({ ...filters, department: e.target.value })}
//               >
//                 {departments.length ? departments.map(d => (
//                   <option key={d.id} value={d.name}>{d.name}</option>
//                 )) : <option>STORE (MMS)</option>}
//               </select>
//               <select
//                 style={styles.filterInput}
//                 value={filters.category}
//                 onChange={e => setFilters({ ...filters, category: e.target.value })}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map(c => (
//                   <option key={c.id} value={c.name}>{c.name}</option>
//                 ))}
//               </select>
//               <button style={styles.searchBtn} onClick={fetchRequisitions}>Search</button>
//             </div>
//             {/* Table */}
//             <div style={styles.tableContainer}>
//               <table style={styles.table}>
//                 <thead style={styles.tableHead}>
//                   <tr>
//                     <th style={styles.th}>Date</th>
//                     <th style={styles.th}>Req No</th>
//                     <th style={styles.th}>Department</th>
//                     <th style={styles.th}>Department Type Name</th>
//                     <th style={styles.th}>Remark</th>
//                     <th style={styles.th}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading && (
//                     <tr>
//                       <td style={styles.td} colSpan={6}>Loading...</td>
//                     </tr>
//                   )}
//                   {!loading && requisitions.length === 0 && (
//                     <tr>
//                       <td style={styles.td} colSpan={6} align="center" style={{ color: "#aaa" }}>(No data)</td>
//                     </tr>
//                   )}
//                   {!loading && requisitions.map((row, idx) => (
//                     <tr key={row.id || idx}>
//                       <td style={styles.td}>{row.date}</td>
//                       <td style={styles.td}>{row.reqNo}</td>
//                       <td style={styles.td}>{row.department}</td>
//                       <td style={styles.td}>{row.departmentTypeName}</td>
//                       <td style={styles.td}>{row.remark}</td>
//                       <td style={styles.td}>
//                         <button onClick={() => alert(`Edit ${row.reqNo}`)}>✏️</button>
//                         <button onClick={() => alert(`Delete ${row.reqNo}`)} style={{ color: '#d32f2f' }}>🗑️</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
