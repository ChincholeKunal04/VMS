import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, User, Car, Route, Clock, 
  AlertTriangle, CheckCircle, XCircle, Edit2 
} from 'lucide-react';
import { useStore } from '../../store';
import StatusBadge from '../shared/StatusBadge';
import { format } from 'date-fns';

export default function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [action, setAction] = useState<'start' | 'complete' | 'cancel' | null>(null);

  const trip = useStore((state) => state.trips.find(t => t.id === id));
  const vehicle = useStore((state) => 
    state.vehicles.find(v => v.id === trip?.vehicleId)
  );
  const driver = useStore((state) => 
    state.drivers.find(d => d.id === trip?.driverId)
  );
  const updateTrip = useStore((state) => state.updateTrip);
  const updateVehicle = useStore((state) => state.updateVehicle);
  const updateDriver = useStore((state) => state.updateDriver);

  if (!trip || !vehicle || !driver) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Trip not found</h2>
      </div>
    );
  }

  const handleTripAction = (action: 'start' | 'complete' | 'cancel') => {
    setAction(action);
    setShowConfirmation(true);
  };

  const confirmAction = () => {
    if (!action) return;

    switch (action) {
      case 'start':
        updateTrip(trip.id, { status: 'in-progress' });
        updateVehicle(vehicle.id, { status: 'in-use' });
        updateDriver(driver.id, { status: 'on-trip' });
        break;
      case 'complete':
        updateTrip(trip.id, { status: 'completed' });
        updateVehicle(vehicle.id, { status: 'available' });
        updateDriver(driver.id, { 
          status: 'available',
          totalTrips: driver.totalTrips + 1
        });
        break;
      case 'cancel':
        updateTrip(trip.id, { status: 'cancelled' });
        updateVehicle(vehicle.id, { status: 'available' });
        updateDriver(driver.id, { status: 'available' });
        break;
    }

    setShowConfirmation(false);
    setAction(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Trip Details</h2>
            <StatusBadge status={trip.status} />
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Route Information</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    Start Location
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{trip.startLocation}</dd>
                </div>
                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    End Location
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{trip.endLocation}</dd>
                </div>
                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <Route className="h-4 w-4 mr-2" />
                    Distance
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{trip.distance} km</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Start Time
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(trip.startTime), 'PPpp')}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    Expected End Time
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {trip.endTime ? format(new Date(trip.endTime), 'PPpp') : 'Not set'}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <Car className="h-4 w-4 mr-2" />
                    Vehicle Details
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </dd>
                  <dd className="text-sm text-gray-500">
                    License Plate: {vehicle.licensePlate}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Driver</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    Driver Details
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{driver.name}</dd>
                  <dd className="text-sm text-gray-500">{driver.contactNumber}</dd>
                </div>
              </dl>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                  <dd className="mt-1 text-sm text-gray-900">{trip.purpose}</dd>
                </div>
                {trip.notes && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900">{trip.notes}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            {trip.status === 'planned' && (
              <>
                <button
                  onClick={() => handleTripAction('start')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Start Trip
                </button>
                <button
                  onClick={() => handleTripAction('cancel')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Trip
                </button>
              </>
            )}
            {trip.status === 'in-progress' && (
              <button
                onClick={() => handleTripAction('complete')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Trip
              </button>
            )}
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Confirm Action</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {action === 'start' && 'Are you sure you want to start this trip?'}
              {action === 'complete' && 'Are you sure you want to mark this trip as completed?'}
              {action === 'cancel' && 'Are you sure you want to cancel this trip?'}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmAction}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}