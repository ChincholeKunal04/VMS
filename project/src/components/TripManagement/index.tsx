import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TripList from './TripList';
import TripDetails from './TripDetails';
import TripPlanner from './TripPlanner';

export default function TripManagement() {
  return (
    <Routes>
      <Route path="/" element={<TripList />} />
      <Route path="/plan" element={<TripPlanner />} />
      <Route path="/:id" element={<TripDetails />} />
    </Routes>
  );
}