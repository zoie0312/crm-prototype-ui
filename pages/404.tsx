import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The page you are looking for does not exist.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Current path: {router.asPath}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => router.push('/')}>
            Go to Home Page
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 