import React from 'react';
import { Paper, Typography, Button, Grid, Chip, Box } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

const SystemStatus = ({ t }) => {
  const theme = useTheme();

  const services = [
    { name: t('dashboard.systemStatus.services.vmHosting'), status: 'operational', lastUpdated: '1 min ago' },
    { name: t('dashboard.systemStatus.services.storage'), status: 'operational', lastUpdated: '5 min ago' },
    { name: t('dashboard.systemStatus.services.network'), status: 'degraded', lastUpdated: '12 min ago' },
    { name: t('dashboard.systemStatus.services.auth'), status: 'operational', lastUpdated: '3 min ago' },
    { name: t('dashboard.systemStatus.services.backup'), status: 'operational', lastUpdated: '7 min ago' },
    { name: t('dashboard.systemStatus.services.monitoring'), status: 'operational', lastUpdated: '2 min ago' },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          {t('dashboard.systemStatus.title')}
        </Typography>
        <Button size="small" startIcon={<RefreshIcon />}>
          {t('dashboard.vms.refresh')}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} key={service.name}>
            <Paper variant="outlined" sx={{ 
              p: 2, 
              borderRadius: 2,
              borderLeft: `4px solid ${
                service.status === 'operational' ? theme.palette.success.main :
                service.status === 'degraded' ? theme.palette.warning.main :
                theme.palette.error.main
              }`
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" fontWeight={600}>
                  {service.name}
                </Typography>
                <Chip 
                  size="small" 
                  label={service.status.toUpperCase()} 
                  color={
                    service.status === 'operational' ? 'success' :
                    service.status === 'degraded' ? 'warning' :
                    'error'
                  }
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                {t('dashboard.systemStatus.lastUpdated', { time: service.lastUpdated })}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default SystemStatus;