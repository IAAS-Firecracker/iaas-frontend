import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  alpha,
  Chip
} from '@mui/material';
import {
  RocketLaunch,
  ArrowForward
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [email, setEmail] = useState('');

  return (
    <Box sx={{
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      backgroundSize: '200% 200%',
      animation: `${gradientAnimation} 12s ease infinite`,
      color: 'white',
      // Réduit le padding top pour diminuer l'espace avec le header
      pt: { xs: 4, md: 6 },
      pb: { xs: 6, md: 10 },
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      // Assure qu'il n'y a pas de margin top
      mt: 0,
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Chip 
          label={t('status.operational')}
          color="success"
          size="small"
          sx={{ 
            mb: 2,
            color: 'white',
            bgcolor: alpha(theme.palette.success.main, 0.2),
            backdropFilter: 'blur(5px)'
          }}
        />
        
        <Typography
          variant={isMobile ? 'h3' : 'h2'}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            mb: 3,
            lineHeight: 1.2,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            px: { xs: 2, md: 0 }
          }}
        >
          {t('landing.hero.title')}{' '}
          <Box component="span" sx={{ 
            color: theme.palette.secondary.light,
            background: `linear-gradient(transparent 60%, ${alpha(theme.palette.secondary.light, 0.3)} 40%)`
          }}>
            {t('landing.hero.highlight')}
          </Box>
        </Typography>
        
        <Typography
          variant={isMobile ? 'body1' : 'h6'}
          component="p"
          sx={{
            mb: 4,
            maxWidth: 700,
            mx: 'auto',
            opacity: 0.9,
            fontWeight: 300,
            lineHeight: 1.6,
            px: { xs: 2, md: 0 }
          }}
        >
          {t('landing.hero.subtitle')}
        </Typography>
        
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ mb: 6 }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/vms')}
            endIcon={<RocketLaunch />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              fontSize: isMobile ? '1rem' : '1.125rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              }
            }}
          >
            {t('landing.hero.ctaPrimary')}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={() => navigate('/pricing')}
            endIcon={<ArrowForward />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              fontSize: isMobile ? '1rem' : '1.125rem',
              borderWidth: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderWidth: 2,
                bgcolor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            {t('landing.hero.ctaSecondary')}
          </Button>
        </Stack>

        {/* Hero Illustration */}
        <Box sx={{
          position: 'relative',
          height: isMobile ? 180 : 260,
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
          animation: `${floatAnimation} 6s ease-in-out infinite`,
        }}>
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/2906/2906274.png" 
            alt="Cloud servers"
            sx={{
              height: '100%',
              width: 'auto',
              maxWidth: '100%',
              filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.4))',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;