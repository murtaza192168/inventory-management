import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Signup = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Admin Signup
      </Typography>
      <Box component="form" width="300px">
        <TextField
          fullWidth
          label="Business Name"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Admin Email"
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
          Sign Up
        </Button>
      </Box>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Already have an account? <a href="/">Login</a>
      </Typography>
    </Box>
  );
};

export default Signup;
