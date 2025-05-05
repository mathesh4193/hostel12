import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Paper,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './Dashboard.css';

const WardenDashboard = () => {
  const navigate = useNavigate();
  const [wardenName] = useState('');
  
  React.useEffect(() => {
    // Update this check to match the auth token from SignIn
    const wardenAuth = localStorage.getItem('role') === 'warden' && localStorage.getItem('token');
    if (!wardenAuth) {
      navigate('/');
    }
  }, [navigate]);
  const [open, setOpen] = useState(true);

  const sidebarItems = [
    { title: 'Dashboard Overview', icon: <DashboardIcon />, path: '/warden-dashboard' },
    { title: 'Student Management', icon: <PeopleIcon />, path: '/warden/students' },
    { title: 'Leave Requests', icon: <AssignmentIcon />, path: '/warden/leave-requests' },
    { title: 'Complaints', icon: <ReportProblemIcon />, path: '/warden/complaints' },
    { title: 'Outpass Requests', icon: <ExitToAppIcon />, path: '/warden/outpass' },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          left: open ? '240px' : '65px',
          top: '10px',
          zIndex: 1200,
          backgroundColor: '#2c387e',
          color: 'white',
          '&:hover': {
            backgroundColor: '#3f51b5',
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 65,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 65,
            boxSizing: 'border-box',
            backgroundColor: '#2c387e',
            color: 'white',
            overflowX: 'hidden',
            transition: 'width 0.3s'
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <img src="/Vcet_logo.jpg" alt="VCET Logo" style={{ height: '40px' }} />
          {open && (
            <>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Warden Portal
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, fontStyle: 'italic' }}>
                Welcome, {wardenName}
              </Typography>
            </>
          )}
        </Box>
        <List>
          {sidebarItems.map((item) => (
            <ListItem 
              button 
              key={item.title}
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: '#fff',
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.title} />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3, 
        ml: open ? '240px' : '65px',
        transition: 'margin-left 0.3s'
      }}>
        <Typography variant="h4" sx={{ mb: 4, color: '#2c387e' }}>
          Welcome back, {wardenName}!
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#2c387e',
                color: 'white',
                borderRadius: 2,
                height: '140px'
              }}
            >
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h3">250</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#3949ab',
                color: 'white',
                borderRadius: 2,
                height: '140px'
              }}
            >
              <Typography variant="h6">Pending Leaves</Typography>
              <Typography variant="h3">15</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#1e88e5',
                color: 'white',
                borderRadius: 2,
                height: '140px'
              }}
            >
              <Typography variant="h6">Active Complaints</Typography>
              <Typography variant="h3">8</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#0277bd',
                color: 'white',
                borderRadius: 2,
                height: '140px'
              }}
            >
              <Typography variant="h6">Rooms Occupied</Typography>
              <Typography variant="h3">180</Typography>
            </Paper>
          </Grid>

          {/* Action Cards */}
          {sidebarItems.slice(1).map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <Paper 
                elevation={3}
                onClick={() => navigate(item.path)}
                sx={{
                  bgcolor: '#2c387e',
                  color: 'white',
                  p: 3,
                  textAlign: 'center',
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    bgcolor: '#3f51b5'
                  }
                }}
              >
                <Box sx={{ color: '#fff', fontSize: '2.5rem' }}>
                  {item.icon}
                </Box>
                <Typography variant="h6">
                  {item.title}
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{
                    bgcolor: '#fff',
                    color: '#2c387e',
                    '&:hover': {
                      bgcolor: '#e0e0e0'
                    }
                  }}
                >
                  MANAGE
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default WardenDashboard;
