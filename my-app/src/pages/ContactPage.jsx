import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; // Added Bootstrap

// Placeholder components - H4 removed from MapLocationInfo as page provides H1
const ContactForm = () => (
  <Form className="dark-bg p-4 rounded shadow"> {/* Wrapper for form */}
    <Form.Group className="mb-3" controlId="formName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter your name" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formMessage">
      <Form.Label>Message</Form.Label>
      <Form.Control as="textarea" rows={3} placeholder="Your message" />
    </Form.Group>
    <Button variant="primary" type="submit" className="order-button">
      Send Message
    </Button>
  </Form>
);

const MapLocationInfo = () => (
  <div className="dark-bg p-4 rounded shadow text-center"> {/* Wrapper and styling */}
    <h4 className="mb-3">Our Location</h4>
    <p>123 Poke Lane, Foodie City, FC 45678</p>
    {/* You can embed a map here using Google Maps API or similar */}
    <div style={{width: '100%', height: '250px', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px'}}>
      Map Placeholder
    </div>
  </div>
);


function ContactPage() {
  return (
    <>
      <Navigation />
      <div className="section-content section-darker"> {/* Consistent section styling */}
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="section-title">Contact Us</h1>
              <div className="section-divider"></div>
              <p className="section-subtitle">We'd love to hear from you! Send us a message or find us on the map.</p>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-start">
            <Col md={6} className="mb-4 mb-md-0">
              <ContactForm />
            </Col>
            <Col md={6}>
              <MapLocationInfo />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;