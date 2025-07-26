import React from 'react';
import { Paper, Typography, Grid, Button, Box } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

const BillingSummary = ({ t }) => {
  const theme = useTheme();

  const billingData = {
    currentMonth: 123.45,
    lastMonth: 98.76,
    estimatedTotal: 150.00,
    billingPeriod: '1 mai - 31 mai 2025'
  };

  const handleViewBilling = () => {
    console.log('View billing details');
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        {t('dashboard.billing.title')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              borderLeft: `4px solid ${theme.palette.primary.main}`
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {t('dashboard.billing.currentMonth')}
              </Typography>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                {billingData.currentMonth.toFixed(2)} €
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {t('dashboard.billing.billingPeriod', { period: billingData.billingPeriod })}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {t('dashboard.billing.lastMonth')}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {billingData.lastMonth.toFixed(2)} €
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {t('dashboard.billing.estimatedTotal')}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {billingData.estimatedTotal.toFixed(2)} €
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Button 
        fullWidth 
        variant="outlined" 
        sx={{ mt: 2 }}
        onClick={handleViewBilling}
      >
        {t('dashboard.billing.viewDetails')}
      </Button>
    </Paper>
  );
};

export default BillingSummary;