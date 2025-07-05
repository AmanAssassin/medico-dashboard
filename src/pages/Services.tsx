
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, FileText, Plus } from 'lucide-react';

const Services = () => {
  const { visits } = useSelector((state: RootState) => state.services);

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case 'Preventive': return 'bg-green-100 text-green-800';
      case 'Breakdown': return 'bg-red-100 text-red-800';
      case 'Installation': return 'bg-blue-100 text-blue-800';
      case 'Training': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Visit Logs</h1>
          <p className="text-gray-600">Track field visits and maintenance activities</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Log Service Visit
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visits.map((visit) => (
          <Card key={visit.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Device: {visit.deviceId}
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge className={getPurposeColor(visit.purpose)}>
                    {visit.purpose}
                  </Badge>
                  <Badge className={getStatusColor(visit.status)}>
                    {visit.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{new Date(visit.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>{visit.engineer}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{visit.duration} hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span>{visit.attachments.length} attachments</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Service Notes:</p>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-700">{visit.notes}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {visits.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No service visits logged</h3>
            <p className="text-gray-600 mb-4">Start tracking your service activities.</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Log First Visit
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Services;
