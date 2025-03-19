import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    otherUsers: null,
    selectedUsers: null,
    onlineUsers: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});
export const {
  setAuthUser,
  setLoading,
  setOtherUsers,
  setSelectedUsers,
  setOnlineUsers,
} = userSlice.actions;
export default userSlice.reducer;
