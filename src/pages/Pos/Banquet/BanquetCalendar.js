// src/pages/POS/Banquet/BanquetCalendar.js
import React, { useState, useEffect } from "react";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function BanquetCalendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarDays, setCalendarDays] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Table row data (implement logic for dynamic rows)
  const [rows, setRows] = useState([]);

  // Generate 15-day slot starting from selected or today
  useEffect(() => {
    const base = selectedDate ? new Date(selectedDate) : new Date();
    const days = [];
    for (let i = 0; i < 15; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      days.push({
        date: d,
        label: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", weekday: "short" }),
      });
    }
    setCalendarDays(days);
  }, [selectedDate]);

  useEffect(() => {
    const handleSidebarChange = () => {
      const sidebar = document.querySelector(".rsb");
      if (sidebar) setSidebarCollapsed(sidebar.classList.contains("rsb--mini"));
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

  // Table/page styles
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
      marginBottom: '16px',
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
      fontSize: '22px',
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
    controlBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "10px",
      marginBottom: "10px",
      paddingRight: "8px"
    },
    dateInput: {
      padding: "4px 10px",
      fontSize: "15px",
      borderRadius: 4,
      border: "1px solid #aaa"
    },
    goBtn: {
      border: "none",
      background: "#1976d2",
      color: "#fff",
      borderRadius: 4,
      padding: "6px 20px",
      fontSize: "16px",
      fontWeight: 500,
      cursor: "pointer"
    },
    calendarTableContainer: {
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      marginTop: "10px"
    },
    calendarTable: {
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: "fixed"
    },
    th: {
      background: "#444",
      color: "#fff",
      fontWeight: 600,
      padding: "8px 4px",
      fontSize: "14px",
      borderRight: "1px solid #222"
    },
    td: {
      minWidth: 80,
      border: "1px solid #eee",
      textAlign: "center",
      padding: "6px",
      fontSize: "15px"
    },
    venueCol: { width: 180 },
    sessionCol: { width: 130 }
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
            <div style={styles.pageIcon}>📅</div>
            <span style={styles.pageTitle}>Banquet Calendar</span>
            {/* <span style={styles.headerInfo}>Switch Branch : TRUSTIFYEDGE (Jaipur)</span>
            <span style={styles.headerInfo}>Apr 1 2025-Mar 31 2026</span>
            <span style={styles.headerInfo}>51341 Buser</span>
            <span style={styles.headerInfo}>Today: Oct 07 2025 15:24:25</span>
            <button style={styles.btnAudit}>Audit</button>
            <button style={styles.btnClose}>⚙</button> */}
          </div>
          {/* Filters / Control Bar */}
          <div style={styles.controlBar}>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              style={styles.dateInput}
            />
            <button style={styles.goBtn}>Go</button>
          </div>
          {/* Calendar Table */}
          <div style={styles.calendarTableContainer}>
            <table style={styles.calendarTable}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, ...styles.venueCol }}>Venue Name</th>
                  <th style={{ ...styles.th, ...styles.sessionCol }}>Session Type</th>
                  {calendarDays.map((d, idx) => (
                    <th style={styles.th} key={idx}>{d.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Calendar grid: dynamically show rows as needed */}
                {/* Example row:
                <tr>
                  <td style={styles.td}>Hall A</td>
                  <td style={styles.td}>Evening</td>
                  {calendarDays.map(() => (
                    <td style={styles.td}></td>
                  ))}
                </tr>
                */}
              </tbody>
            </table>
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
