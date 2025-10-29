import React, { useState } from 'react';
import { X, Users, Clock, IndianRupee } from 'lucide-react';
import "../../../assets/css/commanPage.css";
import PosSidebar from '../../../components/sidebar/Possidebar';
import PosTopbar from "../../../components/layout/postopbar"
const Banquet = () => {
  const [tables, setTables] = useState([
    { id: 'B1', name: 'B1', status: 'available', orderValue: 0, guests: 0, time: null },
    { id: 'B2', name: 'B2', status: 'available', orderValue: 0, guests: 0, time: null },
    { id: 'B3', name: 'B3', status: 'available', orderValue: 0, guests: 0, time: null },
    { id: 'B4', name: 'B4', status: 'available', orderValue: 0, guests: 0, time: null },
    { id: 'B5', name: 'B5', status: 'available', orderValue: 0, guests: 0, time: null },
  ]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentDate] = useState(new Date());
  const [branch] = useState('TRUSTIFYEDGE (Jaipur)');
  const [dateRange] = useState({ start: 'Apr 1 2025', end: 'Mar 31 2026' });

  // Calculate statistics
  const stats = {
    void: tables.filter(t => t.status === 'void').length,
    available: tables.filter(t => t.status === 'available').length,
    running: tables.filter(t => t.status === 'running').length,
    pending: tables.filter(t => t.status === 'pending').length,
    totalOrderValue: tables.reduce((sum, t) => sum + t.orderValue, 0),
  };

  const getTableColor = (status) => {
    switch (status) {
      case 'available': return 'bg-gray-100 border-gray-300 hover:bg-gray-200';
      case 'running': return 'bg-red-100 border-red-400';
      case 'pending': return 'bg-blue-100 border-blue-400';
      case 'void': return 'bg-white border-gray-400';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const handleTableClick = (table) => setSelectedTable(table);

  const handleTableAction = (tableId, action) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        switch (action) {
          case 'start': return { ...table, status: 'running', time: new Date() };
          case 'complete': return { ...table, status: 'available', orderValue: 0, guests: 0, time: null };
          case 'void': return { ...table, status: 'void' };
          default: return table;
        }
      }
      return table;
    }));
    setSelectedTable(null);
  };

  const addOrder = (tableId, amount) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        return { ...table, orderValue: table.orderValue + amount };
      }
      return table;
    }));
  };

  const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="page-container min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="sidebar left">
        <PosSidebar />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <PosTopbar />

        {/* <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg mb-4 rounded-lg">
          <div className="flex justify-between items-center px-4 py-3">
            <div>
              <span className="text-xl font-bold">Trustify</span>
              <span className="ml-4 font-semibold">{branch}</span>
              <span className="ml-3 text-blue-100">{dateRange.start}-{dateRange.end}</span>
            </div>
            <div>
              <span className="text-sm mr-4">{currentDate.toLocaleDateString()}</span>
            </div>
          </div>
        </header> */}

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition">Orders(0)</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">Current</button>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => setShowBookingForm(true)} className="text-blue-600 hover:text-blue-800 font-semibold border-b-2 border-blue-600 pb-1">Merge Table</button>
            <button onClick={() => setShowBookingForm(true)} className="text-blue-600 hover:text-blue-800 font-semibold border-b-2 border-blue-600 pb-1">Booking Form</button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="flex gap-4">
          {/* (Optional) Second Sidebar or Filter widgets */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Table</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm" placeholder="Search table" />
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Room</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm" placeholder="Select room" />
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nc</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"/>
              </div>
              <div className="bg-red-700 text-white p-3 rounded">
                <div className="text-sm font-semibold">Current Order Value :</div>
                <div className="text-2xl font-bold mt-1">₹{stats.totalOrderValue.toFixed(2)}</div>
              </div>
              <div className="bg-red-700 text-white p-3 rounded">
                <div className="text-sm font-semibold">Total Settlement Value :</div>
                <div className="text-2xl font-bold mt-1">₹{stats.totalOrderValue.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Main Table/List Section */}
          <div className="flex-1">
            {/* Status Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Void Table</div>
                  <div className="text-2xl font-bold text-gray-800">({stats.void})</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Available</div>
                  <div className="text-2xl font-bold text-green-600">({stats.available})</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600"><span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-1"></span>Running</div>
                  <div className="text-2xl font-bold text-red-600">({stats.running})</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600"><span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-1"></span>Sent. Pending</div>
                  <div className="text-2xl font-bold text-blue-600">({stats.pending})</div>
                </div>
              </div>
            </div>
            {/* Table Grid */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-5 gap-4">
                {tables.map((table) => (
                  <div key={table.id} onClick={() => handleTableClick(table)}
                    className={`${getTableColor(table.status)} border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-md`}>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800 mb-2">{table.name}</div>
                      {table.status === 'running' && (
                        <>
                          <div className="text-sm text-gray-600 mt-2">
                            <div className="flex items-center justify-center space-x-1">
                              <IndianRupee className="w-3 h-3" />
                              <span>{table.orderValue.toFixed(2)}</span>
                            </div>
                            {table.guests > 0 && (
                              <div className="flex items-center justify-center space-x-1 mt-1">
                                <Users className="w-3 h-3" />
                                <span>{table.guests}</span>
                              </div>
                            )}
                            {table.time && (
                              <div className="flex items-center justify-center space-x-1 mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatTime(table.time)}</span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="h-16 border-t border-gray-300 mt-3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Table Detail Modal */}
        {selectedTable && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Table {selectedTable.name}</h3>
                <button onClick={() => setSelectedTable(null)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="text-lg font-semibold capitalize">{selectedTable.status}</div>
                </div>

                {selectedTable.status === 'running' && (
                  <>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">Order Value</div>
                      <div className="text-lg font-semibold">₹{selectedTable.orderValue.toFixed(2)}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => addOrder(selectedTable.id, 100)} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">Add ₹100</button>
                      <button onClick={() => addOrder(selectedTable.id, 500)} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">Add ₹500</button>
                    </div>
                  </>
                )}

                <div className="flex space-x-2 pt-3">
                  {selectedTable.status === 'available' && (
                    <button onClick={() => handleTableAction(selectedTable.id, 'start')}
                      className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                      Start Order
                    </button>
                  )}
                  {selectedTable.status === 'running' && (
                    <>
                      <button onClick={() => handleTableAction(selectedTable.id, 'complete')}
                        className="flex-1 bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700">
                        Complete
                      </button>
                      <button onClick={() => handleTableAction(selectedTable.id, 'void')}
                        className="flex-1 bg-gray-600 text-white py-2 rounded font-semibold hover:bg-gray-700">
                        Void
                      </button>
                    </>
                  )}
                  {selectedTable.status === 'void' && (
                    <button onClick={() => handleTableAction(selectedTable.id, 'complete')}
                      className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Booking Form</h3>
                <button onClick={() => setShowBookingForm(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Guest Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
                  <input type="tel" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Guests</label>
                  <input type="number" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date & Time</label>
                  <input type="datetime-local" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Select Table</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2">
                    <option value="">Choose a table</option>
                    {tables.filter(t => t.status === 'available').map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">Save Booking</button>
                  <button onClick={() => setShowBookingForm(false)} className="flex-1 bg-gray-600 text-white py-2 rounded font-semibold hover:bg-gray-700">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Banquet;
