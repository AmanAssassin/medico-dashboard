
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import DeviceCard from '@/components/dashboard/DeviceCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, AlertTriangle, Calendar, Plus, Search } from 'lucide-react';

const Dashboard = () => {
  const { devices } = useSelector((state: RootState) => state.devices);
  const { installations } = useSelector((state: RootState) => state.installations);
  const { visits } = useSelector((state: RootState) => state.services);
  const { contracts } = useSelector((state: RootState) => state.amc);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalDevices: devices.length,
    onlineDevices: devices.filter(d => d.status === 'Online').length,
    maintenanceDevices: devices.filter(d => d.status === 'Maintenance').length,
    pendingInstallations: installations.filter(i => i.status === 'Scheduled').length,
    expiringContracts: contracts.filter(c => c.status === 'Expiring Soon').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Device Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your medical device inventory</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Devices</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDevices}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Online</p>
                <p className="text-2xl font-bold text-green-600">{stats.onlineDevices}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.maintenanceDevices}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Installs</p>
                <p className="text-2xl font-bold text-purple-600">{stats.pendingInstallations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Expiring AMC</p>
                <p className="text-2xl font-bold text-red-600">{stats.expiringContracts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search devices, facilities, or IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onEdit={(device) => console.log('Edit device:', device)}
          />
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No devices found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
