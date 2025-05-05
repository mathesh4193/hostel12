import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { roomService } from '../../services/api';

const RoomAllocation = () => {
  const [allocations, setAllocations] = useState([]);
  const [formData, setFormData] = useState({
    student: '',
    room: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    try {
      const response = await roomService.getRoomAllocations();
      setAllocations(response.data);
    } catch (error) {
      console.error('Error fetching allocations:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await roomService.allocateRoom(formData);
      fetchAllocations();
      setFormData({
        student: '',
        room: '',
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      console.error('Error allocating room:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Room Allocation
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Student ID"
            name="student"
            value={formData.student}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Room Number"
            name="room"
            value={formData.room}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            type="date"
            label="End Date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            sx={{ mt: 2 }}
          >
            Allocate Room
          </Button>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allocations.map((allocation) => (
              <TableRow key={allocation._id}>
                <TableCell>{allocation.student}</TableCell>
                <TableCell>{allocation.room}</TableCell>
                <TableCell>{new Date(allocation.startDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {allocation.endDate ? new Date(allocation.endDate).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell>{allocation.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RoomAllocation;