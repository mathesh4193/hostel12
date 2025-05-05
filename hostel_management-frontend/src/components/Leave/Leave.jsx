import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert, Table, Badge } from 'react-bootstrap';

const Leave = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [formData, setFormData] = useState({
    leaveType: '',
    reason: '',
    startDate: '',
    endDate: '',
    parentContact: '',
    address: ''
  });
  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, message: '', variant: '' });
  
  // Mock data for previous leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, leaveType: 'Home Visit', reason: 'Family function', startDate: '2023-03-20', endDate: '2023-03-25', status: 'approved', appliedOn: '2023-03-10' },
    { id: 2, leaveType: 'Medical', reason: 'Doctor appointment', startDate: '2023-02-15', endDate: '2023-02-18', status: 'rejected', appliedOn: '2023-02-10' },
    { id: 3, leaveType: 'Other', reason: 'Attending workshop', startDate: '2023-01-25', endDate: '2023-01-28', status: 'pending', appliedOn: '2023-01-20' },
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

    // Create new leave request object
    const newLeaveRequest = {
      id: leaveRequests.length + 1,
      ...formData,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0]
    };

    // Add to leave requests list
    setLeaveRequests([newLeaveRequest, ...leaveRequests]);
    
    // Show success message
    setSubmitStatus({
      show: true,
      message: 'Leave request submitted successfully!',
      variant: 'success'
    });

    // Reset form
    setFormData({
      leaveType: '',
      reason: '',
      startDate: '',
      endDate: '',
      parentContact: '',
      address: ''
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
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Leave Management</h4>
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
                    New Leave Request
                  </Button>
                  <Button 
                    variant={activeTab === 'history' ? 'primary' : 'outline-primary'} 
                    onClick={() => setActiveTab('history')}
                  >
                    Leave History
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
                    <Form.Group controlId="leaveType">
                      <Form.Label>Leave Type</Form.Label>
                      <Form.Select
                        required
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleChange}
                      >
                        <option value="">Select Leave Type</option>
                        <option value="Home Visit">Home Visit</option>
                        <option value="Medical">Medical</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a leave type.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="parentContact">
                      <Form.Label>Parent/Guardian Contact</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        name="parentContact"
                        placeholder="Enter parent/guardian contact number"
                        value={formData.parentContact}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a contact number.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="startDate">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a start date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="endDate">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select an end date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="address">
                      <Form.Label>Address During Leave</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="address"
                        placeholder="Enter your address during leave period"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide an address.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={12}>
                    <Form.Group controlId="reason">
                      <Form.Label>Reason for Leave</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={4}
                        name="reason"
                        placeholder="Explain the reason for your leave request"
                        value={formData.reason}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a reason for your leave.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Submit Leave Request
                  </Button>
                </div>
              </Form>
            </>
          ) : (
            <div className="table-responsive">
              {leaveRequests.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Applied On</th>
                      <th>Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map(request => (
                      <tr key={request.id}>
                        <td>{request.appliedOn}</td>
                        <td>{request.leaveType}</td>
                        <td>{request.startDate}</td>
                        <td>{request.endDate}</td>
                        <td>{getStatusBadge(request.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">
                  You haven't submitted any leave requests yet.
                </Alert>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Leave;