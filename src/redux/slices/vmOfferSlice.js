import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vmOfferApi from '../api/vmOfferApi';

// Async thunks
export const fetchVmOffers = createAsyncThunk(
  'vmOffers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await vmOfferApi.getVmOffers();
      return response.data.data.data.vm_offers;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch VM offers');
    }
  }
);

export const addVmOffer = createAsyncThunk(
  'vmOffers/create',
  async (offerData, { rejectWithValue }) => {
    try {
      const response = await vmOfferApi.createVmOffer(offerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create VM offer');
    }
  }
);

export const fetchVmOfferById = createAsyncThunk(
  'vmOffers/fetchById',
  async (vm_offer_id, { rejectWithValue }) => {
    try {
      const response = await vmOfferApi.getVmOfferById(vm_offer_id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to fetch VM offer ${vm_offer_id}`);
    }
  }
);

export const removeVmOffer = createAsyncThunk(
  'vmOffers/delete',
  async (vm_offer_id, { rejectWithValue }) => {
    try {
      const response = await vmOfferApi.deleteVmOffer(vm_offer_id);
      return { vm_offer_id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to delete VM offer ${vm_offer_id}`);
    }
  }
);

export const modifyVmOffer = createAsyncThunk(
  'vmOffers/update',
  async ({ vm_offer_id, offerData }, { rejectWithValue }) => {
    try {
      const response = await vmOfferApi.updateVmOffer(vm_offer_id, offerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || `Failed to update VM offer ${vm_offer_id}`);
    }
  }
);

export const searchOffers = createAsyncThunk(
  'vmOffers/search',
  async (name, { rejectWithValue }) => {
    try {
      const response = await vmOfferApi.searchVmOffer(name);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to search VM offers');
    }
  }
);

export const fetchActiveVmOffers = createAsyncThunk(
  'vmOffers/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await vmOfferApi.getActiveVmOffers();
      console.log("Active vm offers : ",response.data.data.data);
      return response.data.data.data.offers;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch active VM offers');
    }
  }
);

export const checkVmOfferHealth = createAsyncThunk(
  'vmOffers/healthCheck',
  async (_, { rejectWithValue }) => {
    try {
      const response = await vmOfferApi.getVmOfferHealthCheck();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to check VM offer service health');
    }
  }
);

// Initial state
const initialState = {
  offers: [],
  activeOffers: [],
  selectedOffer: null,
  searchResults: [],
  healthStatus: null,
  isLoading: false,
  error: null,
  success: false
};

const vmOfferSlice = createSlice({
  name: 'vmOffers',
  initialState,
  reducers: {
    clearVmOfferError: (state) => {
      state.error = null;
    },
    resetVmOfferState: () => initialState,
    clearSearchResults: (state) => {
      state.searchResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all offers
      .addCase(fetchVmOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
        console.log("offers = ",action.payload);
      })
      
      // Create offer
      .addCase(addVmOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.offers.unshift(action.payload);
      })
      
      // Fetch offer by ID
      .addCase(fetchVmOfferById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOffer = action.payload;
      })
      
      // Delete offer
      .addCase(removeVmOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.offers = state.offers.filter(offer => offer.id !== action.payload.vm_offer_id);
        if (state.selectedOffer?.id === action.payload.vm_offer_id) {
          state.selectedOffer = null;
        }
      })
      
      // Update offer
      .addCase(modifyVmOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.offers = state.offers.map(offer => 
          offer.id === action.payload.id ? action.payload : offer
        );
        if (state.selectedOffer?.id === action.payload.id) {
          state.selectedOffer = action.payload;
        }
      })
      
      // Search offers
      .addCase(searchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      
      // Fetch active offers
      .addCase(fetchActiveVmOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeOffers = action.payload;
      })
      
      // Health check
      .addCase(checkVmOfferHealth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.healthStatus = action.payload;
      })
      // Common pending state
      .addMatcher(
        (action) => action.type.startsWith('vmOffers/') && action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.success = false;
        }
      )
      
      // Common rejected state
      .addMatcher(
        (action) => action.type.startsWith('vmOffers/') && action.type.endsWith('/rejected'),
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
  clearVmOfferError, 
  resetVmOfferState,
  clearSearchResults 
} = vmOfferSlice.actions;
export default vmOfferSlice.reducer;

// Selectors
export const selectAllVmOffers = (state) => state.vmOffers.offers;
export const selectActiveVmOffers = (state) => state.vmOffers.activeOffers;
export const selectSelectedVmOffer = (state) => state.vmOffers.selectedOffer;
export const selectVmOfferSearchResults = (state) => state.vmOffers.searchResults;
export const selectVmOfferHealth = (state) => state.vmOffers.healthStatus;
export const selectVmOfferLoading = (state) => state.vmOffers.isLoading;
export const selectVmOfferError = (state) => state.vmOffers.error;
export const selectVmOfferSuccess = (state) => state.vmOffers.success;