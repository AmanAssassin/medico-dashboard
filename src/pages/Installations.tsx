
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import InstallationForm from '@/components/forms/InstallationForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Calendar, User, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Installations = () => {
  const { installations } = useSelector((state: RootState) => state.installations);
  const [showForm, setShowForm] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Scheduled': return <Calendar className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
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

  const getChecklistProgress = (checklist: any) => {
    const completed = Object.values(checklist).filter(Boolean).length;
    const total = Object.keys(checklist).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Installation & Training</h1>
          <p className="text-gray-600">Manage device installations and staff training</p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Installation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Schedule New Installation</DialogTitle>
            </DialogHeader>
            <InstallationForm onClose={() => setShowForm(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {installations.map((installation) => (
          <Card key={installation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {installation.deviceId} - {installation.facilityName}
                </CardTitle>
                <Badge className={getStatusColor(installation.status)}>
                  <span className="flex items-center space-x-1">
                    {getStatusIcon(installation.status)}
                    <span>{installation.status}</span>
                  </span>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{new Date(installation.installationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>{installation.technician}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Checklist Progress</span>
                  <span className="text-sm text-gray-600">
                    {getChecklistProgress(installation.checklist)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getChecklistProgress(installation.checklist)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Checklist Items:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(installation.checklist).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={value ? 'text-green-700' : 'text-gray-500'}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {installation.notes && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {installation.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {installations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No installations yet</h3>
            <p className="text-gray-600 mb-4">Get started by scheduling your first installation.</p>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              Schedule Installation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Installations;
