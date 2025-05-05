import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// VCET Campus Coordinates
const VCET_COORDS = {
  latitude: 9.8945572,
  longitude: 78.1776890,
  radius: 200  // This is the campus radius in meters
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const toRadians = (deg) => (deg * Math.PI) / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Attendance = () => {
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isInCampus, setIsInCampus] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [showModal, setShowModal] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [attendanceMessage, setAttendanceMessage] = useState('');

  const attendanceData = [
    { date: '2024-03-01', status: 'Present' },
    { date: '2024-03-02', status: 'Present' },
    { date: '2024-03-03', status: 'Absent' },
    { date: '2024-03-04', status: 'Present' },
  ];

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        const calculatedDistance = getDistance(latitude, longitude, VCET_COORDS.latitude, VCET_COORDS.longitude);
        setDistance(Math.round(calculatedDistance));
        setIsInCampus(calculatedDistance <= VCET_COORDS.radius);

        if (calculatedDistance > VCET_COORDS.radius) {
          setError(`You are ${Math.round(calculatedDistance)}m away from VCET.`);
        } else {
          setError("");
        }

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((res) => res.json())
          .then((data) => setAddress(data.display_name || "Location not found"))
          .catch(() => setAddress("Failed to fetch address"));

        setLoading(false);
      },
      () => {
        setError("Location access denied. Please enable GPS.");
        setLoading(false);
      }
    );
  }, []);

  const markAttendance = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user')) || {};

      const attendancePayload = {
        studentId: user.id || user._id,
        studentName: user.name || user.username,
        status: isInCampus ? 'Present' : 'Absent',
        timestamp: new Date(),
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: address
        },
        distanceFromCampus: distance
      };

      // Send attendance data to backend
      await axios.post('http://localhost:5000/api/attendance', attendancePayload);

      setAttendanceStatus(isInCampus ? 'PRESENT' : 'ABSENT');
      setAttendanceMessage(
        isInCampus
          ? 'Your attendance has been marked and sent to the warden.'
          : `You are ${distance}m away from VCET. Absence has been recorded and notified to the warden.`
      );
      setShowModal(true);

    } catch (error) {
      console.error('Error marking attendance:', error);
      setAttendanceStatus('ERROR');
      setAttendanceMessage('Failed to mark attendance. Please try again later.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const calculateAttendance = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(day => day.status === 'Present').length;
    return {
      total,
      present,
      percentage: ((present / total) * 100).toFixed(2)
    };
  };

  const stats = calculateAttendance();

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Attendance System</h2>

      {/* Current Status Card with improved Bootstrap styling */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-primary text-white py-3">
          <h5 className="mb-0 fw-bold">Current Status</h5>
        </Card.Header>
        <Card.Body className="p-4">
          {loading ? (
            <div className="text-center py-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading location data...</p>
            </div>
          ) : (
            <>
              {error && <div className="alert alert-danger">{error}</div>}
              {location && (
                <div>
                  <div className="mb-3 p-3 rounded bg-light">
                    <p className="mb-2">
                      <strong>Status: </strong>
                      <span className={`badge ${isInCampus ? "bg-success" : "bg-danger"} fs-6`}>
                        {isInCampus ? "PRESENT ✅" : "ABSENT ❌"}
                      </span>
                    </p>
                    <p className="mb-0"><strong>Your Location: </strong>{address || "Fetching address..."}</p>
                  </div>
                  <button 
                    className={`btn btn-${isInCampus ? 'success' : 'danger'} w-100 py-2 fw-bold`}
                    onClick={markAttendance}
                    disabled={!location || !!error || loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      `Mark ${isInCampus ? "Present" : "Absent"} & Notify Warden`
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Attendance Statistics with improved cards */}
      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="h-100 shadow-sm text-center">
            <Card.Body className="bg-primary bg-opacity-85 text-white rounded">
              <Card.Title className="fw-bold">Total Days</Card.Title>
              <Card.Text className="display-4 my-3">{stats.total}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm text-center">
            <Card.Body className="bg-success bg-opacity-85 text-white rounded">
              <Card.Title className="fw-bold">Present Days</Card.Title>
              <Card.Text className="display-4 my-3">{stats.present}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm text-center">
            <Card.Body className="bg-info bg-opacity-85 text-white rounded">
              <Card.Title className="fw-bold">Attendance Percentage</Card.Title>
              <Card.Text className="display-4 my-3">{stats.percentage}%</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Attendance History with improved styling */}
      <Card className="shadow-sm">
        <Card.Header className="bg-light py-3">
          <Form.Group>
            <Form.Label className="fw-bold">Select Month</Form.Label>
            <Form.Control
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="form-control-lg"
            />
          </Form.Group>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((day, index) => (
                  <tr key={index}>
                    <td>{day.date}</td>
                    <td>
                      <span className={`badge ${day.status === 'Present' ? 'bg-success' : 'bg-danger'} px-3 py-2`}>
                        {day.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className={`bg-${attendanceStatus === 'PRESENT' ? 'success' : attendanceStatus === 'ABSENT' ? 'danger' : 'warning'} text-white`}>
          <Modal.Title>{attendanceStatus}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{attendanceMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Attendance;
