import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/about':
        return 'About VCET Hostel';
      case '/complaints':
        return 'Complaints';
      case '/attendance':
        return 'Attendance';
      case '/student-dashboard':
        return 'Dashboard';
      case '/student-dashboard/leave':
        return 'Leave Management';
      case '/student-dashboard/mess':
        return 'Mess Menu';
      case '/student-dashboard/room':
        return 'Room Allocation';
      case '/student-dashboard/security':
        return 'Security';
      case '/outpass':
        return 'Out Pass';
      default:
        return 'VCET Hostel';
    }
  };

  return (
    <Navbar fixed="top" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand className="mx-auto">
          <h2 className="mb-0">{getPageTitle()}</h2>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;