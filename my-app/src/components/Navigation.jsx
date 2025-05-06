import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link

function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar 
            expand="lg" 
            fixed="top" 
            className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        >
            <Container>
                <Navbar.Brand as={Link} to="/"> {/* Updated */}
                    <span className="brand-text">Poke House</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link> {/* Updated */}
                        <Nav.Link as={Link} to="/menu" className="nav-link-custom">Menu</Nav.Link> {/* Added */}
                        <Nav.Link as={Link} to="/build" className="nav-link-custom">Build Your Bowl</Nav.Link> {/* Added */}
                        <Nav.Link as={Link} to="/about" className="nav-link-custom">About Us</Nav.Link> {/* Added */}
                        <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link> {/* Added */}
                    </Nav>
                    <Nav>
                        <Button as={Link} to="/cart" variant="outline-light" className="me-2 cart-button"> {/* Added Cart Button */}
                            <i className="bi bi-cart"></i> Cart
                        </Button>
                        <Button as={Link} to="/build" variant="primary" className="order-button">Order Now</Button> {/* Updated */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;