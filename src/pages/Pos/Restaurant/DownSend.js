// src/pages/POS/DownSend.js
import React, { useState, useEffect } from "react";
import { apiFetch } from "../../../lib/api";
import "../../../assets/css/commanPage.css";
import PosSidebar from "../../../components/sidebar/Possidebar";

export default function DownSend() {
  // Order type state
  const [orderType, setOrderType] = useState("table"); // table, room, takeaway, homedelivery
  const [currentOrderValue, setCurrentOrderValue] = useState(0);
  const [totalSettlement, setTotalSettlement] = useState(0);
  
  // Table/Room data
  const [tables, setTables] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Sidebar state - automatically syncs with PosSidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    ordersCount: 0,
    voidTable: 0,
    available: 11,
    running: 0,
    settPending: 0
  });

  // Load tables
  useEffect(() => {
    loadTables();
  }, []);

  // Load rooms when room type is selected
  useEffect(() => {
    if (orderType === "room") {
      loadRooms();
    }
  }, [orderType]);

  // Listen for sidebar collapse state changes
  useEffect(() => {
    const handleSidebarChange = () => {
      const sidebar = document.querySelector('.rsb');
      if (sidebar) {
        setSidebarCollapsed(sidebar.classList.contains('rsb--mini'));
      }
    };

    // Initial check
    handleSidebarChange();

    // Create observer for sidebar class changes
    const observer = new MutationObserver(handleSidebarChange);
    const sidebar = document.querySelector('.rsb');
    
    if (sidebar) {
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    return () => observer.disconnect();
  }, []);

  const loadTables = async () => {
    try {
      const res = await apiFetch("/api/tables?limit=100", { auth: true });
      const data = res?.data || res || [];
      setTables(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load tables:", error);
    }
  };

  const loadRooms = async () => {
    try {
      const res = await apiFetch("/api/rooms?limit=100", { auth: true });
      const data = res?.data || res || [];
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load rooms:", error);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    // Load order details for this table/room
    // You can implement order loading logic here
  };

  const getDisplayItems = () => {
    switch (orderType) {
      case "table":
        return tables.length > 0 ? tables : Array.from({ length: 11 }, (_, i) => ({ id: i + 1, number: i + 1, status: "void" }));
      case "room":
        return rooms.length > 0 ? rooms : Array.from({ length: 11 }, (_, i) => ({ id: i + 1, number: i + 1, status: "void" }));
      default:
        return [];
    }
  };

  return (
    <div className="downsend-layout">
      {/* Main POS Sidebar from component */}
      <PosSidebar />

      {/* Page Container - automatically adjusts based on sidebar state */}
      <div className={`downsend-page ${sidebarCollapsed ? 'sidebar-mini' : ''}`}>
        {/* Order Management Sidebar */}
        <div className="pos-order-sidebar">
          <div className="pos-header">
            <div className="orders-badge">
              <span className="orders-count">Orders {stats.ordersCount}</span>
              <span className="separator">|</span>
              <span className="current-label">Current</span>
            </div>
          </div>

          {/* Order Type Buttons */}
          <div className="order-type-tabs">
            <button
              className={`order-tab ${orderType === "table" ? "active" : ""}`}
              onClick={() => setOrderType("table")}
              style={{ background: orderType === "table" ? "var(--accent-blue)" : "var(--muted)" }}
            >
              Table
            </button>
            <button
              className={`order-tab ${orderType === "room" ? "active" : ""}`}
              onClick={() => setOrderType("room")}
              style={{ background: orderType === "room" ? "var(--success)" : "var(--muted)" }}
            >
              Room
            </button>
            <button
              className={`order-tab ${orderType === "takeaway" ? "active" : ""}`}
              onClick={() => setOrderType("takeaway")}
              style={{ background: orderType === "takeaway" ? "var(--danger)" : "var(--muted)" }}
            >
              Takeaway
            </button>
            <button
              className={`order-tab ${orderType === "homedelivery" ? "active" : ""}`}
              onClick={() => setOrderType("homedelivery")}
              style={{ background: orderType === "homedelivery" ? "var(--sky-blue)" : "var(--muted)" }}
            >
              Homedelivery
            </button>
          </div>

          {/* NC Label */}
          <div className="nc-label">NC</div>

          {/* Order Values */}
          <div className="order-values">
            <div className="value-item">
              <span className="value-label">Current Order Value :</span>
              <span className="value-amount">₹{currentOrderValue.toFixed(2)}</span>
            </div>
            <div className="value-item">
              <span className="value-label">Total Settlement Value :</span>
              <span className="value-amount">₹{totalSettlement.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="downsend-content">
          {/* Top Navigation */}
          <div className="top-nav">
            <div className="nav-links">
              <a href="/merge-table" className="nav-link">Merge Table</a>
              <a href="/booking-form" className="nav-link">Booking Form</a>
            </div>
            <div className="nav-stats">
              <span className="stat-item">Void Table ({stats.voidTable})</span>
              <span className="stat-item">Available ({stats.available})</span>
              <span className="stat-item running">Running ({stats.running})</span>
              <span className="stat-item pending">Settl. Pending ({stats.settPending})</span>
            </div>
          </div>

          {/* Tables/Rooms Grid */}
          <div className="items-grid">
            {orderType === "table" || orderType === "room" ? (
              getDisplayItems().map((item) => (
                <div
                  key={item.id || item.number}
                  className={`grid-item ${item.status || "void"} ${selectedItem?.id === item.id ? "selected" : ""}`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="item-number">{item.number}</div>
                  <div className="item-details">
                    {item.orderValue && (
                      <div className="item-order">₹{item.orderValue.toFixed(2)}</div>
                    )}
                    {item.guestName && (
                      <div className="item-guest">{item.guestName}</div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-grid-message">
                <h3>{orderType === "takeaway" ? "Takeaway Orders" : "Home Delivery Orders"}</h3>
                <p>Orders will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}