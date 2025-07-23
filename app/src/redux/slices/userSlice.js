// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../api/userApi';

// Async thunks for all user actions
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await userApi.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userApi.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Registration failed' });
    }
  }
);

export const createAdminUser = createAsyncThunk(
  'user/createAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await userApi.createAdmin(adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Admin creation failed' });
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch users' });
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch user' });
    }
  }
);

export const fetchLoggedInUser = createAsyncThunk(
  'user/fetchCurrent',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userApi.getLoggedInUser(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch current user' });
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await userApi.updateUser(userId, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update user' });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userApi.deleteUser(userId);
      return { userId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete user' });
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const response = await userApi.updateProfile(profileData, id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update profile' });
    }
  }
);

export const deleteUserProfile = createAsyncThunk(
  'user/deleteProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userApi.deleteProfile(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete profile' });
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await userApi.changeUserPassword(passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to change password' });
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  'user/requestReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await userApi.sendResetCode({ email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to request password reset' });
    }
  }
);

export const verifyResetCode = createAsyncThunk(
  'user/verifyCode',
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await userApi.verifyResetCode({ email, code });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to verify reset code' });
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ email, code, newPassword }, { rejectWithValue }) => {
    try {
      const response = await userApi.resetUserPassword({ email, code, newPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to reset password' });
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  'user/refreshToken',
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await userApi.refreshToken({ refreshToken });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to refresh token' });
    }
  }
);

// Initial state
const initialState = {
  currentUser: null,
  users: [],
  selectedUser: null,
  isAdmin: true,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  success: false,
  passwordReset: {
    email: null,
    isCodeVerified: false
  }
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserSuccess: (state) => {
      state.success = false;
    },
    resetPasswordResetState: (state) => {
      state.passwordReset = initialState.passwordReset;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token || action.payload.access;
        state.refreshToken = action.payload.refreshToken || action.payload.refresh;
        state.currentUser = action.payload.user;
      })
      
      // Register
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      
      // Get current user
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      
      // Get all users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      
      // Get user by ID
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
      })
      
      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        // Update in users list if exists
        state.users = state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        );
        // Update current user if it's them
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.users = state.users.filter(user => user.id !== action.payload.userId);
      })
      
      // Update profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.currentUser = { ...state.currentUser, ...action.payload };
      })
      
      // Password reset flow
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.passwordReset.email = action.payload.email;
      })
      .addCase(verifyResetCode.fulfilled, (state) => {
        state.isLoading = false;
        state.passwordReset.isCodeVerified = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.passwordReset = initialState.passwordReset;
      })
      
      // Token refresh
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.access || action.payload.token;
        state.isAuthenticated = true;
        if (action.payload.refresh) {
          state.refreshToken = action.payload.refresh;
        }
      })
       // Common pending state
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.success = false;
        }
      )
      
      // Common rejected state
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      ;
  },
});

// Export actions and reducer
export const { 
  logout, 
  clearUserError, 
  clearUserSuccess,
  resetPasswordResetState 
} = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUsers = (state) => state.user.users;
export const selectSelectedUser = (state) => state.user.selectedUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserToken = (state) => state.user.token;
export const selectUserError = (state) => state.user.error;
export const selectUserSuccess = (state) => state.user.success;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectPasswordResetState = (state) => state.user.passwordReset;