import React, { useState } from 'react'; // Import React and useState for state management
import { TextField, Button, Box, Typography } from '@mui/material';

const Signup = () => {

    // State variables for form fields
    const [businessName, setBusinessName] = useState(''); // State for storing the business name
    const [email, setEmail] = useState(''); // State for storing the email
    const [password, setPassword] = useState(''); // State for storing the password
    const [error, setError] = useState(''); // State for error messages
    const [success, setSuccess] = useState(''); // State for success messages
  
    // Function to handle signup API call
    const handleSignup = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST', // Specify the HTTP method
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
          },
          body: JSON.stringify({ businessName, email, password }), // Send data as JSON
        });
    
        if (!response.ok) {
          // If response is not OK, throw an error
          const errorData = await response.json();
          throw new Error(errorData.message || 'Signup failed');
        }
    
        const data = await response.json(); // Parse the response JSON
        setSuccess(data.message); // Display success message
        setError(''); // Clear any previous error messages
      } catch (error) {
        setError(error.message); // Set error message
        setSuccess(''); // Clear success message
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
        Admin Signup
      </Typography>
      <Box component="form" width="300px">
        <TextField
          fullWidth
          label="Business Name"
          margin="normal"
          variant="outlined"
          onChange={(e) => setBusinessName(e.target.value)}

        />
        <TextField
          fullWidth
          label="Admin Email"
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
          onClick={handleSignup}
        >
          Sign Up
        </Button>
          {/* Display success message */}
          {success && <Typography color="success.main" style={{ marginTop: '16px' }}>{success}</Typography>}
        {/* Display error message */}
        {error && <Typography color="error" style={{ marginTop: '16px' }}>{error}</Typography>}
      </Box>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Already have an account? <a href="/">Login</a>
      </Typography>
    </Box>
  );
};

export default Signup;
