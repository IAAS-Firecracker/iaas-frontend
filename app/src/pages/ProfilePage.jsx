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
  useTheme
} from '@mui/material';
import { Face, Edit, Lock } from '@mui/icons-material';
import useUser  from '../hooks/useUser';
import { useTranslation } from 'react-i18next';

const UserProfilePage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    currentUser,
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
    name: '',
    email: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        email: currentUser.email || ''
      });
    }
  }, [currentUser]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    clearErrors();
    clearSuccess();
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!profileData.name.trim() || !profileData.email.trim()) {
      return;
    }

    await updateProfile(currentUser.id, profileData);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      return;
    }

    await changePassword(passwordData);
    if (!error) {
      setPasswordData({ currentPassword: '', newPassword: '' });
      setTabIndex(0);
    }
  };

  const handleDeleteProfile = async () => {
    setDeleteConfirmOpen(false);
    await deleteProfile(currentUser.id);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          {t('profile.title')}
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 4,
            '& .MuiTabs-indicator': {
              height: 4,
              borderRadius: 2
            }
          }}
        >
          <Tab label={t('profile.tabs.profile')} />
          <Tab label={t('profile.tabs.edit')} />
          <Tab label={t('profile.tabs.password')} />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            {success}
          </Alert>
        )}

        {tabIndex === 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 3,
                bgcolor: theme.palette.primary.main,
                fontSize: 48
              }}
            >
              <Face fontSize="inherit" />
            </Avatar>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {t('profile.fields.name')}: {currentUser?.name}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              {t('profile.fields.email')}: {currentUser?.email}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => setDeleteConfirmOpen(true)}
              sx={{ borderRadius: 2, px: 4, py: 1.5 }}
            >
              {t('profile.buttons.delete')}
            </Button>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box component="form" onSubmit={handleProfileUpdate} sx={{ maxWidth: 500, mx: 'auto' }}>
            <TextField
              fullWidth
              margin="normal"
              label={t('profile.fields.name')}
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              required
              sx={{ borderRadius: 2 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label={t('profile.fields.email')}
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              required
              type="email"
              sx={{ borderRadius: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
              startIcon={isLoading ? <CircularProgress size={20} /> : <Edit />}
            >
              {t('profile.buttons.update')}
            </Button>
          </Box>
        )}

        {tabIndex === 2 && (
          <Box component="form" onSubmit={handlePasswordChange} sx={{ maxWidth: 500, mx: 'auto' }}>
            <TextField
              fullWidth
              margin="normal"
              label={t('profile.fields.currentPassword')}
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
              sx={{ borderRadius: 2 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label={t('profile.fields.newPassword')}
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
              sx={{ borderRadius: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
              startIcon={isLoading ? <CircularProgress size={20} /> : <Lock />}
            >
              {t('profile.buttons.changePassword')}
            </Button>
          </Box>
        )}
      </Paper>

      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>{t('profile.title')}</DialogTitle>
        <DialogContent>
          <Typography>{t('profile.messages.deleteConfirm')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleDeleteProfile}
            color="error"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : t('profile.buttons.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfilePage;