// src/pages/SignupPage.jsx
import React from 'react';
import { Container, Box } from '@mui/material';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SignupForm />
      </Box>
    </Container>
  );
};

export default SignupPage;
