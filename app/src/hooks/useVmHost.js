// src/hooks/useVmHost.js
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkVmHostHealth,
  fetchUserVms,
  createNewVm,
  startVirtualMachine,
  stopVirtualMachine,
  deleteVirtualMachine,
  getVmStatus,
  fetchVmMetrics,
  clearVmHostError,
  resetVmHostState,
  clearVmMetrics,
  selectUserVms,
  selectVmStatus,
  selectVmMetrics,
  selectVmHostHealth,
  selectVmHostLoading,
  selectVmHostError,
  selectVmHostSuccess
} from '../redux/slices/vmHostSlice';

const useVmHost = () => {
  const dispatch = useDispatch();

  // Selectors
  const vms = useSelector(selectUserVms);
  const vmStatus = useSelector((state) => selectVmStatus(state));
  const vmMetrics = useSelector((state) => selectVmMetrics(state));
  const healthStatus = useSelector(selectVmHostHealth);
  const isLoading = useSelector(selectVmHostLoading);
  const error = useSelector(selectVmHostError);
  const success = useSelector(selectVmHostSuccess);

  // Health Check
  const getHealthStatus = useCallback(async () => {
    try {
      const result = await dispatch(checkVmHostHealth()).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to check VM host health' };
    }
  }, [dispatch]);

  // VM Management
  const getUserVms = useCallback(async (userId) => {
    try {
      await dispatch(fetchUserVms(userId)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch user VMs' };
    }
  }, [dispatch]);

  const createVm = useCallback(async (vmData) => {
    try {
      const result = await dispatch(createNewVm(vmData)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to create VM' };
    }
  }, [dispatch]);

  const startVm = useCallback(async (vmActionData) => {
    try {
      const result = await dispatch(startVirtualMachine(vmActionData)).unwrap();
      return { 
        success: true, 
        data: result,
        vmId: vmActionData.vm_id
      };
    } catch (err) {
      return { 
        success: false, 
        error: err.message || `Failed to start VM ${vmActionData.vm_id}` 
      };
    }
  }, [dispatch]);

  const stopVm = useCallback(async (vmActionData) => {
    try {
      const result = await dispatch(stopVirtualMachine(vmActionData)).unwrap();
      return { 
        success: true, 
        data: result,
        vmId: vmActionData.vm_id
      };
    } catch (err) {
      return { 
        success: false, 
        error: err.message || `Failed to stop VM ${vmActionData.vm_id}` 
      };
    }
  }, [dispatch]);

  const deleteVm = useCallback(async (vmActionData) => {
    try {
      const result = await dispatch(deleteVirtualMachine(vmActionData)).unwrap();
      return { 
        success: true, 
        data: result,
        vmId: vmActionData.vm_id
      };
    } catch (err) {
      return { 
        success: false, 
        error: err.message || `Failed to delete VM ${vmActionData.vm_id}` 
      };
    }
  }, [dispatch]);

  // VM Status and Metrics
  const getStatus = useCallback(async (vmStatusData) => {
    try {
      const result = await dispatch(getVmStatus(vmStatusData)).unwrap();
      return { 
        success: true, 
        data: result,
        vmId: vmStatusData.vm_id
      };
    } catch (err) {
      return { 
        success: false, 
        error: err.message || `Failed to get status for VM ${vmStatusData.vm_id}` 
      };
    }
  }, [dispatch]);

  const getMetrics = useCallback(async (userId, vmName) => {
    try {
      const result = await dispatch(fetchVmMetrics({ userId, vmName })).unwrap();
      return { 
        success: true, 
        data: result,
        vmName
      };
    } catch (err) {
      return { 
        success: false, 
        error: err.message || `Failed to get metrics for VM ${vmName}` 
      };
    }
  }, [dispatch]);

  // Utility Functions
  const clearErrors = useCallback(() => {
    dispatch(clearVmHostError());
  }, [dispatch]);

  const resetState = useCallback(() => {
    dispatch(resetVmHostState());
  }, [dispatch]);

  const clearMetrics = useCallback(() => {
    dispatch(clearVmMetrics());
  }, [dispatch]);

  // Helper to get VM by ID
  const getVmById = useCallback((vmId) => {
    return vms.find(vm => vm.id === vmId);
  }, [vms]);

  // Helper to get VM status
  const getCurrentVmStatus = useCallback((vmId) => {
    return vmStatus[vmId] || null;
  }, [vmStatus]);

  // Helper to get VM metrics
  const getCurrentVmMetrics = useCallback((vmName) => {
    return vmMetrics[vmName] || null;
  }, [vmMetrics]);

  return {
    // State
    vms,
    vmStatus,
    vmMetrics,
    healthStatus,
    isLoading,
    error,
    success,

    // Health Check
    getHealthStatus,

    // VM Management
    getUserVms,
    createVm,
    startVm,
    stopVm,
    deleteVm,

    // VM Monitoring
    getVmStatus: getStatus,
    getVmMetrics: getMetrics,

    // Helpers
    getVmById,
    getCurrentVmStatus,
    getCurrentVmMetrics,

    // Utilities
    clearErrors,
    resetState,
    clearMetrics
  };
};

export default useVmHost;