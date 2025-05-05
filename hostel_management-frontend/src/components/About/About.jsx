import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">About VCET Hostel</h1>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Your Second Home</Card.Title>
              <Card.Text>
                The students can live away from home, with all the comforts they are used to plus added conveniences. 
                At VCET, students are part of a diverse and lively community of scholars. The hostel is dedicated to providing 
                a safe space to explore campus life, whether academic, athletic, cultural, recreational, or social.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Student Activities</Card.Title>
              <Card.Text>
                For all-round development, the college offers various student activities ranging from sports and hobbies 
                to technical interests. Students are encouraged to join clubs like the Robotics Club, Programming Club, 
                Application Development Club, and Computer Services Center to explore their hidden talents and build organizational skills.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Hostel Facilities</Card.Title>
              <Card.Text>
                Separate hostels are available for boys and girls, with accommodations for 360 boys and 420 girls. 
                The mess is spacious, with separate seating arrangements for vegetarians and non-vegetarians.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Modern Amenities</Card.Title>
              <ul className="list-unstyled">
                <li>✓ Modern accommodation with Wi-Fi</li>
                <li>✓ 24/7 Security</li>
                <li>✓ Hygienic dining facilities</li>
                <li>✓ Recreation areas</li>
                <li>✓ Study rooms</li>
                <li>✓ Medical facilities</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Hostel Administration</Card.Title>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dr. P. Alli, Principal</td>
                  <td>Chief Warden</td>
                  <td><a href="tel:+919443566537">9443566537</a></td>
                </tr>
                <tr>
                  <td>Dr. S. Gopalakrishnan</td>
                  <td>Warden/Men's Hostel</td>
                  <td><a href="tel:+917373018067">7373018067</a></td>
                </tr>
                <tr>
                  <td>Mrs. A. Maheswari</td>
                  <td>Warden/Ladies Hostel</td>
                  <td><a href="tel:+919150343292">9150343292</a></td>
                </tr>
                <tr>
                  <td>Mr. P. Radhakrishnan</td>
                  <td>Deputy Warden / Men's Hostel</td>
                  <td><a href="tel:+919363338971">9363338971</a></td>
                </tr>
                <tr>
                  <td>Mr. R. Thavamani</td>
                  <td>Deputy Warden / Men's Hostel</td>
                  <td><a href="tel:+919566513579">9566513579</a></td>
                </tr>
                <tr>
                  <td>Ms. N. Alima Banu</td>
                  <td>Deputy Warden / Women's Hostel</td>
                  <td><a href="tel:+919944566610">9944566610</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Vision & Mission</Card.Title>
          <Row>
            <Col md={6}>
              <h5 className="text-primary">Vision</h5>
              <p>To revolutionize academic administration through innovative digital solutions that enhance the educational experience.</p>
            </Col>
            <Col md={6}>
              <h5 className="text-primary">Mission</h5>
              <p>Creating seamless connections between students, faculty, and administration while maintaining transparency and efficiency.</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="text-center mt-4 text-muted">
        <p>A proud initiative developed by Department of Computer Science and Engineering.</p>
      </div>
    </Container>
  );
};

export default About;
