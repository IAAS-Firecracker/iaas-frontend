import React, { useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ConsoleOutput = ({ 
  output, 
  loading, 
  active,
  showTimestamps = true
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const endRef = useRef(null);

  // Scroll to bottom when output changes
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%' 
      }}>
        <CircularProgress size={24} sx={{ mr: 2, color: 'white' }} />
        <Typography color="inherit">
          {t('vmConsole.console.connecting')}
        </Typography>
      </Box>
    );
  }

  if (!active) {
    return (
      <Typography color="inherit" sx={{ opacity: 0.7 }}>
        {t('vmConsole.console.notConnected')}
      </Typography>
    );
  }

  if (output.length === 0) {
    return (
      <Typography color="inherit">
        {t('vmConsole.console.connected')}
      </Typography>
    );
  }

  return (
    <Box sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
      {output.map((entry, index) => (
        <Box 
          key={index} 
          sx={{ 
            mb: 0.5,
            color: entry.isCommand ? theme.palette.success.light : 'inherit'
          }}
        >
          {showTimestamps && (
            <Box component="span" sx={{ opacity: 0.7, mr: 1 }}>
              [{formatTimestamp(entry.timestamp)}]
            </Box>
          )}
          {entry.message}
        </Box>
      ))}
      <div ref={endRef} />
    </Box>
  );
};

export default ConsoleOutput;