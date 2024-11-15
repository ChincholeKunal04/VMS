import React from 'react';
import { useStore } from '../store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { subMonths, format } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Analytics() {
  const vehicles = useStore((state) => state.vehicles);
  const maintenanceRecords = useStore((state) => state.maintenanceRecords);
  const trips = useStore((state) => state.trips);

  // Vehicle Type Distribution
  const typeDistribution = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeChartData = {
    labels: Object.keys(typeDistribution).map(type => type.toUpperCase()),
    datasets: [
      {
        data: Object.values(typeDistribution),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
      },
    ],
  };

  // Status Distribution
  const statusCount = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = {
    labels: Object.keys(statusCount).map(status => status.replace('-', ' ').toUpperCase()),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
      },
    ],
  };

  // Monthly Maintenance Costs
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return format(date, 'MMM yyyy');
  }).reverse();

  const monthlyMaintenanceCosts = last6Months.map(month => {
    return maintenanceRecords
      .filter(record => format(new Date(record.date), 'MMM yyyy') === month)
      .reduce((sum, record) => sum + record.cost, 0);
  });

  const maintenanceCostData = {
    labels: last6Months,
    datasets: [
      {
        label: 'Maintenance Costs ($)',
        data: monthlyMaintenanceCosts,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  // Monthly Trip Statistics
  const monthlyTrips = last6Months.map(month => {
    return trips
      .filter(trip => 
        format(new Date(trip.startTime), 'MMM yyyy') === month &&
        trip.status === 'completed'
      ).length;
  });

  const tripData = {
    labels: last6Months,
    datasets: [
      {
        label: 'Completed Trips',
        data: monthlyTrips,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Fleet Composition</h3>
        <div className="h-64">
          <Pie
            data={typeChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Status</h3>
        <div className="h-64">
          <Pie
            data={statusChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance Costs (6 Months)</h3>
        <div className="h-64">
          <Line
            data={maintenanceCostData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Trip Statistics (6 Months)</h3>
        <div className="h-64">
          <Bar
            data={tripData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}