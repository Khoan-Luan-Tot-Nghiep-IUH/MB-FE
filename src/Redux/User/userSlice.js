import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Thunk để tải user từ AsyncStorage
export const loadUserFromStorage = createAsyncThunk(
  "user/loadUserFromStorage",
  async () => {
    try {
      const serializedUser = await AsyncStorage.getItem("user");
      return serializedUser ? JSON.parse(serializedUser) : null;
    } catch (err) {
      return null;
    }
  }
);

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.userInfo = null;
      AsyncStorage.removeItem("user");
    },

    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      AsyncStorage.setItem("user", JSON.stringify(state.userInfo));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(loadUserFromStorage.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load user from storage";
      });
  },
});

export const { setCredentials, logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
