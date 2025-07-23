import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from './useUser';
import useVmHost from './useVmHost';
import { useTranslation } from 'react-i18next';

const useDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useUser();
  const { 
    vms, 
    vmStatus, 
    getUserVms, 
    createVm, 
    startVm, 
    stopVm, 
    deleteVm,
    isLoading: vmLoading 
  } = useVmHost();

  const [showAllUsers, setShowAllUsers] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchVms = useCallback(async () => {
    if (currentUser?.id) {
      await getUserVms(currentUser.id);
    }
  }, [currentUser?.id, getUserVms]);

  useEffect(() => {
    fetchVms();
  }, [fetchVms, showAllUsers]);

  const handleVmAction = useCallback(async (id, action) => {
    const targetVm = vms.find(vm => vm.id === id);
    if (!targetVm) return;

    setActionLoading(true);
    
    try {
      switch (action) {
        case 'start':
          await startVm({ user_id: targetVm.user_id, vm_id: targetVm.id });
          setSuccess(t('dashboard.vms.status.running', { name: targetVm.name }));
          break;
        case 'stop':
          await stopVm({ user_id: targetVm.user_id, vm_id: targetVm.id });
          setSuccess(t('dashboard.vms.status.stopped', { name: targetVm.name }));
          break;
        case 'delete':
          await deleteVm({ user_id: targetVm.user_id, vm_id: targetVm.id });
          setSuccess(t('dashboard.vms.actions.deleteSuccess', { name: targetVm.name }));
          break;
        default:
          break;
      }
      setTimeout(fetchVms, 3000);
    } catch (err) {
      setError(t('dashboard.vms.actions.error', { action, name: targetVm.name }));
    } finally {
      setActionLoading(false);
    }
  }, [vms, startVm, stopVm, deleteVm, fetchVms, t]);

  const handleRefresh = useCallback(() => {
    fetchVms();
  }, [fetchVms]);

  const handleCreateVm = useCallback(() => {
    navigate('/vms/create');
  }, [navigate]);

  const handleToggleUserFilter = useCallback((event) => {
    setShowAllUsers(event.target.checked);
  }, []);

  return {
    t,
    currentUser,
    isAdmin,
    vms,
    vmStatus,
    vmLoading,
    actionLoading,
    error,
    success,
    showAllUsers,
    handleVmAction,
    handleRefresh,
    handleCreateVm,
    handleToggleUserFilter,
    fetchVms
  };
};

export default useDashboard;