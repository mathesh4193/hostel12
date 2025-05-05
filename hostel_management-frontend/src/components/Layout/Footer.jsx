import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  
  // Hide footer on dashboard pages
  const isDashboardPage = location.pathname.includes('dashboard');
  if (isDashboardPage) return null;
  return (
    <Box className="footer" sx={{ py: 2 }}> {/* Reduced padding */}
      <Container maxWidth="lg">
        <Grid container spacing={2}> {/* Reduced grid spacing */}
          <Grid item xs={12} md={4}>
            <img src="/Vcet_logo.jpg" alt="VCET Logo" className="footer-logo" />
            <Typography variant="subtitle1">VCET Hostel</Typography> {/* Smaller text */}
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}> {/* Smaller text */}
              Velammal College of Engineering and Technology - Madurai
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1">Quick Links</Typography> {/* Smaller text */}
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><a href="https://vcet.ac.in/vcetit/hostel.html" target="_top">VCET HOSTEL</a></li>
            </ul>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1">Contact Information</Typography> {/* Smaller text */}
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}> {/* Smaller text */}
              Velammal Nagar Viraganoor - Madurai 625009<br />
              <a href="mailto:principal@vcet.ac.in">principal@vcet.ac.in</a><br />
              <a href="tel:9994994991">99949-94991</a><br />
              <a href="https://www.vcet.ac.in" target="_top">www.vcet.ac.in</a>
            </Typography>
          </Grid>
        </Grid>
        
        <Box className="footer-bottom" sx={{ pt: 1 }}> {/* Reduced top padding */}
          <Typography variant="body2" sx={{ fontSize: '0.75rem' }}> {/* Smaller text */}
            © 2025 VCET Hostel . All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.75rem' }}> {/* Smaller text */}
            Designed and Developed by CSE.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;