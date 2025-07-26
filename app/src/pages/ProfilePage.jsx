// src/pages/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Divider,
  Stack,
  Grid,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { Face, Edit, Lock, Delete, ArrowBack } from '@mui/icons-material';
import useUser from '../hooks/useUser';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    user,
    updateProfile,
    changePassword,
    deleteProfile,
    error,
    clearErrors,
    clearSuccess,
    success,
    isLoading
  } = useUser();

  const [tabIndex, setTabIndex] = useState(0);
  const [profileData, setProfileData] = useState({
    username: '',
    email: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    clearErrors();
    clearSuccess();
    setPasswordErrors({});
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!profileData.username.trim() || !profileData.email.trim()) {
      return;
    }

    await updateProfile(user.id, profileData);
  };

  const validatePassword = () => {
    const errors = {};
    
    if (passwordData.newPassword.length < 8) {
      errors.newPassword = t('profile.errors.passwordLength');
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = t('profile.errors.passwordMismatch');
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    clearErrors();
    setPasswordErrors({});

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      return;
    }

    if (!validatePassword()) return;

    await changePassword({
      password: passwordData.currentPassword,
      new_password: passwordData.newPassword
    });
    
    if (!error) {
      setPasswordData({ 
        currentPassword: '', 
        newPassword: '',
        confirmPassword: '' 
      });
      setTabIndex(0);
    }
  };

  const handleDeleteProfile = async () => {
    setDeleteConfirmOpen(false);
    await deleteProfile(user.id);
  };

  console.log("is loading : ",isLoading);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary' }}
        >
          {t('common.back')}
        </Button>
      </Box>

      <Paper elevation={0} sx={{ 
        p: { xs: 2, md: 4 }, 
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper
      }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontSize: '2rem'
            }}
          >
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {user?.username}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Stack>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 4,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 3,
              backgroundColor: theme.palette.primary.main
            }
          }}
        >
          <Tab 
            label={t('profile.tabs.profile')} 
            icon={<Face />} 
            iconPosition="start" 
            sx={{ minHeight: 48 }}
          />
          <Tab 
            label={t('profile.tabs.edit')} 
            icon={<Edit />} 
            iconPosition="start" 
            sx={{ minHeight: 48 }}
          />
          <Tab 
            label={t('profile.tabs.password')} 
            icon={<Lock />} 
            iconPosition="start" 
            sx={{ minHeight: 48 }}
          />
        </Tabs>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={clearErrors}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={clearSuccess}
          >
            {success}
          </Alert>
        )}

        {tabIndex === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {t('profile.personalInfo')}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('profile.fields.name')}
                      </Typography>
                      <Typography>{user?.username}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('profile.fields.email')}
                      </Typography>
                      <Typography>{user?.email}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {t('profile.accountActions')}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => setTabIndex(1)}
                      startIcon={<Edit />}
                    >
                      {t('profile.buttons.editProfile')}
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => setTabIndex(2)}
                      startIcon={<Lock />}
                    >
                      {t('profile.buttons.changePassword')}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={() => setDeleteConfirmOpen(true)}
                      startIcon={<Delete />}
                    >
                      {t('profile.buttons.deleteAccount')}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tabIndex === 1 && (
          <Box 
            component="form" 
            onSubmit={handleProfileUpdate} 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              p: { xs: 0, md: 3 }
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              {t('profile.editProfile')}
            </Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label={t('profile.fields.name')}
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                required
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
              <TextField
                fullWidth
                label={t('profile.fields.email')}
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                required
                type="email"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ 
                  mt: 2, 
                  py: 1.5, 
                  borderRadius: 2,
                  fontWeight: 600
                }}
                startIcon={isLoading ? <CircularProgress size={20} /> : <Edit />}
              >
                {t('profile.buttons.update')}
              </Button>
            </Stack>
          </Box>
        )}

        {tabIndex === 2 && (
          <Box 
            component="form" 
            onSubmit={handlePasswordChange} 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              p: { xs: 0, md: 3 }
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              {t('profile.changePassword')}
            </Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label={t('profile.fields.currentPassword')}
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
                variant="outlined"
                error={!!passwordErrors.currentPassword}
                helperText={passwordErrors.currentPassword}
                sx={{ borderRadius: 2 }}
              />
              <TextField
                fullWidth
                label={t('profile.fields.newPassword')}
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
                variant="outlined"
                error={!!passwordErrors.newPassword}
                helperText={passwordErrors.newPassword || t('profile.passwordRequirements')}
                sx={{ borderRadius: 2 }}
              />
              <TextField
                fullWidth
                label={t('profile.fields.confirmPassword')}
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
                variant="outlined"
                error={!!passwordErrors.confirmPassword}
                helperText={passwordErrors.confirmPassword}
                sx={{ borderRadius: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ 
                  mt: 2, 
                  py: 1.5, 
                  borderRadius: 2,
                  fontWeight: 600
                }}
                startIcon={isLoading ? <CircularProgress size={20} /> : <Lock />}
              >
                {t('profile.buttons.changePassword')}
              </Button>
            </Stack>
          </Box>
        )}
      </Paper>

      <Dialog 
        open={deleteConfirmOpen} 
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {t('profile.deleteAccount')}
        </DialogTitle>
        <DialogContent>
          <Typography>{t('profile.messages.deleteConfirm')}</Typography>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {t('profile.messages.deleteWarning')}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setDeleteConfirmOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleDeleteProfile}
            color="error"
            variant="contained"
            disabled={isLoading}
            sx={{ borderRadius: 2 }}
            startIcon={isLoading ? <CircularProgress size={20} /> : <Delete />}
          >
            {t('profile.buttons.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfilePage;