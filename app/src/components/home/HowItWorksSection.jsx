import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
  Paper,
  Avatar,
  alpha,
  useMediaQuery
} from '@mui/material';
import {
  Cloud,
  Storage,
  Dns,
  Lan
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const HowItWorksSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // How it works steps
  const howItWorks = [
    {
      step: t('landing.howItWorks.step1'),
      description: t('landing.howItWorks.step1Desc'),
      icon: <Cloud sx={{ fontSize: 28 }} />
    },
    {
      step: t('landing.howItWorks.step2'),
      description: t('landing.howItWorks.step2Desc'),
      icon: <Storage sx={{ fontSize: 28 }} />
    },
    {
      step: t('landing.howItWorks.step3'),
      description: t('landing.howItWorks.step3Desc'),
      icon: <Dns sx={{ fontSize: 28 }} />
    },
    {
      step: t('landing.howItWorks.step4'),
      description: t('landing.howItWorks.step4Desc'),
      icon: <Lan sx={{ fontSize: 28 }} />
    }
  ];

  return (
    <Box sx={{
      py: { xs: 8, md: 12 },
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            fontWeight={700}
            sx={{ 
              mb: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            {t('landing.howItWorks.title')}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            {t('landing.howItWorks.subtitle')}
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          {howItWorks.map((step, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  minHeight: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  textAlign: 'center',
                  bgcolor: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                  borderRadius: 4,
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    bgcolor: alpha(theme.palette.background.paper, 0.95),
                    '&::before': {
                      transform: 'scaleX(1)'
                    }
                  }
                }}
              >
                {/* Step number indicator */}
                <Box sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}>
                  {index + 1}
                </Box>

                <Avatar sx={{
                  bgcolor: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                  color: theme.palette.primary.main,
                  width: 80,
                  height: 80,
                  mb: 3,
                  mt: 2,
                  border: `3px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1) rotate(5deg)',
                    bgcolor: alpha(theme.palette.primary.main, 0.15)
                  }
                }}>
                  {step.icon}
                </Avatar>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      minHeight: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '1.25rem', md: '1.5rem' }
                    }}
                  >
                    {step.step}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      flex: 1,
                      lineHeight: 1.6,
                      fontSize: '1rem',
                      minHeight: '80px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      textAlign: 'center'
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>

                {/* Bottom accent line */}
                <Box sx={{
                  mt: 3,
                  width: 60,
                  height: 3,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  borderRadius: 2,
                  opacity: 0.7,
                  transition: 'all 0.3s ease'
                }} />
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Optional: Process flow connector lines for larger screens */}
        {!isMobile && (
          <>
            {/* Horizontal connector between cards */}
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '2px',
              height: '100px',
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              zIndex: 0,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '2px',
                bgcolor: alpha(theme.palette.primary.main, 0.2)
              }
            }} />
          </>
        )}
      </Container>
    </Box>
  );
};

export default HowItWorksSection;