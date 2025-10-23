// src/components/sidebar/possidebar.js
import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";
// Import icons from react-icons
import { 
  MdDashboard, 
  MdRestaurant, 
  MdCleaningServices,
  MdEventSeat,
  MdInventory,
  MdAssessment,
  MdSettings,
  MdShoppingCart,
  MdLocalBar,
  MdRoomService,
  MdLocalLaundry,
  MdDescription,
  MdPrint,
  MdCalendarToday,
  MdCategory,
  MdList,
  MdPeople,
  MdReceipt
} from "react-icons/md";

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
      { key: "dashboard", label: "POS Dashboard", icon: <MdDashboard />, to: "/dashboard/pos" },

      {
        key: "F&B",
        label: "F&B",
        icon: <MdRestaurant />,
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
        key: "HOUSE KEEPING",
        label: "HOUSE KEEPING",
        icon: <MdCleaningServices />,
        to: "/dashboard/pos/HOUSEKEEPING",
        children: [
          {
            label: "Laundry",
            to: "/dashboard/Pos/Housekeeping/Laundry",
            children: [
              { label: "New Laundry", to: "/dashboard/Pos/Housekeeping/Laundry/New" },
              { label: "Pending Laundry", to: "/dashboard/Pos/Housekeeping/Laundry/Pending" },
              { label: "Completed Laundry", to: "/dashboard/Pos/Housekeeping/Laundry/Completed" },
              { label: "Laundry Report", to: "/dashboard/Pos/Housekeeping/Laundry/Report" },
            ],
          },
        ],
      },


      {
        key: "BANQUET",
        label: "BANQUET",
        icon: <MdEventSeat />,
        to: "/dashboard/pos/banquet",
        children: [
          { label: "SwargTrustify", to: "/dashboard/pos/banquet/swargtrustify" },
        ],
      },


      {
        key: "inventory",
        label: "Inventory",
        icon: <MdInventory />,
        to: "/dashboard/pos/inventory",
        children: [
          {
            label: "Issue Material Detail",
            to: "/dashboard/pos/inventory/issue-material",
          },
          {
            label: "Indent Details",
            to: "/dashboard/pos/inventory/indent-details",
          },
          {
            label: "Stock Manual Consumption Detail",
            to: "/dashboard/pos/inventory/stock-manual-consumption",
          },
          {
            label: "Stock Adjustment Detail",
            to: "/dashboard/pos/inventory/stock-adjustment",
          },
          {
            label: "Stock Transfer Detail",
            to: "/dashboard/pos/inventory/stock-transfer",
          },
          {
            label: "Department OP.Stock Detail",
            to: "/dashboard/pos/inventory/department-op-stock",
          },
          {
            label: "Stock Verification Detail",
            to: "/dashboard/pos/inventory/stock-verification",
          },
        ],
      },

      {
        key: "inventoryReport",
        label: "Inventory Report",
        icon: <MdAssessment />,
        to: "/dashboard/pos/inventory-report",
        children: [
          {
            label: "Item Inventory Report",
            to: "/dashboard/pos/inventory-report/item-inventory",
          },
          {
            label: "Issue Transaction Report",
            to: "/dashboard/pos/inventory-report/issue-transaction",
          },
          {
            label: "Non Moving Item Report",
            to: "/dashboard/pos/inventory-report/non-moving-item",
          },
          {
            label: "Stock Manual Consumption Report",
            to: "/dashboard/pos/inventory-report/stock-manual-consumption",
          }
        ]
      },


      {
        key: "report",
        label: "Report",
        icon: <MdDescription />,
        to: "/dashboard/pos/report",
        children: [
          {
            label: "Tally Report",
            to: "/dashboard/pos/report/tally",
          },
          {
            label: "Bill Report",
            to: "/dashboard/pos/report/bill",
          },
          {
            label: "Fnb Summary Report",
            to: "/dashboard/pos/report/fnb-summary",
          },
          {
            label: "Order Summary Report",
            to: "/dashboard/pos/report/order-summary",
          }
        ]
      },


      {
        key: "banquet",
        label: "Banquet",
        icon: <MdReceipt />,
        to: "/dashboard/pos/banquet",
        children: [
          {
            label: "Banquet Booking Detail",
            to: "/dashboard/pos/banquet/booking-detail",
          },
          {
            label: "Banquet Calendar",
            to: "/dashboard/pos/banquet/calendar",
          },
          {
            label: "Banquet Tally Report",
            to: "/dashboard/pos/banquet/tally-report",
          }
        ]
      },

      {
        key: "settings",
        label: "Settings",
        icon: <MdSettings />,
        to: "/dashboard/pos/settings",
        children: [
          {
            label: "Printer Settings",
            to: "/dashboard/pos/settings/printer-settings",
          },
          {
            label: "Printer exe",
            to: "/dashboard/pos/settings/printer-exe",
          },
          {
            label: "Financial Year",
            to: "/dashboard/pos/settings/financial-year",
          }
        ]
      },

      {
        key: "purchase",
        label: "Purchase",
        icon: <MdShoppingCart />,
        to: "/dashboard/pos/purchase",
        children: [
          {
            label: "Category",
            to: "/dashboard/pos/purchase/category",
          },
          {
            label: "Sub Category",
            to: "/dashboard/pos/purchase/sub-category",
          },
          {
            label: "Item Master",
            to: "/dashboard/pos/purchase/item-master",
          },
          {
            label: "Purchase Details",
            to: "/dashboard/pos/purchase/purchase-details",
          },
          {
            label: "Purchase Challan",
            to: "/dashboard/pos/purchase/purchase-challan",
          },
          {
            label: "Purchase Order",
            to: "/dashboard/pos/purchase/purchase-order",
          },
          {
            label: "Purchase Transaction Report",
            to: "/dashboard/pos/purchase/transaction-report",
          },
          {
            label: "Add Supplier Detail",
            to: "/dashboard/pos/purchase/add-supplier",
          },
          {
            label: "Add Purchase Requisition Detail",
            to: "/dashboard/pos/purchase/add-purchase-requisition",
          }
        ]
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
          <span className="rsb-ico"><MdDashboard /></span>
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