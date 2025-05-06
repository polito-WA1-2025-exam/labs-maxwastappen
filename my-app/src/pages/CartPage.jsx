import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// Import Bootstrap components for layout and styling
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
// Import Link component for internal navigation
import { Link } from 'react-router-dom';

/**
 * @function CartPage
 * @description This component displays the user's current order (items added to the cart).
 * It allows the user to review the selected bowls, adjust quantities, remove items,
 * see the total price, and proceed to checkout or continue building.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.order - An array of bowl objects currently in the cart. Each object includes bowl details, size, price, and amount (quantity).
 * @param {function(number, number): void} props.onRemoveBowl - Callback function to decrease the quantity of a specific bowl item by a certain amount.
 * @param {function(number): void} props.onRemoveBowlCompletely - Callback function to remove a specific bowl item entirely from the cart.
 * @param {function(number): Object | null} props.findItem - Function to find an item (base, protein, ingredient) by its ID from the global data.
 * @returns {JSX.Element} The JSX for the Cart Page.
 */
function CartPage({ order, onRemoveBowl, onRemoveBowlCompletely, findItem }) {

  /**
   * @function calculateTotal
   * @description Calculates the sum of the prices of all items in the current order.
   * @returns {number} The total price of the order.
   */
  const calculateTotal = () => {
    // Use reduce to iterate through the order array
    return order.reduce((total, bowl) => {
      // For each bowl, add its price multiplied by its amount (quantity) to the total
      return total + (bowl.price * bowl.amount);
    }, 0); // Start the total at 0
  };

  /**
   * @function renderBowlItem
   * @description Renders a single bowl item card in the cart summary.
   * @param {Object} bowl - The bowl object to render, including its unique `id`.
   * @returns {JSX.Element} The JSX for a single bowl summary card.
   */
  const renderBowlItem = (bowl) => {
    // Safely find details for the base using the bowl's base ID
    const base = bowl.base ? findItem(bowl.base) : null;
    // Safely find details for protein items and include their quantities.
    // Use || {} for safe access in case bowl.proteins is undefined.
    const proteinItems = Object.entries(bowl.proteins || {}).map(([id, quantity]) => {
      const item = findItem(parseInt(id)); // Ensure ID is integer
      return item ? { ...item, quantity } : null; // Return item with quantity or null
    }).filter(item => item !== null); // Filter out null entries

    // Safely find details for ingredient items and include their quantities.
    // Use || {} for safe access in case bowl.ingredients is undefined.
    const ingredientsList = Object.entries(bowl.ingredients || {}).map(([id, quantity]) => {
      const item = findItem(parseInt(id)); // Ensure ID is integer
      return item ? { ...item, quantity } : null; // Return item with quantity or null
    }).filter(item => item !== null); // Filter out null entries

    return (
      // Card container for a single bowl summary
      <Card className="dark-bg mb-4" key={bowl.id}> {/* Use bowl.id as the unique key */}
        <Card.Body>
          {/* Header row for title and remove button */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            {/* Bowl title using its unique ID */}
            <Card.Title>Bowl #{bowl.id}</Card.Title>
            {/* Container for the remove button */}
            <div>
              {/* Button to remove the bowl completely */}
              <Button
                variant="outline-danger" // Red outline button
                size="sm" // Small size
                className="me-2" // Add right margin
                onClick={() => onRemoveBowlCompletely(bowl.id)} // Call handler to remove completely
              >
                <i className="bi bi-trash"></i> Remove {/* Trash icon and text */}
              </Button>
            </div>
          </div>

          {/* List group to display bowl components */}
          <ListGroup variant="flush">
            {/* Display Base if selected */}
            {base && <ListGroup.Item className="dark-bg"><span>Base: {base.name}</span></ListGroup.Item>}
            {/* Display Proteins if selected */}
            {proteinItems.length > 0 && <ListGroup.Item className="dark-bg"><span>Protein{proteinItems.length > 1 ? 's' : ''}: {proteinItems.map(p => `${p.name}${p.quantity > 1 ? ` ×${p.quantity}` : ''}`).join(', ')}</span></ListGroup.Item>}
            {/* Display Ingredients if selected */}
            {ingredientsList.length > 0 &&
              <ListGroup.Item className="dark-bg">
                <span className="fw-bold">Ingredients:</span> {ingredientsList.map(ing => `${ing.name} x${ing.quantity}`).join(', ')}
              </ListGroup.Item>
            }
            {/* Display Bowl Size */}
            <ListGroup.Item className="dark-bg">
              <span>Size: <strong>{bowl.size?.name}</strong></span> {/* Use optional chaining for safety */}
            </ListGroup.Item>
            {/* Item for Quantity and Price */}
            <ListGroup.Item className="dark-bg d-flex justify-content-between align-items-center">
              {/* Quantity control buttons */}
              <div className="d-flex align-items-center">
                {/* Decrease Quantity button */}
                <Button
                  variant="outline-light" // Light outline button
                  size="sm" // Small size
                  className="me-2" // Add right margin
                  onClick={() => onRemoveBowl(bowl.id, 1)} // Call handler to decrease quantity by 1 (amount is positive for reducing from cart)
                  disabled={bowl.amount <= 1} // Disable if quantity is 1 or less
                >
                  - {/* Minus symbol */}
                </Button>
                {/* Display current quantity */}
                <span>Quantity: {bowl.amount}</span>
                {/* Increase Quantity button */}
                <Button
                  variant="outline-light" // Light outline button
                  size="sm" // Small size
                  className="ms-2" // Add left margin
                  onClick={() => onRemoveBowl(bowl.id, -1)} // Call handler to increase quantity by 1 (amount is negative for increasing from cart)
                >
                  + {/* Plus symbol */}
                </Button>
              </div>
              {/* Display total price for this bowl item (quantity * price) */}
              <div>
                <strong>€{(bowl.price * bowl.amount).toFixed(2)}</strong>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    );
  };

  // Main render function for the Cart Page
  return (
    <>
      {/* Render the Navigation component */}
      <Navigation />
      {/* Main content section for the cart */}
      <div className="section-content section-darker">
        <Container>
          {/* Section header */}
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="section-title">Your Cart</h1>
              <div className="section-divider"></div>
              <p className="section-subtitle">Review your selections before proceeding to checkout.</p>
            </Col>
          </Row>

          {/* Row to center the cart content */}
          <Row className="justify-content-center">
            <Col md={8}> {/* Constrain cart width on larger screens */}
              {/* Conditional rendering based on whether the cart is empty */}
              {order.length === 0 ? (
                // Display message and button if cart is empty
                <Card className="dark-bg text-center p-5 mb-4">
                  <Card.Body>
                    <h3>Your cart is empty</h3>
                    <p className="mt-3">Add some delicious poke bowls to your order!</p>
                    {/* Link to the build page */}
                    <Button
                      as={Link} // Render as a Link component
                      to="/build" // Target URL
                      variant="primary" // Primary button style
                      className="order-button mt-3" // Custom button class and margin
                    >
                      Start Building Your Bowl
                    </Button>
                  </Card.Body>
                </Card>
              ) : (
                // Display cart items and summary if cart is not empty
                <>
                  {/* Map through the order array and render a card for each bowl item */}
                  {order.map(bowl => renderBowlItem(bowl))}

                  {/* Card displaying the total price */}
                  <Card className="dark-bg mb-4">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <h3>Total</h3>
                        <h3>€{calculateTotal().toFixed(2)}</h3> {/* Display calculated total */}
                      </div>
                    </Card.Body>
                  </Card>

                  {/* Buttons for navigation/action */}
                  <div className="d-flex justify-content-between mb-5">
                    {/* Button to continue building */}
                    <Button
                      as={Link} // Render as a Link component
                      to="/build" // Target URL
                      variant="outline-light" // Light outline button style
                      className="modern-btn" // Custom button class
                    >
                      Continue Building
                    </Button>
                    {/* Button to proceed to checkout */}
                    <Button
                      as={Link} // Render as a Link component
                      to="/checkout" // Target URL
                      variant="primary" // Primary button style
                      className="order-button" // Custom button class
                      disabled={order.length === 0} // Disable if cart is empty
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      {/* Render the Footer component */}
      <Footer />
    </>
  );
}

export default CartPage;