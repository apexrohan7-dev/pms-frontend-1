// src/components/sidebar/possidebar.js
import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

/**
 * POS Sidebar
 * Uses the same .rsb classes as your BackofficeSidebar.
 * Routes are namespaced under /dashboard/pos/...
 */
export function PosSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openSet, setOpenSet] = useState(
    new Set(["F&B", "restaurant", "tables", "kitchen", "billing", "inventory", "reports", "settings"])
  );
  const { pathname } = useLocation();

  const menus = useMemo(
    () => [
      { key: "dashboard", label: "POS Dashboard", icon: "🛒", to: "/dashboard/pos" },

      {
        key: "F&B",
        label: "F&B",
        icon: "🧾",
        to: "/dashboard/pos/fnb",
        children: [
          {
            key: "restaurant",
            label: "Restaurant",
            to: "/dashboard/pos/restaurant",
            children: [
              { label: "Downsend", to: "/dashboard/pos/restaurant/downsend" },
              { label: "Banquet", to: "/dashboard/pos/restaurant/banquet" },
            ],
          },
          { label: "Bar", to: "/dashboard/pos/bar" },
          { label: "Room Service", to: "/dashboard/pos/roomservice" },
        ],
      },

      {
        key: "tables",
        label: "Tables",
        icon: "🪑",
        to: "/dashboard/pos/tables",
        children: [
          { label: "Table Status", to: "/dashboard/Pos/Tables/TableStatus" },
          { label: "Merge / Split", to: "/dashboard/Pos/Tables/MergeSplit" },
          { label: "Move Table", to: "/dashboard/Pos/Tables/MoveTable" },
        ],
      },

      {
        key: "kitchen",
        label: "Kitchen (KOT/KDS)",
        icon: "👨‍🍳",
        to: "/dashboard/pos/kitchen",
        children: [
          { label: "KOT Board", to: "/dashboard/Pos/Tables/KOTBoard" },
          { label: "Reprint KOT", to: "/dashboard/Pos/Tables/ReprintKOT" },
          { label: "KDS", to: "/dashboard/Pos/Tables/KDS" },
        ],
      },

      {
        key: "billing",
        label: "Billing",
        icon: "💳",
        to: "/dashboard/pos/billing",
        children: [
          { label: "Generate Bill", to: "/dashboard/Pos/Billing/GenerateBill" },
          { label: "Reprint Bill", to: "/dashboard/Pos/Billing/ReprintBill" },
          { label: "Void / Return", to: "/dashboard/Pos/Billing/VoidReturn" },
        ],
      },

      {
        key: "inventory",
        label: "Inventory",
        icon: "📦",
        to: "/dashboard/pos/inventory",
        children: [
          { label: "Items", to: "/dashboard/Pos/Inventory/Items" },
          { label: "Stock In/Out", to: "/dashboard/Pos/Inventory/StockInOut" },
          { label: "Out of Stock", to: "/dashboard/Pos/Inventory/OutofStock" },
        ],
      },

      {
        key: "reports",
        label: "Reports",
        icon: "📊",
        to: "/dashboard/pos/reports",
        children: [
          { label: "Z Report", to: "/dashboard/Pos/Reports/ZReport" },
          { label: "Sales Summary", to: "/dashboard/Pos/Reports/SalesSummary" },
          { label: "Tax Summary", to: "/dashboard/Pos/Reports/TaxSummary" },
          { label: "Discount Report", to: "/dashboard/Pos/Reports/DiscountReport" },
        ],
      },

      {
        key: "settings",
        label: "Settings",
        icon: "⚙️",
        to: "/dashboard/pos/settings",
        children: [
          { label: "Printers", to: "/dashboard/Pos/Settings/Printers" },
          { label: "Counters", to: "/dashboard/Pos/Settings/Counters" },
          { label: "Payment Modes", to: "/dashboard/Pos/Settings/PaymentModes" },
          { label: "Service Charge", to: "/dashboard/Pos/Settings/ServiceCharge" },
        ],
      },
    ],
    []
  );

  const toggleSection = (key) => {
    const s = new Set(openSet);
    s.has(key) ? s.delete(key) : s.add(key);
    setOpenSet(s);
  };

  const isDashboardActive =
    pathname === "/dashboard/pos" || pathname.startsWith("/dashboard/pos/");

  const renderMenuItem = (item, level = 0) => {
    const hasChildren = !!item.children?.length;
    const openNow = openSet.has(item.key);
    const isNested = level > 0;

    return (
      <div key={item.key || item.to} className={isNested ? "rsb-nested" : "rsb-sec"}>
        <NavLink
          to={item.to}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleSection(item.key);
            }
          }}
          className={({ isActive }) =>
            (isNested ? "rsb-subitem" : "rsb-item rsb-parent") +
            (isActive ? " active" : "") +
            (collapsed ? " no-caret" : "") +
            (hasChildren ? " has-children" : "")
          }
        >
          {!isNested && <span className="rsb-ico">{item.icon}</span>}
          {!collapsed && <span className="rsb-lbl">{item.label}</span>}
          {hasChildren && !collapsed && (
            <span className={`rsb-caret ${openNow ? "open" : ""}`}>▾</span>
          )}
        </NavLink>

        {hasChildren && !collapsed && openNow && (
          <div className={isNested ? "rsb-sub-nested" : "rsb-sub"}>
            {item.children.map((child) => {
              if (child.children) {
                return renderMenuItem(child, level + 1);
              }
              return (
                <NavLink
                  key={child.to}
                  to={child.to}
                  className={({ isActive }) =>
                    (isNested ? "rsb-subitem-nested" : "rsb-subitem") +
                    (isActive ? " active" : "")
                  }
                >
                  {child.label}
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`rsb ${collapsed ? "rsb--mini" : ""}`}>
      <div className="rsb-top">
        <button
          className="rsb-burger"
          onClick={() => setCollapsed((v) => !v)}
          aria-label="Toggle sidebar"
        >
          <span /><span /><span />
        </button>
        {!collapsed && (
          <button
            className="rsb-close"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse"
          >
            ×
          </button>
        )}
      </div>

      <nav className="rsb-nav">
        {/* Top-level dashboard item */}
        <NavLink
          to="/dashboard/pos"
          className={"rsb-item" + (isDashboardActive ? " active" : "")}
        >
          <span className="rsb-ico">🛒</span>
          {!collapsed && <span className="rsb-lbl">POS Dashboard</span>}
        </NavLink>

        {/* Sections */}
        {menus.filter((m) => m.key !== "dashboard").map((m) => renderMenuItem(m))}
      </nav>
    </aside>
  );
}

export default PosSidebar;

/* Additional CSS for nested dropdowns - Add to your Sidebar.css */

/*
.rsb-nested {
  margin-left: 0;
}

.rsb-sub-nested {
  padding-left: 1rem;
  background: rgba(0, 0, 0, 0.05);
  border-left: 2px solid rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
}

.rsb-subitem-nested {
  padding: 0.5rem 1rem;
  padding-left: 2rem;
  font-size: 0.85em;
  display: block;
  color: inherit;
  text-decoration: none;
  transition: background 0.2s;
}

.rsb-subitem-nested:hover {
  background: rgba(0, 0, 0, 0.05);
}

.rsb-subitem-nested.active {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  font-weight: 500;
}

.rsb-subitem.has-children {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.rsb-subitem .rsb-caret {
  margin-left: auto;
  transition: transform 0.2s;
  font-size: 0.9em;
}

.rsb-subitem .rsb-caret.open {
  transform: rotate(-180deg);
}
*/