import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

// Receive ingredientCategories, selectedIngredients, and onIngredientChange as props with defaults
function Ingredients({ ingredientCategories = [], selectedIngredients = {}, onIngredientChange = () => {} }) {
    const [isVisible, setIsVisible] = useState(false);

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

    // Use the passed-in onIngredientChange handler
    const increaseQuantity = (id) => {
        const currentQuantity = selectedIngredients[id] || 0;
        onIngredientChange(id, currentQuantity + 1);
    };

    const decreaseQuantity = (id) => {
        const currentQuantity = selectedIngredients[id] || 0;
        if (currentQuantity > 0) {
            onIngredientChange(id, currentQuantity - 1);
        }
    };

    // Helper to get quantity for an item, defaults to 0
    const getQuantity = (id) => selectedIngredients[id] || 0;

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

                {ingredientCategories.length === 0 ? (
                    <Row className="justify-content-center">
                        <Col md={8} className="text-center">
                            <div className="dark-bg p-4 rounded">
                                <p>Loading ingredient options...</p>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <Row className={`fade-in-delay ${isVisible ? 'visible' : ''}`}>
                        <Col>
                            <div className="ingredients-tabs">
                                <Tabs
                                    defaultActiveKey={ingredientCategories[0]?.category.toLowerCase() || 'vegetables'}
                                    id="ingredients-categories"
                                    className="mb-5 justify-content-center custom-tabs"
                                >
                                    {ingredientCategories.map(category => (
                                        <Tab
                                            eventKey={category.category.toLowerCase()}
                                            title={category.category}
                                            key={category.id}
                                        >
                                            <Row className={`card-grid ${isVisible ? 'visible' : ''}`}>
                                                {category.items.map(item => {
                                                    const quantity = getQuantity(item.id);
                                                    return (
                                                        <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                                            <Card className={`modern-card h-100 ${quantity > 0 ? 'border border-primary border-1' : ''}`}>
                                                                <Card.Img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="modern-card-img"
                                                                />
                                                                <div className="card-gradient-overlay"></div>
                                                                <Card.ImgOverlay className="d-flex flex-column justify-content-between p-4">
                                                                    <div className="card-content">
                                                                        <h3 className="card-title">{item.name}</h3>
                                                                        <p className="card-price">€{item.price.toFixed(2)}</p>
                                                                    </div>

                                                                    <div className="improved-counter">
                                                                        <Button
                                                                            variant="light"
                                                                            className="counter-btn decrement"
                                                                            onClick={(e) => { 
                                                                                e.stopPropagation();
                                                                                decreaseQuantity(item.id); 
                                                                            }}
                                                                            disabled={quantity === 0}
                                                                        >
                                                                            −
                                                                        </Button>
                                                                        <span className="counter-display">{quantity}</span>
                                                                        <Button
                                                                            variant="light"
                                                                            className="counter-btn increment"
                                                                            onClick={(e) => { 
                                                                                e.stopPropagation();
                                                                                increaseQuantity(item.id); 
                                                                            }}
                                                                        >
                                                                            +
                                                                        </Button>
                                                                    </div>
                                                                </Card.ImgOverlay>
                                                            </Card>
                                                        </Col>
                                                    );
                                                })}
                                            </Row>
                                        </Tab>
                                    ))}
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default Ingredients;