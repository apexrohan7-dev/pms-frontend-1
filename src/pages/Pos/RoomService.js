import React, { useState } from 'react';
import "../../assets/css/commanPage.css";
import PosSidebar from '../../components/sidebar/Possidebar';

const defaultRooms = [
  { id: '101', label: 'a' },
  { id: '201', label: 'b' },
  { id: '102', label: 'c' },
  { id: '202', label: 'd' },
  { id: '103', label: 'd' },
  { id: '203', label: 'e' },
  { id: '104', label: 'f' },
  { id: '204', label: 'f' }
];

const RoomService = () => {
  const [rooms] = useState(defaultRooms);
  const [stats] = useState({
    currentOrderValue: 80,
    totalSettlementValue: 80
  });

  return (
    <div className="bar-page-container min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className="sidebar left flex flex-col p-2"
        style={{
          width: 150,
          background: "#fff",
          borderRight: "1px solid #eee",
          minHeight: "100vh"
        }}
      >
        <PosSidebar />
        <div className="my-1">
          <button
            className="px-4 py-2 font-semibold"
            style={{
              background: "#C82333",
              color: "#fff",
              border: "none",
              borderRadius: "3px",
              marginRight: 4,
              width: "49%"
            }}
          >
            Orders 0
          </button>
          <button
            className="px-4 py-2 font-semibold"
            style={{
              background: "#C82333",
              color: "#fff",
              border: "none",
              borderRadius: "3px",
              width: "49%"
            }}
          >
            Current
          </button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 my-2 border rounded text-sm"
        />
        <div style={{ background: "#C82333", color: "#fff", marginBottom: 4, padding: 8, borderRadius: 4 }}>
          Current Order Value : <span style={{ float: "right" }}>{stats.currentOrderValue.toFixed(2)}</span>
        </div>
        <div style={{ background: "#C82333", color: "#fff", marginBottom: 4, padding: 8, borderRadius: 4 }}>
          Total Settlement Value : <span style={{ float: "right" }}>{stats.totalSettlementValue.toFixed(2)}</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 px-7 py-6">
        {/* Top Bar */}
        <div className="flex justify-end items-center mb-6" style={{ gap: 16 }}>
          <a href="/merge-table" className="text-blue-700 font-semibold text-sm">Merge Table</a>
          <a href="/booking-form" className="text-blue-700 font-semibold text-sm">Booking Form</a>
          <span className="text-gray-700 text-sm">Void Table (0)</span>
          <span className="text-gray-700 text-sm">Available (8)</span>
          <span className="text-red-600 text-sm">Running (0)</span>
          <span className="text-sky-500 text-sm">Settl. Pending (0)</span>
        </div>
        {/* Rooms Grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 30 }}>
          {rooms.length === 0 ? (
            <div style={{
              minWidth: 225,
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
              No Room Found
            </div>
          ) : rooms.map((room) => (
            <div
              key={room.id}
              style={{
                width: 200,
                minHeight: 90,
                background: "#e5eaee",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                borderBottom: "2px solid #222",
                fontSize: 16,
                fontWeight: 500
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{room.id}</div>
              <div>{room.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RoomService;
