// src/pages/POS/Bar.js
import React, { useState, useEffect, useCallback } from 'react';
import "../../assets/css/commanPage.css";
import { apiFetch } from "../../lib/api";
import PosSidebar from '../../components/sidebar/Possidebar';
import PosTopbar from "../../components/layout/postopbar";

export default function Bar() {
  const [tables, setTables] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    ordersCount: 0,
    currentOrderValue: 0,
    totalSettlementValue: 0,
    voidTable: 0,
    available: 0,
    running: 0,
    settPending: 0
  });

  const loadBarTables = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/bar/tables?limit=100");
      const data = res?.data || res || [];
      const tableData = Array.isArray(data) ? data : [];
      
      setTables(tableData);
      
      const newStats = {
        ordersCount: tableData.filter(t => t.status === "running").length,
        voidTable: tableData.filter(t => t.status === "void").length,
        available: tableData.filter(t => t.status === "available").length,
        running: tableData.filter(t => t.status === "running").length,
        settPending: tableData.filter(t => t.status === "pending").length,
        currentOrderValue: tableData
          .filter(t => t.status === "running")
          .reduce((sum, t) => sum + (t.orderValue || 0), 0),
        totalSettlementValue: tableData
          .filter(t => t.status === "pending")
          .reduce((sum, t) => sum + (t.orderValue || 0), 0)
      };
      setStats(newStats);
      
    } catch (error) {
      console.error("Failed to load bar tables:", error);
      const dummyTables = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        number: i + 1,
        status: "available",
        orderValue: 0
      }));
      setTables(dummyTables);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  useEffect(() => {
    loadBarTables();
    const interval = setInterval(loadBarTables, 30000);
    return () => clearInterval(interval);
  }, [loadBarTables]);

  const filteredTables = tables.filter(item => 
    String(item.number).includes(searchQuery) ||
    (item.guestName && item.guestName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className='container'>
      <PosTopbar />

      <div className="page bar-page">
        <PosSidebar />

        <div className="res-wrap">
          <div className="res-topbar">
            <div className="res-title">Bar Management</div>
            <div className="res-stats">
              <span className="date-display">{new Date().toLocaleDateString()}</span>
              <a href="/merge-table" className="link-btn">Merge Table</a>
              <a href="/booking-form" className="link-btn">Booking Form</a>
              <span className="stat-badge void">Void Table ({stats.voidTable})</span>
              <span className="stat-badge available">Available ({stats.available})</span>
              <span className="stat-badge running">Running ({stats.running})</span>
              <span className="stat-badge pending">Settl. Pending ({stats.settPending})</span>
            </div>
          </div>

          <div className="bar-main-grid">
            <div className="bar-sidebar">
              <div className="order-buttons">
                <button className="order-btn">Orders {stats.ordersCount}</button>
                <button className="order-btn">Current</button>
              </div>
              
              <input
                type="text"
                placeholder="Search table or guest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              
              <div className="value-card">
                <div className="value-label">Current Order Value :</div>
                <div className="value-amount">₹{stats.currentOrderValue.toFixed(2)}</div>
              </div>
              
              <div className="value-card">
                <div className="value-label">Total Settlement Value :</div>
                <div className="value-amount">₹{stats.totalSettlementValue.toFixed(2)}</div>
              </div>
            </div>

            <div className="bar-content">
              {loading && <div className="loading-spinner"></div>}
              
              {filteredTables.length === 0 ? (
                <div className="no-table-msg">
                  No Table Found
                </div>
              ) : (
                <div className="tables-grid">
                  {filteredTables.map((item) => (
                    <div
                      key={item.id}
                      className={`table-card ${item.status} ${selectedItem?.id === item.id ? 'selected' : ''}`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="table-number">{item.number}</div>
                      {item.orderValue > 0 && (
                        <div className="table-value">₹{item.orderValue.toFixed(2)}</div>
                      )}
                      {item.guestName && (
                        <div className="table-guest">{item.guestName}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
