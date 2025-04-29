import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Badge } from 'react-bootstrap';

// Updated props to include onRemoveBowlCompletely
function OrderForm({ 
    order = [], 
    onRemoveBowl, 
    onRemoveBowlCompletely, 
    findItem, 
    existingOrder = null, 
    onSubmit 
}) {
    // Form state for customer details
    const [formData, setFormData] = useState({
        id: existingOrder?.id || '',
        name: existingOrder?.name || '',
        email: existingOrder?.email || '',
        phone: existingOrder?.phone || '',
        address: existingOrder?.address || '',
        notes: existingOrder?.notes || '',
        deliveryTime: existingOrder?.deliveryTime || '',
        paymentMethod: existingOrder?.paymentMethod || 'card'
    });
    const [validated, setValidated] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Animation effect when component mounts
        setIsVisible(true);
    }, []);

    // Calculate total price based on the bowls in the order (with their amounts)
    const totalOrderPrice = order.reduce((sum, bowl) => sum + (bowl.price * bowl.amount), 0).toFixed(2);

    // Handle form input changes for customer details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle final order submission
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        // Form validation for customer details
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        // Submit the final order with bowls and customer data
        if (onSubmit) {
            onSubmit({
                customerDetails: formData,
                bowls: order,
                total: parseFloat(totalOrderPrice),
                date: new Date().toISOString(),
                status: existingOrder ? existingOrder.status : 'pending'
            });
        } else {
            // Default behavior if no onSubmit provided (e.g., log to console)
            console.log("Order Submitted:", {
                customerDetails: formData,
                bowls: order,
                total: parseFloat(totalOrderPrice),
                date: new Date().toISOString(),
                status: 'pending'
            });
            alert('Order Placed (Check Console)!');
        }
    };

    // Helper to render details of a bowl
    const renderBowlSummary = (bowl) => {
        const { id, amount } = bowl;
        const base = findItem(bowl.base);
        
        // Handle proteins that are now objects with quantities
        const proteinItems = Object.entries(bowl.proteins).map(([id, quantity]) => {
            const item = findItem(parseInt(id));
            return item ? { ...item, quantity } : null;
        }).filter(item => item !== null);
        
        const ingredientsList = Object.entries(bowl.ingredients).map(([id, quantity]) => {
            const item = findItem(parseInt(id));
            return item ? { ...item, quantity } : null;
        }).filter(item => item !== null);

        // Calculate total price for this bowl with its amount
        const bowlTotal = (bowl.price * amount).toFixed(2);

        return (
            <ListGroup.Item key={id} className="dark-bg mb-3 p-3 border rounded">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center">
                        <h6 className="mb-0">
                            {bowl.size?.name || 'Regular'} Bowl
                        </h6>
                        <Badge bg="primary" pill className="ms-2">
                            ×{amount}
                        </Badge>
                    </div>
                    <div>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onRemoveBowl(id)}
                            className="p-1 lh-1 me-2"
                        >
                            − Remove One
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onRemoveBowlCompletely(id)}
                            className="p-1 lh-1"
                        >
                            ✕ Remove All
                        </Button>
                    </div>
                </div>
                <div className="small">
                    {base && <div><strong>Base:</strong> {base.name}</div>}
                    
                    {proteinItems.length > 0 && (
                        <div>
                            <strong>Protein{proteinItems.length > 1 ? 's' : ''}:</strong>
                            {' '}
                            {proteinItems.map((p, i) => (
                                <span key={p.id}>
                                    {p.name}{p.quantity > 1 ? ` ×${p.quantity}` : ''}
                                    {i < proteinItems.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    {ingredientsList.length > 0 && (
                        <div>
                            <strong>Ingredients:</strong>
                            <ul className="list-unstyled ps-3 mb-0">
                                {ingredientsList.map(ing => (
                                    <li key={ing.id}>{ing.name} ×{ing.quantity}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-between fw-bold mt-2">
                    <div>Price per bowl: €{bowl.price.toFixed(2)}</div>
                    <div>Subtotal: €{bowlTotal}</div>
                </div>
            </ListGroup.Item>
        );
    };

    return (
        <div id="order-form" className={`section-content py-5 ${isVisible ? 'visible' : ''}`}>
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                            {/* Title depends on whether there's an order to finalize */}
                            <h2 className="section-title">{order.length > 0 ? 'Finalize Your Order' : 'Your Order is Empty'}</h2>
                            <div className="section-divider"></div>
                            <p className="section-subtitle">
                                {order.length > 0
                                    ? 'Review your bowls and provide delivery details below'
                                    : 'Add some bowls using the sections above!'}
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className={`fade-in-delay ${isVisible ? 'visible' : ''}`}>
                    {/* Customer Details Form - Only show if there are bowls in the order */}
                    {order.length > 0 && (
                        <Col lg={7}>
                            <Card className="dark-bg mb-4">
                                <Card.Body>
                                    <Card.Title className="mb-4">Your Information</Card.Title>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Full Name</Form.Label>
                                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" className="dark-bg" />
                                                    <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" className="dark-bg" />
                                                    <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Phone</Form.Label>
                                                    <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone" className="dark-bg" />
                                                    <Form.Control.Feedback type="invalid">Please provide your phone number.</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Delivery Time</Form.Label>
                                                    <Form.Control type="time" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} required className="dark-bg" />
                                                    <Form.Control.Feedback type="invalid">Please select a delivery time.</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Delivery Address</Form.Label>
                                            <Form.Control as="textarea" name="address" value={formData.address} onChange={handleChange} required placeholder="Enter your delivery address" rows={2} className="dark-bg" />
                                            <Form.Control.Feedback type="invalid">Please provide your delivery address.</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Special Notes</Form.Label>
                                            <Form.Control as="textarea" name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special instructions or allergies?" rows={2} className="dark-bg" />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Payment Method</Form.Label>
                                            <div>
                                                <Form.Check inline type="radio" id="payment-card" name="paymentMethod" value="card" label="Credit Card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="me-4" />
                                                <Form.Check inline type="radio" id="payment-cash" name="paymentMethod" value="cash" label="Cash on Delivery" checked={formData.paymentMethod === 'cash'} onChange={handleChange} />
                                            </div>
                                        </Form.Group>

                                        <div className="d-grid mt-4">
                                            <Button type="submit" className="order-complete-btn btn-lg">
                                                {existingOrder ? 'Update Order' : 'Place Final Order'}
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}

                    {/* Order Summary - Always show, but content depends on order state */}
                    <Col lg={order.length > 0 ? 5 : 12}> {/* Take full width if order is empty */}
                        <Card className="dark-bg">
                            <Card.Body>
                                <Card.Title className="mb-4">Order Summary</Card.Title>

                                <ListGroup variant="flush" className="mb-3 order-summary-list">
                                    {order.length > 0 ? (
                                        order.map(bowl => renderBowlSummary(bowl))
                                    ) : (
                                        <ListGroup.Item className="dark-bg text-center py-3">
                                            Your order is currently empty. Add items from the sections above.
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>

                                {order.length > 0 && (
                                    <>
                                        <hr className="footer-divider" />
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <h5 className="mb-0">Total Order Price:</h5>
                                            <h4 className="mb-0">€{totalOrderPrice}</h4>
                                        </div>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default OrderForm;