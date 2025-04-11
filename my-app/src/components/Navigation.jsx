import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

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
                <Navbar.Brand href="#hero">
                    <span className="brand-text">Poke House</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="#hero" className="nav-link-custom">Home</Nav.Link>
                        <Nav.Link href="#bases" className="nav-link-custom">Bases</Nav.Link>
                        <Nav.Link href="#proteins" className="nav-link-custom">Proteins</Nav.Link>
                        <Nav.Link href="#ingredients" className="nav-link-custom">Ingredients</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button variant="primary" className="order-button">Order Now</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;