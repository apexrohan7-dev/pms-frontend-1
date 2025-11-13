// src/pages/POS/Settings/Category.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function Category() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Example/mock category data
  const [categories, setCategories] = useState([
    { name: "Food", editable: true },
    { name: "LAUNDRAY", editable: true },
    { name: "SABJI", editable: true },
    { name: "SAUCE", editable: true },
    { name: "TIN", editable: true }
  ]);

  // Sidebar collapsed state sync
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
      borderRadius: '5px 5px 0 0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
    },
    pageIcon: {
      width: '34px',
      height: '34px',
      backgroundColor: '#f0f0f0',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '17px',
      marginRight: '11px'
    },
    pageTitle: {
      margin: 0,
      fontSize: '17px',
      fontWeight: 600,
      color: '#333'
    },
    btnAdd: {
      padding: '6px 14px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 500,
      marginLeft: 'auto'
    },
    dataTableContainer: {
      backgroundColor: '#fff',
      borderRadius: '0 0 5px 5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
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
    actionBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '17px',
      marginLeft: '7px'
    },
    trashIcon: {
      color: '#d32f2f'
    },
    editIcon: {
      color: '#1976d2'
    }
  };

  return (
    <div className="container">
      <PosTopbar/>
    <div style={styles.layout}>
      <PosSidebar />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Custom Category Header */}
          <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>📁</div>
            <span style={styles.pageTitle}>Category Details</span>
            <button style={styles.btnAdd}>Add Category</button>
          </div>
          {/* Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>IsEditable</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((row, idx) => (
                  <tr key={idx}>
                    <td style={styles.td}>{row.name}</td>
                    <td style={styles.td}>{row.editable ? "Editable" : "Not Editable"}</td>
                    <td style={styles.td}>
                      <button style={{ ...styles.actionBtn, ...styles.editIcon }} title="Edit">
                        <span role="img" aria-label="edit">✏️</span>
                      </button>
                      <button style={{ ...styles.actionBtn, ...styles.trashIcon }} title="Delete">
                        <span role="img" aria-label="delete">🗑️</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <style>{`
          table tbody tr:hover {
            background-color: #f9f9f9;
          }
          button:hover:not(:disabled) {
            opacity: 0.85;
          }
        `}</style>
      </div>
    </div>
    </div>
  );
}


// import React, { useState, useEffect, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";

// export default function Category() {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

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

//   // Fetch categories from API
//   const fetchCategories = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await apiFetch("/api/settings/categories", { method: "GET" });
//       if (response.success) {
//         setCategories(response.data || []);
//       } else {
//         throw new Error(response.message || "Failed to load categories");
//       }
//     } catch (err) {
//       console.error("Error loading categories:", err);
//       alert(err.message || "Failed to load categories");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   // Handlers for edit and delete
//   const handleEdit = (category) => {
//     alert(`Edit category: ${category.name}`);
//     // Implement edit modal or navigation here
//   };

//   const handleDelete = async (category) => {
//     if (!window.confirm(`Are you sure you want to delete category "${category.name}"?`)) return;

//     try {
//       const response = await apiFetch(`/api/settings/categories/${category.id}`, { method: "DELETE" });
//       if (response.success) {
//         alert("Category deleted successfully");
//         fetchCategories();
//       } else {
//         throw new Error(response.message || "Failed to delete category");
//       }
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert(err.message || "Failed to delete category");
//     }
//   };

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
//       borderRadius: "5px 5px 0 0",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
//     },
//     pageIcon: {
//       width: "34px",
//       height: "34px",
//       backgroundColor: "#f0f0f0",
//       borderRadius: "5px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: "17px",
//       marginRight: "11px",
//     },
//     pageTitle: {
//       margin: 0,
//       fontSize: "17px",
//       fontWeight: 600,
//       color: "#333",
//     },
//     btnAdd: {
//       padding: "6px 14px",
//       backgroundColor: "#1976d2",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "13px",
//       fontWeight: 500,
//       marginLeft: "auto",
//     },
//     dataTableContainer: {
//       backgroundColor: "#fff",
//       borderRadius: "0 0 5px 5px",
//       boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
//       overflow: "auto",
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
//     },
//     td: {
//       padding: "8px 10px",
//       fontSize: "14px",
//       color: "#666",
//       borderBottom: "1px solid #eee",
//     },
//     actionBtn: {
//       background: "none",
//       border: "none",
//       cursor: "pointer",
//       fontSize: "17px",
//       marginLeft: "7px",
//     },
//     trashIcon: {
//       color: "#d32f2f",
//     },
//     editIcon: {
//       color: "#1976d2",
//     },
//   };

//   return (
//     <div className="container">
//       <PosTopbar />
//       <div style={styles.layout}>
//         <PosSidebar />
//         <div style={styles.page}>
//           <div style={styles.container}>
//             {/* Custom Category Header */}
//             <div style={styles.pageHeader}>
//               <div style={styles.pageIcon}>📁</div>
//               <span style={styles.pageTitle}>Category Details</span>
//               <button style={styles.btnAdd} onClick={() => alert("Add Category clicked")}>Add Category</button>
//             </div>
//             {/* Table */}
//             <div style={styles.dataTableContainer}>
//               <table style={styles.dataTable}>
//                 <thead style={styles.tableHead}>
//                   <tr>
//                     <th style={styles.th}>Category</th>
//                     <th style={styles.th}>Is Editable</th>
//                     <th style={styles.th}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td style={styles.td} colSpan={3}>Loading...</td>
//                     </tr>
//                   ) : categories.length > 0 ? (
//                     categories.map((row, idx) => (
//                       <tr key={row.id || idx}>
//                         <td style={styles.td}>{row.name}</td>
//                         <td style={styles.td}>{row.editable ? "Editable" : "Not Editable"}</td>
//                         <td style={styles.td}>
//                           <button style={{ ...styles.actionBtn, ...styles.editIcon }} title="Edit" onClick={() => handleEdit(row)}>
//                             ✏️
//                           </button>
//                           <button style={{ ...styles.actionBtn, ...styles.trashIcon }} title="Delete" onClick={() => handleDelete(row)}>
//                             🗑️
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td style={styles.td} colSpan={3}>No categories found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
