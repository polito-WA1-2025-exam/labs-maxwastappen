import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Nav, Button } from 'react-bootstrap';

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="custom-footer">
            <Container>
                <Row className="align-items-center py-4">
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <h5 className="footer-brand-text mb-3">Poke House</h5>
                        <p className="footer-text mb-0">Fresh ingredients for your custom poke bowl delivered with love.</p>
                    </Col>
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <h6 className="footer-heading mb-3">Quick Links</h6>
                        <Nav className="flex-column">
                            <Nav.Link href="#hero" className="footer-link">Home</Nav.Link>
                            <Nav.Link href="#bases" className="footer-link">Bases</Nav.Link>
                            <Nav.Link href="#proteins" className="footer-link">Proteins</Nav.Link>
                            <Nav.Link href="#ingredients" className="footer-link">Ingredients</Nav.Link>
                        </Nav>
                    </Col>
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <h6 className="footer-heading mb-3">Contact Us</h6>
                        <p className="footer-text mb-1">123 Poke St, Turin</p>
                        <p className="footer-text mb-1">info@pokeapp.com</p>
                        <p className="footer-text mb-0">+39 123456789</p>
                    </Col>
                    <Col lg={3} md={6}>
                        <h6 className="footer-heading mb-3">Follow Us</h6>
                        <div className="d-flex footer-social">
                            <a href="#" className="social-icon">FB</a>
                            <a href="#" className="social-icon">IG</a>
                            <a href="#" className="social-icon">TW</a>
                        </div>
                        <Button variant="primary" className="footer-button mt-3">Order Now</Button>
                    </Col>
                </Row>
                <hr className="footer-divider" />
                <div className="text-center py-3">
                    <p className="mb-0 footer-copyright">© {currentYear} Poke House. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;