import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InventoryList from './InventoryList';
import InventoryDetails from './InventoryDetails';

export default function InventoryManagement() {
  return (
    <Routes>
      <Route path="/" element={<InventoryList />} />
      <Route path="/:id" element={<InventoryDetails />} />
    </Routes>
  );
}