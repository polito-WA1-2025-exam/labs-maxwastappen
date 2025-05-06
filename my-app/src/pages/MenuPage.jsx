import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Added Bootstrap

// Placeholder components
const MenuCategories = () => (
  <div className="text-center mb-4">
    {/* Example categories, can be replaced with dynamic tabs or buttons */}
    <Button variant="outline-light" className="modern-btn m-2">Signature Bowls</Button>
    <Button variant="outline-light" className="modern-btn m-2">Build Your Own</Button>
    <Button variant="outline-light" className="modern-btn m-2">Sides</Button>
    <Button variant="outline-light" className="modern-btn m-2">Drinks</Button>
  </div>
);

const MenuItemsListings = () => (
  <Row>
    {/* Example Menu Item Card - Repeat for each item */}
    <Col md={6} lg={4} className="mb-4">
      <div className="modern-card h-100 card" style={{ cursor: 'pointer' }}>
        <img 
          className="card-img modern-card-img" 
          alt="Classic Tuna Poke" 
          src="https://images.unsplash.com/photo-1592194550409-09b9fec90305?q=80&w=1974" 
        />
        <div className="card-gradient-overlay"></div>
        <div className="d-flex flex-column justify-content-between p-4 card-img-overlay">
          <div className="card-content">
            <h3 className="card-title">Classic Tuna Poke</h3>
            <p className="card-description">Ahi tuna, soy sauce, sesame oil, onions, and seaweed.</p>
            <p className="card-price">€12.50</p>
          </div>
          <Button variant="primary" className="card-button align-self-start mt-4">Add to Order</Button>
        </div>
      </div>
    </Col>
    {/* Add more Col components for other menu items here */}
    <Col md={6} lg={4} className="mb-4">
      <div className="modern-card h-100 card" style={{ cursor: 'pointer' }}>
        <img 
          className="card-img modern-card-img" 
          alt="Spicy Salmon Bowl" 
          src="https://images.unsplash.com/photo-1600319216044-060a7c7c0dd3?q=80&w=1974" 
        />
        <div className="card-gradient-overlay"></div>
        <div className="d-flex flex-column justify-content-between p-4 card-img-overlay">
          <div className="card-content">
            <h3 className="card-title">Spicy Salmon Bowl</h3>
            <p className="card-description">Fresh salmon, spicy mayo, edamame, cucumber, and nori strips.</p>
            <p className="card-price">€13.00</p>
          </div>
          <Button variant="primary" className="card-button align-self-start mt-4">Add to Order</Button>
        </div>
      </div>
    </Col>
    <Col md={6} lg={4} className="mb-4">
      <div className="modern-card h-100 card" style={{ cursor: 'pointer' }}>
        <img 
          className="card-img modern-card-img" 
          alt="Veggie Tofu Bowl" 
          src="https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=1974" 
        />
        <div className="card-gradient-overlay"></div>
        <div className="d-flex flex-column justify-content-between p-4 card-img-overlay">
          <div className="card-content">
            <h3 className="card-title">Veggie Tofu Bowl</h3>
            <p className="card-description">Marinated tofu, mixed greens, avocado, carrots, and a light vinaigrette.</p>
            <p className="card-price">€11.50</p>
          </div>
          <Button variant="primary" className="card-button align-self-start mt-4">Add to Order</Button>
        </div>
      </div>
    </Col>
  </Row>
);

function MenuPage() {
  return (
    <>
      <Navigation />
      <div className="section-content section-darker"> {/* Consistent section styling */}
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="section-title">Our Menu</h1>
              <div className="section-divider"></div>
              <p className="section-subtitle">Explore our range of fresh and flavorful poke bowls, sides, and drinks.</p>
            </Col>
          </Row>
          <MenuCategories />
          <MenuItemsListings />
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default MenuPage;