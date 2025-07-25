import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  useTheme,
  Stack,
  Checkbox,
  FormControlLabel,
  Fade,
  Container,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { 
  Email as EmailIcon,
  Lock as LockIcon,
  GitHub as GitHubIcon,
  Google as GoogleIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser';



const LoginPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  
  // Use the custom user hook
  const { 
    login, 
    isLoading, 
    error, 
    success, 
    isAuthenticated,
    clearErrors,
    clearSuccess 
  } = useUser();

  // Local state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Check if user came from registration
  useEffect(() => {
    if (location.state?.registrationSuccess) {
      setRegistrationSuccess(true);
      // Clear the success message after 5 seconds
      setTimeout(() => setRegistrationSuccess(false), 5000);
    }
  }, [location.state]);

  // Clear errors when component unmounts or form changes
  useEffect(() => {
    return () => {
      clearErrors();
      clearSuccess();
    };
  }, [clearErrors, clearSuccess]);

  // Clear form errors when user starts typing
  useEffect(() => {
    if (Object.keys(formErrors).length > 0) {
      setFormErrors({});
    }
  }, [formData.email, formData.password]);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear field-specific error
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = t('validation.email.required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = t('validation.email.invalid');
      }
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = t('validation.password.required');
    } else if (formData.password.length < 6) {
      errors.password = t('validation.password.minLength');
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      const result = await login({
        email: formData.email,
        password: formData.password,
        rememberMe
      });
      
      if (!result.success) {
        // Handle specific error cases
        if (result.error.includes('401') || result.error.toLowerCase().includes('credential')) {
          setFormErrors({ 
            password: t('errors.invalidCredentials') 
          });
        }
      }
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${t('login.socialLogin')} ${provider}`);
    // Implement social login logic here
    // This would typically involve redirecting to OAuth provider
  };

  // Success state - user is authenticated
//   if (isAuthenticated) {
//     return (
//       <Container maxWidth="sm">
//         <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <Fade in={isAuthenticated}>
//             <Paper 
//               elevation={3} 
//               sx={{ 
//                 p: 4, 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'center',
//                 textAlign: 'center',
//                 borderRadius: 2,
//                 width: '100%'
//               }}
//             >
//               <CheckCircleIcon 
//                 sx={{ 
//                   fontSize: 60, 
//                   color: theme.palette.success.main,
//                   mb: 2
//                 }}
//               />
//               <Typography variant="h5" component="h2" gutterBottom>
//                 {t('login.success.title')}
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 3 }}>
//                 {t('login.success.message')}
//               </Typography>
//               <Button 
//                 variant="contained" 
//                 href="/dashboard"
//                 sx={{ borderRadius: 28, px: 4 }}
//               >
//                 {t('login.success.goToDashboard')}
//               </Button>
//             </Paper>
//           </Fade>
//         </Box>
//       </Container>
//     );
//   }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, md: 4 }, 
            borderRadius: 2,
            maxWidth: 450,
            width: '100%',
            mx: 'auto'
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
              {t('login.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('login.subtitle')}
            </Typography>
          </Box>

          {/* Registration success message */}
          {registrationSuccess && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3, 
                borderRadius: 2 
              }}
            >
              {t('login.registrationSuccess')}
            </Alert>
          )}

          {/* Global error */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: 2 
              }}
            >
              {t('errors.loginFailed')}
            </Alert>
          )}
          
          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('login.form.email.label')}
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!formErrors.email}
              helperText={formErrors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color={formErrors.email ? "error" : "action"} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            {/* Password Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('login.form.password.label')}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color={formErrors.password ? "error" : "action"} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      size="small"
                      aria-label={t('login.form.password.toggleVisibility')}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
            
            {/* Remember Me & Forgot Password */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    name="rememberMe"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    {t('login.form.rememberMe')}
                  </Typography>
                }
              />
              <Link 
                href="/forgot-password" 
                variant="body2"
                underline="hover"
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 500
                }}
              >
                {t('login.form.forgotPassword')}
              </Link>
            </Box>
            
            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5, 
                borderRadius: 28,
                position: 'relative',
                fontWeight: 600
              }}
            >
              {isLoading ? (
                <CircularProgress 
                  size={24} 
                  sx={{ 
                    color: theme.palette.primary.light
                  }} 
                />
              ) : (
                t('login.form.submitButton')
              )}
            </Button>
            
            {/* Social Login Divider */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {t('login.socialLogin.divider')}
              </Typography>
            </Divider>
            
            {/* Social Login Buttons */}
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleSocialLogin('Google')}
                startIcon={<GoogleIcon />}
                sx={{ 
                  py: 1.2, 
                  borderRadius: 2,
                  borderColor: theme.palette.grey[300],
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100]
                  }
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleSocialLogin('GitHub')}
                startIcon={<GitHubIcon />}
                sx={{ 
                  py: 1.2, 
                  borderRadius: 2,
                  borderColor: theme.palette.grey[300],
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100]
                  }
                }}
              >
                GitHub
              </Button>
            </Stack>
            
            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                {t('login.form.noAccount')}{' '}
                <Link 
                  href="/signup" 
                  underline="hover"
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 500
                  }}
                >
                  {t('login.form.signUpLink')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;