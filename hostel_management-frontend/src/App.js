import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout and Components
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import SignIn from './components/Auth/SignIn';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import WardenDashboard from './components/Dashboard/WardenDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import About from './components/About/About';
import Leave from './components/Leave/Leave';
import Complaints from './components/Complaints/Complaints';
import OutpassForm from './components/Outpass/OutpassForm';
import Attendance from './components/Attendance/Attendance.jsx';
import Students from './components/Warden/Students';
import LeaveRequests from './components/Warden/LeaveRequests';
import PrivateRoute from './components/Auth/PrivateRoute';

// Update imports
import WardenComplaints from './components/Warden/Complaints';

// Add this import at the top
import Outpass from './components/Warden/Outpass';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<SignIn />} />
          
          {/* Student Dashboard Routes - Protected with PrivateRoute */}
          <Route path="/student/dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
          <Route path="/student-dashboard/leave" element={<PrivateRoute><Leave /></PrivateRoute>} />
          <Route path="/student-dashboard/outpass" element={<PrivateRoute><OutpassForm /></PrivateRoute>} />
          <Route path="/complaints" element={<PrivateRoute><Complaints /></PrivateRoute>} />
          <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />

          {/* Warden Dashboard */}
          <Route path="/warden/dashboard" element={<PrivateRoute><WardenDashboard /></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

          {/* OutpassForm Routes */}
          <Route path="/student-dashboard/outpass" element={<OutpassForm />} />
          <Route path="/outpass" element={<OutpassForm />} />
          <Route path="/warden/students" element={<Students />} />
          {/* Inside your Router configuration */}
          <Route path="/warden/leave-requests" element={<LeaveRequests />} />
          {/* Add this route in your Routes component */}
          <Route path="/warden/outpass" element={<Outpass />} />
          {/* Add this route in your Routes section */}
          <Route path="/warden/complaints" element={<WardenComplaints />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
