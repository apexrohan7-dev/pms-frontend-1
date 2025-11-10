// src/pages/POS/Settings/PrinterSettings.js
import React, { useState } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function PrinterSettings() {
  const [department, setDepartment] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [outlet, setOutlet] = useState("");
  const [printerType, setPrinterType] = useState("");
  const [billPrinter, setBillPrinter] = useState("");
  const [backupPrinter, setBackupPrinter] = useState("");
  const [dynamicOptions] = useState(["Normal Print", "Bill A3", "Bill A5", "Bill A4 Double", "Bill A3(70MM)", "Bill A2", "Bill A4 Half"]);
  const [selectedOption, setSelectedOption] = useState("Normal Print");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // For mockup table
  const kotPrinterData = [
    {
      kitchen: "Main Kitchen",
      kotPrinter: "Printer 1",
      kotPrinter2: "Printer 2",
      kotPrinter3: "",
      kotPrinter4: "",
      backup: "Printer X",
      ip: "192.168.0.101:8743",
      status: "Active"
    }
    // Add more rows as needed
  ];

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
    filterPanel: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px 14px',
      alignItems: 'center',
      margin: '16px 0',
      background: '#fff',
      borderRadius: '4px',
      padding: '16px'
    },
    filterLabel: { minWidth: '130px', fontSize: '14px', color: '#333' },
    filterInput: {
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      minWidth: '135px'
    },
    dynamicBtn: {
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 18px',
      fontWeight: 500,
      fontSize: '14px',
      cursor: 'pointer',
      marginRight: '10px',
      marginTop: '7px'
    },
    barcodeBtn: {
      backgroundColor: '#0074d9',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 18px',
      fontWeight: 500,
      fontSize: '14px',
      cursor: 'pointer',
      marginTop: '7px'
    },
    setDefaultBtn: {
      backgroundColor: '#888',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 14px',
      fontWeight: 500,
      fontSize: '13px',
      cursor: 'pointer',
      marginTop: '7px'
    },
    radioGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      margin: '12px 0 0 0'
    },
    kotTableContainer: {
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginTop: '22px',
      padding: '16px'
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
      borderBottom: '2px solid #ccc',
      whiteSpace: 'nowrap'
    },
    td: {
      padding: '8px 10px',
      fontSize: '14px',
      color: '#666',
      borderBottom: '1px solid #eee',
      whiteSpace: 'nowrap'
    },
    btnSave: {
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 38px',
      fontWeight: 500,
      fontSize: '15px',
      cursor: 'pointer',
      marginTop: '16px',
      marginRight: '13px'
    },
    btnReset: {
      backgroundColor: '#d32f2f',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 30px',
      fontWeight: 500,
      fontSize: '15px',
      cursor: 'pointer',
      marginTop: '16px'
    }
  };

  return (
    <div className="container">
      <PosTopbar/>
    <div style={styles.layout}>
      <PosSidebar />

      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.pageHeader}>
            <div style={styles.pageIcon}>🖨️</div>
            <span style={styles.pageTitle}>Billing Printer Settings</span>
            {/* <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
            <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
            <span style={styles.headerInfo}>51341 Buser</span>
            <span style={styles.headerInfo}>Today: Oct 07 2025 13:58:44</span>
            <button style={styles.btnAudit}>Audit</button> */}
          </div>

          {/* Top Form Inputs */}
          <div style={styles.filterPanel}>
            <label style={styles.filterLabel}>Department Name</label>
            <select style={styles.filterInput} value={department} onChange={e => setDepartment(e.target.value)}>
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Sub Department Name</label>
            <select style={styles.filterInput} value={subDepartment} onChange={e => setSubDepartment(e.target.value)}>
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Outlet Name</label>
            <select style={styles.filterInput} value={outlet} onChange={e => setOutlet(e.target.value)}>
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Printer Type</label>
            <select style={styles.filterInput} value={printerType} onChange={e => setPrinterType(e.target.value)}>
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Bill Printer</label>
            <select style={styles.filterInput} value={billPrinter} onChange={e => setBillPrinter(e.target.value)}>
              <option value="">Select</option>
            </select>
            <label style={styles.filterLabel}>Backup Printer</label>
            <select style={styles.filterInput} value={backupPrinter} onChange={e => setBackupPrinter(e.target.value)}>
              <option value="">Select</option>
            </select>
            
            <button style={styles.setDefaultBtn}>Set Default pc printer</button>
            <button style={styles.dynamicBtn}>Dynamic Print</button>
            <button style={styles.barcodeBtn}>Barcode Print</button>
          </div>
          
          {/* Dynamic Radio Button Section */}
          <div style={styles.radioGroup}>
            {dynamicOptions.map(opt => (
              <label key={opt}>
                <input
                  type="radio"
                  checked={selectedOption === opt}
                  onChange={() => setSelectedOption(opt)}
                  style={{ marginRight: 6 }}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* KOT Printer Settings Table */}
          <div style={styles.kotTableContainer}>
            <b style={{ fontSize: 16 }}>Kot Printer Settings</b>
            <table style={styles.dataTable}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Reception/Kitchen</th>
                  <th style={styles.th}>Kot Printer</th>
                  <th style={styles.th}>Kot Printer1</th>
                  <th style={styles.th}>Kot Printer2</th>
                  <th style={styles.th}>Kot Printer3</th>
                  <th style={styles.th}>Kot Printer4</th>
                  <th style={styles.th}>Kot Backup Printer</th>
                  <th style={styles.th}>IP Address(Port 8743)</th>
                  <th style={styles.th}>Check Status</th>
                </tr>
              </thead>
              <tbody>
                {kotPrinterData.map((row, i) => (
                  <tr key={i}>
                    <td style={styles.td}>{row.kitchen}</td>
                    <td style={styles.td}>{row.kotPrinter}</td>
                    <td style={styles.td}>{row.kotPrinter2}</td>
                    <td style={styles.td}>{row.kotPrinter3}</td>
                    <td style={styles.td}>{row.kotPrinter4}</td>
                    <td style={styles.td}>{row.backup}</td>
                    <td style={styles.td}>{row.ip}</td>
                    <td style={styles.td}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <button style={styles.btnSave}>Save</button>
            <button style={styles.btnReset}>Reset</button>
          </div>
        </div>
      </div>
      <style>{`
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
