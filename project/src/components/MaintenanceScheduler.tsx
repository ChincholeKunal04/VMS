import React, { useState } from 'react';
import { Calendar, Clock, Tool } from 'lucide-react';
import { MaintenanceSchedule, Vehicle } from '../types';

interface MaintenanceSchedulerProps {
  vehicle: Vehicle;
  onSchedule: (schedule: Omit<MaintenanceSchedule, 'id'>) => void;
  onClose: () => void;
}

export default function MaintenanceScheduler({ vehicle, onSchedule, onClose }: MaintenanceSchedulerProps) {
  const [schedule, setSchedule] = useState<Omit<MaintenanceSchedule, 'id'>>({
    vehicleId: vehicle.id,
    date: new Date().toISOString().split('T')[0],
    type: 'routine',
    description: '',
    status: 'scheduled',
    estimatedCost: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule(schedule);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Schedule Maintenance</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Vehicle: {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </div>
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={schedule.date}
              onChange={(e) => setSchedule({ ...schedule, date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <Tool className="h-4 w-4" />
                Maintenance Type
              </div>
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={schedule.type}
              onChange={(e) => setSchedule({ ...schedule, type: e.target.value as MaintenanceSchedule['type'] })}
            >
              <option value="routine">Routine Service</option>
              <option value="repair">Repair</option>
              <option value="inspection">Inspection</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              value={schedule.description}
              onChange={(e) => setSchedule({ ...schedule, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Estimated Cost ($)
              </div>
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={schedule.estimatedCost}
              onChange={(e) => setSchedule({ ...schedule, estimatedCost: parseFloat(e.target.value) })}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
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
              Schedule Maintenance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}