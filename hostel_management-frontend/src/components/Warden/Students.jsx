import React, { useState } from 'react';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students] = useState([
    {
      id: 1,
      name: 'John Doe',
      regNo: '21CS101',
      roomNo: '101',
      department: 'CSE',
      year: '2nd Year',
      contact: '9876543210',
      parentContact: '9876543211'
    },
    {
      id: 2,
      name: 'Jane Smith',
      regNo: '21CS102',
      roomNo: '102',
      department: 'CSE',
      year: '2nd Year',
      contact: '9876543212',
      parentContact: '9876543213'
    },
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roomNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Student Directory</h2>
      
      <input
        type="text"
        placeholder="Search students by name, registration number, or room number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Reg. No</th>
              <th style={tableHeaderStyle}>Room No</th>
              <th style={tableHeaderStyle}>Department</th>
              <th style={tableHeaderStyle}>Year</th>
              <th style={tableHeaderStyle}>Contact</th>
              <th style={tableHeaderStyle}>Parent Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{student.name}</td>
                <td style={tableCellStyle}>{student.regNo}</td>
                <td style={tableCellStyle}>{student.roomNo}</td>
                <td style={tableCellStyle}>{student.department}</td>
                <td style={tableCellStyle}>{student.year}</td>
                <td style={tableCellStyle}>
                  <a href={`tel:${student.contact}`} style={linkStyle}>
                    {student.contact}
                  </a>
                </td>
                <td style={tableCellStyle}>
                  <a href={`tel:${student.parentContact}`} style={linkStyle}>
                    {student.parentContact}
                  </a>
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

const linkStyle = {
  color: '#1976d2',
  textDecoration: 'none'
};

export default Students;