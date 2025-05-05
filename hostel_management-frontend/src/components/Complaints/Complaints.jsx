import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert, Table, Badge } from 'react-bootstrap';

const Complaints = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    roomNumber: ''
  });
  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, message: '', variant: '' });
  
  // Mock data for previous complaints
  const [complaints, setComplaints] = useState([
    { id: 1, category: 'Maintenance', subject: 'Leaking Tap', description: 'The tap in my bathroom is leaking continuously.', roomNumber: 'A-101', status: 'pending', date: '2023-03-15' },
    { id: 2, category: 'Electrical', subject: 'Power Outage', description: 'No electricity in my room since yesterday evening.', roomNumber: 'A-101', status: 'resolved', date: '2023-03-10' },
    { id: 3, category: 'Furniture', subject: 'Broken Chair', description: 'One of the chairs in my room is broken and needs replacement.', roomNumber: 'A-101', status: 'in-progress', date: '2023-03-05' },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Create new complaint object
    const newComplaint = {
      id: complaints.length + 1,
      ...formData,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };

    // Add to complaints list
    setComplaints([newComplaint, ...complaints]);
    
    // Show success message
    setSubmitStatus({
      show: true,
      message: 'Complaint submitted successfully!',
      variant: 'success'
    });

    // Reset form
    setFormData({
      category: '',
      subject: '',
      description: '',
      roomNumber: ''
    });
    setValidated(false);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSubmitStatus({ show: false, message: '', variant: '' });
    }, 3000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'in-progress':
        return <Badge bg="info">In Progress</Badge>;
      case 'resolved':
        return <Badge bg="success">Resolved</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Complaints Management</h4>
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <Row>
              <Col>
                <div className="d-flex">
                  <Button 
                    variant={activeTab === 'new' ? 'primary' : 'outline-primary'} 
                    className="me-2"
                    onClick={() => setActiveTab('new')}
                  >
                    New Complaint
                  </Button>
                  <Button 
                    variant={activeTab === 'history' ? 'primary' : 'outline-primary'} 
                    onClick={() => setActiveTab('history')}
                  >
                    Complaint History
                  </Button>
                </div>
              </Col>
            </Row>
          </div>

          {activeTab === 'new' ? (
            <>
              {submitStatus.show && (
                <Alert variant={submitStatus.variant} dismissible onClose={() => setSubmitStatus({ show: false, message: '', variant: '' })}>
                  {submitStatus.message}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="category">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        required
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Cleanliness">Cleanliness</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a category.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="roomNumber">
                      <Form.Label>Room Number</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="roomNumber"
                        placeholder="Enter your room number"
                        value={formData.roomNumber}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your room number.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="subject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="subject"
                        placeholder="Brief subject of your complaint"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a subject.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={12}>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={4}
                        name="description"
                        placeholder="Detailed description of your complaint"
                        value={formData.description}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a description.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Submit Complaint
                  </Button>
                </div>
              </Form>
            </>
          ) : (
            <div className="table-responsive">
              {complaints.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Subject</th>
                      <th>Room</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map(complaint => (
                      <tr key={complaint.id}>
                        <td>{complaint.date}</td>
                        <td>{complaint.category}</td>
                        <td>{complaint.subject}</td>
                        <td>{complaint.roomNumber}</td>
                        <td>{getStatusBadge(complaint.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">
                  You haven't submitted any complaints yet.
                </Alert>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Complaints;