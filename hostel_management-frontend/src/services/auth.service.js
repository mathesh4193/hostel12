import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const authService = {
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
  signup: (userData) => axios.post(`${API_URL}/signup`, userData)
};