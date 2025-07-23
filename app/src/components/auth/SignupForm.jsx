// src/components/auth/SignupForm.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Paper,
  InputAdornment,
  CircularProgress,
  Divider,
  IconButton,
  Fade,
  useTheme,
  Alert,
  Stack,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import useUser from '../../hooks/useUser';

const SignupForm = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { register, isLoading, error, success, clearErrors, clearSuccess } = useUser();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ''
  });

  useEffect(() => {
    // Clear errors and success when component mounts
    return () => {
      clearErrors();
      clearSuccess();
    };
  }, [clearErrors, clearSuccess]);

  useEffect(() => {
    // Validate password match whenever either password changes
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setFormErrors(prev => ({
          ...prev,
          confirmPassword: t('auth.errors.passwordMismatch')
        }));
      } else {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
    
    // Calculate password strength
    if (formData.password) {
      const strength = calculatePasswordStrength(formData.password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, feedback: '' });
    }
  }, [formData.password, formData.confirmPassword, t]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    let feedback = '';

    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
        feedback = t('auth.password.strength.veryWeak');
        break;
      case 2:
        feedback = t('auth.password.strength.weak');
        break;
      case 3:
        feedback = t('auth.password.strength.medium');
        break;
      case 4:
        feedback = t('auth.password.strength.strong');
        break;
      case 5:
        feedback = t('auth.password.strength.veryStrong');
        break;
      default:
        feedback = '';
    }

    return { score, feedback };
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'agreeTerms' ? checked : value
    }));

    // Clear related errors when field is being edited
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = t('auth.errors.nameRequired');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = t('auth.errors.emailRequired');
    } else if (!emailRegex.test(formData.email)) {
      errors.email = t('auth.errors.emailInvalid');
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = t('auth.errors.passwordRequired');
    } else if (formData.password.length < 8) {
      errors.password = t('auth.errors.passwordMinLength');
    } else if (passwordStrength.score < 3) {
      errors.password = t('auth.errors.passwordWeak');
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = t('auth.errors.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t('auth.errors.passwordMismatch');
    }
    
    // Terms agreement validation
    if (!formData.agreeTerms) {
      errors.agreeTerms = t('auth.errors.termsRequired');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Form validation
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        const result = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        });
        
        if (result.success) {
          setIsSubmitted(true);
        }
      } catch (err) {
        // Error is handled by the hook
        console.error('Signup error:', err);
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  // Render password strength indicator
  const renderPasswordStrengthIndicator = () => {
    if (!formData.password) return null;
    
    const getColor = () => {
      switch (passwordStrength.score) {
        case 0:
        case 1:
          return theme.palette.error.main;
        case 2:
          return theme.palette.warning.main;
        case 3:
          return theme.palette.info.main;
        case 4:
        case 5:
          return theme.palette.success.main;
        default:
          return theme.palette.grey[500];
      }
    };
    
    return (
      <Box sx={{ mt: 0.5, mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Box
            sx={{
              height: 4,
              borderRadius: 2,
              width: '100%',
              backgroundColor: theme.palette.grey[200],
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${(passwordStrength.score / 5) * 100}%`,
                backgroundColor: getColor(),
                transition: 'width 0.3s ease, background-color 0.3s ease'
              }}
            />
          </Box>
        </Box>
        <Typography 
          variant="caption" 
          sx={{ 
            color: getColor(),
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          {passwordStrength.score >= 3 ? (
            <CheckCircleIcon fontSize="small" />
          ) : (
            <InfoIcon fontSize="small" />
          )}
          {t('auth.password.strengthLabel')}: {passwordStrength.feedback}
        </Typography>
      </Box>
    );
  };

  // If form is successfully submitted, show success message
  if (isSubmitted) {
    return (
      <Fade in={isSubmitted}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 2,
            maxWidth: 500,
            width: '100%',
            mx: 'auto'
          }}
        >
          <CheckCircleIcon 
            sx={{ 
              fontSize: 60, 
              color: theme.palette.success.main,
              mb: 2
            }}
          />
          <Typography variant="h5" component="h2" gutterBottom>
            {t('auth.signup.success.title')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {t('auth.signup.success.message')}
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            href="/login"
            sx={{ borderRadius: 28, px: 4 }}
          >
            {t('auth.signup.success.loginButton')}
          </Button>
        </Paper>
      </Fade>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 3, md: 4 }, 
        borderRadius: 2,
        maxWidth: 500,
        width: '100%',
        mx: 'auto'
      }}
    >

      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
          {t('auth.signup.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('auth.signup.subtitle')}
        </Typography>
      </Box>

      {(error || formErrors.submit) && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || formErrors.submit}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label={t('auth.fields.fullName')}
          name="name"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
          error={!!formErrors.name}
          helperText={formErrors.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color={formErrors.name ? "error" : "action"} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t('auth.fields.email')}
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
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

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t('auth.fields.password')}
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
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
                  aria-label={t('auth.togglePassword')}
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

        {renderPasswordStrengthIndicator()}

        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label={t('auth.fields.confirmPassword')}
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!formErrors.confirmPassword}
          helperText={formErrors.confirmPassword}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color={formErrors.confirmPassword ? "error" : "action"} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggleConfirmPasswordVisibility}
                  edge="end"
                  size="small"
                  aria-label={t('auth.togglePassword')}
                >
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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

        <FormControlLabel
          control={
            <Checkbox
              name="agreeTerms"
              color="primary"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
          }
          label={
            <Typography variant="body2">
              {t('auth.agreeToTerms.text')}{' '}
              <Link href="#" underline="hover">
                {t('auth.agreeToTerms.terms')}
              </Link>{' '}
              {t('auth.agreeToTerms.and')}{' '}
              <Link href="#" underline="hover">
                {t('auth.agreeToTerms.privacy')}
              </Link>
            </Typography>
          }
          sx={{ mt: 2 }}
        />
        {formErrors.agreeTerms && (
          <Typography variant="caption" color="error" sx={{ ml: 2 }}>
            {formErrors.agreeTerms}
          </Typography>
        )}

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
            position: 'relative'
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
            t('auth.signup.button')
          )}
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {t('auth.orContinueWith')}
          </Typography>
        </Divider>

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

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            {t('auth.signup.hasAccount')}{' '}
            <Link href="/login" underline="hover">
              {t('auth.signup.signInLink')}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default SignupForm;