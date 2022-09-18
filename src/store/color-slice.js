import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  colorList: [],
  copied: false,
  submitted: false,
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    addToList(state, action) {
      state.colorList.push(action.payload);
    },
    resetList(state) {
      state.colorList = [];
    },
    setCopiedTrue(state) {
      state.copied = true;
    },
    setCopiedFalse(state) {
      state.copied = false;
    },
    setSubmitTrue(state) {
      state.submitted = true;
    },
    setSubmitFalse(state) {
      state.submitted = false;
    },
  },
});

export const colorActions = colorSlice.actions;
export default colorSlice.reducer;
