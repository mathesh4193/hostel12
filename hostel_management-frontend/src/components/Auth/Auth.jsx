import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Tab, Tabs, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

const Auth = () => {
  const [tab, setTab] = useState(0);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'staff',
    role: 'student'
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (tab === 0) { // Login
        const response = await authService.login({
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        
        if (formData.role === 'student') {
          navigate('/student-dashboard');
        } else {
          navigate('/warden-dashboard');
        }
      } else { // Signup
        await authService.signup(formData);
        setTab(0);
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'student'
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {tab === 0 ? 'Login' : 'Sign Up'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {tab === 1 && (
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                required
              />
            )}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              select
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="student">Student</option>
              <option value="warden">Warden</option>
            </TextField>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 3 }}
            >
              {tab === 0 ? 'Login' : 'Sign Up'}
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;