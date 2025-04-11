import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function Ingredients() {
    const [isVisible, setIsVisible] = useState(false);
    // Initialize quantities state for each ingredient
    const [quantities, setQuantities] = useState({
        101: 0, 102: 0, 103: 0, 104: 0,
        201: 0, 202: 0, 203: 0, 204: 0,
        301: 0, 302: 0, 303: 0, 304: 0
    });

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('ingredients');
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
                    setIsVisible(true);
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const ingredients = [
        { 
            id: 1, 
            category: 'Vegetables', 
            items: [
                { id: 101, name: 'Cucumber', price: '0.50', image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269d?q=80&w=2070' },
                { id: 102, name: 'Avocado', price: '1.50', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=2075' },
                { id: 103, name: 'Seaweed', price: '0.80', image: 'https://images.unsplash.com/photo-1622180443366-680932886c7e?q=80&w=2067' },
                { id: 104, name: 'Edamame', price: '1.00', image: 'https://images.unsplash.com/photo-1656961112303-92a11eff6c55?q=80&w=1974' }
            ]
        },
        { 
            id: 2, 
            category: 'Toppings', 
            items: [
                { id: 201, name: 'Sesame Seeds', price: '0.30', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070' },
                { id: 202, name: 'Crispy Onions', price: '0.30', image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?q=80&w=2070' },
                { id: 203, name: 'Peanuts', price: '0.50', image: 'https://images.unsplash.com/photo-1567529692333-de9fd6772923?q=80&w=1974' },
                { id: 204, name: 'Nori Strips', price: '0.40', image: 'https://images.unsplash.com/photo-1581431886211-6b932f8367f2?q=80&w=2070' }
            ]
        },
        { 
            id: 3, 
            category: 'Dressings', 
            items: [
                { id: 301, name: 'Soy Sauce', price: '0.30', image: 'https://images.unsplash.com/photo-1590942349322-c03f8c7b0171?q=80&w=2070' },
                { id: 302, name: 'Spicy Mayo', price: '0.50', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1769' },
                { id: 303, name: 'Teriyaki', price: '0.50', image: 'https://images.unsplash.com/photo-1598511726623-d2e9996e1b6c?q=80&w=1925' },
                { id: 304, name: 'Ponzu', price: '0.60', image: 'https://images.unsplash.com/photo-1493808855297-a7d32465d418?q=80&w=1854' }
            ]
        }
    ];

    const increaseQuantity = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: prev[id] + 1
        }));
    };

    const decreaseQuantity = (id) => {
        if (quantities[id] > 0) {
            setQuantities(prev => ({
                ...prev,
                [id]: prev[id] - 1
            }));
        }
    };

    return (
        <div id="ingredients" className="ingredients section-content py-5">
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                            <h2 className="section-title">Customize Your Bowl</h2>
                            <div className="section-divider"></div>
                            <p className="section-subtitle">Add fresh ingredients to create your perfect flavor</p>
                        </div>
                    </Col>
                </Row>

                <Row className={`fade-in-delay ${isVisible ? 'visible' : ''}`}>
                    <Col>
                        <div className="ingredients-tabs">
                            <Tabs 
                                defaultActiveKey="vegetables"
                                id="ingredients-categories"
                                className="mb-5 justify-content-center custom-tabs"
                            >
                                {ingredients.map(category => (
                                    <Tab 
                                        eventKey={category.category.toLowerCase()} 
                                        title={category.category}
                                        key={category.id}
                                    >
                                        <Row className={`card-grid ${isVisible ? 'visible' : ''}`}>
                                            {category.items.map(item => (
                                                <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                                    <Card className="modern-card h-100">
                                                        <Card.Img 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            className="modern-card-img" 
                                                        />
                                                        <div className="card-gradient-overlay"></div>
                                                        <Card.ImgOverlay className="d-flex flex-column justify-content-between p-4">
                                                            <div className="card-content">
                                                                <h3 className="card-title">{item.name}</h3>
                                                                <p className="card-price">€{item.price}</p>
                                                            </div>
                                                            
                                                            <div className="quantity-selector align-self-start">
                                                                <Button 
                                                                    variant="outline-light" 
                                                                    className="quantity-btn"
                                                                    onClick={() => decreaseQuantity(item.id)}
                                                                    disabled={quantities[item.id] === 0}
                                                                >
                                                                    −
                                                                </Button>
                                                                <span className="quantity-display">{quantities[item.id]}</span>
                                                                <Button 
                                                                    variant="outline-light" 
                                                                    className="quantity-btn"
                                                                    onClick={() => increaseQuantity(item.id)}
                                                                >
                                                                    +
                                                                </Button>
                                                            </div>
                                                        </Card.ImgOverlay>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Tab>
                                ))}
                            </Tabs>
                        </div>
                    </Col>
                </Row>
                
                <Row className="mt-5">
                    <Col className="text-center">
                        <Button variant="primary" size="lg" className="order-complete-btn">
                            Complete Your Order
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Ingredients;