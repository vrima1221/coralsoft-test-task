import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthData, User } from "../../types/auth";

export const loginUser = createAsyncThunk<
  User, // Return type (user object or error)
  { email: string; password: string }, // Arguments type
  { rejectValue: string } // Type for rejectWithValue
>(
  "authentication/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email !== "test@test.test") {
        return rejectWithValue("User not found");
      }

      if (password !== "password") {
        return rejectWithValue("Wrong password");
      }

      const user = {
        email,
        name: email.split("@")[0],
        id: Math.random().toString(36).substring(7),
        role: "user",
      };

      sessionStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue("Server error");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "authentication/logoutUser",
  async () => {
    sessionStorage.removeItem("user");
  }
);

const storedUser = sessionStorage.getItem("user");

const initialState: AuthData = storedUser
  ? {
      isAuthenticated: true,
      user: JSON.parse(storedUser),
      loading: false,
      error: null,
    }
  : {
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    };

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
