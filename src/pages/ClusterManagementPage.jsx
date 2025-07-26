import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Tabs, 
  Tab, 
  Box, 
  Paper, 
  Breadcrumbs, 
  Link, 
  useTheme, 
  Divider,
  Grid,
  Card,
  CardContent,
  Chip,
  useMediaQuery
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Storage as StorageIcon, 
  Search as SearchIcon,
  Code as CodeIcon,
  Home as HomeIcon,
  Computer as ComputerIcon,
  NavigateNext as NavigateNextIcon,
  ImageSearch as ImageSearchIcon
} from '@mui/icons-material';
import LanIcon from '@mui/icons-material/Lan';
import { useTranslation } from 'react-i18next';

// Import our custom components
import ClusterUtilities from '../components/cluster/ClusterUtilities';
import FindSuitableHost from '../components/cluster/FindSuitableHost';
import ClustersList from '../components/cluster/ClustersList';
import SystemImagesManager from '../components/system-images/SystemImagesManager';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cluster-tabpanel-${index}`}
      aria-labelledby={`cluster-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ClusterManagementPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Cluster Status Summary Data
  const clusterSummary = {
    total: 4,
    active: 3,
    warning: 1,
    error: 0
  };

  return (
    <Container maxWidth="lg" sx={{ 
      mt: 5, 
      mb: 6,
      [theme.breakpoints.up('md')]: {
        px: 4
      }
    }}>
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ 
          mb: 2,
          '& .MuiBreadcrumbs-ol': {
            flexWrap: 'nowrap'
          },
          '& .MuiBreadcrumbs-li': {
            display: 'flex',
            alignItems: 'center'
          }
        }}
      >
        <Link 
          underline="hover" 
          color="inherit" 
          href="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            whiteSpace: 'nowrap'
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {t('common.home')}
        </Link>
        <Typography 
          color="text.primary"
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            whiteSpace: 'nowrap'
          }}
        >
          <LanIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {t('clusterManagement.title')}
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2
      }}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              color: theme.palette.primary.main,
              mb: 0.5,
              lineHeight: 1.2
            }}
          >
            {t('clusterManagement.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('clusterManagement.subtitle')}
          </Typography>
        </Box>

        <Chip 
          label={t('clusterManagement.totalClusters', { count: clusterSummary.total })} 
          color="primary" 
          variant="outlined" 
          sx={{ 
            mt: { xs: 0, md: 0 },
            alignSelf: { xs: 'flex-start', md: 'center' },
            fontSize: '0.875rem',
            height: '32px'
          }}
        />
      </Box>

      {/* Cluster Status Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card 
            variant="outlined" 
            sx={{ 
              borderLeft: `4px solid ${theme.palette.success.main}`,
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[2]
              }
            }}
          >
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                {t('clusterManagement.activeClusters')}
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.success.main,
                mb: 1
              }}>
                {clusterSummary.active}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('clusterManagement.activeDescription')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card 
            variant="outlined" 
            sx={{ 
              borderLeft: `4px solid ${theme.palette.warning.main}`,
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[2]
              }
            }}
          >
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                {t('clusterManagement.warningState')}
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.warning.main,
                mb: 1
              }}>
                {clusterSummary.warning}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('clusterManagement.warningDescription')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card 
            variant="outlined" 
            sx={{ 
              borderLeft: `4px solid ${theme.palette.error.main}`,
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[2]
              }
            }}
          >
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                {t('clusterManagement.errorState')}
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.error.main,
                mb: 1
              }}>
                {clusterSummary.error}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('clusterManagement.errorDescription')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Main Content Area */}
      <Paper 
        elevation={isMobile ? 0 : 2} 
        sx={{ 
          borderRadius: '8px',
          overflow: 'hidden',
          mb: 4,
          border: isMobile ? `1px solid ${theme.palette.divider}` : 'none'
        }}
      >
        {/* Custom Styled Tabs */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label={t('clusterManagement.tabsAriaLabel')}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: theme.palette.background.paper,
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: 3,
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              fontSize: '0.95rem',
              minHeight: 64,
              minWidth: 'unset',
              px: { xs: 1.5, md: 3 },
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                fontWeight: 'bold',
              },
              '& .MuiTab-iconWrapper': {
                mr: 1,
                mb: 0
              }
            }
          }}
        >
          <Tab 
            icon={<DashboardIcon />} 
            iconPosition="start" 
            label={t('clusterManagement.tabDashboard')}
          />
          <Tab 
            icon={<StorageIcon />} 
            iconPosition="start" 
            label={t('clusterManagement.tabManageClusters')}
          />
          <Tab 
            icon={<SearchIcon />} 
            iconPosition="start" 
            label={t('clusterManagement.tabFindHost')}
          />
          <Tab 
            icon={<ImageSearchIcon />} 
            iconPosition="start" 
            label={t('clusterManagement.tabSystemImages')}
          />
        </Tabs>
        
        {/* Tab Content */}
        <Box sx={{ 
          backgroundColor: theme.palette.background.default,
          minHeight: '400px'
        }}>
          <TabPanel value={tabValue} index={0}>
            <ClusterUtilities />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ClustersList />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <FindSuitableHost />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <SystemImagesManager />
          </TabPanel>
        </Box>
      </Paper>
      
      {/* Contextual Help */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          borderRadius: '8px',
          borderLeft: `4px solid ${theme.palette.info.main}`,
          backgroundColor: theme.palette.mode === 'dark' ? 
            theme.palette.info.dark + '08' : 
            theme.palette.info.light + '20'
        }}
      >
        <Typography variant="subtitle2" sx={{ 
          color: theme.palette.info.main, 
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <CodeIcon fontSize="small" />
          {t('clusterManagement.helpTitle')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('clusterManagement.helpText')}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ClusterManagementPage;