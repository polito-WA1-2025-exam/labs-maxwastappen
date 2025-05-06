import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
// Import Bootstrap components for layout, cards, and buttons
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

/**
 * @function FeaturedMenuPreview
 * @description A functional component that displays a preview section for featured menu items.
 * This section uses Bootstrap's grid and custom card styling to showcase a few popular bowls.
 * @returns {JSX.Element} The JSX for the featured menu preview section.
 */
const FeaturedMenuPreview = () => (
  // Section container with consistent padding and alternating dark mode background
  // Using section-lighter here, could also be section-darker
  <div className="section-content section-lighter">
    <Container> {/* Bootstrap container for responsive centering and padding */}
      {/* Section header row */}
      <Row className="mb-5 text-center">
        <Col> {/* Full width column for the header */}
          {/* section-title: Styles the main heading */}
          <h2 className="section-title">Featured Bowls</h2>
          {/* section-divider: Styles the decorative line */}
          <div className="section-divider"></div>
          {/* section-subtitle: Styles the introductory paragraph */}
          <p className="section-subtitle">Discover our most popular and delicious poke creations.</p>
        </Col>
      </Row>

      {/* Row for the featured menu cards */}
      <Row>
        {/* Example Featured Item 1: Spicy Tuna Bowl */}
        {/* md={4}: Takes 4 out of 12 columns on medium screens and up (creating 3 columns) */}
        <Col md={4} className="mb-4"> {/* Add bottom margin for spacing */}
          {/* modern-card: Apply custom card styling */}
          {/* h-100: Make cards equal height in the row */}
          {/* card: Default Bootstrap card class (might add padding, etc., but mostly overridden) */}
          {/* cursor: pointer: Indicates the card is clickable (if it were a link) */}
          <div className="modern-card h-100 card" style={{ cursor: 'pointer' }}>
            {/* Card image container and image */}
            <img
              className="card-img modern-card-img" // Apply custom image styling
              alt="Spicy Tuna Bowl" // Alt text for accessibility
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974" // Image source
            />
            {/* Gradient overlay for the image */}
            <div className="card-gradient-overlay"></div>
            {/* Card content container, positioned absolutely over the image */}
            {/* d-flex, flex-column, justify-content-between: Use flexbox to stack content and push button to the bottom */}
            {/* p-4: Add padding */}
            {/* card-img-overlay: Positions content over the image (Bootstrap utility) */}
            <div className="d-flex flex-column justify-content-between p-4 card-img-overlay">
               {/* card-content: Apply custom styling for the content area */}
              <div className="card-content">
                {/* card-title: Styles the title */}
                <h3 className="card-title">Spicy Tuna Bowl</h3>
                {/* card-description: Styles the description */}
                <p className="card-description">Our signature spicy tuna with all the fixings.</p>
                {/* card-price: Styles the price display */}
                <p className="card-price">€13.50</p>
              </div>
               {/* card-button: Styles the button */}
               {/* align-self-start: Align button to the start of the flex container */}
               {/* mt-4: Add top margin */}
              <Button variant="primary" className="card-button align-self-start mt-4">View Details</Button>
            </div>
          </div>
        </Col>
        {/* Example Featured Item 2: Salmon Avocado Bowl */}
        <Col md={4} className="mb-4">
           <div className="modern-card h-100 card" style={{ cursor: 'pointer' }}>
            <img
              className="card-img modern-card-img"
              alt="Salmon Avocado Bowl"
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070"
            />
            <div className="card-gradient-overlay"></div>
            <div className="d-flex flex-column justify-content-between p-4 card-img-overlay">
              <div className="card-content">
                <h3 className="card-title">Salmon Avocado Bowl</h3>
                <p className="card-description">Fresh salmon and creamy avocado, a perfect match.</p>
                <p className="card-price">€14.00</p>
              </div>
              <Button variant="primary" className="card-button align-self-start mt-4">View Details</Button>
            </div>
          </div>
        </Col>
        {/* Example Featured Item 3: Vegan Tofu Delight */}
        <Col md={4} className="mb-4">
          <div className="modern-card h-100 card" style={{ cursor: 'pointer' }}>
            <img
              className="card-img modern-card-img"
              alt="Vegan Tofu Delight"
              src="https://images.unsplash.com/photo-1563209543-614938901df3?q=80&w=1974"
            />
            <div className="card-gradient-overlay"></div>
            <div className="d-flex flex-column justify-content-between p-4 card-img-overlay">
              <div className="card-content">
                <h3 className="card-title">Vegan Tofu Delight</h3>
                <p className="card-description">Marinated tofu with fresh veggies and your choice of base.</p>
                <p className="card-price">€12.50</p>
              </div>
              <Button variant="primary" className="card-button align-self-start mt-4">View Details</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

/**
 * @function HomePage
 * @description This component represents the main landing page of the application.
 * It includes the navigation bar, a hero section, a preview of featured menu items,
 * and the footer.
 * @returns {JSX.Element} The JSX for the Home Page.
 */
function HomePage() {
  return (
    <>
      {/* Render the sticky navigation bar */}
      <Navigation />
      {/* Render the Hero section */}
      <Hero />
      {/* Render the Featured Menu Preview section */}
      <FeaturedMenuPreview />
      {/* Render the full-width footer */}
      <Footer />
    </>
  );
}

export default HomePage;