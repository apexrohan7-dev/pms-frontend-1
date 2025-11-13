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


// import React, { useState, useEffect, useCallback } from "react";
// import PosSidebar from "../../../components/sidebar/Possidebar";
// import PosTopbar from "../../../components/layout/postopbar";
// import { apiFetch } from "../../../lib/api";

// export default function PrinterSettings() {
//   const [department, setDepartment] = useState("");
//   const [subDepartment, setSubDepartment] = useState("");
//   const [outlet, setOutlet] = useState("");
//   const [printerType, setPrinterType] = useState("");
//   const [billPrinter, setBillPrinter] = useState("");
//   const [backupPrinter, setBackupPrinter] = useState("");
//   const [dynamicOptions] = useState([
//     "Normal Print",
//     "Bill A3",
//     "Bill A5",
//     "Bill A4 Double",
//     "Bill A3(70MM)",
//     "Bill A2",
//     "Bill A4 Half",
//   ]);
//   const [selectedOption, setSelectedOption] = useState("Normal Print");
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Dropdown options loaded from API
//   const [departments, setDepartments] = useState([]);
//   const [subDepartments, setSubDepartments] = useState([]);
//   const [outlets, setOutlets] = useState([]);
//   const [printerTypes, setPrinterTypes] = useState([]);
//   const [billPrinters, setBillPrinters] = useState([]);
//   const [backupPrinters, setBackupPrinters] = useState([]);

//   // Existing settings data for editing
//   const [kotPrinterData, setKotPrinterData] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       setLoading(true);
//       try {
//         const [deptRes, outletRes, printerTypeRes, billPrinterRes, backupPrinterRes, existingSettingsRes] = await Promise.all([
//           apiFetch("/api/settings/departments"),
//           apiFetch("/api/settings/outlets"),
//           apiFetch("/api/settings/printer-types"),
//           apiFetch("/api/settings/bill-printers"),
//           apiFetch("/api/settings/backup-printers"),
//           apiFetch("/api/settings/kot-printer-settings")
//         ]);

//         if (deptRes.success) setDepartments(deptRes.data || []);
//         if (outletRes.success) setOutlets(outletRes.data || []);
//         if (printerTypeRes.success) setPrinterTypes(printerTypeRes.data || []);
//         if (billPrinterRes.success) setBillPrinters(billPrinterRes.data || []);
//         if (backupPrinterRes.success) setBackupPrinters(backupPrinterRes.data || []);
//         if (existingSettingsRes.success) setKotPrinterData(existingSettingsRes.data || []);
//       } catch (error) {
//         console.error("Failed to load settings data", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []);

//   useEffect(() => {
//     const fetchSubDepartments = async () => {
//       if (!department) {
//         setSubDepartments([]);
//         return;
//       }
//       try {
//         const response = await apiFetch(`/api/settings/departments/${department}/subdepartments`);
//         if (response.success) setSubDepartments(response.data || []);
//       } catch (err) {
//         console.error("Failed to load subdepartments", err);
//         setSubDepartments([]);
//       }
//     };
//     fetchSubDepartments();
//   }, [department]);

//   useEffect(() => {
//     const handleSidebarChange = () => {
//       const sidebar = document.querySelector(".rsb");
//       if (sidebar) setSidebarCollapsed(sidebar.classList.contains("rsb--mini"));
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

//   const handleSave = useCallback(async () => {
//     setSaving(true);
//     try {
//       const payload = {
//         department,
//         subDepartment,
//         outlet,
//         printerType,
//         billPrinter,
//         backupPrinter,
//         dynamicPrintOption: selectedOption,
//       };

//       const response = await apiFetch("/api/settings/printer", {
//         method: "POST",
//         body: JSON.stringify(payload),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.success) {
//         alert("Settings saved successfully!");
//       } else {
//         throw new Error(response.message || "Failed to save settings");
//       }
//     } catch (err) {
//       console.error("Save failed", err);
//       alert(err.message || "Failed to save printer settings");
//     } finally {
//       setSaving(false);
//     }
//   }, [department, subDepartment, outlet, printerType, billPrinter, backupPrinter, selectedOption]);

//   const handleReset = () => {
//     setDepartment("");
//     setSubDepartment("");
//     setOutlet("");
//     setPrinterType("");
//     setBillPrinter("");
//     setBackupPrinter("");
//     setSelectedOption("Normal Print");
//   };

//   const styles = {
//     layout: {
//       display: 'flex',
//       minHeight: '100vh',
//       backgroundColor: '#f5f5f5'
//     },
//     page: {
//       flexGrow: 1,
//       marginLeft: sidebarCollapsed ? '60px' : '240px',
//       transition: 'margin-left 0.3s ease',
//       padding: 0
//     },
//     container: {
//       padding: '20px',
//       backgroundColor: '#f5f5f5',
//       minHeight: '100vh'
//     },
//     pageHeader: {
//       display: 'flex',
//       alignItems: 'center',
//       backgroundColor: '#fff',
//       padding: '15px 20px',
//       marginBottom: '20px',
//       borderRadius: '5px',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//     },
//     pageIcon: {
//       width: '40px',
//       height: '40px',
//       backgroundColor: '#f0f0f0',
//       borderRadius: '5px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '20px',
//       marginRight: '15px'
//     },
//     pageTitle: {
//       margin: 0,
//       fontSize: '20px',
//       fontWeight: 600,
//       color: '#333'
//     },
//     filterPanel: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       gap: '12px 14px',
//       alignItems: 'center',
//       margin: '16px 0',
//       background: '#fff',
//       borderRadius: '4px',
//       padding: '16px'
//     },
//     filterLabel: { minWidth: '130px', fontSize: '14px', color: '#333' },
//     filterInput: {
//       padding: '6px 10px',
//       border: '1px solid #ccc',
//       borderRadius: '4px',
//       fontSize: '14px',
//       minWidth: '135px'
//     },
//     dynamicBtn: {
//       backgroundColor: '#1976d2',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       padding: '8px 18px',
//       fontWeight: 500,
//       fontSize: '14px',
//       cursor: 'pointer',
//       marginRight: '10px',
//       marginTop: '7px'
//     },
//     barcodeBtn: {
//       backgroundColor: '#0074d9',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       padding: '8px 18px',
//       fontWeight: 500,
//       fontSize: '14px',
//       cursor: 'pointer',
//       marginTop: '7px'
//     },
//     setDefaultBtn: {
//       backgroundColor: '#888',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       padding: '8px 14px',
//       fontWeight: 500,
//       fontSize: '13px',
//       cursor: 'pointer',
//       marginTop: '7px'
//     },
//     radioGroup: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       gap: '16px',
//       margin: '12px 0 0 0'
//     },
//     kotTableContainer: {
//       backgroundColor: '#fff',
//       borderRadius: '5px',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//       marginTop: '22px',
//       padding: '16px'
//     },
//     dataTable: {
//       width: '100%',
//       borderCollapse: 'collapse'
//     },
//     tableHead: {
//       backgroundColor: '#e0e0e0'
//     },
//     th: {
//       padding: '8px 10px',
//       textAlign: 'left',
//       fontSize: '14px',
//       fontWeight: 600,
//       color: '#333',
//       borderBottom: '2px solid #ccc',
//       whiteSpace: 'nowrap'
//     },
//     td: {
//       padding: '8px 10px',
//       fontSize: '14px',
//       color: '#666',
//       borderBottom: '1px solid #eee',
//       whiteSpace: 'nowrap'
//     },
//     btnAudit: {
//       padding: '8px 38px',
//       backgroundColor: '#1976d2',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       fontWeight: 500,
//       fontSize: '15px',
//       cursor: 'pointer',
//       marginTop: '16px',
//       marginRight: '13px'
//     },
//     btnReset: {
//       backgroundColor: '#d32f2f',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       padding: '8px 30px',
//       fontWeight: 500,
//       fontSize: '15px',
//       cursor: 'pointer',
//       marginTop: '16px'
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
//               <div style={styles.pageIcon}>🖨️</div>
//               <span style={styles.pageTitle}>Billing Printer Settings</span>
//             </div>

//             {/* Top Form Inputs */}
//             <div style={styles.filterPanel}>
//               <label style={styles.filterLabel}>Department Name</label>
//               <select
//                 style={styles.filterInput}
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//                 disabled={loading}
//               >
//                 <option value="">Select</option>
//                 {departments.map((d) => (
//                   <option key={d.id} value={d.id}>
//                     {d.name}
//                   </option>
//                 ))}
//               </select>

//               <label style={styles.filterLabel}>Sub Department Name</label>
//               <select
//                 style={styles.filterInput}
//                 value={subDepartment}
//                 onChange={(e) => setSubDepartment(e.target.value)}
//                 disabled={!department || loading}
//               >
//                 <option value="">Select</option>
//                 {subDepartments.map((sd) => (
//                   <option key={sd.id} value={sd.id}>
//                     {sd.name}
//                   </option>
//                 ))}
//               </select>

//               <label style={styles.filterLabel}>Outlet Name</label>
//               <select
//                 style={styles.filterInput}
//                 value={outlet}
//                 onChange={(e) => setOutlet(e.target.value)}
//                 disabled={loading}
//               >
//                 <option value="">Select</option>
//                 {outlets.map((o) => (
//                   <option key={o.id} value={o.id}>
//                     {o.name}
//                   </option>
//                 ))}
//               </select>

//               <label style={styles.filterLabel}>Printer Type</label>
//               <select
//                 style={styles.filterInput}
//                 value={printerType}
//                 onChange={(e) => setPrinterType(e.target.value)}
//                 disabled={loading}
//               >
//                 <option value="">Select</option>
//                 {printerTypes.map((pt) => (
//                   <option key={pt.id} value={pt.id}>
//                     {pt.name}
//                   </option>
//                 ))}
//               </select>

//               <label style={styles.filterLabel}>Bill Printer</label>
//               <select
//                 style={styles.filterInput}
//                 value={billPrinter}
//                 onChange={(e) => setBillPrinter(e.target.value)}
//                 disabled={loading}
//               >
//                 <option value="">Select</option>
//                 {billPrinters.map((bp) => (
//                   <option key={bp.id} value={bp.id}>
//                     {bp.name}
//                   </option>
//                 ))}
//               </select>

//               <label style={styles.filterLabel}>Backup Printer</label>
//               <select
//                 style={styles.filterInput}
//                 value={backupPrinter}
//                 onChange={(e) => setBackupPrinter(e.target.value)}
//                 disabled={loading}
//               >
//                 <option value="">Select</option>
//                 {backupPrinters.map((bp) => (
//                   <option key={bp.id} value={bp.id}>
//                     {bp.name}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 style={styles.setDefaultBtn}
//                 onClick={() => alert("Set Default PC Printer (placeholder)")}
//               >
//                 Set Default pc printer
//               </button>
//               <button
//                 style={styles.dynamicBtn}
//                 onClick={() => alert("Dynamic Print (placeholder)")}
//               >
//                 Dynamic Print
//               </button>
//               <button
//                 style={styles.barcodeBtn}
//                 onClick={() => alert("Barcode Print (placeholder)")}
//               >
//                 Barcode Print
//               </button>
//             </div>

//             {/* Dynamic Radio Button Section */}
//             <div style={styles.radioGroup}>
//               {dynamicOptions.map((opt) => (
//                 <label key={opt}>
//                   <input
//                     type="radio"
//                     checked={selectedOption === opt}
//                     onChange={() => setSelectedOption(opt)}
//                     style={{ marginRight: 6 }}
//                     disabled={loading}
//                   />
//                   {opt}
//                 </label>
//               ))}
//             </div>

//             {/* KOT Printer Settings Table */}
//             <div style={styles.kotTableContainer}>
//               <b style={{ fontSize: 16 }}>Kot Printer Settings</b>
//               <table style={styles.dataTable}>
//                 <thead style={styles.tableHead}>
//                   <tr>
//                     <th style={styles.th}>Reception/Kitchen</th>
//                     <th style={styles.th}>Kot Printer</th>
//                     <th style={styles.th}>Kot Printer1</th>
//                     <th style={styles.th}>Kot Printer2</th>
//                     <th style={styles.th}>Kot Printer3</th>
//                     <th style={styles.th}>Kot Printer4</th>
//                     <th style={styles.th}>Kot Backup Printer</th>
//                     <th style={styles.th}>IP Address(Port 8743)</th>
//                     <th style={styles.th}>Check Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {kotPrinterData.length > 0 ? (
//                     kotPrinterData.map((row, i) => (
//                       <tr key={row.id || i}>
//                         <td style={styles.td}>{row.kitchen}</td>
//                         <td style={styles.td}>{row.kotPrinter}</td>
//                         <td style={styles.td}>{row.kotPrinter2}</td>
//                         <td style={styles.td}>{row.kotPrinter3}</td>
//                         <td style={styles.td}>{row.kotPrinter4}</td>
//                         <td style={styles.td}>{row.backup}</td>
//                         <td style={styles.td}>{row.ip}</td>
//                         <td style={styles.td}>{row.status}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td style={styles.td} colSpan={9}>
//                         No KOT printer settings found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>


//             <div>
//               <button
//                 style={styles.btnAudit}
//                 onClick={handleSave}
//                 disabled={loading || saving}
//               >
//                 {saving ? "Saving..." : "Save"}
//               </button>
//               <button style={styles.btnReset} onClick={handleReset}>
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <style>{`
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
