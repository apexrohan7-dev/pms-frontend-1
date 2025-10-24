import React, { useState } from 'react';
import "../../assets/css/commanPage.css";
import PosSidebar from '../../components/sidebar/Possidebar';

export default function Bar() {
  // Bar table data
  const [tables] = useState([]); // Empty to show "No Table Found"
  const [stats] = useState({
    currentOrderValue: 0,
    totalSettlementValue: 0,
  });

  return (
    <div className="page" style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
      <PosSidebar />

      <div className="res-wrap">
        {/* Topbar */}
        <div className="res-topbar" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 18px", borderBottom: "1px solid #eee"
        }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: "#1a2971" }}>Bar Management</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontSize: 13 }}>{new Date().toLocaleDateString()}</span>
            <a href="/merge-table" className="text-blue-700 font-semibold text-sm">Merge Table</a>
            <a href="/booking-form" className="text-blue-700 font-semibold text-sm">Booking Form</a>
            <span style={{ color: "#444", fontSize: 13 }}>Void Table (0)</span>
            <span style={{ color: "#267314", fontSize: 13 }}>Available (0)</span>
            <span style={{ color: "#C82333", fontSize: 13 }}>Running (0)</span>
            <span style={{ color: "#16bcff", fontSize: 13 }}>Settl. Pending (0)</span>
          </div>
        </div>

        {/* Main Panels */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "210px 1fr",
          gap: 20,
          marginTop: 24
        }}>
          {/* Sidebar panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{
                background: "#C82333", color: "#fff", fontWeight: 600, border: "none",
                borderRadius: 3, padding: "8px 0", flex: 1
              }}>
                Orders 0
              </button>
              <button style={{
                background: "#C82333", color: "#fff", fontWeight: 600, border: "none",
                borderRadius: 3, padding: "8px 0", flex: 1
              }}>
                Current
              </button>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border rounded text-sm"
            />
            <div className="bg-red-700 text-white mb-2 p-2 rounded mt-4">
              Current Order Value :
              <div className="text-lg font-bold mt-1">₹{stats.currentOrderValue.toFixed(2)}</div>
            </div>
            <div className="bg-red-700 text-white p-2 rounded">
              Total Settlement Value :
              <div className="text-lg font-bold mt-1">₹{stats.totalSettlementValue.toFixed(2)}</div>
            </div>
          </div>
          {/* Main Table/View panel */}
          <div style={{ minHeight: 140 }}>
            {/* In the future, map and display table items here */}
            {tables.length === 0 && (
              <div style={{
                minWidth: 230,
                minHeight: 110,
                background: "#e5eaee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 4,
                borderBottom: "2px solid #222"
              }}>
                No Table Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
