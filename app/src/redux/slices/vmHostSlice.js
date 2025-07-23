import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vmHostApi from '../api/vmHostApi';

// Async thunks
export const checkVmHostHealth = createAsyncThunk(
  'vmHost/healthCheck',
  async (_, { rejectWithValue }) => {
    try {
      const response = await vmHostApi.getVmHostHealthCheck();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to check VM host health');
    }
  }
);

export const fetchUserVms = createAsyncThunk(
  'vmHost/fetchUserVms',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await vmHostApi.getVms(userId);
      return response.data.data.vms;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user VMs');
    }
  }
);

export const createNewVm = createAsyncThunk(
  'vmHost/createVm',
  async (vmData, { rejectWithValue }) => {
    try {
      const response = await vmHostApi.createVm(vmData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create VM');
    }
  }
);

export const startVirtualMachine = createAsyncThunk(
  'vmHost/startVm',
  async (vmActionData, { rejectWithValue }) => {
    try {
      const response = await vmHostApi.startVm(vmActionData);
      return { vmId: vmActionData.vm_id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to start VM ${vmActionData.vm_id}`);
    }
  }
);

export const stopVirtualMachine = createAsyncThunk(
  'vmHost/stopVm',
  async (vmActionData, { rejectWithValue }) => {
    try {
      const response = await vmHostApi.stopVm(vmActionData);
      return { vmId: vmActionData.vm_id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to stop VM ${vmActionData.vm_id}`);
    }
  }
);

export const deleteVirtualMachine = createAsyncThunk(
  'vmHost/deleteVm',
  async (vmActionData, { rejectWithValue }) => {
    try {
      const response = await vmHostApi.deleteVm(vmActionData);
      return { vmId: vmActionData.vm_id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to delete VM ${vmActionData.vm_id}`);
    }
  }
);

export const getVmStatus = createAsyncThunk(
  'vmHost/vmStatus',
  async (vmStatusData, { rejectWithValue }) => {
    try {
      const response = await vmHostApi.statusVm(vmStatusData);
      return { vmId: vmStatusData.vm_id, ...response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to get status for VM ${vmStatusData.vm_id}`);
    }
  }
);

export const fetchVmMetrics = createAsyncThunk(
  'vmHost/vmMetrics',
  async ({ userId, vmName }, { rejectWithValue }) => {
    try {
      const response = await vmHostApi.getVmMetrics(userId, vmName);
      return { vmName, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to get metrics for VM ${vmName}`);
    }
  }
);

// Initial state
const initialState = {
  vms: [],
  vmStatus: {},
  vmMetrics: {},
  healthStatus: null,
  isLoading: false,
  error: null,
  success: false
};

const vmHostSlice = createSlice({
  name: 'vmHost',
  initialState,
  reducers: {
    clearVmHostError: (state) => {
      state.error = null;
    },
    resetVmHostState: () => initialState,
    clearVmMetrics: (state) => {
      state.vmMetrics = {};
    }
  },
  extraReducers: (builder) => {
    builder
      // Health check
      .addCase(checkVmHostHealth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.healthStatus = action.payload;
      })
      
      // Fetch user VMs
      .addCase(fetchUserVms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vms = action.payload;
      })
      
      // Create VM
      .addCase(createNewVm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.vms.unshift(action.payload);
      })
      
      // Start VM
      .addCase(startVirtualMachine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.vms = state.vms.map(vm => 
          vm.id === action.payload.vmId ? { ...vm, status: 'running' } : vm
        );
      })
      
      // Stop VM
      .addCase(stopVirtualMachine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.vms = state.vms.map(vm => 
          vm.id === action.payload.vmId ? { ...vm, status: 'stopped' } : vm
        );
      })
      
      // Delete VM
      .addCase(deleteVirtualMachine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.vms = state.vms.filter(vm => vm.id !== action.payload.vmId);
      })
      
      // Get VM status
      .addCase(getVmStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vmStatus = {
          ...state.vmStatus,
          [action.payload.vmId]: action.payload
        };
      })
      
      // Get VM metrics
      .addCase(fetchVmMetrics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vmMetrics = {
          ...state.vmMetrics,
          [action.payload.vmName]: action.payload
        };
      })
      // Common pending state
      .addMatcher(
        (action) => action.type.startsWith('vmHost/') && action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.success = false;
        }
      )
      
      // Common rejected state
      .addMatcher(
        (action) => action.type.startsWith('vmHost/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  }
});

// Export actions and reducer
export const { 
  clearVmHostError, 
  resetVmHostState,
  clearVmMetrics 
} = vmHostSlice.actions;
export default vmHostSlice.reducer;

// Selectors
export const selectUserVms = (state) => state.vmHost.vms;
export const selectVmStatus = (state, vmId) => state.vmHost.vmStatus[vmId];
export const selectVmMetrics = (state, vmName) => state.vmHost.vmMetrics[vmName];
export const selectVmHostHealth = (state) => state.vmHost.healthStatus;
export const selectVmHostLoading = (state) => state.vmHost.isLoading;
export const selectVmHostError = (state) => state.vmHost.error;
export const selectVmHostSuccess = (state) => state.vmHost.success;