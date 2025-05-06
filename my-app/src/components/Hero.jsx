import { useState, useEffect } from 'react';
// Import Bootstrap components for layout and buttons
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

/**
 * @function Hero
 * @description A component that renders the main hero section of the landing page.
 * It includes a background image with an overlay, a main heading, a tagline,
 * and action buttons. It also includes a simple fade-in animation on mount.
 * @returns {JSX.Element} The JSX for the Hero section.
 */
function Hero() {
  // State to manage the visibility for the fade-in animation
  const [isVisible, setIsVisible] = useState(false);

  // Effect hook to trigger the animation after the component mounts
  useEffect(() => {
    // Set isVisible to true after the initial render, which will apply the 'visible' class
    setIsVisible(true);
    // Empty dependency array ensures this effect runs only once on mount
  }, []);

  return (
    // Main div for the hero section
    // id='hero': Assigns an ID for potential linking or scrolling
    // hero: Custom styling class for the hero section (background, positioning, alignment)
    // position-relative: Needed for absolute positioning of the overlay
    // d-flex, align-items-center: Use flexbox to vertically center content
    <div id='hero' className="hero position-relative d-flex align-items-center">

      {/* Background overlay with gradient for the hero image */}
      {/* hero-bg-overlay: Custom styling class */}
      <div className="hero-bg-overlay"></div>

      {/* Bootstrap container for responsive centering and padding of content */}
      {/* position-relative, z-2: Ensure container and its content are above the overlay */}
      <Container className="position-relative z-2">
        {/* Row to center the content column */}
        {/* align-items-center, justify-content-center: Center column both vertically and horizontally */}
        <Row className="align-items-center justify-content-center">
          {/* Column for the hero content */}
          {/* md={10}, lg={8}: Constrain width on medium and large screens */}
          {/* text-center: Center text within the column */}
          {/* hero-content: Custom styling for the content area */}
          <Col md={10} lg={8} className="text-center hero-content">
            {/* Container for animated content, applying fade-in effect */}
            {/* fade-in: Custom animation class */}
            {/* isVisible ? 'visible' : '': Conditionally applies the 'visible' class */}
            <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
              {/* Main heading with Bootstrap and custom styles */}
              {/* display-3: Bootstrap large heading style */}
              {/* fw-bold: Bootstrap bold font weight */}
              {/* mb-3: Bootstrap bottom margin */}
              <h1>Poke House</h1> {/* Note: Using H1 here, but the CSS targets .hero h1 */}
               {/* Tagline with Bootstrap and custom styles */}
              <p className="lead mb-4 hero-tagline">Your sensorial journey starts here</p>
              {/* Container for action buttons */}
              <div className="hero-buttons">
                {/* Order Now Button */}
                {/* variant="primary": Bootstrap primary button style */}
                {/* size="lg": Large button size */}
                {/* me-3: Bootstrap right margin */}
                {/* rounded-pill: Make button pill-shaped */}
                 {/* Note: For a React Router app, wrap Button in Link or use navigate */}
                <Button variant="primary" size="lg" className="me-3 rounded-pill">
                  Order Now
                </Button>
                {/* Our Menu Button */}
                {/* variant="outline-light": Bootstrap light outline button style */}
                 {/* Note: For a React Router app, wrap Button in Link or use navigate */}
                <Button variant="outline-light" size="lg" className="rounded-pill">
                  Our Menu
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Hero;