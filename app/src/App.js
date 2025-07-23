// src/App.jsx
import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import theme from './theme';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import AppRoutes from './routes'; // Make sure this path is correct
import { CircularProgress, Box } from '@mui/material';


// Loading component for PersistGate
const PersistLoading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}
  >
    <CircularProgress />
  </Box>
);

const App = () => {
  useEffect(() => {
    console.log('🚀 App mounted');

    // Listen to persistor events
    const unsubscribe = persistor.subscribe(() => {
      console.log('📦 Persistor state updated');
    });

    return () => unsubscribe();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={<PersistLoading />} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <AuthDebugger /> */}
            <AppRoutes />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
};

export default App;