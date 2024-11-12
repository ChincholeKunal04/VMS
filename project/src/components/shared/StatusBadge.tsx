import React from 'react';

interface StatusBadgeProps {
  status: 'available' | 'in-use' | 'maintenance' | 'on-trip' | 'off-duty' | 'planned' | 'in-progress' | 'completed' | 'cancelled';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in-use':
      case 'on-trip':
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      case 'off-duty':
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles()}`}>
      {status.replace('-', ' ')}
    </span>
  );
}