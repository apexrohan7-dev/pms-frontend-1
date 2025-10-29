import React, { useState, useEffect, useCallback } from 'react';
import "../../assets/css/commanPage.css";
import { apiFetch } from "../../lib/api";
import PosSidebar from '../../components/sidebar/Possidebar';
import PosTopbar from "../../components/layout/postopbar";

const RoomService = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [stats, setStats] = useState({
    ordersCount: 0,
    currentOrderValue: 0,
    totalSettlementValue: 0,
    voidRoom: 0,
    available: 0,
    running: 0,
    settPending: 0
  });

  // Show toast notification
  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Load rooms from API
  const loadRooms = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/roomservice/rooms?limit=100");
      const data = res?.data || res || [];
      const roomData = Array.isArray(data) ? data : [];
      
      setRooms(roomData);
      
      // Calculate stats
      const newStats = {
        ordersCount: roomData.filter(r => r.status === "running").length,
        voidRoom: roomData.filter(r => r.status === "void").length,
        available: roomData.filter(r => r.status === "available").length,
        running: roomData.filter(r => r.status === "running").length,
        settPending: roomData.filter(r => r.status === "pending").length,
        currentOrderValue: roomData
          .filter(r => r.status === "running")
          .reduce((sum, r) => sum + (r.orderValue || 0), 0),
        totalSettlementValue: roomData
          .filter(r => r.status === "pending")
          .reduce((sum, r) => sum + (r.orderValue || 0), 0)
      };
      setStats(newStats);
      
    } catch (error) {
      console.error("Failed to load rooms:", error);
      showToast("Failed to load rooms", "error");
      // Fallback to default rooms
      const defaultRooms = [
        { id: '101', label: 'a', status: 'available' },
        { id: '201', label: 'b', status: 'available' },
        { id: '102', label: 'c', status: 'available' },
        { id: '202', label: 'd', status: 'available' },
        { id: '103', label: 'd', status: 'available' },
        { id: '203', label: 'e', status: 'available' },
        { id: '104', label: 'f', status: 'available' },
        { id: '204', label: 'f', status: 'available' }
      ];
      setRooms(defaultRooms);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Load order details for selected room
  const loadOrderDetails = useCallback(async (room) => {
    if (!room || room.status === "void" || room.status === "available") {
      return;
    }

    try {
      const res = await apiFetch(`/api/roomservice/orders/${room.id}`);
      const orderData = res?.data || res;
      
      if (orderData) {
        setStats(prev => ({
          ...prev,
          currentOrderValue: orderData.totalAmount || 0,
          totalSettlementValue: orderData.settlementAmount || 0
        }));
      }
    } catch (error) {
      console.error("Failed to load order details:", error);
    }
  }, []);

  // Handle room click
  const handleRoomClick = useCallback((room) => {
    setSelectedRoom(room);
    loadOrderDetails(room);
  }, [loadOrderDetails]);

  // Manual refresh
  const handleRefresh = useCallback(() => {
    loadRooms();
    showToast("Data refreshed", "success");
  }, [loadRooms, showToast]);

  // Create new order
  const handleCreateOrder = useCallback(async () => {
    if (!selectedRoom) {
      showToast("Please select a room first", "error");
      return;
    }

    if (selectedRoom.status !== "available" && selectedRoom.status !== "void") {
      showToast("This room is already occupied", "error");
      return;
    }

    try {
      await apiFetch("/api/roomservice/orders", {
        method: "POST",
        body: {
          roomId: selectedRoom.id,
          roomLabel: selectedRoom.label
        }
      });

      showToast("Order created successfully", "success");
      handleRefresh();
    } catch (error) {
      console.error("Failed to create order:", error);
      showToast("Failed to create order", "error");
    }
  }, [selectedRoom, showToast, handleRefresh]);

  // Setup real-time updates
  useEffect(() => {
    loadRooms();
    const interval = setInterval(loadRooms, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [loadRooms]);

  // Filter rooms by search query
  const filteredRooms = rooms.filter(room => 
    room.id.includes(searchQuery) ||
    room.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <aside className="room-sidebar">
          <PosSidebar />
          <div className="room-sidebar-content">
            <div className="my-1">
              <button className="room-order-btn">
                Orders {stats.ordersCount}
              </button>
              <button className="room-order-btn">
                Current
              </button>
            </div>
            <input
              type="text"
              placeholder="Search room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="room-search-input"
            />
            <div className="room-value-card">
              Current Order Value : 
              <span style={{ float: "right" }}>₹{stats.currentOrderValue.toFixed(2)}</span>
            </div>
            <div className="room-value-card">
              Total Settlement Value : 
              <span style={{ float: "right" }}>₹{stats.totalSettlementValue.toFixed(2)}</span>
            </div>
            <button 
              className="room-action-btn"
              onClick={handleCreateOrder}
              disabled={!selectedRoom || (selectedRoom.status !== "available" && selectedRoom.status !== "void")}
            >
              New Order
            </button>
            <button 
              className="room-action-btn"
              onClick={handleRefresh}
            >
              Refresh
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-7 py-6">
          {/* Top Bar */}
          <div className="room-topbar">
            <a href="/merge-table" className="text-blue-700 font-semibold text-sm">Merge Table</a>
            <a href="/booking-form" className="text-blue-700 font-semibold text-sm">Booking Form</a>
            <span className="text-gray-700 text-sm">Void Room ({stats.voidRoom})</span>
            <span className="text-gray-700 text-sm">Available ({stats.available})</span>
            <span className="text-red-600 text-sm">Running ({stats.running})</span>
            <span className="text-sky-500 text-sm">Settl. Pending ({stats.settPending})</span>
          </div>

          {/* Rooms Grid */}
          {loading && <div className="loading-spinner"></div>}
          
          <div className="room-grid">
            {filteredRooms.length === 0 ? (
              <div className="no-room-msg">
                No Room Found
              </div>
            ) : filteredRooms.map((room) => (
              <div
                key={room.id}
                className={`room-card ${room.status || 'available'} ${selectedRoom?.id === room.id ? 'selected' : ''}`}
                onClick={() => handleRoomClick(room)}
              >
                <div className="room-id">{room.id}</div>
                <div className="room-label">{room.label}</div>
                {room.orderValue > 0 && (
                  <div className="room-order-value">₹{room.orderValue.toFixed(2)}</div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoomService;
