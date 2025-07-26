import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { 
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Notifications = ({ t }) => {
  const theme = useTheme();

  const notifications = [
    { 
      type: 'info', 
      title: t('dashboard.notifications.maintenance.title'), 
      message: t('dashboard.notifications.maintenance.message'), 
      time: t('dashboard.notifications.maintenance.time') 
    },
    { 
      type: 'success', 
      title: t('dashboard.notifications.vmCreated.title'), 
      message: t('dashboard.notifications.vmCreated.message'), 
      time: t('dashboard.notifications.vmCreated.time') 
    },
    { 
      type: 'warning', 
      title: t('dashboard.notifications.storageUsage.title'), 
      message: t('dashboard.notifications.storageUsage.message'), 
      time: t('dashboard.notifications.storageUsage.time') 
    },
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'info': return <InfoIcon color="info" />;
      case 'success': return <SuccessIcon color="success" />;
      case 'warning': return <WarningIcon color="warning" />;
      case 'error': return <ErrorIcon color="error" />;
      default: return <InfoIcon color="info" />;
    }
  };

  const handleViewAll = () => {
    console.log('View all notifications');
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          {t('dashboard.notifications.title')}
        </Typography>
        <Button size="small" onClick={handleViewAll}>
          {t('dashboard.notifications.viewAll')}
        </Button>
      </Box>
      {notifications.length > 0 ? (
        <Box>
          {notifications.map((notification, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                borderLeft: `4px solid ${
                  notification.type === 'info' ? theme.palette.info.main :
                  notification.type === 'warning' ? theme.palette.warning.main :
                  notification.type === 'error' ? theme.palette.error.main :
                  theme.palette.success.main
                }`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {getIcon(notification.type)}
                <Typography variant="subtitle2" fontWeight={600} sx={{ ml: 1 }}>
                  {notification.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {notification.message}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                {notification.time}
              </Typography>
            </Paper>
          ))}
        </Box>
      ) : (
        <Box textAlign="center" py={3}>
          <Typography color="text.secondary">
            {t('dashboard.notifications.noNotifications')}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Notifications;