import { configureStore } from '@reduxjs/toolkit';
import colorSlice from './color-slice';

const store = configureStore({
  reducer: colorSlice,
});

export default store;
