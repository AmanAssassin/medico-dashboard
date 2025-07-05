
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Battery, Calendar, Settings, CheckCircle } from 'lucide-react';

const Alerts = () => {
  const alerts = [
    {
      id: 'ALT001',
      type: 'Battery Low',
      deviceId: 'DEV003',
      message: 'Battery level below 20% - requires immediate attention',
      severity: 'High',
      timestamp: '2024-07-02T10:30:00Z',
      status: 'Active',
      icon: Battery,
    },
    {
      id: 'ALT002',
      type: 'Contract Expiring',
      deviceId: 'DEV002',
      message: 'AMC contract expires in 15 days',
      severity: 'Medium',
      timestamp: '2024-07-01T14:15:00Z',
      status: 'Active',
      icon: Calendar,
    },
    {
      id: 'ALT003',
      type: 'Maintenance Due',
      deviceId: 'DEV001',
      message: 'Preventive maintenance scheduled for next week',
      severity: 'Low',
      timestamp: '2024-06-30T09:00:00Z',
      status: 'Acknowledged',
      icon: Settings,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'Medium': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'Low': return <AlertTriangle className="h-5 w-5 text-blue-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="text-gray-600">Monitor system alerts and device issues</p>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">
                  {alerts.filter(a => a.severity === 'High' && a.status === 'Active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Medium Priority</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {alerts.filter(a => a.severity === 'Medium' && a.status === 'Active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Low Priority</p>
                <p className="text-2xl font-bold text-blue-600">
                  {alerts.filter(a => a.severity === 'Low').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const IconComponent = alert.icon;
          return (
            <Card key={alert.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{alert.type}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-2">{alert.message}</p>
                      <div className="text-sm text-gray-500">
                        Device: {alert.deviceId} • {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {alert.status === 'Active' && (
                      <>
                        <Button variant="outline" size="sm">
                          Acknowledge
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Resolve
                        </Button>
                      </>
                    )}
                    {alert.status === 'Acknowledged' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {alerts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">All Clear!</h3>
            <p className="text-gray-600">No active alerts at this time.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Alerts;
