import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const VmInfoCard = ({ vm }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  if (!vm) return null;

  const mibToGib = (mib) => (mib / 1024).toFixed(1);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('vmConsole.information.vmInfo')}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('vmConsole.information.name')}:
            </Typography>
            <Typography variant="body2">{vm.name}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('vmConsole.information.os')}:
            </Typography>
            <Typography variant="body2">{vm.os_type}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('vmConsole.information.status')}:
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: vm.status === 'running' ? 
                  theme.palette.success.main : 
                  theme.palette.error.main 
              }}
            >
              {vm.status}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('vmConsole.information.cpuCores')}:
            </Typography>
            <Typography variant="body2">{vm.cpu_count}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('vmConsole.information.memory')}:
            </Typography>
            <Typography variant="body2">
              {mibToGib(vm.memory_size_mib)} GB
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('vmConsole.information.storage')}:
            </Typography>
            <Typography variant="body2">{vm.disk_size_gb} GB</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VmInfoCard;