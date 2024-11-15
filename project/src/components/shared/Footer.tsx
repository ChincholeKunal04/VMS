import React from 'react';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-6 w-6" />
              <span className="text-xl font-bold">FleetMaster Pro</span>
            </div>
            <p className="text-gray-400 text-sm">
              Streamlining fleet management operations with comprehensive vehicle tracking, 
              maintenance scheduling, and resource optimization.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/vehicles" className="hover:text-white">Vehicles</a></li>
              <li><a href="/drivers" className="hover:text-white">Drivers</a></li>
              <li><a href="/maintenance" className="hover:text-white">Maintenance</a></li>
              <li><a href="/trips" className="hover:text-white">Trips</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/inventory" className="hover:text-white">Inventory</a></li>
              <li><a href="/analytics" className="hover:text-white">Analytics</a></li>
              <li><a href="/alerts" className="hover:text-white">Alerts</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@fleetmaster.pro</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Fleet Street, Nanded, MH</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} FleetMaster Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}