import React from 'react';
import { BarChart, PieChart, Activity } from 'lucide-react';
import { Vehicle } from '../types';
import { useMemo } from 'react';

interface AnalyticsProps {
  vehicles: Vehicle[];
}

export default function Analytics({ vehicles = [] }: AnalyticsProps) {
  if (vehicles.length === 0) {
    return <div>No vehicle data available.</div>;
  }

  const typeDistribution = useMemo(() => {
    return vehicles.reduce((acc, vehicle) => {
      acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [vehicles]);

  const averageFuelLevel = useMemo(() => {
    return vehicles.reduce((sum, vehicle) => sum + vehicle.fuelLevel, 0) / vehicles.length;
  }, [vehicles]);

  const statusCount = useMemo(() => {
    return vehicles.reduce((acc, vehicle) => {
      acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [vehicles]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fleet Composition Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-medium text-gray-900">Fleet Composition</h3>
             <PieChart className="h-5 w-5 text-gray-400" />
           </div>
           <div className="space-y-4">
             {Object.entries(typeDistribution).map(([type, count]) => (
            <div key={type}>
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span className="capitalize">{type}</span>
                <span>{count} vehicles</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(count / vehicles.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
        {/* Fleet Status Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-medium text-gray-900">Fleet Status</h3>
             <BarChart className="h-5 w-5 text-gray-400" />
           </div>
           <div className="space-y-4">
             {Object.entries(statusCount).map(([status, count]) => (
            <div key={status}>
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span className="capitalize">{status.replace('-', ' ')}</span>
                <span>{count} vehicles</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(count / vehicles.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Fleet Performance</h3>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-600 mb-2">Average Fuel Level</div>
            <div className="text-2xl font-bold text-indigo-600">{averageFuelLevel.toFixed(1)}%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-600 mb-2">Total Mileage</div>
            <div className="text-2xl font-bold text-indigo-600">
              {vehicles.reduce((sum, vehicle) => sum + vehicle.mileage, 0).toLocaleString()} km
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-600 mb-2">Maintenance Rate</div>
            <div className="text-2xl font-bold text-indigo-600">
              {((statusCount["maintenance"] || 0) / vehicles.length * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}