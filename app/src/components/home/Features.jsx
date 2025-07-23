import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  useTheme,
  Container,
  useMediaQuery
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  Public as PublicIcon,
  Terminal as TerminalIcon,
  SupportAgent as SupportIcon
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const features = [
    {
      icon: <SpeedIcon fontSize="large" />,
      title: t('features.performance.title'),
      description: t('features.performance.description')
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: t('features.security.title'),
      description: t('features.security.description')
    },
    {
      icon: <StorageIcon fontSize="large" />,
      title: t('features.scalability.title'),
      description: t('features.scalability.description')
    },
    {
      icon: <PublicIcon fontSize="large" />,
      title: t('features.global.title'),
      description: t('features.global.description')
    },
    {
      icon: <TerminalIcon fontSize="large" />,
      title: t('features.access.title'),
      description: t('features.access.description')
    },
    {
      icon: <SupportIcon fontSize="large" />,
      title: t('features.support.title'),
      description: t('features.support.description')
    }
  ];

  return (
    <Box sx={{ 
      py: { xs: 6, md: 10 },
      bgcolor: 'background.paper',
      position: 'relative',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        bgcolor: alpha(theme.palette.primary.light, 0.1),
        zIndex: 0
      }} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h3" 
          align="center" 
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            mb: 6,
            color: 'text.primary'
          }}
        >
          {t('features.title')}
        </Typography>
        
        <Grid 
          container 
          spacing={isMobile ? 3 : 4}
          justifyContent="center"
          alignItems="stretch"
        >
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                    borderColor: theme.palette.primary.main
                  }
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    width: 60,
                    height: 60,
                    mb: 3
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;