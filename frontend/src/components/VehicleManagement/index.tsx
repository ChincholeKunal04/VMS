import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VehicleList from './VehicleList';
import VehicleDetails from './VehicleDetails';

export default function VehicleManagement() {
  return (
    <Routes>
      <Route path="/" element={<VehicleList />} />
      <Route path="/:id" element={<VehicleDetails />} />
    </Routes>
  );
}