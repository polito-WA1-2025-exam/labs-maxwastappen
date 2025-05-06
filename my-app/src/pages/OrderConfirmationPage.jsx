import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// Import Bootstrap components for layout, cards, buttons, and lists
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
// Import Link component for internal navigation
import { Link } from 'react-router-dom';

/**
 * @function OrderConfirmationPage
 * @description This component displays a confirmation message after a successful order submission.
 * It shows a summary of the placed order, a generated order number, and estimated delivery time.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.order - An array of bowl objects that were part of the confirmed order.
 * @param {function(number): Object | null} props.findItem - Function to find an item (base, protein, ingredient) by its ID from the global data.
 * @returns {JSX.Element} The JSX for the Order Confirmation Page.
 */
function OrderConfirmationPage({ order, findItem }) {

  // Generate a random 6-digit order number prefixed with "PH-"
  const orderNumber = `PH-${Math.floor(100000 + Math.random() * 900000)}`;

  /**
   * @function calculateTotal
   * @description Calculates the subtotal price of all items in the confirmed order.
   * @returns {number} The total price of the order items (excluding delivery fee).
   */
  const calculateTotal = () => {
    // Use reduce to sum the price * amount for each bowl in the order
    return order.reduce((total, bowl) => {
      return total + (bowl.price * bowl.amount);
    }, 0); // Start the total at 0
  };

  /**
   * @function getEstimatedDeliveryTime
   * @description Calculates and formats an estimated delivery time range (30-45 minutes from now).
   * @returns {string} A formatted string representing the estimated delivery time range.
   */
  const getEstimatedDeliveryTime = () => {
    const now = new Date(); // Get the current date and time
    // Calculate the date and time 30 minutes from now
    const min = new Date(now.getTime() + 30 * 60000); // 60000 milliseconds = 1 minute
    // Calculate the date and time 45 minutes from now
    const max = new Date(now.getTime() + 45 * 60000);

    /**
     * @function formatTime
     * @description Helper function to format a Date object into a 12-hour time string (HH:MM AM/PM).
     * @param {Date} date - The Date object to format.
     * @returns {string} The formatted time string.
     */
    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
      hours = hours % 12; // Convert 24-hour time to 12-hour time
      hours = hours ? hours : 12; // The hour '0' (midnight) should be '12' in 12-hour format
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes if less than 10
      return `${hours}:${formattedMinutes} ${ampm}`; // Return the formatted time string
    };

    // Return the estimated delivery time range as "HH:MM AM/PM - HH:MM AM/PM"
    return `${formatTime(min)} - ${formatTime(max)}`;
  };

  // Define a fixed delivery fee (should match the one used in CheckoutPage)
  const DELIVERY_FEE = 2.50;

  // Main render function for the Order Confirmation Page
  return (
    <>
      {/* Render the Navigation component */}
      <Navigation />
      {/* Main content section for the confirmation page */}
      <div className="section-content section-darker">
        <Container>
          {/* Section header */}
          <Row className="mb-5 text-center">
            <Col>
              {/* section-title: Styles the main heading */}
              <h1 className="section-title">Order Confirmed!</h1>
              {/* section-divider: Styles the decorative line */}
              <div className="section-divider"></div>
              {/* section-subtitle: Styles the introductory paragraph */}
              <p className="section-subtitle">Thank you for your order. Your delicious poke bowl is being prepared!</p>
            </Col>
          </Row>

          {/* Conditional rendering: Show message if the order object is empty (e.g., page reloaded or accessed directly) */}
          {order.length === 0 ? (
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="dark-bg text-center p-5 mb-4">
                  <Card.Body>
                    <h3>No active order found</h3>
                    <p className="mt-3">It seems you don't have an active order in the system.</p>
                    {/* Button to start a new order */}
                    <Button
                      as={Link} // Render as a Link component
                      to="/build" // Target URL
                      variant="primary" // Primary button style
                      className="order-button mt-3" // Custom button class and margin
                    >
                      Start a New Order
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            // If order is not empty, display the confirmation details and summary
            <Row className="justify-content-center">
              <Col md={8}> {/* Constrain confirmation width on larger screens */}
                {/* Confirmation Details Card */}
                <Card className="dark-bg mb-4">
                  <Card.Body className="text-center p-4">
                    {/* Confirmation icon */}
                    <div className="confirmation-icon mb-4">
                      {/* Checkmark icon with custom size and color */}
                      <i className="bi bi-check-circle-fill" style={{ fontSize: '4rem', color: '#6e48aa' }}></i>
                    </div>
                    <h2 className="mb-4">Thank You For Your Order!</h2> {/* Sub-heading */}
                    <p className="mb-3">Your order has been received and is being prepared.</p> {/* Confirmation message */}

                    {/* Order Details Box */}
                    <div className="order-details my-4 p-3" style={{ background: 'rgba(110, 72, 170, 0.1)', borderRadius: '8px' }}> {/* Styled container */}
                      <Row className="text-start"> {/* Row for detail columns */}
                        <Col md={6}> {/* First column */}
                          <p><strong>Order Number:</strong> {orderNumber}</p> {/* Display generated order number */}
                          <p><strong>Estimated Delivery:</strong> {getEstimatedDeliveryTime()}</p> {/* Display estimated delivery time */}
                        </Col>
                        <Col md={6}> {/* Second column */}
                          <p><strong>Payment Method:</strong> Credit Card</p> {/* Placeholder payment method */}
                          <p><strong>Order Status:</strong> <span className="text-success">Confirmed</span></p> {/* Order status */}
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>

                {/* Order Summary Card (similar to CartPage/CheckoutPage) */}
                <Card className="dark-bg mb-4">
                  <Card.Body>
                    <Card.Title className="mb-4">Order Summary</Card.Title>
                    {/* List group for ordered items */}
                    <ListGroup variant="flush">
                      {order.map(bowl => {
                        const base = findItem(bowl.base); // Find base details for display
                        return (
                          // List item for each bowl
                          <ListGroup.Item key={bowl.id} className="dark-bg d-flex justify-content-between">
                            <div>
                              <span className="fw-bold">Bowl #{bowl.id}</span> {/* Display bowl ID */}
                              {/* Display Base and Size */}
                              <div className="small">
                                Base: {base?.name || 'N/A'}, Size: {bowl.size?.name || 'N/A'} {/* Use optional chaining and fallback */}
                              </div>
                              {/* Display Quantity */}
                              <div className="small">
                                Qty: {bowl.amount}
                              </div>
                            </div>
                            {/* Display total price for this bowl item */}
                            <span>€{(bowl.price * bowl.amount).toFixed(2)}</span>
                          </ListGroup.Item>
                        );
                      })}

                      {/* Subtotal item */}
                      <ListGroup.Item className="dark-bg d-flex justify-content-between fw-bold mt-2">
                        <span>Subtotal</span>
                        <span>€{calculateTotal().toFixed(2)}</span> {/* Display calculated subtotal */}
                      </ListGroup.Item>

                      {/* Delivery Fee item */}
                      <ListGroup.Item className="dark-bg d-flex justify-content-between">
                        <span>Delivery Fee</span>
                        <span>€{DELIVERY_FEE.toFixed(2)}</span> {/* Display fixed delivery fee */}
                      </ListGroup.Item>

                      {/* Total item */}
                      <ListGroup.Item className="dark-bg d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        {/* Display total (subtotal + delivery fee) */}
                        <span>€{(calculateTotal() + DELIVERY_FEE).toFixed(2)}</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>

                {/* Navigation buttons */}
                <div className="text-center mb-5">
                  {/* Button to view the menu */}
                  <Button
                    as={Link} // Render as a Link component
                    to="/menu" // Target URL
                    variant="outline-light" // Light outline button style
                    className="modern-btn me-3" // Custom button class and right margin
                  >
                    View Menu
                  </Button>
                  {/* Button to return to the home page */}
                  <Button
                    as={Link} // Render as a Link component
                    to="/" // Target URL (home)
                    variant="primary" // Primary button style
                    className="order-button" // Custom button class
                  >
                    Return to Home
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      {/* Render the full-width footer */}
      <Footer />
    </>
  );
}

export default OrderConfirmationPage;