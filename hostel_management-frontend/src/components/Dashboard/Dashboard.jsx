import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Room Status</Typography>
              <Typography variant="body2">Total Rooms: 100</Typography>
              <Typography variant="body2">Occupied: 75</Typography>
              <Typography variant="body2">Available: 25</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Fee Status</Typography>
              <Typography variant="body2">Paid: 50</Typography>
              <Typography variant="body2">Pending: 25</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Leave Requests</Typography>
              <Typography variant="body2">Pending: 10</Typography>
              <Typography variant="body2">Approved: 15</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;