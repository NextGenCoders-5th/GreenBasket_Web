import { IUser } from '@/types/user.type';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface AuthState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
}
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      if(action.payload.user ) {
        state.user = action.payload.user;
      };
      if(action.payload.token ) state.token = action.payload.token;
      if (action.payload.refreshToken ) state.refreshToken = action.payload.refreshToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
});
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectCurrentRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;

