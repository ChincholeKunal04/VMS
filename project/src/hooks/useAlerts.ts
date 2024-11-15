import { useEffect } from 'react';
import { useStore } from '../store';
import { Vehicle, Driver, InventoryItem } from '../types';
import { addDays, isBefore, parseISO } from 'date-fns';

export function useAlerts() {
  const {
    vehicles,
    drivers,
    inventory,
    addAlert,
    alerts,
  } = useStore();

  useEffect(() => {
    // Check vehicle-related alerts
    vehicles.forEach((vehicle: Vehicle) => {
      const today = new Date();
      
      // Insurance expiry alert
      if (vehicle.insuranceExpiry) {
        const expiryDate = parseISO(vehicle.insuranceExpiry);
        const warningDate = addDays(today, 30);
        
        if (isBefore(expiryDate, warningDate) && !hasActiveAlert(alerts, 'insurance', vehicle.id)) {
          addAlert({
            type: 'insurance',
            severity: 'high',
            message: `Insurance for ${vehicle.make} ${vehicle.model} (${vehicle.licensePlate}) expires on ${vehicle.insuranceExpiry}`,
            status: 'new',
            date: vehicle.insuranceExpiry,
            relatedId: vehicle.id,
          });
        }
      }

      // Registration expiry alert
      if (vehicle.registrationExpiry) {
        const expiryDate = parseISO(vehicle.registrationExpiry);
        const warningDate = addDays(today, 30);
        
        if (isBefore(expiryDate, warningDate) && !hasActiveAlert(alerts, 'registration', vehicle.id)) {
          addAlert({
            type: 'registration',
            severity: 'high',
            message: `Registration for ${vehicle.make} ${vehicle.model} (${vehicle.licensePlate}) expires on ${vehicle.registrationExpiry}`,
            status: 'new',
            date: vehicle.registrationExpiry,
            relatedId: vehicle.id,
          });
        }
      }

      // Maintenance due alert
      if (vehicle.nextService) {
        const serviceDate = parseISO(vehicle.nextService);
        const warningDate = addDays(today, 7);
        
        if (isBefore(serviceDate, warningDate) && !hasActiveAlert(alerts, 'maintenance', vehicle.id)) {
          addAlert({
            type: 'maintenance',
            severity: 'medium',
            message: `Maintenance due for ${vehicle.make} ${vehicle.model} (${vehicle.licensePlate}) on ${vehicle.nextService}`,
            status: 'new',
            date: vehicle.nextService,
            relatedId: vehicle.id,
          });
        }
      }
    });

    // Check driver-related alerts
    drivers.forEach((driver: Driver) => {
      const today = new Date();
      
      // License expiry alert
      if (driver.licenseExpiry) {
        const expiryDate = parseISO(driver.licenseExpiry);
        const warningDate = addDays(today, 30);
        
        if (isBefore(expiryDate, warningDate) && !hasActiveAlert(alerts, 'license', driver.id)) {
          addAlert({
            type: 'license',
            severity: 'high',
            message: `Driver's license for ${driver.name} expires on ${driver.licenseExpiry}`,
            status: 'new',
            date: driver.licenseExpiry,
            relatedId: driver.id,
          });
        }
      }
    });

    // Check inventory-related alerts
    inventory.forEach((item: InventoryItem) => {
      // Low stock alert
      if (item.quantity <= item.minimumQuantity && !hasActiveAlert(alerts, 'inventory', item.id)) {
        addAlert({
            type: 'inventory',
            severity: item.quantity === 0 ? 'high' : 'medium',
            message: `Low stock alert: ${item.name} (${item.quantity} remaining)`,
            status: 'new',
            //date error
            relatedId: item.id,
            date: ''
        });
      }
    });
  }, [vehicles, drivers, inventory, alerts, addAlert]);
}

function hasActiveAlert(alerts: any[], type: string, relatedId: string): boolean {
  return alerts.some(
    alert =>
      alert.type === type &&
      alert.relatedId === relatedId &&
      alert.status !== 'resolved'
  );
}