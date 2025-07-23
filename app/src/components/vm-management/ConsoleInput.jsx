import React from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ConsoleInput = ({ 
  value, 
  onChange, 
  onSend, 
  onKeyPress, 
  disabled,
  showHelp = false
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={disabled ? t('vmConsole.console.notConnected') : t('vmConsole.console.typeCommands')}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: theme.palette.success.main }}>
                $
              </InputAdornment>
            ),
            sx: {
              fontFamily: 'monospace'
            }
          }}
        />
        
        <Tooltip title={t('vmConsole.console.sendCommand')}>
          <IconButton 
            color="primary" 
            onClick={onSend}
            disabled={disabled || !value.trim()}
            sx={{ ml: 1 }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      {showHelp && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {t('vmConsole.console.helpTip')}
        </Typography>
      )}
    </Box>
  );
};

export default ConsoleInput;