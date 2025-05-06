import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CartPage({ order, onRemoveBowl, onRemoveBowlCompletely, findItem }) {
  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return order.reduce((total, bowl) => {
      return total + (bowl.price * bowl.amount);
    }, 0);
  };

  // Render a summary of a bowl
  const renderBowlItem = (bowl) => {
    const base = bowl.base ? findItem(bowl.base) : null;
    const proteinItems = Object.entries(bowl.proteins || {}).map(([id, quantity]) => {
      const item = findItem(parseInt(id));
      return item ? { ...item, quantity } : null;
    }).filter(item => item !== null);
    const ingredientsList = Object.entries(bowl.ingredients || {}).map(([id, quantity]) => {
      const item = findItem(parseInt(id));
      return item ? { ...item, quantity } : null;
    }).filter(item => item !== null);

    return (
      <Card className="dark-bg mb-4" key={bowl.id}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <Card.Title>Bowl #{bowl.id}</Card.Title>
            <div>
              <Button 
                variant="outline-danger" 
                size="sm"
                className="me-2"
                onClick={() => onRemoveBowlCompletely(bowl.id)}
              >
                <i className="bi bi-trash"></i> Remove
              </Button>
            </div>
          </div>
          
          <ListGroup variant="flush">
            {base && <ListGroup.Item className="dark-bg"><span>Base: {base.name}</span></ListGroup.Item>}
            {proteinItems.length > 0 && <ListGroup.Item className="dark-bg"><span>Protein{proteinItems.length > 1 ? 's' : ''}: {proteinItems.map(p => `${p.name}${p.quantity > 1 ? ` ×${p.quantity}` : ''}`).join(', ')}</span></ListGroup.Item>}
            {ingredientsList.length > 0 && 
              <ListGroup.Item className="dark-bg">
                <span className="fw-bold">Ingredients:</span> {ingredientsList.map(ing => `${ing.name} x${ing.quantity}`).join(', ')}
              </ListGroup.Item>
            }
            <ListGroup.Item className="dark-bg">
              <span>Size: <strong>{bowl.size?.name}</strong></span>
            </ListGroup.Item>
            <ListGroup.Item className="dark-bg d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Button 
                  variant="outline-light" 
                  size="sm"
                  className="me-2"
                  onClick={() => onRemoveBowl(bowl.id, 1)}
                  disabled={bowl.amount <= 1}
                >
                  -
                </Button>
                <span>Quantity: {bowl.amount}</span>
                <Button 
                  variant="outline-light" 
                  size="sm"
                  className="ms-2"
                  onClick={() => onRemoveBowl(bowl.id, -1)}
                >
                  +
                </Button>
              </div>
              <div>
                <strong>€{(bowl.price * bowl.amount).toFixed(2)}</strong>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <Navigation />
      <div className="section-content section-darker">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="section-title">Your Cart</h1>
              <div className="section-divider"></div>
              <p className="section-subtitle">Review your selections before proceeding to checkout.</p>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col md={8}>
              {order.length === 0 ? (
                <Card className="dark-bg text-center p-5 mb-4">
                  <Card.Body>
                    <h3>Your cart is empty</h3>
                    <p className="mt-3">Add some delicious poke bowls to your order!</p>
                    <Button 
                      as={Link} 
                      to="/build" 
                      variant="primary" 
                      className="order-button mt-3"
                    >
                      Start Building Your Bowl
                    </Button>
                  </Card.Body>
                </Card>
              ) : (
                <>
                  {order.map(bowl => renderBowlItem(bowl))}
                  
                  <Card className="dark-bg mb-4">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <h3>Total</h3>
                        <h3>€{calculateTotal().toFixed(2)}</h3>
                      </div>
                    </Card.Body>
                  </Card>
                  
                  <div className="d-flex justify-content-between mb-5">
                    <Button 
                      as={Link} 
                      to="/build" 
                      variant="outline-light" 
                      className="modern-btn"
                    >
                      Continue Building
                    </Button>
                    <Button 
                      as={Link} 
                      to="/checkout" 
                      variant="primary" 
                      className="order-button"
                      disabled={order.length === 0}
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
      <Footer />
    </>
  );
}

export default CartPage;