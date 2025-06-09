import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeLink: null,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setActiveLink(state, action) {
      state.activeLink = action.payload;
    },
  },
});

export const { setActiveLink } = headerSlice.actions;
export default headerSlice.reducer;
