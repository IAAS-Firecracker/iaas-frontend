import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';
import {
  Dns as DnsIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Start as StartIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon

} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import StatusChip from './StatusChip';

const VmDetailsDialog = ({ 
  open, 
  onClose, 
  vm, 
  metrics, 
  loadingMetrics, 
  onRefreshMetrics,
  onStart,
  onStop
}) => {
  const { t } = useTranslation();
  const mibToGib = (mib) => (mib / 1024).toFixed(1);

  if (!vm) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {t('vmActions.details.title', { name: vm.name })}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* General Information */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {t('vmActions.details.generalInfo')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    {t('vmActions.columns.name')}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{vm.name}</Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    {t('vmActions.columns.status')}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <StatusChip status={vm.status} />
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    OS Type
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <StatusChip 
                    status={vm.os_type} 
                    label={vm.os_type} 
                  />
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Host Cluster
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {vm.service_cluster_id ? `ID: ${vm.service_cluster_id}` : 'Not available'}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Created
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {vm.created_at ? new Date(vm.created_at).toLocaleString() : 'Not available'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          {/* Resources */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {t('vmActions.details.resources')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <DnsIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">CPU Cores</Typography>
                        <Typography variant="h5">{vm.vcpu_count}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <MemoryIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Memory</Typography>
                        <Typography variant="h5">{mibToGib(vm.memory_size_mib)} GB</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <StorageIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Storage</Typography>
                        <Typography variant="h5">{vm.disk_size_gb} GB</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">VM Offer</Typography>
                      <Typography variant="h5">
                        {vm.vm_offer_id ? `ID: ${vm.vm_offer_id}` : 'Custom'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          {/* Network Information */}
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {t('vmActions.details.networkInfo')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">IP Address</Typography>
                  <Typography variant="body1">{vm.vm_ip || 'Not assigned'}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">MAC Address</Typography>
                  <Typography variant="body1">{vm.vm_mac || 'Not assigned'}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">TAP Device</Typography>
                  <Typography variant="body1">{vm.tap_device || 'Not assigned'}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">TAP IP</Typography>
                  <Typography variant="body1">{vm.tap_ip || 'Not assigned'}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          {/* Metrics */}
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1">
                  {t('vmActions.details.metrics')}
                </Typography>
                
                <Button 
                  size="small" 
                  startIcon={<RefreshIcon />}
                  onClick={onRefreshMetrics}
                  disabled={loadingMetrics}
                >
                  {t('vmActions.refresh')}
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              {loadingMetrics ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : metrics ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Alert severity="info">
                      <Typography variant="body2">
                        Metrics data is available for this VM. Implement visualization based on your specific metrics format.
                      </Typography>
                    </Alert>
                  </Grid>
                </Grid>
              ) : (
                <Box sx={{ py: 2 }}>
                  <Typography variant="body2" color="text.secondary" align="center">
                    No metrics data available. Metrics may not be available for stopped VMs.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {t('vmActions.details.close')}
        </Button>
        
        {vm.status === 'stopped' && (
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<StartIcon />}
            onClick={() => {
              onClose();
              onStart();
            }}
          >
            {t('vmActions.actions.start')}
          </Button>
        )}
        
        {vm.status === 'running' && (
          <Button 
            variant="contained" 
            color="warning" 
            startIcon={<StopIcon />}
            onClick={() => {
              onClose();
              onStop();
            }}
          >
            {t('vmActions.actions.stop')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default VmDetailsDialog;