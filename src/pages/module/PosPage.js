// src/pages/PosPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PosSidebar from "../../components/sidebar/Possidebar";
import "./PosPage.css";
import PosTopbar from "../../components/layout/postopbar";

export default function PosPage() {
  const navigate = useNavigate();

  // Dashboard KPIs
  const [dashboardData, setDashboardData] = useState({
    sales: { current: 0, previous: 0 },
    outstanding: { current: 0, previous: 0 },
    collection: { current: 0, previous: 0 },
    totalBill: { current: 0, previous: 0 }
  });

  // Filters for top item sales
  const [filters, setFilters] = useState({
    branch: "F&B",
    restaurant: "RESTAURANT",
    service: "DownSend",
    dateFrom: "10/07/2025",
    dateTo: "10/07/2025"
  });

  // Tab state for Top Sale Item
  const [activeTab, setActiveTab] = useState("current");

  // Table states
  const [topItemSales, setTopItemSales] = useState([]); // Array: {name, qty}
  const [topSaleItems, setTopSaleItems] = useState({ current: [], last: [] }); // Object with arrays
  const [topDebtors, setTopDebtors] = useState([]); // Array: {name, amount}
  const [topCreditors, setTopCreditors] = useState([]); // Array: {name, amount}

  // Action card state
  const [actionCards, setActionCards] = useState({
    totalBillCancel: [0, 0],
    billModify: [0, 0],
    billDiscount: [0, 0],
    billReprint: [0, 0],
    voidItem: [0, 0]
  });

  const formatCurrency = (amount) => {
    return "₹" + parseFloat(amount).toFixed(2);
  };

  // Fill with demo/mock data or fetch from APIs here
  useEffect(() => {
    // Example: fetch dashboard data here
    // setDashboardData(...);

    // Example: fetch topItemSales list using filters
    // setTopItemSales(...);
    // setTopSaleItems({ current: ..., last: ... });
    // setTopDebtors(...);
    // setTopCreditors(...);

    // Use the filters state to fetch data whenever filters change
  }, [filters]);

  // Table helpers
  const renderTableRows = (data, columns, noDataLabel = "No data available") => {
    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan={columns} className="no-data">{noDataLabel}</td>
        </tr>
      );
    }
    return data.map((row, i) => (
      <tr key={i}>
        <td>{row.name}</td>
        <td className="text-right">{row.qty !== undefined ? row.qty : formatCurrency(row.amount)}</td>
      </tr>
    ));
  };

  // Render
  return (
    <div className="Container">
      <PosTopbar />
      <div className="page">
        <PosSidebar />

        <div className="res-wrap">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <div className="dashboard-header-left">
              <div className="dashboard-icon">📊</div>
              <h2 className="page-title">Dashboard</h2>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-left">
                <div className="kpi-icon-wrapper">💰</div>
                <div className="kpi-info"><h3 className="kpi-title">Sales</h3></div>
              </div>
              <div className="kpi-values">
                <div className="kpi-current">{formatCurrency(dashboardData.sales.current)}</div>
                <div className="kpi-previous">{formatCurrency(dashboardData.sales.previous)}</div>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-left">
                <div className="kpi-icon-wrapper">💳</div>
                <div className="kpi-info"><h3 className="kpi-title">Outstanding Amount</h3></div>
              </div>
              <div className="kpi-values">
                <div className="kpi-current">{formatCurrency(dashboardData.outstanding.current)}</div>
                <div className="kpi-previous">{formatCurrency(dashboardData.outstanding.previous)}</div>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-left">
                <div className="kpi-icon-wrapper">🏦</div>
                <div className="kpi-info"><h3 className="kpi-title">Outstanding Collection</h3></div>
              </div>
              <div className="kpi-values">
                <div className="kpi-current">{formatCurrency(dashboardData.collection.current)}</div>
                <div className="kpi-previous">{formatCurrency(dashboardData.collection.previous)}</div>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-left">
                <div className="kpi-icon-wrapper">📄</div>
                <div className="kpi-info"><h3 className="kpi-title">Total Bill</h3></div>
              </div>
              <div className="kpi-values">
                <div className="kpi-current">{formatCurrency(dashboardData.totalBill.current)}</div>
                <div className="kpi-previous">{formatCurrency(dashboardData.totalBill.previous)}</div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Top Item Sales List */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Top Item Sales List</h3>
              </div>
              <div className="card-body">
                {/* Filters */}
                <div className="filters-row">
                  <div className="filter-group">
                    <select
                      value={filters.branch}
                      onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
                    >
                      <option value="F&B">F&B</option>
                      <option value="Retail">Retail</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <select
                      value={filters.restaurant}
                      onChange={(e) => setFilters({ ...filters, restaurant: e.target.value })}
                    >
                      <option value="RESTAURANT">RESTAURANT</option>
                      <option value="BAR">BAR</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <select
                      value={filters.service}
                      onChange={(e) => setFilters({ ...filters, service: e.target.value })}
                    >
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
                      onChange={(e) =>
                        setFilters({ ...filters, dateFrom: e.target.value })
                      }
                    />
                  </div>
                  <div className="date-separator">To</div>
                  <div>
                    <div className="date-label">To</div>
                    <input
                      type="text"
                      value={filters.dateTo}
                      onChange={(e) =>
                        setFilters({ ...filters, dateTo: e.target.value })
                      }
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
                      {renderTableRows(topItemSales, 2)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top Sale Item */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Top Sale Item</h3>
                <div className="card-tabs">
                  <button
                    className={`tab-btn ${activeTab === "current" ? "active" : ""}`}
                    onClick={() => setActiveTab("current")}
                  >
                    Current
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "last" ? "active" : ""}`}
                    onClick={() => setActiveTab("last")}
                  >
                    Last
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
                      {renderTableRows(
                        activeTab === "current"
                          ? topSaleItems.current
                          : topSaleItems.last,
                        2
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top Debtors */}
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
                      {renderTableRows(topDebtors, 2, "0")}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <a href="#" className="more-link">More...</a>
              </div>
            </div>

            {/* Top Creditors */}
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
                      {renderTableRows(topCreditors, 2, "0")}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <a href="#" className="more-link">More...</a>
              </div>
            </div>
          </div>

          {/* Action Cards Grid */}
          <div className="action-cards-grid">
            <div className="action-card red">
              <h4 className="action-title">Total Bill Cancel</h4>
              <div className="action-values">
                <div className="action-value">
                  <span className="action-number">{actionCards.totalBillCancel[0]}</span>
                </div>
                <div className="action-value">
                  <span className="action-number">{actionCards.totalBillCancel[1]}</span>
                </div>
              </div>
            </div>
            <div className="action-card blue">
              <h4 className="action-title">Bill Modify</h4>
              <div className="action-values">
                <div className="action-value">
                  <span className="action-number">{actionCards.billModify[0]}</span>
                </div>
                <div className="action-value">
                  <span className="action-number">{actionCards.billModify[1]}</span>
                </div>
              </div>
            </div>
            <div className="action-card green">
              <h4 className="action-title">Bill Discount</h4>
              <div className="action-values">
                <div className="action-value">
                  <span className="action-number">{actionCards.billDiscount[0]}</span>
                </div>
                <div className="action-value">
                  <span className="action-number">{actionCards.billDiscount[1]}</span>
                </div>
              </div>
            </div>
            <div className="action-card pink">
              <h4 className="action-title">Bill Reprint</h4>
              <div className="action-values">
                <div className="action-value">
                  <span className="action-number">{actionCards.billReprint[0]}</span>
                </div>
                <div className="action-value">
                  <span className="action-number">{actionCards.billReprint[1]}</span>
                </div>
              </div>
            </div>
            <div className="action-card orange">
              <h4 className="action-title">Void Item</h4>
              <div className="action-values">
                <div className="action-value">
                  <span className="action-number">{actionCards.voidItem[0]}</span>
                </div>
                <div className="action-value">
                  <span className="action-number">{actionCards.voidItem[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
