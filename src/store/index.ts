
import { configureStore } from '@reduxjs/toolkit';
import deviceSlice from './slices/deviceSlice';
import installationSlice from './slices/installationSlice';
import serviceSlice from './slices/serviceSlice';
import amcSlice from './slices/amcSlice';

export const store = configureStore({
  reducer: {
    devices: deviceSlice,
    installations: installationSlice,
    services: serviceSlice,
    amc: amcSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
