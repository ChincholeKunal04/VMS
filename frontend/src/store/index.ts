import { create } from 'zustand';
import { Vehicle, Driver, Trip, MaintenanceRecord, InventoryItem, Alert } from '../types';
import { vehicles as initialVehicles } from '../data/vehicles';

interface AppState {
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  maintenanceRecords: MaintenanceRecord[];
  inventory: InventoryItem[];
  alerts: Alert[];
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  removeVehicle: (id: string) => void;
  addDriver: (driver: Omit<Driver, 'id'>) => void;
  updateDriver: (id: string, driver: Partial<Driver>) => void;
  removeDriver: (id: string) => void;
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  removeTrip: (id: string) => void;
  addMaintenanceRecord: (record: Omit<MaintenanceRecord, 'id'>) => void;
  updateMaintenanceRecord: (id: string, record: Partial<MaintenanceRecord>) => void;
  removeMaintenanceRecord: (id: string) => void;
  updateInventory: (id: string, changes: Partial<InventoryItem>) => void;
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  updateAlertStatus: (id: string, status: Alert['status']) => void;
}

export const useStore = create<AppState>((set) => ({
  vehicles: initialVehicles,
  drivers: [],
  trips: [],
  maintenanceRecords: [],
  inventory: [],
  alerts: [],

  addVehicle: (vehicle) =>
    set((state) => ({
      vehicles: [...state.vehicles, { ...vehicle, id: `v${state.vehicles.length + 1}` }],
    })),

  updateVehicle: (id, vehicle) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) => (v.id === id ? { ...v, ...vehicle } : v)),
    })),

  removeVehicle: (id) =>
    set((state) => ({
      vehicles: state.vehicles.filter((v) => v.id !== id),
    })),

  addDriver: (driver) =>
    set((state) => ({
      drivers: [...state.drivers, { ...driver, id: `d${state.drivers.length + 1}` }],
    })),

  updateDriver: (id, driver) =>
    set((state) => ({
      drivers: state.drivers.map((d) => (d.id === id ? { ...d, ...driver } : d)),
    })),

  removeDriver: (id) =>
    set((state) => ({
      drivers: state.drivers.filter((d) => d.id !== id),
    })),

  addTrip: (trip) =>
    set((state) => ({
      trips: [...state.trips, { ...trip, id: `t${state.trips.length + 1}` }],
    })),

  updateTrip: (id, trip) =>
    set((state) => ({
      trips: state.trips.map((t) => (t.id === id ? { ...t, ...trip } : t)),
    })),

  removeTrip: (id) =>
    set((state) => ({
      trips: state.trips.filter((t) => t.id !== id),
    })),

    addMaintenanceRecord: (record) =>
      set((state) => {
        const newRecord = {
          ...record,
          id: `m${state.maintenanceRecords.length + 1}`
        };
  
        // Update vehicle status if maintenance is in progress
        if (record.status === 'in-progress') {
          const updatedVehicles = state.vehicles.map(v =>
            v.id === record.vehicleId ? { ...v, status: 'maintenance' } : v
          );
          return {
            maintenanceRecords: [...state.maintenanceRecords, newRecord],
            vehicles: updatedVehicles
          };
        }
  
        return {
          maintenanceRecords: [...state.maintenanceRecords, newRecord]
        };
      }),
  
    updateMaintenanceRecord: (id, record) =>
      set((state) => {
        const updatedRecords = state.maintenanceRecords.map(r =>
          r.id === id ? { ...r, ...record } : r
        );
  
        // Find the affected record and update vehicle status accordingly
        const affectedRecord = state.maintenanceRecords.find(r => r.id === id);
        if (affectedRecord && record.status) {
          const updatedVehicles = state.vehicles.map(v => {
            if (v.id === affectedRecord.vehicleId) {
              if (record.status === 'in-progress') {
                return { ...v, status: 'maintenance' };
              } else if (record.status === 'completed' || record.status === 'cancelled') {
                return { ...v, status: 'available' };
              }
            }
            return v;
          });
  
          return {
            maintenanceRecords: updatedRecords,
            vehicles: updatedVehicles
          };
        }
  
        return { maintenanceRecords: updatedRecords };
      }),
  
    removeMaintenanceRecord: (id) =>
      set((state) => {
        const recordToRemove = state.maintenanceRecords.find(r => r.id === id);
        const updatedRecords = state.maintenanceRecords.filter(r => r.id !== id);
  
        // If removing an in-progress maintenance, update vehicle status
        if (recordToRemove && recordToRemove.status === 'in-progress') {
          const updatedVehicles = state.vehicles.map(v =>
            v.id === recordToRemove.vehicleId ? { ...v, status: 'available' } : v
          );
          return {
            maintenanceRecords: updatedRecords,
            vehicles: updatedVehicles
          };
        }
  
        return { maintenanceRecords: updatedRecords };
      }),


  updateInventory: (id, changes) =>
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      ),
    })),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, { ...alert, id: `a${state.alerts.length + 1}` }],
    })),

  updateAlertStatus: (id, status) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, status } : alert
      ),
    })),
}));