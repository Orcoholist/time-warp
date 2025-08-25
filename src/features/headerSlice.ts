// src/features/headerSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface HeaderState {
  activeLinkId: string | null;
}

const initialState: HeaderState = {
  activeLinkId: null,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setActiveLink(state, action) {
      state.activeLinkId = action.payload;
    },
  },
});

export const { setActiveLink } = headerSlice.actions;
export default headerSlice.reducer;
