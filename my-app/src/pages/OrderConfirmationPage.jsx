import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OrderConfirmationPage({ order, findItem }) {
  // Generate a random order number
  const orderNumber = `PH-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Calculate the total price of all items in the order
  const calculateTotal = () => {
    return order.reduce((total, bowl) => {
      return total + (bowl.price * bowl.amount);
    }, 0);
  };

  // Calculate estimated delivery time (30-45 minutes from now)
  const getEstimatedDeliveryTime = () => {
    const now = new Date();
    const min = new Date(now.getTime() + 30 * 60000);
    const max = new Date(now.getTime() + 45 * 60000);
    
    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}:${formattedMinutes} ${ampm}`;
    };
    
    return `${formatTime(min)} - ${formatTime(max)}`;
  };

  return (
    <>
      <Navigation />
      <div className="section-content section-darker">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="section-title">Order Confirmed!</h1>
              <div className="section-divider"></div>
              <p className="section-subtitle">Thank you for your order. Your delicious poke bowl is being prepared!</p>
            </Col>
          </Row>
          
          {order.length === 0 ? (
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="dark-bg text-center p-5 mb-4">
                  <Card.Body>
                    <h3>No active order found</h3>
                    <p className="mt-3">It seems you don't have an active order in the system.</p>
                    <Button 
                      as={Link} 
                      to="/build" 
                      variant="primary" 
                      className="order-button mt-3"
                    >
                      Start a New Order
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="dark-bg mb-4">
                  <Card.Body className="text-center p-4">
                    <div className="confirmation-icon mb-4">
                      <i className="bi bi-check-circle-fill" style={{ fontSize: '4rem', color: '#6e48aa' }}></i>
                    </div>
                    <h2 className="mb-4">Thank You For Your Order!</h2>
                    <p className="mb-3">Your order has been received and is being prepared.</p>
                    <div className="order-details my-4 p-3" style={{ background: 'rgba(110, 72, 170, 0.1)', borderRadius: '8px' }}>
                      <Row className="text-start">
                        <Col md={6}>
                          <p><strong>Order Number:</strong> {orderNumber}</p>
                          <p><strong>Estimated Delivery:</strong> {getEstimatedDeliveryTime()}</p>
                        </Col>
                        <Col md={6}>
                          <p><strong>Payment Method:</strong> Credit Card</p>
                          <p><strong>Order Status:</strong> <span className="text-success">Confirmed</span></p>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
                
                <Card className="dark-bg mb-4">
                  <Card.Body>
                    <Card.Title className="mb-4">Order Summary</Card.Title>
                    <ListGroup variant="flush">
                      {order.map(bowl => {
                        const base = findItem(bowl.base);
                        return (
                          <ListGroup.Item key={bowl.id} className="dark-bg d-flex justify-content-between">
                            <div>
                              <span className="fw-bold">Bowl #{bowl.id}</span>
                              <div className="small">
                                Base: {base?.name}, Size: {bowl.size.name}
                              </div>
                              <div className="small">
                                Qty: {bowl.amount}
                              </div>
                            </div>
                            <span>€{(bowl.price * bowl.amount).toFixed(2)}</span>
                          </ListGroup.Item>
                        );
                      })}
                      
                      <ListGroup.Item className="dark-bg d-flex justify-content-between fw-bold mt-2">
                        <span>Subtotal</span>
                        <span>€{calculateTotal().toFixed(2)}</span>
                      </ListGroup.Item>
                      
                      <ListGroup.Item className="dark-bg d-flex justify-content-between">
                        <span>Delivery Fee</span>
                        <span>€2.50</span>
                      </ListGroup.Item>
                      
                      <ListGroup.Item className="dark-bg d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        <span>€{(calculateTotal() + 2.50).toFixed(2)}</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
                
                <div className="text-center mb-5">
                  <Button 
                    as={Link} 
                    to="/menu" 
                    variant="outline-light" 
                    className="modern-btn me-3"
                  >
                    View Menu
                  </Button>
                  <Button 
                    as={Link} 
                    to="/" 
                    variant="primary" 
                    className="order-button"
                  >
                    Return to Home
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default OrderConfirmationPage;