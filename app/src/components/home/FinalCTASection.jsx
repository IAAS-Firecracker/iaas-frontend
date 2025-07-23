import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  Stack,
  alpha,
  Chip,
  useMediaQuery
} from '@mui/material';
import { 
  ArrowForward, 
  Phone,
  Star,
  TrendingUp
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const FinalCTASection = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{
      py: { xs: 10, md: 16 },
      position: 'relative',
      overflow: 'hidden',
      background: `
        linear-gradient(135deg, 
          ${theme.palette.primary.dark} 0%, 
          ${theme.palette.primary.main} 35%, 
          ${theme.palette.secondary.main} 100%
        )
      `,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: -50,
        left: -50,
        right: -50,
        bottom: -50,
        background: `
          conic-gradient(from 0deg at 50% 50%, 
            transparent 0deg, 
            ${alpha(theme.palette.secondary.light, 0.1)} 90deg, 
            transparent 180deg, 
            ${alpha(theme.palette.primary.light, 0.1)} 270deg, 
            transparent 360deg
          )
        `,
        animation: 'rotate 20s linear infinite',
        zIndex: 0,
        '@keyframes rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    }}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          color: 'white'
        }}
      >
        <Stack
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
          textAlign="center"
        >
          {/* Header Section */}
          <Stack spacing={3} alignItems="center">
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip 
                icon={<Star sx={{ fontSize: 16 }} />}
                label="Ready to start?"
                sx={{ 
                  bgcolor: alpha('#ffffff', 0.15),
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: `1px solid ${alpha('#ffffff', 0.2)}`,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '& .MuiChip-icon': { color: '#FFD700' }
                }}
              />
              <Chip 
                icon={<TrendingUp sx={{ fontSize: 16 }} />}
                label="Join 10K+ users"
                sx={{ 
                  bgcolor: alpha(theme.palette.secondary.main, 0.2),
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: `1px solid ${alpha('#ffffff', 0.2)}`,
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              />
            </Box>

            <Typography 
              variant="h2" 
              component="h2" 
              fontWeight={800}
              sx={{ 
                fontSize: { xs: '2.5rem', md: '4rem' },
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: 1.2
              }}
            >
              {t('landing.cta.title')}
            </Typography>

            <Typography 
              variant="h5" 
              sx={{ 
                opacity: 0.9,
                maxWidth: 600,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                lineHeight: 1.5,
                fontWeight: 400
              }}
            >
              {t('landing.cta.subtitle')}
            </Typography>
          </Stack>

          {/* CTA Buttons */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            sx={{ width: '100%', maxWidth: 500 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/signup')}
              sx={{
                flex: 1,
                py: 2.5,
                px: 4,
                fontSize: '1.2rem',
                fontWeight: 700,
                borderRadius: 4,
                bgcolor: alpha('#ffffff', 0.1),
                color: 'white',
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: `2px solid transparent`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, 
                    transparent, 
                    ${alpha('#ffffff', 0.1)}, 
                    transparent
                  )`,
                  transition: 'left 0.6s ease'
                },
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                  bgcolor: '#f8f9fa',
                  '&::before': {
                    left: '100%'
                  },
                  '& .MuiSvgIcon-root': {
                    transform: 'translateX(4px)'
                  }
                },
                '& .MuiSvgIcon-root': {
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              {t('landing.cta.button')}
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<Phone />}
              onClick={() => navigate('/contact')}
              sx={{
                flex: 1,
                py: 2.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: alpha('#ffffff', 0.3),
                color: 'white',
                textTransform: 'none',
                backdropFilter: 'blur(10px)',
                bgcolor: alpha('#ffffff', 0.1),
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: '#ffffff',
                  bgcolor: alpha('#ffffff', 0.2),
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255,255,255,0.2)'
                }
              }}
            >
              Contact Sales
            </Button>
          </Stack>

          {/* Trust Indicators */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 2, sm: 6 }}
            alignItems="center"
            sx={{ 
              opacity: 0.8,
              pt: 4,
              borderTop: `1px solid ${alpha('#ffffff', 0.2)}`
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
              ⚡ Setup in 5 minutes
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
              🔒 Enterprise security
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
              🎯 99.9% uptime guaranteed
            </Typography>
          </Stack>

          {/* Bottom decoration */}
          <Box sx={{
            width: 120,
            height: 4,
            background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
            borderRadius: 2,
            opacity: 0.6,
            mt: 2
          }} />
        </Stack>

        {/* Floating elements */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: `2px solid ${alpha('#ffffff', 0.2)}`,
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' }
          }
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: '30%',
          right: '15%',
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: alpha('#ffffff', 0.1),
          animation: 'float 8s ease-in-out infinite reverse'
        }} />

        <Box sx={{
          position: 'absolute',
          top: '60%',
          left: '5%',
          width: 20,
          height: 20,
          borderRadius: '50%',
          bgcolor: alpha('#ffffff', 0.15),
          animation: 'float 10s ease-in-out infinite'
        }} />
      </Container>
    </Box>
  );
};

export default FinalCTASection;