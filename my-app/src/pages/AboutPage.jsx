import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// Import Bootstrap components for layout
import { Container, Row, Col } from 'react-bootstrap';

/**
 * @function AboutContent
 * @description A simple functional component that renders the textual content for the About section.
 * This component is kept separate for better organization, though it's only used internally here.
 * @returns {JSX.Element} The JSX for the about page text.
 */
const AboutContent = () => (
  // Align text to the start within this container for standard paragraph flow
  <div className="text-start">
    <p>Welcome to Poke House! We are passionate about serving fresh, delicious, and customizable poke bowls made with high-quality ingredients. Our mission is to provide a healthy and flavorful dining experience for everyone.</p>
    <p>Founded in [Year], Poke House started with a simple idea: to bring the vibrant flavors of Hawaiian poke to our community. We believe in sustainability, sourcing our ingredients responsibly, and creating a welcoming atmosphere for our customers.</p>
    <p>Come visit us and create your perfect poke bowl today!</p>
  </div>
);

/**
 * @function AboutPage
 * @description This component represents the "About Us" page of the application.
 * It includes the navigation bar, the main About section content, and the footer.
 * It utilizes custom CSS classes for styling and Bootstrap's grid system for layout.
 * @returns {JSX.Element} The JSX for the About Page.
 */
function AboutPage() {
  return (
    <>
      {/* Renders the sticky navigation bar */}
      <Navigation />

      {/* Main section for the About content */}
      {/* section-content: Provides consistent padding and vertical centering */}
      {/* section-darker: Applies the specific background color for this section */}
      <div className="section-content section-darker">
        <Container> {/* Bootstrap container for responsive centering and padding */}
          {/* Row for the section header (title and divider) */}
          {/* mb-5: Adds bottom margin */}
          {/* text-center: Centers the text content within the column */}
          <Row className="mb-5 text-center">
            <Col> {/* Single column for the full width header */}
              {/* section-title: Styles the main heading with gradient text */}
              <h1 className="section-title">About Poke House</h1>
              {/* section-divider: Styles the decorative line below the title */}
              <div className="section-divider"></div>
            </Col>
          </Row>

          {/* Row for the main textual content */}
          {/* justify-content-center: Centers the column horizontally if it's not full width */}
          <Row className="justify-content-center">
            {/* md={8}: On medium screens and up, the column takes up 8 out of 12 grid units.
                       On small screens, it will be full width by default. */}
            <Col md={8}>
              {/* Renders the actual text content */}
              <AboutContent />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Renders the full-width footer */}
      <Footer />
    </>
  );
}

export default AboutPage;