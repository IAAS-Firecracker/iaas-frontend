// src/hooks/useCluster.js
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkClusterHealth,
  fetchClusterInfo,
  fetchAllClusters,
  fetchClusterById,
  fetchAvailableClusters,
  addCluster,
  modifyCluster,
  removeCluster,
  findHostForVM,
  clearClusterError,
  resetClusterState,
  clearSuitableHost,
  selectAllClusters,
  selectAvailableClusters,
  selectSelectedCluster,
  selectSuitableHost,
  selectClusterHealth,
  selectClusterInfo,
  selectClusterLoading,
  selectClusterError,
  selectClusterSuccess
} from '../redux/slices/clusterSlice';

const useCluster = () => {
  const dispatch = useDispatch();

  // Selectors
  const clusters = useSelector(selectAllClusters);
  const availableClusters = useSelector(selectAvailableClusters);
  const selectedCluster = useSelector(selectSelectedCluster);
  const suitableHost = useSelector(selectSuitableHost);
  const healthStatus = useSelector(selectClusterHealth);
  const serviceInfo = useSelector(selectClusterInfo);
  const isLoading = useSelector(selectClusterLoading);
  const error = useSelector(selectClusterError);
  const success = useSelector(selectClusterSuccess);

  // Cluster Health and Info
  const getHealthStatus = useCallback(async () => {
    try {
      const result = await dispatch(checkClusterHealth()).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to check cluster health' };
    }
  }, [dispatch]);

  const getClusterInfo = useCallback(async () => {
    try {
      const result = await dispatch(fetchClusterInfo()).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch cluster info' };
    }
  }, [dispatch]);

  // Cluster Management
  const getAllClusters = useCallback(async () => {
    try {
      await dispatch(fetchAllClusters()).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch clusters' };
    }
  }, [dispatch]);

  const getClusterById = useCallback(async (clusterId) => {
    try {
      await dispatch(fetchClusterById(clusterId)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || `Failed to fetch cluster ${clusterId}` };
    }
  }, [dispatch]);

  const getAvailableClusters = useCallback(async () => {
    try {
      await dispatch(fetchAvailableClusters()).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch available clusters' };
    }
  }, [dispatch]);

  const createCluster = useCallback(async (clusterData) => {
    try {
      const result = await dispatch(addCluster(clusterData)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to create cluster' };
    }
  }, [dispatch]);

  const updateCluster = useCallback(async (clusterId, clusterData) => {
    try {
      const result = await dispatch(modifyCluster({ cluster_id: clusterId, clusterData })).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || `Failed to update cluster ${clusterId}` };
    }
  }, [dispatch]);

  const deleteCluster = useCallback(async (clusterId) => {
    try {
      await dispatch(removeCluster(clusterId)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || `Failed to delete cluster ${clusterId}` };
    }
  }, [dispatch]);

  // Host Finding
  const findSuitableHost = useCallback(async (vmRequirements) => {
    try {
      const result = await dispatch(findHostForVM(vmRequirements)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to find suitable host' };
    }
  }, [dispatch]);

  // Utility Functions
  const clearErrors = useCallback(() => {
    dispatch(clearClusterError());
  }, [dispatch]);

  const resetState = useCallback(() => {
    dispatch(resetClusterState());
  }, [dispatch]);

  const clearHostSelection = useCallback(() => {
    dispatch(clearSuitableHost());
  }, [dispatch]);

  // Helper to get cluster by ID
  const getCluster = useCallback((clusterId) => {
    return clusters.find(cluster => cluster.id === clusterId) || 
           availableClusters.find(cluster => cluster.id === clusterId);
  }, [clusters, availableClusters]);

  return {
    // State
    clusters,
    availableClusters,
    selectedCluster,
    suitableHost,
    healthStatus,
    serviceInfo,
    isLoading,
    error,
    success,

    // Health and Info
    getHealthStatus,
    getClusterInfo,

    // Cluster Management
    getAllClusters,
    getClusterById,
    getAvailableClusters,
    createCluster,
    updateCluster,
    deleteCluster,

    // Host Finding
    findSuitableHost,

    // Helpers
    getCluster,

    // Utilities
    clearErrors,
    resetState,
    clearHostSelection
  };
};

export default useCluster;