import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionId: null,
  user: {
    id: null,
    name: null,
    email: null,
    mobile: null,
    city: null,
    pincode: null,
    state: null,
    createdAt: null,
    updatedAt: null,
  },
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.sessionId = action.payload.sessionid;
      state.user = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        email: action.payload.user.email,
        mobile: action.payload.user.mobile,
        city: action.payload.user.city,
        pincode: action.payload.user.pincode,
        state: action.payload.user.state,
        createdAt: action.payload.user.createdAt,
        updatedAt: action.payload.user.updatedAt,
      };
      state.status = 'succeeded';
    },
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;