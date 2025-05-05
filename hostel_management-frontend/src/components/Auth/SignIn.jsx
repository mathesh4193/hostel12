import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../services/authService'; // Assuming login is a service you have
import './SignIn.css';

const SignIn = () => {
  const [activeRole, setActiveRole] = useState('student');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSuccessfulLogin = (role) => {
    if (role === 'student') {
      navigate('/student/dashboard');
    } else if (role === 'warden') {
      navigate('/warden/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setUserId('');
    setPassword('');
    setError('');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (activeRole === 'student') {
      const strongPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      if (strongPattern.test(value)) {
        setPasswordStrength('Strong');
      } else {
        setPasswordStrength('Weak');
      }
    } else {
      setPasswordStrength('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!userId || !password) {
      setError('Please enter all fields');
      setLoading(false);
      return;
    }

    if (activeRole === 'warden') {
      const wardenIdPattern = /^[A-Za-z0-9]+$/;
      if (!wardenIdPattern.test(userId)) {
        setError('Invalid Warden ID. Use only letters and numbers.');
        setLoading(false);
        return;
      }
    }

    try {
      console.log(`Attempting to login as ${activeRole} with ID: ${userId}`);
      const response = await login(userId, password, activeRole);
      console.log('Login response:', response);

      // Only use one navigation method
      handleSuccessfulLogin(activeRole);
    } catch (err) {
      console.error('Login error details:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Sign In</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <div className="mb-4">
                <p className="text-center mb-3">Please select your role and enter your credentials</p>

                <div className="role-selector d-flex mb-4">
                  <Button 
                    variant={activeRole === 'student' ? 'primary' : 'outline-primary'} 
                    className="flex-grow-1 me-2"
                    onClick={() => handleRoleChange('student')}
                  >
                    <div className="text-center">
                      <div>Student</div>
                      <small>Enter Roll Number & Password</small>
                    </div>
                  </Button>
                  
                  <Button 
                    variant={activeRole === 'warden' ? 'primary' : 'outline-primary'} 
                    className="flex-grow-1"
                    onClick={() => handleRoleChange('warden')}
                  >
                    <div className="text-center">
                      <div>Warden</div>
                      <small>Enter Warden ID & Password</small>
                    </div>
                  </Button>
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    {activeRole === 'student' ? 'Roll Number' : 'Warden ID'}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="username"
                    placeholder={`Enter ${activeRole === 'student' ? 'Roll Number' : 'Warden ID'}`}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <Button 
                      variant="link" 
                      className="position-absolute end-0 top-0 text-decoration-none"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ padding: '0.375rem 0.75rem' }}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  {activeRole === 'student' && password && (
                    <div className={`mt-2 ${passwordStrength === 'Strong' ? 'text-success' : 'text-danger'}`}>
                      Password strength: {passwordStrength}
                    </div>
                  )}
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mb-3" 
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : 'Sign In'}
                </Button>

                <div className="text-center">
                  <a href="#forgot-password" className="text-decoration-none">Forgot Password?</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
