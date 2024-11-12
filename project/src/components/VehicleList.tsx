import React from 'react';
import { Vehicle } from '../types';
import { Calendar } from 'lucide-react';

interface VehicleListProps {
  vehicles: Vehicle[];
  onScheduleMaintenance: (vehicle: Vehicle) => void;
}

export default function VehicleList({ vehicles, onScheduleMaintenance }: VehicleListProps) {
  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in-use':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              License Plate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fuel Level
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Service
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {vehicle.make} {vehicle.model}
                    </div>
                    <div className="text-sm text-gray-500">{vehicle.year}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {vehicle.licensePlate}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${vehicle.fuelLevel}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{vehicle.fuelLevel}%</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {vehicle.lastService}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <button
                  onClick={() => onScheduleMaintenance(vehicle)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule Service
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}