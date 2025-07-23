import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  useTheme,
  Container
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import VmActions from '../components/vm-management/VmActions';
import VmConsole from '../components/vm-management/VmConsole';
import FindSuitableHost from '../components/cluster/FindSuitableHost';
import useUser from '../hooks/useUser';
import useVmHost from '../hooks/useVmHost';

const VmManagement = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  
  // Get current user and check permissions
  const { currentUser } = useUser();
  const {  getUserVms } = useVmHost();

  // Refresh VMs when switching to manage tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 0 && currentUser?.id) {
      getUserVms(currentUser.id);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('vmManagement.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('vmManagement.description')}
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={t('vmManagement.tabs.manage')} />
          <Tab label={t('vmManagement.tabs.console')} />
          <Tab label={t('vmManagement.tabs.create')} />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box>
        {activeTab === 0 && (
          <Paper sx={{ p: 3 }}>
            <VmActions />
          </Paper>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 3 }}>
            <VmConsole />
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3 }}>
            <FindSuitableHost />
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default VmManagement;