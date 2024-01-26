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
  timeLineScroll: (state: RootState) => state.timelineSlice.timeLineScroll,
};

export default TimelineSlice.reducer;
