import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  colorList: [],
  mainList: [],
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
    setMainList(state, action) {
      state.mainList = action.payload;
    },
    mainListFilter(state, action) {
      let keyword = action.payload.trim().toLowerCase();
      state.mainList = state.mainList.filter(v => v.title.includes(keyword));
    },
  },
});

export const colorActions = colorSlice.actions;
export default colorSlice.reducer;
