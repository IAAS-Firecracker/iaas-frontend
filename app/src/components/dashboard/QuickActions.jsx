import React from 'react';
import { Paper, Typography, Grid, Button, Box } from '@mui/material';
import { 
  Settings as SettingsIcon,
  Https as HttpsIcon,
  Cloud as CloudIcon,
  PersonAdd as PersonAddIcon,
  Security as SecurityIcon,
  Report as ReportIcon
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

const QuickActions = ({ isAdmin, onCreateVm, t }) => {
  const theme = useTheme();

  const userActions = [
    { 
      title: t('dashboard.quickActions.manageVms'), 
      description: t('dashboard.quickActions.manageVmsDesc'), 
      icon: <SettingsIcon />, 
      onClick: () => console.log('Manage VMs') 
    },
    { 
      title: t('dashboard.quickActions.configureFirewalls'), 
      description: t('dashboard.quickActions.configureFirewallsDesc'), 
      icon: <HttpsIcon />, 
      onClick: () => console.log('Configure Firewalls') 
    },
    { 
      title: t('dashboard.quickActions.backupSettings'), 
      description: t('dashboard.quickActions.backupSettingsDesc'), 
      icon: <CloudIcon />, 
      onClick: () => console.log('Backup Settings') 
    },
  ];

  const adminActions = [
    { 
      title: t('dashboard.quickActions.addUser'), 
      description: t('dashboard.quickActions.addUserDesc'), 
      icon: <PersonAddIcon />, 
      onClick: () => console.log('Add User') 
    },
    { 
      title: t('dashboard.quickActions.systemSettings'), 
      description: t('dashboard.quickActions.systemSettingsDesc'), 
      icon: <SettingsIcon />, 
      onClick: () => console.log('System Settings') 
    },
    { 
      title: t('dashboard.quickActions.securityPolicy'), 
      description: t('dashboard.quickActions.securityPolicyDesc'), 
      icon: <SecurityIcon />, 
      onClick: () => console.log('Security Policy') 
    },
    { 
      title: t('dashboard.quickActions.viewLogs'), 
      description: t('dashboard.quickActions.viewLogsDesc'), 
      icon: <ReportIcon />, 
      onClick: () => console.log('View Logs') 
    },
  ];

  const actions = isAdmin ? adminActions : userActions;

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        {t('dashboard.quickActions.title')}
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={action.icon}
              onClick={action.onClick}
              size="large"
              sx={{
                py: 1.5,
                justifyContent: 'flex-start',
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.05)
                }
              }}
            >
              <Box textAlign="left">
                <Typography variant="body2" fontWeight={600}>
                  {action.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  {action.description}
                </Typography>
              </Box>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default QuickActions;