import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  username: string | null;
}

const initialState: UserState = {
  token: null,
  username: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    clearAuth() {
      return initialState;
    }
  }
});

export const { setToken, setUserName, clearAuth } = userSlice.actions;
export default userSlice.reducer;
