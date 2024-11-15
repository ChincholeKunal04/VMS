import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { useStore } from '../../store';
import VehicleForm from './VehicleForm';
import StatusBadge from '../shared/StatusBadge';

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const vehicle = useStore((state) => 
    state.vehicles.find((v) => v.id === id)
  );
  const updateVehicle = useStore((state) => state.updateVehicle);
  const removeVehicle = useStore((state) => state.removeVehicle);

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Vehicle not found</h2>
      </div>
    );
  }

  const handleDelete = () => {
    removeVehicle(vehicle.id);
    navigate('/vehicles');
  };

  return (
    <div>
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEditForm(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Information</h3>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <StatusBadge status={vehicle.status} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">License Plate</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.licensePlate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{vehicle.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Fuel Level</dt>
                  <dd className="mt-1">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${vehicle.fuelLevel}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">{vehicle.fuelLevel}%</span>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance Information</h3>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Service</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.lastService}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Next Service</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.nextService || 'Not scheduled'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Mileage</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.mileage.toLocaleString()} km</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Fuel Efficiency</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.fuelEfficiency} km/L</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Documentation</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Insurance Expiry</dt>
                <dd className="mt-1 text-sm text-gray-900">{vehicle.insuranceExpiry}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Registration Expiry</dt>
                <dd className="mt-1 text-sm text-gray-900">{vehicle.registrationExpiry}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {showEditForm && (
        <VehicleForm
          initialData={vehicle}
          onSubmit={(data) => {
            updateVehicle(vehicle.id, data);
            setShowEditForm(false);
          }}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}