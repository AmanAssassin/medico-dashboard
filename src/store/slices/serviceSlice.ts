
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ServiceVisit {
  id: string;
  deviceId: string;
  date: string;
  engineer: string;
  purpose: 'Preventive' | 'Breakdown' | 'Installation' | 'Training';
  notes: string;
  attachments: string[];
  status: 'Completed' | 'In Progress' | 'Scheduled';
  duration: number; // in hours
}

interface ServiceState {
  visits: ServiceVisit[];
  loading: boolean;
}

const initialState: ServiceState = {
  visits: [
    {
      id: 'SVC001',
      deviceId: 'DEV001',
      date: '2024-06-15',
      engineer: 'Mike Johnson',
      purpose: 'Preventive',
      notes: 'Routine maintenance completed. All systems functioning normally.',
      attachments: [],
      status: 'Completed',
      duration: 2
    },
    {
      id: 'SVC002',
      deviceId: 'DEV002',
      date: '2024-06-20',
      engineer: 'Sarah Davis',
      purpose: 'Breakdown',
      notes: 'Replaced faulty sensor. Device back online.',
      attachments: [],
      status: 'Completed',
      duration: 3
    }
  ],
  loading: false,
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    addServiceVisit: (state, action: PayloadAction<ServiceVisit>) => {
      state.visits.push(action.payload);
    },
    updateServiceVisit: (state, action: PayloadAction<ServiceVisit>) => {
      const index = state.visits.findIndex(visit => visit.id === action.payload.id);
      if (index !== -1) {
        state.visits[index] = action.payload;
      }
    },
    deleteServiceVisit: (state, action: PayloadAction<string>) => {
      state.visits = state.visits.filter(visit => visit.id !== action.payload);
    },
  },
});

export const { addServiceVisit, updateServiceVisit, deleteServiceVisit } = serviceSlice.actions;
export default serviceSlice.reducer;
