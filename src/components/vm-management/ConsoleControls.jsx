import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Terminal as TerminalIcon,
  ClearAll as ClearIcon,
  ContentCopy as CopyIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ConsoleControls = ({ 
  active, 
  loading, 
  outputEmpty,
  onConnect, 
  onDisconnect,
  onClear,
  onCopy,
  onDownload
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
      <Box>
        {!active ? (
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<TerminalIcon />}
            onClick={onConnect}
            disabled={loading}
          >
            {loading ? t('vmConsole.console.connecting') : t('vmConsole.console.connect')}
          </Button>
        ) : (
          <Button 
            variant="outlined" 
            color="error"
            onClick={onDisconnect}
          >
            {t('vmConsole.console.disconnect')}
          </Button>
        )}
      </Box>
      
      <Box>
        <Tooltip title={t('vmConsole.console.clear')}>
          <IconButton 
            onClick={onClear}
            disabled={!active || outputEmpty}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title={t('vmConsole.console.copy')}>
          <IconButton 
            onClick={onCopy}
            disabled={!active || outputEmpty}
          >
            <CopyIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title={t('vmConsole.console.download')}>
          <IconButton 
            onClick={onDownload}
            disabled={!active || outputEmpty}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ConsoleControls;