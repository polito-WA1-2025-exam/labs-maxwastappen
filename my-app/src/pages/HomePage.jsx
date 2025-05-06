import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Added Bootstrap components

// Placeholder for featured menu items
const FeaturedMenuPreview = () => (
  // Using section-lighter for alternating background, can be section-darker too
  <div className="section-content section-lighter"> 
    <Container>
      <Row className="mb-5 text-center">
        <Col>
          <h2 className="section-title">Featured Bowls</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">Discover our most popular and delicious poke creations.</p>
        </Col>
      </Row>
      <Row>
        {/* Placeholder content - replace with actual featured items using modern-card if desired */}
        <Col md={4} className="mb-4">
          <div className="modern-card h-100 card" style={{ cursor: 'pointer' }}>
            <img 
              className="card-img modern-card-img" 
              alt="Spicy Tuna Bowl" 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974"
            />
            <div className="card-gradient-overlay"></div>
            <div className="d-flex flex-column justify-content-between p-4 card-img-overlay">
              <div className="card-content">
                <h3 className="card-title">Spicy Tuna Bowl</h3>
                <p className="card-description">Our signature spicy tuna with all the fixings.</p>
                <p className="card-price">€13.50</p>
              </div>
              <Button variant="primary" className="card-button align-self-start mt-4">View Details</Button>
            </div>
          </div>
        </Col>
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

function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <FeaturedMenuPreview />
      <Footer />
    </>
  );
}

export default HomePage;