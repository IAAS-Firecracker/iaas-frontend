// src/pages/UserManagementPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  Tooltip,
  Grid,
  useTheme,
  LinearProgress,
  Avatar,
  Chip
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  PersonAdd as PersonAddIcon,
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LockReset as ResetPasswordIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import  useUser  from '../hooks/useUser';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns/format';

const UserManagementPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    users,
    getUsers,
    createAdmin,
    updateUser,
    deleteUser,
    resetPassword: resetUserPassword,
    error,
    success,
    isLoading,
    clearErrors,
    clearSuccess
  } = useUser();

  // State for UI
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
    isActive: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle success/error messages
  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
      clearErrors();
    }
    if (success) {
      showSnackbar(success, 'success');
      clearSuccess();
    }
  }, [error, success]);

  const fetchUsers = async () => {
    await getUsers();
  };

  // Menu handlers
  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleAction = (action) => {
    const user = users.find(u => u.id === selectedUser);
    if (!user) {
      showSnackbar(t('userManagement.messages.error.fetchUsers'), 'error');
      return;
    }

    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      confirmPassword: '',
      role: user.role || 'USER',
      isActive: user.isActive
    });

    switch (action) {
      case 'view':
        setViewDialogOpen(true);
        break;
      case 'edit':
        setEditDialogOpen(true);
        break;
      case 'reset-password':
        setResetPasswordDialogOpen(true);
        break;
      case 'delete':
        setDeleteDialogOpen(true);
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  // Filter handlers
  const handleFilterMenuOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
      errors.name = t('common.errors.required');
    }

    if (!formData.email.trim()) {
      errors.email = t('common.errors.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('common.errors.emailInvalid');
    }

    if ((createDialogOpen || resetPasswordDialogOpen) && !formData.password) {
      errors.password = t('common.errors.required');
    } else if (formData.password && formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if ((createDialogOpen || resetPasswordDialogOpen) && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t('common.errors.passwordMismatch');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // API handlers
  const handleCreateUser = async () => {
    if (!validateForm()) return;

    const result = await createAdmin({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      isActive: formData.isActive
    });

    if (result.success) {
      setCreateDialogOpen(false);
      fetchUsers();
    }
  };

  const handleEditUser = async () => {
    if (!validateForm() || !selectedUser) return;

    const result = await updateUser(selectedUser, {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      isActive: formData.isActive
    });

    if (result.success) {
      setEditDialogOpen(false);
      fetchUsers();
    }
  };

  const handleResetPassword = async () => {
    if (!validateForm() || !selectedUser) return;

    const result = await resetUserPassword(selectedUser, formData.password);

    if (result.success) {
      setResetPasswordDialogOpen(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    const result = await deleteUser(selectedUser);

    if (result.success) {
      setDeleteDialogOpen(false);
      fetchUsers();
    }
  };

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

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

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' ? user.isActive : !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Get selected user data
  const selectedUserData = users.find(user => user.id === selectedUser);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          {t('userManagement.title')}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchUsers}
            sx={{ mr: 2 }}
            disabled={isLoading}
          >
            {t('userManagement.buttons.refresh')}
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'USER',
                isActive: true
              });
              setFormErrors({});
              setCreateDialogOpen(true);
            }}
            disabled={isLoading}
          >
            {t('userManagement.buttons.createUser')}
          </Button>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t('userManagement.table.headers.name') + ' / ' + t('userManagement.table.headers.email')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={handleFilterMenuOpen}
                sx={{ mr: 2 }}
              >
                {t('userManagement.filters.title')}
              </Button>
              {(roleFilter !== 'all' || statusFilter !== 'all') && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setRoleFilter('all');
                    setStatusFilter('all');
                  }}
                >
                  {t('userManagement.buttons.clearFilters')}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Filters Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterMenuClose}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2">{t('userManagement.filters.role.title')}</Typography>
        </MenuItem>
        <MenuItem
          selected={roleFilter === 'all'}
          onClick={() => {
            setRoleFilter('all');
            handleFilterMenuClose();
          }}
        >
          {t('userManagement.filters.role.all')}
        </MenuItem>
        <MenuItem
          selected={roleFilter === 'ADMIN'}
          onClick={() => {
            setRoleFilter('ADMIN');
            handleFilterMenuClose();
          }}
        >
          {t('userManagement.filters.role.admin')}
        </MenuItem>
        <MenuItem
          selected={roleFilter === 'USER'}
          onClick={() => {
            setRoleFilter('USER');
            handleFilterMenuClose();
          }}
        >
          {t('userManagement.filters.role.user')}
        </MenuItem>
        <Divider />
        <MenuItem disabled>
          <Typography variant="subtitle2">{t('userManagement.filters.status.title')}</Typography>
        </MenuItem>
        <MenuItem
          selected={statusFilter === 'all'}
          onClick={() => {
            setStatusFilter('all');
            handleFilterMenuClose();
          }}
        >
          {t('userManagement.filters.status.all')}
        </MenuItem>
        <MenuItem
          selected={statusFilter === 'active'}
          onClick={() => {
            setStatusFilter('active');
            handleFilterMenuClose();
          }}
        >
          {t('userManagement.filters.status.active')}
        </MenuItem>
        <MenuItem
          selected={statusFilter === 'inactive'}
          onClick={() => {
            setStatusFilter('inactive');
            handleFilterMenuClose();
          }}
        >
          {t('userManagement.filters.status.inactive')}
        </MenuItem>
      </Menu>

      {/* Loading indicator */}
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('userManagement.table.headers.name')}</TableCell>
              <TableCell>{t('userManagement.table.headers.email')}</TableCell>
              <TableCell>{t('userManagement.table.headers.role')}</TableCell>
              <TableCell>{t('userManagement.table.headers.status')}</TableCell>
              <TableCell align="right">{t('userManagement.table.headers.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {user.name?.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <Typography>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={user.role === 'ADMIN' ? 'primary' : 'default'}
                      variant={user.role === 'ADMIN' ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isActive ? t('userManagement.filters.status.active') : t('userManagement.filters.status.inactive')}
                      color={user.isActive ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, user.id)}
                      disabled={isLoading}
                    >
                      <MoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1">
                    {isLoading ? <CircularProgress size={24} /> : t('userManagement.table.noUsers')}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('view')}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('userManagement.buttons.viewDetails')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('edit')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('userManagement.buttons.edit')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('reset-password')}>
          <ListItemIcon>
            <ResetPasswordIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('userManagement.buttons.resetPassword')}</ListItemText>
        </MenuItem>
        <MenuItem 
          onClick={() => handleAction('delete')} 
          sx={{ color: theme.palette.error.main }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>{t('userManagement.buttons.delete')}</ListItemText>
        </MenuItem>
      </Menu>

      {/* Create User Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('userManagement.dialogs.createUser.title')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t('userManagement.dialogs.createUser.userType')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  p: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1
                }}
              >
                <Button
                  fullWidth
                  variant={formData.role === 'USER' ? 'contained' : 'outlined'}
                  onClick={() => setFormData({ ...formData, role: 'USER' })}
                  sx={{ mr: 1 }}
                >
                  {t('userManagement.dialogs.createUser.regularUser')}
                </Button>
                <Button
                  fullWidth
                  variant={formData.role === 'ADMIN' ? 'contained' : 'outlined'}
                  onClick={() => setFormData({ ...formData, role: 'ADMIN' })}
                  color="primary"
                >
                  {t('userManagement.dialogs.createUser.administrator')}
                </Button>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {formData.role === 'ADMIN' 
                  ? t('userManagement.dialogs.createUser.adminDescription')
                  : t('userManagement.dialogs.createUser.userDescription')}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="name"
                label={t('userManagement.table.headers.name')}
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label={t('userManagement.table.headers.email')}
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label={t('profile.fields.newPassword')}
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                label={t('resetPassword.fields.confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(formErrors.confirmPassword)}
                helperText={formErrors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>{t('userManagement.dialogs.createUser.accountStatus')}</InputLabel>
                <Select
                  name="isActive"
                  value={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                  label={t('userManagement.dialogs.createUser.accountStatus')}
                >
                  <MenuItem value={true}>{t('userManagement.filters.status.active')}</MenuItem>
                  <MenuItem value={false}>{t('userManagement.filters.status.inactive')}</MenuItem>
                </Select>
                <FormHelperText>
                  {t('userManagement.dialogs.createUser.statusHelper')}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCreateDialogOpen(false)}
            startIcon={<CancelIcon />}
          >
            {t('userManagement.buttons.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateUser}
            startIcon={<SaveIcon />}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              t('userManagement.buttons.createUser')
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('userManagement.dialogs.editUser.title')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label={t('userManagement.table.headers.name')}
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label={t('userManagement.table.headers.email')}
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>{t('userManagement.table.headers.role')}</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  label={t('userManagement.table.headers.role')}
                >
                  <MenuItem value="USER">{t('userManagement.filters.role.user')}</MenuItem>
                  <MenuItem value="ADMIN">{t('userManagement.filters.role.admin')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>{t('userManagement.table.headers.status')}</InputLabel>
                <Select
                  name="isActive"
                  value={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                  label={t('userManagement.table.headers.status')}
                >
                  <MenuItem value={true}>{t('userManagement.filters.status.active')}</MenuItem>
                  <MenuItem value={false}>{t('userManagement.filters.status.inactive')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditDialogOpen(false)}
            startIcon={<CancelIcon />}
          >
            {t('userManagement.buttons.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleEditUser}
            startIcon={<SaveIcon />}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              t('userManagement.buttons.saveChanges')
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog
        open={resetPasswordDialogOpen}
        onClose={() => setResetPasswordDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('userManagement.dialogs.resetPassword.title')}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('userManagement.dialogs.resetPassword.description', { name: selectedUserData?.name })}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="password"
                label={t('profile.fields.newPassword')}
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                label={t('resetPassword.fields.confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(formErrors.confirmPassword)}
                helperText={formErrors.confirmPassword}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setResetPasswordDialogOpen(false)}
            startIcon={<CancelIcon />}
          >
            {t('userManagement.buttons.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleResetPassword}
            startIcon={<SaveIcon />}
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              t('userManagement.buttons.resetPassword')
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{t('userManagement.dialogs.deleteUser.title')}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {t('userManagement.dialogs.deleteUser.description', { name: selectedUserData?.name })}
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {t('userManagement.dialogs.deleteUser.warning')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            startIcon={<CancelIcon />}
          >
            {t('userManagement.buttons.cancel')}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteUser}
            startIcon={<DeleteIcon />}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              t('userManagement.buttons.delete')
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View User Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('userManagement.dialogs.viewUser.title')}</DialogTitle>
        <DialogContent>
          {selectedUserData && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  {t('userManagement.dialogs.viewUser.userId')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">{selectedUserData.id}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  {t('userManagement.table.headers.name')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">{selectedUserData.name}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  {t('userManagement.table.headers.email')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">{selectedUserData.email}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  {t('userManagement.table.headers.role')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Chip
                  label={selectedUserData.role}
                  color={selectedUserData.role === 'ADMIN' ? 'primary' : 'default'}
                  variant={selectedUserData.role === 'ADMIN' ? 'filled' : 'outlined'}
                />
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  {t('userManagement.table.headers.status')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Chip
                  label={selectedUserData.isActive ? t('userManagement.filters.status.active') : t('userManagement.filters.status.inactive')}
                  color={selectedUserData.isActive ? 'success' : 'error'}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  {t('userManagement.dialogs.viewUser.createdAt')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {selectedUserData.createdAt ? format(new Date(selectedUserData.createdAt), 'PPpp') : 'N/A'}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  {t('userManagement.dialogs.viewUser.lastUpdated')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {selectedUserData.updatedAt ? format(new Date(selectedUserData.updatedAt), 'PPpp') : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>
            {t('userManagement.dialogs.viewUser.close')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setViewDialogOpen(false);
              handleAction('edit');
            }}
          >
            {t('userManagement.buttons.edit')}
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

export default UserManagementPage;