import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hostel Management System
        </Typography>
        {isLoggedIn && (
          <Box>
            {role === 'student' && (
              <>
                <Button color="inherit" component={Link} to="/student-dashboard">Dashboard</Button>
                <Button color="inherit" component={Link} to="/rooms">Room</Button>
              </>
            )}
            {role === 'warden' && (
              <>
                <Button color="inherit" component={Link} to="/warden-dashboard">Dashboard</Button>
                <Button color="inherit" component={Link} to="/rooms">Rooms</Button>
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;