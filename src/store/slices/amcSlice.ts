
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AMCContract {
  id: string;
  deviceId: string;
  contractType: 'AMC' | 'CMC';
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Expiring Soon';
  contractValue: number;
  vendor: string;
  coverageDetails: string;
}

interface AMCState {
  contracts: AMCContract[];
  loading: boolean;
}

const initialState: AMCState = {
  contracts: [
    {
      id: 'AMC001',
      deviceId: 'DEV001',
      contractType: 'AMC',
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      status: 'Active',
      contractValue: 15000,
      vendor: 'MedTech Solutions',
      coverageDetails: 'Full maintenance including parts and labor'
    },
    {
      id: 'AMC002',
      deviceId: 'DEV002',
      contractType: 'CMC',
      startDate: '2024-02-10',
      endDate: '2024-08-10',
      status: 'Expiring Soon',
      contractValue: 8000,
      vendor: 'Healthcare Services Ltd',
      coverageDetails: 'Comprehensive maintenance contract'
    }
  ],
  loading: false,
};

const amcSlice = createSlice({
  name: 'amc',
  initialState,
  reducers: {
    addContract: (state, action: PayloadAction<AMCContract>) => {
      state.contracts.push(action.payload);
    },
    updateContract: (state, action: PayloadAction<AMCContract>) => {
      const index = state.contracts.findIndex(contract => contract.id === action.payload.id);
      if (index !== -1) {
        state.contracts[index] = action.payload;
      }
    },
    deleteContract: (state, action: PayloadAction<string>) => {
      state.contracts = state.contracts.filter(contract => contract.id !== action.payload);
    },
  },
});

export const { addContract, updateContract, deleteContract } = amcSlice.actions;
export default amcSlice.reducer;
