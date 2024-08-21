import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },

    signOutUser: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { addUserInfo, signOutUser } = userSlice.actions;

export default userSlice.reducer;
