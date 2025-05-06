import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// Import Bootstrap components for layout, cards, and buttons
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

/**
 * @function MenuCategories
 * @description A functional component that renders placeholder buttons for menu categories.
 * In a real application, these might be interactive tabs or filters.
 * @returns {JSX.Element} The JSX for the menu categories section.
 */
const MenuCategories = () => (
  // Centered text for the category buttons
  <div className="text-center mb-4">
    {/* Example category buttons */}
    {/* modern-btn: Apply custom button styling */}
    {/* m-2: Add margin */}
    <Button variant="outline-light" className="modern-btn m-2">Signature Bowls</Button>
    <Button variant="outline-light" className="modern-btn m-2">Build Your Own</Button>
    <Button variant="outline-light" className="modern-btn m-2">Sides</Button>
    <Button variant="outline-light" className="modern-btn m-2">Drinks</Button>
  </div>
);

/**
 * @function MenuItemsListings
 * @description A functional component that renders placeholder cards for menu items.
 * In a real application, this would dynamically list items based on data and selected category.
 * @returns {JSX.Element} The JSX for the menu items listing section.
 */
const MenuItemsListings = () => (
  // Row container for the menu item cards
  <Row>
    {/* Example Menu Item Card 1: Classic Tuna Poke */}
    {/* md={6}: Takes 6 columns on medium screens (2 items per row) */}
    {/* lg={4}: Takes 4 columns on large screens (3 items per row) */}
    <Col md={6} lg={4} className="mb-4"> {/* Add bottom margin */}
       {/* modern-card: Apply custom card styling */}
       {/* h-100: Make cards equal height */}
       {/* card: Default Bootstrap card class */}
       {/* cursor: pointer: Indicates the card is clickable */}
      <div className="modern-card h-100 card" style={{ cursor: 'pointer' }}>
         {/* Card image container and image */}
        <img
          className="card-img modern-card-img" // Apply custom image styling
          alt="Classic Tuna Poke" // Alt text
          src="https://images.unsplash.com/photo-1592194550409-09b9fec90305?q=80&w=1974" // Image source
        />
        {/* Gradient overlay */}
        <div className="card-gradient-overlay"></div>
        {/* Card content, positioned over the image */}
        <div className="d-flex flex-column justify-content-between p-4 card-img-overlay">
           {/* card-content: Apply custom styling */}
          <div className="card-content">
             {/* card-title: Styles the title */}
            <h3 className="card-title">Classic Tuna Poke</h3>
             {/* card-description: Styles the description */}
            <p className="card-description">Ahi tuna, soy sauce, sesame oil, onions, and seaweed.</p>
             {/* card-price: Styles the price */}
            <p className="card-price">€12.50</p>
          </div>
           {/* card-button: Styles the button */}
           {/* align-self-start: Align button to the start */}
           {/* mt-4: Add top margin */}
          <Button variant="primary" className="card-button align-self-start mt-4">Add to Order</Button>
        </div>
      </div>
    </Col>
    {/* Example Menu Item Card 2: Spicy Salmon Bowl */}
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
    {/* Example Menu Item Card 3: Veggie Tofu Bowl */}
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
    {/* Add more Col components for other menu items here if needed */}
  </Row>
);

/**
 * @function MenuPage
 * @description This component represents the "Our Menu" page of the application.
 * It displays different categories of menu items and a listing of items within those categories.
 * It uses placeholder components for categories and listings.
 * @returns {JSX.Element} The JSX for the Menu Page.
 */
function MenuPage() {
  return (
    <>
      {/* Render the sticky navigation bar */}
      <Navigation />
      {/* Main content section for the menu page */}
      {/* section-content: Provides consistent padding and vertical centering */}
      {/* section-darker: Applies the specific background color for this section */}
      <div className="section-content section-darker">
        <Container> {/* Bootstrap container for responsive centering and padding */}
          {/* Section header row */}
          <Row className="mb-5 text-center">
            <Col> {/* Full width column for the header */}
              {/* section-title: Styles the main heading */}
              <h1 className="section-title">Our Menu</h1>
              {/* section-divider: Styles the decorative line */}
              <div className="section-divider"></div>
              {/* section-subtitle: Styles the introductory paragraph */}
              <p className="section-subtitle">Explore our range of fresh and flavorful poke bowls, sides, and drinks.</p>
            </Col>
          </Row>
          {/* Render the menu categories */}
          <MenuCategories />
          {/* Render the menu items listings */}
          <MenuItemsListings />
        </Container>
      </div>
      {/* Render the full-width footer */}
      <Footer />
    </>
  );
}

export default MenuPage;