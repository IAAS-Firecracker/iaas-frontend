import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useCluster from '../../hooks/useCluster';
import useSystemImage from '../../hooks/useSystemImage';
import useVmOffer from '../../hooks/useVmOffer';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Divider,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  InputAdornment,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Dns as DnsIcon,
  Info as InfoIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const FindSuitableHost = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  // Hooks
  const {
    findSuitableHost,
    isLoading: clusterLoading,
    error: clusterError,
    clearErrors: clearClusterErrors,
    success: clusterSuccess
  } = useCluster();

  const {
    images: systemImages,
    isLoading: imagesLoading,
    error: imagesError,
    getSystemImages
  } = useSystemImage();

  const {
    activeOffers: vmOffers,
    isLoading: offersLoading,
    error: offersError,

    getActiveVmOffers
  } = useVmOffer();

  // State
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    cpu_count: 2,
    memory_size_mib: 2048,
    disk_size_gb: 40,
    os_type: 'linux',
    system_image_id: 1,
    root_password: '',
    vm_offer_id: null
  });
  const [createdVm, setCreatedVm] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isCustomOffer, setIsCustomOffer] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      await getSystemImages();
      await getActiveVmOffers();
    };
    fetchData();
  }, [getSystemImages, getActiveVmOffers]);

  // Set default offer when vmOffers loads
  useEffect(() => {
    if (vmOffers.length > 0 && !selectedOffer) {
      const defaultOffer = vmOffers.find(offer => offer.name === 'Small') || vmOffers[0];
      setSelectedOffer(defaultOffer);
      setFormData(prev => ({
        ...prev,
        vm_offer_id: defaultOffer.id,
        cpu_count: defaultOffer.cpu_count,
        memory_size_mib: defaultOffer.memory_size_mib,
        disk_size_gb: defaultOffer.disk_size_gb
      }));
    }
  }, [vmOffers, selectedOffer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'cpu_count' || name === 'memory_size_mib' || 
              name === 'disk_size_gb' || name === 'system_image_id' || 
              name === 'vm_offer_id' ? Number(value) : value
    });
  };

  const handleOfferChange = (event) => {
    const offerId = Number(event.target.value);
    const offer = vmOffers.find(o => o.id === offerId);
    
    setSelectedOffer(offer);
    setIsCustomOffer(offer.name === 'Custom');
    
    setFormData(prev => ({
      ...prev,
      vm_offer_id: offerId,
      ...(offer.name !== 'Custom' ? {
        cpu_count: offer.cpu_count,
        memory_size_mib: offer.memory_size_mib,
        disk_size_gb: offer.disk_size_gb
      } : {})
    }));
  };

  const handleImageChange = (event) => {
    const imageId = Number(event.target.value);
    const image = systemImages.find(img => img.id === imageId);
    
    if (image) {
      setFormData({
        ...formData,
        system_image_id: imageId,
        os_type: image.type
      });
    }
  };

  const handleSubmit = async () => {
    clearClusterErrors();
    const { success, data } = await findSuitableHost(formData);
    if (success) {
      setCreatedVm(data.vm);
      setActiveStep(2);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCreatedVm(null);
    clearClusterErrors();
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active':
      case 'running':
        return theme.palette.success.main;
      case 'stopped':
      case 'paused':
        return theme.palette.warning.main;
      case 'error':
      case 'failed':
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };

  const isLoading = clusterLoading || imagesLoading || offersLoading;
  const error = clusterError || imagesError || offersError;

  const steps = [
    {
      label: t('specifyRequirements'),
      description: t('specifyRequirementsDesc'),
      content: (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label={t('vmName')}
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleInputChange}
              required
              helperText={t('vmNameHelper')}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="vm-offer-label">{t('vmConfiguration')}</InputLabel>
              <Select
                labelId="vm-offer-label"
                id="vm-offer"
                name="vm_offer_id"
                value={formData.vm_offer_id || ''}
                label={t('vmConfiguration')}
                onChange={handleOfferChange}
                disabled={isLoading}
              >
                {vmOffers.map((offer) => (
                  <MenuItem key={offer.id} value={offer.id}>
                    {offer.name} ({offer.cpu_count} CPU, {offer.memory_size_mib / 1024}GB RAM, {offer.disk_size_gb}GB)
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{t('selectVmConfiguration')}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="system-image-label">{t('osType')}</InputLabel>
              <Select
                labelId="system-image-label"
                id="system-image"
                name="system_image_id"
                value={formData.system_image_id}
                label={t('osType')}
                onChange={handleImageChange}
                disabled={isLoading}
              >
                {systemImages.map((image) => (
                  <MenuItem key={image.id} value={image.id}>
                    {image.name} ({image.type})
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{t('osTypeHelper')}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label={t('rootPassword')}
              name="root_password"
              type="password"
              fullWidth
              value={formData.root_password}
              onChange={handleInputChange}
              required
              helperText={t('rootPasswordHelper')}
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: t('reviewSelection'),
      description: t('reviewSelectionDesc'),
      content: (
        <Box sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={clearClusterErrors}>
              {error}
            </Alert>
          )}

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('vmConfiguration')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>{t('vmName')}:</strong> {formData.name}</Typography>
                  <Typography><strong>{t('osType')}:</strong> {formData.os_type}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>{t('cpuCores')}:</strong> {formData.cpu_count}</Typography>
                  <Typography><strong>{t('memory')}:</strong> {formData.memory_size_mib} MiB</Typography>
                  <Typography><strong>{t('storage')}:</strong> {formData.disk_size_gb} GB</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? t('creatingVm') : t('createVm')}
            </Button>
          </Box>
        </Box>
      )
    },
    {
      label: t('vmCreation'),
      description: t('vmCreationDesc'),
      content: (
        <Box sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={clearClusterErrors}>
              {error}
            </Alert>
          )}

          {clusterSuccess && createdVm ? (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckIcon color="success" sx={{ mr: 1, fontSize: 40 }} />
                  <Typography variant="h5">{t('vmCreatedSuccess')}</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>{t('vmName')}:</strong> {createdVm.name}</Typography>
                    <Typography>
                      <strong>{t('status')}:</strong> 
                      <Box component="span" sx={{ 
                        color: getStatusColor(createdVm.status),
                        ml: 1
                      }}>
                        {createdVm.status}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>{t('hostCluster')}:</strong> {createdVm.host_cluster}</Typography>
                    <Typography><strong>{t('vmIp')}:</strong> {createdVm.ip_address}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>{t('creatingVm')}</Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleReset}
            >
              {t('createAnother')}
            </Button>
          </Box>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t('findSuitableHost')}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {t('findSuitableHostDescription')}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="subtitle1">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {step.description}
                </Typography>
                
                {step.content}
                
                {index < steps.length - 1 && (
                  <Box sx={{ mb: 2, mt: 3 }}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(prev => prev - 1)}
                        sx={{ mr: 1 }}
                      >
                        {t('back')}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setActiveStep(prev => prev + 1)}
                        disabled={!formData.name || !formData.root_password}
                      >
                        {t('next')}
                      </Button>
                    </div>
                  </Box>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Box>
  );
};

export default FindSuitableHost;