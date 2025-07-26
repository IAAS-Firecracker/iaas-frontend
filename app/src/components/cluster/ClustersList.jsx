import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Alert,
  LinearProgress,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useCluster from '../../hooks/useCluster';

const ClusterList = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    clusters,
    availableClusters,
    isLoading,
    error,
    success,
    getAllClusters,
    getClusterById,
    createCluster,
    updateCluster,
    deleteCluster,
    clearErrors
  } = useCluster();

  const [openDialog, setOpenDialog] = useState(false);
  const [currentCluster, setCurrentCluster] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    nom: '',
    adresse_mac: '',
    ip: '',
    rom: 0,
    available_rom: 0,
    ram: 0,
    available_ram: 0,
    processeur: '',
    available_processor: 0,
    number_of_core: 0
  });

  // Fetch clusters on component mount and when success changes
  useEffect(() => {
    fetchClusters();
  }, []); // Removed success from dependencies to prevent infinite loops

  // Fetch all clusters
  const fetchClusters = async () => {
    await getAllClusters();
  };

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes('rom') || name.includes('ram') || name.includes('processor') || name.includes('core') 
        ? Number(value) 
        : value
    });
  };
  
  // Open create cluster dialog
  const handleOpenCreateDialog = () => {
    setFormData({
      nom: '',
      adresse_mac: '',
      ip: '',
      rom: 0,
      available_rom: 0,
      ram: 0,
      available_ram: 0,
      processeur: '',
      available_processor: 0,
      number_of_core: 0
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  // Open edit cluster dialog
  const handleOpenEditDialog = (cluster) => {
    setCurrentCluster(cluster);
    setFormData({
      nom: cluster.nom || '',
      adresse_mac: cluster.adresse_mac || '',
      ip: cluster.ip || '',
      rom: cluster.rom || 0,
      available_rom: cluster.available_rom || 0,
      ram: cluster.ram || 0,
      available_ram: cluster.available_ram || 0,
      processeur: cluster.processeur || '',
      available_processor: cluster.available_processor || 0,
      number_of_core: cluster.number_of_core || 0
    });
    setIsEditing(true);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCluster(null);
    clearErrors();
  };

  // Submit form (create or update)
  const handleSubmit = async () => {
    if (isEditing && currentCluster) {
      await updateCluster(currentCluster.id, formData);
    } else {
      await createCluster(formData);
    }
    handleCloseDialog();
    fetchClusters(); // Refresh the list after operation
  };

  // Delete cluster
  const handleDeleteCluster = async (clusterId) => {
    if (window.confirm(t('cluster.confirmDelete'))) {
      await deleteCluster(clusterId);
      fetchClusters(); // Refresh the list after deletion
    }
  };

  // Calculate resource usage percentage
  const calculateUsage = (total, available) => {
    if (!total || isNaN(total) || isNaN(available)) return 0;
    const used = total - available;
    return Math.round((used / total) * 100);
  };

  // Status determination based on resource availability
  const getClusterStatus = (cluster) => {
    const romUsage = calculateUsage(cluster.rom, cluster.available_rom);
    const ramUsage = calculateUsage(cluster.ram, cluster.available_ram);
    const cpuUsage = calculateUsage(cluster.number_of_core, cluster.available_processor);
    
    if (romUsage > 90 || ramUsage > 90 || cpuUsage > 90) {
      return "critical";
    } else if (romUsage > 70 || ramUsage > 70 || cpuUsage > 70) {
      return "warning";
    } else {
      return "healthy";
    }
  };

  return (
    <Box sx={{ p: theme.spacing(3) }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearErrors}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          {t('cluster.management')}
        </Typography>
        <Box>
          <Button
            startIcon={<RefreshIcon />}
            onClick={fetchClusters}
            sx={{ mr: 1 }}
            disabled={isLoading}
          >
            {t('common.refresh')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateDialog}
            disabled={isLoading}
          >
            {t('cluster.addCluster')}
          </Button>
        </Box>
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('cluster.status')}</TableCell>
              <TableCell>{t('cluster.name')}</TableCell>
              <TableCell>{t('cluster.ipAddress')}</TableCell>
              <TableCell>{t('cluster.macAddress')}</TableCell>
              <TableCell>{t('cluster.storage')}</TableCell>
              <TableCell>{t('cluster.memory')}</TableCell>
              <TableCell>{t('cluster.cpu')}</TableCell>
              <TableCell align="right">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log("clusters : ",clusters)
            }
            {clusters && clusters.length > 0 ? (
              clusters.map((cluster) => {
                const status = getClusterStatus(cluster);
                const romUsage = calculateUsage(cluster.rom, cluster.available_rom);
                const ramUsage = calculateUsage(cluster.ram, cluster.available_ram);
                const cpuUsage = calculateUsage(cluster.number_of_core, cluster.available_processor);

                return (
                  <TableRow key={cluster.id} hover>
                    <TableCell>
                      <Chip
                        icon={
                          status === 'healthy' ? <CheckIcon /> : 
                          status === 'warning' ? <InfoIcon /> : 
                          <ErrorIcon />
                        }
                        label={t(`cluster.statuses.${status}`)}
                        color={
                          status === 'healthy' ? 'success' : 
                          status === 'warning' ? 'warning' : 
                          'error'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{cluster.nom}</TableCell>
                    <TableCell>{cluster.ip}</TableCell>
                    <TableCell>{cluster.adresse_mac}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={romUsage} 
                            color={romUsage > 90 ? "error" : romUsage > 70 ? "warning" : "primary"}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2" color="text.secondary">
                            {romUsage}%
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="caption">
                        {(cluster.rom - cluster.available_rom).toFixed(1)} / {cluster.rom.toFixed(1)} GB
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={ramUsage} 
                            color={ramUsage > 90 ? "error" : ramUsage > 70 ? "warning" : "primary"}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2" color="text.secondary">
                            {ramUsage}%
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="caption">
                        {(cluster.ram - cluster.available_ram).toFixed(1)} / {cluster.ram.toFixed(1)} GB
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={cpuUsage} 
                            color={cpuUsage > 90 ? "error" : cpuUsage > 70 ? "warning" : "primary"}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2" color="text.secondary">
                            {cpuUsage}%
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="caption">
                        {cluster.number_of_core - cluster.available_processor} / {cluster.number_of_core} {t('cluster.cores')}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title={t('common.edit')}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleOpenEditDialog(cluster)}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('common.delete')}>
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleDeleteCluster(cluster.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ m: 2 }} />
                  ) : (
                    <Typography color="text.secondary">
                      {t('cluster.noClusters')}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditing ? t('cluster.editCluster') : t('cluster.addCluster')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nom"
                label={t('cluster.name')}
                fullWidth
                value={formData.nom}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="ip"
                label={t('cluster.ipAddress')}
                fullWidth
                value={formData.ip}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="adresse_mac"
                label={t('cluster.macAddress')}
                fullWidth
                value={formData.adresse_mac}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="processeur"
                label={t('cluster.processor')}
                fullWidth
                value={formData.processeur}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="rom"
                label={t('cluster.totalStorage')}
                type="number"
                fullWidth
                value={formData.rom}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="available_rom"
                label={t('cluster.availableStorage')}
                type="number"
                fullWidth
                value={formData.available_rom}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="ram"
                label={t('cluster.totalRAM')}
                type="number"
                fullWidth
                value={formData.ram}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="available_ram"
                label={t('cluster.availableRAM')}
                type="number"
                fullWidth
                value={formData.available_ram}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="number_of_core"
                label={t('cluster.cpuCores')}
                type="number"
                fullWidth
                value={formData.number_of_core}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="available_processor"
                label={t('cluster.availableCores')}
                type="number"
                fullWidth
                value={formData.available_processor}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('common.cancel')}</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : isEditing ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClusterList;