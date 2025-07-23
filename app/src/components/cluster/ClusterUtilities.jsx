import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Info as InfoIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Dns as DnsIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useCluster from '../../hooks/useCluster';

const ClusterUtilities = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    clusters,
    availableClusters,
    healthStatus,
    serviceInfo,
    isLoading,
    error,
    getHealthStatus,
    getClusterInfo,
    getAllClusters,
    getClusterById,
    getAvailableClusters,
    clearErrors
  } = useCluster();

  const [selectedCluster, setSelectedCluster] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);

  // Fetch all utility data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch all cluster utility data
  const fetchAllData = async () => {
    await Promise.all([
      getHealthStatus(),
      getClusterInfo(),
      getAvailableClusters()
    ]);
    setLastRefresh(new Date());
  };

  // Fetch detailed info for a specific cluster
  const fetchClusterDetails = async (clusterId) => {
    const result = await getClusterById(clusterId);
    if (result.success) {
      const cluster = clusters.find(c => c.id === clusterId) || 
                      availableClusters.find(c => c.id === clusterId);
      if (cluster) {
        setSelectedCluster(cluster);
        setOpenDialog(true);
      }
    }
  };

  // Close cluster details dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCluster(null);
    clearErrors();
  };

  // Calculate resource usage percentage
  const calculateUsagePercentage = (total, available) => {
    if (!total || total === 0) return 0;
    return Math.round(((total - available) / total) * 100);
  };

  // Render the health status section
  const renderHealthStatus = () => {
    if (!healthStatus) {
      return (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {t('cluster.healthDataUnavailable')}
          </Typography>
        </Paper>
      );
    }

    return (
      <Paper sx={{ p: 2, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t('cluster.systemHealth')}
          </Typography>
          <Chip 
            label={healthStatus.status?.toUpperCase() || t('cluster.unknown')}
            color={
              healthStatus.status === 'healthy' ? 'success' : 
              healthStatus.status === 'warning' ? 'warning' : 
              healthStatus.status === 'error' ? 'error' : 'default'
            }
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('cluster.service')}</TableCell>
                <TableCell>{t('cluster.status')}</TableCell>
                <TableCell>{t('cluster.message')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {healthStatus.services?.map((service, index) => (
                <TableRow key={index}>
                  <TableCell><strong>{service.name}</strong></TableCell>
                  <TableCell>
                    <Chip 
                      size="small"
                      label={service.status?.toUpperCase() || t('cluster.unknown')}
                      color={
                        service.status === 'healthy' ? 'success' : 
                        service.status === 'warning' ? 'warning' : 
                        service.status === 'error' ? 'error' : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>{service.message || t('cluster.noMessage')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  };

  // Render system information section
  const renderSystemInfo = () => {
    if (!serviceInfo) {
      return (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {t('cluster.systemInfoUnavailable')}
          </Typography>
        </Paper>
      );
    }

    const storageUsage = calculateUsagePercentage(serviceInfo.total_storage, serviceInfo.available_storage);
    const memoryUsage = calculateUsagePercentage(serviceInfo.total_memory, serviceInfo.available_memory);
    const cpuUsage = calculateUsagePercentage(serviceInfo.total_cpu, serviceInfo.available_cpu);

    return (
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('cluster.systemInformation')}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t('cluster.version')}
              </Typography>
              <Typography variant="body1">{serviceInfo.version || t('cluster.unknown')}</Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t('cluster.uptime')}
              </Typography>
              <Typography variant="body1">{serviceInfo.uptime || t('cluster.unknown')}</Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t('cluster.clusters')}
              </Typography>
              <Typography variant="body1">
                {serviceInfo.active_clusters || 0} {t('cluster.active')} / {serviceInfo.total_clusters || 0} {t('cluster.total')}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t('cluster.virtualMachines')}
              </Typography>
              <Typography variant="body1">
                {serviceInfo.running_vms || 0} {t('cluster.running')} / {serviceInfo.total_vms || 0} {t('cluster.total')}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StorageIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="body2">{t('cluster.storageUsage')}</Typography>
                </Box>
                <Typography variant="body2">{storageUsage}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={storageUsage} 
                color={storageUsage > 90 ? "error" : storageUsage > 70 ? "warning" : "primary"}
                sx={{ height: 8, borderRadius: 2 }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                {serviceInfo.total_storage - serviceInfo.available_storage} GB {t('cluster.usedOf')} {serviceInfo.total_storage} GB
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MemoryIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="body2">{t('cluster.memoryUsage')}</Typography>
                </Box>
                <Typography variant="body2">{memoryUsage}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={memoryUsage} 
                color={memoryUsage > 90 ? "error" : memoryUsage > 70 ? "warning" : "primary"}
                sx={{ height: 8, borderRadius: 2 }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                {serviceInfo.total_memory - serviceInfo.available_memory} GB {t('cluster.usedOf')} {serviceInfo.total_memory} GB
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DnsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="body2">{t('cluster.cpuUsage')}</Typography>
                </Box>
                <Typography variant="body2">{cpuUsage}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={cpuUsage} 
                color={cpuUsage > 90 ? "error" : cpuUsage > 70 ? "warning" : "primary"}
                sx={{ height: 8, borderRadius: 2 }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                {serviceInfo.total_cpu - serviceInfo.available_cpu} {t('cluster.coresUsedOf')} {serviceInfo.total_cpu} {t('cluster.cores')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // Render available clusters section
  const renderAvailableClusters = () => {
    if (!availableClusters || availableClusters.length === 0) {
      return (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {t('cluster.noAvailableClusters')}
          </Typography>
        </Paper>
      );
    }

    return (
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t('cluster.availableClusters')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {availableClusters.length} {t('cluster.clustersAvailable')}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('cluster.clusterName')}</TableCell>
                <TableCell>{t('cluster.ipAddress')}</TableCell>
                <TableCell>{t('cluster.processor')}</TableCell>
                <TableCell>{t('cluster.cpuAvailable')}</TableCell>
                <TableCell>{t('cluster.ramAvailable')}</TableCell>
                <TableCell>{t('cluster.storageAvailable')}</TableCell>
                <TableCell>{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availableClusters.map((cluster) => {
                const cpuUsage = calculateUsagePercentage(
                  cluster.number_of_core, 
                  cluster.available_processor
                );
                const ramUsage = calculateUsagePercentage(
                  cluster.ram, 
                  cluster.available_ram
                );
                const storageUsage = calculateUsagePercentage(
                  cluster.rom, 
                  cluster.available_rom
                );

                return (
                  <TableRow key={cluster.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {cluster.nom}
                      </Typography>
                    </TableCell>
                    <TableCell>{cluster.ip}</TableCell>
                    <TableCell>{cluster.processeur}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={cpuUsage} 
                            color={cpuUsage > 90 ? "error" : cpuUsage > 70 ? "warning" : "primary"}
                            sx={{ height: 6, borderRadius: 1 }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {cluster.available_processor}/{cluster.number_of_core}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={ramUsage} 
                            color={ramUsage > 90 ? "error" : ramUsage > 70 ? "warning" : "primary"}
                            sx={{ height: 6, borderRadius: 1 }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {cluster.available_ram}/{cluster.ram} GB
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={storageUsage} 
                            color={storageUsage > 90 ? "error" : storageUsage > 70 ? "warning" : "primary"}
                            sx={{ height: 6, borderRadius: 1 }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {cluster.available_rom}/{cluster.rom} GB
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={t('common.viewDetails')}>
                        <IconButton 
                          size="small" 
                          onClick={() => fetchClusterDetails(cluster.id)}
                          color="primary"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  };

  // Render cluster details dialog
  const renderClusterDetailsDialog = () => {
    if (!selectedCluster) return null;
    
    const cpuUsage = calculateUsagePercentage(
      selectedCluster.number_of_core,
      selectedCluster.available_processor
    );
    const ramUsage = calculateUsagePercentage(
      selectedCluster.ram,
      selectedCluster.available_ram
    );
    const storageUsage = calculateUsagePercentage(
      selectedCluster.rom,
      selectedCluster.available_rom
    );

    return (
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {t('cluster.clusterDetails')}: {selectedCluster.nom}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                {t('cluster.generalInformation')}
              </Typography>
              <Box component="dl" sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Box component="dt" sx={{ flexBasis: '40%', fontWeight: 'medium' }}>
                    {t('cluster.clusterId')}:
                  </Box>
                  <Box component="dd" sx={{ flexGrow: 1 }}>{selectedCluster.id}</Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Box component="dt" sx={{ flexBasis: '40%', fontWeight: 'medium' }}>
                    {t('cluster.name')}:
                  </Box>
                  <Box component="dd" sx={{ flexGrow: 1 }}>{selectedCluster.nom}</Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Box component="dt" sx={{ flexBasis: '40%', fontWeight: 'medium' }}>
                    {t('cluster.ipAddress')}:
                  </Box>
                  <Box component="dd" sx={{ flexGrow: 1 }}>{selectedCluster.ip}</Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Box component="dt" sx={{ flexBasis: '40%', fontWeight: 'medium' }}>
                    {t('cluster.macAddress')}:
                  </Box>
                  <Box component="dd" sx={{ flexGrow: 1 }}>{selectedCluster.adresse_mac}</Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Box component="dt" sx={{ flexBasis: '40%', fontWeight: 'medium' }}>
                    {t('cluster.processor')}:
                  </Box>
                  <Box component="dd" sx={{ flexGrow: 1 }}>{selectedCluster.processeur}</Box>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                {t('cluster.resourceAllocation')}
              </Typography>
              
              <Box sx={{ mt: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{t('cluster.cpuCores')}</Typography>
                  <Typography variant="body2">
                    {selectedCluster.available_processor} {t('cluster.available')} / {selectedCluster.number_of_core} {t('cluster.total')}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={cpuUsage} 
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{t('cluster.memoryRAM')}</Typography>
                  <Typography variant="body2">
                    {selectedCluster.available_ram} GB {t('cluster.available')} / {selectedCluster.ram} GB {t('cluster.total')}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={ramUsage} 
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{t('cluster.storage')}</Typography>
                  <Typography variant="body2">
                    {selectedCluster.available_rom} GB {t('cluster.available')} / {selectedCluster.rom} GB {t('cluster.total')}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={storageUsage} 
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ p: theme.spacing(3) }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={clearErrors}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">{t('cluster.managementDashboard')}</Typography>
        <Box>
          <Button 
            startIcon={<RefreshIcon />} 
            onClick={fetchAllData}
            disabled={isLoading}
            color="primary"
          >
            {isLoading ? t('common.refreshing') : t('common.refreshData')}
          </Button>
        </Box>
      </Box>
      
      {isLoading && <LinearProgress sx={{ mb: 3 }} />}
      
      {lastRefresh && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('common.lastUpdated')}: {lastRefresh.toLocaleString()}
        </Typography>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {renderHealthStatus()}
        </Grid>
        
        <Grid item xs={12} md={6}>
          {renderSystemInfo()}
        </Grid>
        
        <Grid item xs={12}>
          {renderAvailableClusters()}
        </Grid>
      </Grid>
      
      {renderClusterDetailsDialog()}
    </Box>
  );
};

export default ClusterUtilities;