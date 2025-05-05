import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="/Vcet_logo.jpg" alt="VCET Logo" height="30" className="me-2" />
            Hostel Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              {isLoggedIn && userRole === 'student' && (
                <>
                  <Nav.Link as={Link} to="/student/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/complaints">Complaints</Nav.Link>
                  <Nav.Link as={Link} to="/attendance">Attendance</Nav.Link>
                </>
              )}
              {isLoggedIn && userRole === 'warden' && (
                <Nav.Link as={Link} to="/warden/dashboard">Dashboard</Nav.Link>
              )}
            </Nav>
            <Nav>
              {!isLoggedIn ? (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              ) : (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main style={{ marginTop: '76px' }}>{children}</main>
    </div>
  );
};

export default Layout;