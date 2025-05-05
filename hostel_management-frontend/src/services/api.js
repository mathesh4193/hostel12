import axios from 'axios';

const API_URL = 'http://localhost:5000/api';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const roomService = {
  getAllRooms: () => api.get('/rooms'),
  allocateRoom: (data) => api.post('/room-allocation', data),
  getRoomAllocations: () => api.get('/room-allocation')
};

export const feeService = {
  getFees: () => api.get('/fees'),
  payFee: (data) => api.post('/fees', data)
};

export const leaveService = {
  getLeaves: () => api.get('/leave'),
  applyLeave: (data) => api.post('/leave', data)
};

export default api;