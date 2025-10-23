// src/pages/PosPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PosSidebar from "../../components/sidebar/Possidebar";
import "./PosPage.css";

export default function PosPage() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    sales: { current: 0, previous: 0 },
    outstanding: { current: 0, previous: 0 },
    collection: { current: 0, previous: 0 },
    totalBill: { current: 0, previous: 0 }
  });
  const [filters, setFilters] = useState({
    branch: 'F&B',
    restaurant: 'RESTAURANT',
    service: 'DownSend',
    dateFrom: '10/07/2025',
    dateTo: '10/07/2025'
  });
  const [activeTab, setActiveTab] = useState('current');

  const formatCurrency = (amount) => {
    return '₹' + parseFloat(amount).toFixed(2);
  };

  return (
    <div className="page">
      {/* Sidebar */}
      <PosSidebar />

      {/* Main Dashboard Content */}
      <div className="res-wrap">
        {/* Top Header with Red Border */}
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <div className="dashboard-icon">📊</div>
            <h2 className="page-title">Dashboard</h2>
          </div>
          {/* <div className="header-actions">
            <button className="btn btn-audit">Audit</button>
            <button className="btn btn-icon" title="User">👤</button>
          </div> */}
        </div>

        {/* Top Info Bar */}
        {/* <div className="top-info-bar">
          <div className="info-item">
            <span className="info-label">Switch Branch :</span>
            <span className="info-value">TRUSTIFYEDGE (Jaipur)</span>
          </div>
          <div className="info-item">
            <span className="info-value">Apr 1 2025-Mar 31 2026</span>
          </div>
          <div className="info-item">
            <span className="info-value">$1341</span>
          </div>
          <div className="info-item">
            <span className="info-value">Buser</span>
          </div>
          <div className="info-item">
            <span className="info-label">Today:</span>
            <span className="info-value">Oct 07 2025 17:46:00</span>
          </div>
        </div> */}

        {/* KPI Cards - 4 in a row */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-left">
              <div className="kpi-icon-wrapper">💰</div>
              <div className="kpi-info">
                <h3 className="kpi-title">Sales</h3>
              </div>
            </div>
            <div className="kpi-values">
              <div className="kpi-current">{formatCurrency(0.00)}</div>
              <div className="kpi-previous">{formatCurrency(0.00)}</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-left">
              <div className="kpi-icon-wrapper">💳</div>
              <div className="kpi-info">
                <h3 className="kpi-title">Outstanding Amount</h3>
              </div>
            </div>
            <div className="kpi-values">
              <div className="kpi-current">{formatCurrency(0.00)}</div>
              <div className="kpi-previous">{formatCurrency(0.00)}</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-left">
              <div className="kpi-icon-wrapper">🏦</div>
              <div className="kpi-info">
                <h3 className="kpi-title">Outstanding Collection</h3>
              </div>
            </div>
            <div className="kpi-values">
              <div className="kpi-current">{formatCurrency(0.00)}</div>
              <div className="kpi-previous">{formatCurrency(0.00)}</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-left">
              <div className="kpi-icon-wrapper">📄</div>
              <div className="kpi-info">
                <h3 className="kpi-title">Total Bill</h3>
              </div>
            </div>
            <div className="kpi-values">
              <div className="kpi-current">{formatCurrency(0.00)}</div>
              <div className="kpi-previous">{formatCurrency(0.00)}</div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid - 2 Columns */}
        <div className="dashboard-grid">
          {/* Top Item Sales List - Left Column */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Top Item Sales List</h3>
            </div>
            <div className="card-body">
              {/* Filters */}
              <div className="filters-row">
                <div className="filter-group">
                  <select value={filters.branch} onChange={(e) => setFilters({...filters, branch: e.target.value})}>
                    <option value="F&B">F&B</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
                <div className="filter-group">
                  <select value={filters.restaurant} onChange={(e) => setFilters({...filters, restaurant: e.target.value})}>
                    <option value="RESTAURANT">RESTAURANT</option>
                    <option value="BAR">BAR</option>
                  </select>
                </div>
                <div className="filter-group">
                  <select value={filters.service} onChange={(e) => setFilters({...filters, service: e.target.value})}>
                    <option value="DownSend">DownSend</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                </div>
              </div>

              {/* Date Range */}
              <div className="date-inputs">
                <div>
                  <div className="date-label">Top From</div>
                  <input 
                    type="text" 
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  />
                </div>
                <div className="date-separator">To</div>
                <div>
                  <div className="date-label">To</div>
                  <input 
                    type="text" 
                    value={filters.dateTo}
                    onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  />
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th className="text-right">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2" className="no-data">No data available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top Sale Item - Right Column */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Top Sale Item</h3>
              <div className="card-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
                  onClick={() => setActiveTab('current')}
                >
                  Current
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'last' ? 'active' : ''}`}
                  onClick={() => setActiveTab('last')}
                >
                  last
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th className="text-right">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2" className="no-data">No data available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top Debtors - Bottom Left */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Top Debtors</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2" className="no-data">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer">
              <a href="#" className="more-link">More...</a>
            </div>
          </div>

          {/* Top Creditors - Bottom Right */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Top Creditors</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2" className="no-data">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer">
              <a href="#" className="more-link">More...</a>
            </div>
          </div>
        </div>

        {/* Bottom Action Cards - 5 cards with colored borders */}
        <div className="action-cards-grid">
          <div className="action-card red">
            <h4 className="action-title">Total Bill Cancel</h4>
            <div className="action-values">
              <div className="action-value">
                <span className="action-number">0</span>
              </div>
              <div className="action-value">
                <span className="action-number">0</span>
              </div>
            </div>
          </div>

          <div className="action-card blue">
            <h4 className="action-title">Bill Modify</h4>
            <div className="action-values">
              <div className="action-value">
                <span className="action-number">0</span>
              </div>
              <div className="action-value">
                <span className="action-number">0</span>
              </div>
            </div>
          </div>

          <div className="action-card green">
            <h4 className="action-title">Bill Discount</h4>
            <div className="action-values">
              <div className="action-value">
                <span className="action-number">0</span>
              </div>
              <div className="action-value">
                <span className="action-number">0</span>
              </div>
            </div>
          </div>

          <div className="action-card pink">
            <h4 className="action-title">Bill Reprint</h4>
            <div className="action-values">
              <div className="action-value">
                <span className="action-number">0</span>
              </div>
              <div className="action-value">
                <span className="action-number">0</span>
              </div>
            </div>
          </div>

          <div className="action-card orange">
            <h4 className="action-title">Void Item</h4>
            <div className="action-values">
              <div className="action-value">
                <span className="action-number">0</span>
              </div>
              <div className="action-value">
                <span className="action-number">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}