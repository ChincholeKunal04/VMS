import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Users, MapPin, Package, BarChart2, Bell } from 'lucide-react';
import { useStore } from '../store';

export default function Navbar() {
  const location = useLocation();
  const alerts = useStore((state) => state.alerts);
  const newAlerts = alerts.filter((alert) => alert.status === 'new').length;

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Car },
    { name: 'Vehicles', href: '/vehicles', icon: Car },
    { name: 'Drivers', href: '/drivers', icon: Users },
    { name: 'Trips', href: '/trips', icon: MapPin },
    { name: 'Maintenance', href: '/maintenance' },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  ];

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8" />
            <span className="font-bold text-xl">FleetMaster Pro</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.href
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-700'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <Link
              to="/alerts"
              className="relative p-2 rounded-full hover:bg-indigo-700"
            >
              <Bell className="h-6 w-6" />
              {newAlerts > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
                  {newAlerts}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}