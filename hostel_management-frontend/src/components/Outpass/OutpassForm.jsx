import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

const OutpassForm = () => {
  const [formData, setFormData] = useState({
    destination: '',
    purpose: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    emergencyContact: ''
  });
  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, message: '', variant: '' });

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

    // Here you would typically send the data to your backend
    console.log('Outpass request submitted:', formData);
    
    // Show success message
    setSubmitStatus({
      show: true,
      message: 'Outpass request submitted successfully!',
      variant: 'success'
    });

    // Reset form
    setFormData({
      destination: '',
      purpose: '',
      departureDate: '',
      departureTime: '',
      returnDate: '',
      returnTime: '',
      emergencyContact: ''
    });
    setValidated(false);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSubmitStatus({ show: false, message: '', variant: '' });
    }, 3000);
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Outpass Request Form</h4>
        </Card.Header>
        <Card.Body>
          {submitStatus.show && (
            <Alert variant={submitStatus.variant} dismissible onClose={() => setSubmitStatus({ show: false, message: '', variant: '' })}>
              {submitStatus.message}
            </Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="destination">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="destination"
                    placeholder="Enter your destination"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a destination.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="purpose">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    name="purpose"
                    placeholder="Explain the purpose of your visit"
                    value={formData.purpose}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a purpose for your outpass.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please select a departure date.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="departureTime">
                  <Form.Label>Departure Time</Form.Label>
                  <Form.Control
                    required
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please select a departure time.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="returnDate">
                  <Form.Label>Return Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please select a return date.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="returnTime">
                  <Form.Label>Return Time</Form.Label>
                  <Form.Control
                    required
                    type="time"
                    name="returnTime"
                    value={formData.returnTime}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please select a return time.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={12}>
                <Form.Group controlId="emergencyContact">
                  <Form.Label>Emergency Contact Number</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    name="emergencyContact"
                    placeholder="Enter emergency contact number"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide an emergency contact number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Submit Request
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OutpassForm;
