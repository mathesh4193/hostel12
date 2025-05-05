// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Update this if your server runs on a different port

// Login with real backend
export const login = async (userId, password, role) => {
  try {
    console.log('Login attempt:', { userId, role }); // Don't log passwords
    const response = await axios.post(`${API_URL}/login`, {
      userId,
      password,
      role
    });

    const { token, user } = response.data;

    // Save token and user info in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    localStorage.setItem('userId', user.userId);

    return { token, user };
  } catch (error) {
    console.error('Login error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(
      error.response?.data?.message || 'Login failed. Please try again.'
    );
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Get current user role
export const getUserRole = () => {
  return localStorage.getItem('role');
};
