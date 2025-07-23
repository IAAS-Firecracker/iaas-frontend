import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Avatar,
  Paper,
  Rating,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const testimonials = [
    {
      name: t('testimonials.testimonial1.name'),
      role: t('testimonials.testimonial1.role'),
      quote: t('testimonials.testimonial1.quote'),
      rating: 5,
      avatar: t('testimonials.testimonial1.avatar')
    },
    {
      name: t('testimonials.testimonial2.name'),
      role: t('testimonials.testimonial2.role'),
      quote: t('testimonials.testimonial2.quote'),
      rating: 5,
      avatar: t('testimonials.testimonial2.avatar')
    },
    {
      name: t('testimonials.testimonial3.name'),
      role: t('testimonials.testimonial3.role'),
      quote: t('testimonials.testimonial3.quote'),
      rating: 4,
      avatar: t('testimonials.testimonial3.avatar')
    }
  ];

  return (
    <Box sx={{ 
      py: { xs: 6, md: 10 },
      bgcolor: 'background.default',
      position: 'relative'
    }}>
      {/* Decorative elements */}
      <Box sx={{
        position: 'absolute',
        bottom: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        bgcolor: alpha(theme.palette.secondary.light, 0.1),
        zIndex: 0
      }} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            mb: 8,
            color: 'text.primary'
          }}
        >
          {t('testimonials.title')}
        </Typography>
        
        <Grid container spacing={isMobile ? 3 : 6}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[6]
                  }
                }}
              >
                <Rating 
                  value={testimonial.rating} 
                  readOnly 
                  sx={{ mb: 2 }}
                />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontStyle: 'italic', 
                    mb: 3,
                    position: 'relative',
                    '&:before, &:after': {
                      content: '"\\""',
                      fontSize: 24,
                      color: 'text.disabled',
                      lineHeight: 0
                    },
                    '&:before': {
                      mr: 1
                    },
                    '&:after': {
                      ml: 1
                    }
                  }}
                >
                  {testimonial.quote}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      mr: 2,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;