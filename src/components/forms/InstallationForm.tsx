
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInstallation, Installation } from '@/store/slices/installationSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface InstallationFormProps {
  onClose?: () => void;
}

const InstallationForm = ({ onClose }: InstallationFormProps) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    deviceId: '',
    facilityName: '',
    installationDate: '',
    technician: '',
    notes: '',
    checklist: {
      unboxingPhotos: false,
      functionalTest: false,
      trainingCompleted: false,
      documentationSigned: false,
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.deviceId || !formData.facilityName || !formData.installationDate || !formData.technician) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newInstallation: Installation = {
      id: `INST${Date.now()}`,
      ...formData,
      status: 'Scheduled',
      photos: [],
    };

    dispatch(addInstallation(newInstallation));
    
    toast({
      title: "Installation Scheduled",
      description: "New installation has been added successfully.",
    });

    onClose?.();
  };

  const handleChecklistChange = (field: keyof typeof formData.checklist, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [field]: checked
      }
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>New Installation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deviceId">Device ID *</Label>
              <Input
                id="deviceId"
                value={formData.deviceId}
                onChange={(e) => setFormData(prev => ({ ...prev, deviceId: e.target.value }))}
                placeholder="Enter device ID"
                required
              />
            </div>
            <div>
              <Label htmlFor="facilityName">Facility Name *</Label>
              <Input
                id="facilityName"
                value={formData.facilityName}
                onChange={(e) => setFormData(prev => ({ ...prev, facilityName: e.target.value }))}
                placeholder="Enter facility name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="installationDate">Installation Date *</Label>
              <Input
                id="installationDate"
                type="date"
                value={formData.installationDate}
                onChange={(e) => setFormData(prev => ({ ...prev, installationDate: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="technician">Technician *</Label>
              <Input
                id="technician"
                value={formData.technician}
                onChange={(e) => setFormData(prev => ({ ...prev, technician: e.target.value }))}
                placeholder="Enter technician name"
                required
              />
            </div>
          </div>

          <div>
            <Label>Installation Checklist</Label>
            <div className="mt-2 space-y-2">
              {Object.entries(formData.checklist).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => 
                      handleChecklistChange(key as keyof typeof formData.checklist, checked as boolean)
                    }
                  />
                  <Label htmlFor={key} className="text-sm">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Enter installation notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule Installation
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InstallationForm;
