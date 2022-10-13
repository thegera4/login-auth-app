import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: '',
  },
  reducers: {
    authenticate(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      AsyncStorage.setItem('token', action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = '';
      AsyncStorage.removeItem('token');
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export const logout = authSlice.actions.logout;
export default authSlice.reducer;

