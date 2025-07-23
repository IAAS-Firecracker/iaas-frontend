import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  LinearProgress,
  Alert,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import  useUser  from '../../hooks/useUser';
import  useVmHost  from '../../hooks/useVmHost';
import ConsoleControls from './ConsoleControls';
import ConsoleOutput from './ConsoleOutput';
import ConsoleInput from './ConsoleInput';
import VmInfoCard from './VmInfoCard';
import ConnectionInfoCard from './ConnectionInfoCard';
import ConsoleHelpCard from './ConsoleHelpCard';

// Simulated console messages - replace with actual console data
const simulatedConsoleOutput = [
  { timestamp: '2025-05-16T10:00:00Z', message: 'Starting VM initialization...' },
  { timestamp: '2025-05-16T10:00:01Z', message: 'Loading kernel modules...' },
  { timestamp: '2025-05-16T10:00:03Z', message: 'Mounting virtual file systems...' },
  { timestamp: '2025-05-16T10:00:05Z', message: 'Starting system services...' },
  { timestamp: '2025-05-16T10:00:08Z', message: 'Network interfaces configured.' },
  { timestamp: '2025-05-16T10:00:10Z', message: 'System initialization complete.' },
  { timestamp: '2025-05-16T10:00:12Z', message: 'Welcome to your virtual machine!' },
];

const VmConsole = () => {
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const { 
    vms, 
    getUserVms, 
    getVmStatus,
    isLoading,
    error,
    clearErrors
  } = useVmHost();

  const [selectedVm, setSelectedVm] = useState('');
  const [selectedVmData, setSelectedVmData] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleActive, setConsoleActive] = useState(false);
  const [loadingConsole, setLoadingConsole] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Fetch VMs on component mount and when currentUser changes
  useEffect(() => {
    if (currentUser?.id) {
      fetchVms();
    }
  }, [currentUser]);

  const fetchVms = async () => {
    try {
      await getUserVms(currentUser.id);
    } catch (err) {
      console.error('Failed to fetch VMs:', err);
    }
  };

  // Auto-select first VM when vms change
  useEffect(() => {
    if (vms.length > 0 && !selectedVm) {
      setSelectedVm(vms[0].name);
      setSelectedVmData(vms[0]);
    }
  }, [vms]);

  const handleVmChange = (event) => {
    const vmName = event.target.value;
    setSelectedVm(vmName);
    
    const vmData = vms.find(vm => vm.name === vmName);
    setSelectedVmData(vmData);
    
    // Reset console when switching VMs
    setConsoleOutput([]);
    setConsoleActive(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleConnectConsole = async () => {
    if (!selectedVmData) return;
    
    setLoadingConsole(true);
    clearErrors();
    
    try {
      const statusResponse = await getVmStatus({
        vm_id: selectedVmData.id,
        user_id: currentUser.id
      });
      
      if (statusResponse.success && statusResponse.data.status === 'running') {
        // Simulate connection
        setTimeout(() => {
          setConsoleOutput(simulatedConsoleOutput);
          setConsoleActive(true);
          setLoadingConsole(false);
        }, 1500);
      } else {
        setLoadingConsole(false);
      }
    } catch (err) {
      console.error('Failed to connect to console:', err);
      setLoadingConsole(false);
    }
  };

  const handleDisconnectConsole = () => {
    setConsoleActive(false);
  };

  const handleSendCommand = () => {
    if (!consoleInput.trim() || !consoleActive) return;
    
    // Add command to console output
    const newOutput = [
      ...consoleOutput,
      { 
        timestamp: new Date().toISOString(), 
        message: `$ ${consoleInput}`,
        isCommand: true
      }
    ];
    
    setConsoleOutput(newOutput);
    
    // Simulate command response
    setTimeout(() => {
      let response;
      
      switch (consoleInput.trim().toLowerCase()) {
        case 'help':
          response = t('vmConsole.commands.availableCommands');
          break;
        case 'date':
          response = t('vmConsole.commands.currentDate', { date: new Date().toString() });
          break;
        case 'hostname':
          response = t('vmConsole.commands.hostnameResponse', { name: selectedVm });
          break;
        case 'uptime':
          response = t('vmConsole.commands.uptimeResponse');
          break;
        case 'ls':
          response = t('vmConsole.commands.lsResponse');
          break;
        case 'clear':
          setConsoleOutput([]);
          setConsoleInput('');
          return;
        default:
          response = t('vmConsole.commands.notFound', { command: consoleInput });
      }
      
      setConsoleOutput([
        ...newOutput,
        { timestamp: new Date().toISOString(), message: response }
      ]);
    }, 500);
    
    setConsoleInput('');
  };

  const handleConsoleInputChange = (e) => {
    setConsoleInput(e.target.value);
  };

  const handleConsoleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendCommand();
    }
  };

  const handleClearConsole = () => {
    setConsoleOutput([]);
  };

  const handleCopyConsole = () => {
    const text = consoleOutput.map(entry => {
      const date = new Date(entry.timestamp).toLocaleTimeString();
      return `[${date}] ${entry.message}`;
    }).join('\n');
    
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Failed to copy console output:', err);
    });
  };

  const handleDownloadConsole = () => {
    const text = consoleOutput.map(entry => {
      const date = new Date(entry.timestamp).toLocaleTimeString();
      return `[${date}] ${entry.message}`;
    }).join('\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `${selectedVm}-console-${new Date().toISOString().substr(0, 10)}.log`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      {/* VM Selector */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <FormControl fullWidth>
            <InputLabel id="vm-select-label">
              {t('vmConsole.selectVm')}
            </InputLabel>
            <Select
              labelId="vm-select-label"
              id="vm-select"
              value={selectedVm}
              label={t('vmConsole.selectVm')}
              onChange={handleVmChange}
              disabled={isLoading || vms.length === 0}
            >
              {vms.map((vm) => (
                <MenuItem key={vm.name} value={vm.name}>
                  {vm.name} ({vm.ip_address}) ({vm.status})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={fetchVms}
            disabled={isLoading}
            fullWidth
            sx={{ height: '100%' }}
          >
            {t('vmConsole.refreshVms')}
          </Button>
        </Grid>
      </Grid>
      
      {/* Loading Indicator */}
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}
      
      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearErrors}>
          {error}
        </Alert>
      )}
      
      {/* No Running VMs Message */}
      {!isLoading && vms.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body1">
            {t('vmConsole.noRunningVms')}
          </Typography>
          <Typography variant="body2">
            {t('vmConsole.startVmToAccess')}
          </Typography>
        </Alert>
      )}
      
      {/* VM Console Tabs */}
      {selectedVmData && (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label={t('vmConsole.tabs.ariaLabel')}
            >
              <Tab 
                icon={<TerminalIcon />} 
                iconPosition="start" 
                label={t('vmConsole.tabs.console')} 
              />
              <Tab 
                icon={<CodeIcon />} 
                iconPosition="start" 
                label={t('vmConsole.tabs.information')} 
              />
            </Tabs>
          </Box>
          
          {/* Console Tab */}
          <Box role="tabpanel" hidden={tabValue !== 0} id="console-tab">
            {tabValue === 0 && (
              <Box>
                <ConsoleControls
                  active={consoleActive}
                  loading={loadingConsole}
                  outputEmpty={consoleOutput.length === 0}
                  onConnect={handleConnectConsole}
                  onDisconnect={handleDisconnectConsole}
                  onClear={handleClearConsole}
                  onCopy={handleCopyConsole}
                  onDownload={handleDownloadConsole}
                />
                
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    bgcolor: '#1e1e1e', 
                    color: '#f0f0f0',
                    height: 400,
                    overflowY: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    mb: 2
                  }}
                >
                  <ConsoleOutput 
                    output={consoleOutput} 
                    loading={loadingConsole} 
                    active={consoleActive}
                  />
                </Paper>
                
                <ConsoleInput
                  value={consoleInput}
                  onChange={handleConsoleInputChange}
                  onSend={handleSendCommand}
                  onKeyPress={handleConsoleInputKeyPress}
                  disabled={!consoleActive}
                  showHelp={consoleActive}
                />
              </Box>
            )}
          </Box>
          
          {/* Information Tab */}
          <Box role="tabpanel" hidden={tabValue !== 1} id="information-tab">
            {tabValue === 1 && (
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <VmInfoCard vm={selectedVmData} />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <ConnectionInfoCard vm={selectedVmData} />
                </Grid>
                
                <Grid item xs={12}>
                  <ConsoleHelpCard />
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VmConsole;