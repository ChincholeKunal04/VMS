import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MaintenanceList from './MaintenanceList';
import MaintenanceDetails from './MaintenanceDetails';

export default function MaintenanceManagement() {
  return (
    <Routes>
      <Route path="/" element={<MaintenanceList />} />
      <Route path="/:id" element={<MaintenanceDetails />} />
    </Routes>
  );
}