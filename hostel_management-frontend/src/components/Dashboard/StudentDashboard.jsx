import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentName = localStorage.getItem('userName') || 'Student';

  const menuItems = [
    { title: 'Leave Application', path: '/student-dashboard/leave', icon: '📝' },
    { title: 'Outpass', path: '/student-dashboard/outpass', icon: '🚪' },
    { title: 'Complaints', path: '/complaints', icon: '⚠️' },
    { title: 'Attendance', path: '/attendance', icon: '📊' }
  ];

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Welcome, {studentName}!</h2>

      <Row className="g-4">
        {menuItems.map((item, index) => (
          <Col key={index} md={6} lg={3}>
            <Card 
              className="h-100 text-center hover-card"
              onClick={() => navigate(item.path)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <div className="display-4 mb-3">{item.icon}</div>
                <Card.Title>{item.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              Recent Leave Applications
            </Card.Header>
            <Card.Body>
              <p>No recent applications</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header className="bg-primary text-white">
              Recent Complaints
            </Card.Header>
            <Card.Body>
              <p>No recent complaints</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;