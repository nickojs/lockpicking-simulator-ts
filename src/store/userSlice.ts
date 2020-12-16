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
    setAuth(state, action: PayloadAction<{ token: string, username: string }>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    clearAuth() {
      return initialState;
    }
  }
});

export const { setAuth, clearAuth } = userSlice.actions;
export default userSlice.reducer;
