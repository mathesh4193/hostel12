import React, { useState } from 'react';

const Complaints = () => {
  const [complaints] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      regNo: '21CS101',
      roomNo: '101',
      category: 'Maintenance',
      description: 'Fan not working properly',
      date: '2024-01-25',
      status: 'Pending'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      regNo: '21CS102',
      roomNo: '102',
      category: 'Facilities',
      description: 'Water supply issue in bathroom',
      date: '2024-01-24',
      status: 'Pending'
    }
  ]);

  const handleResolve = (id) => {
    // Add your resolution logic here
    console.log('Resolved complaint:', id);
    alert('Complaint marked as resolved');
  };

  const handleInProgress = (id) => {
    // Add your in-progress logic here
    console.log('Complaint in progress:', id);
    alert('Complaint marked as in progress');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Student Complaints</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={tableHeaderStyle}>Student Name</th>
              <th style={tableHeaderStyle}>Reg. No</th>
              <th style={tableHeaderStyle}>Room No</th>
              <th style={tableHeaderStyle}>Category</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{complaint.studentName}</td>
                <td style={tableCellStyle}>{complaint.regNo}</td>
                <td style={tableCellStyle}>{complaint.roomNo}</td>
                <td style={tableCellStyle}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2'
                  }}>
                    {complaint.category}
                  </span>
                </td>
                <td style={tableCellStyle}>{complaint.description}</td>
                <td style={tableCellStyle}>{complaint.date}</td>
                <td style={tableCellStyle}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: complaint.status === 'Pending' ? '#fff3cd' : 
                                   complaint.status === 'In Progress' ? '#e8f5e9' : '#d4edda',
                    color: complaint.status === 'Pending' ? '#856404' :
                          complaint.status === 'In Progress' ? '#2e7d32' : '#155724'
                  }}>
                    {complaint.status}
                  </span>
                </td>
                <td style={tableCellStyle}>
                  {complaint.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleInProgress(complaint.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#2196f3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Mark In Progress
                      </button>
                      <button
                        onClick={() => handleResolve(complaint.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Resolve
                      </button>
                    </div>
                  )}
                  {complaint.status === 'In Progress' && (
                    <button
                      onClick={() => handleResolve(complaint.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Resolve
                    </button>
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

export default Complaints;