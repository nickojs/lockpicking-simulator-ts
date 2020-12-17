import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Config = {
  hotzone: number[];
  unlockzone: number[];
  lifeSpeed: number;
  info: string;
  startingTime: number;
}

interface SettingsState {
  gameOver: boolean;
  unlock: boolean;
  config: Config | null;
}

const initialState: SettingsState = {
  gameOver: false,
  unlock: false,
  config: null
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    unlockToggle(state, action: PayloadAction<boolean>) {
      state.unlock = action.payload;
    },
    gameOverToggle(state, action: PayloadAction<boolean>) {
      state.gameOver = action.payload;
    },
    setSettings(state, action: PayloadAction<{ settings: Config }>) {
      state.config = action.payload.settings;
    }
  }
});

export const { unlockToggle, gameOverToggle, setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
