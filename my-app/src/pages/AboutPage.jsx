import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Container, Row, Col } from 'react-bootstrap';

// Placeholder for About Content - H2 removed as page provides H1
const AboutContent = () => (
  <div className="text-start"> {/* Align text to the start for better readability */}
    <p>Welcome to Poke House! We are passionate about serving fresh, delicious, and customizable poke bowls made with high-quality ingredients. Our mission is to provide a healthy and flavorful dining experience for everyone.</p>
    <p>Founded in [Year], Poke House started with a simple idea: to bring the vibrant flavors of Hawaiian poke to our community. We believe in sustainability, sourcing our ingredients responsibly, and creating a welcoming atmosphere for our customers.</p>
    <p>Come visit us and create your perfect poke bowl today!</p>
  </div>
);

function AboutPage() {
  return (
    <>
      <Navigation />
      <div className="section-content section-darker"> {/* Consistent section styling */}
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="section-title">About Poke House</h1>
              <div className="section-divider"></div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8}> {/* Centered content column */}
              <AboutContent />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;