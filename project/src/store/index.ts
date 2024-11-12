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
    set((state) => ({
      maintenanceRecords: [
        ...state.maintenanceRecords,
        { ...record, id: `m${state.maintenanceRecords.length + 1}` },
      ],
    })),

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