import React from 'react';
import { 
  Box, Grid, Typography, Paper, Button, 
  Breadcrumbs, Link, FormControlLabel, Switch, 
  Container
} from '@mui/material';
import { 
  Home as HomeIcon, Dashboard as DashboardIcon, 
  People as AdminIcon ,
  Dns as DnsIcon,
  ArrowUpward as ArrowUpwardIcon,
  NavigateNext as NavigateNextIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import useDashboard from '../hooks/useDashboard';
import StatsCard from '../components/dashboard/StatsCard';
import VmList from '../components/dashboard/VmList';
import QuickActions from '../components/dashboard/QuickActions';
import SystemStatus from '../components/dashboard/SystemStatus';
import UserManagement from '../components/dashboard/UserManagement';
import BillingSummary from '../components/dashboard/BillingSummary';
import Notifications from '../components/dashboard/Notifications';

const DashboardPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    t: dashboardT,
    currentUser,
    isAdmin,
    vms,
    vmLoading,
    actionLoading,
    showAllUsers,
    handleVmAction,
    handleRefresh,
    handleCreateVm,
    handleToggleUserFilter
  } = useDashboard();

  // Mock data - replace with real data from your API
  const stats = [
    { 
      title: t('dashboard.stats.activeVms'), 
      value: vms.filter(vm => vm.status === 'running').length.toString(), 
      icon: <DnsIcon />,
      color: theme.palette.primary.main, 
      secondaryValue: t('dashboard.stats.ofPlan', { used: '75%' }),
      change: { label: '+1', icon: <ArrowUpwardIcon fontSize="small" />, color: 'success' }
    },
    // ... other stats
  ];

  const adminStats = [
    { 
      title: t('dashboard.stats.totalUsers'), 
      value: '24', 
      icon: <GroupIcon />,
      color: theme.palette.warning.main, 
      secondaryValue: t('dashboard.stats.thisMonth'),
      change: { label: '+14%', icon: <ArrowUpwardIcon fontSize="small" />, color: 'success' }
    },
    // ... other admin stats
  ];

  console.log(isAdmin);

  return (
    <Container maxWidth={'lg'} sx={{ py: 3, px: { xs: 2, md: 3 } }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {t('common.home')}
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {t('dashboard.title')}
        </Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 1 }}>
          {isAdmin ? t('dashboard.adminTitle') : t('dashboard.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {currentUser ? t('dashboard.welcome', { name: currentUser.name }) : t('dashboard.loading')}
        </Typography>
      </Box>

      {isAdmin && (
        <Box sx={{ mb: 3 }}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: alpha(theme.palette.warning.main, 0.05), borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AdminIcon sx={{ color: theme.palette.warning.main, mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  {t('dashboard.adminView.title')}
                </Typography>
              </Box>
              <FormControlLabel
                control={<Switch checked={showAllUsers} onChange={handleToggleUserFilter} color="warning" />}
                label={showAllUsers ? t('dashboard.adminView.showAllVms') : t('dashboard.adminView.showYourVms')}
              />
            </Box>
          </Paper>
        </Box>
      )}

      <Grid container spacing={3}>
        {(isAdmin && showAllUsers ? adminStats : stats).map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}

        <Grid item xs={12} lg={8}>
          <VmList 
            vms={vms} 
            onVmAction={handleVmAction} 
            onRefresh={handleRefresh}
            onCreateVm={handleCreateVm}
            isLoading={vmLoading}
            isAdmin={isAdmin && showAllUsers}
            actionLoading={actionLoading}
            t={dashboardT}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <QuickActions 
            isAdmin={isAdmin && showAllUsers}
            onCreateVm={handleCreateVm}
            t={dashboardT}
          />
        </Grid>

        {/* {(!isAdmin || !showAllUsers) && (
          <>
            <Grid item xs={12} md={8}>
              <ResourceUsage t={dashboardT} />
            </Grid>
            <Grid item xs={12} md={4}>
              <NetworkStatus t={dashboardT} />
            </Grid>
          </>
        )} */}

        {isAdmin && showAllUsers && (
          <>
            <Grid item xs={12} md={6}>
              <SystemStatus t={dashboardT} />
            </Grid>
            <Grid item xs={12} md={6}>
              <UserManagement t={dashboardT} />
            </Grid>
          </>
        )}

        <Grid item xs={12} md={isAdmin && showAllUsers ? 6 : 4}>
          <BillingSummary t={dashboardT} />
        </Grid>

        <Grid item xs={12} md={isAdmin && showAllUsers ? 6 : 8}>
          <Notifications t={dashboardT} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;