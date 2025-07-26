import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import systemImageApi from '../api/systemImageApi';

// Async thunks
export const fetchSystemImages = createAsyncThunk(
  'systemImages/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await systemImageApi.getSystemImages();
      return response.data.data.data.system_images;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch system images');
    }
  }
);

export const fetchSystemImageById = createAsyncThunk(
  'systemImages/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await systemImageApi.getSystemImageById(id);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch system image');
    }
  }
);

export const addSystemImages = createAsyncThunk(
  'systemImages/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await systemImageApi.createSystemImages(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create system image');
    }
  }
);

export const modifySystemImages = createAsyncThunk(
  'systemImages/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await systemImageApi.updateSystemImages(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update system image');
    }
  }
);

export const removeSystemImages = createAsyncThunk(
  'systemImages/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await systemImageApi.deleteSystemImages(id);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete system image');
    }
  }
);

export const searchImages = createAsyncThunk(
  'systemImages/search',
  async (name, { rejectWithValue }) => {
    try {
      const response = await systemImageApi.searchSystemImages(name);
      return response.data.data.system_images;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to search system images');
    }
  }
);

export const fetchByOsType = createAsyncThunk(
  'systemImages/fetchByOsType',
  async (os_type, { rejectWithValue }) => {
    try {
      const response = await systemImageApi.getSystemImageByOsType(os_type);
      return response.data.data.system_images;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch by OS type');
    }
  }
);

export const checkHealth = createAsyncThunk(
  'systemImages/healthCheck',
  async (_, { rejectWithValue }) => {
    try {
      const response = await systemImageApi.getHealthCheck();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed health check');
    }
  }
);

// Initial state
const initialState = {
  images: [],
  selectedImage: null,
  searchResults: [],
  filteredByOsType: [],
  healthStatus: null,
  isLoading: false,
  error: null,
  success: false
};

const systemImageSlice = createSlice({
  name: 'systemImages',
  initialState,
  reducers: {
    clearSystemImageError: (state) => {
      state.error = null;
    },
    resetSystemImageState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Fetch all images
      .addCase(fetchSystemImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = action.payload;
        console.log("system images : ",state.images);
        
      })
      
      // Fetch single image
      .addCase(fetchSystemImageById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedImage = action.payload;
      })
      
      // Create image
      .addCase(addSystemImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.images.unshift(action.payload);
      })
      
      // Update image
      .addCase(modifySystemImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.images = state.images.map(img => 
          img.id === action.payload.id ? action.payload : img
        );
        if (state.selectedImage?.id === action.payload.id) {
          state.selectedImage = action.payload;
        }
      })
      
      // Delete image
      .addCase(removeSystemImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.images = state.images.filter(img => img.id !== action.payload.id);
        if (state.selectedImage?.id === action.payload.id) {
          state.selectedImage = null;
        }
      })
      
      // Search images
      .addCase(searchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      
      // Filter by OS type
      .addCase(fetchByOsType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredByOsType = action.payload;
      })
      
      // Health check
      .addCase(checkHealth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.healthStatus = action.payload;
      })
       // Common pending state
      .addMatcher(
        (action) => action.type.startsWith('systemImages/') && action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.success = false;
        }
      )
      
      // Common rejected state
      .addMatcher(
        (action) => action.type.startsWith('systemImages/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      ;
  }
});

// Export actions and reducer
export const { 
  clearSystemImageError, 
  resetSystemImageState 
} = systemImageSlice.actions;
export default systemImageSlice.reducer;

// Selectors
export const selectAllSystemImages = (state) => state.systemImages.images;
export const selectSelectedSystemImage = (state) => state.systemImages.selectedImage;
export const selectSearchResults = (state) => state.systemImages.searchResults;
export const selectFilteredByOsType = (state) => state.systemImages.filteredByOsType;
export const selectHealthStatus = (state) => state.systemImages.healthStatus;
export const selectSystemImagesLoading = (state) => state.systemImages.isLoading;
export const selectSystemImagesError = (state) => state.systemImages.error;
export const selectSystemImagesSuccess = (state) => state.systemImages.success;