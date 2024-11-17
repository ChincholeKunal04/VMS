import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, User, Car, Route } from 'lucide-react';
import { Driver, Vehicle, Trip } from '../../types';

interface TripPlannerProps {
  onSubmit: (trip: Trip) => void;
  onClose: () => void;
}

export default function TripPlanner({ onSubmit, onClose }: TripPlannerProps) {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [formData, setFormData] = useState<Omit<Trip, 'id'>>({
    vehicleId: '',
    driverId: '',
    startLocation: '',
    endLocation: '',
    startTime: '',
    endTime: '',
    distance: 0,
    status: 'planned',
    purpose: '',
    notes: ''
  });

  // Fetch vehicles and drivers when component mounts
  useEffect(() => {
    // Fetch vehicles
    fetch('http://localhost:5000/api/vehicles')
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error('Error fetching vehicles:', error));

    // Fetch drivers
    fetch('http://localhost:5000/api/drivers')
      .then((response) => response.json())
      .then((data) => setDrivers(data))
      .catch((error) => console.error('Error fetching drivers:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newTrip: Trip = await response.json();
        onSubmit(newTrip);
        onClose();
      } else {
        console.error('Failed to add trip:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting trip:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Plan new trip
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4" />
                  Start Location
                </div>
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.startLocation}
                onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4" />
                  End Location
                </div>
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.endLocation}
                onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4" />
                  Start Time
                </div>
              </label>
              <input
                type="datetime-local"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4" />
                  Expected End Time
                </div>
              </label>
              <input
                type="datetime-local"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Car className="h-4 w-4" />
                  Vehicle
                </div>
              </label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.vehicleId}
                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4" />
                  Driver
                </div>
              </label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.driverId}
                onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
              >
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Route className="h-4 w-4" />
                  Estimated Distance (km)
                </div>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: parseFloat(e.target.value) })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Purpose</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Add trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}