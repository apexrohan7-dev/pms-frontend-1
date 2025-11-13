// src/pages/POS/Settings/SubCategory.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function SubCategory() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");

  // Example/mock data
  const subCategories = [
    { category: "Food", subcategory: "Food" },
    { category: "Food", subcategory: "Beverage" },
    { category: "Food", subcategory: "GROCERY" },
    { category: "Food", subcategory: "Food" },
    { category: "Food", subcategory: "SHAKE" },
    { category: "LAUNDRAY", subcategory: "WASHING" },
    { category: "Food", subcategory: "SACHETS" },
    { category: "SABJI", subcategory: "SABJI" }
  ];

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
      padding: '18px 20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    pageHeader: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '12px 18px',
      marginBottom: '18px',
      borderRadius: '5px 5px 0 0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
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
    filtersRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
      background: '#fff',
      borderRadius: '0 0 5px 5px',
      padding: '18px 18px 10px 6px',
      marginBottom: '10px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.07)'
    },
    filterLabel: {
      minWidth: '70px',
      fontSize: '13px',
      color: '#222'
    },
    filterInput: {
      padding: '5px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      background: '#fff',
      minWidth: '185px'
    },
    filterBtn: {
      background: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "6px 20px",
      fontWeight: 500,
      fontSize: "14px",
      cursor: "pointer"
    },
    dataTableContainer: {
      backgroundColor: '#fff',
      borderRadius: '0 0 5px 5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
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
          {/* Page header */}
          <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>📂</div>
            <span style={styles.pageTitle}>Sub Category Details</span>
            <button style={styles.btnAdd}>Add SubCategory</button>
          </div>
          {/* Filter Form */}
          <div style={styles.filtersRow}>
            <label style={styles.filterLabel}>Category :</label>
            <select
              style={styles.filterInput}
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="LAUNDRAY">LAUNDRAY</option>
              <option value="SABJI">SABJI</option>
            </select>
            <label style={styles.filterLabel}>Sub Category :</label>
            <select
              style={styles.filterInput}
              value={subCategoryFilter}
              onChange={e => setSubCategoryFilter(e.target.value)}
            >
              <option value="">Select Sub Category</option>
              <option value="Food">Food</option>
              <option value="Beverage">Beverage</option>
              <option value="GROCERY">GROCERY</option>
              <option value="SHAKE">SHAKE</option>
              <option value="WASHING">WASHING</option>
              <option value="SACHETS">SACHETS</option>
              <option value="SABJI">SABJI</option>
            </select>
            <button style={styles.filterBtn}>Show</button>
          </div>
          {/* Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Sub Category</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((row, idx) => (
                  <tr key={idx}>
                    <td style={styles.td}>{row.category}</td>
                    <td style={styles.td}>{row.subcategory}</td>
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

// export default function SubCategory() {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [subCategoryFilter, setSubCategoryFilter] = useState("");

//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
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

//   // Fetch categories on mount
//   useEffect(() => {
//     async function loadCategories() {
//       try {
//         const res = await apiFetch("/api/settings/categories");
//         if (res.success) setCategories(res.data || []);
//       } catch (err) {
//         console.error("Failed to load categories", err);
//       }
//     }
//     loadCategories();
//   }, []);

//   // Fetch subcategories when filters applied
//   const fetchSubCategories = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams();
//       if (categoryFilter) params.append("category", categoryFilter);
//       if (subCategoryFilter) params.append("subcategory", subCategoryFilter);
//       const res = await apiFetch(`/api/settings/subcategories?${params.toString()}`);
//       if (res.success) setSubCategories(res.data || []);
//       else setSubCategories([]);
//     } catch (err) {
//       console.error("Failed to load subcategories", err);
//       setSubCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [categoryFilter, subCategoryFilter]);

//   return (
//     <div className="container">
//       <PosTopbar />
//       <div style={styles.layout}>
//         <PosSidebar />
//         <div style={styles.page}>
//           <div style={styles.container}>
//             {/* Page header */}
//             <div style={styles.pageHeader}>
//               <div style={styles.pageIcon}>📂</div>
//               <span style={styles.pageTitle}>Sub Category Details</span>
//               <button style={styles.btnAdd} onClick={() => alert("Add SubCategory clicked")}>Add SubCategory</button>
//             </div>
//             {/* Filter Form */}
//             <div style={styles.filtersRow}>
//               <label style={styles.filterLabel}>Category :</label>
//               <select style={styles.filterInput} value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
//                 <option value="">Select Category</option>
//                 {categories.map(c => (
//                   <option key={c.id} value={c.name}>{c.name}</option>
//                 ))}
//               </select>
//               <label style={styles.filterLabel}>Sub Category :</label>
//               <input
//                 type="text"
//                 style={styles.filterInput}
//                 placeholder="Filter Sub Category"
//                 value={subCategoryFilter}
//                 onChange={e => setSubCategoryFilter(e.target.value)}
//               />
//               <button style={styles.filterBtn} onClick={fetchSubCategories}>Show</button>
//             </div>
//             {/* Data Table */}
//             <div style={styles.dataTableContainer}>
//               <table style={styles.dataTable}>
//                 <thead style={styles.tableHead}>
//                   <tr>
//                     <th style={styles.th}>Category</th>
//                     <th style={styles.th}>Sub Category</th>
//                     <th style={styles.th}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td style={styles.td} colSpan={3}>Loading...</td>
//                     </tr>
//                   ) : subCategories.length > 0 ? (
//                     subCategories.map((row, idx) => (
//                       <tr key={row.id || idx}>
//                         <td style={styles.td}>{row.category}</td>
//                         <td style={styles.td}>{row.subcategory}</td>
//                         <td style={styles.td}>
//                           <button style={{ ...styles.actionBtn, ...styles.editIcon }} title="Edit" onClick={() => alert(`Edit ${row.subcategory}`)}>
//                             ✏️
//                           </button>
//                           <button style={{ ...styles.actionBtn, ...styles.trashIcon }} title="Delete" onClick={() => alert(`Delete ${row.subcategory}`)}>
//                             🗑️
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td style={styles.td} colSpan={3} align="center" style={{color:'#aaa'}}>(No data)</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <style>{`
//             table tbody tr:hover {
//               background-color: #f9f9f9;
//             }
//             button:hover:not(:disabled) {
//               opacity: 0.85;
//             }
//           `}</style>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   layout: {
//     display: 'flex',
//     minHeight: '100vh',
//     backgroundColor: '#f5f5f5'
//   },
//   page: {
//     flexGrow: 1,
//     marginLeft: '240px', // sidebar state handled internally, adjust if needed
//     transition: 'margin-left 0.3s ease',
//     padding: 0
//   },
//   container: {
//     padding: '18px 20px',
//     backgroundColor: '#f5f5f5',
//     minHeight: '100vh'
//   },
//   pageHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: '12px 18px',
//     marginBottom: '18px',
//     borderRadius: '5px 5px 0 0',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
//   },
//   pageIcon: {
//     width: '34px',
//     height: '34px',
//     backgroundColor: '#f0f0f0',
//     borderRadius: '5px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '17px',
//     marginRight: '11px'
//   },
//   pageTitle: {
//     margin: 0,
//     fontSize: '17px',
//     fontWeight: 600,
//     color: '#333'
//   },
//   btnAdd: {
//     padding: '6px 14px',
//     backgroundColor: '#1976d2',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '13px',
//     fontWeight: 500,
//     marginLeft: 'auto'
//   },
//   filtersRow: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '18px',
//     background: '#fff',
//     borderRadius: '0 0 5px 5px',
//     padding: '18px 18px 10px 6px',
//     marginBottom: '10px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.07)'
//   },
//   filterLabel: {
//     minWidth: '70px',
//     fontSize: '13px',
//     color: '#222'
//   },
//   filterInput: {
//     padding: '5px 10px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     background: '#fff',
//     minWidth: '185px'
//   },
//   filterBtn: {
//     background: "#1976d2",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     padding: "6px 20px",
//     fontWeight: 500,
//     fontSize: "14px",
//     cursor: "pointer"
//   },
//   dataTableContainer: {
//     backgroundColor: '#fff',
//     borderRadius: '0 0 5px 5px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
//   },
//   dataTable: {
//     width: '100%',
//     borderCollapse: 'collapse'
//   },
//   tableHead: {
//     backgroundColor: '#e0e0e0'
//   },
//   th: {
//     padding: '8px 10px',
//     textAlign: 'left',
//     fontSize: '14px',
//     fontWeight: 600,
//     color: '#333',
//     borderBottom: '2px solid #ccc'
//   },
//   td: {
//     padding: '8px 10px',
//     fontSize: '14px',
//     color: '#666',
//     borderBottom: '1px solid #eee'
//   },
//   actionBtn: {
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '17px',
//     marginLeft: '7px'
//   },
//   trashIcon: {
//     color: '#d32f2f'
//   },
//   editIcon: {
//     color: '#1976d2'
//   }
// };
