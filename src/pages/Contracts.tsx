
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, DollarSign, Building, Plus } from 'lucide-react';

const Contracts = () => {
  const { contracts } = useSelector((state: RootState) => state.amc);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContractTypeColor = (type: string) => {
    switch (type) {
      case 'AMC': return 'bg-blue-100 text-blue-800';
      case 'CMC': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilExpiry = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AMC/CMC Contracts</h1>
          <p className="text-gray-600">Track maintenance contracts and renewals</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Contract
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Active Contracts</p>
                <p className="text-2xl font-bold text-green-600">
                  {contracts.filter(c => c.status === 'Active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {contracts.filter(c => c.status === 'Expiring Soon').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${contracts.reduce((sum, c) => sum + c.contractValue, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contracts.map((contract) => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Device: {contract.deviceId}
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge className={getContractTypeColor(contract.contractType)}>
                    {contract.contractType}
                  </Badge>
                  <Badge className={getStatusColor(contract.status)}>
                    {contract.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-medium">{new Date(contract.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">End Date</p>
                    <p className="font-medium">{new Date(contract.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Contract Value</p>
                    <p className="font-medium">${contract.contractValue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Vendor</p>
                    <p className="font-medium">{contract.vendor}</p>
                  </div>
                </div>
              </div>

              {contract.status === 'Expiring Soon' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Expires in {getDaysUntilExpiry(contract.endDate)} days
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Coverage Details:</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {contract.coverageDetails}
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  View Contract
                </Button>
                <Button variant="outline" size="sm">
                  Renew
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {contracts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No contracts found</h3>
            <p className="text-gray-600 mb-4">Start by adding your first maintenance contract.</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Contract
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Contracts;
