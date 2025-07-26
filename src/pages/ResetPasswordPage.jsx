// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  useTheme,
  Link
} from '@mui/material';
import useUser from '../hooks/useUser';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    requestResetCode,
    verifyResetCode,
    resetPassword,
    error,
    clearErrors,
    isLoading,
    passwordResetState
  } = useUser();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('email');

  const handleSendCode = async (e) => {
    e.preventDefault();
    clearErrors();
    
    if (!email.trim()) {
      return;
    }

    await requestResetCode(email);
    if (!error) {
      setStep('code');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!code.trim()) {
      return;
    }

    await verifyResetCode(email, code);
    if (!error) {
      setStep('password');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!newPassword || newPassword !== confirmPassword) {
      return;
    }

    await resetPassword(email, code, newPassword);
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            {t('resetPassword.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t(`resetPassword.steps.${step}`)}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {step === 'email' && (
          <Box component="form" onSubmit={handleSendCode}>
            <TextField
              fullWidth
              margin="normal"
              label={t('profile.fields.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                t('resetPassword.buttons.sendCode')
              )}
            </Button>
          </Box>
        )}

        {step === 'code' && (
          <Box component="form" onSubmit={handleVerifyCode}>
            <TextField
              fullWidth
              margin="normal"
              label={t('resetPassword.fields.code')}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              sx={{ borderRadius: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                t('resetPassword.buttons.verifyCode')
              )}
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                component="button"
                type="button"
                onClick={() => {
                  clearErrors();
                  setStep('email');
                }}
                sx={{ color: theme.palette.primary.main }}
              >
                {t('resetPassword.buttons.resendCode')}
              </Link>
            </Box>
          </Box>
        )}

        {step === 'password' && (
          <Box component="form" onSubmit={handleResetPassword}>
            <TextField
              fullWidth
              margin="normal"
              label={t('profile.fields.newPassword')}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              sx={{ borderRadius: 2 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label={t('resetPassword.fields.confirmPassword')}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{ borderRadius: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                t('resetPassword.buttons.resetPassword')
              )}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;