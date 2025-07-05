
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Device {
  id: string;
  type: string;
  facilityName: string;
  status: 'Online' | 'Offline' | 'Maintenance';
  batteryLevel: number;
  lastServiceDate: string;
  installationDate: string;
  amcStatus: 'Active' | 'Expired' | 'Expiring Soon';
  location: string;
  serialNumber: string;
}

interface DeviceState {
  devices: Device[];
  loading: boolean;
}

const initialState: DeviceState = {
  devices: [
    {
      id: 'DEV001',
      type: 'ECG Monitor',
      facilityName: 'City Hospital',
      status: 'Online',
      batteryLevel: 85,
      lastServiceDate: '2024-06-15',
      installationDate: '2024-01-15',
      amcStatus: 'Active',
      location: 'ICU Ward 1',
      serialNumber: 'ECG2024001'
    },
    {
      id: 'DEV002',
      type: 'Ventilator',
      facilityName: 'Metro Medical Center',
      status: 'Maintenance',
      batteryLevel: 92,
      lastServiceDate: '2024-06-20',
      installationDate: '2024-02-10',
      amcStatus: 'Expiring Soon',
      location: 'Emergency Room',
      serialNumber: 'VENT2024002'
    },
    {
      id: 'DEV003',
      type: 'Defibrillator',
      facilityName: 'General Hospital',
      status: 'Online',
      batteryLevel: 78,
      lastServiceDate: '2024-06-25',
      installationDate: '2024-03-01',
      amcStatus: 'Active',
      location: 'Cardiac Unit',
      serialNumber: 'DEF2024003'
    }
  ],
  loading: false,
};

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: (state, action: PayloadAction<Device>) => {
      state.devices.push(action.payload);
    },
    updateDevice: (state, action: PayloadAction<Device>) => {
      const index = state.devices.findIndex(device => device.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
    },
    deleteDevice: (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter(device => device.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addDevice, updateDevice, deleteDevice, setLoading } = deviceSlice.actions;
export default deviceSlice.reducer;
