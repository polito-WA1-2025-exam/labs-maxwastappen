import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// Import Bootstrap components for layout, cards, forms, buttons, and lists
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
// Import hook for programmatic navigation
import { useNavigate } from 'react-router-dom';

/**
 * @function CheckoutPage
 * @description This component provides the checkout interface where users enter their
 * information and review the final order summary before placing the order.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.order - An array of bowl objects currently in the cart.
 * @param {function(number): Object | null} props.findItem - Function to find an item (base, protein, ingredient) by its ID from the global data.
 * @returns {JSX.Element} The JSX for the Checkout Page.
 */
function CheckoutPage({ order, findItem }) {
  // Hook to allow navigation programmatically
  const navigate = useNavigate();

  // State to store the customer's information entered in the form
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'creditCard' // Default payment method
  });

  // State to manage form validation feedback
  const [validated, setValidated] = useState(false);

  /**
   * @function handleInputChange
   * @description Generic handler for form input changes. Updates the `customerInfo` state.
   * @param {Object} e - The event object from the input element.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get the input name and value
    setCustomerInfo(prev => ({
      ...prev, // Keep existing customer info
      [name]: value // Update the specific field by name
    }));
  };

  /**
   * @function calculateTotal
   * @description Calculates the subtotal price of all items in the current order.
   * @returns {number} The total price of the order items (excluding delivery fee).
   */
  const calculateTotal = () => {
    // Use reduce to sum the price * amount for each bowl in the order
    return order.reduce((total, bowl) => {
      return total + (bowl.price * bowl.amount);
    }, 0); // Start the total at 0
  };

  /**
   * @function handleSubmit
   * @description Handles the form submission. Prevents default submission, performs
   * Bootstrap validation, logs the order details (placeholder), and navigates
   * to the confirmation page.
   * @param {Object} event - The form submission event.
   */
  const handleSubmit = (event) => {
    const form = event.currentTarget; // Get the form element
    event.preventDefault(); // Prevent default form submission (page reload)

    // Check if the form validation passes
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Stop the event propagation
      setValidated(true); // Show validation feedback
      return; // Stop the submission process
    }

    // --- Placeholder for order processing logic ---
    // In a real application, you would typically send the `order`, `customerInfo`,
    // and calculated total to a backend API here for processing payments,
    // order fulfillment, etc.
    console.log('Order submitted:', { order, customerInfo, total: calculateTotal() });
    // -------------------------------------------------

    // Navigate to the order confirmation page after successful submission
    navigate('/confirmation');
  };

  // Define a fixed delivery fee
  const DELIVERY_FEE = 2.50;

  // Main render function for the Checkout Page
  return (
    <>
      {/* Render the Navigation component */}
      <Navigation />
      {/* Main content section for the checkout page */}
      <div className="section-content section-darker">
        <Container>
          {/* Section header */}
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="section-title">Checkout</h1>
              <div className="section-divider"></div>
              <p className="section-subtitle">Complete your order details to proceed with payment.</p>
            </Col>
          </Row>

          {/* Conditional rendering: Show message if cart is empty */}
          {order.length === 0 ? (
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="dark-bg text-center p-5 mb-4">
                  <Card.Body>
                    <h3>Your cart is empty</h3>
                    <p className="mt-3">You need to add items to your cart before checking out.</p>
                    {/* Button to navigate to the build page */}
                    <Button
                      onClick={() => navigate('/build')} // Use navigate hook
                      variant="primary"
                      className="order-button mt-3"
                    >
                      Start Building Your Bowl
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            // If cart is not empty, display the checkout form and summary
            <Row>
              {/* Customer Information Form Column */}
              <Col md={7}> {/* Takes 7 out of 12 columns on medium screens and up */}
                <Card className="dark-bg mb-4"> {/* Card for the form */}
                  <Card.Body>
                    <Card.Title className="mb-4">Customer Information</Card.Title>
                    {/* Customer information form */}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}> {/* noValidate disables browser's default validation */}
                      {/* Full Name Field */}
                      <Form.Group className="mb-3" controlId="customerName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required // Make this field required
                        />
                        {/* Feedback message for invalid input */}
                        <Form.Control.Feedback type="invalid">
                          Please provide your name.
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Email Address Field */}
                      <Form.Group className="mb-3" controlId="customerEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          required // Make this field required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid email address.
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Phone Number Field */}
                      <Form.Group className="mb-3" controlId="customerPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel" // Use tel type for mobile keyboards
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          required // Make this field required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your phone number.
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Delivery Address Field */}
                      <Form.Group className="mb-4" controlId="customerAddress">
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Control
                          as="textarea" // Use textarea for multiline input
                          name="address"
                          value={customerInfo.address}
                          onChange={handleInputChange}
                          rows={3} // Set number of visible rows
                          placeholder="Enter your delivery address"
                          required // Make this field required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your delivery address.
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Payment Method Radio Buttons */}
                      <Form.Group className="mb-4">
                        <Form.Label>Payment Method</Form.Label>
                        <div>
                          {/* Credit Card Option */}
                          <Form.Check
                            inline // Display radios on the same line
                            type="radio"
                            id="creditCard"
                            label="Credit Card"
                            name="paymentMethod" // Same name for all radios in the group
                            value="creditCard"
                            checked={customerInfo.paymentMethod === 'creditCard'} // Checked based on state
                            onChange={handleInputChange} // Handle change
                            required // Make selection required
                          />
                          {/* PayPal Option */}
                          <Form.Check
                            inline
                            type="radio"
                            id="paypal"
                            label="PayPal"
                            name="paymentMethod"
                            value="paypal"
                            checked={customerInfo.paymentMethod === 'paypal'}
                            onChange={handleInputChange}
                            required
                          />
                          {/* Cash on Delivery Option */}
                          <Form.Check
                            inline
                            type="radio"
                            id="cashOnDelivery"
                            label="Cash on Delivery"
                            name="paymentMethod"
                            value="cashOnDelivery"
                            checked={customerInfo.paymentMethod === 'cashOnDelivery'}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Form.Group>

                      {/* Place Order Button */}
                      <div className="text-center mt-4">
                        <Button
                          variant="primary"
                          type="submit" // Submit the form
                          className="order-button" // Custom button class
                          size="lg" // Large button size
                        >
                          Place Order
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              {/* Order Summary Column */}
              <Col md={5}> {/* Takes 5 out of 12 columns on medium screens and up */}
                <Card className="dark-bg mb-4"> {/* Card for the order summary */}
                  <Card.Body>
                    <Card.Title className="mb-4">Order Summary</Card.Title>
                    {/* List group to display items in the order */}
                    <ListGroup variant="flush">
                      {/* Map through the order array to list each bowl */}
                      {order.map(bowl => {
                        const base = findItem(bowl.base); // Find base details for display
                        return (
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
              </Col>
            </Row>
          )}
        </Container>
      </div>
      {/* Render the Footer component */}
      <Footer />
    </>
  );
}

export default CheckoutPage;