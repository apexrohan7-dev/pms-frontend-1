// src/pages/POS/Settings/ItemMaster.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";

export default function ItemMaster() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    item: "",
    tax: "",
    itemType: "",
    inventoryType: "",
    itemCode: "",
    priceFrom: "",
    priceTo: ""
  });

  // Example/mock data
  const items = [
    {
      category: "Food",
      subCategory: "GROCERY",
      itemName: "Anjeer",
      unitName: "Kg",
      subUnitName: "Kg",
      qtyOfUnit: 5,
      mrp: "₹380.00",
      createDate: "03/05/2025"
    },
    {
      category: "Food",
      subCategory: "GROCERY",
      itemName: "Black Salt",
      unitName: "Kg",
      subUnitName: "Kg",
      qtyOfUnit: 2,
      mrp: "₹30.00",
      createDate: "03/05/2025"
    },
    {
      category: "Food",
      subCategory: "GROCERY",
      itemName: "Corn Flakes",
      unitName: "Kg",
      subUnitName: "Pkt",
      qtyOfUnit: 50,
      mrp: "₹120.00",
      createDate: "03/05/2025"
    },
    {
      category: "SABJI",
      subCategory: "SABJI",
      itemName: "CUCUMBER",
      unitName: "Kg",
      subUnitName: "Kg",
      qtyOfUnit: 1,
      mrp: "₹0.00",
      createDate: "10/15/2025"
    },
    {
      category: "Food",
      subCategory: "Food",
      itemName: "Dal Toor",
      unitName: "Kg",
      subUnitName: "Kg",
      qtyOfUnit: 1,
      mrp: "₹50.00",
      createDate: "08/07/2025"
    },
    {
      category: "Food",
      subCategory: "Food",
      itemName: "FRESH CREAM",
      unitName: "Ltr",
      subUnitName: "Ltr",
      qtyOfUnit: 1,
      mrp: "₹75.00",
      createDate: "08/06/2025"
    },
    {
      category: "Food",
      subCategory: "Food",
      itemName: "GARLIC",
      unitName: "Kg",
      subUnitName: "Kg",
      qtyOfUnit: 1,
      mrp: "₹140.00",
      createDate: "08/07/2025"
    },
    {
      category: "Food",
      subCategory: "GROCERY",
      itemName: "Hing Powder",
      unitName: "Kg",
      subUnitName: "Gram",
      qtyOfUnit: 1,
      mrp: "₹380.00",
      createDate: "03/05/2025"
    },
    {
      category: "SABJI",
      subCategory: "SABJI",
      itemName: "LEMON",
      unitName: "Kg",
      subUnitName: "Kg",
      qtyOfUnit: 1,
      mrp: "₹0.00",
      createDate: "10/15/2025"
    }
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
      padding: '16px 18px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    pageHeader: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '12px 18px',
      marginBottom: '16px',
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
    actionBtnsTop: {
      marginLeft: 'auto',
      display: 'flex',
      gap: '7px'
    },
    btnAdd: {
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 500,
      padding: '6px 16px'
    },
    topButtons: {
      background: 'none',
      color: '#4CAF50',
      border: 'none',
      marginLeft: '3px',
      fontSize: '18px',
      cursor: 'pointer'
    },
    filterRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '9px 14px',
      alignItems: 'center',
      background: '#fff',
      borderRadius: '0 0 5px 5px',
      padding: '15px 18px 9px 6px',
      marginBottom: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.07)'
    },
    filterLabel: {
      minWidth: '72px',
      fontSize: '12px',
      color: '#333'
    },
    filterInput: {
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      background: '#fff',
      minWidth: '135px'
    },
    filterMiniInput: {
      padding: '4px 5px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '60px',
      background: '#fff',
      fontSize: '13px'
    },
    filterBtn: {
      background: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "7px 28px",
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
      borderBottom: '1px solid #eee',
      whiteSpace: 'nowrap'
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
    <div style={styles.layout}>
      <PosSidebar />
      <div style={styles.page}>
        <div style={styles.container}>
          {/* Page header */}
          <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>📦</div>
            <span style={styles.pageTitle}>Item Details</span>
            <div style={styles.actionBtnsTop}>
              <button style={styles.btnAdd}>Item Add</button>
              <button style={styles.topButtons} title="Excel">
                <span role="img" aria-label="export">🟩</span>
              </button>
              <button style={styles.topButtons} title="Delete">
                <span role="img" aria-label="delete">🟥</span>
              </button>
            </div>
          </div>
          {/* Filter Search Row */}
          <div style={styles.filterRow}>
            <label style={styles.filterLabel}>Category</label>
            <select
              style={styles.filterInput}
              value={filters.category}
              onChange={e => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="SABJI">SABJI</option>
            </select>
            <label style={styles.filterLabel}>Sub Category</label>
            <select
              style={styles.filterInput}
              value={filters.subCategory}
              onChange={e => setFilters({ ...filters, subCategory: e.target.value })}
            >
              <option value="">Select Sub Category</option>
              <option value="GROCERY">GROCERY</option>
              <option value="SABJI">SABJI</option>
              <option value="Food">Food</option>
            </select>
            <label style={styles.filterLabel}>Item</label>
            <select
              style={styles.filterInput}
              value={filters.item}
              onChange={e => setFilters({ ...filters, item: e.target.value })}
            >
              <option value="">Select Item</option>
            </select>
            <label style={styles.filterLabel}>Tax</label>
            <select
              style={styles.filterInput}
              value={filters.tax}
              onChange={e => setFilters({ ...filters, tax: e.target.value })}
            >
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Item Type</label>
            <select
              style={styles.filterInput}
              value={filters.itemType}
              onChange={e => setFilters({ ...filters, itemType: e.target.value })}
            >
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Inventory Type</label>
            <select
              style={styles.filterInput}
              value={filters.inventoryType}
              onChange={e => setFilters({ ...filters, inventoryType: e.target.value })}
            >
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Item Code</label>
            <input
              style={styles.filterInput}
              value={filters.itemCode}
              onChange={e => setFilters({ ...filters, itemCode: e.target.value })}
              placeholder="Item Code"
            />
            <label style={styles.filterLabel}>Price From</label>
            <input
              style={styles.filterMiniInput}
              type="number"
              min={0}
              value={filters.priceFrom}
              onChange={e => setFilters({ ...filters, priceFrom: e.target.value })}
            />
            <label style={styles.filterLabel}>Price To</label>
            <input
              style={styles.filterMiniInput}
              type="number"
              min={0}
              value={filters.priceTo}
              onChange={e => setFilters({ ...filters, priceTo: e.target.value })}
            />
            <button style={styles.filterBtn}>Search</button>
          </div>
          {/* Table */}
          <div style={styles.dataTableContainer}>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Sub Category</th>
                  <th style={styles.th}>Item Name</th>
                  <th style={styles.th}>Unit Name</th>
                  <th style={styles.th}>Sub Unit Name</th>
                  <th style={styles.th}>Qty Of Unit</th>
                  <th style={styles.th}>Mrp</th>
                  <th style={styles.th}>Create Date</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row, idx) => (
                  <tr key={idx}>
                    <td style={styles.td}>{row.category}</td>
                    <td style={styles.td}>{row.subCategory}</td>
                    <td style={styles.td}>{row.itemName}</td>
                    <td style={styles.td}>{row.unitName}</td>
                    <td style={styles.td}>{row.subUnitName}</td>
                    <td style={styles.td}>{row.qtyOfUnit}</td>
                    <td style={styles.td}>{row.mrp}</td>
                    <td style={styles.td}>{row.createDate}</td>
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
            opacity: 0.88;
          }
        `}</style>
      </div>
    </div>
  );
}
