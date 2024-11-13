import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit2, Trash2, AlertTriangle, Calendar, Car, DollarSign, Package, User, FileText } from 'lucide-react';
import { useStore } from '../../store';
import MaintenanceForm from './MaintenanceForm';
import StatusBadge from '../shared/StatusBadge';
import { format } from 'date-fns';

export default function MaintenanceDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const maintenanceRecord = useStore((state) => 
    state.maintenanceRecords.find((r) => r.id === id)
  );
  const vehicle = useStore((state) => 
    state.vehicles.find(v => v.id === maintenanceRecord?.vehicleId)
  );
  const updateMaintenanceRecord = useStore((state) => state.updateMaintenanceRecord);
  const removeMaintenanceRecord = useStore((state) => state.removeMaintenanceRecord);

  if (!maintenanceRecord || !vehicle) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Maintenance record not found</h2>
      </div>
    );
  }

  const handleDelete = () => {
    removeMaintenanceRecord(maintenanceRecord.id);
    navigate('/maintenance');
  };

  return (
    <div>
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Maintenance Details</h2>
              <p className="mt-1 text-sm text-gray-500">
                {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
              </p>
            </div>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Service Information</h3>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <StatusBadge status={maintenanceRecord.status} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    {/* <Tool className="h-4 w-4 text-gray-400 mr-2" />*/}
                    <span className="capitalize">{maintenanceRecord.type}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    {format(new Date(maintenanceRecord.date), 'PPP')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Technician</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    {maintenanceRecord.technicianName}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Details</h3>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Vehicle</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <Car className="h-4 w-4 text-gray-400 mr-2" />
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">License Plate</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.licensePlate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Current Mileage</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.mileage.toLocaleString()} km</dd>
                </div>
              </dl>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Service Details</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div className="flex items-start">
                      <FileText className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      {maintenanceRecord.description}
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Cost</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                    ${maintenanceRecord.cost.toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>

            {maintenanceRecord.partsUsed.length > 0 && (
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Parts Used</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {maintenanceRecord.partsUsed.map((part) => (
                      <div key={part.id} className="flex items-center space-x-3">
                        <Package className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{part.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {part.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {maintenanceRecord.notes && (
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-900">{maintenanceRecord.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditForm && (
        <MaintenanceForm
          initialData={maintenanceRecord}
          onSubmit={(data) => {
            updateMaintenanceRecord(maintenanceRecord.id, data);
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
              Are you sure you want to delete this maintenance record? This action cannot be undone.
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
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}