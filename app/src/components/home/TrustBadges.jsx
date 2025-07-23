import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  Avatar,
  alpha
} from '@mui/material';
import {
  Security,
  Speed,
  Public,
  CheckCircle
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const TrustBadges = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Trust badges
  const trustBadges = [
    { text: t('landing.trust.uptime'), icon: <Speed color="primary" /> },
    { text: t('landing.trust.support'), icon: <CheckCircle color="primary" /> },
    { text: t('landing.trust.global'), icon: <Public color="primary" /> },
    { text: t('landing.trust.security'), icon: <Security color="primary" /> }
  ];

  return (
    <Box sx={{
      py: { xs: 3, md: 4 },
      // Réduit le margin top négatif pour un meilleur alignement
      mt: { xs: -4, md: -6 },
      mx: { xs: 2, sm: 4, md: 6, lg: 10 },
      bgcolor: 'background.paper',
      borderRadius: 4,
      boxShadow: theme.shadows[4],
      position: 'relative',
      zIndex: 2,
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      backdropFilter: 'blur(10px)',
    }}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="center" spacing={3}>
          {trustBadges.map((item, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                justifyContent={isMobile ? 'flex-start' : 'center'}
              >
                <Avatar sx={{
                  bgcolor: `${theme.palette.primary.light}20`,
                  color: theme.palette.primary.main,
                  width: 40,
                  height: 40,
                  '& .MuiSvgIcon-root': { fontSize: '1.25rem' }
                }}>
                  {item.icon}
                </Avatar>
                <Typography variant="subtitle2" fontWeight={600} sx={{ whiteSpace: 'nowrap' }}>
                  {item.text}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustBadges;