import React, { useState, useEffect, useCallback } from "react";
import "../../../assets/css/commanPage.css";
import { apiFetch } from "../../../lib/api";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

const SwargTrustify = () => {
  const [swargUnits, setSwargUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    held: 0,
    occupied: 0
  });

  // Show toast notification
  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Load SwargTrustify units from API
  const loadSwargUnits = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/swarg/units?limit=100");
      const data = res?.data || res || [];
      const unitsData = Array.isArray(data) ? data : [];
      
      setSwargUnits(unitsData);
      
      // Calculate stats
      const newStats = {
        total: unitsData.length,
        available: unitsData.filter(u => u.status === "Available").length,
        held: unitsData.filter(u => u.status === "Held").length,
        occupied: unitsData.filter(u => u.status === "Occupied").length
      };
      setStats(newStats);
      
    } catch (error) {
      console.error("Failed to load SwargTrustify units:", error);
      showToast("Failed to load units", "error");
      // Fallback to default data
      const defaultSwarg = [
        { id: 1, name: "Ashoka Hall", status: "Available", capacity: 200, rate: 50000 },
        { id: 2, name: "Lotus Suite", status: "Held", capacity: 150, rate: 35000 },
        { id: 3, name: "Harmony Block", status: "Occupied", capacity: 300, rate: 75000 },
        { id: 4, name: "Serenity Garden", status: "Available", capacity: 100, rate: 25000 },
        { id: 5, name: "Royal Pavilion", status: "Available", capacity: 250, rate: 60000 }
      ];
      setSwargUnits(defaultSwarg);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Update unit status
  const updateUnitStatus = useCallback(async (unitId, newStatus) => {
    try {
      await apiFetch(`/api/swarg/units/${unitId}`, {
        method: "PUT",
        body: { status: newStatus }
      });

      showToast("Status updated successfully", "success");
      loadSwargUnits();
    } catch (error) {
      console.error("Failed to update status:", error);
      showToast("Failed to update status", "error");
    }
  }, [showToast, loadSwargUnits]);

  // Book unit
  const handleBookUnit = useCallback(async () => {
    if (!selectedUnit) {
      showToast("Please select a unit first", "error");
      return;
    }

    if (selectedUnit.status !== "Available") {
      showToast("This unit is not available", "error");
      return;
    }

    try {
      await apiFetch("/api/swarg/bookings", {
        method: "POST",
        body: {
          unitId: selectedUnit.id,
          unitName: selectedUnit.name
        }
      });

      showToast("Unit booked successfully", "success");
      loadSwargUnits();
    } catch (error) {
      console.error("Failed to book unit:", error);
      showToast("Failed to book unit", "error");
    }
  }, [selectedUnit, showToast, loadSwargUnits]);

  // Release held unit
  const handleReleaseUnit = useCallback(async () => {
    if (!selectedUnit || selectedUnit.status !== "Held") {
      showToast("No held unit to release", "error");
      return;
    }

    try {
      await apiFetch(`/api/swarg/bookings/${selectedUnit.id}/release`, {
        method: "POST"
      });

      showToast("Unit released successfully", "success");
      setSelectedUnit(null);
      loadSwargUnits();
    } catch (error) {
      console.error("Failed to release unit:", error);
      showToast("Failed to release unit", "error");
    }
  }, [selectedUnit, showToast, loadSwargUnits]);

  // Manual refresh
  const handleRefresh = useCallback(() => {
    loadSwargUnits();
    showToast("Data refreshed", "success");
  }, [loadSwargUnits, showToast]);

  // Handle unit click
  const handleUnitClick = useCallback((unit) => {
    setSelectedUnit(unit);
    
    // Close mobile menu when item selected
    if (window.innerWidth <= 640) {
      setMobileMenuOpen(false);
    }
  }, []);

  // Setup real-time updates
  useEffect(() => {
    loadSwargUnits();
    const interval = setInterval(loadSwargUnits, 30000);
    return () => clearInterval(interval);
  }, [loadSwargUnits]);

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

  // Filter units
  const filteredUnits = swargUnits.filter(unit => {
    const matchesSearch = 
      unit.name.toLowerCase().includes(search.toLowerCase()) ||
      unit.status.toLowerCase().includes(search.toLowerCase()) ||
      (unit.id && unit.id.toString().includes(search));
    
    const matchesFilter = filter === "all" || unit.status === filter;
    
    return matchesSearch && matchesFilter;
  });

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
                <span className="orders-count">Units {stats.total}</span>
                <span className="separator">|</span>
                <span className="current-label">SwargTrustify</span>
              </div>
            </div>

            {/* Search Input */}
            <div style={{ padding: "12px" }}>
              <input
                type="text"
                placeholder="Search units…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.1)",
                  color: "var(--white)",
                  fontSize: "13px"
                }}
              />
            </div>

            <div className="nc-label">SWARG</div>

            {/* Stats Values */}
            <div className="order-values">
              <div className="value-item">
                <span className="value-label">Total Units</span>
                <span className="value-amount">{stats.total}</span>
              </div>
              <div className="value-item">
                <span className="value-label">Available</span>
                <span className="value-amount">{stats.available}</span>
              </div>
              <div className="value-item">
                <span className="value-label">Held</span>
                <span className="value-amount">{stats.held}</span>
              </div>
              <div className="value-item">
                <span className="value-label">Occupied</span>
                <span className="value-amount">{stats.occupied}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="order-actions">
              <button 
                className="action-btn primary"
                onClick={handleBookUnit}
                disabled={!selectedUnit || selectedUnit.status !== "Available"}
              >
                Book Unit
              </button>
              <button 
                className="action-btn secondary"
                onClick={handleReleaseUnit}
                disabled={!selectedUnit || selectedUnit.status !== "Held"}
              >
                Release Held
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
                <h2 style={{ fontWeight: 700, fontSize: 18, color: "var(--primary-blue)", margin: 0 }}>
                  SwargTrustify Management
                </h2>
              </div>
              <div className="nav-stats">
                <span className="stat-item">Total ({stats.total})</span>
                <span className="stat-item">Available ({stats.available})</span>
                <span className="stat-item" style={{ color: "var(--warning)" }}>Held ({stats.held})</span>
                <span className="stat-item running">Occupied ({stats.occupied})</span>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="filter-controls">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === "Available" ? "active" : ""}`}
                onClick={() => setFilter("Available")}
              >
                Available
              </button>
              <button
                className={`filter-btn ${filter === "Held" ? "active" : ""}`}
                onClick={() => setFilter("Held")}
              >
                Held
              </button>
              <button
                className={`filter-btn ${filter === "Occupied" ? "active" : ""}`}
                onClick={() => setFilter("Occupied")}
              >
                Occupied
              </button>
            </div>

            {/* Units Grid */}
            <div className="items-grid">
              {loading && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                </div>
              )}

              {filteredUnits.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🏛️</div>
                  <h3>No Units Found</h3>
                  <p>No units match the selected filter</p>
                </div>
              ) : filteredUnits.map((unit) => (
                <div
                  key={unit.id}
                  className={`grid-item ${unit.status.toLowerCase()} ${selectedUnit?.id === unit.id ? 'selected' : ''}`}
                  onClick={() => handleUnitClick(unit)}
                >
                  <div className="item-number">{unit.name}</div>
                  <div className="item-details">
                    <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600 }}>
                      ID: {unit.id}
                    </div>
                    {unit.capacity && (
                      <div style={{ fontSize: "13px", color: "var(--dark-blue)", fontWeight: 500 }}>
                        Capacity: {unit.capacity}
                      </div>
                    )}
                    {unit.rate && (
                      <div className="item-order">₹{unit.rate.toLocaleString()}</div>
                    )}
                    <div style={{ 
                      fontSize: "12px", 
                      fontWeight: 700,
                      marginTop: "6px",
                      color: unit.status === "Available" ? "var(--success)" : 
                             unit.status === "Held" ? "var(--warning)" : "var(--danger)"
                    }}>
                      {unit.status}
                    </div>
                  </div>
                  
                  {selectedUnit?.id === unit.id && (
                    <div style={{
                      display: "flex",
                      gap: "4px",
                      marginTop: "8px",
                      paddingTop: "8px",
                      borderTop: "1px solid var(--extra-light-blue)",
                      width: "100%",
                      justifyContent: "center"
                    }}>
                      <button 
                        style={{
                          padding: "4px 8px",
                          background: "rgba(5, 150, 105, 0.1)",
                          color: "var(--success)",
                          border: "none",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                        onClick={(e) => { e.stopPropagation(); updateUnitStatus(unit.id, "Available"); }}
                      >
                        Available
                      </button>
                      <button 
                        style={{
                          padding: "4px 8px",
                          background: "rgba(245, 158, 11, 0.1)",
                          color: "var(--warning)",
                          border: "none",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                        onClick={(e) => { e.stopPropagation(); updateUnitStatus(unit.id, "Held"); }}
                      >
                        Hold
                      </button>
                      <button 
                        style={{
                          padding: "4px 8px",
                          background: "rgba(220, 38, 38, 0.1)",
                          color: "var(--danger)",
                          border: "none",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                        onClick={(e) => { e.stopPropagation(); updateUnitStatus(unit.id, "Occupied"); }}
                      >
                        Occupy
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwargTrustify;
