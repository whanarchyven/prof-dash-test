import { RootState } from '@/shared/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IContainerParametersSlice {
  containerParameters: {
    container: number;
    area: number;
    card: number;
  };
}

const initialState: IContainerParametersSlice = {
  containerParameters: {
    container: 0,
    area: 0,
    card: 0,
  },
};

const containerParametersSlice = createSlice({
  name: 'container',
  initialState,
  reducers: {
    setContainerWidth: (state, action: PayloadAction<number>) => {
      state.containerParameters.container =
        action.payload >= 0 ? action.payload : 0;
    },
    setAreaWidth: (state, action: PayloadAction<number>) => {
      state.containerParameters.area = action.payload >= 0 ? action.payload : 0;
    },
    setCardWidth: (state, action: PayloadAction<number>) => {
      state.containerParameters.card = action.payload >= 0 ? action.payload : 0;
    },
  },
});

export const { setContainerWidth, setCardWidth, setAreaWidth } =
  containerParametersSlice.actions;

export const containerParametersSelectors = {
  containerParameters: (state: RootState) =>
    state.containerParametersReducer.containerParameters,
};

export default containerParametersSlice.reducer;
