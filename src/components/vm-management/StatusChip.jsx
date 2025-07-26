import React from 'react';
import { Chip } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const StatusChip = ({ status }) => {
  const { t } = useTranslation();
  
  const statusConfig = {
    running: {
      color: 'success',
      icon: <CheckCircleIcon />,
      label: t('vmActions.status.running')
    },
    stopped: {
      color: 'warning',
      icon: <WarningIcon />,
      label: t('vmActions.status.stopped')
    },
    error: {
      color: 'error',
      icon: <ErrorIcon />,
      label: t('vmActions.status.error')
    },
    default: {
      color: 'default',
      icon: <InfoIcon />,
      label: status
    }
  };

  const config = statusConfig[status] || statusConfig.default;

  return (
    <Chip 
      label={config.label}
      color={config.color}
      size="small"
      icon={config.icon}
    />
  );
};

export default StatusChip;