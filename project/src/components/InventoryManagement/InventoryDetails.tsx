import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit2, Trash2, AlertTriangle, Package, DollarSign, Truck, MapPin, Calendar } from 'lucide-react';
import { useStore } from '../../store';
import InventoryForm from './InventoryForm';

export default function InventoryDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const item = useStore((state) => 
    state.inventory.find((i) => i.id === id)
  );
  const vehicles = useStore((state) => state.vehicles);
  const updateInventoryItem = useStore((state) => state.updateInventory);
  const removeInventoryItem = useStore((state) => state.removeInventoryItem);

  if (!item) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Item not found</h2>
      </div>
    );
  }

  const handleDelete = () => {
    removeInventoryItem(item.id);
    navigate('/inventory');
  };

  const compatibleVehicles = vehicles.filter(v => 
    item.compatibleVehicles.includes(v.id)
  );

  return (
    <div>
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Item Information</h3>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1 flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900 capitalize">{item.category}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Quantity</dt>
                  <dd className="mt-1 flex items-center">
                    <span className="text-sm text-gray-900">{item.quantity}</span>
                    {item.quantity <= item.minimumQuantity && (
                      <div className="ml-2 flex items-center text-red-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        <span className="text-sm">Low Stock</span>
                      </div>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Minimum Quantity</dt>
                  <dd className="mt-1 text-sm text-gray-900">{item.minimumQuantity}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Unit Price</dt>
                  <dd className="mt-1 flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-900">{item.unitPrice.toFixed(2)}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Storage Information</h3>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{item.location}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Supplier</dt>
                  <dd className="mt-1 flex items-center">
                    <Truck className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{item.supplier}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Restocked</dt>
                  <dd className="mt-1 flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{item.lastRestocked}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compatible Vehicles</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {compatibleVehicles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {compatibleVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="flex items-center p-3 bg-white rounded-md shadow-sm"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {vehicle.make} {vehicle.model}
                          </div>
                          <div className="text-sm text-gray-500">{vehicle.licensePlate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No compatible vehicles specified</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditForm && (
        <InventoryForm
          initialData={item}
          onSubmit={(data) => {
            updateInventoryItem(item.id, data);
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
              Are you sure you want to delete this inventory item? This action cannot be undone.
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
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}