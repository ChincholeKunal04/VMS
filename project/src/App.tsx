import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import VehicleManagement from './components/VehicleManagement';
import DriverManagement from './components/DriverManagement';
import TripManagement from './components/TripManagement';
import MaintenanceManagement from './components/MaintenanceManagement';
// import InventoryManagement from './components/InventoryManagement';
import Analytics from './components/Analytics';
// import AlertCenter from './components/AlertCenter';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vehicles/*" element={<VehicleManagement />} />
            <Route path="/drivers/*" element={<DriverManagement />} />
            <Route path="/trips/*" element={<TripManagement />} />
            <Route path="/maintenance/*" element={<MaintenanceManagement />} />
            {/* <Route path="/inventory/*" element={<InventoryManagement />} /> */}
            <Route path="/analytics" element={<Analytics />} />
            {/* <Route path="/alerts" element={<AlertCenter />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;