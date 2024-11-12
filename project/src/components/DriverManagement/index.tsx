import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DriverList from './DriverList';
import DriverDetails from './DriverDetails';

export default function DriverManagement() {
  return (
    <Routes>
      <Route path="/" element={<DriverList />} />
      <Route path="/:id" element={<DriverDetails />} />
    </Routes>
  );
}