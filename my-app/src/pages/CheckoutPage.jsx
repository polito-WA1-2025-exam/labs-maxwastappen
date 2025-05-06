import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CheckoutPage({ order, findItem }) {
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'creditCard'
  });
  
  const [validated, setValidated] = useState(false);

  // Handle customer info form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate the total price of all items in the order
  const calculateTotal = () => {
    return order.reduce((total, bowl) => {
      return total + (bowl.price * bowl.amount);
    }, 0);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Process the order (in a real application, this would be an API call)
    console.log('Order submitted:', { order, customerInfo, total: calculateTotal() });
    
    // Navigate to order confirmation page
    navigate('/confirmation');
  };

  return (
    <>
      <Navigation />
      <div className="section-content section-darker">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="section-title">Checkout</h1>
              <div className="section-divider"></div>
              <p className="section-subtitle">Complete your order details to proceed with payment.</p>
            </Col>
          </Row>
          
          {order.length === 0 ? (
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="dark-bg text-center p-5 mb-4">
                  <Card.Body>
                    <h3>Your cart is empty</h3>
                    <p className="mt-3">You need to add items to your cart before checking out.</p>
                    <Button 
                      onClick={() => navigate('/build')}
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
            <Row>
              {/* Customer Information Form */}
              <Col md={7}>
                <Card className="dark-bg mb-4">
                  <Card.Body>
                    <Card.Title className="mb-4">Customer Information</Card.Title>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="customerName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name" 
                          required 
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your name.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="customerEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address" 
                          required 
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid email address.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="customerPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number" 
                          required 
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your phone number.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-4" controlId="customerAddress">
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          name="address"
                          value={customerInfo.address}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Enter your delivery address" 
                          required 
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your delivery address.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>Payment Method</Form.Label>
                        <div>
                          <Form.Check
                            inline
                            type="radio"
                            id="creditCard"
                            label="Credit Card"
                            name="paymentMethod"
                            value="creditCard"
                            checked={customerInfo.paymentMethod === 'creditCard'}
                            onChange={handleInputChange}
                            required
                          />
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
                      
                      <div className="text-center mt-4">
                        <Button 
                          variant="primary" 
                          type="submit" 
                          className="order-button"
                          size="lg"
                        >
                          Place Order
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              
              {/* Order Summary */}
              <Col md={5}>
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
              </Col>
            </Row>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default CheckoutPage;