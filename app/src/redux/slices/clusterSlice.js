import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clusterApi from '../api/clusterApi';

// Async thunks
export const checkClusterHealth = createAsyncThunk(
  'cluster/healthCheck',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clusterApi.getHealthCheck();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed health check');
    }
  }
);

export const fetchClusterInfo = createAsyncThunk(
  'cluster/info',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clusterApi.getInfo();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch cluster info');
    }
  }
);

export const fetchAllClusters = createAsyncThunk(
  'cluster/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clusterApi.getClusters();
      // Check different possible response structures
      return response.data?.data?.clusters || 
             response.data?.data?.data?.clusters || 
             response.data?.clusters || 
             response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch clusters');
    }
  }
);

export const fetchClusterById = createAsyncThunk(
  'cluster/fetchById',
  async (cluster_id, { rejectWithValue }) => {
    try {
      const response = await clusterApi.getClusterById(cluster_id);
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to fetch cluster ${cluster_id}`);
    }
  }
);

export const fetchAvailableClusters = createAsyncThunk(
  'cluster/fetchAvailable',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clusterApi.getAvailableClusters();
      // Check different possible response structures
      return response.data?.data?.clusters || 
             response.data?.data?.data?.clusters || 
             response.data?.clusters || 
             response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch available clusters');
    }
  }
);

export const addCluster = createAsyncThunk(
  'cluster/create',
  async (clusterData, { rejectWithValue }) => {
    try {
      const response = await clusterApi.createCluster(clusterData);
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create cluster');
    }
  }
);

export const modifyCluster = createAsyncThunk(
  'cluster/update',
  async ({ cluster_id, clusterData }, { rejectWithValue }) => {
    try {
      const response = await clusterApi.updateCluster(cluster_id, clusterData);
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to update cluster ${cluster_id}`);
    }
  }
);

export const removeCluster = createAsyncThunk(
  'cluster/delete',
  async (cluster_id, { rejectWithValue }) => {
    try {
      const response = await clusterApi.deleteCluster(cluster_id);
      return { cluster_id, data: response.data?.data || response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to delete cluster ${cluster_id}`);
    }
  }
);

export const findHostForVM = createAsyncThunk(
  'cluster/findHost',
  async (vmRequirements, { rejectWithValue }) => {
    try {
      const response = await clusterApi.findSuitableHost(vmRequirements);
      return response.data.data.host || response.data.data.data.host;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to find suitable host');
    }
  }
);

// Initial state
const initialState = {
  clusters: [],
  availableClusters: [],
  selectedCluster: null,
  suitableHost: null,
  healthStatus: null,
  serviceInfo: null,
  isLoading: false,
  error: null,
  success: false
};

const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    clearClusterError: (state) => {
      state.error = null;
    },
    resetClusterState: () => initialState,
    clearSuitableHost: (state) => {
      state.suitableHost = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Health check
      .addCase(checkClusterHealth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.healthStatus = action.payload;
      })
      
      // Service info
      .addCase(fetchClusterInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceInfo = action.payload;
      })
      
      // Fetch all clusters
      .addCase(fetchAllClusters.fulfilled, (state, action) => {
        state.isLoading = false;
        // Ensure we always set an array, even if the payload is undefined
        state.clusters = Array.isArray(action.payload) ? action.payload : [];
        console.log("Fetched clusters:", state.clusters);
      })
      
      // Fetch cluster by ID
      .addCase(fetchClusterById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCluster = action.payload;
      })
      
      // Fetch available clusters
      .addCase(fetchAvailableClusters.fulfilled, (state, action) => {
        state.isLoading = false;
        // Ensure we always set an array, even if the payload is undefined
        state.availableClusters = Array.isArray(action.payload) ? action.payload : [];
        console.log("Fetched available clusters:", state.availableClusters);
      })
      
      // Create cluster
      .addCase(addCluster.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        if (action.payload) {
          state.clusters.unshift(action.payload);
        }
      })
      
      // Update cluster
      .addCase(modifyCluster.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        if (action.payload?.id) {
          state.clusters = state.clusters.map(cluster => 
            cluster.id === action.payload.id ? action.payload : cluster
          );
          if (state.selectedCluster?.id === action.payload.id) {
            state.selectedCluster = action.payload;
          }
        }
      })
      
      // Delete cluster
      .addCase(removeCluster.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        if (action.payload?.cluster_id) {
          state.clusters = state.clusters.filter(
            cluster => cluster.id !== action.payload.cluster_id
          );
          if (state.selectedCluster?.id === action.payload.cluster_id) {
            state.selectedCluster = null;
          }
        }
      })
      
      // Find suitable host
      .addCase(findHostForVM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suitableHost = action.payload;
        console.log(action.payload);
      })
      
      // Common pending state
      .addMatcher(
        (action) => action.type.startsWith('cluster/') && action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.success = false;
        }
      )
      
      // Common rejected state
      .addMatcher(
        (action) => action.type.startsWith('cluster/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  }
});

// Export actions and reducer
export const { 
  clearClusterError, 
  resetClusterState,
  clearSuitableHost 
} = clusterSlice.actions;
export default clusterSlice.reducer;

// Selectors with proper fallbacks
export const selectAllClusters = (state) => state?.cluster?.clusters || [];
export const selectAvailableClusters = (state) => state?.cluster?.availableClusters || [];
export const selectSelectedCluster = (state) => state?.cluster?.selectedCluster || null;
export const selectSuitableHost = (state) => state?.cluster?.suitableHost || null;
export const selectClusterHealth = (state) => state?.cluster?.healthStatus || null;
export const selectClusterInfo = (state) => state?.cluster?.serviceInfo || null;
export const selectClusterLoading = (state) => state?.cluster?.isLoading || false;
export const selectClusterError = (state) => state?.cluster?.error || null;
export const selectClusterSuccess = (state) => state?.cluster?.success || false;