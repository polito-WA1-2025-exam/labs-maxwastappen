import React, { useState, useEffect } from 'react';
// Import Bootstrap components for the navigation bar
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// Import Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';

/**
 * @function Navigation
 * @description A functional component that renders the application's navigation bar.
 * It changes appearance (adds background and shadow) when the user scrolls down.
 * It uses Bootstrap's Navbar component and react-router-dom's Link for navigation.
 * @returns {JSX.Element} The JSX for the Navigation bar.
 */
function Navigation() {
    // State to track whether the page has been scrolled past a certain threshold
    const [scrolled, setScrolled] = useState(false);

    // Effect hook to add and remove the scroll event listener
    useEffect(() => {
        /**
         * @function handleScroll
         * @description Checks the vertical scroll position of the window.
         * If scrolled more than 50px, updates the 'scrolled' state to true,
         * otherwise updates it to false.
         */
        const handleScroll = () => {
            if (window.scrollY > 50) { // Check if the scroll position is greater than 50 pixels
                setScrolled(true); // If scrolled, set state to true
            } else {
                setScrolled(false); // If not scrolled back up, set state to false
            }
        };

        // Add the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        // This prevents memory leaks by removing the listener when the component is no longer rendered
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

    return (
        // Bootstrap Navbar component
        // expand="lg": Specifies the breakpoint at which the navbar collapses (large screens and up it expands)
        // fixed="top": Keeps the navbar fixed at the top of the viewport
        // className: Applies custom classes based on scroll state
        // custom-navbar: Base styling for the navbar
        // scrolled ? 'navbar-scrolled' : '': Conditionally adds the 'navbar-scrolled' class when scrolled
        <Navbar
            expand="lg"
            fixed="top"
            className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        >
            <Container> {/* Bootstrap container for responsive centering and padding */}
                {/* Navbar Brand (Logo/Site Name) */}
                {/* as={Link}: Renders the Navbar.Brand as a react-router-dom Link */}
                {/* to="/": Specifies the target URL for the link (home page) */}
                <Navbar.Brand as={Link} to="/">
                    {/* brand-text: Custom styling for the site name */}
                    <span className="brand-text">Poke House</span>
                </Navbar.Brand>
                {/* Navbar Toggler (for mobile/collapsed view) */}
                {/* aria-controls: Links the toggler to the collapsible content by ID */}
                {/* navbar-dark: Applies dark styling to the toggler icon (needed for light icon on dark/transparent background) */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark">
                    {/* Default Bootstrap toggler icon */}
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                {/* Navbar Collapsible Content */}
                {/* id: Matches the aria-controls of the toggler */}
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Main Navigation Links */}
                    {/* mx-auto: Centers the navigation links horizontally */}
                    <Nav className="mx-auto">
                        {/* Navigation links using Nav.Link rendered as react-router-dom Link */}
                        {/* as={Link}: Renders as Link */}
                        {/* to="/": Target URL */}
                        {/* nav-link-custom: Custom styling for nav links */}
                        <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
                        <Nav.Link as={Link} to="/menu" className="nav-link-custom">Menu</Nav.Link>
                        <Nav.Link as={Link} to="/build" className="nav-link-custom">Build Your Bowl</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="nav-link-custom">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>
                    </Nav>
                    {/* Right-aligned Navigation Buttons */}
                    <Nav>
                        {/* Cart Button */}
                        {/* as={Link}: Renders as Link */}
                        {/* to="/cart": Target URL */}
                        {/* variant="outline-light": Light outline button style */}
                        {/* me-2: Add right margin */}
                        {/* cart-button: Custom styling for cart button (if needed, might not be defined) */}
                        <Button as={Link} to="/cart" variant="outline-light" className="me-2 cart-button">
                            <i className="bi bi-cart"></i> Cart {/* Shopping cart icon */}
                        </Button>
                        {/* Order Now Button */}
                        {/* as={Link}: Renders as Link */}
                        {/* to="/build": Target URL (build page) */}
                        {/* variant="primary": Primary button style */}
                        {/* order-button: Custom styling for order button */}
                        <Button as={Link} to="/build" variant="primary" className="order-button">Order Now</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;