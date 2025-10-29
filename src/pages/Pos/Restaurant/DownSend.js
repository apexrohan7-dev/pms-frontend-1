// src/pages/POS/DownSend.js
import React, { useState, useEffect, useCallback } from "react";
import { apiFetch } from "../../../lib/api";
import "../../../assets/css/commanPage.css";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

export default function DownSend() {
  // Order type state
  const [orderType, setOrderType] = useState("table");
  const [currentOrderValue, setCurrentOrderValue] = useState(0);
  const [totalSettlement, setTotalSettlement] = useState(0);
  
  // Table/Room data
  const [tables, setTables] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // UI States
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Filter state
  const [filter, setFilter] = useState("all"); // all, available, running, pending
  
  // Stats
  const [stats, setStats] = useState({
    ordersCount: 0,
    voidTable: 0,
    available: 11,
    running: 0,
    settPending: 0
  });

  // Real-time updates interval
  const [refreshInterval, setRefreshInterval] = useState(null);

  // Show toast notification
  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Load tables
  const loadTables = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/tables?limit=100");
      const data = res?.data || res || [];
      const tableData = Array.isArray(data) ? data : [];
      
      setTables(tableData);
      
      // Calculate stats
      const newStats = {
        ordersCount: tableData.filter(t => t.status === "running").length,
        voidTable: tableData.filter(t => t.status === "void").length,
        available: tableData.filter(t => t.status === "available").length,
        running: tableData.filter(t => t.status === "running").length,
        settPending: tableData.filter(t => t.status === "pending").length
      };
      setStats(newStats);
      
    } catch (error) {
      console.error("Failed to load tables:", error);
      showToast("Failed to load tables", "error");
      // Fallback to dummy data
      const dummyTables = Array.from({ length: 11 }, (_, i) => ({
        id: i + 1,
        number: i + 1,
        status: "available"
      }));
      setTables(dummyTables);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Load rooms
  const loadRooms = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/rooms?limit=100");
      const data = res?.data || res || [];
      const roomData = Array.isArray(data) ? data : [];
      
      setRooms(roomData);
      
      // Calculate stats for rooms
      const newStats = {
        ordersCount: roomData.filter(r => r.status === "running").length,
        voidTable: roomData.filter(r => r.status === "void").length,
        available: roomData.filter(r => r.status === "available").length,
        running: roomData.filter(r => r.status === "running").length,
        settPending: roomData.filter(r => r.status === "pending").length
      };
      setStats(newStats);
      
    } catch (error) {
      console.error("Failed to load rooms:", error);
      showToast("Failed to load rooms", "error");
      // Fallback to dummy data
      const dummyRooms = Array.from({ length: 11 }, (_, i) => ({
        id: i + 1,
        number: i + 1,
        status: "available"
      }));
      setRooms(dummyRooms);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Load order details for selected item
  const loadOrderDetails = useCallback(async (item) => {
    if (!item || item.status === "void" || item.status === "available") {
      setCurrentOrderValue(0);
      return;
    }

    try {
      const endpoint = orderType === "table" 
        ? `/api/orders/table/${item.id}`
        : `/api/orders/room/${item.id}`;
      
      const res = await apiFetch(endpoint);
      const orderData = res?.data || res;
      
      if (orderData) {
        setCurrentOrderValue(orderData.totalAmount || 0);
        setTotalSettlement(orderData.settlementAmount || 0);
      }
    } catch (error) {
      console.error("Failed to load order details:", error);
      setCurrentOrderValue(0);
      setTotalSettlement(0);
    }
  }, [orderType]);

  // Handle item click
  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    loadOrderDetails(item);
    
    // Close mobile menu when item selected
    if (window.innerWidth <= 640) {
      setMobileMenuOpen(false);
    }
  }, [loadOrderDetails]);

  // Get display items based on order type and filter
  const getDisplayItems = useCallback(() => {
    let items = [];
    
    switch (orderType) {
      case "table":
        items = tables.length > 0 ? tables : Array.from({ length: 11 }, (_, i) => ({
          id: i + 1,
          number: i + 1,
          status: "available"
        }));
        break;
      case "room":
        items = rooms.length > 0 ? rooms : Array.from({ length: 11 }, (_, i) => ({
          id: i + 1,
          number: i + 1,
          status: "available"
        }));
        break;
      default:
        return [];
    }
    
    // Apply filter
    if (filter !== "all") {
      items = items.filter(item => item.status === filter);
    }
    
    return items;
  }, [orderType, tables, rooms, filter]);

  // Setup real-time updates
  useEffect(() => {
    // Initial load
    if (orderType === "table") {
      loadTables();
    } else if (orderType === "room") {
      loadRooms();
    }

    // Setup interval for real-time updates (every 30 seconds)
    const interval = setInterval(() => {
      if (orderType === "table") {
        loadTables();
      } else if (orderType === "room") {
        loadRooms();
      }
    }, 30000);

    setRefreshInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [orderType, loadTables, loadRooms]);

  // Listen for sidebar collapse state changes
  useEffect(() => {
    const handleSidebarChange = () => {
      const sidebar = document.querySelector('.rsb');
      if (sidebar) {
        setSidebarCollapsed(sidebar.classList.contains('rsb--mini'));
      }
    };

    handleSidebarChange();

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

  // Handle order type change
  const handleOrderTypeChange = useCallback((type) => {
    setOrderType(type);
    setSelectedItem(null);
    setCurrentOrderValue(0);
    setTotalSettlement(0);
    setFilter("all");
  }, []);

  // Manual refresh
  const handleRefresh = useCallback(() => {
    if (orderType === "table") {
      loadTables();
    } else if (orderType === "room") {
      loadRooms();
    }
    showToast("Data refreshed", "success");
  }, [orderType, loadTables, loadRooms, showToast]);

  // Create new order
  const handleCreateOrder = useCallback(async () => {
    if (!selectedItem) {
      showToast("Please select a table/room first", "error");
      return;
    }

    if (selectedItem.status !== "available" && selectedItem.status !== "void") {
      showToast("This table/room is already occupied", "error");
      return;
    }

    try {
      const endpoint = orderType === "table" 
        ? "/api/orders/table"
        : "/api/orders/room";
      
      await apiFetch(endpoint, {
        method: "POST",
        body: {
          itemId: selectedItem.id,
          itemNumber: selectedItem.number,
          orderType
        }
      });

      showToast("Order created successfully", "success");
      handleRefresh();
    } catch (error) {
      console.error("Failed to create order:", error);
      showToast("Failed to create order", "error");
    }
  }, [selectedItem, orderType, showToast, handleRefresh]);

  // Settle order
  const handleSettleOrder = useCallback(async () => {
    if (!selectedItem || selectedItem.status !== "running") {
      showToast("No active order to settle", "error");
      return;
    }

    try {
      const endpoint = orderType === "table"
        ? `/api/orders/table/${selectedItem.id}/settle`
        : `/api/orders/room/${selectedItem.id}/settle`;
      
      await apiFetch(endpoint, {
        method: "POST"
      });

      showToast("Order settled successfully", "success");
      setSelectedItem(null);
      setCurrentOrderValue(0);
      setTotalSettlement(0);
      handleRefresh();
    } catch (error) {
      console.error("Failed to settle order:", error);
      showToast("Failed to settle order", "error");
    }
  }, [selectedItem, orderType, showToast, handleRefresh]);

  const displayItems = getDisplayItems();

  return (
    <div className="container">
      <PosTopbar />
      
      {/* Toast Notifications */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="downsend-layout">
        <PosSidebar />

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <div className={`downsend-page ${sidebarCollapsed ? 'sidebar-mini' : ''}`}>
          {/* Order Management Sidebar */}
          <div className={`pos-order-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
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
                onClick={() => handleOrderTypeChange("table")}
                style={{ background: orderType === "table" ? "var(--accent-blue)" : "var(--muted)" }}
              >
                Table
              </button>
              <button
                className={`order-tab ${orderType === "room" ? "active" : ""}`}
                onClick={() => handleOrderTypeChange("room")}
                style={{ background: orderType === "room" ? "var(--success)" : "var(--muted)" }}
              >
                Room
              </button>
              <button
                className={`order-tab ${orderType === "takeaway" ? "active" : ""}`}
                onClick={() => handleOrderTypeChange("takeaway")}
                style={{ background: orderType === "takeaway" ? "var(--danger)" : "var(--muted)" }}
              >
                Takeaway
              </button>
              <button
                className={`order-tab ${orderType === "homedelivery" ? "active" : ""}`}
                onClick={() => handleOrderTypeChange("homedelivery")}
                style={{ background: orderType === "homedelivery" ? "var(--sky-blue)" : "var(--muted)" }}
              >
                Home Delivery
              </button>
            </div>

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

            {/* Order Actions */}
            <div className="order-actions">
              <button 
                className="action-btn primary"
                onClick={handleCreateOrder}
                disabled={!selectedItem || (selectedItem.status !== "available" && selectedItem.status !== "void")}
              >
                New Order
              </button>
              <button 
                className="action-btn secondary"
                onClick={handleSettleOrder}
                disabled={!selectedItem || selectedItem.status !== "running"}
              >
                Settle
              </button>
              <button 
                className="action-btn secondary"
                onClick={handleRefresh}
              >
                Refresh
              </button>
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
                <span className="stat-item">Void ({stats.voidTable})</span>
                <span className="stat-item">Available ({stats.available})</span>
                <span className="stat-item running">Running ({stats.running})</span>
                <span className="stat-item pending">Settl. Pending ({stats.settPending})</span>
              </div>
            </div>

            {/* Filter Controls */}
            {(orderType === "table" || orderType === "room") && (
              <div className="filter-controls">
                <button
                  className={`filter-btn ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${filter === "available" ? "active" : ""}`}
                  onClick={() => setFilter("available")}
                >
                  Available
                </button>
                <button
                  className={`filter-btn ${filter === "running" ? "active" : ""}`}
                  onClick={() => setFilter("running")}
                >
                  Running
                </button>
                <button
                  className={`filter-btn ${filter === "pending" ? "active" : ""}`}
                  onClick={() => setFilter("pending")}
                >
                  Pending
                </button>
              </div>
            )}

            {/* Tables/Rooms Grid */}
            <div className="items-grid">
              {loading && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                </div>
              )}

              {orderType === "table" || orderType === "room" ? (
                displayItems.length > 0 ? (
                  displayItems.map((item) => (
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
                  <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <h3>No {orderType}s found</h3>
                    <p>No {orderType}s match the selected filter</p>
                  </div>
                )
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    {orderType === "takeaway" ? "🛍️" : "🚚"}
                  </div>
                  <h3>{orderType === "takeaway" ? "Takeaway Orders" : "Home Delivery Orders"}</h3>
                  <p>Orders will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
