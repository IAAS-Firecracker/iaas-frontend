import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Tab,
  Tabs,
  useTheme,
  Container
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useSystemImage from '../../hooks/useSystemImage';

// OS Type options
const OS_TYPES = [
  { value: 'linux', label: 'Linux' },
  { value: 'windows', label: 'Windows' },
  { value: 'macos', label: 'MacOS' },
  { value: 'unix', label: 'Unix' },
  { value: 'other', label: 'Other' }
];

// Default image when no image is available
const DEFAULT_IMAGE = 'https://th.bing.com/th?q=Ubuntu+Modern+Logo&w=40&h=40&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=CM&setlang=en&adlt=moderate&t=1&mw=247';

const SystemImagesManager = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    images,
    selectedImage,
    isLoading,
    error,
    success,
    getSystemImages,
    getSystemImageById,
    createSystemImage,
    updateSystemImage,
    deleteSystemImage,
    searchSystemImages,
    getByOsType,
    clearErrors
  } = useSystemImage();
  
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [osTypeFilter, setOsTypeFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [tabValue, setTabValue] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    os_type: 'linux',
    version: '',
    description: '',
    image: null
  });
  
  // File upload state
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Fetch system images on component mount
  useEffect(() => {
    fetchSystemImages();
  }, []);

  // Fetch all system images
  const fetchSystemImages = async () => {
    await getSystemImages();
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchSystemImages();
      return;
    }
    
    await searchSystemImages(searchQuery);
  };

  // Handle filter by OS type
  const handleOsTypeFilter = async (osType) => {
    if (osType === 'all') {
      fetchSystemImages();
      return;
    }
    
    await getByOsType(osType);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchQuery('');
    
    if (newValue === 0) {
      setOsTypeFilter('all');
      fetchSystemImages();
    } else if (newValue === 1) {
      setOsTypeFilter('linux');
      handleOsTypeFilter('linux');
    } else if (newValue === 2) {
      setOsTypeFilter('windows');
      handleOsTypeFilter('windows');
    } else if (newValue === 3) {
      setOsTypeFilter('other');
      handleOsTypeFilter('other');
    }
  };

  // Handle dialog open for create
  const handleOpenCreateDialog = () => {
    setFormData({
      name: '',
      os_type: 'linux',
      version: '',
      description: '',
      image: ''
    });
    setImagePreview('');
    setUploadedImage(null);
    setDialogMode('create');
    setOpenDialog(true);
  };

  // Handle dialog open for edit
  const handleOpenEditDialog = async (id) => {
    const result = await getSystemImageById(id);
    if (result.success) {
      const image = images.find(img => img.id === id) || selectedImage;
      if (image) {
        setFormData({
          name: image.name || '',
          os_type: image.os_type || 'linux',
          version: image.version || '',
          description: image.description || '',
          image: image.image || ''
        });
        setImagePreview(image.image || '');
        setDialogMode('edit');
        setOpenDialog(true);
      }
    }
  };

  // Handle dialog open for view
  const handleOpenViewDialog = async (id) => {
    const result = await getSystemImageById(id);
    if (result.success) {
      setDialogMode('view');
      setOpenDialog(true);
    }
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setImagePreview('');
    setUploadedImage(null);
    clearErrors();
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      setFormData({
        ...formData,
        image: file
      });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.name || !formData.os_type || !formData.version) {
      return;
    }
    
    if (dialogMode === 'create') {
      await createSystemImage(formData);
    } else if (dialogMode === 'edit' && selectedImage) {
      await updateSystemImage(selectedImage.id, formData);
    }
    
    fetchSystemImages();
    setTimeout(() => handleCloseDialog(), 1500);
  };

  // Handle delete system image
  const handleDeleteSystemImage = async (id, name) => {
    if (window.confirm(t('systemImages.confirmDelete', { name }))) {
      await deleteSystemImage(id);
      fetchSystemImages();
    }
  };

  // Render OS type chip
  const renderOsTypeChip = (osType) => {
    const osTypeLabel = OS_TYPES.find(type => type.value === osType)?.label || osType;
    let color;
    
    switch (osType.toLowerCase()) {
      case 'linux': color = 'success'; break;
      case 'windows': color = 'primary'; break;
      case 'macos': color = 'secondary'; break;
      case 'unix': color = 'warning'; break;
      default: color = 'default';
    }
    
    return <Chip size="small" color={color} label={osTypeLabel} />;
  };

  // Filter images based on search and OS type
  const filteredImages = images.filter(image => {
    const matchesSearch = !searchQuery || 
      image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.version.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesOsType = osTypeFilter === 'all' || image.os_type === osTypeFilter;
    
    return matchesSearch && matchesOsType;
  });

  return (
    <Container sx={{ 
      mt: 5, 
      mb: 6,
      [theme.breakpoints.up('md')]: {
        px: 4
      }
    }} maxWidth="lg">
      {/* Alerts */}
      {error && (
        <Alert severity="error" onClose={clearErrors} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" onClose={clearErrors} sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h5" component="h1">
          {t('systemImages.title')}
        </Typography>
        
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />} 
            onClick={fetchSystemImages}
            sx={{ mr: 1 }}
          >
            {t('common.refresh')}
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={handleOpenCreateDialog}
          >
            {t('systemImages.addImage')}
          </Button>
        </Box>
      </Box>
      
      {/* Search and Filter */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: theme.palette.background.paper }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={t('systemImages.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button 
                variant="outlined" 
                onClick={handleSearch}
                startIcon={<SearchIcon />}
                sx={{ mr: 1 }}
              >
                {t('common.search')}
              </Button>
              {searchQuery && (
                <Button 
                  variant="outlined" 
                  color="secondary"
                  onClick={() => {
                    setSearchQuery('');
                    fetchSystemImages();
                  }}
                >
                  {t('common.clear')}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Tabs for OS Type filtering */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={t('systemImages.allImages')} />
          <Tab label={t('systemImages.linux')} />
          <Tab label={t('systemImages.windows')} />
          <Tab label={t('systemImages.otherOS')} />
        </Tabs>
      </Box>
      
      {/* Loading indicator */}
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}
      
      {/* System Images Grid */}
      {filteredImages.length > 0 ? (
        <Grid container spacing={3}>
          {filteredImages.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={image.image || DEFAULT_IMAGE}
                  alt={image.name}
                  onError={(e) => e.target.src = DEFAULT_IMAGE}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    mb: 1 
                  }}>
                    <Typography variant="h6" component="div" noWrap sx={{ maxWidth: '70%' }}>
                      {image.name}
                    </Typography>
                    {renderOsTypeChip(image.os_type)}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {t('systemImages.version')}: {image.version}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 2,
                      height: '40px'
                    }}
                  >
                    {image.description || t('systemImages.noDescription')}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                    <Tooltip title={t('common.viewDetails')}>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleOpenViewDialog(image.id)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('common.edit')}>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleOpenEditDialog(image.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('common.delete')}>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteSystemImage(image.id, image.name)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {isLoading ? t('systemImages.loading') : t('systemImages.noImagesFound')}
          </Typography>
          {!isLoading && (
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon />}
              onClick={fetchSystemImages}
              sx={{ mt: 2 }}
            >
              {t('common.refresh')}
            </Button>
          )}
        </Paper>
      )}
      
      {/* Create/Edit/View Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === 'create' ? t('systemImages.addTitle') : 
           dialogMode === 'edit' ? t('systemImages.editTitle') : t('systemImages.viewTitle')}
        </DialogTitle>
        
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Left side - Form/Details */}
            <Grid item xs={12} md={7}>
              {dialogMode === 'view' && selectedImage ? (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {selectedImage.name}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        {t('systemImages.osType')}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      {renderOsTypeChip(selectedImage.os_type)}
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        {t('systemImages.version')}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{selectedImage.version}</Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        {t('systemImages.description')}
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                        <Typography>
                          {selectedImage.description || t('systemImages.noDescription')}
                        </Typography>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        {t('systemImages.created')}
                      </Typography>
                      <Typography>
                        {selectedImage.created_at ? new Date(selectedImage.created_at).toLocaleString() : 'N/A'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        {t('systemImages.lastUpdated')}
                      </Typography>
                      <Typography>
                        {selectedImage.updated_at ? new Date(selectedImage.updated_at).toLocaleString() : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box component="form" noValidate>
                  <TextField
                    name="name"
                    label={t('systemImages.nameLabel')}
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    autoFocus={dialogMode === 'create'}
                  />
                  
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel>{t('systemImages.osTypeLabel')}</InputLabel>
                    <Select
                      name="os_type"
                      value={formData.os_type}
                      onChange={handleInputChange}
                      label={t('systemImages.osTypeLabel')}
                    >
                      {OS_TYPES.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <TextField
                    name="version"
                    label={t('systemImages.versionLabel')}
                    value={formData.version}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    placeholder={t('systemImages.versionPlaceholder')}
                  />
                  
                  <TextField
                    name="description"
                    label={t('systemImages.descriptionLabel')}
                    value={formData.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    placeholder={t('systemImages.descriptionPlaceholder')}
                  />
                </Box>
              )}
            </Grid>
            
            {/* Right side - Image */}
            <Grid item xs={12} md={5}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" gutterBottom>
                  {t('systemImages.imagePreview')}
                </Typography>
                
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    height: 200, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    overflow: 'hidden',
                    mb: 2
                  }}
                >
                  {imagePreview || (selectedImage?.image) ? (
                    <img 
                      src={imagePreview || selectedImage.image || DEFAULT_IMAGE} 
                      alt={t('systemImages.imageAlt')}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      onError={(e) => e.target.src = DEFAULT_IMAGE}
                    />
                  ) : (
                    <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                      <ImageIcon sx={{ fontSize: 60, opacity: 0.3 }} />
                      <Typography variant="body2">
                        {t('systemImages.noImageAvailable')}
                      </Typography>
                    </Box>
                  )}
                </Paper>
                
                {dialogMode !== 'view' && (
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                  >
                    {t('systemImages.uploadImage')}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            {dialogMode === 'view' ? t('common.close') : t('common.cancel')}
          </Button>
          
          {dialogMode !== 'view' && (
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                dialogMode === 'create' ? t('common.create') : t('common.update')
              )}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SystemImagesManager;