import { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    licensePlate: 'ABC123',
    status: 'available',
    fuelLevel: 65,
    mileage: 15000,
    lastService: '2024-02-15',
    type: 'sedan',
    fuelEfficiency: 50,
    insuranceExpiry: "",
    registrationExpiry: ""
  },
  {
    id: 'v2',
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    licensePlate: 'XYZ789',
    status: 'in-use',
    fuelLevel: 45,
    mileage: 28000,
    lastService: '2024-01-20',
    type: 'suv',
    fuelEfficiency: 50,
    insuranceExpiry: "",
    registrationExpiry: ""
  },
  {
    id: 'v3',
    make: 'Ford',
    model: 'F-150',
    year: 2023,
    licensePlate: 'DEF456',
    status: 'maintenance',
    fuelLevel: 30,
    mileage: 35000,
    lastService: '2024-03-01',
    type: 'truck',
    fuelEfficiency: 50,
    insuranceExpiry: "",
    registrationExpiry: ""
  },
  {
    id: 'v4',
    make: 'Ford',
    model: 'F-350',
    year: 2022,
    licensePlate: 'DEF496',
    status: 'available',
    fuelLevel: 60,
    mileage: 33000,
    lastService: '2024-03-01',
    type: 'suv',
    fuelEfficiency: 80,
    insuranceExpiry: "",
    registrationExpiry: ""
  }
];