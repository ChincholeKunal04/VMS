import React from 'react';
import { Car, Fuel, Wrench, Activity } from 'lucide-react';
import { Vehicle } from '../types';
import VehicleList from './VehicleList';
import StatsCard from './StatsCard';

interface DashboardProps {
  vehicles: Vehicle[];
  onScheduleMaintenance: (vehicle: Vehicle) => void;
}

export default function Dashboard({ vehicles = [], onScheduleMaintenance }: DashboardProps) {
  const stats = vehicles
  ? {
      total: vehicles.length,
      available: vehicles.filter(v => v.status === 'available').length,
      inUse: vehicles.filter(v => v.status === 'in-use').length,
      maintenance: vehicles.filter(v => v.status === 'maintenance').length
    }
  : { total: 0, available: 0, inUse: 0, maintenance: 0 };


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Vehicles"
          value={stats.total}
          icon={<Car className="h-6 w-6 text-blue-500" />}
          trend="+2% from last month"
        />
        <StatsCard
          title="Available"
          value={stats.available}
          icon={<Activity className="h-6 w-6 text-green-500" />}
          trend="Ready for use"
        />
        <StatsCard
          title="In Use"
          value={stats.inUse}
          icon={<Fuel className="h-6 w-6 text-yellow-500" />}
          trend="Currently assigned"
        />
        <StatsCard
          title="In Maintenance"
          value={stats.maintenance}
          icon={<Wrench className="h-6 w-6 text-red-500" />}
          trend="Under service"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Vehicle Fleet</h2>
        </div>
        <VehicleList
          vehicles={vehicles}
          onScheduleMaintenance={onScheduleMaintenance}
        />
      </div>
    </div>
  );
}