import { RootState } from '@/shared/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITimelineSliceState {
  timeLineScroll: number;
}

const initialState: ITimelineSliceState = {
  timeLineScroll: 0,
};

const TimelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    setScroll: (state, action: PayloadAction<number>) => {
      state.timeLineScroll = action.payload;
    },
  },
});

export const { setScroll } = TimelineSlice.actions;

export const timelineSelectors = {
  test: (state: RootState) => state.exampleName.test,
};

export default TimelineSlice.reducer;
