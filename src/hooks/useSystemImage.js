// src/hooks/useSystemImage.js
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSystemImages,
  fetchSystemImageById,
  addSystemImages,
  modifySystemImages,
  removeSystemImages,
  searchImages,
  fetchByOsType,
  checkHealth,
  clearSystemImageError,
  resetSystemImageState,
  selectAllSystemImages,
  selectSelectedSystemImage,
  selectSearchResults,
  selectFilteredByOsType,
  selectHealthStatus,
  selectSystemImagesLoading,
  selectSystemImagesError,
  selectSystemImagesSuccess
} from '../redux/slices/systemImageSlice';

const useSystemImage = () => {
  const dispatch = useDispatch();

  // Selectors
  const images = useSelector(selectAllSystemImages);
  const selectedImage = useSelector(selectSelectedSystemImage);
  const searchResults = useSelector(selectSearchResults);
  const filteredByOsType = useSelector(selectFilteredByOsType);
  const healthStatus = useSelector(selectHealthStatus);
  const isLoading = useSelector(selectSystemImagesLoading);
  const error = useSelector(selectSystemImagesError);
  const success = useSelector(selectSystemImagesSuccess);

  // System Image Actions
  const getSystemImages = useCallback(async () => {
    try {
      await dispatch(fetchSystemImages()).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch system images' };
    }
  }, [dispatch]);

  const getSystemImageById = useCallback(async (id) => {
    try {
      await dispatch(fetchSystemImageById(id)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch system image' };
    }
  }, [dispatch]);

  const createSystemImage = useCallback(async (formData) => {
    try {
      const result = await dispatch(addSystemImages(formData)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to create system image' };
    }
  }, [dispatch]);

  const updateSystemImage = useCallback(async (id, data) => {
    try {
      const result = await dispatch(modifySystemImages({ id, data })).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to update system image' };
    }
  }, [dispatch]);

  const deleteSystemImage = useCallback(async (id) => {
    try {
      await dispatch(removeSystemImages(id)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to delete system image' };
    }
  }, [dispatch]);

  // Search and Filter Actions
  const searchSystemImages = useCallback(async (name) => {
    try {
      const result = await dispatch(searchImages(name)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to search system images' };
    }
  }, [dispatch]);

  const getByOsType = useCallback(async (os_type) => {
    try {
      const result = await dispatch(fetchByOsType(os_type)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to filter by OS type' };
    }
  }, [dispatch]);

  // Health Check
  const getHealthStatus = useCallback(async () => {
    try {
      const result = await dispatch(checkHealth()).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed health check' };
    }
  }, [dispatch]);

  // Utility Functions
  const clearErrors = useCallback(() => {
    dispatch(clearSystemImageError());
  }, [dispatch]);

  const resetState = useCallback(() => {
    dispatch(resetSystemImageState());
  }, [dispatch]);

  return {
    // State
    images,
    selectedImage,
    searchResults,
    filteredByOsType,
    healthStatus,
    isLoading,
    error,
    success,

    // CRUD Operations
    getSystemImages,
    getSystemImageById,
    createSystemImage,
    updateSystemImage,
    deleteSystemImage,

    // Search and Filter
    searchSystemImages,
    getByOsType,

    // Health Check
    getHealthStatus,

    // Utilities
    clearErrors,
    resetState
  };
};

export default useSystemImage;