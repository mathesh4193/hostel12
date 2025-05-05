import React, { useState } from 'react';

const LeaveRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      regNo: '21CS101',
      roomNo: '101',
      reason: 'Family Function',
      fromDate: '2024-01-25',
      toDate: '2024-01-27',
      status: 'Pending'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      regNo: '21CS102',
      roomNo: '102',
      reason: 'Medical Emergency',
      fromDate: '2024-01-26',
      toDate: '2024-01-28',
      status: 'Pending'
    }
  ]);

  const handleApprove = async (id) => {
    try {
      // Update local state
      setRequests(requests.map(request => 
        request.id === id ? {...request, status: 'Approved'} : request
      ));

      // Send update to backend
      const response = await fetch('/api/leave-requests/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: id,
          status: 'Approved',
          updatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update request');
      }

      // Show success message
      alert('Leave request approved successfully');
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to approve leave request');
    }
  };

  const handleReject = async (id) => {
    try {
      // Update local state
      setRequests(requests.map(request => 
        request.id === id ? {...request, status: 'Rejected'} : request
      ));

      // Send update to backend
      const response = await fetch('/api/leave-requests/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: id,
          status: 'Rejected',
          updatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update request');
      }

      // Show success message
      alert('Leave request rejected');
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to reject leave request');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Leave Requests</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={tableHeaderStyle}>Student Name</th>
              <th style={tableHeaderStyle}>Reg. No</th>
              <th style={tableHeaderStyle}>Room No</th>
              <th style={tableHeaderStyle}>Reason</th>
              <th style={tableHeaderStyle}>From Date</th>
              <th style={tableHeaderStyle}>To Date</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{request.studentName}</td>
                <td style={tableCellStyle}>{request.regNo}</td>
                <td style={tableCellStyle}>{request.roomNo}</td>
                <td style={tableCellStyle}>{request.reason}</td>
                <td style={tableCellStyle}>{request.fromDate}</td>
                <td style={tableCellStyle}>{request.toDate}</td>
                <td style={tableCellStyle}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: request.status === 'Pending' ? '#fff3cd' : 
                                   request.status === 'Approved' ? '#d4edda' : '#f8d7da',
                    color: request.status === 'Pending' ? '#856404' :
                          request.status === 'Approved' ? '#155724' : '#721c24'
                  }}>
                    {request.status}
                  </span>
                </td>
                <td style={tableCellStyle}>
                  {request.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleApprove(request.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
  backgroundColor: '#f5f5f5'
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd'
};

const tableRowStyle = {
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
};

export default LeaveRequests;