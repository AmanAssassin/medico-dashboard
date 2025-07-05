
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Installation {
  id: string;
  deviceId: string;
  facilityName: string;
  installationDate: string;
  technician: string;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  checklist: {
    unboxingPhotos: boolean;
    functionalTest: boolean;
    trainingCompleted: boolean;
    documentationSigned: boolean;
  };
  photos: string[];
  notes: string;
}

interface InstallationState {
  installations: Installation[];
  loading: boolean;
}

const initialState: InstallationState = {
  installations: [
    {
      id: 'INST001',
      deviceId: 'DEV001',
      facilityName: 'City Hospital',
      installationDate: '2024-01-15',
      technician: 'John Smith',
      status: 'Completed',
      checklist: {
        unboxingPhotos: true,
        functionalTest: true,
        trainingCompleted: true,
        documentationSigned: true,
      },
      photos: [],
      notes: 'Installation completed successfully. Staff training provided.'
    }
  ],
  loading: false,
};

const installationSlice = createSlice({
  name: 'installations',
  initialState,
  reducers: {
    addInstallation: (state, action: PayloadAction<Installation>) => {
      state.installations.push(action.payload);
    },
    updateInstallation: (state, action: PayloadAction<Installation>) => {
      const index = state.installations.findIndex(inst => inst.id === action.payload.id);
      if (index !== -1) {
        state.installations[index] = action.payload;
      }
    },
    deleteInstallation: (state, action: PayloadAction<string>) => {
      state.installations = state.installations.filter(inst => inst.id !== action.payload);
    },
  },
});

export const { addInstallation, updateInstallation, deleteInstallation } = installationSlice.actions;
export default installationSlice.reducer;
