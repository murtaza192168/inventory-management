import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      <Box component="form" width="300px">
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          type="password"
          variant="outlined"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Login
        </Button>
      </Box>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Don't have an account? <a href="/signup">Sign Up</a>
      </Typography>
    </Box>
  );
};

export default Login;
