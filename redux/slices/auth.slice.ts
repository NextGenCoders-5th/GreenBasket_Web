import { ErrorEnum } from '@/enums/error.enum';
import { ICurrentUser, IUser } from '@/types/user.type';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: ICurrentUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthChecked: boolean;
  error: ErrorEnum | null;
}
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    isAuthChecked: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      if (action.payload.user) {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      }
      if (action.payload.token) {
        state.token = action.payload.token;
      }
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
        // Store refresh token in localStorage for persistence
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setCredentials, logOut, setError } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectCurrentRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;
