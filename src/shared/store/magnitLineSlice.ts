import { RootState } from '@/shared/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMagnetLineState {
  display: boolean;
  date: Date;
}

const initialState: IMagnetLineState = {
  display: false,
  date: new Date(),
};

const MagnetLine = createSlice({
  name: 'magnetLine',
  initialState,
  reducers: {
    setDisplay: (state, action: PayloadAction<boolean>) => {
      state.display = action.payload;
    },
    setDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload;
    },
  },
});

export const magnetLineActions = MagnetLine.actions;

export const magnetLineSelectors = {
  display: (state: RootState) => state.magnetLineReducer.display,
  date: (state: RootState) => state.magnetLineReducer.date,
};

export default MagnetLine.reducer;
