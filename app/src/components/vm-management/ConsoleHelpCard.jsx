import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Alert,
  Grid
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const ConsoleHelpCard = () => {
  const { t } = useTranslation();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('vmConsole.information.consoleHelp')}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="body2" paragraph>
          {t('vmConsole.information.consoleDescription')}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              {t('vmConsole.information.basicCommands')}
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li>
                <Typography variant="body2">
                  <strong>help</strong> - {t('vmConsole.commands.help')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>date</strong> - {t('vmConsole.commands.date')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>hostname</strong> - {t('vmConsole.commands.hostname')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>uptime</strong> - {t('vmConsole.commands.uptime')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>ls</strong> - {t('vmConsole.commands.ls')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>clear</strong> - {t('vmConsole.commands.clear')}
                </Typography>
              </li>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              {t('vmConsole.information.consoleControls')}
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li>
                <Typography variant="body2">
                  <strong>{t('vmConsole.console.connect')}/{t('vmConsole.console.disconnect')}</strong> - {t('vmConsole.commands.connectDisconnect')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>{t('vmConsole.console.clear')}</strong> - {t('vmConsole.commands.clearConsole')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>{t('vmConsole.console.copy')}</strong> - {t('vmConsole.commands.copyOutput')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>{t('vmConsole.console.download')}</strong> - {t('vmConsole.commands.downloadLog')}
                </Typography>
              </li>
            </Box>
          </Grid>
        </Grid>
        
        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="body2">
            {t('vmConsole.information.simulationNote')}
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ConsoleHelpCard;