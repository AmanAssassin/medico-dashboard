
import React from 'react';
import { Device } from '@/store/slices/deviceSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Calendar, Settings } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onEdit?: (device: Device) => void;
}

const DeviceCard = ({ device, onEdit }: DeviceCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-100 text-green-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAMCStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={() => onEdit?.(device)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {device.type}
          </CardTitle>
          <Badge className={getStatusColor(device.status)}>
            {device.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{device.id} • {device.facilityName}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Battery Level</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getBatteryColor(device.batteryLevel)} transition-all duration-300`}
                style={{ width: `${device.batteryLevel}%` }}
              />
            </div>
            <span className="text-sm font-medium">{device.batteryLevel}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Location</p>
            <p className="font-medium">{device.location}</p>
          </div>
          <div>
            <p className="text-gray-600">Serial No.</p>
            <p className="font-medium">{device.serialNumber}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Last Service: {new Date(device.lastServiceDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">AMC Status</span>
          <Badge className={getAMCStatusColor(device.amcStatus)}>
            {device.amcStatus}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
