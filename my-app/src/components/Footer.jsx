import React from 'react';
// Import Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Nav, Button } from 'react-bootstrap';

/**
 * @function Footer
 * @description A functional component that renders the application's footer.
 * It includes site branding, quick links, contact information, social media links,
 * an "Order Now" button, and copyright information.
 * @returns {JSX.Element} The JSX for the footer.
 */
function Footer() {
    // Get the current year dynamically for the copyright notice
    const currentYear = new Date().getFullYear();

    return (
        // Footer element with custom styling
        <footer className="custom-footer">
            <Container> {/* Bootstrap container for responsive centering and padding */}
                {/* Main row containing footer columns */}
                {/* align-items-center: Vertically aligns content in this row */}
                {/* py-4: Add vertical padding */}
                <Row className="align-items-center py-4">
                    {/* Column for Site Branding */}
                    {/* lg={3}: Takes 3 columns on large screens */}
                    {/* md={6}: Takes 6 columns on medium screens */}
                    {/* mb-4 mb-md-0: Adds bottom margin on small screens, removes it on medium and up */}
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        {/* footer-brand-text: Styles the brand name */}
                        <h5 className="footer-brand-text mb-3">Poke House</h5>
                        {/* footer-text: Styles descriptive text */}
                        <p className="footer-text mb-0">Fresh ingredients for your custom poke bowl delivered with love.</p>
                    </Col>
                    {/* Column for Quick Links */}
                    {/* lg={3}: Takes 3 columns on large screens */}
                    {/* md={6}: Takes 6 columns on medium screens */}
                    {/* mb-4 mb-md-0: Adds bottom margin on small screens, removes it on medium and up */}
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        {/* footer-heading: Styles the section heading */}
                        <h6 className="footer-heading mb-3">Quick Links</h6>
                        {/* Nav component for vertical link list */}
                        <Nav className="flex-column">
                            {/* footer-link: Styles the navigation links */}
                            {/* Use anchor tags with # to scroll to sections */}
                            <Nav.Link href="#hero" className="footer-link">Home</Nav.Link>
                            <Nav.Link href="#bases" className="footer-link">Bases</Nav.Link>
                            <Nav.Link href="#proteins" className="footer-link">Proteins</Nav.Link>
                            <Nav.Link href="#ingredients" className="footer-link">Ingredients</Nav.Link>
                             {/* Note: For a React Router app, consider using React Router's Link component instead of href */}
                        </Nav>
                    </Col>
                    {/* Column for Contact Information */}
                    {/* lg={3}: Takes 3 columns on large screens */}
                    {/* md={6}: Takes 6 columns on medium screens */}
                    {/* mb-4 mb-md-0: Adds bottom margin on small screens, removes it on medium and up */}
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        {/* footer-heading: Styles the section heading */}
                        <h6 className="footer-heading mb-3">Contact Us</h6>
                         {/* footer-text: Styles contact details */}
                        <p className="footer-text mb-1">123 Poke St, Turin</p>
                        <p className="footer-text mb-1">info@pokeapp.com</p>
                        <p className="footer-text mb-0">+39 123456789</p>
                    </Col>
                    {/* Column for Social Media and Order Button */}
                    {/* lg={3}: Takes 3 columns on large screens */}
                    {/* md={6}: Takes 6 columns on medium screens */}
                    <Col lg={3} md={6}>
                         {/* footer-heading: Styles the section heading */}
                        <h6 className="footer-heading mb-3">Follow Us</h6>
                        {/* d-flex: Use flexbox for horizontal arrangement */}
                        {/* footer-social: Custom social links container */}
                        <div className="d-flex footer-social">
                            {/* social-icon: Styles the social media links */}
                            <a href="#" className="social-icon">FB</a> {/* Placeholder links */}
                            <a href="#" className="social-icon">IG</a>
                            <a href="#" className="social-icon">TW</a>
                        </div>
                        {/* footer-button: Styles the "Order Now" button */}
                        {/* mt-3: Add top margin */}
                        <Button variant="primary" className="footer-button mt-3">Order Now</Button>
                         {/* Note: For a React Router app, wrap the Button in a Link component or use navigate */}
                    </Col>
                </Row>
                {/* footer-divider: Styles the horizontal rule */}
                <hr className="footer-divider" />
                {/* Copyright section */}
                {/* text-center: Centers the text */}
                {/* py-3: Add vertical padding */}
                <div className="text-center py-3">
                    {/* footer-copyright: Styles the copyright text */}
                    {/* mb-0: Remove bottom margin */}
                    <p className="mb-0 footer-copyright">© {currentYear} Poke House. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;