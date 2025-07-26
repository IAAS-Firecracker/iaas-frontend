// src/pages/VMOffersPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Paper,
  InputAdornment,
  Divider,
  Chip,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert,
  Menu,
  MenuItem,
  LinearProgress,
  ListItemIcon,
  Snackbar,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Dns as DnsIcon,
  AttachMoney as MoneyIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  Close as CloseIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import  useVmOffer  from '../hooks/useVmOffer';
import { useTranslation } from 'react-i18next';

const VMOffersPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    offers,
    activeOffers,
    isLoading,
    error,
    success,
    getVmOffers,
    createVmOffer,
    updateVmOffer,
    deleteVmOffer,
    searchVmOffers,
    getActiveVmOffers,
    clearErrors
  } = useVmOffer();

  // State management
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilter, setActiveFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuOfferId, setMenuOfferId] = useState(null);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cpu_count: 1,
    memory_size_mib: 1024,
    disk_size_gb: 10,
    price_per_hour: 0.00
  });
  const [formErrors, setFormErrors] = useState({});

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch VM offers on component mount
  useEffect(() => {
    fetchVmOffers();
  }, []);

  // Handle success/error messages
  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
      clearErrors();
    }
    if (success) {
      showSnackbar(success, 'success');
    }
  }, [error, success]);

  const fetchVmOffers = async () => {
    if (activeFilter) {
      await getActiveVmOffers();
    } else {
      await getVmOffers();
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchVmOffers();
      return;
    }

    const result = await searchVmOffers(searchTerm);
    if (!result.success) {
      showSnackbar(t('vmOffers.messages.error.search'), 'error');
    }
  };

  // Menu handlers
  const handleMenuOpen = (event, offerId) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuOfferId(offerId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuOfferId(null);
  };

  // Handle menu actions
  const handleAction = (action) => {
    const offer = (activeFilter ? activeOffers : offers).find(o => o.id === menuOfferId);
    if (!offer) {
      showSnackbar(t('vmOffers.messages.error.fetch'), 'error');
      return;
    }

    setSelectedOffer(offer);

    if (action === 'edit') {
        console.log("edit vm offer : ",offer);
        
      setFormData({

        name: offer.name,
        description: offer.description || '',
        cpu_count: offer.cpu_count,
        memory_size_mib: offer.memory_size_mib,
        disk_size_gb: offer.disk_size_gb,
        price_per_hour: offer.price_per_hour
      });
      setEditDialogOpen(true);
    } else if (action === 'delete') {
      setDeleteDialogOpen(true);
    }

    handleMenuClose();
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ['cpu_count', 'memory_size_mib', 'disk_size_gb', 'price_per_hour'].includes(name)
      ? parseFloat(value)
      : value;

    setFormData({
      ...formData,
      [name]: parsedValue
    });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = t('vmOffers.form.errors.required');
    }

    if (formData.cpu_count < 1) {
      errors.cpu_count = t('vmOffers.form.errors.cpuMin');
    }

    if (formData.memory_size_mib < 512) {
      errors.memory_size_mib = t('vmOffers.form.errors.memoryMin');
    }

    if (formData.disk_size_gb < 1) {
      errors.disk_size_gb = t('vmOffers.form.errors.diskMin');
    }

    if (formData.price_per_hour < 0) {
      errors.price_per_hour = t('vmOffers.form.errors.pricePositive');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // API handlers
  const handleCreateVmOffer = async () => {
    if (!validateForm()) return;

    const result = await createVmOffer(formData);
    if (result.success) {
      setCreateDialogOpen(false);
      fetchVmOffers();
    }
  };

  const handleEditVmOffer = async () => {
    if (!validateForm() || !selectedOffer) return;

    const result = await updateVmOffer(selectedOffer.id, formData);
    if (result.success) {
      setEditDialogOpen(false);
      fetchVmOffers();
    }
  };

  const handleDeleteVmOffer = async () => {
    if (!selectedOffer) return;

    const result = await deleteVmOffer(selectedOffer.id);
    if (result.success) {
      setDeleteDialogOpen(false);
      fetchVmOffers();
    }
  };

  // Helper functions
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const mibToGib = (mib) => (mib / 1024).toFixed(1);
  const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;

  // Filter offers based on current state
  const currentOffers = activeFilter ? activeOffers : offers;
  const filteredOffers = currentOffers?.filter(offer =>
    offer.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    (offer.description && offer.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Render grid view
  const renderGridView = () => (
    <Grid container spacing={3}>
      {filteredOffers.map(offer => (
        <Grid item xs={12} sm={6} md={4} key={offer.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              title={offer.name}
              action={
                <IconButton onClick={(e) => handleMenuOpen(e, offer.id)}>
                  <MoreVertIcon />
                </IconButton>
              }
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {offer.description || t('vmOffers.table.headers.description') + ': ' + t('vmOffers.table.noOffers')}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <DnsIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  {offer.cpu_count} CPU {offer.cpu_count > 1 ? t('vmOffers.table.headers.cpu') : t('vmOffers.table.headers.cpu').slice(0, -1)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MemoryIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  {mibToGib(offer.memory_size_mib)} GB {t('vmOffers.table.headers.memory')}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <StorageIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  {offer.disk_size_gb} GB {t('vmOffers.table.headers.storage')}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Chip 
                  icon={<MoneyIcon />}
                  label={`${formatPrice(offer.price_per_hour)}/${t('vmOffers.form.labels.price').split('(')[1].split(')')[0]}`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => {
                  setSelectedOffer(offer);
                  setFormData({
                    name: offer.name,
                    description: offer.description || '',
                    cpu_count: offer.cpu_count,
                    memory_size_mib: offer.memory_size_mib,
                    disk_size_gb: offer.disk_size_gb,
                    price_per_hour: offer.price_per_hour
                  });
                  setEditDialogOpen(true);
                }}
              >
                {t('vmOffers.buttons.edit')}
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setSelectedOffer(offer);
                  setDeleteDialogOpen(true);
                }}
              >
                {t('vmOffers.buttons.delete')}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Render table view
  const renderTableView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('vmOffers.table.headers.name')}</TableCell>
            <TableCell>{t('vmOffers.table.headers.description')}</TableCell>
            <TableCell>{t('vmOffers.table.headers.cpu')}</TableCell>
            <TableCell>{t('vmOffers.table.headers.memory')}</TableCell>
            <TableCell>{t('vmOffers.table.headers.storage')}</TableCell>
            <TableCell>{t('vmOffers.table.headers.price')}</TableCell>
            <TableCell align="right">{t('vmOffers.table.headers.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOffers.map(offer => (
            <TableRow key={offer.id}>
              <TableCell>{offer.name}</TableCell>
              <TableCell sx={{ maxWidth: 200 }}>
                <Typography noWrap>
                  {offer.description || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DnsIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
                  {offer.cpu_count}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MemoryIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
                  {mibToGib(offer.memory_size_mib)} GB
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StorageIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
                  {offer.disk_size_gb} GB
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={formatPrice(offer.price_per_hour)}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handleMenuOpen(e, offer.id)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          {t('vmOffers.title')}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchVmOffers}
            sx={{ mr: 2 }}
            disabled={isLoading}
          >
            {t('vmOffers.buttons.refresh')}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setFormData({
                name: '',
                description: '',
                cpu_count: 1,
                memory_size_mib: 1024,
                disk_size_gb: 10,
                price_per_hour: 0.00
              });
              setFormErrors({});
              setCreateDialogOpen(true);
            }}
            disabled={isLoading}
          >
            {t('vmOffers.buttons.createOffer')}
          </Button>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={t('vmOffers.table.headers.name') + '/' + t('vmOffers.table.headers.description')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={activeFilter}
                    onChange={() => {
                      setActiveFilter(!activeFilter);
                      getActiveVmOffers();
                    }}
                  />
                }
                label={t('vmOffers.filters.activeOnly')}
              />
              <Box sx={{ display: 'flex', border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <Tooltip title={t('vmOffers.filters.viewMode.grid')}>
                  <IconButton
                    color={viewMode === 'grid' ? 'primary' : 'default'}
                    onClick={() => setViewMode('grid')}
                  >
                    <GridViewIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('vmOffers.filters.viewMode.table')}>
                  <IconButton
                    color={viewMode === 'table' ? 'primary' : 'default'}
                    onClick={() => setViewMode('table')}
                  >
                    <ListViewIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Loading and Error States */}
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}
      {!isLoading && filteredOffers?.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {t('vmOffers.table.noOffers')}
          </Typography>
          {searchTerm && (
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                fetchVmOffers();
              }}
              sx={{ mt: 2 }}
            >
              {t('vmOffers.buttons.clearSearch')}
            </Button>
          )}
        </Paper>
      )}

      {/* Main Content */}
      {!isLoading && filteredOffers?.length > 0 && (
        viewMode === 'grid' ? renderGridView() : renderTableView()
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('edit')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          {t('vmOffers.buttons.edit')}
        </MenuItem>
        <MenuItem 
          onClick={() => handleAction('delete')}
          sx={{ color: theme.palette.error.main }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          {t('vmOffers.buttons.delete')}
        </MenuItem>
      </Menu>

      {/* Create VM Offer Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t('vmOffers.dialogs.create.title')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label={t('vmOffers.form.labels.name')}
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
                placeholder={t('vmOffers.form.placeholders.name')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('vmOffers.form.labels.description')}
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                placeholder={t('vmOffers.form.placeholders.description')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t('vmOffers.dialogs.create.resources')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                name="cpu_count"
                label={t('vmOffers.form.labels.cpuCount')}
                type="number"
                value={formData.cpu_count}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DnsIcon />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1 }
                }}
                error={Boolean(formErrors.cpu_count)}
                helperText={formErrors.cpu_count}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                name="memory_size_mib"
                label={t('vmOffers.form.labels.memorySize')}
                type="number"
                value={formData.memory_size_mib}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MemoryIcon />
                    </InputAdornment>
                  ),
                  inputProps: { min: 512, step: 512 }
                }}
                error={Boolean(formErrors.memory_size_mib)}
                helperText={formErrors.memory_size_mib || t('vmOffers.form.helperText.memory')}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                name="disk_size_gb"
                label={t('vmOffers.form.labels.diskSize')}
                type="number"
                value={formData.disk_size_gb}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StorageIcon />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1 }
                }}
                error={Boolean(formErrors.disk_size_gb)}
                helperText={formErrors.disk_size_gb || t('vmOffers.form.helperText.disk')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t('vmOffers.dialogs.create.pricing')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="price_per_hour"
                label={t('vmOffers.form.labels.price')}
                type="number"
                value={formData.price_per_hour}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, step: 0.01 }
                }}
                error={Boolean(formErrors.price_per_hour)}
                helperText={formErrors.price_per_hour}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Paper sx={{ 
                p: 2, 
                height: '100%', 
                bgcolor: 'primary.light', 
                color: 'primary.contrastText' 
              }}>
                <Typography variant="subtitle1" gutterBottom>
                  {t('vmOffers.dialogs.create.monthlyEstimate')}
                </Typography>
                <Typography variant="h5">
                  {formatPrice(formData.price_per_hour * 24 * 30)}
                </Typography>
                <Typography variant="caption">
                  {t('vmOffers.dialogs.create.estimateNote')}
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="subtitle2" gutterBottom>
                  {t('vmOffers.dialogs.create.summary')}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip icon={<DnsIcon />} label={`${formData.cpu_count} ${t('vmOffers.table.headers.cpu')}`} />
                  <Chip icon={<MemoryIcon />} label={`${mibToGib(formData.memory_size_mib)} GB ${t('vmOffers.table.headers.memory')}`} />
                  <Chip icon={<StorageIcon />} label={`${formData.disk_size_gb} GB ${t('vmOffers.table.headers.storage')}`} />
                  <Chip icon={<MoneyIcon />} label={`${formatPrice(formData.price_per_hour)}/${t('vmOffers.form.labels.price').split('(')[1].split(')')[0]}`} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>
            {t('vmOffers.buttons.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateVmOffer}
            startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
            disabled={isLoading}
          >
            {t('vmOffers.buttons.createOffer')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit VM Offer Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t('vmOffers.dialogs.edit.title')}</DialogTitle>
          <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label={t('vmOffers.form.labels.name')}
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
                placeholder={t('vmOffers.form.placeholders.name')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('vmOffers.form.labels.description')}
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                placeholder={t('vmOffers.form.placeholders.description')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t('vmOffers.dialogs.create.resources')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                name="cpu_count"
                label={t('vmOffers.form.labels.cpuCount')}
                type="number"
                value={formData.cpu_count}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DnsIcon />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1 }
                }}
                error={Boolean(formErrors.cpu_count)}
                helperText={formErrors.cpu_count}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                name="memory_size_mib"
                label={t('vmOffers.form.labels.memorySize')}
                type="number"
                value={formData.memory_size_mib}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MemoryIcon />
                    </InputAdornment>
                  ),
                  inputProps: { min: 512, step: 512 }
                }}
                error={Boolean(formErrors.memory_size_mib)}
                helperText={formErrors.memory_size_mib || t('vmOffers.form.helperText.memory')}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                name="disk_size_gb"
                label={t('vmOffers.form.labels.diskSize')}
                type="number"
                value={formData.disk_size_gb}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StorageIcon />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1 }
                }}
                error={Boolean(formErrors.disk_size_gb)}
                helperText={formErrors.disk_size_gb || t('vmOffers.form.helperText.disk')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t('vmOffers.dialogs.create.pricing')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="price_per_hour"
                label={t('vmOffers.form.labels.price')}
                type="number"
                value={formData.price_per_hour}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, step: 0.01 }
                }}
                error={Boolean(formErrors.price_per_hour)}
                helperText={formErrors.price_per_hour}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Paper sx={{ 
                p: 2, 
                height: '100%', 
                bgcolor: 'primary.light', 
                color: 'primary.contrastText' 
              }}>
                <Typography variant="subtitle1" gutterBottom>
                  {t('vmOffers.dialogs.create.monthlyEstimate')}
                </Typography>
                <Typography variant="h5">
                  {formatPrice(formData.price_per_hour * 24 * 30)}
                </Typography>
                <Typography variant="caption">
                  {t('vmOffers.dialogs.create.estimateNote')}
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="subtitle2" gutterBottom>
                  {t('vmOffers.dialogs.create.summary')}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip icon={<DnsIcon />} label={`${formData.cpu_count} ${t('vmOffers.table.headers.cpu')}`} />
                  <Chip icon={<MemoryIcon />} label={`${mibToGib(formData.memory_size_mib)} GB ${t('vmOffers.table.headers.memory')}`} />
                  <Chip icon={<StorageIcon />} label={`${formData.disk_size_gb} GB ${t('vmOffers.table.headers.storage')}`} />
                  <Chip icon={<MoneyIcon />} label={`${formatPrice(formData.price_per_hour)}/${t('vmOffers.form.labels.price').split('(')[1].split(')')[0]}`} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            {t('vmOffers.buttons.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleEditVmOffer}
            startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
            disabled={isLoading}
          >
            {t('vmOffers.buttons.save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{t('vmOffers.dialogs.delete.title')}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {t('vmOffers.dialogs.delete.message', { name: selectedOffer?.name })}
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {t('vmOffers.dialogs.delete.warning')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            {t('vmOffers.buttons.cancel')}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteVmOffer}
            startIcon={isLoading ? <CircularProgress size={20} /> : <DeleteIcon />}
            disabled={isLoading}
          >
            {t('vmOffers.buttons.delete')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VMOffersPage;