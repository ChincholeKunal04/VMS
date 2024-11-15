import React, { useState } from 'react';
import { Bell, CheckCircle, Calendar, Package, FileText } from 'lucide-react';
import { useStore } from '../../store';
import { Alert } from '../../types';
import StatusBadge from '../shared/StatusBadge';
import { format } from 'date-fns';

export default function AlertCenter() {
  const [typeFilter, setTypeFilter] = useState<Alert['type'] | ''>('');
  const [severityFilter, setSeverityFilter] = useState<Alert['severity'] | ''>('');
  const [statusFilter, setStatusFilter] = useState<Alert['status'] | ''>('');

  const alerts = useStore((state) => state.alerts);
  const updateAlert = useStore((state) => state.updateAlert);
  const removeAlert = useStore((state) => state.removeAlert);
  const vehicles = useStore((state) => state.vehicles);
  const inventory = useStore((state) => state.inventory);
  const drivers = useStore((state) => state.drivers);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesType = !typeFilter || alert.type === typeFilter;
    const matchesSeverity = !severityFilter || alert.severity === severityFilter;
    const matchesStatus = !statusFilter || alert.status === statusFilter;
    return matchesType && matchesSeverity && matchesStatus;
  });

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'maintenance':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'inventory':
        return <Package className="h-5 w-5 text-yellow-500" />;
      case 'license':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'insurance':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'registration':
        return <FileText className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getRelatedItemDetails = (alert: Alert) => {
    if (!alert.relatedId) return null;

    switch (alert.type) {
      case 'maintenance':
        const vehicle = vehicles.find(v => v.id === alert.relatedId);
        return vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})` : null;
      case 'inventory':
        const item = inventory.find(i => i.id === alert.relatedId);
        return item ? item.name : null;
      case 'license':
        const driver = drivers.find(d => d.id === alert.relatedId);
        return driver ? driver.name : null;
      default:
        return null;
    }
  };

  const handleAcknowledge = (alertId: string) => {
    updateAlert(alertId, { status: 'acknowledged' });
  };

  const handleResolve = (alertId: string) => {
    updateAlert(alertId, { status: 'resolved' });

    setTimeout(() => {
      removeAlert(alertId);
    }, 2000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Alert Center</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {filteredAlerts.filter(a => a.status === 'new').length} new alerts
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as Alert['type'] | '')}
            >
              <option value="">All Types</option>
              <option value="maintenance">Maintenance</option>
              <option value="inventory">Inventory</option>
              <option value="license">License</option>
              <option value="insurance">Insurance</option>
              <option value="registration">Registration</option>
            </select>

            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as Alert['severity'] | '')}
            >
              <option value="">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Alert['status'] | '')}
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.message}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {format(new Date(alert.date), 'MMM d, yyyy HH:mm')}
                      </span>
                      <StatusBadge status={alert.status} />
                    </div>
                  </div>
                  {getRelatedItemDetails(alert) && (
                    <p className="mt-1 text-sm text-gray-500">
                      Related to: {getRelatedItemDetails(alert)}
                    </p>
                  )}
                  {alert.status !== 'resolved' && (
                    <div className="mt-4 flex space-x-3">
                      {alert.status === 'new' && (
                        <button
                          onClick={() => handleAcknowledge(alert.id)}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Acknowledge
                        </button>
                      )}
                      <button
                        onClick={() => handleResolve(alert.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark as Resolved
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredAlerts.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No alerts found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}