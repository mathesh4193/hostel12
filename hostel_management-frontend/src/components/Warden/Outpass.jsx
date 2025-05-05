import React, { useState } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const Outpass = () => {
  const [outpasses, setOutpasses] = useState([
    { 
      id: 1, 
      studentName: 'John Doe', 
      roomNo: '101', 
      destination: 'Home', 
      purpose: 'Weekend visit',
      departureTime: '2024-01-20 10:00 AM',
      returnTime: '2024-01-22 06:00 PM',
      status: 'Pending'
    },
    // Add more sample data as needed
  ]);

  const handleApprove = (id) => {
    setOutpasses(outpasses.map(outpass => 
      outpass.id === id ? {...outpass, status: 'Approved'} : outpass
    ));
  };

  const handleReject = (id) => {
    setOutpasses(outpasses.map(outpass => 
      outpass.id === id ? {...outpass, status: 'Rejected'} : outpass
    ));
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Outpass Requests</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Room No</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Return Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {outpasses.map((outpass) => (
              <TableRow key={outpass.id}>
                <TableCell>{outpass.studentName}</TableCell>
                <TableCell>{outpass.roomNo}</TableCell>
                <TableCell>{outpass.destination}</TableCell>
                <TableCell>{outpass.purpose}</TableCell>
                <TableCell>{outpass.departureTime}</TableCell>
                <TableCell>{outpass.returnTime}</TableCell>
                <TableCell>{outpass.status}</TableCell>
                <TableCell>
                  {outpass.status === 'Pending' && (
                    <>
                      <Button 
                        variant="contained" 
                        color="success" 
                        size="small" 
                        onClick={() => handleApprove(outpass.id)}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="contained" 
                        color="error" 
                        size="small" 
                        onClick={() => handleReject(outpass.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Outpass;