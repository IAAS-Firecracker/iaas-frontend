// src/hooks/useVmOffer.js
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVmOffers,
  addVmOffer,
  fetchVmOfferById,
  removeVmOffer,
  modifyVmOffer,
  searchOffers,
  fetchActiveVmOffers,
  checkVmOfferHealth,
  clearVmOfferError,
  resetVmOfferState,
  clearSearchResults,
  selectAllVmOffers,
  selectActiveVmOffers,
  selectSelectedVmOffer,
  selectVmOfferSearchResults,
  selectVmOfferHealth,
  selectVmOfferLoading,
  selectVmOfferError,
  selectVmOfferSuccess
} from '../redux/slices/vmOfferSlice';

const useVmOffer = () => {
  const dispatch = useDispatch();

  // Selectors
  const offers = useSelector(selectAllVmOffers);
  const activeOffers = useSelector(selectActiveVmOffers);
  const selectedOffer = useSelector(selectSelectedVmOffer);
  const searchResults = useSelector(selectVmOfferSearchResults);
  const healthStatus = useSelector(selectVmOfferHealth);
  const isLoading = useSelector(selectVmOfferLoading);
  const error = useSelector(selectVmOfferError);
  const success = useSelector(selectVmOfferSuccess);

  // VM Offer Management
  const getVmOffers = useCallback(async () => {
    try {
      await dispatch(fetchVmOffers()).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch VM offers' };
    }
  }, [dispatch]);

  const createVmOffer = useCallback(async (offerData) => {
    try {
      const result = await dispatch(addVmOffer(offerData)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to create VM offer' };
    }
  }, [dispatch]);

  const getVmOfferById = useCallback(async (vmOfferId) => {
    try {
      await dispatch(fetchVmOfferById(vmOfferId)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || `Failed to fetch VM offer ${vmOfferId}` };
    }
  }, [dispatch]);

  const deleteVmOffer = useCallback(async (vmOfferId) => {
    try {
      await dispatch(removeVmOffer(vmOfferId)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || `Failed to delete VM offer ${vmOfferId}` };
    }
  }, [dispatch]);

  const updateVmOffer = useCallback(async (vmOfferId, offerData) => {
    try {
      const result = await dispatch(modifyVmOffer({ vm_offer_id: vmOfferId, offerData })).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || `Failed to update VM offer ${vmOfferId}` };
    }
  }, [dispatch]);

  // Search and Filter
  const searchVmOffers = useCallback(async (name) => {
    try {
      const result = await dispatch(searchOffers(name)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to search VM offers' };
    }
  }, [dispatch]);

  const getActiveVmOffers = useCallback(async () => {
    try {
      await dispatch(fetchActiveVmOffers()).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch active VM offers' };
    }
  }, [dispatch]);

  // Health Check
  const getHealthStatus = useCallback(async () => {
    try {
      const result = await dispatch(checkVmOfferHealth()).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to check VM offer service health' };
    }
  }, [dispatch]);

  // Utility Functions
  const clearErrors = useCallback(() => {
    dispatch(clearVmOfferError());
  }, [dispatch]);

  const resetState = useCallback(() => {
    dispatch(resetVmOfferState());
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  // Helper to get offer by ID
  const getOfferById = useCallback((offerId) => {
    return offers.find(offer => offer.id === offerId) || 
           activeOffers.find(offer => offer.id === offerId);
  }, [offers, activeOffers]);

  return {
    // State
    offers,
    activeOffers,
    selectedOffer,
    searchResults,
    healthStatus,
    isLoading,
    error,
    success,

    // VM Offer Management
    getVmOffers,
    createVmOffer,
    getVmOfferById,
    deleteVmOffer,
    updateVmOffer,

    // Search and Filter
    searchVmOffers,
    getActiveVmOffers,

    // Health Check
    getHealthStatus,

    // Helpers
    getOfferById,

    // Utilities
    clearErrors,
    resetState,
    clearSearch
  };
};

export default useVmOffer;