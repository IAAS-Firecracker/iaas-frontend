import React from 'react';
import { 
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  SentimentVeryDissatisfied as ErrorIcon,
  Home as HomeIcon,
  ArrowBack as BackIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          p: 3
        }}
      >
        <ErrorIcon 
          sx={{ 
            fontSize: isMobile ? 80 : 120,
            color: theme.palette.error.main,
            mb: 3
          }} 
        />
        
        <Typography 
          variant={isMobile ? 'h4' : 'h2'} 
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 2
          }}
        >
          {t('notFound.title')}
        </Typography>
        
        <Typography 
          variant={isMobile ? 'body1' : 'h6'} 
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          {t('notFound.message')}
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            width: isMobile ? '100%' : 'auto'
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              px: 4,
              py: 1.5,
              width: isMobile ? '100%' : 'auto'
            }}
          >
            {t('notFound.goHome')}
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            startIcon={<BackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              px: 4,
              py: 1.5,
              width: isMobile ? '100%' : 'auto'
            }}
          >
            {t('notFound.goBack')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;