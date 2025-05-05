import React from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Mess = () => {
  const messSchedule = {
    Monday: {
      breakfast: 'Idli, Sambar, Chutney',
      lunch: 'Rice, Dal, Vegetables',
      dinner: 'Chapati, Curry, Rice'
    },
    Tuesday: {
      breakfast: 'Dosa, Chutney',
      lunch: 'Rice, Sambar, Curd',
      dinner: 'Pulao, Raita'
    },
    // Add more days...
  };

  return (
    <Container className="mess-container">
      <Typography variant="h4" gutterBottom>
        Mess Schedule
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Breakfast</TableCell>
              <TableCell>Lunch</TableCell>
              <TableCell>Dinner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(messSchedule).map(([day, meals]) => (
              <TableRow key={day}>
                <TableCell>{day}</TableCell>
                <TableCell>{meals.breakfast}</TableCell>
                <TableCell>{meals.lunch}</TableCell>
                <TableCell>{meals.dinner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Mess;