import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PickState {
  pickQtd: number;
  pickLife: number;
}

const initialState: PickState = {
  pickQtd: 3,
  pickLife: 100
};

const pickSlice = createSlice({
  name: 'pick',
  initialState,
  reducers: {
    reduceQtd(state) {
      state.pickQtd -= 1;
      state.pickLife = 100;
    },
    reduceLife(state, action: PayloadAction<number>) {
      state.pickLife -= action.payload;
    },
    clearPicks() {
      return initialState;
    }
  }
});

export const {
  reduceLife, reduceQtd, clearPicks
} = pickSlice.actions;
export default pickSlice.reducer;
