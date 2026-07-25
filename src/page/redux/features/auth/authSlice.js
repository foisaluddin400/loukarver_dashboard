import { createSlice } from '@reduxjs/toolkit';

const getInitialToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || null;
};

const initialState = {
  user: null,
  token: getInitialToken(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token, rememberMe } = action.payload;
      state.token = token;
      if (rememberMe) {
        localStorage.setItem('token', token);
        sessionStorage.removeItem('token');
      } else {
        sessionStorage.setItem('token', token);
        localStorage.removeItem('token');
      }
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;