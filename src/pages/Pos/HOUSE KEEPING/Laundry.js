import React, { useState } from 'react';
import "../../../assets/css/commanPage.css";
import PosSidebar from "../../../components/sidebar/Possidebar";

const defaultLaundry = [
  { id: 'L001', item: 'Bedsheet', status: 'Pending' },
  { id: 'L002', item: 'Towel', status: 'Completed' },
  { id: 'L003', item: 'Pillow Cover', status: 'Pending' }
];

const Laundry = () => {
  const [laundryItems, setLaundryItems] = useState(defaultLaundry);
  const [search, setSearch] = useState("");

  const filtered = laundryItems.filter(
    (row) =>
      row.id.toLowerCase().includes(search.toLowerCase()) ||
      row.item.toLowerCase().includes(search.toLowerCase()) ||
      row.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bar-page-container min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className="sidebar left flex flex-col p-2"
        style={{
          width: 180,
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
              width: "100%",
              marginBottom: 4
            }}
          >
            Laundry
          </button>
        </div>
        <input
          type="text"
          placeholder="Search laundry..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-2 my-2 border rounded text-sm"
        />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 px-7 py-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ fontWeight: 700, fontSize: 20 }}>Laundry Service</h2>
          <div style={{ display: "flex", gap: 16 }}>
            <span className="text-gray-700 text-sm">Today: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
        {/* Laundry List */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 30 }}>
          {filtered.length === 0 ? (
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
              No Laundry Found
            </div>
          ) : filtered.map((entry) => (
            <div
              key={entry.id}
              style={{
                width: 220,
                minHeight: 100,
                background: "#FFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 2px #d1d5db44",
                fontSize: 16,
                fontWeight: 500
              }}
            >
              <div style={{ fontWeight: 700 }}>{entry.item}</div>
              <div>ID: {entry.id}</div>
              <div>Status: <span style={{ color: entry.status === 'Completed' ? "#16a34a" : "#B91C1C" }}>{entry.status}</span></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Laundry;
