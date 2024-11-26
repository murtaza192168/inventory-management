import {useState, useEffect, React} from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {

    const [email, setEmail] = useState(''); // State to store email
  const [password, setPassword] = useState(''); // State to store password
  const [error, setError] = useState(''); // State to store error messages

  // Function to handle login API call
  const handleLogin = async () => {
    try {
      // Make a POST request to the login API
      const response = await fetch('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Save the JWT token in localStorage
      alert('Login successful'); // Notify user of success
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred'); // Set error message
    }
  };

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
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
          onClick={handleLogin}
        >
          Login
        </Button>
        {/* Display error message */}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Don't have an account? <a href="/signup">Sign Up</a>
      </Typography>
    </Box>
  );
};

export default Login;
