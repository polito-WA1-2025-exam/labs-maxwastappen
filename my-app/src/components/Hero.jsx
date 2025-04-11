import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div id='hero' className="hero position-relative d-flex align-items-center">
      {/* Background overlay with gradient */}
      <div className="hero-bg-overlay"></div>
      
      <Container className="position-relative z-2">
        <Row className="align-items-center justify-content-center">
          <Col md={10} lg={8} className="text-center hero-content">
            <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
              <h1 className="display-3 fw-bold mb-3">Poke House</h1>
              <p className="lead mb-4 hero-tagline">Your sensorial journey starts here</p>
              <div className="hero-buttons">
                <Button variant="primary" size="lg" className="me-3 rounded-pill">
                  Order Now
                </Button>
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