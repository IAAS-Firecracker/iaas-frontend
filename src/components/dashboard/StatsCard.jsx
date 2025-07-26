import React from 'react';
import { Paper, Box, Typography, Avatar, Stack, Chip } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

const StatsCard = ({ title, value, icon, color, secondaryValue, change }) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="text.secondary" variant="subtitle2" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {value}
          </Typography>
          
          {secondaryValue && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {secondaryValue}
              </Typography>
              {change && (
                <Chip 
                  size="small" 
                  icon={change.icon} 
                  label={change.label} 
                  color={change.color}
                  sx={{ height: 20, '& .MuiChip-label': { px: 1, py: 0.5 } }}
                />
              )}
            </Stack>
          )}
        </Box>
        
        <Avatar 
          sx={{ 
            bgcolor: alpha(color, 0.1), 
            color: color,
            width: 48,
            height: 48
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </Paper>
  );
};

export default StatsCard;