import React, { useState, useEffect, useCallback } from 'react';
import "../../../assets/css/commanPage.css";
import { apiFetch } from "../../../lib/api";
import PosSidebar from "../../../components/sidebar/Possidebar";
import PosTopbar from "../../../components/layout/postopbar";

const Laundry = () => {
  const [laundryItems, setLaundryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, completed, inProgress
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    inProgress: 0
  });

  // Show toast notification
  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Load laundry items from API
  const loadLaundryItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/laundry/items?limit=100");
      const data = res?.data || res || [];
      const itemsData = Array.isArray(data) ? data : [];
      
      setLaundryItems(itemsData);
      
      // Calculate stats
      const newStats = {
        total: itemsData.length,
        pending: itemsData.filter(i => i.status === "Pending").length,
        completed: itemsData.filter(i => i.status === "Completed").length,
        inProgress: itemsData.filter(i => i.status === "In Progress").length
      };
      setStats(newStats);
      
    } catch (error) {
      console.error("Failed to load laundry items:", error);
      showToast("Failed to load laundry items", "error");
      // Fallback to default data
      const defaultLaundry = [
        { id: 'L001', item: 'Bedsheet', status: 'Pending', roomNumber: '101', timestamp: new Date().toISOString() },
        { id: 'L002', item: 'Towel', status: 'Completed', roomNumber: '102', timestamp: new Date().toISOString() },
        { id: 'L003', item: 'Pillow Cover', status: 'Pending', roomNumber: '103', timestamp: new Date().toISOString() },
        { id: 'L004', item: 'Duvet', status: 'In Progress', roomNumber: '104', timestamp: new Date().toISOString() }
      ];
      setLaundryItems(defaultLaundry);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Update laundry status
  const updateStatus = useCallback(async (itemId, newStatus) => {
    try {
      await apiFetch(`/api/laundry/items/${itemId}`, {
        method: "PUT",
        body: { status: newStatus }
      });

      showToast("Status updated successfully", "success");
      loadLaundryItems();
    } catch (error) {
      console.error("Failed to update status:", error);
      showToast("Failed to update status", "error");
    }
  }, [showToast, loadLaundryItems]);

  // Add new laundry item
  const handleAddItem = useCallback(async () => {
    try {
      await apiFetch("/api/laundry/items", {
        method: "POST",
        body: {
          item: "New Item",
          status: "Pending",
          roomNumber: "000"
        }
      });

      showToast("Item added successfully", "success");
      loadLaundryItems();
    } catch (error) {
      console.error("Failed to add item:", error);
      showToast("Failed to add item", "error");
    }
  }, [showToast, loadLaundryItems]);

  // Manual refresh
  const handleRefresh = useCallback(() => {
    loadLaundryItems();
    showToast("Data refreshed", "success");
  }, [loadLaundryItems, showToast]);

  // Handle item click
  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  // Setup real-time updates
  useEffect(() => {
    loadLaundryItems();
    const interval = setInterval(loadLaundryItems, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [loadLaundryItems]);

  // Filter items
  const filtered = laundryItems.filter(row => {
    const matchesSearch = 
      row.id.toLowerCase().includes(search.toLowerCase()) ||
      row.item.toLowerCase().includes(search.toLowerCase()) ||
      row.status.toLowerCase().includes(search.toLowerCase()) ||
      (row.roomNumber && row.roomNumber.toLowerCase().includes(search.toLowerCase()));
    
    const matchesFilter = filter === "all" || row.status === filter;
    
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

      <div className="bar-page-container min-h-screen flex bg-gray-50">
        {/* Sidebar */}
        <aside className="laundry-sidebar">
          <PosSidebar />
          <div className="laundry-sidebar-content">
            <button className="laundry-btn">
              Laundry ({stats.total})
            </button>
            
            <input
              type="text"
              placeholder="Search laundry..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="laundry-search-input"
            />

            <div className="laundry-stats">
              <div className="stat-card">
                <span className="stat-label">Total</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              <div className="stat-card pending">
                <span className="stat-label">Pending</span>
                <span className="stat-value">{stats.pending}</span>
              </div>
              <div className="stat-card completed">
                <span className="stat-label">Completed</span>
                <span className="stat-value">{stats.completed}</span>
              </div>
              <div className="stat-card progress">
                <span className="stat-label">In Progress</span>
                <span className="stat-value">{stats.inProgress}</span>
              </div>
            </div>

            <button className="laundry-action-btn" onClick={handleAddItem}>
              Add Item
            </button>
            <button className="laundry-action-btn" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-7 py-6">
          {/* Top Bar */}
          <div className="laundry-topbar">
            <h2 className="laundry-title">Laundry Service</h2>
            <div className="laundry-topbar-right">
              <span className="date-display">Today: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="filter-controls" style={{ marginBottom: "20px" }}>
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === "Pending" ? "active" : ""}`}
              onClick={() => setFilter("Pending")}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${filter === "In Progress" ? "active" : ""}`}
              onClick={() => setFilter("In Progress")}
            >
              In Progress
            </button>
            <button
              className={`filter-btn ${filter === "Completed" ? "active" : ""}`}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </button>
          </div>

          {/* Laundry List */}
          {loading && <div className="loading-spinner"></div>}
          
          <div className="laundry-grid">
            {filtered.length === 0 ? (
              <div className="no-laundry-msg">
                No Laundry Found
              </div>
            ) : filtered.map((entry) => (
              <div
                key={entry.id}
                className={`laundry-card ${entry.status.toLowerCase().replace(' ', '-')} ${selectedItem?.id === entry.id ? 'selected' : ''}`}
                onClick={() => handleItemClick(entry)}
              >
                <div className="laundry-item-name">{entry.item}</div>
                <div className="laundry-id">ID: {entry.id}</div>
                {entry.roomNumber && (
                  <div className="laundry-room">Room: {entry.roomNumber}</div>
                )}
                <div className="laundry-status">
                  Status: <span className={`status-${entry.status.toLowerCase().replace(' ', '-')}`}>
                    {entry.status}
                  </span>
                </div>
                {selectedItem?.id === entry.id && (
                  <div className="status-actions">
                    <button 
                      className="status-action-btn pending"
                      onClick={(e) => { e.stopPropagation(); updateStatus(entry.id, "Pending"); }}
                    >
                      Pending
                    </button>
                    <button 
                      className="status-action-btn progress"
                      onClick={(e) => { e.stopPropagation(); updateStatus(entry.id, "In Progress"); }}
                    >
                      In Progress
                    </button>
                    <button 
                      className="status-action-btn completed"
                      onClick={(e) => { e.stopPropagation(); updateStatus(entry.id, "Completed"); }}
                    >
                      Complete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Laundry;
