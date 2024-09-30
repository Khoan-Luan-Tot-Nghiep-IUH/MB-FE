import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadUserFromStorage = async () => {
  try {
    const serializedUser = await AsyncStorage.getItem("user");
    return serializedUser ? JSON.parse(serializedUser) : null;
  } catch (err) {
    return null;
  }
};

const initialState = {
  userInfo: loadUserFromStorage(),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
