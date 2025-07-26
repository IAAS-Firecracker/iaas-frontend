import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useMediaQuery
} from '@mui/material';
import { CheckCircle, Star } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { alpha } from '@mui/material/styles';

const PricingPlans = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const plans = [
    {
      name: t('pricing.starter.name'),
      price: t('pricing.starter.price'),
      period: t('pricing.starter.period'),
      specs: [
        t('pricing.starter.spec1'),
        t('pricing.starter.spec2'),
        t('pricing.starter.spec3'),
        t('pricing.starter.spec4'),
        t('pricing.starter.spec5')
      ],
      popular: false
    },
    {
      name: t('pricing.business.name'),
      price: t('pricing.business.price'),
      period: t('pricing.business.period'),
      specs: [
        t('pricing.business.spec1'),
        t('pricing.business.spec2'),
        t('pricing.business.spec3'),
        t('pricing.business.spec4'),
        t('pricing.business.spec5')
      ],
      popular: true
    },
    {
      name: t('pricing.enterprise.name'),
      price: t('pricing.enterprise.price'),
      period: t('pricing.enterprise.period'),
      specs: [
        t('pricing.enterprise.spec1'),
        t('pricing.enterprise.spec2'),
        t('pricing.enterprise.spec3'),
        t('pricing.enterprise.spec4'),
        t('pricing.enterprise.spec5')
      ],
      popular: false
    },
  ];

  return (
    <Box sx={{ 
      py: { xs: 6, md: 12 },
      bgcolor: 'background.default'
    }}>
      <Typography 
        variant="h3" 
        align="center" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          mb: 2,
          color: 'text.primary'
        }}
      >
        {t('pricing.title')}
      </Typography>
      <Typography 
        variant="h6" 
        align="center" 
        color="text.secondary" 
        sx={{ 
          mb: 8,
          maxWidth: 720,
          mx: 'auto',
          px: { xs: 2, md: 0 }
        }}
      >
        {t('pricing.subtitle')}
      </Typography>
      
      <Grid container spacing={4} justifyContent="center" sx={{ px: { xs: 2, md: 4 } }}>
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              elevation={plan.popular ? 6 : 2} 
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                border: plan.popular ? `2px solid ${theme.palette.secondary.main}` : 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
                height: '100%',
                display: 'flex',
                padding: 2,
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[plan.popular ? 12 : 6],
                }
              }}
            >
              {plan.popular && (
                <Chip 
                  icon={<Star fontSize="small" />}
                  label={t('pricing.popular')}
                  color="secondary"
                  sx={{ 
                    position: 'absolute', 
                    alignSelf: 'center',
                    top: 16, 
                    right: 16,
                    fontWeight: 600,
                    px: 1
                  }}
                />
              )}
              <Box sx={{ 
                p: 4,
                background: plan.popular ? 
                  `linear-gradient(45deg, ${alpha(theme.palette.secondary.light, 0.1)}, ${theme.palette.background.paper})` : 
                  'transparent'
              }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 1,
                    color: plan.popular ? theme.palette.secondary.main : 'text.primary'
                  }}
                >
                  {plan.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800,
                      lineHeight: 1,
                      color: plan.popular ? theme.palette.secondary.dark : 'text.primary'
                    }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      ml: 1,
                      mb: 0.5
                    }}
                  >
                    {plan.period}
                  </Typography>
                </Box>
                
                <List disablePadding sx={{ mb: 3 }}>
                  {plan.specs.map((spec, i) => (
                    <ListItem key={i} sx={{ px: 0, py: 0.75 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle 
                          color={plan.popular ? "secondary" : "primary"} 
                          fontSize="small" 
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={spec} 
                        primaryTypographyProps={{
                          fontSize: '0.95rem',
                          fontWeight: 500
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
              
              <Box sx={{ p: 4, pt: 0, mt: 'auto' }}>
                <Button
                  fullWidth
                  variant={plan.popular ? 'contained' : 'outlined'}
                  color={plan.popular ? 'secondary' : 'primary'}
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 1,
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  {t('pricing.cta')}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PricingPlans;