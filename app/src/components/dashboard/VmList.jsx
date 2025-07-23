import React, { useState } from 'react';
import { 
  Paper, Box, Typography, Button, CircularProgress, 
  Stack, IconButton, Menu, MenuItem, ListItemIcon, 
  ListItemText, Divider, Avatar, Chip, Grid, 
  useTheme, alpha
} from '@mui/material';
import { 
  Add as AddIcon, Refresh as RefreshIcon, MoreVert as MoreVertIcon, 
  PlayArrow as PlayIcon, Stop as StopIcon, Delete as DeleteIcon,
  Dns as DnsIcon, Computer as ComputerIcon, Memory as MemoryIcon,
  Storage as StorageIcon, PersonAdd as PersonAddIcon
} from '@mui/icons-material';


const VmItem = ({ vm, onAction, isAdmin, actionLoading, t }) => {
  const theme = useTheme();

  const getStatusColor = (status) => {
    const statusColors = {
      running: theme.palette.success.main,
      paused: theme.palette.warning.main,
      stopped: theme.palette.error.main,
      provisioning: theme.palette.info.main
    };
    return statusColors[status] || theme.palette.grey[500];
  };

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm={4}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar variant="rounded" sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main
            }}>
              <DnsIcon />
            </Avatar>
            <Box>
              {actionLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
                  <CircularProgress size={16} />
                </Box>
              )}
              <Typography variant="subtitle1" fontWeight={600}>
                {vm.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {vm.os}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Chip
            size="small"
            label={t(`dashboard.vms.status.${vm.status}`)}
            sx={{
              bgcolor: alpha(getStatusColor(vm.status), 0.1),
              color: getStatusColor(vm.status),
              fontWeight: 600,
              '& .MuiChip-label': { px: 1.5 }
            }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="body2" color="text.secondary">
            IP: <Typography component="span" variant="body2" fontWeight={600}>{vm.ip_address}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2} sx={{ textAlign: 'right' }}>
          <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
            {vm.status !== 'stopped' && (
              <IconButton disabled={actionLoading} size="small" color="error" onClick={() => onAction(vm.id, 'stop')}>
                <StopIcon fontSize="small" />
              </IconButton>
            )}
            {vm.status === 'stopped' && (
              <IconButton disabled={actionLoading} size="small" color="success" onClick={() => onAction(vm.id, 'start')}>
                <PlayIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

const VmList = ({ 
  vms, 
  onVmAction, 
  onRefresh, 
  onCreateVm, 
  isLoading, 
  isAdmin, 
  actionLoading,
  t 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVm, setSelectedVm] = useState(null);
  
  const handleOpenMenu = (event, vmId) => {
    setAnchorEl(event.currentTarget);
    setSelectedVm(vmId);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedVm(null);
  };
  
  const handleMenuAction = (action) => {
    onVmAction(selectedVm, action);
    handleCloseMenu();
  };

  const theme = useTheme();

  const getStatusColor = (status) => {
    const statusColors = {
      running: theme.palette.success.main,
      paused: theme.palette.warning.main,
      stopped: theme.palette.error.main,
      provisioning: theme.palette.info.main
    };
    return statusColors[status] || theme.palette.grey[500];
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          {isAdmin ? t('dashboard.vms.adminTitle') : t('dashboard.vms.title')}
        </Typography>
        
        <Stack direction="row" spacing={1}>
          <Button 
            size="small" 
            startIcon={<RefreshIcon />} 
            onClick={onRefresh}
            sx={{ minWidth: 'auto', px: 1 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={16} /> : t('dashboard.vms.refresh')}
          </Button>
          <Button 
            variant="contained" 
            size="small" 
            startIcon={<AddIcon />} 
            onClick={onCreateVm}
          >
            {t('dashboard.vms.createVm')}
          </Button>
        </Stack>
      </Box>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {vms.length > 0 ? (
            vms.map((vm) => (
              <VmItem 
                key={vm.id} 
                vm={vm} 
                onAction={onVmAction}
                onMenuOpen={handleOpenMenu}
                isAdmin={isAdmin}
                actionLoading={actionLoading}
                t={t}
              />
            ))
          ) : (
            <Box textAlign="center" py={3}>
              <Typography color="text.secondary">{t('dashboard.vms.noVms')}</Typography>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />} 
                sx={{ mt: 2 }} 
                onClick={onCreateVm}
              >
                {t('dashboard.vms.createFirstVm')}
              </Button>
            </Box>
          )}
        </Box>
      )}
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem dense onClick={() => handleMenuAction('viewDetails')}>
          <ListItemIcon><DnsIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('dashboard.vms.actions.viewDetails')}</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={() => handleMenuAction('console')}>
          <ListItemIcon><ComputerIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('dashboard.vms.actions.console')}</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={() => handleMenuAction('resize')}>
          <ListItemIcon><MemoryIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('dashboard.vms.actions.resize')}</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={() => handleMenuAction('backups')}>
          <ListItemIcon><StorageIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('dashboard.vms.actions.backups')}</ListItemText>
        </MenuItem>
        {isAdmin && (
          <MenuItem dense onClick={() => handleMenuAction('transferOwnership')}>
            <ListItemIcon><PersonAddIcon fontSize="small" /></ListItemIcon>
            <ListItemText>{t('dashboard.vms.actions.transferOwnership')}</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem dense onClick={() => handleMenuAction('delete')} sx={{ color: theme.palette.error.main }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>{t('dashboard.vms.actions.delete')}</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default VmList;