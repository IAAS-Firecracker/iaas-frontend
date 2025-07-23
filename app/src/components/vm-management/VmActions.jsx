import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  ButtonGroup,
  TextField,
  InputAdornment,
  LinearProgress,
  Alert,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  PlayArrow as StartIcon,
  Stop as StopIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  Computer as ComputerIcon,
  RestartAlt as RestartAltIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useUser  from '../../hooks/useUser';
import useVmHost  from '../../hooks/useVmHost';
import StatusChip from './StatusChip';
import VmDetailsDialog from './VmDetailsDialog';
import ConfirmationDialog from './ConfirmationDialog';

const VmActions = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const { 
    vms, 
    getUserVms, 
    startVm, 
    stopVm, 
    deleteVm, 
    getVmMetrics,
    isLoading,
    error,
    clearErrors
  } = useVmHost();

  const [filteredVms, setFilteredVms] = useState([]);
  const [selectedVm, setSelectedVm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [confirmStopOpen, setConfirmStopOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [loadingMetrics, setLoadingMetrics] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch VMs on component mount and when currentUser changes
  useEffect(() => {
    if (currentUser?.id) {
      fetchVms();
    }
  }, [currentUser]);

  // Filter VMs when search term or vms change
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredVms(vms);
    } else {
      const filtered = vms.filter(vm => 
        vm.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVms(filtered);
    }
  }, [searchTerm, vms]);

  const fetchVms = async () => {
    try {
      await getUserVms(currentUser.id);
    } catch (err) {
      console.error('Failed to fetch VMs:', err);
    }
  };

  const fetchVmMetrics = async (vm) => {
    setLoadingMetrics(true);
    try {
      const result = await getVmMetrics(currentUser.id, vm.name);
      if (result.success) {
        setMetrics(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch VM metrics:', err);
    } finally {
      setLoadingMetrics(false);
    }
  };

  const handleAction = async (action, vm) => {
    if (!vm) return;
    
    setSelectedVm(vm);
    setActionLoading(true);
    clearErrors();
    setSuccessMessage(null);

    try {
      let result;
      const actionData = { user_id: currentUser.id, vm_id: vm.id };

      switch (action) {
        case 'start':
          result = await startVm(actionData);
          if (result.success) {
            setSuccessMessage(t('vmActions.notifications.starting', { name: vm.name }));
          }
          break;
        case 'stop':
          result = await stopVm(actionData);
          if (result.success) {
            setSuccessMessage(t('vmActions.notifications.stopping', { name: vm.name }));
          }
          break;
        case 'delete':
          result = await deleteVm(actionData);
          if (result.success) {
            setSuccessMessage(t('vmActions.notifications.deleted', { name: vm.name }));
          }
          break;
        default:
          break;
      }

      // Refresh VMs after a short delay
      setTimeout(fetchVms, 2000);
    } catch (err) {
      console.error(`Failed to ${action} VM:`, err);
      setSuccessMessage(null);
    } finally {
      setActionLoading(false);
      setConfirmStopOpen(false);
      setConfirmDeleteOpen(false);
    }
  };

  const mibToGib = (mib) => (mib / 1024).toFixed(1);

  return (
    <Box>
      {/* Top Controls */}
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: 2 
      }}>
        <TextField
          placeholder={t('vmActions.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: { xs: '100%', sm: 300 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchTerm('')}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null
          }}
        />
        
        <Button 
          variant="outlined" 
          startIcon={<RefreshIcon />}
          onClick={fetchVms}
          disabled={isLoading}
        >
          {t('vmActions.refresh')}
        </Button>
      </Box>
      
      {/* Loading Indicator */}
      {(isLoading || actionLoading) && <LinearProgress sx={{ mb: 2 }} />}
      
      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearErrors}>
          {error}
        </Alert>
      )}
      
      {/* Success Message */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}
      
      {/* VM Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="virtual machines table">
          <TableHead>
            <TableRow>
              <TableCell>{t('vmActions.columns.name')}</TableCell>
              <TableCell>{t('vmActions.columns.status')}</TableCell>
              <TableCell>{t('vmActions.columns.macAddress')}</TableCell>
              <TableCell>{t('vmActions.columns.resources')}</TableCell>
              <TableCell>{t('vmActions.columns.ipAddress')}</TableCell>
              <TableCell align="right">{t('vmActions.columns.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} sx={{ my: 3 }} />
                </TableCell>
              </TableRow>
            ) : filteredVms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      {t('vmActions.noVmsFound')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {searchTerm ? t('vmActions.tryDifferentSearch') : ''} 
                      {t('vmActions.createNewVm')}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredVms.map((vm) => (
                <TableRow key={vm.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ComputerIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="body1" fontWeight="medium">
                        {vm.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={vm.status} />
                  </TableCell>
                  <TableCell>
                    <StatusChip 
                      status={vm.os_type} 
                      label={vm.mac_address} 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                      <Tooltip title="CPU Cores">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DnsIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.grey[600] }} />
                          <Typography variant="body2">{vm.vcpu_count}</Typography>
                        </Box>
                      </Tooltip>
                      
                      <Tooltip title="Memory (RAM)">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MemoryIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.grey[600] }} />
                          <Typography variant="body2">{mibToGib(vm.memory_size_mib)} GB</Typography>
                        </Box>
                      </Tooltip>
                      
                      <Tooltip title="Storage">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StorageIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.grey[600] }} />
                          <Typography variant="body2">{vm.disk_size_gb} GB</Typography>
                        </Box>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {vm.ip_address || t('vmActions.notAssigned')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup variant="outlined" size="small">
                      {vm.status === 'stopped' && (
                        <Tooltip title={t('vmActions.actions.start')}>
                          <Button 
                            color="success" 
                            onClick={() => handleAction('start', vm)}
                            disabled={actionLoading}
                          >
                            <StartIcon fontSize="small" />
                          </Button>
                        </Tooltip>
                      )}
                      
                      {vm.status === 'running' && (
                        <Tooltip title={t('vmActions.actions.stop')}>
                          <Button 
                            color="warning" 
                            onClick={() => setConfirmStopOpen(true)}
                            disabled={actionLoading}
                          >
                            <StopIcon fontSize="small" />
                          </Button>
                        </Tooltip>
                      )}
                      
                      <Tooltip title={t('vmActions.actions.details')}>
                        <Button 
                          onClick={() => {
                            setSelectedVm(vm);
                            setViewDetailsOpen(true);
                            fetchVmMetrics(vm);
                          }}
                          disabled={actionLoading}
                        >
                          <MoreVertIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* VM Details Dialog */}
      <VmDetailsDialog
        open={viewDetailsOpen}
        onClose={() => setViewDetailsOpen(false)}
        vm={selectedVm}
        metrics={metrics}
        loadingMetrics={loadingMetrics}
        onRefreshMetrics={() => selectedVm && fetchVmMetrics(selectedVm)}
        onStart={() => handleAction('start', selectedVm)}
        onStop={() => handleAction('stop', selectedVm)}
      />
      
      {/* Confirm Stop Dialog */}
      <ConfirmationDialog
        open={confirmStopOpen}
        onClose={() => setConfirmStopOpen(false)}
        onConfirm={() => handleAction('stop', selectedVm)}
        titleKey="stopTitle"
        messageKey="stopMessage"
        messageValues={{ name: selectedVm?.name }}
        confirmButtonColor="warning"
        loading={actionLoading}
      />
      
      {/* Confirm Delete Dialog */}
      <ConfirmationDialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={() => handleAction('delete', selectedVm)}
        titleKey="deleteTitle"
        messageKey="deleteMessage"
        messageValues={{ name: selectedVm?.name }}
        confirmButtonColor="error"
        loading={actionLoading}
      />
    </Box>
  );
};

export default VmActions;