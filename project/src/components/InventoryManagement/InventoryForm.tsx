import React, { useState } from 'react';
import { PlusCircle, X, Package, DollarSign, Truck, MapPin } from 'lucide-react';
import { InventoryItem } from '../../types';
import { useStore } from '../../store';

interface InventoryFormProps {
  onSubmit: (item: Omit<InventoryItem, 'id'>) => void;
  onClose: () => void;
  initialData?: InventoryItem;
}

export default function InventoryForm({ onSubmit, onClose, initialData }: InventoryFormProps) {
  const vehicles = useStore((state) => state.vehicles);
  
  const [formData, setFormData] = useState<Omit<InventoryItem, 'id'>>({
    name: initialData?.name || '',
    category: initialData?.category || 'part',
    quantity: initialData?.quantity || 0,
    minimumQuantity: initialData?.minimumQuantity || 0,
    unitPrice: initialData?.unitPrice || 0,
    location: initialData?.location || '',
    supplier: initialData?.supplier || '',
    lastRestocked: initialData?.lastRestocked || new Date().toISOString().split('T')[0],
    compatibleVehicles: initialData?.compatibleVehicles || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? 'Edit Inventory Item' : 'Add New Item'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="h-4 w-4" />
                  Item Name
                </div>
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as InventoryItem['category'] })}
              >
                <option value="part">Part</option>
                <option value="supply">Supply</option>
                <option value="tool">Tool</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Current Quantity</label>
              <input
                type="number"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Quantity</label>
              <input
                type="number"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.minimumQuantity}
                onChange={(e) => setFormData({ ...formData, minimumQuantity: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4" />
                  Unit Price
                </div>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4" />
                  Storage Location
                </div>
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="h-4 w-4" />
                  Supplier
                </div>
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Restocked</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.lastRestocked}
                onChange={(e) => setFormData({ ...formData, lastRestocked: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Compatible Vehicles</label>
              <div className="mt-2 space-y-2">
                {vehicles.map((vehicle) => (
                  <label key={vehicle.id} className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      checked={formData.compatibleVehicles.includes(vehicle.id)}
                      onChange={(e) => {
                        const newCompatibleVehicles = e.target.checked
                          ? [...formData.compatibleVehicles, vehicle.id]
                          : formData.compatibleVehicles.filter(id => id !== vehicle.id);
                        setFormData({ ...formData, compatibleVehicles: newCompatibleVehicles });
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                    </span>
                  </label>
                ))}
              </div>
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
              {initialData ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}