import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState({
    totalStudents: 0,
    totalWardens: 0,
    pendingComplaints: 0,
    pendingLeaves: 0
  });

  useEffect(() => {
    // Fetch admin dashboard data
    const fetchAdminData = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await axios.get('/api/admin/dashboard');
        // setAdminData(response.data);
        
        // Using mock data for now
        setAdminData({
          totalStudents: 250,
          totalWardens: 5,
          pendingComplaints: 12,
          pendingLeaves: 8
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e3f2fd'
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Total Students
            </Typography>
            <Typography component="p" variant="h4">
              {adminData.totalStudents}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e8f5e9'
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Total Wardens
            </Typography>
            <Typography component="p" variant="h4">
              {adminData.totalWardens}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#fff8e1'
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Pending Complaints
            </Typography>
            <Typography component="p" variant="h4">
              {adminData.pendingComplaints}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#ffebee'
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Pending Leaves
            </Typography>
            <Typography component="p" variant="h4">
              {adminData.pendingLeaves}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Admin Actions
        </Typography>
        {/* Add admin action buttons or links here */}
      </Box>
    </Container>
  );
};

export default AdminDashboard;