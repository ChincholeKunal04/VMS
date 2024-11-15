import React from 'react';
import { Car, Fuel, Wrench, Activity, ArrowUp } from 'lucide-react';
import { useStore } from '../store';
import VehicleList from '../components/VehicleManagement/VehicleList';
import StatsCard from './StatsCard';
import Analytics from './Analytics';

export default function Dashboard() {
  const vehicles = useStore((state) => state.vehicles);
  const maintenanceRecords = useStore((state) => state.maintenanceRecords);
  const trips = useStore((state) => state.trips);

  // Calculate vehicle statistics
  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.status === 'available').length,
    inUse: vehicles.filter(v => v.status === 'in-use').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length
  };

  // Calculate trends (comparing with last month)
  const getMonthlyStats = () => {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

    const completedMaintenanceLastMonth = maintenanceRecords.filter(record => 
      record.status === 'completed' && 
      new Date(record.date) >= lastMonth && 
      new Date(record.date) <= new Date()
    ).length;

    const completedTripsLastMonth = trips.filter(trip => 
      trip.status === 'completed' && 
      new Date(trip.startTime) >= lastMonth && 
      new Date(trip.startTime) <= new Date()
    ).length;

    return {
      maintenanceRate: completedMaintenanceLastMonth,
      tripRate: completedTripsLastMonth
    };
  };

  const monthlyStats = getMonthlyStats();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Vehicles"
          value={stats.total}
          icon={<Car className="h-6 w-6 text-blue-500" />}
          trend={
            <div className="flex items-center text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>Active Fleet</span>
            </div>
          }
        />
        <StatsCard
          title="Available"
          value={stats.available}
          icon={<Activity className="h-6 w-6 text-green-500" />}
          trend={
            <div className="flex items-center text-gray-600">
              <span>Ready for use</span>
            </div>
          }
        />
        <StatsCard
          title="In Use"
          value={stats.inUse}
          icon={<Fuel className="h-6 w-6 text-yellow-500" />}
          trend={
            <div className="flex items-center text-blue-600">
              <span>{monthlyStats.tripRate} trips this month</span>
            </div>
          }
        />
        <StatsCard
          title="In Maintenance"
          value={stats.maintenance}
          icon={<Wrench className="h-6 w-6 text-red-500" />}
          trend={
            <div className="flex items-center text-orange-600">
              <span>{monthlyStats.maintenanceRate} services this month</span>
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Vehicle Fleet Status</h2>
          </div>
          <div className="p-6">
            <Analytics />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[...maintenanceRecords, ...trips]
                .sort((a, b) => new Date(b.date || b.startTime).getTime() - new Date(a.date || a.startTime).getTime())
                .slice(0, 5)
                .map((activity, index) => {
                  const isTrip = 'startTime' in activity;
                  const vehicle = vehicles.find(v => v.id === activity.vehicleId);
                  
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      {isTrip ? (
                        <Fuel className="h-5 w-5 text-blue-500 mt-1" />
                      ) : (
                        <Wrench className="h-5 w-5 text-orange-500 mt-1" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {isTrip ? 'Trip Completed' : 'Maintenance Service'} - {vehicle?.licensePlate}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isTrip 
                            ? `From ${activity.startLocation} to ${activity.endLocation}`
                            : activity.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(isTrip ? activity.startTime : activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Vehicle Fleet</h2>
        </div>
        <VehicleList />
      </div>
    </div>
  );
}