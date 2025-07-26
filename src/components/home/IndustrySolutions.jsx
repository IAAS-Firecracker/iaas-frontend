import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
  Paper,
  alpha,
  Avatar,
  useMediaQuery,
  Chip
} from '@mui/material';
import {
  ArrowForward,
  BusinessCenter,
  School,
  HealthAndSafety,
  Code,
  SportsEsports,
  RocketLaunch
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const IndustrySolutions = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Industry solutions
  const industrySolutions = [
    {
      title: t('landing.industries.enterprise'),
      description: t('landing.industries.enterpriseDesc'),
      icon: <BusinessCenter sx={{ fontSize: 28 }} />,
      color: theme.palette.primary.main,
      tag: 'Enterprise'
    },
    {
      title: t('landing.industries.startups'),
      description: t('landing.industries.startupsDesc'),
      icon: <RocketLaunch sx={{ fontSize: 28 }} />,
      color: theme.palette.secondary.main,
      tag: 'Growth'
    },
    {
      title: t('landing.industries.education'),
      description: t('landing.industries.educationDesc'),
      icon: <School sx={{ fontSize: 28 }} />,
      color: '#4CAF50',
      tag: 'Education'
    },
    {
      title: t('landing.industries.healthcare'),
      description: t('landing.industries.healthcareDesc'),
      icon: <HealthAndSafety sx={{ fontSize: 28 }} />,
      color: '#F44336',
      tag: 'Healthcare'
    },
    {
      title: t('landing.industries.developers'),
      description: t('landing.industries.developersDesc'),
      icon: <Code sx={{ fontSize: 28 }} />,
      color: '#9C27B0',
      tag: 'Development'
    },
    {
      title: t('landing.industries.gaming'),
      description: t('landing.industries.gamingDesc'),
      icon: <SportsEsports sx={{ fontSize: 28 }} />,
      color: '#FF9800',
      tag: 'Gaming'
    }
  ];

  return (
    <Box sx={{
      py: { xs: 8, md: 12 },
      bgcolor: alpha(theme.palette.secondary.main, 0.03),
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="lg">
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
            {t('landing.industries.title')}
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
            Tailored solutions for your specific needs
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          {industrySolutions.map((solution, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  minHeight: 380,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  bgcolor: 'background.paper',
                  border: `1px solid ${alpha(solution.color, 0.2)}`,
                  borderRadius: 3,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 32px ${alpha(solution.color, 0.15)}`,
                    borderColor: solution.color,
                    '& .industry-icon': {
                      transform: 'scale(1.1)',
                      bgcolor: alpha(solution.color, 0.15)
                    },
                    '& .learn-more-btn': {
                      bgcolor: solution.color,
                      color: 'white',
                      '& .MuiSvgIcon-root': {
                        transform: 'translateX(4px)'
                      }
                    }
                  }
                }}
              >
                {/* Tag catégorie */}
                <Chip
                  label={solution.tag}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: alpha(solution.color, 0.1),
                    color: solution.color,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: `1px solid ${alpha(solution.color, 0.3)}`
                  }}
                />

                {/* Icône */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, mt: 1 }}>
                  <Avatar 
                    className="industry-icon"
                    sx={{
                      width: 70,
                      height: 70,
                      bgcolor: alpha(solution.color, 0.1),
                      color: solution.color,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {solution.icon}
                  </Avatar>
                </Box>

                {/* Contenu principal */}
                <Box sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  textAlign: 'center'
                }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    fontWeight={600}
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '1.25rem', md: '1.4rem' },
                      minHeight: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {solution.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                      flex: 1,
                      mb: 3
                    }}
                  >
                    {solution.description}
                  </Typography>
                </Box>

                {/* Bouton CTA - bien positionné */}
                <Button
                  className="learn-more-btn"
                  startIcon={<ArrowForward />}
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: solution.color,
                    borderColor: solution.color,
                    borderRadius: 2,
                    py: 1.2,
                    fontWeight: 600,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '& .MuiSvgIcon-root': {
                      transition: 'transform 0.3s ease'
                    }
                  }}
                >
                  Learn more
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default IndustrySolutions;