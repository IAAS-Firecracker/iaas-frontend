import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const ConnectionInfoCard = ({ vm }) => {
  const { t } = useTranslation();

  if (!vm) return null;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('vmConsole.information.connectionInfo')}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('vmConsole.information.ipAddress')}:
            </Typography>
            <Typography variant="body2">
              {vm.vm_ip || t('vmConsole.information.notAssigned')}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('vmConsole.information.macAddress')}:
            </Typography>
            <Typography variant="body2">
              {vm.vm_mac || t('vmConsole.information.notAssigned')}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('vmConsole.information.username')}:
            </Typography>
            <Typography variant="body2">
              {vm.os_type === 'linux' ? 'root' : 'Administrator'}
            </Typography>
          </Box>
          
          <Alert severity="info" sx={{ mt: 1 }}>
            <Typography variant="body2">
              {t('vmConsole.information.remoteAccessTip')}
            </Typography>
          </Alert>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConnectionInfoCard;