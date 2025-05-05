import React, { useRef } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import './Home.css';
// Remove the unused BootstrapButton import
import Footer from '../Layout/Footer';

const Home = () => {
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const heroRef = useRef(null);

  // Remove unused scrollToSection function

  const handleFeatureClick = (feature) => {
    const isLoggedIn = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    const publicFeatures = ['about', 'complaint', 'attendance'];
    
    if (feature === 'mess' && userRole !== 'warden') {
      alert('Mess menu can only be accessed by wardens');
      return;
    }

    // Redirect based on user role for dashboard
    if (feature === 'dashboard') {
      if (userRole === 'warden') {
        navigate('/warden/dashboard');
        return;
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
        return;
      }
      // Default to student dashboard if role is student or not specified
    }

    if (!isLoggedIn && !publicFeatures.includes(feature)) {
      navigate('/login', { state: { from: feature } });
      return;
    }

    const navigationPaths = {
      about: '/about',
      leave: '/student-dashboard/leave',
      complaint: '/complaints',
      mess: '/student-dashboard/mess',
      room: '/student-dashboard/room',
      security: '/student-dashboard/security',
      dashboard: '/student/dashboard', // Default student dashboard path
      outpass: '/student-dashboard/outpass',
      attendance: '/attendance'
    };

    if (navigationPaths[feature]) {
      navigate(navigationPaths[feature]);
    }
  };

  return (
    <>
      <Container className="home-container">
        {/* Hero section */}
        <Box className="hero-section" ref={heroRef}>
          <Typography variant="h2">
            VCET Hostel 
          </Typography>
          <Typography variant="h5">
            Managing Student Accommodation with Excellence
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </Box>

        {/* Features section */}
        <Box className="features-section" ref={featuresRef}>
          <Typography variant="h3">Features</Typography>
          <div className="features-grid">
            {/* Feature cards */}
            <div className="feature-card" onClick={() => handleFeatureClick('about')}>
              <AssignmentIcon className="feature-icon" />
              <Typography variant="h6">About Us</Typography>
              <Typography>Learn more about our hostel</Typography>
            </div>

            <div className="feature-card" onClick={() => handleFeatureClick('leave')}>
              <AssignmentIcon className="feature-icon" />
              <Typography variant="h6">Leave Management</Typography>
              <Typography>Easy leave application process</Typography>
            </div>

            <div className="feature-card" onClick={() => handleFeatureClick('complaint')}>
              <ReportProblemIcon className="feature-icon" />
              <Typography variant="h6">Complaints</Typography>
              <Typography>Submit and track complaints</Typography>
            </div>
            
            <div className="feature-card" onClick={() => handleFeatureClick('mess')}>
              <RestaurantMenuIcon className="feature-icon" />
              <Typography variant="h6">Mess Menu</Typography>
              <Typography>View daily menu</Typography>
            </div>

            <div className="feature-card" onClick={() => handleFeatureClick('room')}>
              <MeetingRoomIcon className="feature-icon" />
              <Typography variant="h6">Room Allocation</Typography>
              <Typography>Room details and requests</Typography>
            </div>

            <div className="feature-card" onClick={() => handleFeatureClick('security')}>
              <SecurityIcon className="feature-icon" />
              <Typography variant="h6">Security</Typography>
              <Typography>Campus security information</Typography>
            </div>

            <div className="feature-card" onClick={() => handleFeatureClick('dashboard')}>
              <DashboardIcon className="feature-icon" />
              <Typography variant="h6">Dashboard</Typography>
              <Typography>Access your dashboard</Typography>
            </div>

            <div className="feature-card" onClick={() => handleFeatureClick('outpass')}>
              <ExitToAppIcon className="feature-icon" />
              <Typography variant="h6">Out Pass</Typography>
              <Typography>Request out pass</Typography>
            </div>
            
            <div className="feature-card" onClick={() => handleFeatureClick('attendance')}>
              <EventAvailableIcon className="feature-icon" />
              <Typography variant="h6">Attendance</Typography>
              <Typography>Track daily attendance</Typography>
            </div>
          </div>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
