type VehicleStatus = "available" | "in-use" | "maintenance" | string;

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: VehicleStatus;
  fuelLevel: number;
  mileage: number;
  lastService: string;
  type: 'sedan' | 'suv' | 'truck' | 'van';
  nextService?: string;
  assignedDriverId?: string;
  fuelEfficiency: number;
  insuranceExpiry: string;
  registrationExpiry: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseExpiry: string;
  contactNumber: string;
  email: string;
  status: 'available' | 'on-trip' | 'off-duty';
  assignedVehicleId?: string;
  rating: number;
  totalTrips: number;
  joinDate: string;
  emergencyContact: string;
}

export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  startTime: string;
  endTime?: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  purpose: string;
  fuelConsumed?: number;
  notes?: string;
  issues?: string[];
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: string;
  type: 'routine' | 'repair' | 'inspection';
  description: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  cost: number;
  technicianName: string;
  partsUsed: InventoryItem[];
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'part' | 'supply' | 'tool';
  quantity: number;
  minimumQuantity: number;
  unitPrice: number;
  location: string;
  supplier: string;
  lastRestocked: string;
  compatibleVehicles: string[];
}

export interface Alert {
  id: string;
  type: 'maintenance' | 'inventory' | 'license' | 'insurance' | 'registration';
  severity: 'low' | 'medium' | 'high';
  message: string;
  date: string;
  status: 'new' | 'acknowledged' | 'resolved';
  relatedId?: string;
}