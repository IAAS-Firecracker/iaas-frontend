import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  titleKey,
  messageKey,
  messageValues = {},
  confirmButtonColor = 'primary',
  loading
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t(`vmActions.confirmations.${titleKey}`)}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(`vmActions.confirmations.${messageKey}`, messageValues)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {t('vmActions.confirmations.cancel')}
        </Button>
        <Button 
          onClick={onConfirm} 
          color={confirmButtonColor}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ mr: 1 }} /> : null}
          {t('vmActions.confirmations.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;