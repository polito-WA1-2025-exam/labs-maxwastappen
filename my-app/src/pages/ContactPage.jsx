import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// Import Bootstrap components for layout, forms, and buttons
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

/**
 * @function ContactForm
 * @description A functional component that renders a simple contact form.
 * @returns {JSX.Element} The JSX for the contact form.
 */
const ContactForm = () => (
  // Form wrapper with dark background, padding, rounded corners, and shadow
  <Form className="dark-bg p-4 rounded shadow">
    {/* Name input field */}
    <Form.Group className="mb-3" controlId="formName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter your name" />
    </Form.Group>
    {/* Email input field */}
    <Form.Group className="mb-3" controlId="formEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
    {/* Message textarea */}
    <Form.Group className="mb-3" controlId="formMessage">
      <Form.Label>Message</Form.Label>
      <Form.Control as="textarea" rows={3} placeholder="Your message" />
    </Form.Group>
    {/* Submit button */}
    <Button variant="primary" type="submit" className="order-button">
      Send Message
    </Button>
  </Form>
);

/**
 * @function MapLocationInfo
 * @description A functional component that displays location information and a map placeholder.
 * Note: The original H4 was removed as the page component provides the H1 section title.
 * @returns {JSX.Element} The JSX for the location information and map placeholder.
 */
const MapLocationInfo = () => (
  // Wrapper with dark background, padding, rounded corners, shadow, and centered text
  <div className="dark-bg p-4 rounded shadow text-center">
    {/* Sub-heading for location */}
    <h4 className="mb-3">Our Location</h4>
    {/* Address text */}
    <p>123 Poke Lane, Foodie City, FC 45678</p>
    {/* Placeholder div for embedding a map */}
    {/* In a real app, you would replace this div's content with a map component or iframe */}
    <div style={{
      width: '100%', // Full width of the container
      height: '250px', // Fixed height
      backgroundColor: '#333', // Dark gray background for placeholder
      display: 'flex', // Use flexbox to center content
      alignItems: 'center', // Center vertically
      justifyContent: 'center', // Center horizontally
      borderRadius: '8px' // Rounded corners
    }}>
      Map Placeholder
    </div>
  </div>
);

/**
 * @function ContactPage
 * @description This component represents the "Contact Us" page of the application.
 * It includes the navigation bar, a section with a contact form and location info,
 * and the footer. It uses custom styling classes and Bootstrap's grid system.
 * @returns {JSX.Element} The JSX for the Contact Page.
 */
function ContactPage() {
  return (
    <>
      {/* Render the sticky navigation bar */}
      <Navigation />

      {/* Main content section for the contact page */}
      {/* section-content: Provides consistent padding and vertical centering */}
      {/* section-darker: Applies the specific background color for this section */}
      <div className="section-content section-darker">
        <Container> {/* Bootstrap container for responsive centering and padding */}
          {/* Row for the section header */}
          <Row className="mb-5 text-center">
            <Col> {/* Full width column for the header */}
              {/* section-title: Styles the main heading */}
              <h1 className="section-title">Contact Us</h1>
              {/* section-divider: Styles the decorative line */}
              <div className="section-divider"></div>
              {/* section-subtitle: Styles the introductory paragraph */}
              <p className="section-subtitle">We'd love to hear from you! Send us a message or find us on the map.</p>
            </Col>
          </Row>

          {/* Row for the contact form and location info columns */}
          {/* justify-content-center: Centers content horizontally if columns don't fill the row */}
          {/* align-items-start: Aligns items to the start of the cross axis (top) */}
          <Row className="justify-content-center align-items-start">
            {/* Column for the Contact Form */}
            {/* md={6}: Takes 6 out of 12 columns on medium screens and up */}
            {/* mb-4 mb-md-0: Adds bottom margin on small screens, removes it on medium and up */}
            <Col md={6} className="mb-4 mb-md-0">
              {/* Render the ContactForm component */}
              <ContactForm />
            </Col>
            {/* Column for the Map Location Info */}
            {/* md={6}: Takes 6 out of 12 columns on medium screens and up */}
            <Col md={6}>
              {/* Render the MapLocationInfo component */}
              <MapLocationInfo />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Render the full-width footer */}
      <Footer />
    </>
  );
}

export default ContactPage;