import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { Driver } from '../../types';
import axios from 'axios';

interface DriverFormProps {
  onSubmit: (driver: Omit<Driver, 'id'>) => void;
  onClose: () => void;
  initialData?: Driver;
}

export default function DriverForm({ onSubmit, onClose, initialData }: DriverFormProps) {
  const [formData, setFormData] = useState<Omit<Driver, 'id'>>({
    name: initialData?.name || '',
    licenseNumber: initialData?.licenseNumber || '',
    licenseExpiry: initialData?.licenseExpiry || '',
    contactNumber: initialData?.contactNumber || '',
    email: initialData?.email || '',
    status: initialData?.status || 'available',
    rating: initialData?.rating || 0,
    totalTrips: initialData?.totalTrips || 0,
    joinDate: initialData?.joinDate || new Date().toISOString().split('T')[0],
    emergencyContact: initialData?.emergencyContact || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Success handling
        onSubmit(formData);
      } else {
        // Error handling
        console.error('Failed to submit driver data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? 'Edit Driver' : 'Add New Driver'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">License Number</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">License Expiry</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.licenseExpiry}
                onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Driver['status'] })}
              >
                <option value="available">Available</option>
                <option value="on-trip">On Trip</option>
                <option value="off-duty">Off Duty</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Join Date</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.joinDate}
                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: parseFloat(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Trips</label>
              <input
                type="number"
                min="0"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.totalTrips}
                onChange={(e) =>
                  setFormData({ ...formData, totalTrips: parseInt(e.target.value, 10) })
                }
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              {initialData ? 'Update Driver' : 'Add Driver'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}