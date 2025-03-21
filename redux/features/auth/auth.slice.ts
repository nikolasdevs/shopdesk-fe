import type { UserType } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

interface InitialType {
  isAuthenticated: boolean;
  user: UserType | null;
  isLoading: boolean;
  error: null;
  // TODO: Pay attention to this. this is what controls the whole app endpoint state dynamicity do not go beyond this scope !!!
  orgId: string | null;
}
const initialState: InitialType = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  orgId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuthLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    authenticationSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload.data;
    },
    setOrgId: (state, action) => {
      state.orgId = action.payload;
    },
  },
});

export const { startAuthLoading, authenticationSuccess, setUser, setOrgId } =
  authSlice.actions;

export default authSlice.reducer;
