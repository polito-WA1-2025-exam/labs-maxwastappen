import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Proteins() {
    const [isVisible, setIsVisible] = useState(false);
    const [quantities, setQuantities] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0
    });

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('proteins');
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

    const proteins = [
        { id: 1, name: 'Tuna', description: 'Fresh tuna cubes', price: '4.50', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=2070' },
        { id: 2, name: 'Salmon', description: 'Norwegian salmon', price: '4.50', image: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?q=80&w=2070' },
        { id: 3, name: 'Chicken', description: 'Grilled chicken', price: '3.50', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=2187' },
        { id: 4, name: 'Tofu', description: 'Organic tofu', price: '3.00', image: 'https://images.unsplash.com/photo-1584948528512-fd980cd94361?q=80&w=1936' },
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
        <div id="proteins" className="proteins section-content py-5">
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                            <h2 className="section-title">Add Your Protein</h2>
                            <div className="section-divider"></div>
                            <p className="section-subtitle">Select premium proteins to power up your bowl</p>
                        </div>
                    </Col>
                </Row>
                
                <Row className={`card-grid ${isVisible ? 'visible' : ''}`}>
                    {proteins.map(protein => (
                        <Col key={protein.id} xs={12} md={6} lg={3} className="mb-4">
                            <Card className="modern-card h-100">
                                <Card.Img 
                                    src={protein.image} 
                                    alt={protein.name} 
                                    className="modern-card-img" 
                                />
                                <div className="card-gradient-overlay"></div>
                                <Card.ImgOverlay className="d-flex flex-column justify-content-between p-4">
                                    <div className="card-content">
                                        <h3 className="card-title">{protein.name}</h3>
                                        <p className="card-description">{protein.description}</p>
                                        <p className="card-price">€{protein.price}</p>
                                    </div>
                                    
                                    <div className="quantity-selector">
                                        <Button 
                                            variant="outline-light" 
                                            className="quantity-btn"
                                            onClick={() => decreaseQuantity(protein.id)}
                                            disabled={quantities[protein.id] === 0}
                                        >
                                            −
                                        </Button>
                                        <span className="quantity-display">{quantities[protein.id]}</span>
                                        <Button 
                                            variant="outline-light" 
                                            className="quantity-btn"
                                            onClick={() => increaseQuantity(protein.id)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Proteins;